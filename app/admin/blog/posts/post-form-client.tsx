"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Save, ArrowLeft } from "lucide-react"
import type { BlogPost, Category, Author } from "@/lib/blog-types"
import { createPost, updatePost } from "@/app/actions/blog-actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Remove the direct import from blog-utils
// import { getAuthors } from "@/lib/blog-utils"

interface PostFormProps {
  post?: BlogPost
  categories: Category[]
  isEdit?: boolean
}

export default function PostFormClient({ post, categories, isEdit = false }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<"published" | "draft">(post?.status || "draft")
  const [publishDate, setPublishDate] = useState<string>("")
  const [authors, setAuthors] = useState<Author[]>([])
  const [selectedAuthor, setSelectedAuthor] = useState<string>(post?.authorId || "hyberhost-team")

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        // Use fetch to get authors from an API endpoint instead of calling server-only function directly
        const response = await fetch('/api/admin/blog/authors');
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        const data = await response.json();
        setAuthors(data.authors || []);
      } catch (error) {
        console.error('Error fetching authors:', error);
        // Set a default author if the fetch fails
        setAuthors([{
          id: "default",
          name: "HyberHost Team",
          slug: "hyberhost-team",
          bio: "The official HyberHost team account.",
          avatar: "/double-h-monogram.png",
        }]);
      }
    }
    fetchAuthors();
  }, [])

  useEffect(() => {
    if (post?.publishedAt) {
      // Format the date for the input field (YYYY-MM-DDThh:mm)
      const date = new Date(post.publishedAt)
      setPublishDate(date.toISOString().slice(0, 16))
    }
  }, [post])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)

      if (isEdit && post) {
        formData.append("id", post.id)
      }

      formData.append("authorId", selectedAuthor)

      const result = isEdit ? await updatePost(formData) : await createPost(formData)

      if (result.success) {
        router.push("/admin/blog")
      } else {
        setError(result.error || "Failed to save post")
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
        <Button variant="outline" onClick={() => router.push("/admin/blog")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? "Edit Post" : "Create New Post"}</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={post?.title || ""} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt || ""} required rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea id="content" name="content" defaultValue={post?.content || ""} required rows={15} />
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <RadioGroup
                      defaultValue={post?.status || "draft"}
                      onValueChange={(value) => setStatus(value as "published" | "draft")}
                      name="status"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="published" id="published" />
                        <Label htmlFor="published">Published</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="draft" id="draft" />
                        <Label htmlFor="draft">Draft</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {status === "published" && (
                    <div className="space-y-2">
                      <Label htmlFor="publishDate">Publish Date</Label>
                      <Input
                        id="publishDate"
                        name="publishDate"
                        type="datetime-local"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Leave empty to publish immediately</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                      <SelectTrigger id="author">
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                      <SelectContent>
                        {authors.map((author) => (
                          <SelectItem key={author.id} value={author.id}>
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input id="coverImage" name="coverImage" defaultValue={post?.coverImage || ""} />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" name="featured" defaultChecked={post?.featured || false} />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label>Categories</Label>
                  {categories.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No categories available. Create some categories first.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            name={`category-${category.id}`}
                            defaultChecked={post?.categories.includes(category.id) || false}
                          />
                          <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-hyber-orange hover:bg-hyber-red" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Post"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
