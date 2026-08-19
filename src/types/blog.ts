export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export type BlogCategory =
  | 'all'
  // | 'creator-economy'
  // | 'monetization'
  // | 'tools-tech'
  // | 'growth'
  // | 'case-studies'
  | 'blueprint'
  | 'creator-basics'
  | 'market-report'
  | 'payouts & rails'
  | 'brand-standards'
  | 'action-plan'
  | 'infrastructure';

// export type BlogTag =
//   'featured' | 'strategy' | 'opinion' | 'deep-dive' | 'case-study' | 'analysis';

export interface ContentBlock {
  type: 'paragraph' | 'heading2' | 'heading3' | 'bulletList' | 'callout';
  text?: string;
  linkText?: string;
  linkUrl?: string;
  items?: { boldPrefix?: string; text: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tag: string;
  author: {
    name: string;
    role: string;
  };
  date: string;
  readTime: string;
  image: string;
  blocks?: ContentBlock[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
