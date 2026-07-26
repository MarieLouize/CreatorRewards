export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export type BlogCategory =
  | 'all'
  | 'creator-economy'
  | 'monetization'
  | 'tools-tech'
  | 'growth'
  | 'case-studies';

export type BlogTag =
  'featured' | 'strategy' | 'opinion' | 'deep-dive' | 'case-study' | 'analysis';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tag: BlogTag;
  author: BlogAuthor;
  date: string;
  readTime: string;
  image: string;
  // featured: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
