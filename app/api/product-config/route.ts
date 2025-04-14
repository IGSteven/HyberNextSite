import { NextResponse } from "next/server"
import { getProductConfigOptions } from "@/lib/whmcs-api"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 })
    }

    const configOptions = await getProductConfigOptions(Number.parseInt(productId))
    return NextResponse.json({ success: true, configOptions })
  } catch (error) {
    console.error("Error fetching product configuration options:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch configuration options" }, { status: 500 })
  }
}
