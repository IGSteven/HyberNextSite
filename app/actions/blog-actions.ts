'use server';

import { revalidatePath } from "next/cache"
import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { connectToDatabase, collections, useMongoStorage } from '@/lib/mongodb';
import { getBlogData, writeBlogData as writeDataUtil } from '@/lib/blog-utils';

const DATA_FILE_PATH = path.join(process.cwd(), "data", "blog-data.json")

// Now using the utility from blog-utils.ts which handles both storage methods
async function readBlogData() {
  return getBlogData();
}

// Now using the utility from blog-utils.ts which handles both storage methods
async function writeBlogData(data: any) {
  return writeDataUtil(data);
}

export async function createCategory(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string

    if (!name || !slug) {
      return { success: false, error: "Name and slug are required" }
    }

    const blogData = await readBlogData()

    const categoryExists = blogData.categories.some((cat: any) => cat.slug === slug)
    if (categoryExists) {
      return { success: false, error: "Category with this slug already exists" }
    }

    const newCategory = {
      id: uuidv4(),
      name,
      slug,
      description: description || "",
    }

    // If using MongoDB, we can directly add to the database
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        await db.collection(collections.blogCategories).insertOne(newCategory);
      } catch (error) {
        console.error("Error creating category in MongoDB:", error);
        return { success: false, error: "Failed to create category in database" };
      }
    } else {
      // Otherwise use the JSON approach
      blogData.categories.push(newCategory);
      const writeSuccess = await writeBlogData(blogData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write blog data" };
      }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error creating category:", error)
    return { success: false, error: error.message || "Failed to create category" }
  }
}

export async function updateCategory(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const slug = formData.get("slug") as string

    if (!id || !name || !slug) {
      return { success: false, error: "ID, name, and slug are required" }
    }

    const updatedCategory = {
      id,
      name,
      slug,
      description: description || "",
    }

    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        const result = await db.collection(collections.blogCategories).updateOne(
          { id },
          { $set: updatedCategory }
        );
        
        if (result.matchedCount === 0) {
          return { success: false, error: "Category not found" };
        }
      } catch (error) {
        console.error("Error updating category in MongoDB:", error);
        return { success: false, error: "Failed to update category in database" };
      }
    } else {
      const blogData = await readBlogData();
      const categoryIndex = blogData.categories.findIndex((cat: any) => cat.id === id);
      
      if (categoryIndex === -1) {
        return { success: false, error: "Category not found" };
      }
      
      blogData.categories[categoryIndex] = updatedCategory;
      
      const writeSuccess = await writeBlogData(blogData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write blog data" };
      }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating category:", error)
    return { success: false, error: error.message || "Failed to update category" }
  }
}

export async function createPost(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const coverImage = formData.get("coverImage") as string
    const status = formData.get("status") as "published" | "draft"
    const featured = formData.get("featured") === "on"
    const authorId = formData.get("authorId") as string
    const publishDateStr = formData.get("publishDate") as string | null

    if (!title || !excerpt || !content) {
      return { success: false, error: "Title, excerpt, and content are required" }
    }

    // Extract category IDs from form data
    const categoryIds: string[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("category-") && value === "on") {
        categoryIds.push(key.replace("category-", ""))
      }
    }

    const newPost = {
      id: uuidv4(),
      title,
      slug: title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      excerpt,
      content,
      coverImage: coverImage || null,
      authorId: authorId || "hyberhost-team",
      categories: categoryIds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: status === "published" ? publishDateStr || new Date().toISOString() : null,
      status,
      featured,
    }

    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        await db.collection(collections.blogPosts).insertOne(newPost);
      } catch (error) {
        console.error("Error creating post in MongoDB:", error);
        return { success: false, error: "Failed to create post in database" };
      }
    } else {
      const blogData = await readBlogData();
      blogData.posts.push(newPost);
      
      const writeSuccess = await writeBlogData(blogData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write blog data" };
      }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error creating post:", error)
    return { success: false, error: error.message || "Failed to create post" }
  }
}

