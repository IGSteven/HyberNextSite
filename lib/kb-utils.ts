import type { KBArticle, KBCategory } from "./kb-types"
import kbData from "@/data/kb-data.json"
import { getBlogData } from "./blog-utils"
import type { Author } from "./blog-types"

// Get all KB categories
export async function getAllCategories(): Promise<KBCategory[]> {
  return kbData.categories
}

// Get root categories (categories without a parent)
export async function getRootCategories(): Promise<KBCategory[]> {
  return kbData.categories.filter((category) => !category.parentId)
}

// Get subcategories of a specific category
export async function getSubcategories(categoryId: string): Promise<KBCategory[]> {
  return kbData.categories.filter((category) => category.parentId === categoryId)
}

// Get child categories for a given parent category ID
export async function getChildCategories(parentId: string): Promise<KBCategory[]> {
  return kbData.categories.filter((category) => category.parentId === parentId)
}

// Get category by ID
export async function getCategoryById(id: string): Promise<KBCategory | undefined> {
  return kbData.categories.find((category) => category.id === id)
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<KBCategory | undefined> {
  return kbData.categories.find((category) => category.slug === slug)
}

// Get all KB articles
export async function getAllArticles(): Promise<KBArticle[]> {
  return kbData.articles
}

// Get published KB articles
export async function getPublishedArticles(): Promise<KBArticle[]> {
  return kbData.articles.filter((article) => article.status === "published")
}

// Get KB article by slug
export async function getArticleBySlug(slug: string): Promise<KBArticle | undefined> {
  return kbData.articles.find((article) => article.slug === slug)
}

// Get KB articles by category ID
export async function getArticlesByCategoryId(categoryId: string): Promise<KBArticle[]> {
  return kbData.articles.filter(
    (article) => article.categoryIds && article.categoryIds.includes(categoryId) && article.status === "published",
  )
}

// Get KB articles by category (matches the function signature expected by the category page)
export async function getArticlesByCategory(categoryId: string): Promise<KBArticle[]> {
  return getArticlesByCategoryId(categoryId)
}

// Get KB articles by category slug
export async function getArticlesByCategorySlug(slug: string): Promise<KBArticle[]> {
  const category = await getCategoryBySlug(slug)
  if (!category) return []
  return getArticlesByCategoryId(category.id)
}

// Get KB articles by author
export async function getKBArticlesByAuthor(authorId: string): Promise<KBArticle[]> {
  return kbData.articles.filter((article) => article.authorId === authorId && article.status === "published")
}

// Get author for an article
export async function getAuthorForArticle(authorId: string): Promise<Author | null> {
  const data = await getBlogData()
  return data.authors.find((author) => author.id === authorId) || null
}

// Search KB articles
export async function searchArticles(query: string): Promise<KBArticle[]> {
  if (!query) return []

  const lowerQuery = query.toLowerCase()

  return kbData.articles.filter((article) => {
    // Only include published articles
    if (article.status !== "published") return false

    // Search in title, content, excerpt, tags
    return (
      article.title.toLowerCase().includes(lowerQuery) ||
      (article.content && article.content.toLowerCase().includes(lowerQuery)) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(lowerQuery)) ||
      (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
    )
  })
}

// Get breadcrumb trail for a category
export async function getCategoryBreadcrumbs(categoryId: string): Promise<KBCategory[]> {
  const breadcrumbs: KBCategory[] = []
  let currentCategory = await getCategoryById(categoryId)

  while (currentCategory) {
    breadcrumbs.unshift(currentCategory)
    if (!currentCategory.parentId) break
    currentCategory = await getCategoryById(currentCategory.parentId)
  }

  return breadcrumbs
}

// Get breadcrumbs for a category (matches the function signature expected by the category page)
export async function getBreadcrumbsForCategory(categoryId: string): Promise<KBCategory[]> {
  return getCategoryBreadcrumbs(categoryId)
}

// Get related articles
export async function getRelatedArticles(articleId: string, limit = 3): Promise<KBArticle[]> {
  const article = kbData.articles.find((a) => a.id === articleId)
  if (!article) return []

  // Get articles from the same category
  const sameCategory = kbData.articles.filter(
    (a) =>
      a.id !== articleId &&
      a.categoryIds &&
      article.categoryIds &&
      a.categoryIds.some((id) => article.categoryIds.includes(id)) &&
      a.status === "published",
  )

  // If we have enough articles from the same category, return them
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }

  // Otherwise, get articles with similar tags
  const articleTags = article.tags || []
  const withTags = kbData.articles.filter(
    (a) =>
      a.id !== articleId &&
      a.categoryIds &&
      article.categoryIds &&
      !a.categoryIds.some((id) => article.categoryIds.includes(id)) &&
      a.status === "published" &&
      a.tags &&
      a.tags.some((tag) => articleTags.includes(tag)),
  )

  // Combine and limit
  return [...sameCategory, ...withTags].slice(0, limit)
}

// Create a type definition file for KB data
export type { KBArticle, KBCategory }
