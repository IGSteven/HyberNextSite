import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Shield, Server, Lock, Settings } from "lucide-react"

export const metadata = {
  title: "Licenses",
  description: "Premium software licenses for your hosting environment",
}

export default function LicensesPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Software Licenses</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Premium software licenses to enhance your hosting environment with advanced management, security, and
            performance features.
          </p>
        </div>

        {/* License Categories */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <Server className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>Control Panels</CardTitle>
              <CardDescription>Server management made easy</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>cPanel/WHM</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>Plesk</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>DirectAdmin</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>VirtFusion</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                <Link href="/licenses/control-panels">View Licenses</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <Shield className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Protect your servers and websites</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>Imunify360</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>LiteSpeed Web Server</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>SiteLock</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>SSL Certificates</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                <Link href="/licenses/security">View Licenses</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <Lock className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>Operating Systems</CardTitle>
              <CardDescription>Specialized OS environments</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>CloudLinux</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>Windows Server</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>Red Hat Enterprise Linux</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>AlmaLinux</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                <Link href="/licenses/operating-systems">View Licenses</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <Settings className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>Utilities</CardTitle>
              <CardDescription>Additional tools and services</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>Softaculous</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>JetBackup</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>WHMCS</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                  <span>Virtualizor</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                <Link href="/licenses/utilities">View Licenses</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Featured Licenses */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Featured Licenses</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our most popular software licenses for web hosting environments
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* cPanel License */}
            <Card className="flex flex-col">
              <div className="p-6 bg-gradient-to-br from-hyber-violet/10 to-hyber-purple/10 rounded-t-lg flex justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=200"
                  alt="cPanel Logo"
                  width={200}
                  height={100}
                  className="h-16 object-contain"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>cPanel/WHM</CardTitle>
                  <Badge>Most Popular</Badge>
                </div>
                <CardDescription>Industry-standard web hosting control panel</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <span className="text-2xl font-bold">$15.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Easy website and server management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Email, FTP, and database management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>One-click application installer</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Automatic updates and security</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/licenses/cpanel">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* CloudLinux License */}
            <Card className="flex flex-col">
              <div className="p-6 bg-gradient-to-br from-hyber-violet/10 to-hyber-purple/10 rounded-t-lg flex justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=200"
                  alt="CloudLinux Logo"
                  width={200}
                  height={100}
                  className="h-16 object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>CloudLinux</CardTitle>
                <CardDescription>Secure and stable shared hosting environment</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <span className="text-2xl font-bold">$12.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Resource isolation between users</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Improved server stability</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Hardened security features</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Compatible with cPanel/WHM</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/licenses/cloudlinux">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Imunify360 License */}
            <Card className="flex flex-col">
              <div className="p-6 bg-gradient-to-br from-hyber-violet/10 to-hyber-purple/10 rounded-t-lg flex justify-center">
                <Image
                  src="/placeholder.svg?height=100&width=200"
                  alt="Imunify360 Logo"
                  width={200}
                  height={100}
                  className="h-16 object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>Imunify360</CardTitle>
                <CardDescription>Comprehensive security solution for web servers</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <span className="text-2xl font-bold">$9.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Advanced firewall protection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Malware detection and removal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Proactive defense system</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Patch management</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/licenses/imunify360">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* License Benefits */}
        <div className="mt-24 sm:mt-32 bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Why Choose Our Licenses</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Benefits of purchasing software licenses through HyberHost
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Competitive Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer competitive pricing on all our software licenses, often below the manufacturer's suggested
                  retail price.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Instant Activation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All licenses are activated instantly after purchase, allowing you to start using the software right
                  away.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>24/7 Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team is available 24/7 to help you with any issues related to your software licenses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Flexible Billing Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose between monthly, annual, or multi-year billing options to suit your budget and needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Automatic Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All licenses include automatic updates to ensure you always have the latest features and security
                  patches.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>License Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Easily manage all your licenses through our client portal, including renewals, upgrades, and
                  transfers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 bg-gradient-to-r from-hyber-orange to-hyber-red rounded-2xl">
          <div className="mx-auto px-6 py-16 sm:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-maven">
              Need help choosing the right license?
              <br />
              Our experts are here to help.
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <Button asChild size="lg" className="bg-white text-hyber-orange hover:bg-hyber-silver">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="link" className="text-white hover:text-hyber-silver">
                <Link href="/licenses" className="flex items-center">
                  View All Licenses{" "}
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
