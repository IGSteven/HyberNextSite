import { NextResponse } from "next/server"
import { getPublishedArticles } from "@/lib/kb-utils"

export async function GET() {
  try {
    const articles = await getPublishedArticles()

    return new NextResponse(
      JSON.stringify({
        success: true,
        articles,
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
    console.error("Error fetching KB articles:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch KB articles",
      },
      { status: 500 },
    )
  }
}
