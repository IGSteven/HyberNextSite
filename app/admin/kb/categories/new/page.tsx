import { CategoryForm } from "../category-form"

export default function NewCategoryPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Knowledge Base Category</h1>
        <CategoryForm />
      </div>
    </div>
  )
}
