import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getArticleBySlug, getAuthorForArticle, getRelatedArticles, getBreadcrumbsForCategory } from "@/lib/kb-utils"
import { Author } from "@/components/author"
import { KBSidebar } from "@/components/kb-sidebar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Clock, Tag } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { MdxComponents } from "@/components/mdx-components"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Don't await params.slug - it's a string, not a Promise
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found - Knowledge Base",
    }
  }

  return {
    title: `${article.title} - Knowledge Base`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // Don't await params.slug - it's a string, not a Promise
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const author = await getAuthorForArticle(article.authorId)
  const relatedArticles = await getRelatedArticles(article.id)

  // Get breadcrumbs for the first category (primary category)
  const breadcrumbs = article.categoryIds.length > 0 ? await getBreadcrumbsForCategory(article.categoryIds[0]) : []

  // No need to serialize the content for ReactMarkdown

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/kb" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Knowledge Base
                </Link>
              </li>
              {breadcrumbs.map((category, index) => (
                <li key={category.id}>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    {index === breadcrumbs.length - 1 ? (
                      <span className="ml-1 text-sm font-medium text-muted-foreground md:ml-2">{category.name}</span>
                    ) : (
                      <Link
                        href={`/kb/category/${category.slug}`}
                        className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground md:ml-2"
                      >
                        {category.name}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* Article header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>Updated {formatDate(article.updatedAt)}</span>
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center">
                  <Tag className="mr-1 h-4 w-4" />
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Article content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown components={MdxComponents}>{article.content || ""}</ReactMarkdown>
          </div>

          {/* Author */}
          {author && (
            <div className="mt-12 pt-6 border-t">
              <h2 className="text-lg font-semibold mb-4">Article Author</h2>
              <Author author={author} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4">
          <KBSidebar currentArticleId={article.id} />
        </div>
      </div>
    </div>
  )
}
