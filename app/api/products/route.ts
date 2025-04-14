import { NextResponse } from "next/server"
import { getProducts, getProductsByType } from "@/lib/whmcs-api"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "vps" | "dedicated" | "cloud" | null

    let products
    if (type) {
      products = await getProductsByType(type)
    } else {
      products = await getProducts()
    }

    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
