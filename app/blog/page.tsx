import Link from "next/link"
import Image from "next/image"
import { getPublishedPosts, getCategories, getAuthorById, getDefaultAuthor } from "@/lib/blog-utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"
import type { Metadata } from "next"
import { migrateDataIfNeeded } from "@/lib/mongodb"

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest news, tutorials, and updates from HyberHost",
}

export default async function BlogPage() {
  // Ensure data is migrated if needed before fetching
  await migrateDataIfNeeded();
  
  const posts = await getPublishedPosts()
  const categories = await getCategories()

  // Get category names by ID
  const getCategoryNames = (categoryIds: string[]) => {
    // Handle if categoryIds is undefined or null
    if (!categoryIds) return [];
    
    return categoryIds
      .map((id) => {
        const category = categories.find((cat) => cat.id === id)
        return category ? category : null
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

  // Get featured posts
  const featuredPosts = posts.filter((post) => post.featured)
  // Get regular posts (non-featured)
  const regularPosts = posts.filter((post) => !post.featured)

  // Get authors for each post
  const getPostWithAuthor = async (post) => {
    let author
    if (post.authorId) {
      author = await getAuthorById(post.authorId)
    }
    if (!author) {
      author = await getDefaultAuthor()
    }
    return {
      ...post,
      author: author || { name: "HyberHost Team", slug: "hyberhost-team" },
    }
  }

  const featuredPostsWithAuthors = await Promise.all(featuredPosts.map(getPostWithAuthor))
  const regularPostsWithAuthors = await Promise.all(regularPosts.map(getPostWithAuthor))

  // Show message if no posts are found
  if (posts.length === 0) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Blog</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Latest news, tutorials, and updates from HyberHost
            </p>
          </div>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">No posts found. Check back soon!</p>
            <p className="mt-4 text-muted-foreground">
              If you're seeing this message and expect to see blog posts, check the MongoDB connection and data migration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Blog</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Latest news, tutorials, and updates from HyberHost
          </p>
        </div>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-accent"
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-accent"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Featured Posts */}
        {featuredPostsWithAuthors.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
            <div className="grid grid-cols-1 gap-8">
              {featuredPostsWithAuthors.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative h-64 md:h-full">
                      <Link href={`/blog/${post.slug}`} className="block w-full h-full">
                        <Image
                          src={post.coverImage || "/placeholder.svg?height=600&width=800&query=blog+post"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </Link>
                    </div>
                    <div className="p-6 flex flex-col">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {getCategoryNames(post.categories || [post.categoryId]).map(
                            (category) =>
                              category && (
                                <Badge
                                  key={category.id}
                                  variant="outline"
                                  className="bg-hyber-orange/10 text-hyber-orange border-hyber-orange/20"
                                >
                                  {category.name}
                                </Badge>
                              ),
                          )}
                        </div>
                        <CardTitle className="text-2xl">
                          <Link href={`/blog/${post.slug}`} className="hover:text-hyber-orange transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <Link
                            href={`/blog/author/${post.author.slug}`}
                            className="flex items-center gap-2 hover:text-hyber-orange"
                          >
                            <User className="h-4 w-4" />
                            <span>{post.author.name}</span>
                          </Link>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.publishedAt || post.createdAt || new Date().toISOString())}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 flex-grow">
                        <p className="text-muted-foreground">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="p-0 pt-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-hyber-orange hover:text-hyber-red transition-colors"
                        >
                          Read more →
                        </Link>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPostsWithAuthors.map((post) => (
              <Card key={post.id} className="flex flex-col h-full">
                <div className="relative h-48">
                  <Link href={`/blog/${post.slug}`} className="block w-full h-full">
                    <Image
                      src={post.coverImage || "/placeholder.svg?height=400&width=600&query=blog+post"}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-lg transition-transform hover:scale-105"
                    />
                  </Link>
                </div>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {getCategoryNames(post.categories || [post.categoryId]).map(
                      (category) =>
                        category && (
                          <Badge
                            key={category.id}
                            variant="outline"
                            className="bg-hyber-orange/10 text-hyber-orange border-hyber-orange/20"
                          >
                            {category.name}
                          </Badge>
                        ),
                    )}
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-hyber-orange transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/blog/author/${post.author.slug}`}
                      className="flex items-center gap-2 hover:text-hyber-orange"
                    >
                      <User className="h-4 w-4" />
                      <span>{post.author.name}</span>
                    </Link>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt || post.createdAt || new Date().toISOString())}</span>
                    </div>
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
            <p className="text-muted-foreground">No posts found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
