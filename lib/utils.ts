import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BlogState, BlogPost, Category, Author } from "./blog-types"
import blogData from "@/data/blog-data.json"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getBlogData(): Promise<BlogState> {
  // Simulate fetching data from a database or CMS
  return blogData
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const data = await getBlogData()
  return data.posts.filter((post) => post.status === "published")
}

export async function getCategories(): Promise<Category[]> {
  const data = await getBlogData()
  return data.categories
}

export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  const data = await getBlogData()
  return data.authors.find((author) => author.slug === slug)
}

export async function getAuthorById(id: string): Promise<Author | undefined> {
  const data = await getBlogData()
  return data.authors.find((author) => author.id === id)
}

export async function getDefaultAuthor(): Promise<Author> {
  const data = await getBlogData()
  return data.authors[0]
}

export const truncate = (str: string, length: number) => {
  if (!str) return ""
  return str.length > length ? str.substring(0, length) + "..." : str
}
