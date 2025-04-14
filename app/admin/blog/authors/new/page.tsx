import AuthorForm from "../author-form"

export const metadata = {
  title: "Create New Author - HyberHost Admin",
  description: "Create a new blog author",
}

export default function NewAuthorPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AuthorForm />
      </div>
    </div>
  )
}