export async function updatePost(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const coverImage = formData.get("coverImage") as string
    const status = formData.get("status") as "published" | "draft"
    const featured = formData.get("featured") === "on"
    const authorId = formData.get("authorId") as string
    const publishDateStr = formData.get("publishDate") as string | null

    if (!id || !title || !excerpt || !content) {
      return { success: false, error: "ID, title, excerpt, and content are required" }
    }

    // Extract category IDs from form data
    const categoryIds: string[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("category-") && value === "on") {
        categoryIds.push(key.replace("category-", ""))
      }
    }

    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        
        // First get the existing post to preserve createdAt
        const existingPost = await db.collection(collections.blogPosts).findOne({ id });
        if (!existingPost) {
          return { success: false, error: "Post not found" };
        }
        
        const updatedPost = {
          id,
          title,
          slug: title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, ""),
          excerpt,
          content,
          coverImage: coverImage || null,
          authorId: authorId || "hyberhost-team",
          categories: categoryIds,
          createdAt: existingPost.createdAt,
          updatedAt: new Date().toISOString(),
          publishedAt: status === "published" ? publishDateStr || new Date().toISOString() : null,
          status,
          featured,
        };
        
        await db.collection(collections.blogPosts).updateOne(
          { id },
          { $set: updatedPost }
        );
      } catch (error) {
        console.error("Error updating post in MongoDB:", error);
        return { success: false, error: "Failed to update post in database" };
      }
    } else {
      const blogData = await readBlogData();
      const postIndex = blogData.posts.findIndex((post: any) => post.id === id);
      
      if (postIndex === -1) {
        return { success: false, error: "Post not found" };
      }
      
      const updatedPost = {
        id,
        title,
        slug: title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
        excerpt,
        content,
        coverImage: coverImage || null,
        authorId: authorId || "hyberhost-team",
        categories: categoryIds,
        createdAt: blogData.posts[postIndex].createdAt,
        updatedAt: new Date().toISOString(),
        publishedAt: status === "published" ? publishDateStr || new Date().toISOString() : null,
        status,
        featured,
      };
      
      blogData.posts[postIndex] = updatedPost;
      
      const writeSuccess = await writeBlogData(blogData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write blog data" };
      }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating post:", error)
    return { success: false, error: error.message || "Failed to update post" }
  }
}

export async function deletePost(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        const result = await db.collection(collections.blogPosts).deleteOne({ id });
        
        if (result.deletedCount === 0) {
          return { success: false, error: "Post not found" };
        }
      } catch (error) {
        console.error("Error deleting post from MongoDB:", error);
        return { success: false, error: "Failed to delete post from database" };
      }
    } else {
      const blogData = await readBlogData();
      const postIndex = blogData.posts.findIndex((post: any) => post.id === id);
      
      if (postIndex === -1) {
        return { success: false, error: "Post not found" };
      }
      
      blogData.posts.splice(postIndex, 1);
      
      const writeSuccess = await writeBlogData(blogData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write blog data" };
      }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting post:", error)
    return { success: false, error: error.message || "Failed to delete post" }
  }
}

export async function deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        
        // Delete the category
        const result = await db.collection(collections.blogCategories).deleteOne({ id });
        
        if (result.deletedCount === 0) {
          return { success: false, error: "Category not found" };
        }
        
        // Remove category from posts
        await db.collection(collections.blogPosts).updateMany(
          { categories: id },
          { $pull: { categories: id } }
        );
      } catch (error) {
        console.error("Error deleting category from MongoDB:", error);
        return { success: false, error: "Failed to delete category from database" };
      }
    } else {
      const blogData = await readBlogData();
      const categoryIndex = blogData.categories.findIndex((cat: any) => cat.id === id);
      
      if (categoryIndex === -1) {
        return { success: false, error: "Category not found" };
      }
      
      blogData.categories.splice(categoryIndex, 1);
      
      // Remove category from posts
      blogData.posts.forEach((post: any) => {
        if (post.categories && Array.isArray(post.categories)) {
          post.categories = post.categories.filter((catId: string) => catId !== id);
        }
      });
      
      const writeSuccess = await writeBlogData(blogData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write blog data" };
      }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting category:", error)
    return { success: false, error: error.message || "Failed to delete category" }
  }
}

export async function createAuthor(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const title = formData.get("title") as string
    const bio = formData.get("bio") as string
    const avatar = formData.get("avatar") as string
    const twitter = formData.get("twitter") as string
    const linkedin = formData.get("linkedin") as string
    const github = formData.get("github") as string
    const discord = formData.get("discord") as string
    const website = formData.get("website") as string

    if (!name || !slug) {
      return { success: false, error: "Name and slug are required" }
    }

    // Check if author with this slug already exists
    const blogData = await readBlogData();
    const authorExists = blogData.authors.some((author: any) => author.slug === slug);
    
    if (authorExists) {
      return { success: false, error: "Author with this slug already exists" };
    }

    const newAuthor = {
      id: uuidv4(),
      name,
      slug,
      title: title || "",
      bio: bio || "",
      avatar: avatar || "",
      social: {
        twitter: twitter || "",
        linkedin: linkedin || "",
        github: github || "",
        discord: discord || "",
        website: website || "",
      },
    }

    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        await db.collection(collections.authors).insertOne(newAuthor);
      } catch (error) {
        console.error("Error creating author in MongoDB:", error);
        return { success: false, error: "Failed to create author in database" };
      }
    } else {
      blogData.authors.push(newAuthor);
      
      const writeSuccess = await writeBlogData(blogData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write blog data" };
      }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error creating author:", error)
    return { success: false, error: error.message || "Failed to create author" }
  }
}

