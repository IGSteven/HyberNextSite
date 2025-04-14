import { Suspense } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PricingTable from "./pricing-table"
import PricingTableSkeleton from "./pricing-table-skeleton"

export const metadata = {
  title: "Pricing - HyberHost",
  description: "Affordable VPS and dedicated server hosting plans for your business",
}

export default function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing Plans</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the perfect hosting solution for your business needs. All plans include 24/7 support, 99.9% uptime
            guarantee, and free migration.
          </p>
        </div>

        <div className="mt-16 flex justify-center">
          <Suspense fallback={<PricingTableSkeleton />}>
            <PricingTable />
          </Suspense>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight">Enterprise Solutions</h3>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Need a custom solution? Our enterprise plans offer tailored configurations to meet your specific
              requirements.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-hyber-orange">What's included</h4>
              <div className="h-px flex-auto bg-gray-100 dark:bg-gray-700"></div>
            </div>
            <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6">
              {[
                "Custom hardware configurations",
                "Dedicated account manager",
                "Priority support",
                "Advanced security options",
                "Custom SLAs",
                "Private networking",
                "Managed services",
                "Compliance assistance",
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
                <p className="text-base font-semibold text-gray-600 dark:text-gray-300">Custom Enterprise Solutions</p>
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
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "What is the difference between VPS and Dedicated hosting?",
                answer:
                  "VPS hosting provides a virtualized server environment where resources are shared among multiple users, while dedicated hosting gives you an entire physical server exclusively for your use. Dedicated servers offer more power and customization but at a higher cost.",
              },
              {
                question: "Can I upgrade my plan later?",
                answer:
                  "Yes, you can easily upgrade your hosting plan as your needs grow. Our platform allows for seamless upgrades with minimal downtime.",
              },
              {
                question: "Do you offer a money-back guarantee?",
                answer:
                  "Yes, we offer a 30-day money-back guarantee on all our hosting plans. If you're not satisfied with our service, you can request a full refund within the first 30 days.",
              },
              {
                question: "What kind of support do you provide?",
                answer:
                  "We offer 24/7 technical support via live chat, email, and phone. Our team of experts is always available to help you with any issues you might encounter.",
              },
              {
                question: "Do you provide server management?",
                answer:
                  "Yes, we offer both managed and unmanaged hosting options. With managed hosting, our team handles server maintenance, updates, and security for you.",
              },
              {
                question: "What operating systems do you support?",
                answer:
                  "We support a wide range of operating systems including various Linux distributions (Ubuntu, CentOS, Debian) and Windows Server.",
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
  )
}
