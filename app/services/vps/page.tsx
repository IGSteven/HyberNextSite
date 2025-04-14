import { Suspense } from "react"
import { Cpu, MemoryStickIcon as Memory, HardDrive, Globe, Shield, Zap, Upload, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import VpsPlans from "./vps-plans"
import VpsPlansLoading from "./vps-plans-loading"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "VPS Hosting - HyberHost",
  description: "High-performance VPS hosting solutions with dedicated resources and full root access",
}

export default async function VpsPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Virtual Private Servers</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            High-performance VPS hosting with dedicated resources, full root access, and instant scaling capabilities.
            Perfect for businesses of all sizes.
          </p>
        </div>

        {/* Feature Overview */}
        <div className="mt-20">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-hyber-orange">Enterprise-Grade VPS</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-maven">
                  Powerful virtual servers for your applications
                </p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Our VPS hosting solutions provide dedicated resources in a virtualized environment, offering the
                  perfect balance of performance, flexibility, and cost-effectiveness.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Cpu className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      Dedicated CPU Resources
                    </dt>
                    <dd className="inline ml-1">
                      Guaranteed CPU cores exclusively for your applications, ensuring consistent performance.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Memory className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      High-Performance Memory
                    </dt>
                    <dd className="inline ml-1">
                      Dedicated RAM allocation for smooth operation of memory-intensive applications.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <HardDrive className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      SSD Storage
                    </dt>
                    <dd className="inline ml-1">
                      Ultra-fast SSD storage for quick data access and improved application performance.
                    </dd>
                  </div>
                </dl>
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

        {/* VPS Plans */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Choose Your VPS Plan</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Select the perfect VPS plan for your needs. All plans include 24/7 support, 99.9% uptime guarantee, and
              full root access.
            </p>
          </div>

          <div className="mt-16">
            <Suspense fallback={<VpsPlansLoading />}>
              <VpsPlans />
            </Suspense>
          </div>
        </div>

        {/* VirtFusion Control Panel */}
        <div className="mt-24 sm:mt-32 bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-8 md:p-12">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-base font-semibold leading-7 text-hyber-orange">Self-Service Management</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-maven">VirtFusion Control Panel</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Manage your VPS with our intuitive VirtFusion control panel. Easily deploy, scale, and monitor your
                virtual servers with just a few clicks.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <Badge className="mr-2 bg-hyber-orange text-white">New</Badge>
                  <span>Instant server deployment and provisioning</span>
                </li>
                <li className="flex items-start">
                  <Badge className="mr-2 bg-hyber-orange text-white">New</Badge>
                  <span>Real-time resource monitoring and statistics</span>
                </li>
                <li className="flex items-start">
                  <Badge className="mr-2 bg-hyber-orange text-white">New</Badge>
                  <span>One-click OS reinstallation and recovery</span>
                </li>
                <li className="flex items-start">
                  <Badge className="mr-2 bg-hyber-orange text-white">New</Badge>
                  <span>Bring Your Own ISO support for custom installations</span>
                </li>
                <li className="flex items-start">
                  <Badge className="mr-2 bg-hyber-orange text-white">New</Badge>
                  <span>Integrated console access and SSH key management</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="VirtFusion Control Panel"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Advanced VPS Features</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our VPS hosting includes a range of advanced features to enhance performance, security, and flexibility.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Globe className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Global Network
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Our global network of data centers ensures low-latency access to your applications from anywhere in
                    the world.
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
                    DDoS protection, firewall, and regular security updates to keep your VPS secure from threats.
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
                    Easily upgrade your VPS resources as your needs grow, with minimal downtime and no service
                    interruption.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Upload className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Bring Your Own ISO
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Upload and install custom operating systems using your own ISO images for complete flexibility.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Custom OS Section */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1 relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Custom OS Installation"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-base font-semibold leading-7 text-hyber-orange">Complete Flexibility</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-maven">Bring Your Own ISO</p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Install any operating system you need with our Bring Your Own ISO feature. Upload custom ISO images and
                create your perfect environment.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <Settings className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                  <span>Upload custom ISO images up to 4GB</span>
                </li>
                <li className="flex items-start">
                  <Settings className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                  <span>Install specialized operating systems</span>
                </li>
                <li className="flex items-start">
                  <Settings className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                  <span>Create custom development environments</span>
                </li>
                <li className="flex items-start">
                  <Settings className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                  <span>Perfect for testing and specialized workloads</span>
                </li>
              </ul>
              <div className="mt-10">
                <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/order?product=vps-custom">Get Started with Custom OS</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* OS Options */}
        <div className="mt-24 sm:mt-32 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Operating System Options</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Choose from a wide range of operating systems for your VPS
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
              {[
                { name: "Ubuntu", logo: "/placeholder.svg?height=100&width=100" },
                { name: "AlmaLinux", logo: "/placeholder.svg?height=100&width=100" },
                { name: "Debian", logo: "/placeholder.svg?height=100&width=100" },
                { name: "Fedora", logo: "/placeholder.svg?height=100&width=100" },
                { name: "Windows Server", logo: "/placeholder.svg?height=100&width=100" },
                { name: "Custom OS", logo: "/placeholder.svg?height=100&width=100" },
              ].map((os) => (
                <div key={os.name} className="flex flex-col items-center">
                  <Image
                    className="max-h-12 w-auto object-contain"
                    src={os.logo || "/placeholder.svg"}
                    alt={os.name}
                    width={100}
                    height={100}
                  />
                  <p className="mt-3 text-sm text-center">{os.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Frequently Asked Questions</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Common questions about our VPS hosting services
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20">
            {[
              {
                question: "What is a VPS?",
                answer:
                  "A Virtual Private Server (VPS) is a virtualized server that mimics a dedicated server within a shared hosting environment. It provides dedicated resources (CPU, RAM, storage) and offers full root access, allowing you to install any software and configure the server to your needs.",
              },
              {
                question: "How does VPS differ from shared hosting?",
                answer:
                  "Unlike shared hosting where resources are shared among many users, a VPS provides dedicated resources exclusively for your use. This results in better performance, security, and control compared to shared hosting.",
              },
              {
                question: "Can I upgrade my VPS plan later?",
                answer:
                  "Yes, you can easily upgrade your VPS plan as your needs grow. Our platform allows for seamless upgrades with minimal downtime, so you can scale your resources up as your business expands.",
              },
              {
                question: "What is the VirtFusion control panel?",
                answer:
                  "VirtFusion is our self-service control panel that allows you to manage all aspects of your VPS. You can deploy new servers, monitor resources, reinstall operating systems, upload custom ISOs, and much more through an intuitive web interface.",
              },
              {
                question: "What operating systems do you support?",
                answer:
                  "We support a wide range of operating systems including various Linux distributions (Ubuntu, CentOS, Debian, Fedora) and Windows Server. You can also upload and install custom operating systems using our Bring Your Own ISO feature.",
              },
              {
                question: "How secure is VPS hosting?",
                answer:
                  "Our VPS hosting includes advanced security features such as DDoS protection, firewall, and regular security updates. Additionally, the virtualized environment provides isolation from other users, enhancing security compared to shared hosting.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg border p-6">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 bg-gradient-to-r from-hyber-orange to-hyber-red rounded-2xl">
          <div className="mx-auto px-6 py-16 sm:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-maven">
              Ready to get started with VPS hosting?
              <br />
              Sign up today and get 30% off your first month.
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <Button asChild size="lg" className="bg-white text-hyber-orange hover:bg-hyber-silver">
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
        </div>
      </div>
    </div>
  )
}
