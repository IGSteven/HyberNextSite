import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Users, Globe, Shield, Server, Clock, Award } from "lucide-react"

export const metadata = {
  title: "About Us - HyberHost",
  description: "Learn about HyberHost, our mission, values, and the team behind our hosting services",
}

export default function AboutPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About HyberHost</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Providing reliable hosting solutions since 2018
          </p>
        </div>

        {/* Our Story */}
        <div className="mt-20">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-hyber-orange">Our Story</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">From Passion to Excellence</p>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Founded in late 2022, HyberHost began with a simple mission: to provide reliable, high-performance
                  hosting solutions with exceptional customer service. What started as a small team of passionate tech
                  enthusiasts has grown into a trusted hosting provider serving clients worldwide.
                </p>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  Our journey has been driven by a commitment to innovation, reliability, and customer satisfaction. We
                  continuously invest in cutting-edge technology and infrastructure to deliver the best possible hosting
                  experience for businesses of all sizes.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="HyberHost team"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Shield className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Reliability
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    We understand that your online presence is critical to your business. That's why we're committed to
                    providing hosting services with 99.9% uptime and robust infrastructure.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Users className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Customer-Centric
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Our customers are at the heart of everything we do. We listen to your needs, provide personalized
                    support, and continuously improve our services based on your feedback.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <Server className="h-5 w-5 flex-none text-hyber-orange" aria-hidden="true" />
                  Innovation
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    We stay at the forefront of technology, constantly exploring new solutions and approaches to provide
                    you with the most advanced hosting services available.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Our Infrastructure */}
        <div className="mt-24 sm:mt-32 bg-hyber-violet/10 dark:bg-hyber-violet/30 rounded-3xl p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Infrastructure</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              State-of-the-art technology powering your digital presence
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
            <div>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 flex-none text-hyber-orange mt-1" />
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold">Global Data Centers</h3>
                    <p className="mt-2 text-muted-foreground">
                      Our network spans multiple continents with strategically located data centers to ensure low
                      latency and high availability for your applications.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 flex-none text-hyber-orange mt-1" />
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold">Enterprise-Grade Hardware</h3>
                    <p className="mt-2 text-muted-foreground">
                      We use only the highest quality server hardware from trusted manufacturers, with redundant
                      components to minimize the risk of failure.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 flex-none text-hyber-orange mt-1" />
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold">Advanced Network Architecture</h3>
                    <p className="mt-2 text-muted-foreground">
                      Our network is designed with multiple layers of redundancy, DDoS protection, and optimized routing
                      to ensure your data flows smoothly and securely.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 flex-none text-hyber-orange mt-1" />
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold">Sustainable Operations</h3>
                    <p className="mt-2 text-muted-foreground">
                      We're committed to reducing our environmental impact by using energy-efficient hardware and
                      partnering with data centers that utilize renewable energy sources.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Data center infrastructure"
                className="w-full rounded-xl shadow-xl"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>

        {/* Our Achievements */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Achievements</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Milestones that mark our journey of growth and excellence
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Globe className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Global Expansion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From our humble beginnings in the UK, we've expanded our operations to serve customers in over 50
                  countries worldwide, with data centers across multiple continents.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Award className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Industry Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're proud to have received multiple awards for our hosting services, customer support, and
                  innovative solutions, including recognition for our commitment to reliability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                  <Clock className="h-6 w-6 text-hyber-orange" />
                </div>
                <CardTitle>Uptime Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We've maintained an impressive 99.99% uptime record across our infrastructure, ensuring that our
                  customers' websites and applications are always available to their users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 sm:mt-32 bg-gradient-to-r from-hyber-orange to-hyber-red rounded-2xl">
          <div className="mx-auto px-6 py-16 sm:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to experience the HyberHost difference?
              <br />
              Join thousands of satisfied customers today.
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
