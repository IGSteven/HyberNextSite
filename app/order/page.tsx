"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  pricing: {
    monthly: number
    annually: number
  }
  features: string[]
  type: string
  configOptionId?: number
}

const sampleProducts = {
  vps: [
    {
      id: 1,
      name: "VPS Basic",
      description: "Basic VPS server",
      pricing: { monthly: 10, annually: 100 },
      features: ["1 vCPU", "1GB RAM", "20GB SSD Storage"],
      type: "vps",
    },
    {
      id: 2,
      name: "VPS Standard",
      description: "Standard VPS server",
      pricing: { monthly: 20, annually: 200 },
      features: ["2 vCPU", "2GB RAM", "40GB SSD Storage"],
      type: "vps",
    },
  ],
  dedicated: [
    {
      id: 3,
      name: "Dedicated Server Basic",
      description: "Basic dedicated server",
      pricing: { monthly: 100, annually: 1000 },
      features: ["Intel Xeon E3-1230", "16GB RAM", "1TB HDD"],
      type: "dedicated",
    },
  ],
}

export default function OrderPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get("product")
  const productType = searchParams.get("type") || "vps"

  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [configOptions, setConfigOptions] = useState([])
  const [selectedConfig, setSelectedConfig] = useState<any>(null)
  const [osOption, setOsOption] = useState("ubuntu")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderStep, setOrderStep] = useState(1)

  // Find the selected product based on URL parameters
  useEffect(() => {
    const fetchProductAndConfig = async () => {
      if (productId && productType) {
        try {
          setIsLoading(true)
          const response = await fetch(`/api/client-products?type=${productType}`)
          const data = await response.json()

          if (data.success && data.products) {
            const product = data.products.find((p: any) => p.id.toString() === productId)

            if (product) {
              setSelectedProduct(product)

              // Fetch configuration options
              const configResponse = await fetch(`/api/product-config?productId=${productId}`)
              const configData = await configResponse.json()

              if (configData.success && configData.configOptions) {
                setConfigOptions(configData.configOptions)
                // Set initial config selection to the first option
                if (configData.configOptions.length > 0 && configData.configOptions[0].options.length > 0) {
                  setSelectedConfig(configData.configOptions[0].options[0])
                }
              } else {
                setError(configData.error || "Failed to fetch configuration options")
              }
            } else {
              setError("Selected product not found")
            }
          } else {
            setError(data.error || "Failed to fetch products")
          }
        } catch (err) {
          setError("An unexpected error occurred")
          console.error(err)
        } finally {
          setIsLoading(false)
        }
      } else if (!productId) {
        // If no product is selected, default to the first VPS product
        try {
          setIsLoading(true)
          const response = await fetch(`/api/client-products?type=vps`)
          const data = await response.json()

          if (data.success && data.products && data.products.length > 0) {
            const firstProduct = data.products[0]
            setSelectedProduct(firstProduct)

            // Fetch configuration options for the first product
            const configResponse = await fetch(`/api/product-config?productId=${firstProduct.id}`)
            const configData = await configResponse.json()

            if (configData.success && configData.configOptions) {
              setConfigOptions(configData.configOptions)
              // Set initial config selection to the first option
              if (configData.configOptions.length > 0 && configData.configOptions[0].options.length > 0) {
                setSelectedConfig(configData.configOptions[0].options[0])
              }
            } else {
              setError(configData.error || "Failed to fetch configuration options")
            }
          } else {
            setError(data.error || "No VPS products found")
          }
        } catch (err) {
          setError("An unexpected error occurred")
          console.error(err)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchProductAndConfig()
  }, [productId, productType])

  const handleProductChange = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/client-products?type=${productType}`)
      const data = await response.json()

      if (data.success && data.products) {
        const product = data.products.find((p: any) => p.id.toString() === id)

        if (product) {
          setSelectedProduct(product)
          // Update URL without refreshing the page
          router.push(`/order?product=${id}&type=${productType}`)

          // Fetch configuration options
          const configResponse = await fetch(`/api/product-config?productId=${id}`)
          const configData = await configResponse.json()

          if (configData.success && configData.configOptions) {
            setConfigOptions(configData.configOptions)
            // Set initial config selection to the first option
            if (configData.configOptions.length > 0 && configData.configOptions[0].options.length > 0) {
              setSelectedConfig(configData.configOptions[0].options[0])
            }
          } else {
            setError(configData.error || "Failed to fetch configuration options")
          }
        } else {
          setError("Selected product not found")
        }
      } else {
        setError(data.error || "Failed to fetch products")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinue = () => {
    if (orderStep < 3) {
      setOrderStep(orderStep + 1)
    } else {
      // Submit order
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to success page or dashboard
        router.push("/dashboard")
      }, 2000)
    }
  }

  const handleBack = () => {
    if (orderStep > 1) {
      setOrderStep(orderStep - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Loading Order Details</h1>
            <p className="text-muted-foreground mt-2">Please wait while we load your order information...</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hyber-orange"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !selectedProduct) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "No product selected. Please select a product to order."}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const calculateTotal = () => {
    let basePrice = billingCycle === "monthly" ? selectedProduct.pricing.monthly : selectedProduct.pricing.annually

    if (selectedConfig) {
      basePrice += billingCycle === "monthly" ? selectedConfig.pricing.monthly : selectedConfig.pricing.annually
    }

    // Add any additional costs here (e.g., add-ons, setup fees)
    return basePrice
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Payment Information</h1>
          <p className="text-muted-foreground mt-2">Enter your payment details to complete your order</p>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between">
            <span>{selectedProduct.name}</span>
            <span>
              $
              {billingCycle === "monthly"
                ? selectedProduct.pricing.monthly.toFixed(2)
                : selectedProduct.pricing.annually.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div>
              <Label htmlFor="address">Billing Address</Label>
              <Input id="address" placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Anytown" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="CA" />
              </div>
              <div>
                <Label htmlFor="zip">Zip Code</Label>
                <Input id="zip" placeholder="12345" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Billing Cycle</h3>
          <RadioGroup defaultValue="monthly" className="flex space-x-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="annually" id="annually" />
              <Label htmlFor="annually">Annually</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card">Credit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" disabled />
              <Label htmlFor="paypal" className="cursor-not-allowed">
                PayPal (Coming Soon)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank-transfer" id="bank-transfer" disabled />
              <Label htmlFor="bank-transfer" className="cursor-not-allowed">
                Bank Transfer (Coming Soon)
              </Label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button className="bg-hyber-orange hover:bg-hyber-red" disabled={isLoading}>
            {isLoading ? "Processing..." : "Complete Order"}
          </Button>
        </div>
      </div>
    </div>
  )
}
