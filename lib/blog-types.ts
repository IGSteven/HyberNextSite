export interface KBArticle {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  authorId: string
  categoryIds: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string | null // null means draft
  status: "published" | "draft"
  featured: boolean
  tags?: string[]
  relatedArticles?: string[] // Array of article IDs
}

export interface KBCategory {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string // For nested categories
  order?: number // For custom ordering
}

export interface KBState {
  articles: KBArticle[]
  categories: KBCategory[]
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string // Changed to Markdown
  excerpt: string
  coverImage?: string
  authorId: string // Changed to authorId
  categories: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string | null // null means draft
  status: "published" | "draft"
  featured: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Author {
  id: string
  name: string
  slug: string
  title?: string
  bio?: string
  avatar?: string
  email?: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
    discord?: string
    website?: string
  }
  links?: {
    platform: string
    url: string
  }[]
  tags?: string[]
}
