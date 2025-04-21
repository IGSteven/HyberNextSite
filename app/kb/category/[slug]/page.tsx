import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getCategoryBySlug, getArticlesByCategory, getChildCategories, getBreadcrumbsForCategory } from "@/lib/kb-utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { KBSidebar } from "@/components/kb-sidebar"
import { BookOpen, ChevronRight, FolderOpen } from "lucide-react"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Don't await params.slug - it's a string, not a Promise
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: "Category Not Found - HyberHost Knowledge Base",
    }
  }

  return {
    title: `${category.name} - HyberHost Knowledge Base`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Don't await params.slug - it's a string, not a Promise
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const articles = await getArticlesByCategory(category.id)
  const childCategories = await getChildCategories(category.id)
  const breadcrumbs = await getBreadcrumbsForCategory(category.id)

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
              {breadcrumbs.slice(0, -1).map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <Link
                      href={`/kb/category/${breadcrumb.slug}`}
                      className="ml-1 text-sm font-medium text-muted-foreground hover:text-foreground md:ml-2"
                    >
                      {breadcrumb.name}
                    </Link>
                  </div>
                </li>
              ))}
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span className="ml-1 text-sm font-medium text-muted-foreground md:ml-2">{category.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Category header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            {category.description && <p className="text-lg text-muted-foreground">{category.description}</p>}
          </div>

          {/* Child categories */}
          {childCategories.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {childCategories.map((childCategory) => (
                  <Card key={childCategory.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{childCategory.name}</CardTitle>
                      {childCategory.description && <CardDescription>{childCategory.description}</CardDescription>}
                    </CardHeader>
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/kb/category/${childCategory.slug}`} className="flex items-center justify-between">
                          <span>Browse</span>
                          <FolderOpen className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Articles</h2>
            {articles.length > 0 ? (
              <div className="space-y-6">
                {articles.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
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
              <p className="text-muted-foreground">No articles found in this category.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4">
          <KBSidebar currentCategoryId={category.id} />
        </div>
      </div>
    </div>
  )
}
