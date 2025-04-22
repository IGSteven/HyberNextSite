import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TicketIcon, FileText, Phone, Mail, Clock, Shield } from "lucide-react"

export const metadata = {
  title: "Support",
  description: "Get help with your hosting services and technical issues",
}

export default function SupportPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Support Center</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Get help with your hosting services and technical issues. Our team is available 24/7 to assist you.
          </p>
        </div>

        {/* Support Options */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-hyber-orange/10 dark:bg-hyber-orange/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TicketIcon className="h-6 w-6 text-hyber-orange dark:text-hyber-orange" />
              </div>
              <CardTitle>Submit a Ticket</CardTitle>
              <CardDescription>Create a support ticket for technical issues or billing inquiries</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Our average response time is under 30 minutes for technical issues
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
                <Link href="/support/tickets">Open Ticket</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-hyber-orange/10 dark:bg-hyber-orange/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-hyber-orange dark:text-hyber-orange" />
              </div>
              <CardTitle>Premium Support</CardTitle>
              <CardDescription>
                Upgrade to premium support for faster response times and additional services
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Available for Business & Enterprise customers</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
                <Link href="#support-plans">View Support Plans</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-hyber-orange/10 dark:bg-hyber-orange/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-hyber-orange dark:text-hyber-orange" />
              </div>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>Browse our extensive documentation and tutorials</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Find answers to common questions and learn how to use our services
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
                <Link href="/support/kb">Browse Articles</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="mt-24 sm:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our support team is available 24/7 to help you with any questions or issues you may have.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-hyber-orange" />
                </div>
                <div className="ml-3">
                  <p className="text-lg font-medium">Phone Support</p>
                  <p className="mt-1 text-muted-foreground">+44 20 8050 1842</p>
                  <p className="mt-1 text-sm text-muted-foreground">Available 24/7 for all customers</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-hyber-orange" />
                </div>
                <div className="ml-3">
                  <p className="text-lg font-medium">Email Support</p>
                  <p className="mt-1 text-muted-foreground">support@hyberhost.com</p>
                  <p className="mt-1 text-sm text-muted-foreground">We'll respond within 1 business day</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-hyber-orange" />
                </div>
                <div className="ml-3">
                  <p className="text-lg font-medium">Business Hours</p>
                  <p className="mt-1 text-muted-foreground">Technical Support: 24/7/365</p>
                  <p className="mt-1 text-muted-foreground">Sales & Billing: Mon-Fri, 9am-6pm EST</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Please describe your issue or question in detail" rows={5} />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-hyber-orange hover:bg-hyber-red">Send Message</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="mt-6 space-y-6">
                {[
                  {
                    question: "How do I create an account?",
                    answer:
                      'You can create an account by clicking on the "Sign Up" button in the top right corner of our website. Follow the registration process by providing your email address and creating a password.',
                  },
                  {
                    question: "What is your uptime guarantee?",
                    answer:
                      "We offer a 99.9% uptime guarantee for all our hosting services. This means that your website or application will be available at least 99.9% of the time. If we fail to meet this guarantee, you may be eligible for service credits.",
                  },
                  {
                    question: "Do you offer a money-back guarantee?",
                    answer:
                      "Yes, we offer a 30-day money-back guarantee for all our hosting plans. If you're not satisfied with our service within the first 30 days, you can request a full refund.",
                  },
                  {
                    question: "How do I contact customer support?",
                    answer:
                      "You can contact our customer support team through various channels: submit a support ticket, use live chat, call our support phone number, or send an email to support@hostpro.com. Our technical support team is available 24/7.",
                  },
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="technical" className="mt-6 space-y-6">
                {[
                  {
                    question: "How do I access my server via SSH?",
                    answer:
                      "To access your server via SSH, you'll need an SSH client like PuTTY (Windows) or Terminal (Mac/Linux). Use the IP address of your server, along with your username and password or SSH key. The default SSH port is 22.",
                  },
                  {
                    question: "How do I install software on my VPS?",
                    answer:
                      "The process for installing software depends on your operating system. For Linux servers, you can use package managers like apt (Ubuntu/Debian) or yum (CentOS). For Windows servers, you can download and install software directly or use Windows Package Manager.",
                  },
                  {
                    question: "Do you provide backups for my server?",
                    answer:
                      "Yes, we provide automated daily backups for all our hosting plans. These backups are retained for 7 days. You can also create manual backups at any time through your control panel.",
                  },
                  {
                    question: "How do I set up a domain with my hosting account?",
                    answer:
                      "You can set up a domain by updating your domain's nameservers to point to our nameservers, or by adding DNS records to point to your server's IP address. Detailed instructions are available in our knowledge base.",
                  },
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="billing" className="mt-6 space-y-6">
                {[
                  {
                    question: "What payment methods do you accept?",
                    answer:
                      "We accept various payment methods including credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For some regions, we also support alternative payment methods.",
                  },
                  {
                    question: "How does billing work?",
                    answer:
                      "Our services are billed on a recurring basis, either monthly or annually depending on your chosen billing cycle. Payment is automatically charged to your payment method on file at the beginning of each billing period.",
                  },
                  {
                    question: "Can I change my billing cycle?",
                    answer:
                      "Yes, you can change your billing cycle from monthly to annually or vice versa. Changes will take effect at the start of your next billing period. Annual plans typically offer a discount compared to monthly billing.",
                  },
                  {
                    question: "How do I update my payment information?",
                    answer:
                      "You can update your payment information by logging into your account dashboard, navigating to the Billing section, and selecting Payment Methods. From there, you can add, update, or remove payment methods.",
                  },
                ].map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Support Plans */}
        <div className="mt-24 sm:mt-32" id="support-plans">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Support Plans</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose the support plan that best fits your business needs
            </p>
          </div>

          <div className="mt-16 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Feature
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Standard Support
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Premium Support
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Business Support
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Enterprise Support
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">24/7/365 Support</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✖</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">System Admin Time</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Discretion</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Discretion</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Hardware Replacement SLA</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">4 Hour</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">4 Hour</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">4 Hour</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">1 Hour</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Support Channels</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Tickets, Phone</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Tickets, Phone</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Live Chat, Tickets, Phone</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Live Chat, Tickets, Phone</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Ticket Response Time</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">8 Business Hours</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">2 Business Hours</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">30 Minutes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">30 Minutes</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Initial Server Hardening</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✖</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✖</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Security Updates/Patches</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✖</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✖</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      Pro-Active Monitoring (Requires Agent)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✖</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">✔</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Virtual Server Management</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Included</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">$20.00 / Monthly</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">$50.00 / Monthly</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Contact Us</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Dedicated Server Management</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Included</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">$20.00 / Monthly</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">$65.00 / Monthly</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">Contact Us</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Support Status */}
        <div className="mt-24 sm:mt-32 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">System Status</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Check the current status of our hosting infrastructure and services
              </p>
            </div>

            <div className="mt-10 max-w-2xl mx-auto">
              <div className="rounded-lg bg-card shadow-sm border">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">All Systems Operational</h3>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-muted-foreground">Updated 5 minutes ago</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span>VPS Hosting</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-muted-foreground">Operational</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Dedicated Servers</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-muted-foreground">Operational</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cloud Hosting</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-muted-foreground">Operational</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customer Portal</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-muted-foreground">Operational</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Support System</span>
                      <div className="flex items-center">
                        <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-muted-foreground">Operational</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t p-4 bg-muted/50">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/support/status">View Detailed Status</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
