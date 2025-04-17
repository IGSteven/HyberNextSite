import { NextResponse } from "next/server";
import { getProductsCached } from "@/lib/whmcs/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gid = searchParams.get("gid");
    
    if (!gid) {
      return NextResponse.json(
        { success: false, error: "Group ID (gid) is required" },
        { status: 400 }
      );
    }

    // Convert gid to number
    const groupId = parseInt(gid, 10);
    
    if (isNaN(groupId)) {
      return NextResponse.json(
        { success: false, error: "Invalid group ID format" },
        { status: 400 }
      );
    }

    // Fetch products from WHMCS API server-side with 1-minute caching
    const products = await getProductsCached({ gid: groupId });

    return NextResponse.json({ 
      success: true, 
      products 
    });
  } catch (error) {
    console.error("Error fetching products by group:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}