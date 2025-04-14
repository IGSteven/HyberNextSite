"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReportAbuseClientPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    abuseType: "",
    ipAddress: "",
    url: "",
    description: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // In a real implementation, this would call the WHMCS API to create a ticket
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate a successful submission
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        abuseType: "",
        ipAddress: "",
        url: "",
        description: "",
      })
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-maven">Report Abuse</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            If you've identified abuse or violations related to our services, please report it using the form below. Our
            team will investigate and take appropriate action.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          {submitStatus === "success" && (
            <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Report Submitted</AlertTitle>
              <AlertDescription>
                Thank you for your report. Our abuse team has been notified and will investigate the issue promptly. You
                will receive a confirmation email with a reference number for your report.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === "error" && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Abuse Report Form</CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help us investigate the issue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abuseType">Type of Abuse</Label>
                  <Select
                    value={formData.abuseType}
                    onValueChange={(value) => handleSelectChange("abuseType", value)}
                    required
                  >
                    <SelectTrigger id="abuseType">
                      <SelectValue placeholder="Select type of abuse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spam">Spam</SelectItem>
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="malware">Malware</SelectItem>
                      <SelectItem value="copyright">Copyright Infringement</SelectItem>
                      <SelectItem value="illegal">Illegal Content</SelectItem>
                      <SelectItem value="ddos">DDoS Attack</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ipAddress">IP Address (if applicable)</Label>
                    <Input
                      id="ipAddress"
                      name="ipAddress"
                      placeholder="e.g., 192.168.1.1"
                      value={formData.ipAddress}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">URL (if applicable)</Label>
                    <Input
                      id="url"
                      name="url"
                      placeholder="e.g., https://example.com"
                      value={formData.url}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description of the Abuse</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please provide detailed information about the abuse, including dates, times, and any evidence you have."
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-hyber-orange hover:bg-hyber-red"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold font-maven">Abuse Policy</h2>
            <p>
              HyberHost is committed to maintaining a safe and secure environment for all users. We take abuse reports
              seriously and will investigate all legitimate complaints.
            </p>

            <h3 className="text-xl font-bold font-maven">What We Consider Abuse</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Spam: Unsolicited bulk email, advertising, or promotional content</li>
              <li>Phishing: Attempts to acquire sensitive information by masquerading as a trustworthy entity</li>
              <li>Malware: Distribution of malicious software</li>
              <li>Copyright Infringement: Unauthorized use or distribution of copyrighted material</li>
              <li>Illegal Content: Content that violates local, national, or international laws</li>
              <li>DDoS Attacks: Distributed Denial of Service attacks against our infrastructure or our customers</li>
            </ul>

            <h3 className="text-xl font-bold font-maven">How We Handle Abuse Reports</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>We review all abuse reports within 24 hours</li>
              <li>We investigate the reported issue and gather necessary evidence</li>
              <li>We take appropriate action based on our Terms of Service and the severity of the abuse</li>
              <li>We notify the reporter of the outcome when possible</li>
            </ol>

            <p className="mt-4">
              For urgent abuse issues, please contact our abuse team directly at{" "}
              <a href="mailto:abuse@hyberhost.com" className="text-hyber-orange hover:text-hyber-red">
                abuse@hyberhost.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
