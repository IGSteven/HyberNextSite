import { NextResponse } from "next/server"
import { getCategories } from "@/lib/kb-utils"

export async function GET() {
  try {
    const categories = await getCategories()

    return NextResponse.json({
      success: true,
      categories,
    })
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
