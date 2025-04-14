import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronLeft } from "lucide-react"
import { searchArticles } from "@/lib/kb-utils"
import { KBSearchForm } from "@/components/kb-search-form"

interface SearchPageProps {
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  return {
    title: `Search: ${query} - Knowledge Base - HyberHost`,
    description: `Search results for "${query}" in the HyberHost Knowledge Base.`,
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const results = query ? await searchArticles(query) : []

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/kb" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Knowledge Base
        </Link>
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {results.length} {results.length === 1 ? "result" : "results"} for &quot;{query}&quot;
        </p>

        <div className="max-w-md mb-8">
          <KBSearchForm />
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {article.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/kb/${article.slug}`} className="flex items-center justify-between">
                    <span>Read Article</span>
                    <BookOpen className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No results found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t find any articles matching your search. Try using different keywords or browse our
            categories.
          </p>
          <Button asChild>
            <Link href="/kb">Browse All Categories</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
