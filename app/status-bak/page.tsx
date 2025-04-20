"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, RefreshCw, Rss } from "lucide-react"
import { StatusIndicator } from "./status-indicator"
import { StatusIncidents } from "./status-incidents"
import { StatusSkeleton } from "./status-skeleton"
import { StatusMaintenance } from "./status-maintenance"
import { StatusSubscribe } from "./status-subscribe"
import { fetchStatusData } from "@/lib/status/utils"

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [statusData, setStatusData] = useState(null)

  // Function to update data without remounting components
  const refreshData = () => {
    setLastUpdated(new Date());
    setRefreshTrigger(prev => prev + 1);
  };

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set up a refresh timer that runs every 30 seconds
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      refreshData();
    }, 30000); // 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  // Function to manually refresh the page
  const handleManualRefresh = () => {
    refreshData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStatusData();
      setStatusData(data);
    };

    fetchData();
  }, [refreshTrigger]);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">System Status</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Check the current status of our infrastructure and services
          </p>
        </div>

        <div className="mt-16">
          {statusData ? (
            <div>
              {statusData.components.map((component) => (
                <Card key={component.id}>
                  <CardHeader>
                    <CardTitle>{component.name}</CardTitle>
                    <Badge>{component.status}</Badge>
                  </CardHeader>
                  <CardContent>
                    {component.children && component.children.map((child) => (
                      <div key={child.id}>
                        <p>{child.name}</p>
                        <Badge>{child.status}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <StatusSkeleton />
          )}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Current Incidents</h2>
          <Suspense fallback={<div className="animate-pulse h-32 bg-muted rounded-lg"></div>}>
            <StatusIncidents refreshTrigger={refreshTrigger} />
          </Suspense>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-8">Scheduled Maintenance</h2>
            <Suspense fallback={<div className="animate-pulse h-32 bg-muted rounded-lg"></div>}>
              <StatusMaintenance refreshTrigger={refreshTrigger} />
            </Suspense>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">Status Notifications</h2>
            <StatusSubscribe />
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            This page automatically refreshes every 30 seconds. Last updated:{" "}
            {isMounted ? (
              lastUpdated.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            ) : (
              "Loading..."
            )}
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="inline-flex items-center"
              onClick={handleManualRefresh}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Now
            </Button>
            <Button asChild variant="outline" className="inline-flex items-center">
              <Link href="/api/status/history.rss" target="_blank">
                <Rss className="mr-2 h-4 w-4" />
                RSS Feed
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            For more detailed information about our system status:
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