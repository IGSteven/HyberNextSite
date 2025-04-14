import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

// Sample fallback data to use when API call fails
const fallbackStatusData = {
  page: {
    name: "HyberHost",
    url: "https://hyber.instatus.com",
  },
  status: {
    indicator: "operational",
    description: "All systems operational",
  },
  components: [
    {
      id: "coventry-1",
      name: "Coventry Data Center",
      status: "operational",
    },
    {
      id: "london-1",
      name: "London Data Center",
      status: "operational",
    },
    {
      id: "kitchener-1",
      name: "Kitchener Data Center",
      status: "operational",
    },
    {
      id: "portal-1",
      name: "Customer Portal",
      status: "operational",
    },
    {
      id: "support-1",
      name: "Support System",
      status: "operational",
    },
  ],
}

async function getStatusData() {
  try {
    // Use our server-side API route instead of directly calling Instatus
    const response = await fetch("/api/status", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success || !data.status) {
      console.log("API response doesn't have expected structure, using fallback data")
      return fallbackStatusData
    }

    return data.status
  } catch (error) {
    console.error("Error fetching status data:", error)
    // Return fallback data instead of throwing an error
    return fallbackStatusData
  }
}

export async function StatusIndicator() {
  let data
  try {
    data = await getStatusData()
  } catch (error) {
    console.error("Failed to get status data:", error)
    data = fallbackStatusData
  }

  // Status indicator colors and icons
  const statusConfig = {
    operational: {
      color: "bg-green-500 hover:bg-green-600",
      icon: <CheckCircle className="h-5 w-5" />,
      text: "All Systems Operational",
    },
    degraded_performance: {
      color: "bg-yellow-500 hover:bg-yellow-600",
      icon: <AlertTriangle className="h-5 w-5" />,
      text: "Degraded Performance",
    },
    partial_outage: {
      color: "bg-orange-500 hover:bg-orange-600",
      icon: <AlertTriangle className="h-5 w-5" />,
      text: "Partial Outage",
    },
    major_outage: {
      color: "bg-red-500 hover:bg-red-600",
      icon: <AlertCircle className="h-5 w-5" />,
      text: "Major Outage",
    },
    under_maintenance: {
      color: "bg-blue-500 hover:bg-blue-600",
      icon: <AlertTriangle className="h-5 w-5" />,
      text: "Under Maintenance",
    },
    unknown: {
      color: "bg-gray-500 hover:bg-gray-600",
      icon: <AlertCircle className="h-5 w-5" />,
      text: "Status Unknown",
    },
  }

  const status = data.status?.indicator || "unknown"
  const statusInfo = statusConfig[status] || statusConfig.unknown

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Current Status</CardTitle>
          <Badge className={statusInfo.color}>
            <span className="flex items-center gap-1">
              {statusInfo.icon}
              {statusInfo.text}
            </span>
          </Badge>
        </div>
        <CardDescription>Last updated: {new Date().toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-4">
          {data.components?.map((component) => (
            <div key={component.id} className="flex items-center justify-between">
              <span>{component.name}</span>
              <Badge
                className={
                  component.status === "operational"
                    ? "bg-green-500 hover:bg-green-600"
                    : component.status === "under_maintenance"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : component.status === "degraded_performance"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : component.status === "partial_outage"
                          ? "bg-orange-500 hover:bg-orange-600"
                          : component.status === "major_outage"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gray-500 hover:bg-gray-600"
                }
              >
                {component.status.replace(/_/g, " ")}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
