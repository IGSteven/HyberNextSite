import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Author as AuthorType } from "@/lib/blog-types"
import {
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

interface AuthorProps {
  author: AuthorType
  className?: string
  showBio?: boolean
  size?: "sm" | "md" | "lg"
}

// Helper function to get the appropriate icon for a platform
const getPlatformIcon = (platform: string) => {
  const iconProps = { className: "h-4 w-4" }

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

export function Author({ author, className, showBio = false, size = "md" }: AuthorProps) {
  if (!author) return null

  const avatarSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const nameSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const titleSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Link href={`/blog/author/${author.slug}`} className="flex-shrink-0">
        {author.avatar ? (
          <div className={cn("relative rounded-full overflow-hidden", avatarSizes[size])}>
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              fill
              className="object-cover"
              sizes={`(max-width: 768px) ${size === "sm" ? "32px" : size === "md" ? "40px" : "48px"}, ${
                size === "sm" ? "32px" : size === "md" ? "40px" : "48px"
              }`}
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-muted text-muted-foreground",
              avatarSizes[size],
            )}
          >
            {author.name.charAt(0)}
          </div>
        )}
      </Link>
      <div className="flex flex-col">
        <Link
          href={`/blog/author/${author.slug}`}
          className={cn("font-medium hover:text-hyber-orange transition-colors", nameSizes[size])}
        >
          {author.name}
        </Link>
        {author.title && <p className={cn("text-muted-foreground", titleSizes[size])}>{author.title}</p>}
        {showBio && author.bio && <p className="mt-1 text-sm text-muted-foreground">{author.bio}</p>}

        {/* Social Links */}
        <div className="flex gap-2 mt-1">
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

          {/* New platform links */}
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
  )
}
