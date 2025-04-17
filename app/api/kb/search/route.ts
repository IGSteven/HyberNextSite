import { type NextRequest, NextResponse } from "next/server"
import { searchArticles } from "@/lib/kb-utils"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query") || ""

  if (!query) {
    return NextResponse.json([])
  }

  const results = await searchArticles(query)
  return new NextResponse(JSON.stringify(results), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
