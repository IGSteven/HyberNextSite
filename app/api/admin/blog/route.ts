import { NextResponse } from "next/server"
import { getBlogData } from "@/lib/blog-utils"

export async function GET() {
  try {
    const data = await getBlogData()

    return new NextResponse(
      JSON.stringify({
        success: true,
        posts: data.posts,
        categories: data.categories,
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
    console.error("Error fetching blog data:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch blog data" }, { status: 500 })
  }
}
