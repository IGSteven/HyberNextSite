import { NextResponse } from "next/server"

export async function POST() {
  return new NextResponse(
    JSON.stringify({
      success: false,
      error: "Direct API registration is no longer supported. Please use the WHMCS client area.",
    }),
    {
      status: 308,
      headers: {
        Location: "https://clientarea.hyberhost.com/register.php",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    },
  )
}
