export interface KBCategory {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  order?: number
}

export interface KBArticle {
  id: string
  title: string
  slug: string
  content?: string
  excerpt?: string
  categoryIds: string[]
  categoryId?: string // For backward compatibility
  authorId?: string
  status: "draft" | "published"
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface KBState {
  articles: KBArticle[]
  categories: KBCategory[]
}
