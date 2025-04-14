import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPostsByCategory, getCategories } from "@/lib/blog-utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === params.slug)

  if (!category) {
    return {
      title: "Category Not Found - HyberHost",
      description: "The requested blog category could not be found.",
    }
  }

  return {
    title: `${category.name} - HyberHost Blog`,
    description: category.description || `Browse all posts in the ${category.name} category`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === params.slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(params.slug)

  // Get category names by ID
  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds
      .map((id) => {
        const cat = categories.find((c) => c.id === id)
        return cat ? cat : null
      })
      .filter(Boolean)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.name}</h1>
          {category.description && (
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{category.description}</p>
          )}
        </div>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-accent"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog/category/${cat.slug}`}
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                cat.id === category.id ? "bg-hyber-orange text-white hover:bg-hyber-red" : "border hover:bg-accent"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Posts */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col h-full">
                <div className="relative h-48">
                  <Image
                    src={post.coverImage || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {getCategoryNames(post.categories).map(
                      (cat) =>
                        cat && (
                          <Badge
                            key={cat.id}
                            variant="outline"
                            className="bg-hyber-orange/10 text-hyber-orange border-hyber-orange/20"
                          >
                            {cat.name}
                          </Badge>
                        ),
                    )}
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-hyber-orange transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.publishedAt || post.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-hyber-orange hover:text-hyber-red transition-colors"
                  >
                    Read more →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {posts.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">No posts found in this category. Check back soon!</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/blog" className="text-hyber-orange hover:text-hyber-red transition-colors">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </div>
  )
}
