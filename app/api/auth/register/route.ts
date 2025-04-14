import { NextResponse } from "next/server"

export async function POST() {
  // Redirect to the WHMCS registration page
  return NextResponse.json(
    {
      success: false,
      error: "Direct API registration is no longer supported. Please use the WHMCS client area.",
    },
    { status: 308, headers: { Location: "https://clientarea.hyberhost.com/register.php" } },
  )
}
