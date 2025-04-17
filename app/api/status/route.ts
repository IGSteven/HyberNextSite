import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fetch the status data from Instatus
    const statusResponse = await fetch("https://hyber.instatus.com/summary.json", {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!statusResponse.ok) {
      throw new Error(`Status API responded with status: ${statusResponse.status}`)
    }

    const statusData = await statusResponse.json()

    // Fetch the incidents data from Instatus
    const incidentsResponse = await fetch("https://hyber.instatus.com/incidents.json", {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!incidentsResponse.ok) {
      throw new Error(`Incidents API responded with status: ${incidentsResponse.status}`)
    }

    const incidentsData = await incidentsResponse.json()

    // Return both sets of data
    return new NextResponse(
      JSON.stringify({
        success: true,
        status: statusData,
        incidents: incidentsData,
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
    console.error("Error fetching Instatus data:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch status data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
