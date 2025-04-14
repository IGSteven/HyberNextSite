"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check } from "lucide-react"
import { createCategory } from "@/app/actions/blog-actions"

export default function AddCaseStudiesCategory() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleAddCategory = async () => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append("name", "Case Studies")
      formData.append(
        "description",
        "Detailed examinations of client projects, challenges, solutions, and outcomes achieved with HyberHost services.",
      )

      const result = await createCategory(formData)

      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || "Failed to add Case Studies category")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Case Studies Category</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 border-green-500 text-green-700">
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Case Studies category has been added successfully!</AlertDescription>
        </Alert>
      )}

      <p className="mb-4">
        This will add a new "Case Studies" category to your blog for showcasing client success stories and detailed
        project examinations.
      </p>

      <Button
        onClick={handleAddCategory}
        disabled={isSubmitting || success}
        className="bg-hyber-orange hover:bg-hyber-red"
      >
        {isSubmitting ? "Adding..." : success ? "Added Successfully" : "Add Case Studies Category"}
      </Button>
    </div>
  )
}
