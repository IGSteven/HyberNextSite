"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Save, ArrowLeft } from "lucide-react"
import type { Category } from "@/lib/blog-types"
import { createCategory, updateCategory } from "@/app/actions/blog-actions"

interface CategoryFormProps {
  category?: Category
  isEdit?: boolean
}

export default function CategoryForm({ category, isEdit = false }: CategoryFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)

      if (isEdit && category) {
        formData.append("id", category.id)
        // Preserve the original slug for existing categories
        formData.append("slug", category.slug)
      }

      const result = isEdit ? await updateCategory(formData) : await createCategory(formData)

      if (result.success) {
        router.push("/admin/blog?tab=categories")
      } else {
        setError(result.error || "Failed to save category")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Button variant="outline" onClick={() => router.push("/admin/blog?tab=categories")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? "Edit Category" : "Create New Category"}</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input id="name" name="name" defaultValue={category?.name || ""} required />
        </div>

        {isEdit && (
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (Cannot be changed)</Label>
            <Input id="slug" name="slug" defaultValue={category?.slug || ""} disabled className="bg-muted" />
            <p className="text-sm text-muted-foreground">
              The slug is used in URLs and cannot be changed after creation.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" defaultValue={category?.description || ""} rows={4} />
        </div>

        <Button type="submit" className="w-full bg-hyber-orange hover:bg-hyber-red" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Category"}
        </Button>
      </form>
    </div>
  )
}
