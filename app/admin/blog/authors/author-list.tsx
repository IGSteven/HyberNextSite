"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2, AlertCircle } from "lucide-react"
import { deleteAuthor } from "@/app/actions/blog-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Author } from "@/lib/blog-types"
import { getAuthors } from "@/lib/blog-utils"

interface AuthorListProps {
  authors?: Author[]
}

export default function AuthorList({ authors: propAuthors }: AuthorListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [authors, setAuthors] = useState<Author[]>(propAuthors || [])
  const [isLoading, setIsLoading] = useState(propAuthors === undefined)
  const [error, setError] = useState<string | null>(null)

  // If authors are not provided as props, fetch them
  useEffect(() => {
    if (propAuthors) {
      setAuthors(propAuthors)
      return
    }

    const fetchAuthors = async () => {
      try {
        setIsLoading(true)

        // First try to get authors from the blog-utils function
        try {
          const fetchedAuthors = await getAuthors()
          if (fetchedAuthors && fetchedAuthors.length > 0) {
            console.log("Authors fetched from getAuthors:", fetchedAuthors)
            setAuthors(fetchedAuthors)
            setIsLoading(false)
            return
          }
        } catch (utilsError) {
          console.error("Error fetching authors from getAuthors:", utilsError)
        }

        // If that fails, try the API endpoint
        const response = await fetch("/api/admin/blog")
        const data = await response.json()

        if (data.success && data.authors) {
          console.log("Authors fetched from API:", data.authors)
          setAuthors(data.authors)
        } else if (data.success && !data.authors) {
          // If API returns success but no authors, try to extract from the data
          // This handles cases where the API might return authors in a different structure
          const possibleAuthors = extractAuthorsFromData(data)
          if (possibleAuthors.length > 0) {
            console.log("Authors extracted from API data:", possibleAuthors)
            setAuthors(possibleAuthors)
          } else {
            // Add a default author if none are found
            const defaultAuthor = createDefaultAuthor()
            console.log("Adding default author:", defaultAuthor)
            setAuthors([defaultAuthor])
          }
        } else {
          setError(data.error || "Failed to fetch authors")
        }
      } catch (error) {
        console.error("Failed to fetch authors:", error)
        setError("An error occurred while fetching authors")

        // Add a default author if there's an error
        const defaultAuthor = createDefaultAuthor()
        console.log("Adding default author due to error:", defaultAuthor)
        setAuthors([defaultAuthor])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAuthors()
  }, [propAuthors])

  // Helper function to extract authors from different data structures
  const extractAuthorsFromData = (data: any): Author[] => {
    const extractedAuthors: Author[] = []

    // Check if data.posts exists and has authorId or author information
    if (data.posts && Array.isArray(data.posts)) {
      const authorMap = new Map<string, Author>()

      data.posts.forEach((post: any) => {
        if (post.author && typeof post.author === "object") {
          // If post has a full author object
          if (!authorMap.has(post.author.id)) {
            authorMap.set(post.author.id, post.author)
          }
        } else if (post.authorId) {
          // If post only has authorId, create a placeholder author
          if (!authorMap.has(post.authorId)) {
            authorMap.set(post.authorId, {
              id: post.authorId,
              name: `Author ${post.authorId}`,
              slug: `author-${post.authorId}`,
              bio: "",
            })
          }
        }
      })

      authorMap.forEach((author) => extractedAuthors.push(author))
    }

    // Add Steven Smith if no authors were found
    if (extractedAuthors.length === 0) {
      extractedAuthors.push(createDefaultAuthor())
    }

    return extractedAuthors
  }

  // Create a default author (Steven Smith)
  const createDefaultAuthor = (): Author => {
    return {
      id: "steven-smith",
      name: "Steven Smith",
      slug: "steven-smith",
      bio: "Technical writer and web hosting expert with over 10 years of experience in the industry.",
      avatar: "/placeholder.svg",
      title: "Technical Writer",
    }
  }

  const handleDelete = async (id: string) => {
    setIsDeleting(id)
    try {
      const result = await deleteAuthor(id)
      if (result && result.success) {
        setAuthors(authors.filter((author) => author.id !== id))
      } else {
        setError("Failed to delete author")
      }
    } catch (error) {
      console.error("Error deleting author:", error)
      setError("An error occurred while deleting the author")
    } finally {
      setIsDeleting(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-hyber-orange"></div>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Authors</h2>
        <Link href="/admin/blog/authors/new">
          <Button>Add New Author</Button>
        </Link>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No authors found. Create your first author.
                </TableCell>
              </TableRow>
            ) : (
              authors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell>
                    {author.avatar ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={author.avatar || "/placeholder.svg"}
                          alt={author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {author.name.charAt(0)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{author.name}</TableCell>
                  <TableCell>{author.title || "-"}</TableCell>
                  <TableCell>{author.slug}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="outline" size="icon">
                        <Link href={`/blog/author/${author.slug}`} target="_blank">
                          <span className="sr-only">View</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-eye"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </Link>
                      </Button>
                      <Link href={`/admin/blog/authors/edit/${author.slug}`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the author. Posts by this author will be reassigned to the
                              default author.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(author.id)}
                              disabled={isDeleting === author.id}
                            >
                              {isDeleting === author.id ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
