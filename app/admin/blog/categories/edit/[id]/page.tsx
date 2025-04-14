import { notFound } from "next/navigation"
import { getBlogData } from "@/lib/blog-utils"
import CategoryForm from "../../category-form"

export const metadata = {
  title: "Edit Category - HyberHost Admin",
  description: "Edit an existing blog category",
}

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  // Get the blog data
  const data = await getBlogData()

  // Check if data and categories exist
  if (!data || !data.categories) {
    console.error("Blog data or categories not found:", data)
    notFound()
  }

  // Find the category by ID
  const category = data.categories.find((c) => c.id === params.id)

  // If category not found, return 404
  if (!category) {
    console.error(`Category with ID ${params.id} not found`)
    notFound()
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <CategoryForm category={category} isEdit={true} />
      </div>
    </div>
  )
}
\
### 5. Fix the author avatar styling:
