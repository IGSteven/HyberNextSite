"use client"

import { useState, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchParams } from "next/navigation"
import { getCurrencyFromHostname, CURRENCY_SYMBOLS } from "@/lib/currency-utils"

// Product Type
import { Product } from "@/lib/whmcs/products"

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

export default function ClientVpsPlans() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hostname, setHostname] = useState("")
  
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/client-products?type=vps")

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (data.success && data.products) {
          // Add popular flag to the second product (Ryzen AM4)
          const productsWithPopular = data.products.map((product: Product, index: number) => {
            // Convert pricing to ensure consistent format - some WHMCS pricing may be strings
            // Ensure both regular pricing and minPricing are properly formatted
            if (product.pricing) {
              Object.keys(product.pricing).forEach(curr => {
                if (product.pricing[curr]) {
                  product.pricing[curr].monthly = parseFloat(product.pricing[curr].monthly as any) || 0;
                  product.pricing[curr].annually = parseFloat(product.pricing[curr].annually as any) || 0;
                }
              });
            }
            
            if (product.minPricing) {
              Object.keys(product.minPricing).forEach(curr => {
                if (product.minPricing[curr]) {
                  product.minPricing[curr].monthly = parseFloat(product.minPricing[curr].monthly as any) || 0;
                  product.minPricing[curr].annually = parseFloat(product.minPricing[curr].annually as any) || 0;
                }
              });
            }
            
            return {
              ...product,
              popular: index === 1, // Make the second product popular
            };
          });
          
          setProducts(productsWithPopular)
          console.log("Products loaded:", productsWithPopular)
        } else {
          throw new Error(data.error || "Failed to fetch products")
        }
      } catch (error: any) {
        console.error("Error fetching VPS products:", error)
        let errorMessage = "Failed to load products. Please try again later."
        if (error.message.includes("status 403")) {
          errorMessage = "Failed to load products: Forbidden. Check your API credentials and permissions."
        }
        setError(errorMessage)

        // Use sample data as fallback with minPricing
        setProducts([
          {
            id: 1,
            name: "Legacy Intel VPS",
            description: "Base Clock: 3.60 GHz\nCores: 2\nRAM: 4GB\nStorage: 50GB SSD",
            pricing: { 
              USD: { monthly: 19.99, annually: 199.99, prefix: "$" },
              GBP: { monthly: 15.99, annually: 159.99, prefix: "£" },
              EUR: { monthly: 18.99, annually: 189.99, prefix: "€" },
              CAD: { monthly: 26.99, annually: 269.99, prefix: "C$" }
            },
            minPricing: { 
              USD: { monthly: 24.99, annually: 249.99, prefix: "$" },
              GBP: { monthly: 19.99, annually: 199.99, prefix: "£" },
              EUR: { monthly: 22.99, annually: 229.99, prefix: "€" },
              CAD: { monthly: 31.99, annually: 319.99, prefix: "C$" }
            },
            features: ["Base Clock: 2.50 GHz", "Boost Clock: 3.00 GHz", "Memory: DDR3", "Storage Type: SATA SSD", "Unmetered Bandwidth"],
            type: "vps",
            popular: false,
            configOptionId: 54,
          },
          {
            id: 2,
            name: "Ryzen AM4 VPS",
            description: "Base Clock: 4.20 GHz\nCores: 4\nRAM: 8GB\nStorage: 100GB NVMe",
            pricing: { 
              USD: { monthly: 39.99, annually: 399.99, prefix: "$" },
              GBP: { monthly: 31.99, annually: 319.99, prefix: "£" },
              EUR: { monthly: 36.99, annually: 369.99, prefix: "€" },
              CAD: { monthly: 53.99, annually: 539.99, prefix: "C$" }
            },
            minPricing: { 
              USD: { monthly: 45.99, annually: 459.99, prefix: "$" },
              GBP: { monthly: 36.99, annually: 369.99, prefix: "£" },
              EUR: { monthly: 41.99, annually: 419.99, prefix: "€" },
              CAD: { monthly: 59.99, annually: 599.99, prefix: "C$" }
            },
            features: ["Base Clock: 3.90 GHz", "Boost Clock: 4.50 GHz", "Memory: DDR4", "Storage Type: Gen 3 NVMe", "Unmetered Bandwidth"],
            type: "vps",
            popular: true,
            configOptionId: 53,
          },
          {
            id: 3,
            name: "Ryzen AM5 VPS",
            description: "Base Clock: 4.50 GHz\nCores: 6\nRAM: 16GB\nStorage: 200GB NVMe",
            pricing: { 
              USD: { monthly: 59.99, annually: 599.99, prefix: "$" },
              GBP: { monthly: 47.99, annually: 479.99, prefix: "£" },
              EUR: { monthly: 54.99, annually: 549.99, prefix: "€" },
              CAD: { monthly: 79.99, annually: 799.99, prefix: "C$" }
            },
            minPricing: { 
              USD: { monthly: 69.99, annually: 699.99, prefix: "$" },
              GBP: { monthly: 55.99, annually: 559.99, prefix: "£" },
              EUR: { monthly: 63.99, annually: 639.99, prefix: "€" },
              CAD: { monthly: 89.99, annually: 899.99, prefix: "C$" }
            },
            features: ["Base Clock: 4.50 GHz", "Boost Clock: 5.85 GHz", "Memory: DDR5", "Storage Type: Gen 4 NVMe", "Unmetered Bandwidth"],
            type: "vps",
            popular: false,
            configOptionId: 55,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
    return (
      <div>
        <CurrencySelector />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col border rounded-lg overflow-hidden">
              <div className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-8 w-1/2 mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="p-6 flex-1">
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex items-start">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-10 w-full mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <CurrencySelector />
        <div className="text-center text-red-500">{error}</div>
      </div>
    )
  }

  // Define a fallback for when currency pricing is not available
  const fallbackCurrency = {
    prefix: "$",
    monthly: 0,
    annually: 0
  }

  // Helper function to safely convert values to numbers before using toFixed
  const formatPrice = (price: any): string => {
    // Handle different input types
    if (price === undefined || price === null) return '0.00';
    
    // Try to convert to number if it's not already
    const numberPrice = typeof price === 'number' ? price : parseFloat(String(price).replace(/[^0-9.-]+/g, ''));
    
    // Check if conversion resulted in a valid number
    if (isNaN(numberPrice)) return '0.00';
    
    // Format with 2 decimal places
    return numberPrice.toFixed(2);
  };

  // Helper function to safely get the price source (minPricing or pricing)
  const getPriceSource = (product: Product) => {
    // First try to use minPricing if available (includes required options)
    if (product.minPricing && product.minPricing[currency]) {
      return product.minPricing[currency];
    }
    // Fall back to standard pricing if minPricing is not available
    if (product.pricing && product.pricing[currency]) {
      return product.pricing[currency];
    }
    // Return fallback values if neither is available
    return fallbackCurrency;
  };

  return (
    <div className="w-full">
      <CurrencySelector />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product.id || product.pid} className="relative">
            {product.popular && (
              <div className="absolute top-0 left-0 right-0 z-10 rounded-lg margin-bottom-1">
                <div className="bg-[#A8514A] text-white text-center py-1.5 text-sm font-medium rounded-t-lg">
                  Most Popular
                </div>
              </div>
            )}
            <div className={`flex flex-col border rounded-lg overflow-hidden h-full ${
              product.popular ? "border-t-0" : ""
            }`}>
              <div className={product.popular ? "p-6 text-white" : "p-6"}>
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className={`mt-3 ${product.popular ? "text-white/80" : "text-muted-foreground"}`}>
                  High-performance virtual server
                </p>
                <div className="mt-6">
                  <p className="text-xs font-medium text-gray-400 mb-2">Starting From</p>
                  <p className="text-4xl font-bold">
                    {getPriceSource(product).prefix || fallbackCurrency.prefix}
                    {formatPrice(getPriceSource(product).monthly)}
                    <span className={`text-sm font-normal ml-1 ${product.popular ? "text-white/80" : "text-muted-foreground"}`}>
                      {currency}
                    </span>
                  </p>
                  <p className={`text-sm mt-2 ${product.popular ? "text-white/80" : "text-muted-foreground"}`}>
                    Billed monthly or {getPriceSource(product).prefix || fallbackCurrency.prefix}
                    {formatPrice(getPriceSource(product).annually)}/year
                  </p>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 flex-1">
                  {Array.isArray(product.features) && product.features.length > 0 ? (
                    product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-3" />
                      <span>Basic VPS Features</span>
                    </li>
                  )}
                </ul>
                <Button
                  asChild
                  className="mt-8 w-full bg-hyber-orange hover:bg-hyber-red py-6 text-base"
                >
                  <Link
                    href={`/order?product=${product.id || product.pid}&type=vps${
                      product.configOptionId ? `&configid=${product.configOptionId}` : ""
                    }&currency=${currency}`}
                  >
                    Configure & Order
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
