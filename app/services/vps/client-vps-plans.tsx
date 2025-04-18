"use client"

import { useState, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchParams } from "next/navigation"
import { getCurrencyFromHostname } from "@/lib/currency-utils"

// Product Type
import { Product } from "@/lib/whmcs/products"

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
  
  // Get currency from URL query parameter or from domain
  const currencyFromQuery = searchParams.get("currency")
  const domainDefaultCurrency = hostname ? getCurrencyFromHostname(hostname) : "USD"
  const currency = currencyFromQuery || domainDefaultCurrency

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
          const productsWithPopular = data.products.map((product: Product, index: number) => ({
            ...product,
            popular: index === 1, // Make the second product popular
          }))
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

        // Use sample data as fallback
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
            features: ["Base Clock: 3.60 GHz", "Cores: 2", "RAM: 4GB", "Storage: 50GB SSD", "Unmetered Bandwidth"],
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
            features: ["Base Clock: 4.20 GHz", "Cores: 4", "RAM: 8GB", "Storage: 100GB NVMe", "Unmetered Bandwidth"],
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
            features: ["Base Clock: 4.50 GHz", "Cores: 6", "RAM: 16GB", "Storage: 200GB NVMe", "Unmetered Bandwidth"],
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

  if (isLoading) {
    return (
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
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id || product.pid}
          className={`flex flex-col border rounded-lg overflow-hidden ${
            product.popular ? "ring-2 ring-hyber-orange shadow-lg" : ""
          }`}
        >
          {product.popular && (
            <div className="bg-hyber-orange text-white text-center py-1 text-sm font-medium">Most Popular</div>
          )}
          <div className={`${product.popular ? "bg-hyber-orange/10 dark:bg-blue-900/20" : ""} p-6`}>
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">Starting configuration</p>
            <div className="mt-4">
              <p className="text-3xl font-bold">
                {product.pricing?.[currency].prefix}{product.pricing?.[currency]?.monthly || "N/A"}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Billed monthly or {product.pricing?.[currency].prefix}{product.pricing?.[currency]?.annually || "N/A"}/year
              </p>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <ul className="space-y-3 flex-1">
              {Array.isArray(product.features) && product.features.length > 0 ? (
                product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                  <span className="text-sm">Basic VPS Features</span>
                </li>
              )}
            </ul>
            <Button
              asChild
              className={`mt-6 w-full ${
                product.popular ? "bg-hyber-orange hover:bg-hyber-red" : "bg-hyber-orange hover:bg-hyber-red"
              }`}
            >
              <Link
                href={`/order?product=${product.id || product.pid}&type=vps${
                  product.configOptionId ? `&configid=${product.configOptionId}` : ""
                }`}
              >
                Configure & Order
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
