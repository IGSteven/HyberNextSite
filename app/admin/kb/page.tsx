"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, Eye, Clock, FileText, Tag, AlertCircle, FolderTree } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { KBArticle, KBCategory } from "@/lib/kb-types"

export default function AdminKBPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<KBArticle[]>([])
  const [categories, setCategories] = useState<KBCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "article" | "category" } | null>(null)

  // Fetch KB data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesResponse = await fetch("/api/kb/articles")
        const categoriesResponse = await fetch("/api/kb/categories")

        const articlesData = await articlesResponse.json()
        const categoriesData = await categoriesResponse.json()

        if (articlesData.success) {
          setArticles(articlesData.articles || [])
        } else {
          setError(articlesData.error || "Failed to fetch KB articles")
        }

        if (categoriesData.success) {
          setCategories(categoriesData.categories || [])
        } else {
          setError(categoriesData.error || "Failed to fetch KB categories")
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

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get category names by ID
  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds
      .map((id) => {
        const category = categories.find((cat) => cat.id === id)
        return category ? category.name : null
      })
      .filter(Boolean)
      .join(", ")
  }

  // Handle delete confirmation
  const handleDeleteClick = (id: string, type: "article" | "category") => {
    setItemToDelete({ id, type })
    setDeleteDialogOpen(true)
  }

  // Handle delete action
  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      if (itemToDelete.type === "article") {
        const response = await fetch(`/api/kb/articles?id=${itemToDelete.id}`, {
          method: "DELETE",
        })
        const result = await response.json()

        if (result.success) {
          setArticles(articles.filter((article) => article.id !== itemToDelete.id))
        } else {
          setError(result.error || "Failed to delete article")
        }
      } else {
        // Updated to use the new /api/kb/categories/manage endpoint
        const response = await fetch(`/api/kb/categories/manage?id=${itemToDelete.id}`, {
          method: "DELETE",
        })
        const result = await response.json()

        if (result.success) {
          setCategories(categories.filter((cat) => cat.id !== itemToDelete.id))
        } else {
          setError(result.error || "Failed to delete category")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hyber-orange"></div>
      </div>
    )
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Knowledge Base Management</h1>
          <div className="flex gap-4">
            <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
              <Link href="/admin/kb/articles/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Article
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/kb/categories/new">
                <FolderTree className="mr-2 h-4 w-4" />
                New Category
              </Link>
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="articles">
          <TabsList className="mb-8">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="articles">
            <div className="grid grid-cols-1 gap-6">
              {articles.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No articles yet</h3>
                  <p className="text-muted-foreground mt-2">Create your first knowledge base article to get started.</p>
                  <Button asChild className="mt-6 bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/admin/kb/articles/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Article
                    </Link>
                  </Button>
                </div>
              ) : (
                articles.map((article) => (
                  <Card key={article.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{article.title}</CardTitle>
                          <CardDescription>
                            {article.status === "published" ? (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Published: {formatDate(article.publishedAt)}
                              </div>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </CardDescription>
                        </div>
                        <div>{article.featured && <Badge className="bg-hyber-orange text-white">Featured</Badge>}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {getCategoryNames(article.categoryIds) || "No categories"}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/kb/${article.slug}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/kb/articles/edit/${article.slug}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(article.id, "article")}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.length === 0 ? (
                <div className="text-center py-12 col-span-full">
                  <FolderTree className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No categories yet</h3>
                  <p className="text-muted-foreground mt-2">Create your first category to organize your articles.</p>
                  <Button asChild className="mt-6 bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/admin/kb/categories/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Category
                    </Link>
                  </Button>
                </div>
              ) : (
                categories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>Slug: {category.slug}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{category.description || "No description"}</p>
                      {category.parentId && (
                        <div className="mt-2">
                          <span className="text-sm text-muted-foreground">
                            Parent: {categories.find((c) => c.id === category.parentId)?.name || "Unknown"}
                          </span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/kb/category/${category.slug}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/kb/categories/edit/${category.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(category.id, "category")}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                {itemToDelete?.type === "article"
                  ? "Are you sure you want to delete this article? This action cannot be undone."
                  : "Are you sure you want to delete this category? This will remove the category from all articles. This action cannot be undone."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
