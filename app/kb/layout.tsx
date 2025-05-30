import type { ReactNode } from "react"

export default function KnowledgeBaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  )
}
