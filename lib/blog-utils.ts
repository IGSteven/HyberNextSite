// Blog utility functions for both client and server components
import type { BlogPost, Category, Author } from "./blog-types"
import path from "path"
import { connectToDatabase, collections, useMongoStorage } from './mongodb';

// Use imported blog data directly
import blogData from "@/data/blog-data.json"

// Function to read blog data (works in both client and server)
export async function getBlogData() {
  // Check storage method
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      
      // Fetch data from MongoDB
      const posts = await db.collection(collections.blogPosts).find({}).toArray();
      const categories = await db.collection(collections.blogCategories).find({}).toArray();
      const authors = await db.collection(collections.authors).find({}).toArray();
      
      return {
        posts: posts || [],
        categories: categories || [],
        authors: authors || [],
      };
    } catch (error) {
      console.error("Error reading blog data from MongoDB:", error);
      // Fall back to JSON if MongoDB fails
      console.log("Falling back to JSON data storage");
    }
  }
  
  // Default to JSON file storage
  try {
    // Return the imported data directly
    return {
      posts: blogData.posts || [],
      categories: blogData.categories || [],
      authors: blogData.authors || [],
    };
  } catch (error) {
    console.error("Error reading blog data:", error)
    // Return a default structure
    return { posts: [], categories: [], authors: [] }
  }
}

// Function to write blog data to storage
export async function writeBlogData(data: any) {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      
      // Clear existing data and insert new data
      // For posts
      if (data.posts && Array.isArray(data.posts)) {
        await db.collection(collections.blogPosts).deleteMany({});
        if (data.posts.length > 0) {
          await db.collection(collections.blogPosts).insertMany(data.posts);
        }
      }
      
      // For categories
      if (data.categories && Array.isArray(data.categories)) {
        await db.collection(collections.blogCategories).deleteMany({});
        if (data.categories.length > 0) {
          await db.collection(collections.blogCategories).insertMany(data.categories);
        }
      }
      
      // For authors
      if (data.authors && Array.isArray(data.authors)) {
        await db.collection(collections.authors).deleteMany({});
        if (data.authors.length > 0) {
          await db.collection(collections.authors).insertMany(data.authors);
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error writing blog data to MongoDB:", error);
      return false;
    }
  }
  
  // Default to JSON file storage
  try {
    // Only run server-side code when on the server
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const fullPath = path.join(process.cwd(), "data", "blog-data.json");
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf8");
    } else {
      console.warn("Cannot write blog data on the client side");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error writing blog data to JSON:", error)
    return false;
  }
}

// Function to get all blog posts
export async function getPosts(): Promise<BlogPost[]> {
  // If MongoDB is enabled, fetch directly for better performance
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const posts = await db.collection(collections.blogPosts).find({}).toArray();
      return posts || [];
    } catch (error) {
      console.error("Error fetching posts from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  // Default method
  const data = await getBlogData();
  return data.posts || [];
}

// The rest of the functions use getPosts, getCategories, etc. so they will
// automatically work with either storage method

// Function to get a blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const post = await db.collection(collections.blogPosts).findOne({ slug });
      return post || null;
    } catch (error) {
      console.error("Error fetching post by slug from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) || null;
}

// Function to get all categories
export async function getCategories(): Promise<Category[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const categories = await db.collection(collections.blogCategories).find({}).toArray();
      return categories || [];
    } catch (error) {
      console.error("Error fetching categories from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const data = await getBlogData();
  return data.categories || [];
}

// Function to get a category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const category = await db.collection(collections.blogCategories).findOne({ id });
      return category || null;
    } catch (error) {
      console.error("Error fetching category by ID from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const categories = await getCategories();
  return categories.find((category) => category.id === id) || null;
}

// Function to get a category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const category = await db.collection(collections.blogCategories).findOne({ slug });
      return category || null;
    } catch (error) {
      console.error("Error fetching category by slug from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) || null;
}

// Function to get all authors
export async function getAuthors(): Promise<Author[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const authors = await db.collection(collections.authors).find({}).toArray();
      return authors || [];
    } catch (error) {
      console.error("Error fetching authors from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const data = await getBlogData();
  return data.authors || [];
}

// Function to get an author by ID
export async function getAuthorById(id: string): Promise<Author | null> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const author = await db.collection(collections.authors).findOne({ id });
      return author || null;
    } catch (error) {
      console.error("Error fetching author by ID from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const authors = await getAuthors();
  return authors.find((author) => author.id === id) || null;
}

// Function to get an author by slug
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const author = await db.collection(collections.authors).findOne({ slug });
      return author || null;
    } catch (error) {
      console.error("Error fetching author by slug from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
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
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const posts = await db.collection(collections.blogPosts)
        .find({ featured: true, status: "published" })
        .toArray();
      return posts || [];
    } catch (error) {
      console.error("Error fetching featured posts from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const posts = await getPosts();
  return posts.filter((post) => post.featured && post.status === "published");
}

// Function to get published posts
export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const posts = await db.collection(collections.blogPosts)
        .find({ status: "published" })
        .toArray();
      return posts || [];
    } catch (error) {
      console.error("Error fetching published posts from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const posts = await getPosts();
  return posts.filter((post) => post.status === "published");
}

// Function to get posts by category
export async function getPostsByCategory(categoryId: string): Promise<BlogPost[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const posts = await db.collection(collections.blogPosts)
        .find({ 
          $and: [
            { status: "published" },
            { $or: [
              { categoryId: categoryId },
              { categories: categoryId }
            ]}
          ]
        })
        .toArray();
      return posts || [];
    } catch (error) {
      console.error("Error fetching posts by category from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const posts = await getPublishedPosts();
  return posts.filter(
    (post) => post.categoryId === categoryId || (post.categories && post.categories.includes(categoryId)),
  );
}

// Function to get posts by author
export async function getPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const posts = await db.collection(collections.blogPosts)
        .find({ authorId: authorId, status: "published" })
        .toArray();
      return posts || [];
    } catch (error) {
      console.error("Error fetching posts by author from MongoDB:", error);
      // Fall back to getting from cache
    }
  }
  
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.authorId === authorId);
}
