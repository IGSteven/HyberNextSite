"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { createCategory } from "@/app/actions/blog-actions"

export default function AddCaseStudiesCategory() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const handleAddCategory = async () => {
    setIsSubmitting(true)
    setStatus("loading")
    setError(null)

    try {
      const formData = new FormData()
      formData.append("name", "Case Studies")
      formData.append("slug", "case-studies")
      formData.append(
        "description",
        "Detailed examinations of successful client projects, showcasing our solutions and results.",
      )

      const result = await createCategory(formData)

      if (result.success) {
        setStatus("success")
        setTimeout(() => {
          router.push("/admin/blog?tab=categories")
          router.refresh()
        }, 1500)
      } else {
        setStatus("error")
        setError(result.error || "Failed to create category")
      }
    } catch (err) {
      setStatus("error")
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add Case Studies Category</CardTitle>
        <CardDescription>
          Add a pre-configured "Case Studies" category to showcase client success stories and project outcomes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> Case Studies
          </div>
          <div>
            <strong>Slug:</strong> case-studies
          </div>
          <div>
            <strong>Description:</strong> Detailed examinations of successful client projects, showcasing our solutions
            and results.
          </div>

          {status === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                Case Studies category has been added successfully!
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/admin/blog?tab=categories")}>
          Back to Categories
        </Button>
        <Button
          onClick={handleAddCategory}
          disabled={isSubmitting || status === "success"}
          className="bg-hyber-orange hover:bg-hyber-red"
        >
          {isSubmitting ? "Adding..." : "Add Case Studies Category"}
        </Button>
      </CardFooter>
    </Card>
  )
}
