"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Server, HardDrive, Cpu } from "lucide-react"
import Link from "next/link"

interface ConfigOption {
  id: number
  name: string
  options: {
    id: number
    name: string
    pricing: {
      monthly: number
      quarterly: number
      semiannually: number
      annually: number
    }
  }[]
}

interface Product {
  id: number
  name: string
  description: string
  pricing: {
    monthly: number
    annually: number
  }
  features: string[]
  type: "vps" | "dedicated" | "cloud"
  configOptions?: ConfigOption[]
}

export default function OrderPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get("product")
  const productType = searchParams.get("type") || "vps"
  const configId = searchParams.get("configid")

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [configOptions, setConfigOptions] = useState<ConfigOption[]>([])
  const [selectedConfigOption, setSelectedConfigOption] = useState<string>("")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [osOption, setOsOption] = useState("ubuntu")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orderStep, setOrderStep] = useState(1)

  // Fetch products and config options
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch products
        const productsResponse = await fetch(`/api/client-products?type=${productType}`)
        if (!productsResponse.ok) {
          throw new Error(`Failed to fetch products: ${productsResponse.statusText}`)
        }
        const productsData = await productsResponse.json()

        if (!productsData.success || !productsData.products) {
          throw new Error("Failed to fetch products")
        }

        setProducts(productsData.products)

        // Find the selected product
        const product = productId
          ? productsData.products.find((p: Product) => p.id.toString() === productId)
          : productsData.products[0]

        if (!product) {
          throw new Error("Selected product not found")
        }

        setSelectedProduct(product)

        // Fetch config options if product is found
        if (product.id) {
          const configResponse = await fetch(`/api/product-config?productId=${product.id}`)
          if (!configResponse.ok) {
            throw new Error(`Failed to fetch config options: ${configResponse.statusText}`)
          }

          const configData = await configResponse.json()
          if (configData.success && configData.configOptions) {
            setConfigOptions(configData.configOptions)

            // Set default selected config option
            if (configData.configOptions.length > 0 && configData.configOptions[0].options.length > 0) {
              const defaultOption = configId
                ? configData.configOptions[0].options.find((o: any) => o.id.toString() === configId)?.id.toString()
                : configData.configOptions[0].options[0].id.toString()

              setSelectedConfigOption(defaultOption || configData.configOptions[0].options[0].id.toString())
            }
          }
        }
      } catch (err: any) {
        console.error("Error fetching data:", err)
        setError(err.message || "An error occurred while loading product information")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [productId, productType, configId])

  const handleProductChange = (id: string) => {
    // Update URL without refreshing the page
    router.push(`/order?product=${id}&type=${productType}`)
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
    let basePrice = 0

    // Get base product price
    if (selectedProduct) {
      basePrice = billingCycle === "monthly" ? selectedProduct.pricing.monthly : selectedProduct.pricing.annually
    }

    // Add config option price if selected
    if (selectedConfigOption && configOptions.length > 0) {
      const configOption = configOptions[0]
      const selectedOption = configOption.options.find((o) => o.id.toString() === selectedConfigOption)

      if (selectedOption) {
        basePrice = billingCycle === "monthly" ? selectedOption.pricing.monthly : selectedOption.pricing.annually
      }
    }

    return basePrice
  }

  // Get the selected configuration option details
  const getSelectedConfigDetails = () => {
    if (!selectedConfigOption || configOptions.length === 0) return null

    const configOption = configOptions[0]
    return configOption.options.find((o) => o.id.toString() === selectedConfigOption)
  }

  const selectedConfig = getSelectedConfigDetails()

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Order {selectedProduct.name}</h1>
          <p className="text-muted-foreground mt-2">Configure and order your new server</p>
        </div>

        {/* Order Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  orderStep >= 1 ? "bg-hyber-orange text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700"
                }`}
              >
                1
              </div>
              <span className="text-sm mt-2">Configure</span>
            </div>
            <div className={`flex-1 h-1 ${orderStep >= 2 ? "bg-hyber-orange" : "bg-gray-200 dark:bg-gray-700"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  orderStep >= 2 ? "bg-hyber-orange text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700"
                }`}
              >
                2
              </div>
              <span className="text-sm mt-2">Review</span>
            </div>
            <div className={`flex-1 h-1 ${orderStep >= 3 ? "bg-hyber-orange" : "bg-gray-200 dark:bg-gray-700"}`}></div>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  orderStep >= 3 ? "bg-hyber-orange text-white" : "bg-gray-200 text-gray-600 dark:bg-gray-700"
                }`}
              >
                3
              </div>
              <span className="text-sm mt-2">Checkout</span>
            </div>
          </div>
        </div>

        {/* Step 1: Configure */}
        {orderStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Configure Your Server</CardTitle>
                  <CardDescription>Select your preferred options for your new server</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Product Selection */}
                  <div>
                    <Label htmlFor="product">Select Product</Label>
                    <Select value={selectedProduct.id.toString()} onValueChange={handleProductChange}>
                      <SelectTrigger id="product">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Configuration Options */}
                  {configOptions.length > 0 && configOptions[0].options.length > 0 && (
                    <div>
                      <Label htmlFor="config">{configOptions[0].name}</Label>
                      <Select value={selectedConfigOption} onValueChange={setSelectedConfigOption}>
                        <SelectTrigger id="config">
                          <SelectValue placeholder="Select a configuration" />
                        </SelectTrigger>
                        <SelectContent>
                          {configOptions[0].options.map((option) => (
                            <SelectItem key={option.id} value={option.id.toString()}>
                              {option.name} - ${option.pricing.monthly.toFixed(2)}/mo
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Billing Cycle */}
                  <div>
                    <Label>Billing Cycle</Label>
                    <RadioGroup
                      value={billingCycle}
                      onValueChange={setBillingCycle}
                      className="flex flex-col space-y-1 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="cursor-pointer">
                          Monthly - ${calculateTotal().toFixed(2)}/month
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="annually" id="annually" />
                        <Label htmlFor="annually" className="cursor-pointer">
                          Annually - ${(calculateTotal() * 10).toFixed(2)}/year (Save{" "}
                          {(((calculateTotal() * 12 - calculateTotal() * 10) / (calculateTotal() * 12)) * 100).toFixed(
                            0,
                          )}
                          %)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Operating System - Only show for dedicated servers */}
                  {productType !== "vps" && (
                    <div>
                      <Label htmlFor="os">Operating System</Label>
                      <Select value={osOption} onValueChange={setOsOption}>
                        <SelectTrigger id="os">
                          <SelectValue placeholder="Select an operating system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ubuntu">Ubuntu 22.04 LTS</SelectItem>
                          <SelectItem value="almalinux">AlmaLinux 9</SelectItem>
                          <SelectItem value="debian">Debian 11</SelectItem>
                          <SelectItem value="windows">Windows Server 2022</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/services/${productType}`}>Cancel</Link>
                  </Button>
                  <Button onClick={handleContinue} className="bg-hyber-orange hover:bg-hyber-red">
                    Continue to Review
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{selectedProduct.name}</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  {selectedConfig && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{selectedConfig.name}</span>
                      <span>Included</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <div className="text-sm text-muted-foreground mb-2">
                      {billingCycle === "monthly" ? "Billed monthly" : "Billed annually"}
                    </div>
                    <Button onClick={handleContinue} className="w-full bg-hyber-orange hover:bg-hyber-red">
                      Continue to Review
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {orderStep === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                  <CardDescription>
                    Please review your server configuration before proceeding to checkout
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">{selectedProduct.name}</h3>
                    {selectedConfig && <p className="text-sm mb-4">Configuration: {selectedConfig.name}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProduct.features.slice(0, 3).map((feature, index) => {
                        const [label, value] = feature.includes(":")
                          ? feature.split(":").map((s) => s.trim())
                          : [feature, ""]
                        return (
                          <div key={index} className="flex items-start">
                            {label.toLowerCase().includes("cpu") || label.toLowerCase().includes("core") ? (
                              <Cpu className="h-5 w-5 text-hyber-orange mr-2 mt-0.5" />
                            ) : label.toLowerCase().includes("ram") ? (
                              <Server className="h-5 w-5 text-hyber-orange mr-2 mt-0.5" />
                            ) : label.toLowerCase().includes("storage") ||
                              label.toLowerCase().includes("ssd") ||
                              label.toLowerCase().includes("nvme") ? (
                              <HardDrive className="h-5 w-5 text-hyber-orange mr-2 mt-0.5" />
                            ) : (
                              <CheckCircle2 className="h-5 w-5 text-hyber-orange mr-2 mt-0.5" />
                            )}
                            <div>
                              <p className="font-medium">{label}</p>
                              {value && <p className="text-sm text-muted-foreground">{value}</p>}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      {productType !== "vps" && (
                        <div className="flex justify-between">
                          <span className="text-sm">Operating System:</span>
                          <span className="text-sm font-medium">
                            {osOption === "ubuntu"
                              ? "Ubuntu 22.04 LTS"
                              : osOption === "almalinux"
                                ? "AlmaLinux 9"
                                : osOption === "debian"
                                  ? "Debian 11"
                                  : "Windows Server 2022"}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm">Billing Cycle:</span>
                        <span className="text-sm font-medium">
                          {billingCycle === "monthly" ? "Monthly" : "Annually"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Additional Features</h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.slice(3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-hyber-orange mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleContinue} className="bg-hyber-orange hover:bg-hyber-red">
                    Continue to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{selectedProduct.name}</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  {selectedConfig && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{selectedConfig.name}</span>
                      <span>Included</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <div className="text-sm text-muted-foreground mb-2">
                      {billingCycle === "monthly" ? "Billed monthly" : "Billed annually"}
                    </div>
                    <Button onClick={handleContinue} className="w-full bg-hyber-orange hover:bg-hyber-red">
                      Continue to Checkout
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* Step 3: Checkout */}
        {orderStep === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Enter your payment details to complete your order</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="credit-card">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="credit-card" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="name">Name on Card</Label>
                          <Input id="name" placeholder="John Doe" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="paypal" className="mt-4">
                      <div className="text-center py-8">
                        <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                        <Button className="bg-hyber-orange hover:bg-hyber-red">Proceed to PayPal</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="bank-transfer" className="mt-4">
                      <div className="text-center py-8">
                        <p className="mb-4">Please use the following details to make a bank transfer:</p>
                        <div className="text-left max-w-md mx-auto space-y-2">
                          <p>
                            <strong>Bank Name:</strong> Example Bank
                          </p>
                          <p>
                            <strong>Account Name:</strong> HostPro Inc.
                          </p>
                          <p>
                            <strong>Account Number:</strong> 1234567890
                          </p>
                          <p>
                            <strong>Routing Number:</strong> 987654321
                          </p>
                          <p>
                            <strong>Reference:</strong> ORDER-{Math.floor(Math.random() * 1000000)}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Billing Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 Main St" />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input id="state" placeholder="NY" />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP/Postal Code</Label>
                        <Input id="zip" placeholder="10001" />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button onClick={handleContinue} className="bg-hyber-orange hover:bg-hyber-red" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Complete Order"}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{selectedProduct.name}</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  {selectedConfig && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{selectedConfig.name}</span>
                      <span>Included</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <div className="text-sm text-muted-foreground mb-2">
                      {billingCycle === "monthly" ? "Billed monthly" : "Billed annually"}
                    </div>
                    <Button
                      onClick={handleContinue}
                      className="w-full bg-hyber-orange hover:bg-hyber-red"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Complete Order"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
