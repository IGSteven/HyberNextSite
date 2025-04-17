import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Zap, Shield, MapPin, Mail, Phone, Clock, ExternalLink } from "lucide-react"
import { PeeringPartners, PeeringPartnersLoading, InternetExchanges, InternetExchangesLoading } from "./peering-data"

export const metadata = {
  title: "Our Network - HyberHost",
  description: "Explore HyberHost's global network infrastructure, peering arrangements, and data centers",
}

export default function NetworkPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-hyber-black dark:text-white">
            Our Global Network Infrastructure
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Powered by AS51692, HyberHost's network is designed for reliability, speed, and security. Our infrastructure
            spans multiple continents with strategically placed data centers and peering arrangements.
          </p>
        </div>

        {/* Network Map */}
        <div className="mt-16 relative">
          <div className="bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-4 md:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-center opacity-10"></div>
            <div className="relative">
              <Image
                src="/interconnected-nodes.png"
                alt="HyberHost Global Network Map"
                width={1200}
                height={600}
                className="rounded-2xl shadow-lg mx-auto"
              />
              <div className="mt-8 text-center">
                <Badge className="bg-hyber-orange text-white hover:bg-hyber-red">AS51692</Badge>
                <p className="mt-4 text-sm text-muted-foreground">
                  Our autonomous system number (ASN) allows us to control our routing and provide optimal paths for your
                  traffic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Network Stats */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-hyber-orange/10 to-hyber-red/10 border-hyber-orange/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-4xl font-bold text-hyber-orange">3</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Data Centers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-hyber-orange/10 to-hyber-red/10 border-hyber-orange/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-4xl font-bold text-hyber-orange">100+</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Peering Partners</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-hyber-orange/10 to-hyber-red/10 border-hyber-orange/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-4xl font-bold text-hyber-orange">10 Tbps</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Network Capacity</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-hyber-orange/10 to-hyber-red/10 border-hyber-orange/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-4xl font-bold text-hyber-orange">99.99%</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Network Uptime</p>
            </CardContent>
          </Card>
        </div>

        {/* Network Features */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Network Features</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our network is built with enterprise-grade hardware and optimized for performance, reliability, and
              security.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Wifi className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Global Network
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Our network spans the UK and Canada with direct connections to major internet exchanges.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Shield className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Advanced Security
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    DDoS protection, firewall, and regular security updates to keep your infrastructure secure from
                    threats.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Zap className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Low Latency
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Optimized routing ensures your data takes the fastest path possible, reducing latency and improving
                    performance.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Clock className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  24/7 Monitoring
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Our network operations center monitors our infrastructure 24/7 to ensure optimal performance and
                    quickly address any issues.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Peering Information */}
        <div className="mt-24 sm:mt-32 bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Peering Information</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              HyberHost maintains an open peering policy and is present at major internet exchanges in the UK and
              Canada.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Peering Policy</CardTitle>
                <CardDescription>Our approach to network interconnection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  HyberHost (AS51692) maintains an open peering policy and welcomes peering requests from networks of
                  all sizes.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Minimum traffic exchange: 100 Mbps</li>
                  <li>BGP session support: IPv4 and IPv6</li>
                  <li>Route filtering: Standard IRR-based filtering</li>
                  <li>24/7 NOC support for peering partners</li>
                </ul>
                <div className="pt-4">
                  <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
                    <Link href="mailto:peering@hyberhost.com">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Peering Team
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Internet Exchange Points</CardTitle>
                <CardDescription>Where you can find us</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<InternetExchangesLoading />}>
                  <InternetExchanges />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          {/* BGP.tools Peering Partners */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Peering Partners</CardTitle>
                <CardDescription>Live data from bgp.tools for AS51692</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<PeeringPartnersLoading />}>
                  <PeeringPartners />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Center Locations */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Data Center Locations</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our strategically placed data centers ensure low-latency access from the UK, Europe, and North America.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                city: "Coventry",
                country: "United Kingdom",
                features: ["Tier III Certified", "100% Renewable Energy", "N+1 Redundancy"],
                link: "/datacenters/coventry",
              },
              {
                city: "London",
                country: "United Kingdom",
                features: ["Tier III+ Certified", "24/7 Security", "Multiple Power Feeds"],
                link: "/datacenters/london",
              },
              {
                city: "Kitchener",
                country: "Canada",
                features: ["Tier III Certified", "Green Energy", "Advanced Fire Suppression"],
                link: "/datacenters/kitchener",
              },
            ].map((location) => (
              <Card key={location.city} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-hyber-violet to-hyber-purple flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-white opacity-50" />
                </div>
                <CardHeader>
                  <CardTitle>{location.city}</CardTitle>
                  <CardDescription>{location.country}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {location.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={location.link}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Network Status */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Network Status</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our network is continuously monitored to ensure optimal performance.
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>Current Status</CardTitle>
                  <Badge className="bg-green-500 hover:bg-green-600">All Systems Operational</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {[
                    { name: "Core Network", uptime: "99.999%", status: "Operational" },
                    { name: "Coventry DC", uptime: "100%", status: "Operational" },
                    { name: "London DC", uptime: "99.998%", status: "Operational" },
                    { name: "Kitchener DC", uptime: "99.995%", status: "Operational" },
                    { name: "UK Backbone", uptime: "99.999%", status: "Operational" },
                    { name: "Canada Backbone", uptime: "99.997%", status: "Operational" },
                    { name: "Transatlantic Link", uptime: "99.996%", status: "Operational" },
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                        <span>{service.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{service.uptime} uptime</span>
                        <Badge variant="outline" className="text-green-500 border-green-500">
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t text-center">
                  <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
                  <Button variant="outline" className="mt-4">
                    <Link href="/status" className="flex items-center">
                      View Detailed Status
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-24 sm:mt-32 bg-gradient-to-br from-hyber-violet to-hyber-purple rounded-3xl p-8 md:p-12 text-white">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Network Contacts</h2>
            <p className="mt-6 text-lg leading-8 text-hyber-silver">
              Our network team is available 24/7 to assist with any inquiries or issues.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 flex flex-col">
              <CardHeader>
                <CardTitle className="text-white">Network Operations Center</CardTitle>
                <CardDescription className="text-hyber-silver">24/7 Technical Support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-hyber-orange mr-2" />
                  <a href="mailto:noc@hyberhost.com" className="text-white hover:text-hyber-orange">
                    noc@hyberhost.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-hyber-orange mr-2" />
                  <a href="tel:+442080501842" className="text-white hover:text-hyber-orange">
                    +44 20 8050 1842
                  </a>
                </div>
                <p className="text-sm text-hyber-silver">
                  Contact our NOC for any network-related issues, outages, or technical support.
                </p>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="bg-hyber-orange hover:bg-hyber-red text-white w-full">
                  <Link href="mailto:noc@hyberhost.com" className="flex items-center justify-center w-full">
                    Contact NOC
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 flex flex-col">
              <CardHeader>
                <CardTitle className="text-white">Peering Team</CardTitle>
                <CardDescription className="text-hyber-silver">Network Interconnection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-hyber-orange mr-2" />
                  <a href="mailto:peering@hyberhost.com" className="text-white hover:text-hyber-orange">
                    peering@hyberhost.com
                  </a>
                </div>
                <p className="text-sm text-hyber-silver">
                  Contact our peering team for interconnection requests, BGP session setup, or peering policy questions.
                </p>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="bg-hyber-orange hover:bg-hyber-red text-white w-full">
                  <Link href="mailto:peering@hyberhost.com" className="flex items-center justify-center w-full">
                    Contact Peering Team
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 bg-gradient-to-r from-hyber-orange to-hyber-red rounded-2xl">
          <div className="mx-auto px-6 py-16 sm:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to experience our global network?
              <br />
              Get started with HyberHost today.
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <Button asChild size="lg" className="bg-white text-hyber-orange hover:bg-hyber-silver">
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button asChild variant="link" className="text-white hover:text-hyber-silver">
                <Link href="/contact" className="flex items-center">
                  Contact Sales{" "}
                  <span aria-hidden="true" className="ml-1">
                    →
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
