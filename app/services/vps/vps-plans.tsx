import { getProducts } from "@/lib/whmcs/products"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function VpsPlans() {
  let products = []
  try {
    products = await getProducts({ gid: 19 });
  } catch (error) {
    console.error("Error fetching VPS products:", error)
    // Handle error (e.g., show a message to the user)
    return (<div>Error loading VPS plans. Please try again later.</div>)
  }
  
  return (<p>Will add later</p>)
}
