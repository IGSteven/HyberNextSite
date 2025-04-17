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

interface Component {
  id: string;
  name: string;
  status: string;
  order: number;
  description?: string;
  [key: string]: any;
}

export function StatusSubscribe() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notificationType, setNotificationType] = useState<"email" | "webhook" | "discord" | "slack">("email")
  const [availableServices, setAvailableServices] = useState<Component[]>([])
  const [isLoadingComponents, setIsLoadingComponents] = useState(true)

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
                  ) : availableServices.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 border border-[#463e59] rounded-md p-4 max-h-64 overflow-y-auto bg-[#1e1929]">
                      {availableServices.map((service) => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={service.id} 
                            value={service.id}
                            onCheckedChange={(checked) => {
                              const currentServices = form.getValues("services") || [];
                              if (checked) {
                                form.setValue("services", [...currentServices, service.id]);
                              } else {
                                form.setValue("services", currentServices.filter(id => id !== service.id));
                              }
                            }}
                            className="border-[#f2994a] text-[#f2994a]"
                          />
                          <label 
                            htmlFor={service.id} 
                            className="text-xs text-white cursor-pointer"
                          >
                            {service.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 border border-[#463e59] rounded-md bg-[#1e1929] text-gray-300 text-sm">
                      No services available. You will be notified about all status changes.
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