import { NextResponse } from "next/server"
import { getProducts } from "@/lib/whmcs/products"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "vps" | "dedicated" | "cloud" | null

    let gid: number; // Group ID for the product type
    switch (type) {
      case "vps": gid = 19; break;
      case "dedicated": gid = 14; break;
      case "cloud": gid = 17; break;
      default: throw new Error("Invalid product type");
    }

    // Fetch products based on the type
    let products = await getProducts({ gid });
    if (!products) {
      return NextResponse.json({ success: false, error: "No products found" }, { status: 404 })
    }

    console.log("Fetched products:", products)

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
