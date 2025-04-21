import type { KBArticle, KBCategory } from "./kb-types"
import kbData from "@/data/kb-data.json"
import { getBlogData } from "./blog-utils"
import type { Author } from "./blog-types"
import { connectToDatabase, collections, useMongoStorage } from './mongodb';

// Get all KB categories
export async function getAllCategories(): Promise<KBCategory[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const categories = await db.collection(collections.kbCategories).find({}).toArray();
      return categories || [];
    } catch (error) {
      console.error("Error fetching KB categories from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.categories;
}

// Alias for getAllCategories to maintain compatibility
export const getCategories = getAllCategories;

// Get root categories (categories without a parent)
export async function getRootCategories(): Promise<KBCategory[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const categories = await db.collection(collections.kbCategories)
        .find({ parentId: { $exists: false } })
        .toArray();
      return categories || [];
    } catch (error) {
      console.error("Error fetching root KB categories from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.categories.filter((category) => !category.parentId);
}

// Get subcategories of a specific category
export async function getSubcategories(categoryId: string): Promise<KBCategory[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const categories = await db.collection(collections.kbCategories)
        .find({ parentId: categoryId })
        .toArray();
      return categories || [];
    } catch (error) {
      console.error("Error fetching KB subcategories from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.categories.filter((category) => category.parentId === categoryId);
}

// Get child categories for a given parent category ID
export async function getChildCategories(parentId: string): Promise<KBCategory[]> {
  // This is the same as getSubcategories, but kept as a separate function for API compatibility
  return getSubcategories(parentId);
}

// Get category by ID
export async function getCategoryById(id: string): Promise<KBCategory | undefined> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const category = await db.collection(collections.kbCategories).findOne({ id });
      return category || undefined;
    } catch (error) {
      console.error("Error fetching KB category by ID from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.categories.find((category) => category.id === id);
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<KBCategory | undefined> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const category = await db.collection(collections.kbCategories).findOne({ slug });
      return category || undefined;
    } catch (error) {
      console.error("Error fetching KB category by slug from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.categories.find((category) => category.slug === slug);
}

// Get all KB articles
export async function getAllArticles(): Promise<KBArticle[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const articles = await db.collection(collections.kbPosts).find({}).toArray();
      return articles || [];
    } catch (error) {
      console.error("Error fetching KB articles from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.articles;
}

// Get published KB articles
export async function getPublishedArticles(): Promise<KBArticle[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const articles = await db.collection(collections.kbPosts)
        .find({ status: "published" })
        .toArray();
      return articles || [];
    } catch (error) {
      console.error("Error fetching published KB articles from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.articles.filter((article) => article.status === "published");
}

// Get KB article by slug
export async function getArticleBySlug(slug: string): Promise<KBArticle | undefined> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const article = await db.collection(collections.kbPosts).findOne({ slug });
      return article || undefined;
    } catch (error) {
      console.error("Error fetching KB article by slug from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.articles.find((article) => article.slug === slug);
}

// Get KB articles by category ID
export async function getArticlesByCategoryId(categoryId: string): Promise<KBArticle[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const articles = await db.collection(collections.kbPosts)
        .find({ 
          status: "published",
          categoryIds: categoryId 
        })
        .toArray();
      return articles || [];
    } catch (error) {
      console.error("Error fetching KB articles by category ID from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.articles.filter(
    (article) => article.categoryIds && article.categoryIds.includes(categoryId) && article.status === "published",
  );
}

// Get KB articles by category (matches the function signature expected by the category page)
export async function getArticlesByCategory(categoryId: string): Promise<KBArticle[]> {
  return getArticlesByCategoryId(categoryId);
}

// Get KB articles by category slug
export async function getArticlesByCategorySlug(slug: string): Promise<KBArticle[]> {
  const category = await getCategoryBySlug(slug);
  if (!category) return [];
  return getArticlesByCategoryId(category.id);
}

// Get KB articles by author
export async function getKBArticlesByAuthor(authorId: string): Promise<KBArticle[]> {
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      const articles = await db.collection(collections.kbPosts)
        .find({ 
          status: "published",
          authorId: authorId
        })
        .toArray();
      return articles || [];
    } catch (error) {
      console.error("Error fetching KB articles by author from MongoDB:", error);
      // Fall back to JSON
    }
  }
  
  return kbData.articles.filter((article) => article.authorId === authorId && article.status === "published");
}

// Get author for an article
export async function getAuthorForArticle(authorId: string): Promise<Author | null> {
  const data = await getBlogData();
  return data.authors.find((author) => author.id === authorId) || null;
}

// Search KB articles
export async function searchArticles(query: string): Promise<KBArticle[]> {
  if (!query) return [];

  const lowerQuery = query.toLowerCase();

  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      // MongoDB text search requires a text index to be created, but we can use a basic search for now
      const articles = await db.collection(collections.kbPosts)
        .find({ 
          status: "published",
          $or: [
            { title: { $regex: lowerQuery, $options: 'i' } },
            { content: { $regex: lowerQuery, $options: 'i' } },
            { excerpt: { $regex: lowerQuery, $options: 'i' } },
            { tags: { $in: [new RegExp(lowerQuery, 'i')] } }
          ]
        })
        .toArray();
      return articles || [];
    } catch (error) {
      console.error("Error searching KB articles in MongoDB:", error);
      // Fall back to JSON
    }
  }

  return kbData.articles.filter((article) => {
    // Only include published articles
    if (article.status !== "published") return false;

    // Search in title, content, excerpt, tags
    return (
      article.title.toLowerCase().includes(lowerQuery) ||
      (article.content && article.content.toLowerCase().includes(lowerQuery)) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(lowerQuery)) ||
      (article.tags && article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
    );
  });
}

// Get breadcrumb trail for a category
export async function getCategoryBreadcrumbs(categoryId: string): Promise<KBCategory[]> {
  const breadcrumbs: KBCategory[] = [];
  let currentCategory = await getCategoryById(categoryId);

  while (currentCategory) {
    breadcrumbs.unshift(currentCategory);
    if (!currentCategory.parentId) break;
    currentCategory = await getCategoryById(currentCategory.parentId);
  }

  return breadcrumbs;
}

// Get breadcrumbs for a category (matches the function signature expected by the category page)
export async function getBreadcrumbsForCategory(categoryId: string): Promise<KBCategory[]> {
  return getCategoryBreadcrumbs(categoryId);
}

// Get related articles
export async function getRelatedArticles(articleId: string, limit = 3): Promise<KBArticle[]> {
  // First get the article itself
  let article: KBArticle | undefined;
  
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      article = await db.collection(collections.kbPosts).findOne({ id: articleId });
    } catch (error) {
      console.error("Error fetching article for related articles from MongoDB:", error);
      // Fall back to JSON
      article = kbData.articles.find((a) => a.id === articleId);
    }
  } else {
    article = kbData.articles.find((a) => a.id === articleId);
  }
  
  if (!article) return [];

  // Get articles from the same category
  let sameCategory: KBArticle[] = [];
  
  if (useMongoStorage()) {
    try {
      const { db } = await connectToDatabase();
      sameCategory = await db.collection(collections.kbPosts)
        .find({ 
          id: { $ne: articleId },
          status: "published",
          categoryIds: { $in: article.categoryIds || [] }
        })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error("Error fetching related articles by category from MongoDB:", error);
      // Fall back to JSON using the existing filtering logic below
      sameCategory = [];
    }
  }
  
  // If not using MongoDB or if MongoDB query failed, use the local data
  if (!useMongoStorage() || sameCategory.length === 0) {
    sameCategory = kbData.articles.filter(
      (a) =>
        a.id !== articleId &&
        a.categoryIds &&
        article.categoryIds &&
        a.categoryIds.some((id) => article.categoryIds.includes(id)) &&
        a.status === "published",
    );
  }

  // If we have enough articles from the same category, return them
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Otherwise, get articles with similar tags
  const articleTags = article.tags || [];
  let withTags: KBArticle[] = [];
  
  if (useMongoStorage() && articleTags.length > 0) {
    try {
      const { db } = await connectToDatabase();
      // Find articles with similar tags that aren't in the same category
      withTags = await db.collection(collections.kbPosts)
        .find({ 
          id: { $ne: articleId },
          status: "published",
          tags: { $in: articleTags },
          categoryIds: { $nin: article.categoryIds || [] }
        })
        .limit(limit - sameCategory.length)
        .toArray();
    } catch (error) {
      console.error("Error fetching related articles by tags from MongoDB:", error);
      // Fall back to JSON using the existing filtering logic below
      withTags = [];
    }
  }
  
  // If not using MongoDB or if MongoDB query failed, use the local data
  if (!useMongoStorage() || withTags.length === 0) {
    withTags = kbData.articles.filter(
      (a) =>
        a.id !== articleId &&
        a.categoryIds &&
        article.categoryIds &&
        !a.categoryIds.some((id) => article.categoryIds.includes(id)) &&
        a.status === "published" &&
        a.tags &&
        a.tags.some((tag) => articleTags.includes(tag)),
    );
  }

  // Combine and limit
  return [...sameCategory, ...withTags].slice(0, limit);
}

// Create a type definition file for KB data
export type { KBArticle, KBCategory }
