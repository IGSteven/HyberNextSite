import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fetch both components and incidents data (these are the valid Instatus API endpoints)
    const [componentsResponse, incidentsResponse] = await Promise.all([
      fetch(new URL("/api/status/components", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").toString()),
      fetch(new URL("/api/status/incidents", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").toString())
    ])
    
    if (!componentsResponse.ok || !incidentsResponse.ok) {
      throw new Error("Failed to fetch status data from API")
    }
    
    const componentsData = await componentsResponse.json()
    const incidentsData = await incidentsResponse.json()
    
    // Create a combined status object that has the format your components expect
    return NextResponse.json({
      success: true,
      status: {
        page: {
          name: "HyberHost",
          url: "https://hyber.instatus.com",
        },
        status: {
          indicator: determineOverallStatus(componentsData),
          description: determineStatusDescription(componentsData)
        },
        components: componentsData
      },
      incidents: incidentsData
    })
  } catch (error) {
    console.error("Error fetching status data:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

// Helper function to determine overall status based on component statuses
function determineOverallStatus(components: any[] = []) {
  if (!components || components.length === 0) return "unknown"
  
  const hasComponents = components && Array.isArray(components) && components.length > 0
  if (!hasComponents) return "unknown"
  
  // Check for major outages first
  if (components.some(c => c.status === "major_outage")) {
    return "major_outage"
  }
  
  // Then partial outages
  if (components.some(c => c.status === "partial_outage")) {
    return "partial_outage"
  }
  
  // Then degraded performance
  if (components.some(c => c.status === "degraded_performance")) {
    return "degraded_performance"
  }
  
  // Then maintenance
  if (components.some(c => c.status === "under_maintenance")) {
    return "under_maintenance"
  }
  
  // If all operational, return operational
  if (components.every(c => c.status === "operational")) {
    return "operational"
  }
  
  // Default
  return "unknown"
}

// Helper function to provide status description
function determineStatusDescription(components: any[] = []) {
  const status = determineOverallStatus(components)
  
  switch (status) {
    case "operational":
      return "All systems operational"
    case "degraded_performance":
      return "Some systems experiencing degraded performance"
    case "partial_outage":
      return "Some systems experiencing outages"
    case "major_outage":
      return "Major system outage"
    case "under_maintenance":
      return "Maintenance in progress"
    default:
      return "System status unknown"
  }
}
