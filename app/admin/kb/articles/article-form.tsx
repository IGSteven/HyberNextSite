"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2, Check, ChevronsUpDown } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { KBArticle, KBCategory } from "@/lib/kb-types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { v4 as uuidv4 } from 'uuid'

// Define the form schema with clear required fields
const articleFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  categoryIds: z.array(z.string()).min(1, "At least one category is required"),
  tags: z.string().optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false), // Making sure this has a default value
  authorId: z.string().min(1, "Author is required"),
})

type ArticleFormValues = z.infer<typeof articleFormSchema>

interface ArticleFormProps {
  article?: KBArticle
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<KBCategory[]>([])
  const [authors, setAuthors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authorOpen, setAuthorOpen] = useState(false)

  // Initialize the form with specific typing to match the schema
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: article?.title || "",
      slug: article?.slug || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      categoryIds: article?.categoryIds || [],
      tags: article?.tags?.join(", ") || "",
      status: article?.status || "draft",
      featured: article?.featured ?? false, // Using nullish coalescing to ensure a boolean
      authorId: article?.authorId || "",
    },
  })

  // Fetch categories and authors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, authorsResponse] = await Promise.all([
          fetch("/api/kb/categories"),
          fetch("/api/admin/blog/authors") 
        ])

        const categoriesData = await categoriesResponse.json()
        const authorsData = await authorsResponse.json()

        if (categoriesData.success) {
          setCategories(categoriesData.categories || [])
        } else {
          setError(categoriesData.error || "Failed to fetch categories")
        }

        if (authorsData.success) {
          setAuthors(authorsData.authors || [])
        } else {
          setError(authorsData.error || "Failed to fetch authors")
        }
      } catch (err) {
        setError("An unexpected error occurred")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  // Handle title change to auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    form.setValue("title", title)

    // Only auto-generate slug if it's a new article or the slug hasn't been manually edited
    if (!article || form.getValues("slug") === article.slug || form.getValues("slug") === "") {
      form.setValue("slug", generateSlug(title))
    }
  }

  // Handle form submission with correctly typed values
  const onSubmit = async (values: ArticleFormValues) => {
    setIsSaving(true)
    setError(null)

    try {
      // Process tags
      const tags = values.tags
        ? values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : []

      // Prepare the article data
      const articleData = {
        ...values,
        tags,
        id: article?.id || uuidv4(), 
        createdAt: article?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: values.status === "published" ? new Date().toISOString() : article?.publishedAt || null,
      }

      // Debug log to check the data
      console.log("Submitting article data:", articleData);

      // Send the request
      const response = await fetch("/api/kb/articles", {
        method: article ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      })

      const result = await response.json()

      if (result.success) {
        router.push("/admin/kb")
      } else {
        setError(result.error || "Failed to save article")
      }
    } catch (err: any) {
      console.error("Error saving article:", err);
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-hyber-orange"></div>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} onChange={handleTitleChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>The URL-friendly version of the title. Auto-generated from the title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={3} />
                </FormControl>
                <FormDescription>A brief summary of the article.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (Markdown)</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={15} />
                </FormControl>
                <FormDescription>Write your article content using Markdown. HTML is also supported.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryIds"
            render={() => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <FormField
                      key={category.id}
                      control={form.control}
                      name="categoryIds"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(category.id)}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || []
                                if (checked) {
                                  field.onChange([...currentValue, category.id])
                                } else {
                                  field.onChange(currentValue.filter((id) => id !== category.id))
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">{category.name}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Comma-separated list of tags.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authorId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Author</FormLabel>
                <Popover open={authorOpen} onOpenChange={setAuthorOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={authorOpen}
                        className="justify-between"
                      >
                        {field.value
                          ? authors.find((author) => author.id === field.value)?.name || "Select an author"
                          : "Select an author"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[300px]">
                    <Command>
                      <CommandInput placeholder="Search for an author..." />
                      <CommandEmpty>No author found.</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-y-auto">
                        {authors.map((author) => (
                          <CommandItem
                            key={author.id}
                            value={author.name}
                            onSelect={() => {
                              form.setValue("authorId", author.id);
                              setAuthorOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === author.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {author.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">
                  Feature this article on the Knowledge Base homepage
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/kb")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="bg-hyber-orange hover:bg-hyber-red">
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {article ? "Update Article" : "Create Article"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
