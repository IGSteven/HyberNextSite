import type { KBArticle, KBCategory } from "./kb-types"
import kbData from "@/data/kb-data.json"
import { getBlogData } from "./blog-utils"
import type { Author } from "./blog-types"

// Get all KB categories
export async function getAllCategories(): Promise<KBCategory[]> {
  if (typeof window !== 'undefined') {
    return kbData.categories;
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const categories = await db.collection(collections.kbCategories).find({}).toArray();
      return categories || [];
    }, kbData.categories);
  } catch (error) {
    console.error("Error fetching KB categories:", error);
    return kbData.categories;
  }
}

// Alias for getAllCategories to maintain compatibility
export const getCategories = getAllCategories;

// Get root categories (categories without a parent)
export async function getRootCategories(): Promise<KBCategory[]> {
  if (typeof window !== 'undefined') {
    return kbData.categories.filter((category) => 
      !category.parentId || category.parentId === "" || category.parentId === "none"
    );
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const categories = await db.collection(collections.kbCategories)
        .find({ 
          $or: [
            { parentId: { $exists: false } },
            { parentId: null },
            { parentId: "" }
          ] 
        })
        .toArray();
      return categories || [];
    }, kbData.categories.filter((category) => 
      !category.parentId || category.parentId === "" || category.parentId === "none"
    ));
  } catch (error) {
    console.error("Error fetching root KB categories:", error);
    return kbData.categories.filter((category) => 
      !category.parentId || category.parentId === "" || category.parentId === "none"
    );
  }
}

// Get subcategories of a specific category
export async function getSubcategories(categoryId: string): Promise<KBCategory[]> {
  if (typeof window !== 'undefined') {
    return kbData.categories.filter((category) => category.parentId === categoryId);
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const categories = await db.collection(collections.kbCategories)
        .find({ parentId: categoryId })
        .toArray();
      return categories || [];
    }, kbData.categories.filter((category) => category.parentId === categoryId));
  } catch (error) {
    console.error("Error fetching KB subcategories:", error);
    return kbData.categories.filter((category) => category.parentId === categoryId);
  }
}

// Get child categories for a given parent category ID
export async function getChildCategories(parentId: string): Promise<KBCategory[]> {
  // This is the same as getSubcategories, but kept as a separate function for API compatibility
  return getSubcategories(parentId);
}

// Get category by ID
export async function getCategoryById(id: string): Promise<KBCategory | undefined> {
  if (typeof window !== 'undefined') {
    return kbData.categories.find((category) => category.id === id);
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const category = await db.collection(collections.kbCategories).findOne({ id });
      return category || undefined;
    }, kbData.categories.find((category) => category.id === id));
  } catch (error) {
    console.error("Error fetching KB category by ID:", error);
    return kbData.categories.find((category) => category.id === id);
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<KBCategory | undefined> {
  if (typeof window !== 'undefined') {
    return kbData.categories.find((category) => category.slug === slug);
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const category = await db.collection(collections.kbCategories).findOne({ slug });
      return category || undefined;
    }, kbData.categories.find((category) => category.slug === slug));
  } catch (error) {
    console.error("Error fetching KB category by slug:", error);
    return kbData.categories.find((category) => category.slug === slug);
  }
}

// Get all KB articles
export async function getAllArticles(): Promise<KBArticle[]> {
  if (typeof window !== 'undefined') {
    return kbData.articles;
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const articles = await db.collection(collections.kbPosts).find({}).toArray();
      return articles || [];
    }, kbData.articles);
  } catch (error) {
    console.error("Error fetching KB articles:", error);
    return kbData.articles;
  }
}

// Get published KB articles
export async function getPublishedArticles(): Promise<KBArticle[]> {
  if (typeof window !== 'undefined') {
    return kbData.articles.filter((article) => article.status === "published");
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const articles = await db.collection(collections.kbPosts)
        .find({ status: "published" })
        .toArray();
      return articles || [];
    }, kbData.articles.filter((article) => article.status === "published"));
  } catch (error) {
    console.error("Error fetching published KB articles:", error);
    return kbData.articles.filter((article) => article.status === "published");
  }
}

