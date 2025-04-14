"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, Eye, Clock, FileText, Tag, AlertCircle, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { deletePost, deleteCategory } from "@/app/actions/blog-actions"
import type { BlogPost, Category } from "@/lib/blog-types"
import AuthorList from "./authors/author-list"

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "post" | "category" } | null>(null)

  // Fetch blog data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/blog")
        const data = await response.json()

        if (data.success) {
          setPosts(data.posts || [])
          setCategories(data.categories || [])
        } else {
          setError(data.error || "Failed to fetch blog data")
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
  const handleDeleteClick = (id: string, type: "post" | "category") => {
    setItemToDelete({ id, type })
    setDeleteDialogOpen(true)
  }

  // Handle delete action
  const handleDelete = async () => {
    if (!itemToDelete) return

    try {
      if (itemToDelete.type === "post") {
        const result = await deletePost(itemToDelete.id)

        if (result.success) {
          setPosts(posts.filter((post) => post.id !== itemToDelete.id))
        } else {
          setError(result.error || "Failed to delete post")
        }
      } else {
        const result = await deleteCategory(itemToDelete.id)

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
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <div className="flex gap-4">
            <Button asChild className="bg-hyber-orange hover:bg-hyber-red">
              <Link href="/admin/blog/posts/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
            <div className="relative group">
              <Button asChild variant="outline">
                <Link href="/admin/blog/categories/new">
                  <Tag className="mr-2 h-4 w-4" />
                  New Category
                </Link>
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 hidden group-hover:block">
                <Link
                  href="/admin/blog/add-category"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Add Predefined Category
                </Link>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin/blog/authors/new">
                <UserPlus className="mr-2 h-4 w-4" />
                New Author
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

        <Tabs defaultValue="posts">
          <TabsList className="mb-8">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="grid grid-cols-1 gap-6">
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No posts yet</h3>
                  <p className="text-muted-foreground mt-2">Create your first blog post to get started.</p>
                  <Button asChild className="mt-6 bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/admin/blog/posts/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Post
                    </Link>
                  </Button>
                </div>
              ) : (
                posts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{post.title}</CardTitle>
                          <CardDescription>
                            {post.status === "published" ? (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Published: {formatDate(post.publishedAt)}
                              </div>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </CardDescription>
                        </div>
                        <div>{post.featured && <Badge className="bg-hyber-orange text-white">Featured</Badge>}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {getCategoryNames(post.categories) || "No categories"}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/blog/posts/edit/${post.slug}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteClick(post.id, "post")}
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
                  <Tag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No categories yet</h3>
                  <p className="text-muted-foreground mt-2">Create your first category to organize your posts.</p>
                  <Button asChild className="mt-6 bg-hyber-orange hover:bg-hyber-red">
                    <Link href="/admin/blog/categories/new">
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
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/blog/category/${category.slug}`} target="_blank">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/blog/categories/edit/${category.slug}`}>
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
          <TabsContent value="authors">
            <AuthorList />
          </TabsContent>
        </Tabs>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                {itemToDelete?.type === "post"
                  ? "Are you sure you want to delete this post? This action cannot be undone."
                  : "Are you sure you want to delete this category? This will remove the category from all posts. This action cannot be undone."}
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
