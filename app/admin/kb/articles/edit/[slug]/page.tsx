import { notFound } from "next/navigation"
import { ArticleForm } from "../../article-form"
import { getArticleBySlug } from "@/lib/kb-utils"

interface EditArticlePageProps {
  params: {
    slug: string
  }
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Knowledge Base Article</h1>
        <ArticleForm article={article} />
      </div>
    </div>
  )
}
