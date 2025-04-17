import { NextResponse } from "next/server"
import { getProductConfigOptions } from "@/lib/whmcs-api"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 })
    }

    const configOptions = await getProductConfigOptions(Number(productId))
    return new NextResponse(JSON.stringify({ success: true, configOptions }), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error: any) {
    console.error("Error fetching product configuration options:", error)
    let errorMessage = "Failed to fetch configuration options"
    if (error.message.includes("status 403")) {
      errorMessage =
        "Failed to fetch product configuration options: Forbidden. Check your API credentials and permissions."
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
