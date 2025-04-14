import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Server, Cloud, Shield, Zap, Clock, Headphones, CheckCircle2, BarChart3, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Enhanced with animated gradient and stats */}
      <section className="relative bg-gradient-to-r from-hyber-orange to-hyber-red py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-hyber-orange/30 via-hyber-red/20 to-hyber-violet/30"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
              99.9% Uptime Guarantee
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-maven">
              High-Performance Hosting for Your Business
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              Reliable VPS and dedicated servers with enterprise-grade infrastructure. Scale your business with our
              global network and 24/7 expert support.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="bg-white text-hyber-orange hover:bg-hyber-silver/20">
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button asChild variant="link" className="text-white hover:text-hyber-silver">
                <Link href="/pricing" className="flex items-center">
                  View Pricing{" "}
                  <span aria-hidden="true" className="ml-1">
                    →
                  </span>
                </Link>
              </Button>
            </div>

            {/* Stats bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">3+</div>
                <div className="text-sm">Data Centers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm">Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Expanded with more features */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-hyber-orange">Enterprise-Grade Hosting</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-maven">
              Everything you need to scale your business
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our hosting solutions are designed to provide maximum performance, reliability, and security for
              businesses of all sizes.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Server className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  High-Performance VPS
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Blazing-fast SSD storage and dedicated resources ensure your applications run at peak performance.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Shield className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Enterprise Security
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Advanced DDoS protection, firewall, and regular security updates to keep your data safe.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Zap className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Instant Scaling
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Easily scale your resources up or down as your business needs change, with no downtime.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Services Preview - Enhanced with comparison */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Our Hosting Solutions</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose the perfect hosting solution for your business needs
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            {/* VPS Hosting */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="bg-gradient-to-r from-hyber-orange to-hyber-red px-6 py-8 text-center">
                <Cloud className="mx-auto h-12 w-12 text-white" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-bold text-white">VPS Hosting</h3>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-card p-6">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-hyber-orange">Starting at $19.99/mo</p>
                  <ul className="mt-6 space-y-4">
                    {["2 vCPU Cores", "4GB RAM", "50GB SSD Storage", "Unmetered Bandwidth", "Full Root Access"].map(
                      (feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange" aria-hidden="true" />
                          <span className="ml-3 text-sm">{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                  <div className="mt-6">
                    <Badge className="bg-hyber-orange/10 text-hyber-orange border-hyber-orange/20">
                      Best for small to medium websites
                    </Badge>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/services/vps">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Dedicated Servers */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg relative">
              <div className="absolute top-0 left-0 right-0 bg-hyber-orange text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
              <div className="bg-gradient-to-r from-hyber-orange to-hyber-red px-6 py-8 text-center pt-10">
                <Server className="mx-auto h-12 w-12 text-white" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-bold text-white">Dedicated Servers</h3>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-card p-6">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-hyber-orange">Starting at $99.99/mo</p>
                  <ul className="mt-6 space-y-4">
                    {[
                      "8 CPU Cores",
                      "32GB RAM",
                      "2 x 500GB SSD Storage",
                      "Unmetered Bandwidth",
                      "Full Hardware Control",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange" aria-hidden="true" />
                        <span className="ml-3 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Badge className="bg-hyber-orange/10 text-hyber-orange border-hyber-orange/20">
                      Best for high-traffic applications
                    </Badge>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/services/dedicated">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Cloud Hosting */}
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="bg-gradient-to-r from-hyber-orange to-hyber-red px-6 py-8 text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-white" aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-bold text-white">Cloud Hosting</h3>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-card p-6">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-hyber-orange">Starting at $29.99/mo</p>
                  <ul className="mt-6 space-y-4">
                    {["4 vCPU Cores", "8GB RAM", "100GB SSD Storage", "Unmetered Bandwidth", "Auto-scaling"].map(
                      (feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange" aria-hidden="true" />
                          <span className="ml-3 text-sm">{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                  <div className="mt-6">
                    <Badge className="bg-hyber-orange/10 text-hyber-orange border-hyber-orange/20">
                      Best for scalable applications
                    </Badge>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/services/cloud">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced with stats and awards */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-hyber-orange">Why Choose Us</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-maven">
                  A hosting partner you can trust
                </p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  With over a decade of experience in the hosting industry, we've built a reputation for reliability,
                  performance, and exceptional customer support.
                </p>

                {/* Awards and recognition */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center bg-hyber-orange/10 rounded-full px-4 py-1">
                    <Award className="h-4 w-4 text-hyber-orange mr-2" />
                    <span className="text-sm font-medium">Best VPS Provider 2024</span>
                  </div>
                  <div className="flex items-center bg-hyber-orange/10 rounded-full px-4 py-1">
                    <Award className="h-4 w-4 text-hyber-orange mr-2" />
                    <span className="text-sm font-medium">Top UK Hosting</span>
                  </div>
                  <div className="flex items-center bg-hyber-orange/10 rounded-full px-4 py-1">
                    <Shield className="h-4 w-4 text-hyber-orange mr-2" />
                    <span className="text-sm font-medium">ISO 27001 Certified</span>
                  </div>
                </div>

                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Clock className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      99.9% Uptime Guarantee
                    </dt>
                    <dd className="inline ml-1">
                      We're committed to keeping your services online with our industry-leading uptime guarantee.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Headphones className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      24/7 Expert Support
                    </dt>
                    <dd className="inline ml-1">
                      Our team of hosting experts is available around the clock to help you with any issues.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Shield className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      Enterprise-Grade Security
                    </dt>
                    <dd className="inline ml-1">
                      Advanced security measures to protect your data and applications from threats.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/sleek-server-farm.png"
                alt="Data center"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Matching the design from /network page */}
      <section className="bg-gradient-to-r from-hyber-orange to-hyber-red rounded-2xl mx-6 lg:mx-8 mb-24">
        <div className="mx-auto px-6 py-16 sm:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-maven">
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
      </section>
    </div>
  )
}
