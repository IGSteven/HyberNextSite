"use client"

import { useState, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getCurrencyFromHostname, CURRENCY_SYMBOLS } from "@/lib/currency-utils"
import { Partner, ProductDiscountOverride } from "@/lib/partner-types"

// Interface for API responses
interface ApiResponse {
  success: boolean;
  products?: Product[];
  error?: string;
}

// Product interface needed for component
interface Product {
  pid: number;
  gid: number;
  type: string;
  name: string;
  slug: string;
  "product-url": string;
  description: string;
  features: string[];
  module: string;
  paytype: string;
  allowqty: number;
  quantity_available: number;
  pricing: Record<string, CurrencyPricing>;
  minPricing?: Record<string, CurrencyPricing>;
}

interface CurrencyPricing {
  prefix: string;
  suffix: string;
  monthly: string;
  annually: string;
  [key: string]: string;
}

// Cookie name constant
const CURRENCY_COOKIE_NAME = "preferred_currency"
const COOKIE_EXPIRES_DAYS = 90

// Helper function to get a cookie by name
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1)
    }
  }
  return null
}

// Helper function to set a cookie
const setCookie = (name: string, value: string, days: number): void => {
  if (typeof document === 'undefined') return
  
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = "; expires=" + date.toUTCString()
  document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax"
}

// Interface for transformed product data
interface UIProduct {
  id: number;
  name: string;
  shortDescription: string;
  pricing: Record<string, { monthly: number; annually: number; prefix: string }>;
  features: string[];
  type: string;
  discountApplied: number; // Actual discount % applied to this product
  noDiscount?: boolean;    // Flag to indicate if this product has no discount
}

interface PartnerPricingTableProps {
  partner: Partner;
}

