import { NextResponse } from "next/server"
import { getProductsCached } from "@/lib/whmcs/products"

// Function to get products by type with appropriate gid mapping
async function getProductsByTypeCached(type: "vps" | "dedicated" | "cloud") {
  let gid: number;
  switch (type) {
    case "vps": gid = 19; break;
    case "dedicated": gid = 14; break;
    case "cloud": gid = 17; break;
    default: throw new Error("Invalid product type");
  }
  
  return await getProductsCached({ gid });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "vps" | "dedicated" | "cloud" | null

    let products
    if (type) {
      products = await getProductsByTypeCached(type)
    } else {
      products = await getProductsCached()
    }

    return new NextResponse(JSON.stringify({ success: true, products }), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
