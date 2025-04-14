import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Server,
  Cloud,
  Shield,
  Zap,
  Clock,
  Headphones,
  CheckCircle2,
  BarChart3,
  Award,
  Users,
  MapPin,
  ArrowRight,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Enhanced with animated gradient and stats */}
      <section className="relative bg-gradient-to-r from-hyber-orange to-hyber-red py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-hyber-orange/30 via-hyber-red/20 to-hyber-violet/30 animate-gradient-slow"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
              99.9% Uptime Guarantee
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
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
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
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

      {/* Datacenter Map Section - NEW */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Global Infrastructure</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our strategically located data centers ensure low-latency access from anywhere in the world
            </p>
          </div>

          <div className="mt-16 relative">
            <div className="aspect-[16/9] w-full bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-4 md:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-center opacity-10"></div>
              <div className="relative">
                <Image
                  src="/interconnected-nodes.png"
                  alt="HyberHost Global Network Map"
                  width={1200}
                  height={600}
                  className="rounded-2xl shadow-lg mx-auto"
                />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center">
                    <div className="h-10 w-10 rounded-full bg-hyber-orange/10 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-hyber-orange" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Coventry, UK</h3>
                      <p className="text-sm text-muted-foreground">Our main UK facility</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center">
                    <div className="h-10 w-10 rounded-full bg-hyber-orange/10 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-hyber-orange" />
                    </div>
                    <div>
                      <h3 className="font-semibold">London, UK</h3>
                      <p className="text-sm text-muted-foreground">Financial district presence</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center">
                    <div className="h-10 w-10 rounded-full bg-hyber-orange/10 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-hyber-orange" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Kitchener, Canada</h3>
                      <p className="text-sm text-muted-foreground">North American facility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link href="/network">
                  Learn more about our network
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview - Enhanced with comparison */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Hosting Solutions</h2>
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
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">A hosting partner you can trust</p>
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
                src="/placeholder.svg?height=600&width=800"
                alt="Data center"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Enhanced with logos and better design */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Don't just take our word for it. Here's what our customers have to say about our services.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {/* Review 1 */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-lg font-semibold">Exceptional Service and Support</p>
                <p className="mt-2 text-muted-foreground">
                  "I've been with HyberHost for over 2 years now, and their service has been nothing short of
                  exceptional. Their VPS servers are lightning fast, and their support team is always quick to respond
                  and resolve any issues."
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 mt-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-hyber-orange/10 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-hyber-orange" />
                  </div>
                  <div>
                    <p className="font-semibold">James Wilson</p>
                    <p className="text-sm text-muted-foreground">CEO, TechSolutions</p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Review 2 */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-lg font-semibold">Reliable and Cost-Effective</p>
                <p className="mt-2 text-muted-foreground">
                  "After trying several hosting providers, I finally found HyberHost. Their dedicated servers are not
                  only reliable but also very cost-effective. The uptime is impressive, and I've never experienced any
                  significant downtime."
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 mt-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-hyber-orange/10 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-hyber-orange" />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Web Developer</p>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Review 3 */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-lg font-semibold">Outstanding Technical Support</p>
                <p className="mt-2 text-muted-foreground">
                  "What sets HyberHost apart is their technical support. I had a complex server configuration issue, and
                  their team not only resolved it quickly but also took the time to explain the solution. Their
                  knowledge and patience are truly impressive."
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 mt-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-hyber-orange/10 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-hyber-orange" />
                  </div>
                  <div>
                    <p className="font-semibold">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">System Administrator</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Trusted by logos */}
          <div className="mt-16">
            <p className="text-center text-muted-foreground mb-8">Trusted by companies worldwide</p>
            <div className="mx-auto grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10 lg:mx-0 lg:max-w-none">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-center">
                  <Image
                    src={`/placeholder-company.png?key=wvs0k&height=40&width=120&text=Company+${i}`}
                    alt={`Company ${i} logo`}
                    width={120}
                    height={40}
                    className="h-8 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Find answers to common questions about our hosting services
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {[
              {
                question: "What is the difference between VPS and dedicated hosting?",
                answer:
                  "VPS hosting provides a virtualized server environment where resources are shared among multiple users, while dedicated hosting gives you an entire physical server exclusively for your use. Dedicated servers offer more power and customization but at a higher cost.",
              },
              {
                question: "Do you offer a money-back guarantee?",
                answer:
                  "Yes, we offer a 30-day money-back guarantee on all our hosting plans. If you're not satisfied with our service, you can request a full refund within the first 30 days.",
              },
              {
                question: "Can I upgrade my plan later?",
                answer:
                  "Yes, you can easily upgrade your hosting plan as your needs grow. Our platform allows for seamless upgrades with minimal downtime.",
              },
              {
                question: "What kind of support do you provide?",
                answer:
                  "We offer 24/7 technical support via live chat, email, and phone. Our team of experts is always available to help you with any issues you might encounter.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/support#faq">
                View all FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Preview Section - NEW */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest from Our Blog</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Stay updated with the latest news, tutorials, and insights from our team
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {/* Static blog previews - these will be replaced by dynamic content when you implement the blog functionality */}
            <Card className="flex flex-col h-full">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=World+Backup+Day+2025"
                  alt="World Backup Day 2025"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-hyber-orange/10 text-hyber-orange border-hyber-orange/20">Product Updates</Badge>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href="/blog/world-backup-day-2025" className="hover:text-hyber-orange transition-colors">
                    World Backup Day 2025
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  March 31, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">
                  Celebrating World Backup Day with our new offsite NAS deployment for enhanced VPS backup services.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/blog/world-backup-day-2025"
                  className="text-hyber-orange hover:text-hyber-red transition-colors"
                >
                  Read more →
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <div className="relative h-48">
                <Image
                  src="/placeholder-blog.png?key=trri7&height=400&width=600&text=Blog+2"
                  alt="Optimizing MySQL Performance on Dedicated Servers"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-hyber-orange/10 text-hyber-orange border-hyber-orange/20">Performance</Badge>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href="/blog" className="hover:text-hyber-orange transition-colors">
                    Optimizing MySQL Performance on Dedicated Servers
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  April 5, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">
                  Discover advanced techniques to boost your MySQL database performance on dedicated hardware.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/blog" className="text-hyber-orange hover:text-hyber-red transition-colors">
                  Read more →
                </Link>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <div className="relative h-48">
                <Image
                  src="/placeholder-blog.png?key=trri7&height=400&width=600&text=Blog+3"
                  alt="The Benefits of Green Hosting Solutions"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-hyber-orange/10 text-hyber-orange border-hyber-orange/20">Sustainability</Badge>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href="/blog" className="hover:text-hyber-orange transition-colors">
                    The Benefits of Green Hosting Solutions
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  March 28, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">
                  How environmentally friendly hosting can benefit both your business and the planet.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/blog" className="text-hyber-orange hover:text-hyber-red transition-colors">
                  Read more →
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
              <Link href="/blog">Visit Our Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with specific offer */}
      <section className="bg-hyber-orange">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to get started?</h2>
            <p className="mt-4 text-lg text-white/80">
              Sign up today and get 30% off your first month with code{" "}
              <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">WELCOME30</span>
            </p>
          </div>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Button asChild size="lg" className="bg-white text-hyber-orange hover:bg-hyber-silver/20">
              <Link href="/register">Get Started</Link>
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
