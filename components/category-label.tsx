import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  slug: string
}

interface CategoryLabelProps extends React.HTMLAttributes<HTMLAnchorElement> {
  category: Category
}

export function CategoryLabel({ category, className, ...props }: CategoryLabelProps) {
  return (
    <Link
      href={`/blog/category/${category.slug}`}
      className={cn(
        "inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80 transition-colors",
        className,
      )}
      {...props}
    >
      {category.name}
    </Link>
  )
}
