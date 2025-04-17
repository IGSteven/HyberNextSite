'use server';

import { revalidatePath } from "next/cache"
import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const DATA_FILE_PATH = path.join(process.cwd(), "data", "blog-data.json")

async function readBlogData() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading blog data:", error)
    return { posts: [], categories: [], authors: [] }
  }
}

async function writeBlogData(data: any) {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error writing blog data:", error)
    return false
  }
}

export async function createCategory(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string

    if (!name || !slug) {
      return { success: false, error: "Name and slug are required" }
    }

    const blogData = await readBlogData()

    const categoryExists = blogData.categories.some((cat: any) => cat.slug === slug)
    if (categoryExists) {
      return { success: false, error: "Category with this slug already exists" }
    }

    const newCategory = {
      id: uuidv4(),
      name,
      slug,
      description: description || "",
    }

    blogData.categories.push(newCategory)

    const writeSuccess = await writeBlogData(blogData)
    if (!writeSuccess) {
      return { success: false, error: "Failed to write blog data" }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error creating category:", error)
    return { success: false, error: error.message || "Failed to create category" }
  }
}

export async function updateCategory(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const slug = formData.get("slug") as string

    if (!id || !name || !slug) {
      return { success: false, error: "ID, name, and slug are required" }
    }

    const blogData = await readBlogData()

    const categoryIndex = blogData.categories.findIndex((cat: any) => cat.id === id)
    if (categoryIndex === -1) {
      return { success: false, error: "Category not found" }
    }

    blogData.categories[categoryIndex] = {
      id,
      name,
      slug,
      description: description || "",
    }

    const writeSuccess = await writeBlogData(blogData)
    if (!writeSuccess) {
      return { success: false, error: "Failed to write blog data" }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating category:", error)
    return { success: false, error: error.message || "Failed to update category" }
  }
}

export async function createPost(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const coverImage = formData.get("coverImage") as string
    const status = formData.get("status") as "published" | "draft"
    const featured = formData.get("featured") === "on"
    const authorId = formData.get("authorId") as string
    const publishDateStr = formData.get("publishDate") as string | null

    if (!title || !excerpt || !content) {
      return { success: false, error: "Title, excerpt, and content are required" }
    }

    const blogData = await readBlogData()

    const newPost = {
      id: uuidv4(),
      title,
      slug: title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      excerpt,
      content,
      coverImage: coverImage || null,
      authorId: authorId || "hyberhost-team",
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: status === "published" ? publishDateStr || new Date().toISOString() : null,
      status,
      featured,
    }

    // Extract category IDs from form data
    const categoryIds: string[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("category-") && value === "on") {
        categoryIds.push(key.replace("category-", ""))
      }
    }
    newPost.categories = categoryIds

    blogData.posts.push(newPost)

    const writeSuccess = await writeBlogData(blogData)
    if (!writeSuccess) {
      return { success: false, error: "Failed to write blog data" }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error creating post:", error)
    return { success: false, error: error.message || "Failed to create post" }
  }
}

export async function updatePost(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const coverImage = formData.get("coverImage") as string
    const status = formData.get("status") as "published" | "draft"
    const featured = formData.get("featured") === "on"
    const authorId = formData.get("authorId") as string
    const publishDateStr = formData.get("publishDate") as string | null

    if (!id || !title || !excerpt || !content) {
      return { success: false, error: "ID, title, excerpt, and content are required" }
    }

    const blogData = await readBlogData()

    const postIndex = blogData.posts.findIndex((post: any) => post.id === id)
    if (postIndex === -1) {
      return { success: false, error: "Post not found" }
    }

    const updatedPost = {
      id,
      title,
      slug: title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      excerpt,
      content,
      coverImage: coverImage || null,
      authorId: authorId || "hyberhost-team",
      categories: [],
      createdAt: blogData.posts[postIndex].createdAt,
      updatedAt: new Date().toISOString(),
      publishedAt: status === "published" ? publishDateStr || new Date().toISOString() : null,
      status,
      featured,
    }

    // Extract category IDs from form data
    const categoryIds: string[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("category-") && value === "on") {
        categoryIds.push(key.replace("category-", ""))
      }
    }
    updatedPost.categories = categoryIds

    blogData.posts[postIndex] = updatedPost

    const writeSuccess = await writeBlogData(blogData)
    if (!writeSuccess) {
      return { success: false, error: "Failed to write blog data" }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating post:", error)
    return { success: false, error: error.message || "Failed to update post" }
  }
}

