"use client"

import { useState, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getCurrencyFromHostname, CURRENCY_SYMBOLS } from "@/lib/currency-utils"

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
}

export default function PricingTable() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<UIProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hostname, setHostname] = useState("")
  const [error, setError] = useState<string | null>(null)
  
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
  
  // Transform WHMCS product to UI product format
  const transformProduct = (product: Product, type: string): UIProduct => {
    // Extract pricing information
    const pricingByCurrency: Record<string, { monthly: number; annually: number; prefix: string }> = {};
    
    // Process each currency in the product's pricing
    // Use minPricing if available (which includes required options), otherwise fall back to standard pricing
    const pricingSource = product.minPricing || product.pricing;
    
    Object.entries(pricingSource).forEach(([currencyCode, pricingInfo]) => {
      pricingByCurrency[currencyCode] = {
        monthly: parseFloat(pricingInfo.monthly) || 0,
        annually: parseFloat(pricingInfo.annually) || 0,
        prefix: pricingInfo.prefix || "$"
      };
    });
    
    return {
      id: product.pid,
      name: product.name,
      shortDescription: product.description || `High-performance ${type}`,
      pricing: pricingByCurrency,
      features: product.features || [],
      type
    };
  };
  
  useEffect(() => {
    // Fetch products from our server-side API endpoint instead of directly calling WHMCS API
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch VPS products (gid: 19) from our server API
        const vpsResponse = await fetch(`/api/products/by-group?gid=19`);
        const vpsData: ApiResponse = await vpsResponse.json();
        
        if (!vpsData.success || !vpsData.products) {
          throw new Error(vpsData.error || "Failed to fetch VPS products");
        }
        
        // Fetch Dedicated Server products (gid: 14) from our server API
        const dedicatedResponse = await fetch(`/api/products/by-group?gid=14`);
        const dedicatedData: ApiResponse = await dedicatedResponse.json();
        
        if (!dedicatedData.success || !dedicatedData.products) {
          throw new Error(dedicatedData.error || "Failed to fetch Dedicated Server products");
        }
        
        // Transform products to the format expected by the UI
        const transformedVpsProducts = vpsData.products.map(product => 
          transformProduct(product, 'vps')
        );
        
        const transformedDedicatedProducts = dedicatedData.products.map(product => 
          transformProduct(product, 'dedicated')
        );
        
        // Combine all products
        setProducts([...transformedVpsProducts, ...transformedDedicatedProducts]);
      } catch (error) {
        console.error("Error loading products:", error);
        setError("Failed to load product information. Using fallback data.");
        // Use sample data as fallback
        setProducts(getSampleData());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const getSampleData = (): UIProduct[] => {
    // Sample data with multi-currency support
    const sampleVpsPlans: UIProduct[] = [
      {
        id: 1,
        name: "Legacy Intel VPS",
        shortDescription: "Reliable Intel-based virtual servers",
        pricing: {
          USD: { monthly: 19.99, annually: 199.99, prefix: "$" },
          GBP: { monthly: 15.99, annually: 159.99, prefix: "£" },
          EUR: { monthly: 18.99, annually: 189.99, prefix: "€" },
          CAD: { monthly: 26.99, annually: 269.99, prefix: "$" }
        },
        features: ["Base Clock: 3.60 GHz", "Cores: 2", "RAM: 4GB", "Storage: 50GB SSD", "Unmetered Bandwidth"],
        type: "vps",
      },
      {
        id: 2,
        name: "Ryzen AM4 VPS",
        shortDescription: "High-performance AMD Ryzen servers",
        pricing: {
          USD: { monthly: 39.99, annually: 399.99, prefix: "$" },
          GBP: { monthly: 31.99, annually: 319.99, prefix: "£" },
          EUR: { monthly: 36.99, annually: 369.99, prefix: "€" },
          CAD: { monthly: 0, annually: 0, prefix: "$" } // Adding CAD to match interface
        },
        features: ["Base Clock: 4.20 GHz", "Cores: 4", "RAM: 8GB", "Storage: 100GB NVMe", "Unmetered Bandwidth"],
        type: "vps",
      },
      {
        id: 3,
        name: "Ryzen AM5 VPS",
        shortDescription: "Latest generation AMD Ryzen technology",
        pricing: {
          USD: { monthly: 59.99, annually: 599.99, prefix: "$" },
          GBP: { monthly: 47.99, annually: 479.99, prefix: "£" },
          EUR: { monthly: 54.99, annually: 549.99, prefix: "€" },
          CAD: { monthly: 0, annually: 0, prefix: "$" } // Adding CAD to match interface
        },
        features: ["Base Clock: 4.50 GHz", "Cores: 6", "RAM: 16GB", "Storage: 200GB NVMe", "Unmetered Bandwidth"],
        type: "vps",
      },
    ]

    const sampleDedicatedPlans: UIProduct[] = [
      {
        id: 4,
        name: "Basic Dedicated",
        shortDescription: "Entry-level dedicated server",
        pricing: {
          USD: { monthly: 99.99, annually: 999.99, prefix: "$" },
          GBP: { monthly: 79.99, annually: 799.99, prefix: "£" },
          EUR: { monthly: 94.99, annually: 949.99, prefix: "€" },
          CAD: { monthly: 134.99, annually: 1349.99, prefix: "$" }
        },
        features: ["4 CPU Cores", "16GB RAM", "500GB SSD Storage", "Unmetered Bandwidth", "Full Hardware Control"],
        type: "dedicated",
      },
      {
        id: 5,
        name: "Pro Dedicated",
        shortDescription: "For resource-intensive applications",
        pricing: {
          USD: { monthly: 149.99, annually: 1499.99, prefix: "$" },
          GBP: { monthly: 119.99, annually: 1199.99, prefix: "£" },
          EUR: { monthly: 139.99, annually: 1399.99, prefix: "€" },
          CAD: { monthly: 0, annually: 0, prefix: "$" } // Adding CAD to match interface
        },
        features: [
          "8 CPU Cores",
          "32GB RAM",
          "1TB SSD Storage",
          "Unmetered Bandwidth",
          "Full Hardware Control",
          "DDoS Protection",
        ],
        type: "dedicated",
      },
      {
        id: 6,
        name: "Enterprise Dedicated",
        shortDescription: "High-performance dedicated server",
        pricing: {
          USD: { monthly: 199.99, annually: 1999.99, prefix: "$" },
          GBP: { monthly: 159.99, annually: 1599.99, prefix: "£" },
          EUR: { monthly: 189.99, annually: 1899.99, prefix: "€" },
          CAD: { monthly: 0, annually: 0, prefix: "$" } // Adding CAD to match interface
        },
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
      },
    ]

    return [...sampleVpsPlans, ...sampleDedicatedPlans]
  }

  // Default currency values if the selected currency doesn't exist
  const fallbackCurrency = {
    prefix: "$",
    monthly: 0,
    annually: 0
  }

  const displayVpsProducts = products.filter(product => product.type === "vps")
  const displayDedicatedProducts = products.filter(product => product.type === "dedicated")
  
  // Map of currencies to their corresponding country codes for flag display
  const countryCodes: Record<string, string> = {
    USD: 'us',
    GBP: 'gb',
    EUR: 'eu',
    CAD: 'ca',
    AUD: 'au'
  }
  
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
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">VPS Hosting Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayVpsProducts.map((product) => (
              <div key={product.id} className="flex flex-col border rounded-lg overflow-hidden">
                <div className="bg-hyber-orange p-6 text-white">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="mt-2 text-white">{product.shortDescription || "High-performance virtual server"}</p>
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
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full bg-hyber-orange hover:bg-hyber-red">
                    <Link href={`/services/vps?plan=${product.id}&currency=${currency}`}>Browse Plans</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Dedicated Server Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayDedicatedProducts.map((product) => (
              <div key={product.id} className="flex flex-col border rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-hyber-orange to-hyber-red p-6 text-white">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="mt-2 text-white">{product.shortDescription || "High-performance dedicated server"}</p>
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
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full bg-hyber-orange hover:bg-hyber-red border-b border-gray-200">
                    <Link href={`/services/dedicated?plan=${product.id}&currency=${currency}`}>Select Plan</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CurrencySelector />
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">VPS Hosting Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayVpsProducts.map((product) => (
            <div key={product.id} className="flex flex-col border rounded-lg overflow-hidden">
              <div className="bg-hyber-orange p-6 text-white">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-2 text-white">{product.shortDescription || "High-performance virtual server"}</p>
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
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href={`/services/vps?plan=${product.id}&currency=${currency}`}>Browse Plans</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Dedicated Server Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayDedicatedProducts.map((product) => (
            <div key={product.id} className="flex flex-col border rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-hyber-orange to-hyber-red p-6 text-white">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-2 text-white">{product.shortDescription || "High-performance dedicated server"}</p>
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
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full bg-hyber-orange hover:bg-hyber-red border-b border-gray-200">
                  <Link href={`/services/dedicated?plan=${product.id}&currency={currency}`}>Select Plan</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
