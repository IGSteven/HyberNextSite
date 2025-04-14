import CategoryForm from "../category-form"

export const metadata = {
  title: "Create New Category - HyberHost Admin",
  description: "Create a new blog category",
}

export default function NewCategoryPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <CategoryForm />
      </div>
    </div>
  )
}
