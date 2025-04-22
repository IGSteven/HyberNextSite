import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Server, Database, Globe, Shield, Zap, BarChart3 } from "lucide-react"

export const metadata = {
  title: "Shared Web Hosting",
  description: "Affordable cPanel/WHM shared web hosting with unlimited bandwidth and 24/7 support",
}

export default function SharedHostingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Shared Web Hosting</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Reliable and affordable web hosting powered by cPanel/WHM. Perfect for small businesses, personal websites,
            and blogs.
          </p>
        </div>

        {/* Feature Overview */}
        <div className="mt-20">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-hyber-orange">Easy Website Management</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl font-maven">Powered by cPanel/WHM</p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Our shared hosting plans include the industry-standard cPanel control panel, making it easy to manage
                  your websites, email accounts, databases, and more.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Globe className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      One-Click Installations
                    </dt>
                    <dd className="inline ml-1">
                      Install WordPress, Joomla, Drupal, and hundreds of other applications with just a few clicks using
                      Softaculous.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Database className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      MySQL Databases
                    </dt>
                    <dd className="inline ml-1">
                      Create and manage MySQL databases easily through phpMyAdmin, included with all hosting plans.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold">
                      <Shield className="absolute left-1 top-1 h-5 w-5 text-hyber-orange" aria-hidden="true" />
                      Free SSL Certificates
                    </dt>
                    <dd className="inline ml-1">
                      Secure your website with free Let's Encrypt SSL certificates, automatically installed and renewed.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="cPanel Dashboard"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>

        {/* Hosting Plans */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Choose Your Hosting Plan</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Select the perfect shared hosting plan for your needs. All plans include cPanel, 24/7 support, and a 99.9%
              uptime guarantee.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Starter Plan */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Starter</CardTitle>
                <CardDescription>Perfect for personal websites and blogs</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$4.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>1 Website</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>10GB SSD Storage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unmetered Bandwidth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>5 Email Accounts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Free SSL Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>cPanel Control Panel</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/order?product=shared-starter">Select Plan</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Business Plan */}
            <Card className="flex flex-col border-hyber-orange relative">
              <div className="absolute top-0 left-0 right-0 bg-hyber-orange text-white text-center py-1 text-sm font-medium rounded-t-lg">
                Most Popular
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-xl">Business</CardTitle>
                <CardDescription>Ideal for small businesses and online stores</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unlimited Websites</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>25GB SSD Storage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unmetered Bandwidth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unlimited Email Accounts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Free SSL Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>cPanel Control Panel</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Daily Backups</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/order?product=shared-business">Select Plan</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Pro</CardTitle>
                <CardDescription>For high-traffic websites and advanced needs</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">$14.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unlimited Websites</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>50GB SSD Storage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unmetered Bandwidth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Unlimited Email Accounts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Free SSL Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>cPanel Control Panel</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Daily Backups</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-hyber-orange mr-2" />
                    <span>Priority Support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hyber-orange hover:bg-hyber-red">
                  <Link href="/order?product=shared-pro">Select Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* cPanel Features */}
        <div className="mt-24 sm:mt-32 bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">cPanel Features</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Manage your website with ease using the industry-standard cPanel control panel
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Globe className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Website Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>File Manager</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>FTP Accounts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Softaculous Auto-Installer</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Subdomains & Addon Domains</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Database className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Database Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>MySQL Databases</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>phpMyAdmin</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Remote MySQL</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Database Backup & Restore</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Server className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Email Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Email Accounts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Webmail Access</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Forwarders & Autoresponders</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Spam Filters</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Shield className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Security Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>SSL/TLS Management</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>IP Blocker</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Password Protected Directories</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Hotlink Protection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <BarChart3 className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Statistics & Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Bandwidth Usage</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Disk Usage</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Error Logs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Visitor Statistics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Zap className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Advanced Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>PHP Version Selector</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Cron Jobs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>.htaccess Editor</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-hyber-orange mr-2 mt-1.5"></div>
                    <span>Backup Wizard</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Frequently Asked Questions</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Common questions about our shared hosting services
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20">
            {[
              {
                question: "What is shared web hosting?",
                answer:
                  "Shared web hosting is a type of hosting where multiple websites share resources on a single server. It's an affordable and beginner-friendly option for small to medium-sized websites.",
              },
              {
                question: "What is cPanel and why is it important?",
                answer:
                  "cPanel is a web-based control panel that simplifies website and server management. It provides a graphical interface and automation tools for common tasks like creating email accounts, managing databases, and installing applications.",
              },
              {
                question: "Can I upgrade my hosting plan later?",
                answer:
                  "Yes, you can easily upgrade your shared hosting plan as your needs grow. Our platform allows for seamless upgrades with minimal downtime, so you can scale your resources up as your business expands.",
              },
              {
                question: "Do you offer a money-back guarantee?",
                answer:
                  "Yes, we offer a 30-day money-back guarantee for all our shared hosting plans. If you're not satisfied with our service within the first 30 days, you can request a full refund.",
              },
              {
                question: "How many websites can I host?",
                answer:
                  "The number of websites you can host depends on your plan. Our Starter plan allows 1 website, while our Business and Pro plans support unlimited websites, subject to the available resources.",
              },
              {
                question: "Do you provide website migration services?",
                answer:
                  "Yes, we offer free website migration services for all new customers. Our team will help you transfer your existing website, databases, and email accounts to our servers with minimal downtime.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 bg-gradient-to-r from-hyber-orange to-hyber-red rounded-2xl">
          <div className="mx-auto px-6 py-16 sm:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-maven">
              Ready to get started with shared hosting?
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
