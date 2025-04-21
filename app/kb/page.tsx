import Link from "next/link"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronRight } from "lucide-react"
import { getRootCategories, getPublishedArticles } from "@/lib/kb-utils"
import { KBSearchForm } from "@/components/kb-search-form"
import { migrateDataIfNeeded } from "@/lib/mongodb"

export const metadata: Metadata = {
  title: "Knowledge Base - HyberHost",
  description: "Find answers to common questions and learn how to use HyberHost services.",
}

export default async function KnowledgeBasePage() {
  // Ensure data is migrated if needed before fetching
  await migrateDataIfNeeded();
  
  const rootCategories = await getRootCategories()
  const featuredArticles = (await getPublishedArticles()).filter((article) => article.featured)

  // Show message if no content is found
  if (rootCategories.length === 0 && featuredArticles.length === 0) {
    return (
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Knowledge Base</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and learn how to use HyberHost services.
          </p>
          <div className="mt-12">
            <p className="text-muted-foreground">No content found. Check back soon!</p>
            <p className="mt-4 text-muted-foreground">
              If you're seeing this message and expect to see KB content, check the MongoDB connection and data migration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Knowledge Base</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions and learn how to use HyberHost services.
        </p>

        <div className="mt-8 max-w-md mx-auto">
          <KBSearchForm />
        </div>
      </div>

      {rootCategories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {rootCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/kb/category/${category.slug}`} className="flex items-center justify-between">
                    <span>Browse Articles</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {featuredArticles.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
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
        </div>
      )}
    </div>
  )
}
