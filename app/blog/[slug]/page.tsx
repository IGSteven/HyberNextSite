import { notFound } from "next/navigation"
// Remove revalidatePath import as we'll use a different approach
import type { Metadata } from "next"

import { MdxComponents } from "@/components/mdx-components"
import { PostHeader } from "@/components/post-header"
import { PostImage } from "@/components/post-image"
import { Layout } from "@/components/layout"
import { CategoryLabel } from "@/components/category-label"
import { getPostBySlug, getCategories, getAuthorById, getDefaultAuthor } from "@/lib/blog-utils"
import { Author } from "@/components/author"
import ReactMarkdown from "react-markdown"

type Props = {
  params: {
    slug: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const slug = params.slug
  if (!slug) {
    return {}
  }

  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  // Remove revalidatePath call from here

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  }
}

// Set a reasonable revalidation time for the blog post
export const revalidate = 3600; // Revalidate this page every hour

export default async function Page({ params, searchParams }: Props) {
  const slug = params.slug
  if (!slug) {
    notFound()
  }

  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Remove revalidatePath call from here

  const categories = await getCategories()
  const category = categories.find((category) => category.id === post.categoryId)

  let author = await getDefaultAuthor()

  if (post.authorId) {
    const authorResult = await getAuthorById(post.authorId)
    if (authorResult) {
      author = authorResult
    }
  }

  return (
    <Layout>
      <PostHeader
        title={post.title}
        publishedAt={post.publishedAt || post.createdAt || new Date().toISOString()}
        categories={category ? <CategoryLabel category={category} /> : null}
      />

      <PostImage src={post.coverImage} alt={post.title} />

      <div className="max-w-4xl mx-auto mt-8 prose dark:prose-invert">
        <ReactMarkdown components={MdxComponents}>{post.content}</ReactMarkdown>
      </div>

      <div className="max-w-4xl mx-auto">
        <Author author={author} />
      </div>
    </Layout>
  )
}
