// Replace the entire file with this server component that imports the client component

import { getBlogData } from "@/lib/blog-utils"
import PostFormClient from "./post-form-client"
import type { BlogPost, Category } from "@/lib/blog-types"

interface PostFormProps {
  post?: BlogPost
  categories?: Category[]
  isEdit?: boolean
}

export default async function PostForm({ post, isEdit = false }: PostFormProps) {
  // Fetch categories from the server
  const data = await getBlogData()

  // Pass the data to the client component
  return <PostFormClient post={post} categories={data.categories} isEdit={isEdit} />
}
