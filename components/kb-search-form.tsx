"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, X, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import type { KBArticle } from "@/lib/kb-types"

export function KBSearchForm() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<KBArticle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()

  useEffect(() => {
    const searchArticles = async () => {
      if (!debouncedQuery) {
        setResults([])
        setIsLoading(false)
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      setIsOpen(true)

      try {
        const response = await fetch(`/api/kb/search?query=${encodeURIComponent(debouncedQuery)}`)
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error("Error searching articles:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    searchArticles()
  }, [debouncedQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      router.push(`/kb/search?q=${encodeURIComponent(query)}`)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the knowledge base..."
          className="w-full pl-10 pr-10 py-2 border rounded-lg"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </form>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-card border rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="p-2">
                {results.slice(0, 5).map((article) => (
                  <Link
                    key={article.id}
                    href={`/kb/${article.slug}`}
                    className="block p-3 hover:bg-accent rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
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
              {results.length > 5 && (
                <div className="p-2 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-center"
                    onClick={() => {
                      router.push(`/kb/search?q=${encodeURIComponent(query)}`)
                      setIsOpen(false)
                    }}
                  >
                    View all {results.length} results
                  </Button>
                </div>
              )}
            </div>
          ) : query ? (
            <div className="p-4 text-center text-muted-foreground">No results found for &quot;{query}&quot;</div>
          ) : null}
        </div>
      )}
    </div>
  )
}
