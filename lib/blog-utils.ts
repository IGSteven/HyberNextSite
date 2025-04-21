// Blog utility functions for both client and server components
import type { BlogPost, Category, Author } from "./blog-types"
import path from "path"
import fs from "fs/promises"
// Remove the direct import to avoid bundling MongoDB in client-side code
// Instead, we'll dynamically import when needed

// Use imported blog data directly
import blogData from "@/data/blog-data.json"

// Function to read blog data (works in both client and server)
export async function getBlogData() {
  // Use the safer MongoDB operation helper
  if (typeof window !== 'undefined') {
    // On client-side, always return the static data
    return {
      posts: blogData.posts || [],
      categories: blogData.categories || [],
      authors: blogData.authors || [],
    };
  }
  
  try {
    // Dynamically import MongoDB utilities only on server side
    const { safeMongoDbOperation } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const { collections } = await import('./mongodb');
      
      // Fetch data from MongoDB
      const posts = await db.collection(collections.blogPosts).find({}).toArray();
      const categories = await db.collection(collections.blogCategories).find({}).toArray();
      const authors = await db.collection(collections.authors).find({}).toArray();
      
      return {
        posts: posts || [],
        categories: categories || [],
        authors: authors || [],
      };
    }, {
      // Default to JSON file storage as fallback
      posts: blogData.posts || [],
      categories: blogData.categories || [],
      authors: blogData.authors || [],
    });
  } catch (error) {
    console.error("Error getting blog data:", error);
    // Fallback to static data
    return {
      posts: blogData.posts || [],
      categories: blogData.categories || [],
      authors: blogData.authors || [],
    };
  }
}

// Function to write blog data to storage
export async function writeBlogData(data: any) {
  if (typeof window !== 'undefined') {
    console.error("Cannot write blog data from client-side");
    return false;
  }

  try {
    // Check if MongoDB should be used
    const { useMongoStorage } = await import('./mongodb');
    
    if (useMongoStorage()) {
      try {
        const { safeMongoDbOperation } = await import('./mongodb');
        
        return await safeMongoDbOperation(async (db) => {
          const { collections } = await import('./mongodb');
          
          // Note: We're not deleting all documents and re-inserting anymore
          // Instead, we're using individual operations in the action functions
          // This function is mainly used for JSON file storage now
          
          console.log("MongoDB is configured as storage driver. Data is managed directly through action functions.");
          return true;
        }, false);
      } catch (error) {
        console.error("Error writing to MongoDB:", error);
        return false;
      }
    } else {
      // Write to JSON file
      const filePath = path.join(process.cwd(), "data", "blog-data.json");
      try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
        return true;
      } catch (error) {
        console.error("Error writing to JSON file:", error);
        return false;
      }
    }
  } catch (error) {
    console.error("Error in writeBlogData:", error);
    return false;
  }
}

// Function to get all blog posts
export async function getPosts(): Promise<BlogPost[]> {
  const data = await getBlogData();
  return data.posts || [];
}

// Function to get a blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) || null;
}

// Function to get all categories
export async function getCategories(): Promise<Category[]> {
  const data = await getBlogData();
  return data.categories || [];
}

// Function to get a category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.id === id) || null;
}

// Function to get a category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) || null;
}

// Function to get all authors
export async function getAuthors(): Promise<Author[]> {
  const data = await getBlogData();
  return data.authors || [];
}

// Function to get an author by ID
export async function getAuthorById(id: string): Promise<Author | null> {
  const authors = await getAuthors();
  return authors.find((author) => author.id === id) || null;
}

// Function to get an author by slug
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const authors = await getAuthors();
  return authors.find((author) => author.slug === slug) || null;
}

// Function to get the default author
export async function getDefaultAuthor(): Promise<Author> {
  const authors = await getAuthors();
  return (
    authors[0] || {
      id: "default",
      name: "HyberHost Team",
      slug: "hyberhost-team",
      bio: "The official HyberHost team account.",
      avatar: "/double-h-monogram.png",
    }
  );
}

// Function to get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.featured && post.status === "published");
}

// Function to get published posts
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.status === "published");
}

// Function to get posts by category
export async function getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter(
    (post) => post.categoryId === categoryId || (post.categories && post.categories.includes(categoryId)),
  );
}

// Function to get posts by author
export async function getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.authorId === authorId);
}
