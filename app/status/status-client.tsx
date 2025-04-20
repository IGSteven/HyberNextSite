"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, AlertCircle, RefreshCw, Rss, ExternalLink, Loader2, Clock, Mail, Slack, MessageSquare, Webhook, Bell } from "lucide-react";
import { Discord, MsTeams, WebhookIcon } from "./status-icons";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { BellRing } from "lucide-react";

// Component interfaces and helper functions
interface ComponentChild {
  id: string;
  name: string;
  status: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  groupId: string | null;
  isParent: boolean;
  isCollapsed: boolean;
  children?: ComponentChild[];
}

interface Component {
  id: string;
  name: string;
  status: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  groupId: string | null;
  isParent: boolean;
  isCollapsed: boolean;
  children: ComponentChild[];
}

interface ComponentsResponse {
  success: boolean;
  data: Component[];
}

interface ComponentUpdate {
  id: string;
  message: string;
  status: string;
  notify: boolean;
  started: string;
  ended: string | null;
  duration: number | null;
  createdAt: string;
  updatedAt: string;
}

interface AffectedComponent {
  id: string;
  name: string;
  status: string;
  internalStatus: string;
  order: number;
  showUptime: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Incident {
  id: string;
  name: string;
  started: string;
  resolved: string | null;
  status: string;
  impact: string;
  createdAt: string;
  updatedAt: string;
  updates: ComponentUpdate[];
  components: AffectedComponent[];
}

interface Maintenance {
  id: string;
  name: string;
  start: string;
  end: string;
  status: string;
  impact: string;
  createdAt: string;
  updatedAt: string;
  updates: ComponentUpdate[];
  components: AffectedComponent[];
}

const fetchData = async <T,>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(endpoint, {
      cache: 'no-store', 
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

// Add the Maven Pro font styling for headings
const headingStyle = "font-maven";

// Function to get status information - added to avoid duplication
const getStatusInfo = (status: string) => {
  switch(status) {
    case 'OPERATIONAL':
      return { 
        color: "bg-green-900/20 border-green-900/30", 
        textColor: "text-green-400",
        icon: <CheckCircle className="h-4 w-4 text-green-400" />,
        label: "Operational"
      };
    case 'UNDERMAINTENANCE':
      return { 
        color: "bg-blue-900/20 border-blue-900/30",
        textColor: "text-blue-400",
        icon: <Clock className="h-4 w-4 text-blue-400" />,
        label: "Under Maintenance"
      };
    case 'DEGRADEDPERFORMANCE':
      return { 
        color: "bg-yellow-900/20 border-yellow-900/30",
        textColor: "text-yellow-400",
        icon: <AlertTriangle className="h-4 w-4 text-yellow-400" />,
        label: "Degraded Performance"
      };
    case 'PARTIALOUTAGE':
      return { 
        color: "bg-orange-900/20 border-orange-900/30",
        textColor: "text-orange-400",
        icon: <AlertTriangle className="h-4 w-4 text-orange-400" />,
        label: "Partial Outage"
      };
    case 'MAJOROUTAGE':
      return { 
        color: "bg-red-900/20 border-red-900/30",
        textColor: "text-red-400",
        icon: <AlertCircle className="h-4 w-4 text-red-400" />,
        label: "Major Outage"
      };
    default:
      return { 
        color: "bg-muted/30 border-muted",
        textColor: "text-gray-400",
        icon: <AlertCircle className="h-4 w-4 text-gray-400" />,
        label: "Unknown"
      };
  }
};

// Component Status - Modified to use the shared getStatusInfo function
const ComponentStatus = ({ component }: { component: Component | ComponentChild }) => {
  const statusInfo = getStatusInfo(component.status);

  return (
    <div className="flex items-center justify-between p-2 hover:bg-muted/20 rounded-md transition-all duration-200">
      <span className="font-medium">{component.name}</span>
      <Badge variant="outline" className={`${statusInfo.color} py-1.5 px-3 rounded-full min-w-[140px] flex justify-center shadow-sm border transition-colors duration-300`}>
        <span className="flex items-center gap-1.5">
          {statusInfo.icon}
          <span className={`text-xs font-medium ${statusInfo.textColor}`}>{statusInfo.label}</span>
        </span>
      </Badge>
    </div>
  );
};

// Helper function to determine worst status among children
const getWorstStatus = (children: ComponentChild[]): string => {
  if (!children || children.length === 0) return 'OPERATIONAL';
  
  const statusPriority = {
    'MAJOROUTAGE': 5,
    'PARTIALOUTAGE': 4,
    'DEGRADEDPERFORMANCE': 3,
    'UNDERMAINTENANCE': 2,
    'OPERATIONAL': 1
  };
  
  let worstStatus = 'OPERATIONAL';
  let highestPriority = 0;
  
  const checkChildren = (components: ComponentChild[]) => {
    components.forEach(child => {
      // Check current child's status
      const priority = statusPriority[child.status as keyof typeof statusPriority] || 0;
      if (priority > highestPriority) {
        highestPriority = priority;
        worstStatus = child.status;
      }
      
      // Recursively check children
      if (child.children && child.children.length > 0) {
        checkChildren(child.children);
      }
    });
  };
  
  checkChildren(children);
  return worstStatus;
};

// Enhanced recursive component rendering with propagated status - Fixed duplicate group names
const RenderComponentWithChildren = ({ component }: { component: Component | ComponentChild }) => {
  const hasChildren = component.children && component.children.length > 0;
  
  // Calculate effective status based on children if needed - handle undefined case
  const effectiveStatus = hasChildren && component.children ? getWorstStatus(component.children) : component.status;
  // Create a new component object with the effective status for display purposes
  const displayComponent = { ...component, status: effectiveStatus };
  
  if (!hasChildren) {
    return <ComponentStatus component={component} />;
  } else {
    // Create a nested group with its own border and header
    return (
      <div className="mb-4 border rounded-lg overflow-hidden w-full">
        <div className="flex items-center justify-between w-full p-3 bg-muted/5 border-b">
          <span className="font-medium">{component.name}</span>
          <Badge variant="outline" className={getStatusInfo(effectiveStatus).color + " py-1.5 px-3 rounded-full min-w-[140px] flex justify-center shadow-sm border transition-colors duration-300"}>
            <span className="flex items-center gap-1.5">
              {getStatusInfo(effectiveStatus).icon}
              <span className={`text-xs font-medium ${getStatusInfo(effectiveStatus).textColor}`}>{getStatusInfo(effectiveStatus).label}</span>
            </span>
          </Badge>
        </div>
        <div className="p-3 space-y-2">
          {component.children?.map((child) => (
            <div key={child.id} className="w-full">
              {child.children && child.children.length > 0 ? (
                <RenderComponentWithChildren component={child} />
              ) : (
                <ComponentStatus component={child} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

// Component group with improved styling and status propagation - Removed progress bars
const ComponentGroup = ({ component }: { component: Component }) => {
  const hasChildren = component.children && component.children.length > 0;
  
  // Calculate effective status based on children statuses - handle undefined case
  const effectiveStatus = hasChildren && component.children ? getWorstStatus(component.children) : component.status;
  // Create a component with the propagated status for display
  const displayComponent = { ...component, status: effectiveStatus };
  
  const [isOpen, setIsOpen] = useState(effectiveStatus !== "OPERATIONAL" || component.isCollapsed === false);
  
  // Use the shared getStatusInfo function instead of redefining it
  const statusInfo = getStatusInfo(effectiveStatus);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mb-6 border rounded-lg overflow-hidden shadow-sm"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/10 rounded-t transition-colors">
        <div className="flex items-center gap-2 font-semibold">
          {component.name}
          {component.status !== effectiveStatus && (
            <span className="text-xs bg-muted/30 px-2 py-0.5 rounded ml-2">Status reflects child components</span>
          )}
        </div>
        <Badge variant="outline" className={`${statusInfo.color} py-1 px-3 rounded-full min-w-[140px] flex justify-center`}>
          <span className="flex items-center gap-1">
            {statusInfo.icon}
            <span className={`text-xs font-medium ${statusInfo.textColor}`}>{statusInfo.label}</span>
          </span>
        </Badge>
      </CollapsibleTrigger>
      {hasChildren && (
        <CollapsibleContent className="px-4 pb-4 pt-2">
          <div className="space-y-2">
            {component.children.map((child) => (
              <RenderComponentWithChildren key={child.id} component={child} />
            ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

// Incident display
const IncidentItem = ({ incident }: { incident: Incident }) => {
  const getStatusInfo = (impact: string) => {
    switch(impact) {
      case 'OPERATIONAL': 
        return { 
          color: "bg-green-900/20 border-green-900/30", 
          icon: <CheckCircle className="h-4 w-4 text-green-400" />
        };
      case 'UNDERMAINTENANCE': 
        return { 
          color: "bg-blue-900/20 border-blue-900/30", 
          icon: <Clock className="h-4 w-4 text-[#D98546]" />
        };
      case 'DEGRADEDPERFORMANCE': 
        return { 
          color: "bg-yellow-900/20 border-yellow-900/30", 
          icon: <AlertTriangle className="h-4 w-4 text-[#D98546]" />
        };
      case 'PARTIALOUTAGE': 
        return { 
          color: "bg-orange-900/20 border-orange-900/30", 
          icon: <AlertTriangle className="h-4 w-4 text-[#D98546]" />
        };
      case 'MAJOROUTAGE': 
        return { 
          color: "bg-red-900/20 border-red-900/30", 
          icon: <AlertCircle className="h-4 w-4 text-[#A8514A]" />
        };
      default: 
        return { 
          color: "bg-muted/30 border-muted", 
          icon: <AlertCircle className="h-4 w-4 text-[#A8514A]" />
        };
    }
  };

  const info = getStatusInfo(incident.impact);
  const formattedDate = new Date(incident.started).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <div className="mb-6 border-b pb-4 last:border-0">
      <div className={`${info.color} px-4 py-3 rounded-md mb-4`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-semibold ${headingStyle}`}>{incident.name}</h3>
          <Badge variant="outline" className={`${info.color} py-0.5 px-3 rounded-full`}>
            <span className="flex items-center gap-1">
              {info.icon}
              <span className="text-xs font-medium">{incident.impact.replace(/([A-Z])/g, ' $1').trim()}</span>
            </span>
          </Badge>
        </div>
      </div>
      <div className="px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Clock className="h-4 w-4" />
          <span>Started: {formattedDate}</span>
        </div>
        {incident.updates && incident.updates.length > 0 && (
          <div className="text-sm border-l-2 border-muted pl-3 py-1">
            {incident.updates[incident.updates.length - 1].message}
          </div>
        )}
        {incident.components && incident.components.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">Affected components:</p>
            <div className="flex flex-wrap gap-2">
              {incident.components.slice(0, 3).map(comp => (
                <Badge key={comp.id} variant="outline">
                  {comp.name}
                </Badge>
              ))}
              {incident.components.length > 3 && (
                <Badge variant="outline">
                  +{incident.components.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Maintenance display
const MaintenanceItem = ({ maintenance }: { maintenance: Maintenance }) => {
  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'NOTSTARTEDYET': 
        return { 
          color: "bg-indigo-900/20 border-indigo-900/30", 
          label: "Scheduled"
        };
      case 'INPROGRESS': 
        return { 
          color: "bg-blue-900/20 border-blue-900/30", 
          label: "In Progress"
        };
      case 'COMPLETED': 
        return { 
          color: "bg-green-900/20 border-green-900/30", 
          label: "Completed"
        };
      default: 
        return { 
          color: "bg-muted/30 border-muted", 
          label: status.replace(/([A-Z])/g, ' $1').trim()
        };
    }
  };

  const statusInfo = getStatusInfo(maintenance.status);
  const startDate = new Date(maintenance.start).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  
  const endDate = new Date(maintenance.end).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <div className="mb-4 last:mb-0 border-b pb-3 last:border-0 hover:bg-muted/10 rounded transition-colors">
      <div className="flex items-center justify-between mb-2 py-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D98546]"></div>
          <span className={`font-medium ${headingStyle}`}>{maintenance.name}</span>
        </div>
        <Badge variant="outline" className={statusInfo.color}>
          {statusInfo.label}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {startDate} - {endDate}
      </p>
      {maintenance.updates && maintenance.updates.length > 0 && (
        <p className="text-sm text-muted-foreground border-l-2 border-muted pl-3 mt-2 line-clamp-2">
          {maintenance.updates[0].message}
        </p>
      )}
    </div>
  );
};

// Component selection item with recursive rendering for children
const ComponentSelectionItem = ({ 
  component, 
  selectedComponents, 
  onSelectionChange, 
  prefix 
}: { 
  component: Component | ComponentChild; 
  selectedComponents: string[]; 
  onSelectionChange: (component: Component | ComponentChild, checked: boolean) => void;
  prefix: string;
}) => {
  const hasChildren = component.children && component.children.length > 0;
  
  return (
    <div className="mt-1">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={`component-${prefix}-${component.id}`} 
          value={component.id}
          checked={selectedComponents.includes(component.id)}
          onCheckedChange={(checked) => onSelectionChange(component, checked === true)}
        />
        <Label htmlFor={`component-${prefix}-${component.id}`} className="text-xs font-medium">{component.name}</Label>
      </div>
      
      {hasChildren && (
        <div className="ml-6 mt-1 space-y-1">
          {component.children?.map(child => (
            <ComponentSelectionItem 
              key={child.id} 
              component={child} 
              selectedComponents={selectedComponents}
              onSelectionChange={onSelectionChange}
              prefix={prefix}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable component for the notification selection forms
const NotificationComponentSelector = ({
  components,
  selectedComponents,
  onSelectionChange,
  prefix,
  notifyAll,
  setNotifyAll
}: {
  components: Component[];
  selectedComponents: string[];
  onSelectionChange: (component: Component | ComponentChild, checked: boolean) => void;
  prefix: string;
  notifyAll: boolean;
  setNotifyAll: (value: boolean) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`notifyAll-${prefix}`} 
            checked={notifyAll}
            onCheckedChange={(checked) => setNotifyAll(checked === true)}
          />
          <Label htmlFor={`notifyAll-${prefix}`}>Notify me about all Services</Label>
        </div>
      </div>
      {!notifyAll && (
        <div className="border rounded-md p-3 mt-2">
          <Label className="block mb-2 text-xs">Select specific components:</Label>
          <div className="space-y-2 max-h-40 overflow-y-auto text-xs">
            {components.map(component => (
              <div key={component.id}>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`component-${prefix}-${component.id}`} 
                    value={component.id}
                    checked={selectedComponents.includes(component.id)}
                    onCheckedChange={(checked) => onSelectionChange(component, checked === true)}
                  />
                  <Label htmlFor={`component-${prefix}-${component.id}`} className="text-xs font-medium">{component.name}</Label>
                </div>
                {component.children && component.children.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {component.children.map(child => (
                      <ComponentSelectionItem 
                        key={child.id} 
                        component={child} 
                        selectedComponents={selectedComponents}
                        onSelectionChange={onSelectionChange}
                        prefix={prefix}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main status page client component
export default function StatusPageClient() {
  const [components, setComponents] = useState<Component[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [notifyAll, setNotifyAll] = useState<boolean>(true);
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  // Form states for different notification channels
  const [emailValue, setEmailValue] = useState<string>('');
  const [webhookValue, setWebhookValue] = useState<string>('');
  const [discordValue, setDiscordValue] = useState<string>('');
  const [slackValue, setSlackValue] = useState<string>('');
  
  // Form state for notify all toggle per channel
  const [notifyAllEmail, setNotifyAllEmail] = useState<boolean>(true);
  const [notifyAllWebhook, setNotifyAllWebhook] = useState<boolean>(true);
  const [notifyAllDiscord, setNotifyAllDiscord] = useState<boolean>(true);
  const [notifyAllSlack, setNotifyAllSlack] = useState<boolean>(true);

  const fetchStatusData = async () => {
    try {
      setLoading(true);
      
      const [componentsData, incidentsData, maintenancesData] = await Promise.all([
        fetchData<ComponentsResponse>('/api/status/components'),
        fetchData<Incident[]>('/api/status/incidents'),
        fetchData<Maintenance[]>('/api/status/maintenances'),
      ]);

      setComponents(componentsData?.data || []);
      setIncidents(incidentsData || []);
      setMaintenances(maintenancesData || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching status data:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusData();
  }, [refreshTrigger]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSubscribe = async (e: React.FormEvent, method: string) => {
    e.preventDefault();
    setSubscribing(true);

    try {
      let contact: any = {};
      let selectedComponentsList: string[] = [];
      
      // Determine which notification method was used and collect values
      switch (method) {
        case 'email':
          contact.email = emailValue;
          selectedComponentsList = notifyAllEmail ? ['ALL'] : selectedComponents;
          break;
        case 'webhook':
          contact.webhook = webhookValue;
          selectedComponentsList = notifyAllWebhook ? ['ALL'] : selectedComponents;
          break;
        case 'discord':
          contact.discord = discordValue;
          selectedComponentsList = notifyAllDiscord ? ['ALL'] : selectedComponents;
          break;
        case 'slack':
          contact.slack = slackValue;
          selectedComponentsList = notifyAllSlack ? ['ALL'] : selectedComponents;
          break;
        default:
          throw new Error('Invalid notification method');
      }

      // Call the API
      const response = await fetch('/api/status/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact,
          components: selectedComponentsList,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Success
      toast({
        title: "Subscription successful",
        description: "You will now receive status notifications",
        variant: "default",
      });

      // Reset form
      resetForm(method);
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setSubscribing(false);
    }
  };

  const resetForm = (method: string) => {
    switch (method) {
      case 'email':
        setEmailValue('');
        setNotifyAllEmail(true);
        break;
      case 'webhook':
        setWebhookValue('');
        setNotifyAllWebhook(true);
        break;
      case 'discord':
        setDiscordValue('');
        setNotifyAllDiscord(true);
        break;
      case 'slack':
        setSlackValue('');
        setNotifyAllSlack(true);
        break;
    }
    setSelectedComponents([]);
  };

  // Helper function to collect all component IDs recursively including children
  const getAllChildComponentIds = (component: Component | ComponentChild): string[] => {
    const ids = [component.id];
    
    if (component.children && component.children.length > 0) {
      component.children.forEach(child => {
        ids.push(...getAllChildComponentIds(child));
      });
    }
    
    return ids;
  };

  // Helper function to update component selection
  const handleComponentSelection = (component: Component | ComponentChild, checked: boolean) => {
    if (checked) {
      // Add this component and all its children
      const allIds = getAllChildComponentIds(component);
      setSelectedComponents(prev => [...new Set([...prev, ...allIds])]);
    } else {
      // Remove this component and all its children
      const allIds = getAllChildComponentIds(component);
      setSelectedComponents(prev => prev.filter(id => !allIds.includes(id)));
    }
  };

  // Filter current (active) incidents
  const activeIncidents = incidents.filter(incident => 
    incident.status !== 'RESOLVED' && incident.status !== 'COMPLETED'
  );

  // Get upcoming maintenances
  const upcomingMaintenances = maintenances.filter(maintenance =>
    maintenance.status === 'NOTSTARTEDYET' || maintenance.status === 'INPROGRESS'
  );

  // Calculate overall system status
  const getOverallStatus = () => {
    if (!components || components.length === 0) return 'All Systems Operational';
  
    // Create a flattened list of all statuses including from nested children
    let allStatuses: string[] = [];
  
    const collectStatuses = (comps: Component[] | ComponentChild[]) => {
      comps.forEach(comp => {
        allStatuses.push(comp.status);
        if (comp.children && comp.children.length > 0) {
          collectStatuses(comp.children);
        }
      });
    };
  
    collectStatuses(components);
  
    if (allStatuses.includes('MAJOROUTAGE')) return 'Major Outage';
    if (allStatuses.includes('PARTIALOUTAGE')) return 'Partial Outage';
    if (allStatuses.includes('DEGRADEDPERFORMANCE')) return 'Degraded Performance';
    if (allStatuses.includes('UNDERMAINTENANCE')) return 'Under Maintenance';
    return 'All Systems Operational';
  };

  const getStatusAlert = () => {
    const status = getOverallStatus();
    
    if (status === 'All Systems Operational') {
      return (
        <Alert>
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          <AlertTitle className={`text-lg ${headingStyle}`}>All Systems Operational</AlertTitle>
          <AlertDescription className="mt-1">
            All Hyber systems are operating normally.
          </AlertDescription>
        </Alert>
      );
    } else {
      return (
        <Alert variant="destructive" className="bg-[#A8514A]/20 border-[#A8514A]/50">
          <div className="flex items-center">
            <AlertTriangle className="h-12 w-12 mr-3 text-[#FF6B63]" />
            <div>
              <AlertTitle className={`text-lg ${headingStyle} text-[#FF6B63] font-bold`}>{status}</AlertTitle>
              <AlertDescription className="mt-1 text-[#FF6B63] font-medium">
                One or more Hyber systems are experiencing issues. See details below.
              </AlertDescription>
            </div>
          </div>
        </Alert>
      );
    }
  };

  return (
    <div className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className={`text-4xl font-bold tracking-tight sm:text-5xl ${headingStyle}`}>System Status</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Check the current status of our infrastructure and services
          </p>
        </div>
        
        <div className="mt-16">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h2 className={`text-xl font-bold ${headingStyle}`}>Current Status</h2>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(lastUpdated)} ago
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleManualRefresh} 
              className="hover:text-[#D98546] hover:border-[#D98546] transition-colors"
            >
              <RefreshCw className="mr-2 h-4 w-4 text-[#D98546]" />
              Refresh
            </Button>
          </div>
          
          {/* Min height container to prevent layout shifts */}
          <div className="min-h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <Loader2 className="h-10 w-10 animate-spin text-[#D98546] mx-auto mb-3" />
                  <p className="text-muted-foreground">Checking system status...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <AlertCircle className="h-10 w-10 text-[#A8514A] mx-auto mb-3" />
                <p className="text-muted-foreground">Error loading status data: {error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleManualRefresh} 
                  className="mt-4 hover:text-[#D98546]"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  {getStatusAlert()}
                </div>

                {/* Components */}
                <div className="space-y-6">
                  {components.map(component => (
                    <ComponentGroup key={component.id} component={component} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <h2 className={`text-2xl font-bold mb-6 ${headingStyle}`}>Current Incidents</h2>
          {/* Fixed height container for incidents */}
          <div className="min-h-[100px]">
            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse h-28 bg-muted rounded-lg"></div>
                <div className="animate-pulse h-28 bg-muted rounded-lg"></div>
              </div>
            ) : activeIncidents.length > 0 ? (
              activeIncidents.map(incident => (
                <IncidentItem key={incident.id} incident={incident} />
              ))
            ) : (
              <div className="text-center p-10 border rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <p className="font-medium">No current incidents reported</p>
                <p className="text-muted-foreground text-sm">All systems are operating normally</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{`Scheduled Maintenance`}</CardTitle>
              <CardDescription>Upcoming planned maintenance events</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <div className="animate-pulse h-20 bg-muted rounded-lg"></div>
                  <div className="animate-pulse h-20 bg-muted rounded-lg"></div>
                </div>
              ) : upcomingMaintenances.length > 0 ? (
                <div className="space-y-6">
                  {upcomingMaintenances.slice(0, 3).map(maintenance => (
                    <div key={maintenance.id} className="flex items-start gap-4">
                      <div className="mt-1">
                        <Clock className="h-5 w-5 text-[#D98546]" />
                      </div>
                      <div>
                        <h3 className="font-medium">{maintenance.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Scheduled for {new Date(maintenance.start).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                          })} - {new Date(maintenance.end).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                          })}
                        </p>
                        {maintenance.updates && maintenance.updates.length > 0 && (
                          <p className="text-sm mt-2">{maintenance.updates[0].message}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium">No scheduled maintenance</p>
                  <p className="text-muted-foreground text-sm">No upcoming maintenance events</p>
                </div>
              )}
            </CardContent>
            {upcomingMaintenances.length > 0 && (
              <CardFooter>
                <div className="w-full flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="hover:text-[#D98546] hover:border-[#D98546]"
                    asChild
                  >
                    <Link href="https://hyber.instatus.com/maintenance" target="_blank" rel="noopener noreferrer">
                      View All Maintenance <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className={headingStyle}>
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-[#D98546]" />
                  <span>Stay Informed</span>
                </div>
              </CardTitle>
              <CardDescription>Get notified about incidents and maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="email" className="flex items-center gap-1 text-xs">
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="webhook" className="flex items-center gap-1 text-xs">
                    <WebhookIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Webhook</span>
                  </TabsTrigger>
                  <TabsTrigger value="discord" className="flex items-center gap-1 text-xs">
                    <Discord className="h-4 w-4" />
                    <span className="hidden sm:inline">Discord</span>
                  </TabsTrigger>
                  <TabsTrigger value="slack" className="flex items-center gap-1 text-xs">
                    <Slack className="h-4 w-4" />
                    <span className="hidden sm:inline">Slack</span>
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={(e) => handleSubscribe(e, 'email')} className="mt-4">
                  <TabsContent value="email">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="you@example.com" 
                          value={emailValue}
                          onChange={(e) => setEmailValue(e.target.value)}
                          required
                        />
                      </div>
                      <NotificationComponentSelector
                        components={components}
                        selectedComponents={selectedComponents}
                        onSelectionChange={handleComponentSelection}
                        prefix="email"
                        notifyAll={notifyAllEmail}
                        setNotifyAll={setNotifyAllEmail}
                      />
                      <Button type="submit" disabled={subscribing}>
                        {subscribing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </form>

                <form onSubmit={(e) => handleSubscribe(e, 'webhook')} className="mt-4">
                  <TabsContent value="webhook">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input 
                          id="webhook-url" 
                          type="url" 
                          placeholder="https://example.com/webhook" 
                          value={webhookValue}
                          onChange={(e) => setWebhookValue(e.target.value)}
                          required
                        />
                      </div>
                      <NotificationComponentSelector
                        components={components}
                        selectedComponents={selectedComponents}
                        onSelectionChange={handleComponentSelection}
                        prefix="webhook"
                        notifyAll={notifyAllWebhook}
                        setNotifyAll={setNotifyAllWebhook}
                      />
                      <Button type="submit" disabled={subscribing}>
                        {subscribing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </form>

                <form onSubmit={(e) => handleSubscribe(e, 'discord')} className="mt-4">
                  <TabsContent value="discord">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="discord-webhook">Discord Webhook URL</Label>
                        <Input 
                          id="discord-webhook" 
                          type="url" 
                          placeholder="https://discord.com/api/webhooks/..." 
                          value={discordValue}
                          onChange={(e) => setDiscordValue(e.target.value)}
                          required
                        />
                      </div>
                      <NotificationComponentSelector
                        components={components}
                        selectedComponents={selectedComponents}
                        onSelectionChange={handleComponentSelection}
                        prefix="discord"
                        notifyAll={notifyAllDiscord}
                        setNotifyAll={setNotifyAllDiscord}
                      />
                      <Button type="submit" disabled={subscribing}>
                        {subscribing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </form>

                <form onSubmit={(e) => handleSubscribe(e, 'slack')} className="mt-4">
                  <TabsContent value="slack">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                        <Input 
                          id="slack-webhook" 
                          type="url" 
                          placeholder="https://hooks.slack.com/services/..." 
                          value={slackValue}
                          onChange={(e) => setSlackValue(e.target.value)}
                          required
                        />
                      </div>
                      <NotificationComponentSelector
                        components={components}
                        selectedComponents={selectedComponents}
                        onSelectionChange={handleComponentSelection}
                        prefix="slack"
                        notifyAll={notifyAllSlack}
                        setNotifyAll={setNotifyAllSlack}
                      />
                      <Button type="submit" disabled={subscribing}>
                        {subscribing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </form>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center py-2 px-4 bg-muted rounded-md mb-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            <span>
              Auto-refreshes every 60 seconds · Last updated:{" "}
              {lastUpdated.toLocaleString("en-US", {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
              })}
            </span>
          </div>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="inline-flex items-center hover:text-[#D98546] hover:border-[#D98546] transition-colors"
              onClick={handleManualRefresh}
            >
              <RefreshCw className="mr-2 h-4 w-4 text-[#D98546]" />
              Refresh Now
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="inline-flex items-center hover:text-[#D98546] hover:border-[#D98546] transition-colors"
            >
              <Link href="https://hyber.instatus.com/history.rss" target="_blank">
                <Rss className="mr-2 h-4 w-4 text-[#D98546]" />
                RSS Feed
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            For more detailed information about our system status:
          </p>
          <Button 
            asChild 
            className="bg-[#D98546] hover:bg-[#A8514A] shadow-sm transition-colors"
          >
            <Link href="https://hyber.instatus.com" target="_blank" rel="noopener noreferrer">
              Visit Full Status Page <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}