export async function deletePost(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const blogData = await readBlogData()

    const postIndex = blogData.posts.findIndex((post: any) => post.id === id)
    if (postIndex === -1) {
      return { success: false, error: "Post not found" }
    }

    blogData.posts.splice(postIndex, 1)

    const writeSuccess = await writeBlogData(blogData)
    if (!writeSuccess) {
      return { success: false, error: "Failed to write blog data" }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting post:", error)
    return { success: false, error: error.message || "Failed to delete post" }
  }
}

export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const blogData = await readBlogData()

    const categoryIndex = blogData.categories.findIndex((cat: any) => cat.id === id)
    if (categoryIndex === -1) {
      return { success: false, error: "Category not found" }
    }

    blogData.categories.splice(categoryIndex, 1)

    // Remove category from posts
    blogData.posts.forEach((post: any) => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories = post.categories.filter((catId: string) => catId !== id)
      }
    })

    const writeSuccess = await writeBlogData(blogData)
    if (!writeSuccess) {
      return { success: false, error: "Failed to write blog data" }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting category:", error)
    return { success: false, error: error.message || "Failed to delete category" }
  }
}

export async function createAuthor(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const title = formData.get("title") as string
    const bio = formData.get("bio") as string
    const avatar = formData.get("avatar") as string
    const twitter = formData.get("twitter") as string
    const linkedin = formData.get("linkedin") as string
    const github = formData.get("github") as string
    const discord = formData.get("discord") as string
    const website = formData.get("website") as string

    if (!name || !slug) {
      return { success: false, error: "Name and slug are required" }
    }

    const blogData = await readBlogData()

    const authorExists = blogData.authors.some((author: any) => author.slug === slug)
    if (authorExists) {
      return { success: false, error: "Author with this slug already exists" }
    }

    const newAuthor = {
      id: uuidv4(),
      name,
      slug,
      title: title || "",
      bio: bio || "",
      avatar: avatar || "",
      social: {
        twitter: twitter || "",
        linkedin: linkedin || "",
        github: github || "",
        discord: discord || "",
        website: website || "",
      },
    }

    blogData.authors.push(newAuthor)

    const writeSuccess = await writeBlogData(blogData)
    if (!writeSuccess) {
      return { success: false, error: "Failed to write blog data" }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error creating author:", error)
    return { success: false, error: error.message || "Failed to create author" }
  }
}

export async function updateAuthor(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const title = formData.get("title") as string
    const bio = formData.get("bio") as string
    const avatar = formData.get("avatar") as string
    const twitter = formData.get("twitter") as string
    const linkedin = formData.get("linkedin") as string
    const github = formData.get("github") as string
    const discord = formData.get("discord") as string
    const website = formData.get("website") as string

    if (!id || !name || !slug) {
      return { success: false, error: "ID, name, and slug are required" }
    }

    const blogData = await readBlogData()

    const authorIndex = blogData.authors.findIndex((author: any) => author.id === id)
    if (authorIndex === -1) {
      return { success: false, error: "Author not found" }
    }

    blogData.authors[authorIndex] = {
      id,
      name,
      slug,
      title: title || "",
      bio: bio || "",
      avatar: avatar || "",
      social: {
        twitter: twitter || "",
        linkedin: linkedin || "",
        github: github || "",
        discord: discord || "",
        website: website || "",
      },
    }

    const writeSuccess = await writeBlogData(blogData)
    if (!writeSuccess) {
      return { success: false, error: "Failed to write blog data" }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating author:", error)
    return { success: false, error: error.message || "Failed to update author" }
  }
}

export async function deleteAuthor(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const blogData = await readBlogData()

    const authorIndex = blogData.authors.findIndex((author: any) => author.id === id)
    if (authorIndex === -1) {
      return { success: false, error: "Author not found" }
    }

    blogData.authors.splice(authorIndex, 1)

    // Reassign posts to default author
    const defaultAuthor = blogData.authors[0] || {
      id: "default",
      name: "HyberHost Team",
      slug: "hyberhost-team",
      bio: "The official HyberHost team account.",
      avatar: "/double-h-monogram.png",
    }

    blogData.posts.forEach((post: any) => {
      if (post.authorId === id) {
        post.authorId = defaultAuthor.id
      }
    })

    const writeSuccess = await writeBlogData(blogData)
    if (!writeSuccess) {
      return { success: false, error: "Failed to write blog data" }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting author:", error)
    return { success: false, error: error.message || "Failed to delete author" }
  }
}
