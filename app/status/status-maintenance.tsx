"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ChevronRight, ExternalLink, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Define types for Instatus API responses
interface Maintenance {
  id: string
  name: string
  status: string
  scheduled_for: string
  scheduled_until: string
  description?: string
  updates?: MaintenanceUpdate[]
  [key: string]: any
}

interface MaintenanceUpdate {
  id: string
  status: string
  body: string
  created: string
  maintenance_id?: string
  [key: string]: any
}

// Sample fallback data for when API fails
const fallbackMaintenances: Maintenance[] = [
  {
    id: "sample-maintenance",
    name: "Network Upgrades",
    status: "scheduled",
    scheduled_for: new Date(2025, 4, 15, 2, 0, 0).toISOString(),
    scheduled_until: new Date(2025, 4, 15, 4, 0, 0).toISOString(),
    description: "We will be upgrading our core network equipment to improve performance and capacity. Brief intermittent connectivity issues may occur during this time.",
    updates: []
  }
]

// Function to fetch maintenance details
async function getMaintenanceDetails(maintenanceId: string): Promise<Maintenance | null> {
  try {
    const response = await fetch(`/api/status/maintenances/${maintenanceId}`, {
      cache: "no-store"
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching maintenance details for ${maintenanceId}:`, error)
    return null
  }
}

// Format date and time for display
function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  })
}

// Status colors for maintenance events
const statusColors: Record<string, string> = {
  scheduled: "bg-blue-500 hover:bg-blue-600",
  in_progress: "bg-yellow-500 hover:bg-yellow-600",
  verifying: "bg-orange-500 hover:bg-orange-600",
  completed: "bg-green-500 hover:bg-green-600",
  cancelled: "bg-red-500 hover:bg-red-600",
}

// Detailed maintenance component
function MaintenanceDetail({ maintenance }: { maintenance: Maintenance }) {
  const [detailedMaintenance, setDetailedMaintenance] = useState<Maintenance | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchDetails = async () => {
    if (!detailedMaintenance && !loading) {
      setLoading(true)
      const details = await getMaintenanceDetails(maintenance.id)
      if (details) {
        setDetailedMaintenance(details)
      }
      setLoading(false)
    }
  }

  const displayMaintenance = detailedMaintenance || maintenance
  const statusColor = statusColors[maintenance.status] || "bg-gray-500 hover:bg-gray-600"

  return (
    <Dialog onOpenChange={(open) => open && fetchDetails()}>
      <DialogTrigger asChild>
        <Card className="hover:border-primary/50 cursor-pointer transition-colors">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{maintenance.name}</CardTitle>
              <Badge className={statusColor}>
                {maintenance.status.replace(/_/g, " ")}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3" /> 
              {formatDateTime(maintenance.scheduled_for)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {maintenance.description || "Scheduled maintenance event"}
              </p>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {displayMaintenance.name}
            <Badge className={statusColor}>
              {displayMaintenance.status.replace(/_/g, " ")}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Scheduled for: {formatDateTime(displayMaintenance.scheduled_for)}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Duration</h4>
              <p className="text-sm text-muted-foreground">
                {formatDateTime(displayMaintenance.scheduled_for)} - {formatDateTime(displayMaintenance.scheduled_until)}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium">Description</h4>
              <p className="text-sm text-muted-foreground">{displayMaintenance.description}</p>
            </div>
            
            {displayMaintenance.updates && displayMaintenance.updates.length > 0 && (
              <div>
                <h4 className="text-sm font-medium">Updates</h4>
                <div className="space-y-4 mt-2">
                  {displayMaintenance.updates.map((update) => (
                    <div key={update.id} className="border-l-2 border-muted pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <p className="font-medium">{update.status.replace(/_/g, " ")}</p>
                        <span className="text-xs text-muted-foreground">{new Date(update.created).toLocaleString()}</span>
                      </div>
                      <p className="mt-2 text-sm">{update.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function StatusMaintenance() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMaintenances() {
      setLoading(true)
      try {
        const response = await fetch("/api/status/maintenances", {
          cache: "no-store"
        })

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          console.log("API response doesn't have expected structure, using fallback data")
          setMaintenances(fallbackMaintenances)
        } else {
          setMaintenances(data)
        }
      } catch (error) {
        console.error("Error fetching maintenance data:", error)
        setMaintenances(fallbackMaintenances)
      } finally {
        setLoading(false)
      }
    }

    fetchMaintenances()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const activeMaintenances = maintenances.filter(m => 
    ['scheduled', 'in_progress', 'verifying'].includes(m.status)
  ) || []

  if (activeMaintenances.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Clock className="h-8 w-8 text-blue-500 mr-2" />
            <p className="text-lg font-medium">No scheduled maintenance</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" size="sm" className="ml-auto">
            <Link href="https://hyber.instatus.com/maintenance" target="_blank" rel="noopener noreferrer">
              View Maintenance History <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {activeMaintenances.map((maintenance) => (
        <MaintenanceDetail key={maintenance.id} maintenance={maintenance} />
      ))}
      <div className="flex justify-end">
        <Button asChild variant="outline" size="sm">
          <Link href="https://hyber.instatus.com/maintenance" target="_blank" rel="noopener noreferrer">
            View All Maintenance <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </div>
    </div>
  )
}