import { NextResponse } from "next/server"
import { getPublishedArticles } from "@/lib/kb-utils"

export async function GET() {
  try {
    const articles = await getPublishedArticles()

    return NextResponse.json({
      success: true,
      articles,
    })
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
