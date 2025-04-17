import { NextResponse } from "next/server"
import { getCategories } from "@/lib/kb-utils"

export async function GET() {
  try {
    const categories = await getCategories()

    return new NextResponse(
      JSON.stringify({
        success: true,
        categories,
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching KB categories:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch KB categories",
      },
      { status: 500 },
    )
  }
}
