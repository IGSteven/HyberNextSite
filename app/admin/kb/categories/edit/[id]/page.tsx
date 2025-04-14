import { notFound } from "next/navigation"
import { CategoryForm } from "../../category-form"
import { getCategoryById } from "@/lib/kb-utils"

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const category = await getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Knowledge Base Category</h1>
        <CategoryForm category={category} />
      </div>
    </div>
  )
}
