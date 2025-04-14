import { getProductsByType } from "@/lib/whmcs-api"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function VpsPlans() {
  // Fetch VPS products from WHMCS API with error handling
  let products = []
  let showSampleData = false

  try {
    products = await getProductsByType("vps")
    showSampleData = products.length === 0
  } catch (error) {
    console.error("Error fetching VPS products:", error)
    showSampleData = true
  }

  // Sample data to use if API fails
  const sampleVpsPlans = [
    {
      id: 1,
      name: "Starter VPS",
      description: "Perfect for small websites and applications",
      pricing: { monthly: 19.99, annually: 199.99 },
      features: ["2 vCPU Cores", "4GB RAM", "50GB SSD Storage", "Unmetered Bandwidth", "Full Root Access"],
      type: "vps",
      popular: false,
    },
    {
      id: 2,
      name: "Business VPS",
      description: "Ideal for growing businesses",
      pricing: { monthly: 39.99, annually: 399.99 },
      features: [
        "4 vCPU Cores",
        "8GB RAM",
        "100GB SSD Storage",
        "Unmetered Bandwidth",
        "Full Root Access",
        "Daily Backups",
      ],
      type: "vps",
      popular: true,
    },
    {
      id: 3,
      name: "Premium VPS",
      description: "For high-traffic websites and applications",
      pricing: { monthly: 59.99, annually: 599.99 },
      features: [
        "6 vCPU Cores",
        "16GB RAM",
        "200GB SSD Storage",
        "Unmetered Bandwidth",
        "Full Root Access",
        "Daily Backups",
        "DDoS Protection",
      ],
      type: "vps",
      popular: false,
    },
    {
      id: 4,
      name: "Enterprise VPS",
      description: "For resource-intensive applications",
      pricing: { monthly: 99.99, annually: 999.99 },
      features: [
        "8 vCPU Cores",
        "32GB RAM",
        "500GB SSD Storage",
        "Unmetered Bandwidth",
        "Full Root Access",
        "Daily Backups",
        "DDoS Protection",
        "Dedicated IP Addresses",
      ],
      type: "vps",
      popular: false,
    },
  ]

  const displayVpsProducts = showSampleData ? sampleVpsPlans : products

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {displayVpsProducts.map((product) => (
        <div
          key={product.id}
          className={`flex flex-col border rounded-lg overflow-hidden ${
            product.popular ? "ring-2 ring-hyber-orange shadow-lg" : ""
          }`}
        >
          {product.popular && (
            <div className="bg-hyber-orange text-white text-center py-1 text-sm font-medium">Most Popular</div>
          )}
          <div className={`${product.popular ? "bg-hyber-orange/10 dark:bg-blue-900/20" : ""} p-6`}>
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
            <div className="mt-4">
              <p className="text-3xl font-bold">
                ${product.pricing.monthly.toFixed(2)}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Billed monthly or ${product.pricing.annually?.toFixed(2)}/year
              </p>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <ul className="space-y-3 flex-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={`mt-6 w-full ${
                product.popular ? "bg-hyber-orange hover:bg-hyber-red" : "bg-hyber-orange hover:bg-hyber-red"
              }`}
            >
              <Link href={`/order?product=${product.id}&type=vps`}>Select Plan</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
