import { Suspense } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import VpsPlansLoading from "./vps-plans-loading"
import ClientVpsPlans from "./client-vps-plans"

export const metadata = {
  title: "VPS Hosting",
  description: "High-performance VPS hosting solutions for your business",
}

export default function VpsPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Virtual Private Servers</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            High-performance VPS hosting with dedicated resources, full root access, and instant scalability.
            Choose from our range of optimized plans powered by the latest AMD and Intel processors.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <Suspense fallback={<VpsPlansLoading />}>
            <ClientVpsPlans />
          </Suspense>
        </div>

        <div className="mt-20 space-y-16">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our VPS Hosting?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">High Performance</h3>
                <p>
                  Our VPS solutions are powered by the latest NVMe SSD storage and high-performance AMD EPYC processors,
                  ensuring lightning-fast response times for your applications.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Full Root Access</h3>
                <p>
                  Get complete control over your server environment with full root access. Install any software, configure
                  custom settings, and optimize your server exactly how you need it.
                </p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">Instant Scalability</h3>
                <p>
                  Easily upgrade your resources as your needs grow. Our infrastructure allows for seamless vertical
                  scaling without any downtime or migration headaches.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">Technical Specifications</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-4 text-left">Feature</th>
                    <th className="p-4 text-left">Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4 font-medium">Processors</td>
                    <td className="p-4">AMD EPYC 7003 Series / Intel Xeon CPUs</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Storage</td>
                    <td className="p-4">NVMe SSD Storage</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Network</td>
                    <td className="p-4">10 Gbps Network Connection</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Operating Systems</td>
                    <td className="p-4">Ubuntu, Debian, CentOS, AlmaLinux, Windows Server</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Control Panel</td>
                    <td className="p-4">Custom Control Panel, Optional cPanel/WHM</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Backups</td>
                    <td className="p-4">Daily Backups (Business plans and higher)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight">Custom VPS Solutions</h3>
              <p className="mt-6 text-base leading-7 text-muted-foreground">
                Need a custom VPS configuration? Our enterprise solutions offer tailored server setups to meet your specific
                requirements. Contact our sales team for a personalized quote.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-hyber-orange">What's included</h4>
                <div className="h-px flex-auto bg-gray-100 dark:bg-gray-700"></div>
              </div>
              <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6">
                {[
                  "Custom CPU configurations",
                  "Dedicated account manager",
                  "Priority support",
                  "Advanced security options",
                  "Custom resource allocation",
                  "Private networking",
                  "Managed services",
                  "99.9% uptime guarantee",
                ].map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckCircle2 className="h-6 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 py-10 text-center ring-1 ring-inset ring-gray-900/5 dark:ring-gray-700 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600 dark:text-gray-300">Custom Enterprise VPS</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight">Contact</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-400">
                      for pricing
                    </span>
                  </p>
                  <Button asChild className="mt-10 w-full bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                  <p className="mt-6 text-xs leading-5 text-gray-600 dark:text-gray-400">
                    Customized solutions with flexible billing options
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  question: "What is a Virtual Private Server (VPS)?",
                  answer:
                    "A VPS is a virtualized server that mimics a dedicated server within a shared hosting environment. It provides dedicated resources (CPU, RAM, storage) and isolated server space, giving you full control and root access.",
                },
                {
                  question: "How does VPS hosting differ from shared hosting?",
                  answer:
                    "VPS hosting provides dedicated resources and isolated server space, while shared hosting puts multiple websites on a single server with shared resources. VPS offers better performance, security, and customization options.",
                },
                {
                  question: "Can I upgrade my VPS plan later?",
                  answer:
                    "Yes, you can easily upgrade your VPS plan as your needs grow. Our platform allows for seamless vertical scaling with minimal to no downtime.",
                },
                {
                  question: "What operating systems do you support?",
                  answer:
                    "We support a wide range of operating systems including Ubuntu, Debian, CentOS, AlmaLinux, and Windows Server. Custom OS installations are also available upon request.",
                },
                {
                  question: "Is managed VPS hosting available?",
                  answer:
                    "Yes, we offer both managed and unmanaged VPS hosting options. With managed hosting, our team handles server maintenance, updates, security, and support, allowing you to focus on your business.",
                },
                {
                  question: "What kind of support do you provide?",
                  answer:
                    "We offer 24/7 technical support via live chat, email, and ticket system. Our team of experts is always available to help you with any issues you might encounter.",
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
