import { notFound } from "next/navigation"
import { getBlogData } from "@/lib/blog-utils"
import PostFormClient from "./post-form-client" // Import the client component

export const metadata = {
  title: "Edit Post - HyberHost Admin",
  description: "Edit an existing blog post",
}

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const data = await getBlogData()
  const post = data.posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PostFormClient post={post} categories={data.categories} isEdit={true} />
      </div>
    </div>
  )
}
