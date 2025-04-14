import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Clock, RefreshCw } from "lucide-react"
import { StatusIndicator } from "./status-indicator"
import { StatusIncidents } from "./status-incidents"
import { StatusSkeleton } from "./status-skeleton"

export const metadata = {
  title: "Network Status - HyberHost",
  description: "Check the current status of HyberHost's network and services",
}

export default function NetworkStatusPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Network Status</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Check the current status of our network infrastructure and services
          </p>
        </div>

        <div className="mt-16">
          <Suspense fallback={<StatusSkeleton />}>
            <StatusIndicator />
          </Suspense>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Current Incidents</h2>
          <Suspense fallback={<div className="animate-pulse h-32 bg-muted rounded-lg"></div>}>
            <StatusIncidents />
          </Suspense>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Maintenance</CardTitle>
              <CardDescription>Upcoming planned maintenance events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Clock className="h-5 w-5 text-hyber-orange" />
                  </div>
                  <div>
                    <h3 className="font-medium">Network Upgrades</h3>
                    <p className="text-sm text-muted-foreground mt-1">Scheduled for May 15, 2025, 02:00 - 04:00 UTC</p>
                    <p className="text-sm mt-2">
                      We will be upgrading our core network equipment to improve performance and capacity. Brief
                      intermittent connectivity issues may occur during this time.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="ml-auto">
                <Link href="https://hyber.instatus.com/maintenance" target="_blank" rel="noopener noreferrer">
                  View All Maintenance <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historical Uptime</CardTitle>
              <CardDescription>Past 90 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Core Network</span>
                  <div className="flex items-center">
                    <Badge className="bg-green-500 hover:bg-green-600">99.99%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>VPS Platform</span>
                  <div className="flex items-center">
                    <Badge className="bg-green-500 hover:bg-green-600">99.98%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dedicated Servers</span>
                  <div className="flex items-center">
                    <Badge className="bg-green-500 hover:bg-green-600">100%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Client Portal</span>
                  <div className="flex items-center">
                    <Badge className="bg-green-500 hover:bg-green-600">99.95%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="ml-auto">
                <Link href="https://hyber.instatus.com/uptime" target="_blank" rel="noopener noreferrer">
                  View Detailed Uptime <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            This page automatically refreshes every 60 seconds. Last updated:{" "}
            {new Date().toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <Button asChild variant="outline" className="inline-flex items-center">
            <Link href="/network/status">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Now
            </Link>
          </Button>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            For more detailed information and to subscribe to updates, visit our status page:
          </p>
          <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
            <Link href="https://hyber.instatus.com" target="_blank" rel="noopener noreferrer">
              Visit Full Status Page <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
