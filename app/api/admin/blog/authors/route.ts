import { NextResponse } from "next/server"
import { getAuthors } from "@/lib/blog-utils"

// API endpoint to fetch authors for client components
export async function GET() {
  try {
    const authors = await getAuthors()
    
    return NextResponse.json(
      {
        success: true,
        authors,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    )
  } catch (error) {
    console.error("Error fetching blog authors:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog authors",
      },
      { status: 500 }
    )
  }
}