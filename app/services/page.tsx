import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Globe, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Services - HyberHost",
  description: "Explore our range of hosting services including VPS, dedicated servers, and cloud hosting",
}

export default function ServicesPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Our Hosting Services</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover our range of high-performance hosting solutions designed to meet your business needs.
          </p>
        </div>

        {/* VPS Hosting */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-base font-semibold leading-7 text-hyber-orange">VPS Hosting</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Virtual Private Servers</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our VPS hosting solutions provide dedicated resources in a virtualized environment, offering the perfect
                balance of performance, flexibility, and cost-effectiveness.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Dedicated CPU and RAM resources",
                  "High-performance SSD storage",
                  "Full root access and OS choice",
                  "Instant scaling capabilities",
                  "Guaranteed resources with no overselling",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex items-center gap-x-6">
                <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/services/vps">Explore VPS Plans</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="VPS Hosting"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>

        {/* Dedicated Servers */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Dedicated Servers"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-base font-semibold leading-7 text-hyber-orange">Dedicated Servers</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Enterprise-Grade Hardware</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our dedicated servers provide the ultimate in performance, security, and control. With exclusive access
                to physical hardware, you get maximum power for your applications.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Exclusive physical server resources",
                  "High-performance Intel/AMD processors",
                  "Enterprise-grade SSD/NVMe storage",
                  "Complete hardware and software control",
                  "Custom hardware configurations available",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex items-center gap-x-6">
                <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/services/dedicated">Explore Dedicated Servers</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Cloud Hosting */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-base font-semibold leading-7 text-hyber-orange">Cloud Hosting</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Scalable Cloud Infrastructure</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our cloud hosting platform offers unparalleled scalability and reliability. With distributed resources
                across multiple servers, your applications stay online even during hardware failures.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Auto-scaling resources based on demand",
                  "High availability with redundant infrastructure",
                  "Pay-as-you-go pricing model",
                  "Global CDN integration",
                  "Load balancing and failover protection",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex items-center gap-x-6">
                <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/services/cloud">Explore Cloud Hosting</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Cloud Hosting"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Additional Services</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Complement your hosting with our range of additional services
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            {/* Domain Registration */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="bg-hyber-orange px-6 py-8 text-center">
                <Globe className="mx-auto h-12 w-12 text-white" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-bold text-white">Domain Registration</h3>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-card p-6">
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    Register and manage domain names with our easy-to-use domain management system.
                  </p>
                  <ul className="mt-6 space-y-4">
                    {[
                      "Competitive pricing",
                      "Free WHOIS privacy",
                      "Easy domain management",
                      "Auto-renewal options",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/services/domains">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* SSL Certificates */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="bg-hyber-orange px-6 py-8 text-center">
                <Shield className="mx-auto h-12 w-12 text-white" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-bold text-white">SSL Certificates</h3>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-card p-6">
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    Secure your website with SSL certificates to protect sensitive data and build customer trust.
                  </p>
                  <ul className="mt-6 space-y-4">
                    {[
                      "Domain Validation (DV)",
                      "Organization Validation (OV)",
                      "Extended Validation (EV)",
                      "Wildcard SSL certificates",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/services/ssl">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Managed Services */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="bg-hyber-orange px-6 py-8 text-center">
                <Zap className="mx-auto h-12 w-12 text-white" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-bold text-white">Managed Services</h3>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-card p-6">
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    Let our experts handle the technical aspects of your hosting, so you can focus on your business.
                  </p>
                  <ul className="mt-6 space-y-4">
                    {[
                      "Server monitoring & maintenance",
                      "Security hardening",
                      "Performance optimization",
                      "Regular backups & updates",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/services/managed">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 bg-gradient-to-r from-hyber-orange to-hyber-red rounded-2xl">
          <div className="mx-auto px-6 py-16 sm:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
              <br />
              Talk to our hosting experts today.
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <Button asChild size="lg" className="bg-white text-hyber-orange hover:bg-hyber-silver">
                <Link href="/contact">Contact Sales</Link>
              </Button>
              <Button asChild variant="link" className="text-white hover:text-hyber-silver">
                <Link href="/support" className="flex items-center">
                  Technical Support{" "}
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
