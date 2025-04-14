import { getProducts } from "@/lib/whmcs-api"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function PricingTable() {
  // Fetch products from WHMCS API
  const products = await getProducts()

  // Group products by type
  const vpsProducts = products.filter((product) => product.type === "vps").slice(0, 3)
  const dedicatedProducts = products.filter((product) => product.type === "dedicated").slice(0, 3)

  // If no products are returned from the API, show sample data
  const showSampleData = products.length === 0

  const sampleVpsPlans = [
    {
      id: 1,
      name: "Legacy Intel VPS",
      shortDescription: "Reliable Intel-based virtual servers",
      pricing: { monthly: 19.99, annually: 199.99 },
      features: ["Base Clock: 3.60 GHz", "Cores: 2", "RAM: 4GB", "Storage: 50GB SSD", "Unmetered Bandwidth"],
      type: "vps",
    },
    {
      id: 2,
      name: "Ryzen AM4 VPS",
      shortDescription: "High-performance AMD Ryzen servers",
      pricing: { monthly: 39.99, annually: 399.99 },
      features: ["Base Clock: 4.20 GHz", "Cores: 4", "RAM: 8GB", "Storage: 100GB NVMe", "Unmetered Bandwidth"],
      type: "vps",
    },
    {
      id: 3,
      name: "Ryzen AM5 VPS",
      shortDescription: "Latest generation AMD Ryzen technology",
      pricing: { monthly: 59.99, annually: 599.99 },
      features: ["Base Clock: 4.50 GHz", "Cores: 6", "RAM: 16GB", "Storage: 200GB NVMe", "Unmetered Bandwidth"],
      type: "vps",
    },
  ]

  const sampleDedicatedPlans = [
    {
      id: 4,
      name: "Basic Dedicated",
      shortDescription: "Entry-level dedicated server",
      pricing: { monthly: 99.99, annually: 999.99 },
      features: ["4 CPU Cores", "16GB RAM", "500GB SSD Storage", "Unmetered Bandwidth", "Full Hardware Control"],
      type: "dedicated",
    },
    {
      id: 5,
      name: "Pro Dedicated",
      shortDescription: "For resource-intensive applications",
      pricing: { monthly: 149.99, annually: 1499.99 },
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
      pricing: { monthly: 199.99, annually: 1999.99 },
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

  const displayVpsProducts = showSampleData ? sampleVpsPlans : vpsProducts
  const displayDedicatedProducts = showSampleData ? sampleDedicatedPlans : dedicatedProducts

  return (
    <div className="w-full">
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
                  <p className="text-3xl font-bold">
                    ${(product.pricing.monthly || 19.99).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed monthly or ${(product.pricing.annually || product.pricing.monthly * 10).toFixed(2)}/year
                  </p>
                </div>
                <ul className="space-y-3 flex-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href={`/services/vps?plan=${product.id}`}>Select Plan</Link>
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
                  <p className="text-3xl font-bold">
                    ${(product.pricing.monthly || 99.99).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed monthly or ${(product.pricing.annually || product.pricing.monthly * 10).toFixed(2)}/year
                  </p>
                </div>
                <ul className="space-y-3 flex-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full bg-hyber-orange hover:bg-hyber-red border-b border-gray-200">
                  <Link href={`/services/dedicated?plan=${product.id}`}>Select Plan</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
