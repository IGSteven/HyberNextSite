"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Server, HardDrive, CreditCard, TicketIcon, Settings, AlertCircle, User, LogOut } from "lucide-react"
import Link from "next/link"

// Mock user data (in a real app, this would come from an API)
const mockUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  services: [
    {
      id: 1,
      name: "Business VPS",
      type: "vps",
      status: "Active",
      nextDueDate: "2023-12-01",
      price: 39.99,
      details: {
        cpu: "4 vCPU Cores",
        ram: "8GB RAM",
        storage: "100GB SSD",
        ip: "192.168.1.1",
        location: "US East",
      },
    },
    {
      id: 2,
      name: "Pro Dedicated Server",
      type: "dedicated",
      status: "Active",
      nextDueDate: "2023-12-15",
      price: 149.99,
      details: {
        cpu: "8 CPU Cores",
        ram: "32GB RAM",
        storage: "1TB SSD",
        ip: "192.168.2.1",
        location: "US West",
      },
    },
  ],
  invoices: [
    {
      id: 1001,
      date: "2023-11-01",
      dueDate: "2023-12-01",
      total: 39.99,
      status: "Paid",
    },
    {
      id: 1002,
      date: "2023-11-15",
      dueDate: "2023-12-15",
      total: 149.99,
      status: "Unpaid",
    },
  ],
  tickets: [
    {
      id: 5001,
      subject: "Server Reboot Issue",
      date: "2023-11-10",
      status: "Open",
    },
    {
      id: 5002,
      subject: "Billing Question",
      date: "2023-11-05",
      status: "Closed",
    },
  ],
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<typeof mockUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate checking authentication and fetching user data
  useEffect(() => {
    // In a real app, check if user is authenticated and fetch data
    // For now, we'll just use mock data after a short delay
    const timer = setTimeout(() => {
      // Check if user is logged in (in a real app)
      const isLoggedIn = true // This would be a real check

      if (!isLoggedIn) {
        router.push("/login")
        return
      }

      setUser(mockUser)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>Unable to load your account information. Please try logging in again.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.firstName}!</h1>
            <p className="text-muted-foreground">Manage your hosting services and account</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account Settings
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 text-red-500 hover:text-red-600">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid grid-cols-4 md:w-[400px]">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.services.map((service) => (
                <Card key={service.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{service.name}</CardTitle>
                        <CardDescription>
                          {service.type === "vps" ? "Virtual Private Server" : "Dedicated Server"}
                        </CardDescription>
                      </div>
                      <div
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          service.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {service.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-muted-foreground" />
                          <span>{service.details.cpu}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span>{service.details.storage}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        Next payment: ${service.price.toFixed(2)} on {service.nextDueDate}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                    <Button variant="outline" size="sm">
                      Renew
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/services">Order New Service</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>View and pay your invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Invoice #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {user.invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{invoice.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{invoice.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{invoice.dueDate}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">${invoice.total.toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                invoice.status === "Paid"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}
                            >
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            {invoice.status === "Unpaid" && (
                              <Button variant="ghost" size="sm" className="text-blue-600">
                                Pay
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Methods
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>View and manage your support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Ticket #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {user.tickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{ticket.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{ticket.subject}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{ticket.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                ticket.status === "Open"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-blue-600 hover:bg-blue-700">
                  <TicketIcon className="h-4 w-4 mr-2" />
                  Open New Ticket
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">First Name</label>
                      <div className="mt-1 p-2 border rounded-md">{user.firstName}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Name</label>
                      <div className="mt-1 p-2 border rounded-md">{user.lastName}</div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="mt-1 p-2 border rounded-md">{user.email}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="text-red-500 hover:text-red-600">
                  Change Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
