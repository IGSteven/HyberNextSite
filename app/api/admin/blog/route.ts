import { NextResponse } from "next/server"
import { getBlogData } from "@/lib/blog-utils"

export async function GET() {
  try {
    const data = await getBlogData()

    return NextResponse.json({
      success: true,
      posts: data.posts,
      categories: data.categories,
    })
  } catch (error) {
    console.error("Error fetching blog data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch blog data" }, { status: 500 })
  }
}