export default function PartnerPricingTable({ partner }: PartnerPricingTableProps) {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<UIProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hostname, setHostname] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  // Get discount information from partner
  const partnerDiscount = partner.discount
  const partnerProductConfig = partner.productConfig
  const affiliateId = partner.affiliateId
  
  // Get domain-based default currency
  useEffect(() => {
    // Set hostname once the component mounts on client-side
    setHostname(window.location.hostname)
  }, [])
  
  // Get currency from URL query parameter, cookie, or from domain
  const currencyFromQuery = searchParams.get("currency")
  const domainDefaultCurrency = hostname ? getCurrencyFromHostname(hostname) : "USD"
  
  // State to hold the current currency
  const [currency, setCurrency] = useState(domainDefaultCurrency)
  
  // Initialize currency from query param, cookie, or domain default
  useEffect(() => {
    // Currency preference order: 1. URL param, 2. Cookie, 3. Domain default
    const cookieCurrency = getCookie(CURRENCY_COOKIE_NAME)
    const initialCurrency = currencyFromQuery || cookieCurrency || domainDefaultCurrency
    setCurrency(initialCurrency)
    
    // If currency came from URL param, update the cookie
    if (currencyFromQuery) {
      setCookie(CURRENCY_COOKIE_NAME, currencyFromQuery, COOKIE_EXPIRES_DAYS)
    }
  }, [currencyFromQuery, domainDefaultCurrency])
  
  // Get the effective discount for a specific product
  const getEffectiveDiscount = (productId: number): { discountPercent: number, noDiscount: boolean } => {
    // Check if product has a discount override
    if (partnerProductConfig?.discountOverrides) {
      const override = partnerProductConfig.discountOverrides.find(
        (o) => o.pid === productId
      )
      
      if (override) {
        return { 
          discountPercent: override.discountPercent, 
          noDiscount: override.discountPercent === 0
        }
      }
    }
    
    // No override found, use partner's default discount
    return { 
      discountPercent: partnerDiscount, 
      noDiscount: false
    }
  }
  
  // Transform WHMCS product to UI product format and apply appropriate discount
  const transformProduct = (product: Product, type: string): UIProduct => {
    // Get effective discount for this product
    const { discountPercent, noDiscount } = getEffectiveDiscount(product.pid)
    
    // Extract pricing information
    const pricingByCurrency: Record<string, { monthly: number; annually: number; prefix: string }> = {};
    
    // Process each currency in the product's pricing
    // Use minPricing if available (which includes required options), otherwise fall back to standard pricing
    const pricingSource = product.minPricing || product.pricing;
    
    Object.entries(pricingSource).forEach(([currencyCode, pricingInfo]) => {
      // Apply partner discount to prices
      const monthlyPrice = parseFloat(pricingInfo.monthly) || 0;
      const annuallyPrice = parseFloat(pricingInfo.annually) || 0;
      
      // Calculate discounted prices (only if discount applies)
      const discountMultiplier = (100 - discountPercent) / 100;
      const discountedMonthly = monthlyPrice * discountMultiplier;
      const discountedAnnually = annuallyPrice * discountMultiplier;
      
      pricingByCurrency[currencyCode] = {
        monthly: discountedMonthly,
        annually: discountedAnnually, 
        prefix: pricingInfo.prefix || "$"
      };
    });
    
    return {
      id: product.pid,
      name: product.name,
      shortDescription: product.description || `High-performance ${type}`,
      pricing: pricingByCurrency,
      features: product.features || [],
      type,
      discountApplied: discountPercent,
      noDiscount
    };
  };
  
  useEffect(() => {
    // Fetch products from our server-side API endpoint
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get product groups to fetch (from partner config or use defaults)
        const productGroups = partnerProductConfig?.showProductGroups || [19, 14]; // Default: VPS (19) and Dedicated (14)
        
        const allProducts: UIProduct[] = [];
        
        // Fetch products for each configured group
        for (const groupId of productGroups) {
          const response = await fetch(`/api/products/by-group?gid=${groupId}`);
          const data: ApiResponse = await response.json();
          
          if (!data.success || !data.products) {
            console.warn(`Failed to fetch products for group ${groupId}`);
            continue;
          }
          
          // Determine product type based on group ID
          let productType = "unknown";
          if (groupId === 19) productType = "vps";
          else if (groupId === 14) productType = "dedicated";
          else if (groupId === 12) productType = "webhosting";
          else if (groupId === 22) productType = "addon";
          
          // Transform products to UI format with appropriate discounting
          let transformedProducts = data.products.map(product => 
            transformProduct(product, productType)
          );
          
          // Filter to specific product IDs if configured
          if (partnerProductConfig?.productIds && partnerProductConfig.productIds.length > 0) {
            transformedProducts = transformedProducts.filter(product => 
              partnerProductConfig.productIds!.includes(product.id)
            );
          }
          
          allProducts.push(...transformedProducts);
        }
        
        // If no products found, use sample data
        if (allProducts.length === 0) {
          throw new Error("No products found for the specified configuration");
        }
        
        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        setError("Failed to load product information. Using fallback data.");
        // Use sample data as fallback
        setProducts(getSampleData(partnerProductConfig?.discountOverrides));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [partnerDiscount, partnerProductConfig]);

  const getSampleData = (discountOverrides?: ProductDiscountOverride[]): UIProduct[] => {
    // Sample data with multi-currency support and partner discount applied
    const sampleVpsPlans: UIProduct[] = [
      {
        id: 1,
        name: "Legacy Intel VPS",
        shortDescription: "Reliable Intel-based virtual servers",
        pricing: generateSamplePricing(1, discountOverrides),
        features: ["Base Clock: 3.60 GHz", "Cores: 2", "RAM: 4GB", "Storage: 50GB SSD", "Unmetered Bandwidth"],
        type: "vps",
        discountApplied: getEffectiveDiscount(1).discountPercent,
        noDiscount: getEffectiveDiscount(1).noDiscount
      },
      {
        id: 2,
        name: "Ryzen AM4 VPS",
        shortDescription: "High-performance AMD Ryzen servers",
        pricing: generateSamplePricing(2, discountOverrides),
        features: ["Base Clock: 4.20 GHz", "Cores: 4", "RAM: 8GB", "Storage: 100GB NVMe", "Unmetered Bandwidth"],
        type: "vps",
        discountApplied: getEffectiveDiscount(2).discountPercent,
        noDiscount: getEffectiveDiscount(2).noDiscount
      },
      {
        id: 3,
        name: "Ryzen AM5 VPS",
        shortDescription: "Latest generation AMD Ryzen technology",
        pricing: generateSamplePricing(3, discountOverrides),
        features: ["Base Clock: 4.50 GHz", "Cores: 6", "RAM: 16GB", "Storage: 200GB NVMe", "Unmetered Bandwidth"],
        type: "vps",
        discountApplied: getEffectiveDiscount(3).discountPercent,
        noDiscount: getEffectiveDiscount(3).noDiscount
      },
    ]

    const sampleDedicatedPlans: UIProduct[] = [
      {
        id: 4,
        name: "Basic Dedicated",
        shortDescription: "Entry-level dedicated server",
        pricing: generateSamplePricing(4, discountOverrides),
        features: ["4 CPU Cores", "16GB RAM", "500GB SSD Storage", "Unmetered Bandwidth", "Full Hardware Control"],
        type: "dedicated",
        discountApplied: getEffectiveDiscount(4).discountPercent,
        noDiscount: getEffectiveDiscount(4).noDiscount
      },
      {
        id: 5,
        name: "Pro Dedicated",
        shortDescription: "For resource-intensive applications",
        pricing: generateSamplePricing(5, discountOverrides),
        features: [
          "8 CPU Cores",
          "32GB RAM",
          "1TB SSD Storage",
          "Unmetered Bandwidth",
          "Full Hardware Control",
          "DDoS Protection",
        ],
        type: "dedicated",
        discountApplied: getEffectiveDiscount(5).discountPercent,
        noDiscount: getEffectiveDiscount(5).noDiscount
      },
      {
        id: 6,
        name: "Enterprise Dedicated",
        shortDescription: "High-performance dedicated server",
        pricing: generateSamplePricing(6, discountOverrides),
        features: [
          "12 CPU Cores",
          "64GB RAM",
          "2TB SSD Storage",
          "Unmetered Bandwidth",
          "Full Hardware Control",
          "DDoS Protection",
          "Managed Support",
        ],
        type: "dedicated",
        discountApplied: getEffectiveDiscount(6).discountPercent,
        noDiscount: getEffectiveDiscount(6).noDiscount
      },
    ]

    // Sample addon products
    const sampleAddonPlans: UIProduct[] = [
      {
        id: 101,
        name: "cPanel License",
        shortDescription: "Industry-standard control panel for websites",
        pricing: generateSamplePricing(101, discountOverrides),
        features: [
          "Website Management",
          "Email Accounts",
          "Database Management",
          "One-click Installs",
          "Full Administrative Access"
        ],
        type: "addon",
        discountApplied: getEffectiveDiscount(101).discountPercent,
        noDiscount: getEffectiveDiscount(101).noDiscount
      },
      {
        id: 102,
        name: "Plesk License",
        shortDescription: "User-friendly hosting control panel",
        pricing: generateSamplePricing(102, discountOverrides),
        features: [
          "Website Management",
          "Email Management",
          "WordPress Toolkit",
          "Security Core Extensions",
          "Domain Management"
        ],
        type: "addon",
        discountApplied: getEffectiveDiscount(102).discountPercent,
        noDiscount: getEffectiveDiscount(102).noDiscount
      }
    ]

    // Filter products based on partner product config if available
    let allSampleProducts = [...sampleVpsPlans, ...sampleDedicatedPlans, ...sampleAddonPlans];
    
    if (partnerProductConfig?.productIds && partnerProductConfig.productIds.length > 0) {
      allSampleProducts = allSampleProducts.filter(product => 
        partnerProductConfig.productIds!.includes(product.id)
      );
    }

    return allSampleProducts;
  }

  // Helper to generate sample pricing with appropriate discounts
  function generateSamplePricing(productId: number, discountOverrides?: ProductDiscountOverride[]) {
    // Get the effective discount for this product
    const { discountPercent } = getEffectiveDiscount(productId);
    const discountMultiplier = (100 - discountPercent) / 100;
    
    // Default prices before discount
    let baseMonthlyUSD = 19.99;
    let baseAnnuallyUSD = 199.99;
    
    // Set different base prices based on product ID
    if (productId === 2) {
      baseMonthlyUSD = 39.99;
      baseAnnuallyUSD = 399.99;
    } else if (productId === 3) {
      baseMonthlyUSD = 59.99;
      baseAnnuallyUSD = 599.99;
    } else if (productId === 4) {
      baseMonthlyUSD = 99.99;
      baseAnnuallyUSD = 999.99;
    } else if (productId === 5) {
      baseMonthlyUSD = 149.99;
      baseAnnuallyUSD = 1499.99;
    } else if (productId === 6) {
      baseMonthlyUSD = 199.99;
      baseAnnuallyUSD = 1999.99;
    } else if (productId === 101) { // cPanel
      baseMonthlyUSD = 15.99;
      baseAnnuallyUSD = 159.99;
    } else if (productId === 102) { // Plesk
      baseMonthlyUSD = 14.99;
      baseAnnuallyUSD = 149.99;
    }
    
    // Apply discount
    return {
      USD: {
        monthly: baseMonthlyUSD * discountMultiplier,
        annually: baseAnnuallyUSD * discountMultiplier,
        prefix: "$"
      },
      GBP: {
        monthly: baseMonthlyUSD * 0.8 * discountMultiplier,
        annually: baseAnnuallyUSD * 0.8 * discountMultiplier,
        prefix: "£"
      },
      EUR: {
        monthly: baseMonthlyUSD * 0.95 * discountMultiplier,
        annually: baseAnnuallyUSD * 0.95 * discountMultiplier,
        prefix: "€"
      },
      CAD: {
        monthly: baseMonthlyUSD * 1.35 * discountMultiplier,
        annually: baseAnnuallyUSD * 1.35 * discountMultiplier,
        prefix: "$"
      }
    };
  }

  // Default currency values if the selected currency doesn't exist
  const fallbackCurrency = {
    prefix: "$",
    monthly: 0,
    annually: 0
  }

  // Get products by type - keeping this for reference but not using for rendering
  const productsByType = products.reduce<Record<string, UIProduct[]>>((acc, product) => {
    if (!acc[product.type]) {
      acc[product.type] = [];
    }
    acc[product.type].push(product);
    return acc;
  }, {});
  
  // Map of currencies to their corresponding country codes for flag display
  const countryCodes: Record<string, string> = {
    USD: 'us',
    GBP: 'gb',
    EUR: 'eu',
    CAD: 'ca',
    AUD: 'au'
  }
  
  // Helper to get display name for product type
  const getProductTypeDisplayName = (type: string): string => {
    switch (type) {
      case "vps": return "VPS Hosting";
      case "dedicated": return "Dedicated Server";
      case "webhosting": return "Web Hosting";
      case "addon": return "Add-on";
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  // Helper to determine if text should be white or black based on background
  const getTextColor = (hexColor: string | undefined): string => {
    if (!hexColor) return 'white';
    
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Calculate brightness using YIQ formula
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    
    // Return black for bright backgrounds, white for dark
    return (yiq >= 128) ? 'black' : 'white';
  };
  
  // Helper function to ensure color has proper contrast for text
  const getContrastColor = (hexColor: string | undefined): string => {
    // Default to orange if no brand color is provided
    if (!hexColor) return '#ff5500';
    
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Darken if too light for visual appeal
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness > 200) {
      // Return a darker version for buttons and UI
      return `rgb(${Math.max(0, r - 60)}, ${Math.max(0, g - 60)}, ${Math.max(0, b - 60)})`;
    }
    
    return hexColor;
  };
  
  // Create a currency selector component with flag backgrounds and cookie storage
  const CurrencySelector = () => {
    const currencies = ["USD", "GBP", "EUR", "CAD"]
    
    // Handle currency change
    const handleCurrencyChange = (curr: string) => {
      setCurrency(curr)
      // Store the user's preference in a cookie
      setCookie(CURRENCY_COOKIE_NAME, curr, COOKIE_EXPIRES_DAYS)
    }
    
    return (
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          {currencies.map((curr) => (
            <button
              key={curr}
              onClick={() => handleCurrencyChange(curr)}
              className={`px-3 py-2 text-sm font-medium relative ${
                currency === curr
                  ? "bg-hyber-orange text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              } ${curr === currencies[0] ? "rounded-l-lg" : ""} ${curr === currencies[currencies.length-1] ? "rounded-r-lg" : ""} border border-gray-200 dark:border-gray-600 transition-all duration-200 ease-in-out`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, ${currency === curr ? '0.4' : '0.7'}), rgba(0, 0, 0, ${currency === curr ? '0.4' : '0.7'})), url(https://flagcdn.com/${countryCodes[curr]}.svg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://flagcdn.com/${countryCodes[curr]}.svg)`;
              }}
              onMouseLeave={(e) => {
                if (currency !== curr) {
                  e.currentTarget.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://flagcdn.com/${countryCodes[curr]}.svg)`;
                }
              }}
            >
              <span style={{ position: 'relative', zIndex: 2, fontSize: '1.1rem', fontWeight: 600 }}>
                {CURRENCY_SYMBOLS[curr] || curr}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Create a badge to show the discount
  const DiscountBadge = ({ discount }: { discount: number }) => {
    if (discount <= 0) return null;
    
    // Removing the discount badge from individual cards
    return null;
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading pricing information...</div>
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">{error}</p>
        </div>
        <CurrencySelector />
        
        <h2 className="text-2xl font-bold mb-8 text-center">
          Available Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col border rounded-lg overflow-hidden relative h-full">
              <div 
                className="p-6"
                style={{
                  backgroundColor: getContrastColor(partner.brandColor),
                  color: getTextColor(getContrastColor(partner.brandColor))
                }}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <span className="inline-block bg-white/20 text-xs px-2 py-1 rounded"
                    style={{ color: getTextColor(getContrastColor(partner.brandColor)) }}
                  >
                    {getProductTypeDisplayName(product.type)}
                  </span>
                </div>
                <p className="mt-2">{product.shortDescription}</p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-6">
                  <p className="text-xs font-medium text-gray-400 mb-1">Starting From</p>
                  <p className="text-3xl font-bold">
                    {product.pricing?.[currency]?.prefix || fallbackCurrency.prefix}
                    {(product.pricing?.[currency]?.monthly || fallbackCurrency.monthly).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">{currency}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed monthly or {product.pricing?.[currency]?.prefix || fallbackCurrency.prefix}
                    {(product.pricing?.[currency]?.annually || fallbackCurrency.annually).toFixed(2)}/year
                  </p>
                </div>
                <ul className="space-y-3 flex-1">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 
                        className="h-5 w-5 flex-shrink-0 mr-2" 
                        style={{ color: getContrastColor(partner.brandColor) }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild 
                  className="mt-6 w-full hover:opacity-90"
                  style={{ 
                    backgroundColor: getContrastColor(partner.brandColor),
                    color: getTextColor(getContrastColor(partner.brandColor))
                  }}
                >
                  <Link href={`/services/${product.type}?plan=${product.id}&currency=${currency}&aff=${affiliateId}`}>
                    {product.type === "addon" ? "Add to Cart" : "Browse Plans"}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CurrencySelector />
      
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-center mb-4">{partner.name} Community Pricing</h2>
        {partner.discount > 0 && (
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
            All prices shown include {partner.name}'s exclusive {partner.discount}% discount
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col border rounded-lg overflow-hidden relative h-full">
            <div 
              className="p-6"
              style={{
                backgroundColor: getContrastColor(partner.brandColor),
                color: getTextColor(getContrastColor(partner.brandColor))
              }}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <span 
                  className="inline-block bg-white/20 text-xs px-2 py-1 rounded"
                  style={{ color: getTextColor(getContrastColor(partner.brandColor)) }}
                >
                  {getProductTypeDisplayName(product.type)}
                </span>
              </div>
              <p className="mt-2">{product.shortDescription}</p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-400 mb-1">Starting From</p>
                <p className="text-3xl font-bold">
                  {product.pricing?.[currency]?.prefix || fallbackCurrency.prefix}
                  {(product.pricing?.[currency]?.monthly || fallbackCurrency.monthly).toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">{currency}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Billed monthly or {product.pricing?.[currency]?.prefix || fallbackCurrency.prefix}
                  {(product.pricing?.[currency]?.annually || fallbackCurrency.annually).toFixed(2)}/year
                </p>
              </div>
              <ul className="space-y-3 flex-1">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 
                      className="h-5 w-5 flex-shrink-0 mr-2" 
                      style={{ color: getContrastColor(partner.brandColor) }}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                asChild 
                className="mt-6 w-full hover:opacity-90"
                style={{ 
                  backgroundColor: getContrastColor(partner.brandColor),
                  color: getTextColor(getContrastColor(partner.brandColor))
                }}
              >
                <Link href={`/services/${product.type}?plan=${product.id}&currency=${currency}&aff=${affiliateId}`}>
                  {product.type === "addon" ? "Add to Cart" : "Browse Plans"}
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}