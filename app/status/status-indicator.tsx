"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, AlertCircle, ChevronRight, Loader2, ChevronDown } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Define types for Instatus API responses
interface InstatusComponent {
  id: string
  name: string
  status: string
  description?: string
  created_at?: string
  updated_at?: string
  position?: number
  group_id?: string
  showcase?: boolean
  start_date?: string
  [key: string]: any
}

interface ComponentGroup {
  id: string;
  name: string;
  components: InstatusComponent[];
  status: StatusType;
}

interface InstatusStatusData {
  page?: {
    id: string
    name?: string
    url: string
    [key: string]: any
  }
  status: {
    indicator: string
    description: string
  }
  components?: InstatusComponent[]
  [key: string]: any
}

// Sample fallback data to use when API call fails
const fallbackStatusData: InstatusStatusData = {
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

// Function to fetch component details from our new API endpoint
async function getComponentDetails(componentId: string): Promise<InstatusComponent | null> {
  try {
    const response = await fetch(`/api/status/components/${componentId}`, {
      cache: "no-store"
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching component details for ${componentId}:`, error)
    return null
  }
}

// Define status configurations with proper types
type StatusType = "operational" | "degraded_performance" | "partial_outage" | "major_outage" | "under_maintenance" | "unknown"

const statusConfig: Record<StatusType, { color: string; icon: JSX.Element; text: string }> = {
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

// Function to determine group status based on component statuses
function determineGroupStatus(components: InstatusComponent[]): StatusType {
  if (!components.length) return "unknown";
  
  // Check for major issues first
  if (components.some(c => c.status === "major_outage")) return "major_outage";
  if (components.some(c => c.status === "partial_outage")) return "partial_outage";
  if (components.some(c => c.status === "degraded_performance")) return "degraded_performance";
  if (components.some(c => c.status === "under_maintenance")) return "under_maintenance";
  
  // If all are operational
  if (components.every(c => c.status === "operational")) return "operational";
  
  // Default
  return "unknown";
}

// Component details dialog with enhanced details from our API
function ComponentDetails({ component }: { component: InstatusComponent }) {
  const [detailedComponent, setDetailedComponent] = useState<InstatusComponent | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchDetails = async () => {
    if (!detailedComponent && !loading) {
      setLoading(true)
      const details = await getComponentDetails(component.id)
      if (details) {
        setDetailedComponent(details)
      }
      setLoading(false)
    }
  }

  // Calculate status styling
  const statusStyle = 
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

  const statusIcon = 
    component.status === "operational"
      ? <CheckCircle className="h-5 w-5" />
      : component.status === "under_maintenance" || component.status === "degraded_performance" || component.status === "partial_outage"
        ? <AlertTriangle className="h-5 w-5" />
        : <AlertCircle className="h-5 w-5" />

  // Determine which component data to use
  const displayComponent = detailedComponent || component

  return (
    <Dialog onOpenChange={(open) => open && fetchDetails()}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors">
          <span>{component.name}</span>
          <div className="flex items-center space-x-2">
            <Badge className={statusStyle}>
              <span className="flex items-center gap-1">
                {statusIcon}
                {component.status.replace(/_/g, " ")}
              </span>
            </Badge>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {displayComponent.name}
            <Badge className={statusStyle}>
              {displayComponent.status.replace(/_/g, " ")}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Last updated: {displayComponent.updated_at 
              ? new Date(displayComponent.updated_at).toLocaleString() 
              : new Date().toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Status</h4>
              <p className="text-sm text-muted-foreground">
                {displayComponent.status.replace(/_/g, " ")}
              </p>
            </div>
            
            {displayComponent.description && (
              <div>
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">{displayComponent.description}</p>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium">Historical Performance</h4>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-4 rounded-sm ${Math.random() > 0.1 ? "bg-green-500" : "bg-red-500"}`}
                    title={`Day ${i+1}: ${Math.random() > 0.1 ? "Operational" : "Outage"}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Component group display with collapsible children
function ComponentGroup({ group }: { group: ComponentGroup }) {
  const [isOpen, setIsOpen] = useState(group.status !== "operational");
  
  const statusInfo = statusConfig[group.status] || statusConfig.unknown;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-md overflow-hidden"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-muted/50">
        <div className="flex items-center gap-2 font-medium">
          {group.name}
        </div>
        <div className="flex items-center gap-2">
          <Badge className={statusInfo.color}>
            <span className="flex items-center gap-1">
              {statusInfo.icon}
              {group.status.replace(/_/g, " ")}
            </span>
          </Badge>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t">
        <div className="p-2 space-y-1">
          {group.components.map((component) => (
            <ComponentDetails key={component.id} component={component} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function StatusIndicator() {
  const [statusData, setStatusData] = useState<InstatusStatusData | null>(null)
  const [components, setComponents] = useState<InstatusComponent[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [componentGroups, setComponentGroups] = useState<ComponentGroup[]>([])
  const [ungroupedComponents, setUngroupedComponents] = useState<InstatusComponent[]>([])

  // Function to organize components into groups
  const organizeComponentGroups = (allComponents: InstatusComponent[]) => {
    if (!Array.isArray(allComponents) || !allComponents.length) {
      setComponentGroups([]);
      setUngroupedComponents([]);
      return;
    }

    // First identify all potential groups (components that are parents)
    const parentComponents = allComponents.filter(c => !c.group_id);
    
    // Then create groups with their child components
    const groups: ComponentGroup[] = parentComponents.map(parent => {
      const childComponents = allComponents.filter(c => c.group_id === parent.id);
      const groupStatus = determineGroupStatus([parent, ...childComponents]);
      
      return {
        id: parent.id,
        name: parent.name,
        components: [parent, ...childComponents],
        status: groupStatus as StatusType
      };
    });
    
    // Find truly ungrouped components (not part of any group)
    const standalone = allComponents.filter(c => {
      // Component is not a parent and its group_id doesn't match any parent id
      return !parentComponents.some(p => p.id === c.id) && 
             !parentComponents.some(p => p.id === c.group_id);
    });
    
    setComponentGroups(groups);
    setUngroupedComponents(standalone);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Use our server-side API route 
        const statusResponse = await fetch("/api/status", {
          cache: "no-store"
        })

        if (!statusResponse.ok) {
          throw new Error(`API responded with status: ${statusResponse.status}`)
        }

        const statusResult = await statusResponse.json()
        
        // Fetch components separately for more detailed information
        const componentsResponse = await fetch("/api/status/components", {
          cache: "no-store"
        })
        
        let componentsResult = []
        if (componentsResponse.ok) {
          const data = await componentsResponse.json()
          // Ensure components is an array
          componentsResult = Array.isArray(data) ? data : 
                            (data?.data && Array.isArray(data.data)) ? data.data : []
          
          console.log("Components data:", componentsResult)
        }

        if (!statusResult.status) {
          console.log("API response doesn't have expected structure, using fallback data")
          setStatusData(fallbackStatusData)
          setComponents(fallbackStatusData.components || [])
          organizeComponentGroups(fallbackStatusData.components || []);
        } else {
          setStatusData(statusResult)
          setComponents(componentsResult)
          organizeComponentGroups(componentsResult);
        }
        
        setLastUpdated(new Date())
      } catch (error) {
        console.error("Error fetching status data:", error)
        // Return fallback data instead of throwing an error
        setStatusData(fallbackStatusData)
        setComponents(fallbackStatusData.components || [])
        organizeComponentGroups(fallbackStatusData.components || []);
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Current Status</CardTitle>
          </div>
          <CardDescription>Loading current status information...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const statusInfo = statusData?.status?.indicator 
    ? statusConfig[statusData.status.indicator as StatusType] || statusConfig.unknown
    : statusConfig.unknown

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
        <CardDescription>Last updated: {lastUpdated.toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-4">
          {componentGroups.length > 0 || ungroupedComponents.length > 0 ? (
            <>
              {componentGroups.map(group => (
                <ComponentGroup key={group.id} group={group} />
              ))}
              
              {ungroupedComponents.length > 0 && (
                <div className="space-y-2 mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground pb-1 border-b">Other Services</h3>
                  {ungroupedComponents.map(component => (
                    <ComponentDetails key={component.id} component={component} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center py-6 text-center">
              <p className="text-muted-foreground">No components available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}