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
  groupId?: string
  groupName?: string  // Store the actual group name
  parentGroup?: string // Add parentGroup property to store parent group name
  showcase?: boolean
  start_date?: string
  isParent?: boolean
  isCollapsed?: boolean
  [key: string]: any
}

// New interface for component groups from API
interface APIComponentGroup {
  id: string
  name: string
  order?: number
  components?: InstatusComponent[]
  [key: string]: any
}

// Interface for processed component groups for display
interface ComponentGroup {
  id: string
  name: string
  components: InstatusComponent[]
  status: StatusType
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
  const [isMounted, setIsMounted] = useState(false)
  // Pre-generate performance data to avoid random values during renders
  const [performanceData] = useState(() => 
    Array(7).fill(0).map(() => Math.random() > 0.1)
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
            Last updated: {isMounted ? (
              displayComponent.updated_at 
                ? new Date(displayComponent.updated_at).toLocaleString() 
                : new Date().toLocaleString()
            ) : (
              "Loading..."
            )}
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
                {performanceData.map((isOperational, i) => (
                  <div 
                    key={`${component.id}-day-${i}`} 
                    className={`h-4 rounded-sm ${isOperational ? "bg-green-500" : "bg-red-500"}`}
                    title={`Day ${i+1}: ${isOperational ? "Operational" : "Outage"}`}
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
function ComponentGroup({ group }: { group: ComponentGroup & { childGroups?: ComponentGroup[] } }) {
  const [isOpen, setIsOpen] = useState(group.status !== "operational");
  
  const statusInfo = statusConfig[group.status] || statusConfig.unknown;
  const hasChildGroups = group.childGroups && group.childGroups.length > 0;

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
          {/* Render direct components of this group */}
          {group.components.map((component) => (
            <ComponentDetails key={component.id} component={component} />
          ))}
          
          {/* Render child groups if there are any */}
          {hasChildGroups && (
            <div className="mt-4 space-y-4">
              {group.childGroups.map(childGroup => (
                <div key={childGroup.id} className="border-t pt-3">
                  <div className="font-medium text-sm mb-2 px-2">{childGroup.name}</div>
                  <div className="space-y-1">
                    {childGroup.components.map(component => (
                      <ComponentDetails key={component.id} component={component} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function StatusIndicator({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [statusData, setStatusData] = useState<InstatusStatusData | null>(null)
  const [components, setComponents] = useState<InstatusComponent[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [componentGroups, setComponentGroups] = useState<ComponentGroup[]>([])
  const [ungroupedComponents, setUngroupedComponents] = useState<InstatusComponent[]>([])
  const [isMounted, setIsMounted] = useState(false)
  
  // Define known group ID mappings based on the Instatus official page structure
  const knownGroupNames: Record<string, string> = {
    // Core group
    "clv6h3a9a37836b7n4aul61snm": "Core",
    
    // Network & Datacentres group 
    "clv6h3j5l38153ben4zz9tjjdi": "Our Network & Datacentres",
    
    // VPS Hosts groups
    "clv6h3kyd38348ben4oe6k2yfj": "VPS Hosts",
    "clv6h3mtk38589ben40i53yjzv": "United Kingdom - Coventry",
    "clv6h3og838829ben4ht9i5a96": "Canada - Kitchener",
    
    // Other services group
    "clv6h3pie39069ben4vl0zw50p": "Other",
  };
  
  // Map of parent-child group relationships (child groupId -> parent groupId)
  const groupParentMap: Record<string, string> = {
    // Coventry and Kitchener are children of VPS Hosts
    "clv6h3mtk38589ben40i53yjzv": "clv6h3kyd38348ben4oe6k2yfj", // UK Coventry -> VPS Hosts
    "clv6h3og838829ben4ht9i5a96": "clv6h3kyd38348ben4oe6k2yfj", // Canada Kitchener -> VPS Hosts
  };
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to organize components into groups
  const organizeComponentGroups = (allComponents: InstatusComponent[]) => {
    if (!Array.isArray(allComponents) || !allComponents.length) {
      setComponentGroups([]);
      setUngroupedComponents([]);
      return;
    }

    // Check for duplicate component IDs and ensure each ID is unique
    const uniqueComponents = allComponents.reduce<{ [id: string]: InstatusComponent }>((acc, component) => {
      // Only add if we haven't seen this ID before
      if (!acc[component.id]) {
        acc[component.id] = component;
      }
      return acc;
    }, {});

    const deduplicatedComponents = Object.values(uniqueComponents);
    
    // Group components by their groupId
    const groupMap = new Map<string, InstatusComponent[]>();
    
    // Group name mapping to consolidate groups
    const groupNameMap = new Map<string, string>();
    
    // First, find all unique groups using the groupId property and apply known group names
    deduplicatedComponents.forEach(component => {
      if (component.groupId) {
        // Check if we have a known name for this groupId
        if (knownGroupNames[component.groupId]) {
          // Store the mapping from groupId to display name
          groupNameMap.set(component.groupId, knownGroupNames[component.groupId]);
        }
        
        if (!groupMap.has(component.groupId)) {
          groupMap.set(component.groupId, []);
        }
        groupMap.get(component.groupId)?.push(component);
      }
    });
    
    // Create component groups for display
    const processedGroups: ComponentGroup[] = [];
    // Track component IDs that have been assigned to groups
    const assignedComponentIds = new Set<string>();
    // Track which groups should be excluded from top-level (they are subgroups)
    const childGroupIds = new Set<string>(Object.keys(groupParentMap));
    
    // Process each group
    let groupIndex = 0;
    groupMap.forEach((groupComponents, groupId) => {
      // Skip child groups for now - we'll handle them later with their parents
      if (childGroupIds.has(groupId)) {
        return;
      }
      
      // Mark all these components as assigned
      groupComponents.forEach(comp => assignedComponentIds.add(comp.id));
      
      // Get the known group name if available
      const knownGroupName = groupNameMap.get(groupId);
      
      // Check if there's a component with isParent=true in this group
      const parentComponent = groupComponents.find(comp => comp.isParent === true);
      
      // Find any child groups for this parent
      const childGroups: ComponentGroup[] = [];
      Object.entries(groupParentMap).forEach(([childId, parentId]) => {
        if (parentId === groupId && groupMap.has(childId)) {
          const childComponents = groupMap.get(childId) || [];
          // Mark child components as assigned
          childComponents.forEach(comp => assignedComponentIds.add(comp.id));
          
          const childGroupName = knownGroupNames[childId] || 
                                 childComponents.find(comp => comp.groupName)?.groupName || 
                                 "Unknown Group";
          
          childGroups.push({
            id: `group-${childId}-${groupIndex++}`,
            name: childGroupName,
            components: childComponents,
            status: determineGroupStatus(childComponents) as StatusType
          });
        }
      });
      
      if (parentComponent) {
        // Use group name from mapping, or parent component name
        const groupStatus = determineGroupStatus(groupComponents);
        
        processedGroups.push({
          id: `group-${groupId}-${groupIndex}`,
          name: knownGroupName || parentComponent.name,
          components: [...groupComponents],
          status: groupStatus as StatusType,
          childGroups: childGroups.length > 0 ? childGroups : undefined
        } as ComponentGroup & { childGroups?: ComponentGroup[] });
      } else if (groupComponents.length > 0) {
        // If no parent component, use the proper group name if available
        const groupStatus = determineGroupStatus(groupComponents);
        
        // First try known group name, then look for component with groupName
        const componentWithGroupName = groupComponents.find(comp => comp.groupName);
        
        // Use the group name from our mapping if available, otherwise fallback
        const groupName = knownGroupName || 
                          componentWithGroupName?.groupName || 
                          groupComponents[0].name;
        
        processedGroups.push({
          id: `group-${groupId}-${groupIndex}`,
          name: groupName,
          components: [...groupComponents],
          status: groupStatus as StatusType,
          childGroups: childGroups.length > 0 ? childGroups : undefined
        } as ComponentGroup & { childGroups?: ComponentGroup[] });
      }
      
      // Increment group index for unique IDs
      groupIndex++;
    });
    
    // Find ungrouped components (those without a groupId or not assigned to a group)
    const ungrouped = deduplicatedComponents.filter(component => 
      !component.groupId && !assignedComponentIds.has(component.id)
    );
    
    // Sort groups to match the Instatus page order
    const sortedGroups = processedGroups.sort((a, b) => {
      // Custom order based on the actual Instatus page
      const groupOrder: Record<string, number> = {
        "Core": 1,
        "Our Network & Datacentres": 2,
        "VPS Hosts": 3,
        "Other": 4
      };
      
      const orderA = groupOrder[a.name] || 999;
      const orderB = groupOrder[b.name] || 999;
      return orderA - orderB;
    });
    
    setComponentGroups(sortedGroups);
    setUngroupedComponents(ungrouped);
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
          
          // Handle API response which has { success: true, data: [...components] } structure
          if (data?.success === true && Array.isArray(data.data)) {
            componentsResult = data.data;
          } 
          // Fallback for other response structures
          else if (Array.isArray(data)) {
            componentsResult = data;
          } else if (data?.components && Array.isArray(data.components)) {
            componentsResult = data.components;
          }
          
          console.log("Components data:", componentsResult);
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
  }, [refreshTrigger])

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
        <CardDescription>Last updated: {isMounted ? lastUpdated.toLocaleString() : "Loading..."}</CardDescription>
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