import type React from "react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 lg:max-w-5xl">
      <article className="prose prose-gray dark:prose-invert max-w-none">{children}</article>
    </div>
  )
}
