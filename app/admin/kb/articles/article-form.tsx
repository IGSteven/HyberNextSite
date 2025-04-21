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
import { AlertCircle, Loader2, Check, ChevronsUpDown, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { KBArticle, KBCategory } from "@/lib/kb-types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { v4 as uuidv4 } from 'uuid'
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()
  const [categories, setCategories] = useState<KBCategory[]>([])
  const [authors, setAuthors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authorOpen, setAuthorOpen] = useState(false)
  
  // States for AI generation
  const [generatingTitle, setGeneratingTitle] = useState(false)
  const [generatingExcerpt, setGeneratingExcerpt] = useState(false)
  const [generatingContent, setGeneratingContent] = useState(false)

  // Function to generate content with ChatGPT
  const generateWithAI = async (field: 'title' | 'excerpt' | 'content') => {
    // Set the loading state for the specific field
    if (field === 'title') setGeneratingTitle(true)
    else if (field === 'excerpt') setGeneratingExcerpt(true)
    else if (field === 'content') setGeneratingContent(true)

    try {
      // Get current field values to use in the prompt
      const currentTitle = form.getValues('title')
      const currentExcerpt = form.getValues('excerpt')
      const currentContent = form.getValues('content')
      
      // Get selected categories to provide context
      const selectedCategoryIds = form.getValues('categoryIds') || []
      const selectedCategories = categories
        .filter(cat => selectedCategoryIds.includes(cat.id))
        .map(cat => cat.name)
      
      // Create the prompt based on which field we're generating
      let prompt = ''
      
      if (field === 'title') {
        prompt = `Generate a concise, informative title for a knowledge base article for HyberHost (a web hosting company).`
        
        if (currentExcerpt) {
          prompt += ` Based on this excerpt: "${currentExcerpt}"`
        }
        
        if (currentContent) {
          prompt += ` The article content begins with: "${currentContent.substring(0, 200)}..."`
        }
        
        if (selectedCategories.length > 0) {
          prompt += ` The article is categorized as: ${selectedCategories.join(', ')}.`
        }
        
        prompt += ` The title should be SEO-friendly and clearly describe what the article is about.`
      } 
      else if (field === 'excerpt') {
        prompt = `Write a clear, concise excerpt (1-2 sentences) for a knowledge base article for HyberHost (a web hosting company).`
        
        if (currentTitle) {
          prompt += ` The article title is: "${currentTitle}"`
        }
        
        if (currentContent) {
          prompt += ` The article content begins with: "${currentContent.substring(0, 200)}..."`
        }
        
        if (selectedCategories.length > 0) {
          prompt += ` The article is categorized as: ${selectedCategories.join(', ')}.`
        }
        
        prompt += ` The excerpt should summarize the key point of the article and entice users to read more.`
      }
      else if (field === 'content') {
        prompt = `Title: ${currentTitle || '[Your title or article idea]'}
Slug: ${form.getValues('slug') || '[your-slug] (or leave blank)'}
Excerpt: ${currentExcerpt || '[optional short preview text]'}

Content/Prompt:
"""
${currentContent && currentContent.trim() ? currentContent : (currentTitle ? `This article will provide information about: ${currentTitle}` : '[Your rough notes, article idea, or partial content]')}
${selectedCategories.length > 0 ? `\nCategories: ${selectedCategories.join(', ')}` : ''}
"""

Instructions:
- Write a **complete Knowledge Base article** in **Markdown**.
- Assume the audience is **hosting customers** (server hosting, VPS, dedicated, cloud servers).
- Use professional but friendly language ("your server", "on our servers", "as a hosting customer", etc.).
- Provide **examples that work on common Linux distributions** (AlmaLinux, Ubuntu, Debian, Rocky Linux).
- Structure clearly with headings, numbered steps, and code blocks where needed.
- Add a **Conclusion** or "Next Steps" if appropriate.
`
        
        // Use streaming for content generation to handle large articles
        try {
          // Make the API request to your backend endpoint with streaming enabled
          const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, stream: true })
          });

          if (!response.ok) {
            throw new Error('Failed to generate content');
          }

          // Set up streaming handling
          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error('Stream reader not available');
          }

          let receivedContent = '';
          let decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // Decode the chunk
            const chunk = decoder.decode(value, { stream: true });
            receivedContent += chunk;
          }

          // Process the complete JSON response
          try {
            // Extract content from the response JSON
            const result = JSON.parse(receivedContent);
            if (result.content) {
              form.setValue('content', result.content.trim());
              toast({
                title: "AI Generated Content",
                description: "Successfully generated content with streaming",
                variant: "default",
              });
            } else {
              throw new Error('No content returned from streaming');
            }
          } catch (jsonError) {
            console.error("Error parsing streaming response:", jsonError);
            throw new Error('Invalid response format from streaming');
          }
          
          return; // Exit early as we've handled the content
        } catch (streamingError) {
          console.error("Streaming error:", streamingError);
          // Fall back to non-streaming approach if streaming fails
          console.log("Falling back to non-streaming approach");
        }
      }
      
      // Make the API request to your backend endpoint that will call OpenAI
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      
      // Update the form with the generated content
      if (data.content) {
        form.setValue(field, data.content.trim())
        
        // If title was generated, also update the slug
        if (field === 'title') {
          form.setValue('slug', generateSlug(data.content.trim()))
        }
        
        toast({
          title: "AI Generated Content",
          description: `Successfully generated ${field}`,
          variant: "default",
        })
      } else {
        throw new Error('No content returned')
      }
    } catch (err: any) {
      console.error(`Error generating ${field}:`, err)
      toast({
        title: "Generation Failed",
        description: err.message || `Failed to generate ${field}`,
        variant: "destructive",
      })
    } finally {
      // Reset loading state
      if (field === 'title') setGeneratingTitle(false)
      else if (field === 'excerpt') setGeneratingExcerpt(false)
      else if (field === 'content') setGeneratingContent(false)
    }
  }

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
                <div className="flex justify-between items-center">
                  <FormLabel>Title</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => generateWithAI('title')}
                          disabled={generatingTitle}
                          className="h-8 w-8"
                        >
                          {generatingTitle ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-hyber-orange" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate title with AI</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input {...field} onChange={handleTitleChange} />
                    {generatingTitle && (
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-md">
                        <Loader2 className="h-5 w-5 animate-spin text-hyber-orange" />
                      </div>
                    )}
                  </div>
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
                <div className="flex justify-between items-center">
                  <FormLabel>Excerpt</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => generateWithAI('excerpt')}
                          disabled={generatingExcerpt}
                          className="h-8 w-8"
                        >
                          {generatingExcerpt ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-hyber-orange" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate excerpt with AI</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="relative">
                    <Textarea {...field} rows={3} />
                    {generatingExcerpt && (
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-md">
                        <Loader2 className="h-5 w-5 animate-spin text-hyber-orange" />
                      </div>
                    )}
                  </div>
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
                <div className="flex justify-between items-center">
                  <FormLabel>Content (Markdown)</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => generateWithAI('content')}
                          disabled={generatingContent}
                          className="h-8 w-8"
                        >
                          {generatingContent ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-hyber-orange" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Generate content with AI</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="relative">
                    <Textarea 
                      {...field} 
                      rows={15} 
                      placeholder="Use the sparkle button to auto-generate content based on the title"
                    />
                    {generatingContent && (
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-md">
                        <div className="text-center">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-hyber-orange mb-2" />
                          <p className="text-sm text-muted-foreground">Generating article content from title...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Write your article content using Markdown. HTML is also supported.
                  Click the sparkle button to generate content based on the title.
                </FormDescription>
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