export async function updateAuthor(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const title = formData.get("title") as string
    const bio = formData.get("bio") as string
    const avatar = formData.get("avatar") as string
    const twitter = formData.get("twitter") as string
    const linkedin = formData.get("linkedin") as string
    const github = formData.get("github") as string
    const discord = formData.get("discord") as string
    const website = formData.get("website") as string

    if (!id || !name || !slug) {
      return { success: false, error: "ID, name, and slug are required" }
    }

    const updatedAuthor = {
      id,
      name,
      slug,
      title: title || "",
      bio: bio || "",
      avatar: avatar || "",
      social: {
        twitter: twitter || "",
        linkedin: linkedin || "",
        github: github || "",
        discord: discord || "",
        website: website || "",
      },
    }

    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        const result = await db.collection(collections.authors).updateOne(
          { id },
          { $set: updatedAuthor }
        );
        
        if (result.matchedCount === 0) {
          return { success: false, error: "Author not found" };
        }
      } catch (error) {
        console.error("Error updating author in MongoDB:", error);
        return { success: false, error: "Failed to update author in database" };
      }
    } else {
      const blogData = await readBlogData();
      const authorIndex = blogData.authors.findIndex((author: any) => author.id === id);
      
      if (authorIndex === -1) {
        return { success: false, error: "Author not found" };
      }
      
      blogData.authors[authorIndex] = updatedAuthor;
      
      const writeSuccess = await writeBlogData(blogData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write blog data" };
      }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error updating author:", error)
    return { success: false, error: error.message || "Failed to update author" }
  }
}

export async function deleteAuthor(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (useMongoStorage()) {
      try {
        const { db } = await connectToDatabase();
        
        // First get all authors to find a default author
        const authors = await db.collection(collections.authors).find({}).toArray();
        
        // Get the default author (any other author or a default one)
        const defaultAuthor = authors.find(author => author.id !== id) || {
          id: "default",
          name: "HyberHost Team",
          slug: "hyberhost-team",
          bio: "The official HyberHost team account.",
          avatar: "/double-h-monogram.png",
        };
        
        // If the default author doesn't exist, create it
        if (defaultAuthor.id === 'default') {
          await db.collection(collections.authors).insertOne(defaultAuthor);
        }
        
        // Delete the author
        const result = await db.collection(collections.authors).deleteOne({ id });
        
        if (result.deletedCount === 0) {
          return { success: false, error: "Author not found" };
        }
        
        // Reassign posts to default author
        await db.collection(collections.blogPosts).updateMany(
          { authorId: id },
          { $set: { authorId: defaultAuthor.id } }
        );
      } catch (error) {
        console.error("Error deleting author from MongoDB:", error);
        return { success: false, error: "Failed to delete author from database" };
      }
    } else {
      const blogData = await readBlogData();
      const authorIndex = blogData.authors.findIndex((author: any) => author.id === id);
      
      if (authorIndex === -1) {
        return { success: false, error: "Author not found" };
      }
      
      const defaultAuthor = blogData.authors.find(author => author.id !== id) || {
        id: "default",
        name: "HyberHost Team",
        slug: "hyberhost-team",
        bio: "The official HyberHost team account.",
        avatar: "/double-h-monogram.png",
      };
      
      blogData.authors.splice(authorIndex, 1);
      
      // If we removed the last author, add the default one
      if (blogData.authors.length === 0) {
        blogData.authors.push(defaultAuthor);
      }
      
      // Reassign posts to default author
      blogData.posts.forEach((post: any) => {
        if (post.authorId === id) {
          post.authorId = defaultAuthor.id;
        }
      });
      
      const writeSuccess = await writeBlogData(blogData);
      if (!writeSuccess) {
        return { success: false, error: "Failed to write blog data" };
      }
    }

    revalidatePath("/blog")
    revalidatePath("/admin/blog")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting author:", error)
    return { success: false, error: error.message || "Failed to delete author" }
  }
}
