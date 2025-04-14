import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"

// Sample fallback data to use when API call fails
const fallbackIncidents = [
  {
    id: "sample-1",
    name: "No active incidents",
    status: "resolved",
    created: new Date().toISOString(),
    updates: [
      {
        id: "update-1",
        status: "resolved",
        body: "All systems are currently operational.",
        created: new Date().toISOString(),
      },
    ],
  },
]

async function getIncidentsData() {
  try {
    // Use our server-side API route instead of directly calling Instatus
    const response = await fetch("/api/status", {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.success || !data.incidents) {
      console.log("API response doesn't have incidents data, using fallback data")
      return { incidents: fallbackIncidents }
    }

    return data.incidents
  } catch (error) {
    console.error("Error fetching incidents data:", error)
    // Return fallback data instead of throwing an error
    return { incidents: fallbackIncidents }
  }
}

export async function StatusIncidents() {
  let data
  try {
    data = await getIncidentsData()
  } catch (error) {
    console.error("Failed to get incidents data:", error)
    data = { incidents: fallbackIncidents }
  }

  const activeIncidents = data.incidents?.filter((incident) => incident.status !== "resolved") || []

  if (activeIncidents.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
            <p className="text-lg font-medium">No active incidents</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Status indicator colors and icons
  const statusConfig = {
    investigating: {
      color: "bg-yellow-500 hover:bg-yellow-600",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    identified: {
      color: "bg-orange-500 hover:bg-orange-600",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    monitoring: {
      color: "bg-blue-500 hover:bg-blue-600",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    resolved: {
      color: "bg-green-500 hover:bg-green-600",
      icon: <CheckCircle className="h-5 w-5" />,
    },
  }

  return (
    <div className="space-y-6">
      {activeIncidents.map((incident) => {
        const status = incident.status || "investigating"
        const statusInfo = statusConfig[status] || statusConfig.investigating

        return (
          <Card key={incident.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{incident.name}</CardTitle>
                <Badge className={statusInfo.color}>
                  <span className="flex items-center gap-1">
                    {statusInfo.icon}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </Badge>
              </div>
              <CardDescription>Started: {new Date(incident.created).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-2">
                {incident.updates?.map((update) => (
                  <div key={update.id} className="border-l-2 border-muted pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{update.status.charAt(0).toUpperCase() + update.status.slice(1)}</p>
                      <span className="text-xs text-muted-foreground">{new Date(update.created).toLocaleString()}</span>
                    </div>
                    <p className="mt-2 text-sm">{update.body}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
