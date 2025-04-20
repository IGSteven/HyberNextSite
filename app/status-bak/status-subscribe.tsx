"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { BellRing, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  notificationType: z.enum(["email", "webhook", "discord", "slack"]),
  email: z.string().email({ message: "Please enter a valid email address." }).optional(),
  webhookUrl: z.string().url({ message: "Please enter a valid webhook URL." }).optional(),
  discordWebhook: z.string().url({ message: "Please enter a valid Discord webhook URL." }).optional(),
  slackWebhook: z.string().url({ message: "Please enter a valid Slack webhook URL." }).optional(),
  notifyAllServices: z.boolean(),
  services: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof formSchema>

// Define types for Instatus API responses
interface Component {
  id: string;
  name: string;
  status: string;
  order: number;
  groupId?: string;
  isParent?: boolean;
  description?: string;
  [key: string]: any;
}

interface ComponentGroup {
  id: string;
  name: string;
  components: Component[];
}

export function StatusSubscribe() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notificationType, setNotificationType] = useState<"email" | "webhook" | "discord" | "slack">("email")
  const [availableServices, setAvailableServices] = useState<Component[]>([])
  const [componentGroups, setComponentGroups] = useState<ComponentGroup[]>([])
  const [ungroupedComponents, setUngroupedComponents] = useState<Component[]>([])
  const [isLoadingComponents, setIsLoadingComponents] = useState(true)
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set())

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notificationType: "email",
      notifyAllServices: true,
      services: [],
    }
  })

  // Fetch components on mount
  useEffect(() => {
    async function fetchComponents() {
      try {
        setIsLoadingComponents(true)
        const response = await fetch('/api/status/components')
        
        if (!response.ok) {
          throw new Error("Failed to fetch components")
        }
        
        const result = await response.json()
        
        if (result.success && Array.isArray(result.data)) {
          // Sort components by order if available
          const sortedComponents = [...result.data].sort((a, b) => 
            (a.order || 0) - (b.order || 0)
          )
          setAvailableServices(sortedComponents)
          // Organize components into groups
          organizeComponentGroups(sortedComponents)
        } else {
          throw new Error("Invalid component data")
        }
      } catch (error) {
        console.error("Error fetching status components:", error)
        toast({
          title: "Error Loading Services",
          description: "Could not load status components. Please try refreshing the page.",
          variant: "destructive"
        })
      } finally {
        setIsLoadingComponents(false)
      }
    }
    
    fetchComponents()
  }, [toast])

  // Organize components into groups
  const organizeComponentGroups = (components: Component[]) => {
    if (!Array.isArray(components) || !components.length) {
      setComponentGroups([]);
      setUngroupedComponents([]);
      return;
    }

    // Group components by their groupId
    const groupMap = new Map<string, Component[]>();
    
    // First, find all unique groups using the groupId property
    components.forEach(component => {
      if (component.groupId) {
        if (!groupMap.has(component.groupId)) {
          groupMap.set(component.groupId, []);
        }
        groupMap.get(component.groupId)?.push(component);
      }
    });
    
    // Create component groups for display
    const groups: ComponentGroup[] = [];
    
    // Process each group
    groupMap.forEach((groupComponents, groupId) => {
      // Check if there's a component with isParent=true in this group
      const parentComponent = groupComponents.find(comp => comp.isParent === true);
      
      if (parentComponent) {
        // Use parent component name as the group name
        groups.push({
          id: groupId,
          name: parentComponent.name,
          components: groupComponents,
        });
      } else if (groupComponents.length > 0) {
        // If no parent component, use first component's name and add " Group" suffix
        const groupName = (groupComponents[0].name || "Unknown Group") + " Group";
        
        groups.push({
          id: groupId,
          name: groupName,
          components: groupComponents,
        });
      }
    });
    
    // Find ungrouped components (those without a groupId)
    const ungrouped = components.filter(component => !component.groupId);
    
    setComponentGroups(groups);
    setUngroupedComponents(ungrouped);
  };

  // Handle group selection
  const handleGroupSelection = (groupId: string, checked: boolean) => {
    const newSelectedGroups = new Set(selectedGroups);
    const currentServices = form.getValues("services") || [];
    
    // Get all component IDs in this group
    const groupComponentIds = componentGroups
      .find(group => group.id === groupId)
      ?.components.map(comp => comp.id) || [];
    
    if (checked) {
      // Add group to selected groups
      newSelectedGroups.add(groupId);
      
      // Add all component IDs from this group to the services array
      const updatedServices = [...new Set([...currentServices, ...groupComponentIds])];
      form.setValue("services", updatedServices);
    } else {
      // Remove group from selected groups
      newSelectedGroups.delete(groupId);
      
      // Remove all component IDs from this group
      const updatedServices = currentServices.filter(id => !groupComponentIds.includes(id));
      form.setValue("services", updatedServices);
    }
    
    setSelectedGroups(newSelectedGroups);
  };
  
  // Handle individual component selection
  const handleComponentSelection = (componentId: string, groupId: string | undefined, checked: boolean) => {
    const currentServices = form.getValues("services") || [];
    const newSelectedGroups = new Set(selectedGroups);
    
    if (checked) {
      // Add component to services
      form.setValue("services", [...currentServices, componentId]);
      
      // Check if all components in the group are now selected
      if (groupId) {
        const group = componentGroups.find(g => g.id === groupId);
        if (group) {
          const groupComponentIds = group.components.map(c => c.id);
          // If all group components would be in the updated services, add group to selected groups
          const wouldAllBeSelected = groupComponentIds.every(id => 
            currentServices.includes(id) || id === componentId
          );
          
          if (wouldAllBeSelected) {
            newSelectedGroups.add(groupId);
            setSelectedGroups(newSelectedGroups);
          }
        }
      }
    } else {
      // Remove component from services
      form.setValue("services", currentServices.filter(id => id !== componentId));
      
      // If component belongs to a group, remove group from selected groups
      if (groupId && selectedGroups.has(groupId)) {
        newSelectedGroups.delete(groupId);
        setSelectedGroups(newSelectedGroups);
      }
    }
  };
  
  // Check if a component is in a selected group
  const isComponentInSelectedGroup = (component: Component) => {
    if (!component.groupId) return false;
    return selectedGroups.has(component.groupId);
  };
  
  // Check if all components in a group are selected
  const isGroupFullySelected = (groupId: string) => {
    const group = componentGroups.find(g => g.id === groupId);
    if (!group) return false;
    
    const currentServices = form.getValues("services") || [];
    return group.components.every(comp => currentServices.includes(comp.id));
  };

  const watchNotifyAllServices = form.watch("notifyAllServices")

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      // Determine which notification field to use based on the type
      const notificationData = {
        type: values.notificationType,
        value: values.notificationType === "email" ? values.email :
               values.notificationType === "webhook" ? values.webhookUrl :
               values.notificationType === "discord" ? values.discordWebhook : values.slackWebhook,
        notifyAllServices: values.notifyAllServices,
        services: !values.notifyAllServices ? values.services : [],
      }

      const response = await fetch("/api/status/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe")
      }

      const result = await response.json()
      
      toast({
        title: "Subscription Successful",
        description: `You will now receive status updates via ${values.notificationType}.`,
      })
      
      form.reset()
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "There was a problem subscribing to status updates. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-[#241e33] border-none text-white">
      <CardContent className="p-6">
        <div className="flex items-center mb-3 gap-2">
          <BellRing className="h-5 w-5 text-[#f2994a]" />
          <h3 className="text-xl font-semibold">Stay Informed</h3>
        </div>
        <p className="text-sm mb-6 text-gray-300">
          Subscribe to receive status notifications when services are affected
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs 
              defaultValue="email" 
              className="w-full"
              onValueChange={(value) => {
                setNotificationType(value as "email" | "webhook" | "discord" | "slack");
                form.setValue("notificationType", value as "email" | "webhook" | "discord" | "slack");
              }}
            >
              <TabsList className="grid grid-cols-4 mb-4 bg-[#463e59]">
                <TabsTrigger value="email" className="data-[state=active]:bg-[#363046] data-[state=active]:text-white">Email</TabsTrigger>
                <TabsTrigger value="webhook" className="data-[state=active]:bg-[#363046] data-[state=active]:text-white">Webhook</TabsTrigger>
                <TabsTrigger value="discord" className="data-[state=active]:bg-[#363046] data-[state=active]:text-white">Discord</TabsTrigger>
                <TabsTrigger value="slack" className="data-[state=active]:bg-[#363046] data-[state=active]:text-white">Slack</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-0">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your-email@example.com" 
                          {...field} 
                          className="bg-[#1e1929] border-[#463e59] text-white placeholder-gray-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="webhook" className="mt-0">
                <FormField
                  control={form.control}
                  name="webhookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Webhook URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/webhook" 
                          {...field} 
                          className="bg-[#1e1929] border-[#463e59] text-white placeholder-gray-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="discord" className="mt-0">
                <FormField
                  control={form.control}
                  name="discordWebhook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Discord Webhook URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://discord.com/api/webhooks/..." 
                          {...field} 
                          className="bg-[#1e1929] border-[#463e59] text-white placeholder-gray-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="slack" className="mt-0">
                <FormField
                  control={form.control}
                  name="slackWebhook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Slack Webhook URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://hooks.slack.com/services/..." 
                          {...field} 
                          className="bg-[#1e1929] border-[#463e59] text-white placeholder-gray-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="notifyAllServices" 
                  checked={watchNotifyAllServices}
                  onCheckedChange={(checked) => {
                    form.setValue("notifyAllServices", checked === true);
                  }}
                  className="border-[#f2994a] text-[#f2994a]"
                />
                <label 
                  htmlFor="notifyAllServices" 
                  className="text-sm font-medium text-white cursor-pointer"
                >
                  Notify me about all services
                </label>
              </div>

              {!watchNotifyAllServices && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-white mb-2">Select specific services:</p>
                  {isLoadingComponents ? (
                    <div className="flex items-center justify-center p-6">
                      <Loader2 className="h-6 w-6 animate-spin text-[#f2994a]" />
                      <span className="ml-2 text-sm text-gray-300">Loading services...</span>
                    </div>
                  ) : (
                    <div className="border border-[#463e59] rounded-md p-4 max-h-96 overflow-y-auto bg-[#1e1929] space-y-4">
                      {/* Display component groups */}
                      {componentGroups.length > 0 && (
                        <div className="space-y-4">
                          {componentGroups.map((group) => {
                            const isChecked = isGroupFullySelected(group.id);
                            
                            return (
                              <div key={group.id} className="space-y-2">
                                {/* Group header with checkbox */}
                                <div className="flex items-center space-x-2 border-b border-[#463e59] pb-2">
                                  <Checkbox 
                                    id={`group-${group.id}`} 
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      handleGroupSelection(group.id, !!checked);
                                    }}
                                    className="border-[#f2994a] text-[#f2994a]"
                                  />
                                  <label 
                                    htmlFor={`group-${group.id}`} 
                                    className="text-sm font-medium text-white cursor-pointer"
                                  >
                                    {group.name}
                                  </label>
                                </div>
                                
                                {/* Group components */}
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1 ml-6">
                                  {group.components.map((component) => {
                                    const currentServices = form.getValues("services") || [];
                                    const isSelected = currentServices.includes(component.id);
                                    const inSelectedGroup = selectedGroups.has(group.id);
                                    
                                    return (
                                      <div 
                                        key={component.id} 
                                        className={`flex items-center space-x-2 p-1 rounded ${
                                          inSelectedGroup ? 'bg-[#1a192f] border border-[#f2994a]/30' : ''
                                        }`}
                                      >
                                        <Checkbox 
                                          id={component.id} 
                                          checked={isSelected}
                                          onCheckedChange={(checked) => {
                                            handleComponentSelection(component.id, group.id, !!checked);
                                          }}
                                          className="border-[#f2994a] text-[#f2994a]"
                                        />
                                        <label 
                                          htmlFor={component.id} 
                                          className="text-xs text-white cursor-pointer"
                                        >
                                          {component.name}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {/* Display ungrouped components */}
                      {ungroupedComponents.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-white border-b border-[#463e59] pb-2">
                            Other Services
                          </h4>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                            {ungroupedComponents.map((component) => {
                              const currentServices = form.getValues("services") || [];
                              const isSelected = currentServices.includes(component.id);
                              
                              return (
                                <div key={component.id} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={component.id} 
                                    checked={isSelected}
                                    onCheckedChange={(checked) => {
                                      handleComponentSelection(component.id, undefined, !!checked);
                                    }}
                                    className="border-[#f2994a] text-[#f2994a]"
                                  />
                                  <label 
                                    htmlFor={component.id} 
                                    className="text-xs text-white cursor-pointer"
                                  >
                                    {component.name}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {componentGroups.length === 0 && ungroupedComponents.length === 0 && (
                        <div className="p-4 text-gray-300 text-sm text-center">
                          No services available. You will be notified about all status changes.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#f2994a] hover:bg-[#e67e22] text-black font-medium py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe to Updates"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}