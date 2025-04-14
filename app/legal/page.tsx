import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Lock, Scale } from "lucide-react"

export const metadata = {
  title: "Legal Documents - HyberHost",
  description: "Legal policies and documents for HyberHost services",
}

export default function LegalDocumentsPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Legal Documents</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Important policies and legal information regarding our services
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Terms and Conditions */}
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <FileText className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>Terms and Conditions</CardTitle>
              <CardDescription>The agreement governing your use of HyberHost services</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">
                Our Terms and Conditions outline the rules, guidelines, and obligations when using our hosting services,
                including payment terms, service guarantees, and termination policies.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/legal/terms-and-conditions"
                className="text-hyber-orange hover:text-hyber-red w-full text-center"
              >
                View Terms and Conditions
              </Link>
            </CardFooter>
          </Card>

          {/* Privacy Policy */}
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <Lock className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>How we collect, use, and protect your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">
                Our Privacy Policy explains how we handle your personal data in compliance with the UK GDPR and Data
                Protection Act 2018, including your rights and our data retention practices.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/legal/privacy-policy" className="text-hyber-orange hover:text-hyber-red w-full text-center">
                View Privacy Policy
              </Link>
            </CardFooter>
          </Card>

          {/* Acceptable Use Policy */}
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <Shield className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>Acceptable Use Policy</CardTitle>
              <CardDescription>Guidelines for responsible use of our services</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">
                Our Acceptable Use Policy outlines prohibited activities and content when using our services, including
                security requirements, network responsibilities, and consequences for violations.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/legal/acceptable-use-policy"
                className="text-hyber-orange hover:text-hyber-red w-full text-center"
              >
                View Acceptable Use Policy
              </Link>
            </CardFooter>
          </Card>

          {/* Cookie Policy */}
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <FileText className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>Cookie Policy</CardTitle>
              <CardDescription>How we use cookies and similar technologies</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">
                Our Cookie Policy explains how we use cookies and similar tracking technologies on our website, what
                types of cookies we use, and how you can manage your cookie preferences.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/legal/cookie-policy" className="text-hyber-orange hover:text-hyber-red w-full text-center">
                View Cookie Policy
              </Link>
            </CardFooter>
          </Card>

          {/* Service Level Agreement */}
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <Scale className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>Service Level Agreement</CardTitle>
              <CardDescription>Our uptime and service guarantees</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">
                Our Service Level Agreement (SLA) details our commitments regarding service availability, performance
                metrics, support response times, and compensation for service disruptions.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/legal/service-level-agreement"
                className="text-hyber-orange hover:text-hyber-red w-full text-center"
              >
                View Service Level Agreement
              </Link>
            </CardFooter>
          </Card>

          {/* GDPR Compliance */}
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-hyber-orange/10 mb-4">
                <Shield className="h-6 w-6 text-hyber-orange" />
              </div>
              <CardTitle>GDPR Compliance</CardTitle>
              <CardDescription>Our data protection commitments</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">
                Our GDPR Compliance document outlines how we meet the requirements of the UK and EU General Data
                Protection Regulation, including data processing agreements and international data transfers.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/legal/gdpr-compliance" className="text-hyber-orange hover:text-hyber-red w-full text-center">
                View GDPR Compliance
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            If you have any questions about our legal documents or policies, please{" "}
            <Link href="/contact" className="text-hyber-orange hover:text-hyber-red">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