// Get KB article by slug
export async function getArticleBySlug(slug: string): Promise<KBArticle | undefined> {
  if (typeof window !== 'undefined') {
    return kbData.articles.find((article) => article.slug === slug);
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const article = await db.collection(collections.kbPosts).findOne({ slug });
      return article || undefined;
    }, kbData.articles.find((article) => article.slug === slug));
  } catch (error) {
    console.error("Error fetching KB article by slug:", error);
    return kbData.articles.find((article) => article.slug === slug);
  }
}

// Get KB articles by category ID
export async function getArticlesByCategoryId(categoryId: string): Promise<KBArticle[]> {
  if (typeof window !== 'undefined') {
    return kbData.articles.filter(
      (article) => article.categoryIds && article.categoryIds.includes(categoryId) && article.status === "published",
    );
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const articles = await db.collection(collections.kbPosts)
        .find({ 
          status: "published",
          categoryIds: categoryId 
        })
        .toArray();
      return articles || [];
    }, kbData.articles.filter(
      (article) => article.categoryIds && article.categoryIds.includes(categoryId) && article.status === "published",
    ));
  } catch (error) {
    console.error("Error fetching KB articles by category ID:", error);
    return kbData.articles.filter(
      (article) => article.categoryIds && article.categoryIds.includes(categoryId) && article.status === "published",
    );
  }
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
  if (typeof window !== 'undefined') {
    return kbData.articles.filter((article) => article.authorId === authorId && article.status === "published");
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const articles = await db.collection(collections.kbPosts)
        .find({ 
          status: "published",
          authorId: authorId
        })
        .toArray();
      return articles || [];
    }, kbData.articles.filter((article) => article.authorId === authorId && article.status === "published"));
  } catch (error) {
    console.error("Error fetching KB articles by author:", error);
    return kbData.articles.filter((article) => article.authorId === authorId && article.status === "published");
  }
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
  const fallbackResults = kbData.articles.filter((article) => {
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

  if (typeof window !== 'undefined') {
    return fallbackResults;
  }
  
  try {
    const { safeMongoDbOperation, collections, useMongoStorage } = await import('./mongodb');
    
    if (!useMongoStorage()) {
      return fallbackResults;
    }
    
    return await safeMongoDbOperation(async (db) => {
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
    }, fallbackResults);
  } catch (error) {
    console.error("Error searching KB articles:", error);
    return fallbackResults;
  }
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
  const article = await getArticleById(articleId);
  if (!article) return [];

  // Get articles from the same category
  const sameCategory = await getArticlesByCategoryId(article.categoryIds[0]);
  
  // Filter out the current article
  const filteredSameCategory = sameCategory.filter(a => a.id !== articleId);

  // If we have enough articles from the same category, return them
  if (filteredSameCategory.length >= limit) {
    return filteredSameCategory.slice(0, limit);
  }

  // Otherwise, get articles with similar tags
  const articleTags = article.tags || [];
  
  // Get published articles that aren't in the current category but have matching tags
  const publishedArticles = await getPublishedArticles();
  const withTags = publishedArticles.filter(
    (a) =>
      a.id !== articleId &&
      a.categoryIds &&
      article.categoryIds &&
      !a.categoryIds.some((id) => article.categoryIds.includes(id)) &&
      a.status === "published" &&
      a.tags &&
      a.tags.some((tag) => articleTags.includes(tag)),
  );

  // Combine and limit
  return [...filteredSameCategory, ...withTags].slice(0, limit);
}

// Get article by ID
export async function getArticleById(id: string): Promise<KBArticle | undefined> {
  if (typeof window !== 'undefined') {
    return kbData.articles.find((article) => article.id === id);
  }
  
  try {
    const { safeMongoDbOperation, collections } = await import('./mongodb');
    
    return await safeMongoDbOperation(async (db) => {
      const article = await db.collection(collections.kbPosts).findOne({ id });
      return article || undefined;
    }, kbData.articles.find((article) => article.id === id));
  } catch (error) {
    console.error("Error fetching KB article by ID:", error);
    return kbData.articles.find((article) => article.id === id);
  }
}

// Create a type definition file for KB data
export type { KBArticle, KBCategory }
