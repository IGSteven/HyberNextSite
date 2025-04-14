import { getAuthorBySlug } from "@/lib/blog-utils"
import { notFound } from "next/navigation"
import AuthorForm from "../../author-form"

interface EditAuthorPageProps {
  params: {
    slug: string
  }
}

export default async function EditAuthorPage({ params }: EditAuthorPageProps) {
  const author = await getAuthorBySlug(params.slug)

  if (!author) {
    notFound()
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AuthorForm author={author} isEdit={true} />
      </div>
    </div>
  )
}
