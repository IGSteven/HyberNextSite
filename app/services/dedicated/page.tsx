import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Server, Shield, Zap, Globe, Cpu } from "lucide-react"

export const metadata = {
  title: "Dedicated Servers - HyberHost",
  description: "Enterprise-grade dedicated servers with full hardware control and customization options",
}

export default function DedicatedServersPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Dedicated Servers</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Enterprise-grade dedicated servers with full hardware control and customization options
          </p>
        </div>

        {/* Feature Overview */}
        <div className="mt-20">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-hyber-orange">Enterprise-Grade Hardware</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Maximum Performance & Control</p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Our dedicated servers provide the ultimate in performance, security, and control. With exclusive
                  access to physical hardware, you get maximum power for your applications.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Server className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      Exclusive Resources
                    </dt>
                    <dd className="inline ml-1">
                      Dedicated CPU, RAM, and storage resources exclusively for your applications.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Shield className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      Enhanced Security
                    </dt>
                    <dd className="inline ml-1">
                      Isolated environment with dedicated IP addresses and customizable security configurations.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Zap className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      Full Control
                    </dt>
                    <dd className="inline ml-1">
                      Complete root access and choice of operating system for maximum flexibility.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/data-center-hardware.png"
                alt="Dedicated Servers"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>

        {/* Server Plans */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Dedicated Server Plans</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose the perfect dedicated server configuration for your business needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Entry Server */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Entry Server</CardTitle>
                <CardDescription>Perfect for small to medium websites and applications</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$99.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Intel Xeon E-2236 (6 Cores, 12 Threads)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>32GB DDR4 RAM</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>480GB NVMe SSD</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unmetered Bandwidth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>5 IPv4 Addresses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>DDoS Protection</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/order?product=entry-server&type=dedicated">Order Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Server */}
            <Card className="flex flex-col border-hyber-orange relative">
              <div className="absolute top-0 left-0 right-0 bg-hyber-orange text-white text-center py-1 text-sm font-medium rounded-t-lg">
                Most Popular
              </div>
              <CardHeader className="pt-8">
                <CardTitle>Pro Server</CardTitle>
                <CardDescription>For resource-intensive applications and databases</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$149.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>AMD EPYC 7302P (16 Cores, 32 Threads)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>64GB DDR4 ECC RAM</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>2 x 960GB NVMe SSD (RAID 1)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unmetered Bandwidth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>10 IPv4 Addresses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Advanced DDoS Protection</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/order?product=pro-server&type=dedicated">Order Now</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Server */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Enterprise Server</CardTitle>
                <CardDescription>For high-traffic websites and mission-critical applications</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$249.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>AMD EPYC 7402P (24 Cores, 48 Threads)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>128GB DDR4 ECC RAM</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>2 x 1.92TB NVMe SSD (RAID 1)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unmetered Bandwidth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>20 IPv4 Addresses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Premium DDoS Protection</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/order?product=enterprise-server&type=dedicated">Order Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mt-24 sm:mt-32 bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Advanced Features</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              All our dedicated servers come with these premium features
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Shield className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Advanced DDoS protection</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Hardware firewall options</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Secure private network</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Regular security updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Cpu className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Premium Hardware</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Latest generation processors</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Enterprise-grade SSDs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>ECC memory for reliability</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>RAID configuration options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Globe className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Global Network</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Multiple data center locations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Tier 1 network providers</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Low-latency connections</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Unmetered bandwidth</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Center Options */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Choose Your Data Center</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Deploy your dedicated server in any of our state-of-the-art facilities
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                name: "Coventry, UK",
                description: "Our flagship UK data center with excellent connectivity to Europe",
                features: ["100% Renewable Energy", "Tier III Certified", "Low Latency to Europe"],
                link: "/datacenters/coventry",
              },
              {
                name: "London, UK",
                description: "Premium facility in London's Docklands with global connectivity",
                features: ["Financial District Proximity", "Multiple Transit Providers", "LINX Connection Point"],
                link: "/datacenters/london",
              },
              {
                name: "Kitchener, Canada",
                description: "North American facility with excellent US and Canadian connectivity",
                features: ["Green Energy Powered", "Low Latency to US East", "Canadian Data Sovereignty"],
                link: "/datacenters/kitchener",
              },
            ].map((datacenter) => (
              <Card key={datacenter.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{datacenter.name}</CardTitle>
                  <CardDescription>{datacenter.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {datacenter.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={datacenter.link}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Common questions about our dedicated server offerings
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              {
                question: "What is the difference between a dedicated server and a VPS?",
                answer:
                  "A dedicated server provides exclusive access to an entire physical machine, offering maximum performance, security, and control. A VPS (Virtual Private Server) is a virtualized server that shares physical hardware with other VPS instances, offering a balance of performance and cost-effectiveness.",
              },
              {
                question: "Can I customize my server configuration?",
                answer:
                  "Yes, we offer custom server configurations to meet your specific requirements. Contact our sales team to discuss your needs and we'll provide a tailored solution with the exact specifications you need.",
              },
              {
                question: "How quickly can my dedicated server be provisioned?",
                answer:
                  "Standard configurations are typically provisioned within 24-48 hours after order confirmation and payment. Custom configurations may take 3-5 business days depending on hardware availability.",
              },
              {
                question: "Do you offer managed dedicated servers?",
                answer:
                  "Yes, we offer both unmanaged and managed dedicated server options. Our managed services include regular updates, security monitoring, performance optimization, and 24/7 technical support.",
              },
              {
                question: "What operating systems do you support?",
                answer:
                  "We support a wide range of operating systems including various Linux distributions (Ubuntu, CentOS, Debian, AlmaLinux) and Windows Server. Custom OS installations are also available upon request.",
              },
              {
                question: "What is your server uptime guarantee?",
                answer:
                  "We guarantee 99.9% network uptime for all our dedicated servers. Our Service Level Agreement (SLA) provides details on compensation for any downtime exceeding this guarantee.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 bg-gradient-to-r from-hyber-orange to-hyber-red rounded-2xl">
          <div className="mx-auto px-6 py-16 sm:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to experience the power of dedicated hardware?
              <br />
              Get started with HyberHost today.
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <Button asChild size="lg" className="bg-white text-hyber-orange hover:bg-hyber-silver">
                <Link href="/order?type=dedicated">Order Now</Link>
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
