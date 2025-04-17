// Blog utility functions for both client and server components
import type { BlogPost, Category, Author } from "./blog-types"
import path from "path"

// Use imported blog data directly
import blogData from "@/data/blog-data.json"

// Function to read blog data (works in both client and server)
export async function getBlogData() {
  try {
    // Return the imported data directly
    return {
      posts: blogData.posts || [],
      categories: blogData.categories || [],
      authors: blogData.authors || [],
    };
  } catch (error) {
    console.error("Error reading blog data:", error)
    // Return a default structure
    return { posts: [], categories: [], authors: [] }
  }
}

// Function to write blog data to the JSON file (with safety checks)
export async function writeBlogData(data: any) {
  try {
    // Only run server-side code when on the server
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const fullPath = path.join(process.cwd(), "data", "blog-data.json");
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf8");
    } else {
      console.warn("Cannot write blog data on the client side");
      return false;
    }
  } catch (error) {
    console.error("Error writing blog data:", error)
    return false;
  }
}

// Function to get all blog posts
export async function getPosts(): Promise<BlogPost[]> {
  const data = await getBlogData()
  return data.posts || []
}

// Function to get a blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts()
  return posts.find((post) => post.slug === slug) || null
}

// Function to get all categories
export async function getCategories(): Promise<Category[]> {
  const data = await getBlogData()
  return data.categories || []
}

// Function to get a category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  const categories = await getCategories()
  return categories.find((category) => category.id === id) || null
}

// Function to get a category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories()
  return categories.find((category) => category.slug === slug) || null
}

// Function to get all authors
export async function getAuthors(): Promise<Author[]> {
  const data = await getBlogData()
  return data.authors || []
}

// Function to get an author by ID
export async function getAuthorById(id: string): Promise<Author | null> {
  const authors = await getAuthors()
  return authors.find((author) => author.id === id) || null
}

// Function to get an author by slug
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const authors = await getAuthors()
  return authors.find((author) => author.slug === slug) || null
}

// Function to get the default author
export async function getDefaultAuthor(): Promise<Author> {
  const authors = await getAuthors()
  return (
    authors[0] || {
      id: "default",
      name: "HyberHost Team",
      slug: "hyberhost-team",
      bio: "The official HyberHost team account.",
      avatar: "/double-h-monogram.png",
    }
  )
}

// Function to get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getPosts()
  return posts.filter((post) => post.featured && post.status === "published")
}

// Function to get published posts
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getPosts()
  return posts.filter((post) => post.status === "published")
}

// Function to get posts by category
export async function getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  return posts.filter(
    (post) => post.categoryId === categoryId || (post.categories && post.categories.includes(categoryId)),
  )
}

// Function to get posts by author
export async function getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  return posts.filter((post) => post.authorId === authorId)
}
