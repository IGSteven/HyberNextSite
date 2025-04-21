import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getAuthorBySlug, getPostsByAuthor, getCategories } from "@/lib/blog-utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Twitter,
  Linkedin,
  Github,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Twitch,
  Codepen,
  Dribbble,
  Figma,
  SunMediumIcon as Medium,
  Slack,
  DiscIcon as Discord,
} from "lucide-react"
import { KBCard } from "@/components/ui/kb-card"
import type { Metadata } from "next"
import { getKBArticlesByAuthor } from "@/lib/kb-utils"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug)

  if (!author) {
    return {
      title: "Author Not Found",
      description: "The requested author could not be found.",
    }
  }

  return {
    title: `${author.name}'s Blog`,
    description: author.bio || `Articles by ${author.name}`,
  }
}

// Helper function to get the appropriate icon for a platform
const getPlatformIcon = (platform: string) => {
  const iconProps = { className: "h-5 w-5" }

  switch (platform.toLowerCase()) {
    case "twitter":
      return <Twitter {...iconProps} />
    case "linkedin":
      return <Linkedin {...iconProps} />
    case "github":
      return <Github {...iconProps} />
    case "facebook":
      return <Facebook {...iconProps} />
    case "instagram":
      return <Instagram {...iconProps} />
    case "youtube":
      return <Youtube {...iconProps} />
    case "twitch":
      return <Twitch {...iconProps} />
    case "codepen":
      return <Codepen {...iconProps} />
    case "dribbble":
      return <Dribbble {...iconProps} />
    case "figma":
      return <Figma {...iconProps} />
    case "medium":
      return <Medium {...iconProps} />
    case "slack":
      return <Slack {...iconProps} />
    case "discord":
      return <Discord {...iconProps} />
    default:
      return <Globe {...iconProps} />
  }
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = await getAuthorBySlug(params.slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const categories = await getCategories()

  // Get KB articles by author
  const kbArticles = await getKBArticlesByAuthor(author.id)

  // Get category names by ID
  const getCategoryNames = (categoryIds: string[]) => {
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

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex flex-col items-center mb-8">
            {author.avatar && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src={author.avatar || "/placeholder.svg"}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 128px"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{author.name}</h1>
            {author.title && <p className="mt-1 text-lg text-hyber-orange">{author.title}</p>}
            {author.bio && <p className="mt-4 text-lg text-muted-foreground">{author.bio}</p>}

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              {/* Original social links */}
              {author.social &&
                Object.entries(author.social).map(([platform, handle]) => {
                  if (!handle) return null

                  let href = ""
                  switch (platform) {
                    case "twitter":
                      href = `https://twitter.com/${handle}`
                      break
                    case "linkedin":
                      href = `https://linkedin.com/in/${handle}`
                      break
                    case "github":
                      href = `https://github.com/${handle}`
                      break
                    case "website":
                      href = handle.startsWith("http") ? handle : `https://${handle}`
                      break
                    default:
                      return null
                  }

                  return (
                    <a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-hyber-orange transition-colors"
                      title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                    >
                      {getPlatformIcon(platform)}
                      <span className="sr-only">{platform}</span>
                    </a>
                  )
                })}

              {/* New platform links - with proper type checking */}
              {author.links &&
                Array.isArray(author.links) &&
                author.links.map((link, index) => {
                  if (!link.url) return null

                  return (
                    <a
                      key={`${link.platform}-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-hyber-orange transition-colors"
                      title={link.platform}
                    >
                      {getPlatformIcon(link.platform)}
                      <span className="sr-only">{link.platform}</span>
                    </a>
                  )
                })}
            </div>
          </div>
        </div>

        {kbArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Knowledge Base Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kbArticles.map((article) => (
                <KBCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Articles by {author.name}</h2>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found by this author.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="flex flex-col h-full">
                  <div className="relative h-48">
                    <Image
                      src={post.coverImage || "/placeholder.svg?height=400&width=600&query=blog"}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {getCategoryNames(post.categories || []).map(
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
          )}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog" className="text-hyber-orange hover:text-hyber-red transition-colors">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </div>
  )
}
