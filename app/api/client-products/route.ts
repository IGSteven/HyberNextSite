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

    return new NextResponse(JSON.stringify({ success: true, products }), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error: any) {
    console.error("Error fetching products:", error)
    let errorMessage = "Failed to fetch products"
    if (error.message.includes("status 403")) {
      errorMessage = "Failed to fetch products: Forbidden. Check your API credentials and permissions."
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
