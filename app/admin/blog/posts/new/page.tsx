import { getBlogData } from "@/lib/blog-utils"
import PostForm from "../post-form"

export const metadata = {
  title: "Create New Post - HyberHost Admin",
  description: "Create a new blog post",
}

export default async function NewPostPage() {
  const data = await getBlogData()
  return (
    <div className="py-12 px-4 sm:px:6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PostForm categories={data.categories} />
      </div>
    </div>
  )
}
