"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Search, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import type { KBCategory, KBArticle } from "@/lib/blog-types"
import { Badge } from "@/components/ui/badge"

interface KBSidebarProps {
  categories?: KBCategory[] // Make categories optional
  currentCategoryId?: string
  currentArticleId?: string
}

export function KBSidebar({ categories = [], currentCategoryId, currentArticleId }: KBSidebarProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<KBArticle[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedQuery = useDebounce(searchQuery, 300)

  // Get root categories
  const rootCategories = (Array.isArray(categories) ? categories : []).filter((category) => !category.parentId)

  // Get subcategories for a specific category
  const getSubcategories = (categoryId: string) => {
    return (Array.isArray(categories) ? categories : []).filter((category) => category.parentId === categoryId)
  }

  // Check if a category is active
  const isCategoryActive = (categorySlug: string) => {
    return pathname === `/kb/category/${categorySlug}`
  }

  // Check if an article is active
  const isArticleActive = (articleSlug: string) => {
    return pathname === `/kb/${articleSlug}`
  }

  useEffect(() => {
    const searchArticles = async () => {
      if (!debouncedQuery) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)

      try {
        const response = await fetch(`/api/kb/search?query=${encodeURIComponent(debouncedQuery)}`)
        const data = await response.json()
        setSearchResults(data)
      } catch (error) {
        console.error("Error searching articles:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    searchArticles()
  }, [debouncedQuery])

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <div className="w-full md:w-64 lg:w-72 flex-shrink-0 border-r">
      <div className="p-4 sticky top-0">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-9 py-2 text-sm border rounded-md"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>

        {isSearching ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
          </div>
        ) : searchQuery ? (
          <div className="space-y-3">
            <h3 className="font-medium text-sm mb-2">Search Results</h3>
            {searchResults.length > 0 ? (
              <div className="max-h-[60vh] overflow-y-auto">
                {searchResults.slice(0, 5).map((article) => (
                  <Link
                    key={article.id}
                    href={`/kb/${article.slug}`}
                    className="block p-3 hover:bg-accent rounded-md transition-colors"
                    onClick={() => clearSearch()}
                  >
                    <h3 className="font-medium text-foreground">{article.title}</h3>
                    {article.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{article.excerpt}</p>
                    )}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{article.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-2">No results found</p>
            )}
          </div>
        ) : (
          <nav className="space-y-1">
            <Link
              href="/kb"
              className={cn(
                "block text-sm py-1.5 px-2 rounded-md hover:bg-accent",
                pathname === "/kb" && "bg-accent font-medium",
              )}
            >
              Home
            </Link>
            {rootCategories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                subcategories={getSubcategories(category.id)}
                currentCategoryId={currentCategoryId}
                isCategoryActive={isCategoryActive}
              />
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}

interface CategoryItemProps {
  category: KBCategory
  subcategories: KBCategory[]
  currentCategoryId?: string
  isCategoryActive: (slug: string) => boolean
}

function CategoryItem({ category, subcategories, currentCategoryId, isCategoryActive }: CategoryItemProps) {
  const isActive = category.id === currentCategoryId || isCategoryActive(category.slug)
  const [isOpen, setIsOpen] = useState(isActive)

  return (
    <div>
      <div className="flex items-center">
        {subcategories.length > 0 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mr-1 p-1 rounded-md hover:bg-accent"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            <ChevronRight className={cn("h-3 w-3 transition-transform", isOpen && "transform rotate-90")} />
          </button>
        )}
        <Link
          href={`/kb/category/${category.slug}`}
          className={cn(
            "flex-grow text-sm py-1.5 px-2 rounded-md hover:bg-accent",
            isActive && "bg-accent font-medium",
          )}
        >
          {category.name}
        </Link>
      </div>
      {isOpen && subcategories.length > 0 && (
        <ul className="ml-4 mt-1 space-y-1">
          {subcategories.map((subcategory) => (
            <CategoryItem
              key={subcategory.id}
              category={subcategory}
              subcategories={[]} // We're not supporting nested subcategories for now
              currentCategoryId={currentCategoryId}
              isCategoryActive={isCategoryActive}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
