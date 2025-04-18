"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, CheckCircle, ChevronRight, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Define types for Instatus API responses
interface IncidentUpdate {
  id: string
  status: string
  body: string
  created: string
  incident_id?: string
  [key: string]: any
}

interface Incident {
  id: string
  name: string
  status: string
  created: string
  updates: IncidentUpdate[]
  resolved?: string
  [key: string]: any
}

// Sample fallback data to use when API call fails
const fallbackIncidents: Incident[] = [
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

// Function to fetch detailed incident information
async function getIncidentDetails(incidentId: string): Promise<Incident | null> {
  try {
    const response = await fetch(`/api/status/incidents/${incidentId}`, {
      cache: "no-store"
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching incident details for ${incidentId}:`, error)
    return null
  }
}

// Status indicator colors and icons with proper typing
const statusConfig: Record<string, { color: string; icon: JSX.Element }> = {
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

// Function to format date strings properly
const formatDateString = (dateString: string): string => {
  try {
    // Check if the dateString is valid
    if (!dateString) {
      return "Unknown date";
    }
    
    // Try to parse the date
    const date = new Date(dateString);
    
    // Check if date is valid (an invalid date will return NaN for getTime())
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string received: ${dateString}`);
      return "Date unavailable";
    }
    
    // Format the date using Intl.DateTimeFormat for better localization
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error, dateString);
    return "Date unavailable";
  }
};

// Detailed incident dialog
function IncidentDetails({ incident, isOpen: defaultIsOpen = false }: { incident: Incident; isOpen?: boolean }) {
  const [detailedIncident, setDetailedIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const fetchDetails = async () => {
    if (!detailedIncident && !loading) {
      setLoading(true)
      const details = await getIncidentDetails(incident.id)
      if (details) {
        setDetailedIncident(details)
      }
      setLoading(false)
    }
  }

  const displayIncident = detailedIncident || incident
  const status = displayIncident.status || "investigating"
  const statusInfo = statusConfig[status as keyof typeof statusConfig] || statusConfig.investigating

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) fetchDetails();
      }}
    >
      <DialogTrigger asChild>
        <Card className="hover:border-primary/50 cursor-pointer transition-colors">
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
            <CardDescription>Started: {formatDateString(incident.created)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                {incident.updates && incident.updates.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Latest update: {formatDateString(incident.updates[0].created)}
                  </p>
                )}
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {displayIncident.name}
            <Badge className={statusInfo.color}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Started: {formatDateString(displayIncident.created)}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-6">
            {displayIncident.updates?.map((update: IncidentUpdate) => (
              <div key={update.id} className="border-l-2 border-muted pl-4 py-2">
                <div className="flex justify-between items-start">
                  <p className="font-medium">{update.status.charAt(0).toUpperCase() + update.status.slice(1)}</p>
                  <span className="text-xs text-muted-foreground">{formatDateString(update.created)}</span>
                </div>
                <div className="mt-2 text-sm">
                  {/* Display the update body (comment) */}
                  <div dangerouslySetInnerHTML={{ __html: update.body }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function StatusIncidents({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [showResolved, setShowResolved] = useState(false)
  const [openIncidentIds, setOpenIncidentIds] = useState<Set<string>>(new Set())

  // Track which incident dialogs are open to preserve state during refresh
  const trackOpenIncident = (incidentId: string, isOpen: boolean) => {
    setOpenIncidentIds(prev => {
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.add(incidentId);
      } else {
        newSet.delete(incidentId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    async function fetchIncidents() {
      setLoading(true)
      try {
        // Use our dedicated incidents API endpoint
        const response = await fetch("/api/status/incidents", {
          cache: "no-store"
        })

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
          console.log("API response doesn't have expected structure, using fallback data")
          setIncidents(fallbackIncidents)
        } else {
          setIncidents(data)
        }
      } catch (error) {
        console.error("Error fetching incidents data:", error)
        // Return fallback data instead of throwing an error
        setIncidents(fallbackIncidents)
      } finally {
        setLoading(false)
      }
    }

    fetchIncidents()
  }, [refreshTrigger])

  // Function to normalize status string for comparison (case-insensitive)
  const isResolvedStatus = (status: string): boolean => {
    return status.toLowerCase() === "resolved";
  };

  const filteredIncidents = showResolved 
    ? incidents 
    : incidents.filter((incident: Incident) => !isResolvedStatus(incident.status)) || [];

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="show-resolved"
            checked={showResolved}
            onChange={() => setShowResolved(!showResolved)}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="show-resolved" className="text-sm font-medium text-muted-foreground">
            Show resolved incidents
          </label>
        </div>
        <span className="text-sm text-muted-foreground">
          {filteredIncidents.length === 0 ? 'No incidents to show' : `Showing ${filteredIncidents.length} incident${filteredIncidents.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {filteredIncidents.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
              <p className="text-lg font-medium">No {showResolved ? '' : 'active'} incidents</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        filteredIncidents.map((incident: Incident) => (
          <IncidentDetails 
            key={incident.id} 
            incident={incident}
          />
        ))
      )}
    </div>
  )
}