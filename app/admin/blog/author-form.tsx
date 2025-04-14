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
import { createAuthor, updateAuthor } from "@/app/actions/blog-actions"
import type { Author } from "@/lib/blog-types"

interface AuthorFormProps {
  author?: Author
  isEdit?: boolean
}

export default function AuthorForm({ author, isEdit = false }: AuthorFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: author?.name || "",
    slug: author?.slug || "",
    title: author?.title || "",
    bio: author?.bio || "",
    avatar: author?.avatar || "",
    twitter: author?.social?.twitter || "",
    linkedin: author?.social?.linkedin || "",
    github: author?.social?.github || "",
    website: author?.social?.website || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formDataObj = new FormData(e.currentTarget)

      if (isEdit && author) {
        formDataObj.append("id", author.id)
      }

      // Log the form data to help debug
      console.log("Form data being submitted:")
      for (const [key, value] of formDataObj.entries()) {
        console.log(`${key}: ${value}`)
      }

      const result = isEdit ? await updateAuthor(formDataObj) : await createAuthor(formDataObj)

      if (result.success) {
        router.push("/admin/blog?tab=authors")
      } else {
        setError(result.error || "Failed to save author")
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
        <Button variant="outline" onClick={() => router.push("/admin/blog?tab=authors")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Authors
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? "Edit Author" : "Create New Author"}</h1>
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
          <Label htmlFor="name">Author Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title/Position</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Technical Director @ HyberHost"
          />
          <p className="text-xs text-muted-foreground mt-1">Example: Technical Director @ HyberHost</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input id="avatar" name="avatar" value={formData.avatar} onChange={handleChange} />
        </div>

        <div className="border-t pt-4 mt-6">
          <h3 className="font-medium mb-4">Social Links</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="username (without @)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="username or profile ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" name="github" value={formData.github} onChange={handleChange} placeholder="username" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
              <p className="text-xs text-muted-foreground mt-1">Include https:// for full URLs</p>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-hyber-orange hover:bg-hyber-red" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Author"}
        </Button>
      </form>
    </div>
  )
}
