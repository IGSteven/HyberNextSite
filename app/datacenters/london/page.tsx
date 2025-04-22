import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CheckCircle2,
  Shield,
  Server,
  Zap,
  MapPin,
  Wifi,
  LockIcon,
  Network,
  Globe,
  Database,
  HardDrive,
} from "lucide-react"
import type { Metadata } from "next"

export function generateMetadata(): Metadata {
  return {
    title: "London Data Center",
    description:
      "Our premium London data center facility at Telehouse London providing enterprise-grade hosting solutions",
  }
}

export default function LondonDatacenterPage() {
  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">London Data Center</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our premium UK facility located at Telehouse London
            </p>
          </div>

          {/* Datacenter Overview */}
          <div className="mt-20">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-hyber-orange">Telehouse London</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">World-Class Connectivity</p>
                  <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Our London datacenter is located in the prestigious Telehouse facility, one of Europe's most
                    connected data centers. With access to over 530 carriers, ISPs and ASPs, it provides unparalleled
                    connectivity options for your business.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                    <div className="relative pl-9">
                      <dt className="inline font-semibold">
                        <Shield className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                        Tier III+ Certified
                      </dt>
                      <dd className="inline ml-1">
                        Exceeding Tier III standards for redundancy, reliability and performance.
                      </dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold">
                        <LockIcon className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                        Advanced Security
                      </dt>
                      <dd className="inline ml-1">
                        Multi-layer security with biometric access control, 24/7 security personnel, and CCTV
                        monitoring.
                      </dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold">
                        <Wifi className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                        Carrier Neutral
                      </dt>
                      <dd className="inline ml-1">
                        Access to hundreds of connectivity providers for optimal routing and redundancy.
                      </dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold">
                        <MapPin className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                        Operated by Telehouse
                      </dt>
                      <dd className="inline ml-1">
                        Managed by Telehouse, a global leader in colocation and interconnection services.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/london-datacenter.png"
                  alt="London Telehouse Data Centre"
                  className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>

          {/* Facility Specifications */}
          <div className="mt-24 sm:mt-32 bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Facility Specifications</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Technical details about our London Telehouse data centre
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                    <Server className="h-6 w-6 text-hyber-orange" />
                  </div>
                  <CardTitle>Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Tier III+ certified facility</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>N+1 redundancy on all critical systems</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Advanced fire suppression systems</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Multi-layer physical security</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                    <Zap className="h-6 w-6 text-hyber-orange" />
                  </div>
                  <CardTitle>Power</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>2N power infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Multiple UPS systems</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Backup generator systems</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>99.999% power SLA</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                    <Wifi className="h-6 w-6 text-hyber-orange" />
                  </div>
                  <CardTitle>Connectivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Access to 530+ carriers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>LINX connection point</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Diverse fiber entry points</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Ultra-low latency connectivity</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Available Services */}
          <div className="mt-24 sm:mt-32 bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Available Services</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Services and features available at our London datacenter
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                    <Network className="h-6 w-6 text-hyber-orange" />
                  </div>
                  <CardTitle>BGP Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Full BGP Table</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Default Routes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Custom BGP Communities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>IPv4 and IPv6 Support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                    <Globe className="h-6 w-6 text-hyber-orange" />
                  </div>
                  <CardTitle>IX Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>LINX (London Internet Exchange)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>LONAP (London Access Point)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>AMS-IX (Amsterdam Internet Exchange)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>DE-CIX (Frankfurt)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                    <Server className="h-6 w-6 text-hyber-orange" />
                  </div>
                  <CardTitle>Dedicated Servers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Intel and AMD CPU options</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>NVMe SSD storage</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>DDR4 ECC memory</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Custom hardware configurations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                    <Database className="h-6 w-6 text-hyber-orange" />
                  </div>
                  <CardTitle>Virtual Servers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>KVM virtualization</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Instant provisioning</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Flexible resource allocation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Multiple OS options</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                    <HardDrive className="h-6 w-6 text-hyber-orange" />
                  </div>
                  <CardTitle>Resold Colocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Quarter, half, and full rack options</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Remote hands support</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>Flexible power options</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                      <span>24/7 secure access</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="mt-24 sm:mt-32">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Specifications</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Detailed specifications of our London data center facility
              </p>
            </div>

            <div className="mt-16 overflow-hidden rounded-xl border bg-card shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-1/3 font-medium">Category</TableHead>
                    <TableHead className="font-medium">Specification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Building Type</TableCell>
                    <TableCell>Purpose-built data center</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Total Space</TableCell>
                    <TableCell>15,000 sq ft</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Power Capacity</TableCell>
                    <TableCell>3.5 MW total facility</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Floor Loading</TableCell>
                    <TableCell>1,800 kg/m²</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cooling</TableCell>
                    <TableCell>N+1 CRAC units, hot/cold aisle containment</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fire Suppression</TableCell>
                    <TableCell>VESDA early warning system, gas-based suppression</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Security</TableCell>
                    <TableCell>Mantrap entry, biometric access, 24/7 security staff</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Connectivity</TableCell>
                    <TableCell>530+ carriers, diverse entry points, LINX connection</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Location */}
          <div className="mt-24 sm:mt-32">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Location</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Strategically located in London's Docklands
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image src="/docklands-panorama.png" alt="London Telehouse Location" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-start mb-6">
                  <MapPin className="h-6 w-6 text-hyber-orange mr-2 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Telehouse London</h3>
                    <p className="text-muted-foreground">London Docklands, United Kingdom</p>
                  </div>
                </div>
                <p className="mb-6">
                  Our London data centre is located in the Telehouse facility in London's Docklands, one of the most
                  connected locations in Europe. This strategic location provides excellent connectivity to global
                  networks and financial markets.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-hyber-orange mr-2" />
                    <span>Prime London location</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-hyber-orange mr-2" />
                    <span>Excellent transport links</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-hyber-orange mr-2" />
                    <span>Close to financial district</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-hyber-orange mr-2" />
                    <span>24/7 secure access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 sm:mt-32 bg-gradient-to-r from-hyber-orange to-hyber-red rounded-2xl">
            <div className="mx-auto px-6 py-16 sm:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to host in our London facility?
                <br />
                Get started today.
              </h2>
              <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                <Button asChild size="lg" className="bg-white text-hyber-orange hover:bg-hyber-silver">
                  <Link href="/services/dedicated">Explore Dedicated Servers</Link>
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
    </>
  )
}
