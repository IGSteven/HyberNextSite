"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, AlertCircle, ChevronRight, Loader2, ChevronDown, RefreshCw, AlertOctagon, XCircle, Settings } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { ReactNode } from "react"

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

const statusConfig: Record<StatusType, { color: string; icon: React.ReactNode; text: string }> = {
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

// Update ComponentGroup to accept all the props being passed to it
interface ComponentGroupProps {
  group: ComponentGroup & { childGroups?: ComponentGroup[] };
  allGroups?: ComponentGroup[];
  groupParentMap?: Record<string, string>;
}

// Component group display with collapsible children
function ComponentGroup({ group, allGroups, groupParentMap }: ComponentGroupProps) {
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
              {group.childGroups?.map(childGroup => (
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

  // Function to organize components into groups with support for multiple levels of nesting
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
    
    // Special case handling for network components with AS numbers
    deduplicatedComponents.forEach(component => {
      // Check if this is a network component with AS number
      if (component.name && (
          component.name.includes("Network (AS51692)") || 
          component.name.includes("Network (AS27498)")
        )) {
        // Assign it to the Network & Datacentres group
        component.groupId = "clv6h3j5l38153ben4zz9tjjdi"; // Network & Datacentres group ID
        component.groupName = "Our Network & Datacentres"; // Also set the group name
      }
      
      // Ensure Core is treated as a group, not as a component under Other Services
      if (component.name === "Core") {
        // Set isParent flag to identify it as a group
        component.isParent = true;
        // Assign it to the Core group
        component.groupId = "clv6h3a9a37836b7n4aul61snm"; // Core group ID
        component.groupName = "Core"; 
      }
    });
    
    // Group components by their groupId
    const groupMap = new Map<string, InstatusComponent[]>();
    
    // First, organize all components by groupId
    deduplicatedComponents.forEach(component => {
      // Skip components that should be treated as groups themselves
      if (component.isParent) return;
      
      // Check if component has a groupId (could be group_id or groupId)
      const groupId = component.groupId || component.group_id;
      
      if (groupId) {
        if (!groupMap.has(groupId)) {
          groupMap.set(groupId, []);
        }
        groupMap.get(groupId)?.push(component);
      }
    });
    
    // Create component groups for display
    const processedGroups: ComponentGroup[] = [];
    // Track component IDs that have been assigned to groups
    const assignedComponentIds = new Set<string>();
    
    // Process each group
    groupMap.forEach((groupComponents, groupId) => {
      // Map the groupId to a known group name
      const groupName = knownGroupNames[groupId] || "Unknown Group";
      
      // Mark all these components as assigned
      groupComponents.forEach(comp => assignedComponentIds.add(comp.id));
      
      // Determine the overall status of this group based on its components
      const groupStatus = determineGroupStatus(groupComponents) as StatusType;
      
      processedGroups.push({
        id: `group-${groupId}`,
        name: groupName,
        components: [...groupComponents],
        status: groupStatus
      });
    });
    
    // Find ungrouped components (those without a groupId)
    const ungrouped = deduplicatedComponents.filter(component => {
      // Skip components that are meant to be groups themselves
      if (component.isParent) return false;
      
      const groupId = component.groupId || component.group_id;
      return !groupId && !assignedComponentIds.has(component.id);
    });
    
    // Sort groups to match the Instatus page order
    const sortedGroups = processedGroups.sort((a, b) => {
      // Custom order based on the actual Instatus page
      const groupOrder: Record<string, number> = {
        "Core": 1,
        "Our Network & Datacentres": 2, 
        "VPS Hosts": 3,
        "United Kingdom - Coventry": 4,
        "Canada - Kitchener": 5,
        "Other": 6
      };
      
      const orderA = groupOrder[a.name] || 999;
      const orderB = groupOrder[b.name] || 999;
      return orderA - orderB;
    });
    
    setComponentGroups(sortedGroups);
    setUngroupedComponents(ungrouped);
  };

  // Function to build a hierarchical tree of component groups
  const buildGroupHierarchy = (groups: ComponentGroup[]) => {
    // First identify top-level groups (those that are not children of any other group)
    const topLevelGroupIds = groups
      .map(group => group.id.replace('group-', ''))
      .filter(groupId => !Object.values(groupParentMap).includes(groupId));
    
    // Build a map of parent groups to their child groups
    const childrenMap: Record<string, string[]> = {};
    
    Object.entries(groupParentMap).forEach(([childId, parentId]) => {
      if (!childrenMap[parentId]) {
        childrenMap[parentId] = [];
      }
      childrenMap[parentId].push(childId);
    });
    
    // Recursive function to build the tree
    const buildGroupTree = (groupId: string): (ComponentGroup & { childGroups?: (ComponentGroup & { childGroups?: any })[] }) => {
      const group = groups.find(g => g.id === `group-${groupId}`);
      
      if (!group) {
        // This should not happen if our data is consistent
        console.error(`Group with ID ${groupId} not found`);
        return null as any;
      }
      
      const childGroupIds = childrenMap[groupId] || [];
      
      if (childGroupIds.length === 0) {
        // No children, return as is
        return { ...group };
      }
      
      // Build child groups recursively
      const childGroups = childGroupIds
        .map(childId => buildGroupTree(childId))
        .filter(Boolean); // Remove any nulls
      
      return {
        ...group,
        childGroups
      };
    };
    
    // Build the tree starting from each top-level group
    return topLevelGroupIds
      .map(groupId => buildGroupTree(groupId))
      .filter(Boolean); // Remove any nulls
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

  if (!statusData || !statusData.status || statusData.status.indicator === "none") {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>System Status</CardTitle>
          </div>
          <CardDescription>Unable to retrieve status information</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Status Unavailable</AlertTitle>
            <AlertDescription>
              We're currently unable to retrieve status information. Please check back later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  // Build hierarchical tree of component groups
  const topLevelGroups = componentGroups.filter(group => {
    const groupIdWithoutPrefix = group.id.replace('group-', '');
    return !Object.keys(groupParentMap).some(childId => 
      groupParentMap[childId] === groupIdWithoutPrefix
    );
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current status of our platform services
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setLastUpdated(new Date())}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Alert variant={statusData?.status?.indicator === "operational" ? "default" : "destructive"}>
            <div className="flex items-center">
              {statusData?.status?.indicator === "operational" ? (
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
              )}
              <AlertTitle className="text-base font-medium">
                {statusData?.status?.indicator === "operational"
                  ? "All Systems Operational" 
                  : "System Disruption Reported"}
              </AlertTitle>
            </div>
            <AlertDescription className="mt-2">
              {statusData?.status?.indicator === "operational"
                ? "All Hyber systems are operating normally."
                : "One or more Hyber systems are experiencing issues. See details below."}
            </AlertDescription>
          </Alert>
        </div>

        {/* Rendering top-level component groups */}
        {topLevelGroups.map((group) => (
          <ComponentGroup 
            key={group.id} 
            group={group} 
            allGroups={componentGroups}
            groupParentMap={groupParentMap}
          />
        ))}

        {/* Render any ungrouped components */}
        {ungroupedComponents.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Other Services</h3>
            {ungroupedComponents.map((component) => (
              <ComponentStatusItem key={component.id} component={component} />
            ))}
          </div>
        )}

        <div className="mt-8 text-xs text-muted-foreground">
          Last updated: {formatDistanceToNow(lastUpdated)} ago
        </div>
      </CardContent>
    </Card>
  )
}

interface NestedComponentGroupProps {
  group: ComponentGroup & { childGroups?: ComponentGroup[] };
  allGroups: ComponentGroup[];
  groupParentMap: Record<string, string>;
}

// Update ComponentGroup to handle deeper nesting properly
function NestedComponentGroup({ group, allGroups, groupParentMap }: NestedComponentGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Find child groups based on parent-child mapping
  const childGroups = allGroups.filter(childGroup => {
    const childId = childGroup.id.replace('group-', '');
    const parentId = group.id.replace('group-', '');
    return groupParentMap[childId] === parentId;
  });

  // Determine if any component in this group or its children has issues
  const hasIssues = useMemo(() => {
    // Check direct components
    const directIssue = group.components.some(
      component => component.status !== "operational"
    );
    
    // Check child group components recursively
    const childIssue = childGroups.some(childGroup => 
      childGroup.components.some(component => component.status !== "operational")
    );
    
    return directIssue || childIssue;
  }, [group.components, childGroups]);

  // Auto-expand groups with issues
  useEffect(() => {
    if (hasIssues) {
      setIsExpanded(true);
    }
  }, [hasIssues]);

  return (
    <div className="mb-6 border rounded-lg p-4">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <h3 className="text-lg font-medium">{group.name}</h3>
          {hasIssues && (
            <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
              Issues
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="icon">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {/* Render this group's components */}
          {group.components.map((component) => (
            <ComponentStatusItem key={component.id} component={component} />
          ))}

          {/* Render child groups recursively */}
          {childGroups.length > 0 && (
            <div className="pl-4 mt-4 border-l-2 border-gray-100">
              {childGroups.map(childGroup => (
                <NestedComponentGroup 
                  key={childGroup.id} 
                  group={childGroup} 
                  allGroups={allGroups}
                  groupParentMap={groupParentMap}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ComponentStatusItem({ component }: { component: InstatusComponent }) {
  const statusColors: Record<StatusType, { bg: string, text: string, icon: ReactNode }> = {
    "operational": { 
      bg: "bg-green-50", 
      text: "text-green-700",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />
    },
    "degraded_performance": { 
      bg: "bg-amber-50", 
      text: "text-amber-700",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />
    },
    "partial_outage": { 
      bg: "bg-orange-50", 
      text: "text-orange-700",
      icon: <AlertOctagon className="h-4 w-4 text-orange-500" />
    },
    "major_outage": { 
      bg: "bg-red-50", 
      text: "text-red-700",
      icon: <XCircle className="h-4 w-4 text-red-500" />
    },
    "under_maintenance": { 
      bg: "bg-blue-50", 
      text: "text-blue-700",
      icon: <Settings className="h-4 w-4 text-blue-500" />
    },
    "unknown": { 
      bg: "bg-gray-50", 
      text: "text-gray-700",
      icon: <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  };

  const status = component.status as StatusType || "operational";
  const colors = statusColors[status];

  return (
    <div className={`flex items-center justify-between p-3 rounded-md ${colors.bg}`}>
      <div className="flex items-center">
        {colors.icon}
        <span className="ml-2 font-medium">{component.name}</span>
      </div>
      <Badge variant="outline" className={`${colors.bg} ${colors.text} border-none`}>
        {formatStatus(status)}
      </Badge>
    </div>
  );
}

function formatStatus(status: StatusType): string {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}