import { NextResponse } from "next/server"

export async function POST() {
  // Redirect to the WHMCS login page
  return new NextResponse(
    JSON.stringify({
      success: false,
      error: "Direct API login is no longer supported. Please use the WHMCS client area.",
    }),
    {
      status: 308,
      headers: {
        Location: "https://clientarea.hyberhost.com/login",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  )
}
