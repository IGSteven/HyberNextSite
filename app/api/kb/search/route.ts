import { type NextRequest, NextResponse } from "next/server"
import { searchArticles } from "@/lib/kb-utils"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query") || ""

  if (!query) {
    return NextResponse.json([])
  }

  const results = await searchArticles(query)
  return NextResponse.json(results)
}
