import { format } from "date-fns"
import type { ReactNode } from "react"

interface PostHeaderProps {
  title: string
  publishedAt: string
  categories: ReactNode
}

export function PostHeader({ title, publishedAt, categories }: PostHeaderProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8 mb-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {categories}
          <span className="text-sm text-muted-foreground">
            {publishedAt ? format(new Date(publishedAt), "MMMM d, yyyy") : ""}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{title}</h1>
      </div>
    </div>
  )
}
