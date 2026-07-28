import type { BlogCategory, BlogPost, FAQItem } from '../types/blog';
import { getImageSrc } from '../utils/imagesUtils';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'creator-millionaires-b2b',
    title:
      'WHY THE NEXT WAVE OF CREATOR MILLIONAIRES WILL COME FROM B2B, NOT B2C',
    excerpt:
      "The influencer era is plateauing. The creators quietly building software, courses, and community infrastructure for other businesses are eating everyone's lunch.",
    content: '',
    category: 'creator-economy',
    tag: 'featured',
    author: { name: 'Priya Nkosi', role: 'Head of Creator Research' },
    date: '2026-06-24',
    readTime: '9 min read',
    image: getImageSrc('creatorImg.png'),
  },
  {
    id: '2',
    slug: 'pricing-models-mrr-q1-2026',
    title: 'FIVE PRICING MODELS THAT TRIPLED CREATOR MRR IN Q1 2026',
    excerpt:
      "Fixed subscriptions are table stakes. The creators outpacing the market are running hybrid models most platforms don't even support yet.",
    content: '',
    category: 'monetization',
    tag: 'strategy',
    author: { name: 'Marcus Delgado', role: 'Growth Economist' },
    date: '2026-06-20',
    readTime: '6 min read',
    image: getImageSrc('monetizationImg.png'),
  },

  {
    id: '3',
    slug: 'Creator-stack-2026',
    title: 'Automating Your Creator Stack: What Actually Works in 2026',
    excerpt: `We audited 200 top creators' tooling. Most automation is cosmetic. Here's what's genuinely saving them 10+ hours a week.`,
    content: '',
    category: 'tools-tech',
    tag: 'deep-dive',
    author: { name: 'Aiko Tanaka', role: 'Product Strategist' },
    date: '2026-06-17',
    readTime: '11 min read',
    image: getImageSrc('toolsTechImg.png'),
  },
  {
    id: '4',
    slug: 'nigerian-beauty-brand-case-study',
    title:
      '$0 to $84K MRR: How Lena Osei Built a Creator Ops Empire in 14 Months',
    excerpt:
      'No viral moments, no celebrity collabs. Just ruthless systemization and a very specific niche no one else wanted to touch.',
    content: '',
    category: 'case-studies',
    tag: 'case-study',
    author: { name: 'Editorial Team', role: 'CREATORSREWARDS Magazine' },
    date: '2026-06-14',
    readTime: '14 min read',
    image: getImageSrc('casestudyImg.png'),
  },
  {
    id: '5',
    slug: 'platform-dependency',
    title: `Platform Dependency Is Killing Creator Businesses. Here's the Exit`,
    excerpt: `Every algorithm change wipes out someone's income. The creators building durable businesses share one trait: diversified distribution before they needed it.

`,
    content: '',
    category: 'growth',
    tag: 'analysis',
    author: { name: 'James Fortier', role: 'Creator Economist' },
    date: '2026-06-10',
    readTime: '8 min read',
    image: getImageSrc('analysisImg.png'),
  },

  {
    id: '6',
    slug: 'platform-fatigue-creator-response',
    title: `The Marketplace Model Is Broken for Most Creators (And Who's Fixing It)
`,
    excerpt: `30% cuts, opaque ranking signals, payment holds. The creator-first platforms are finally arriving — but not from the incumbents.`,
    content: '',
    category: 'monetization',
    tag: 'opinion',
    author: { name: 'Priya Nkosi', role: 'Head of Creator Research' },
    date: '2026-06-06',
    readTime: '7 min read',
    image: getImageSrc('marketplaceImg.png'),
  },
];

export const faqItems: FAQItem[] = [
  {
    question: 'How do I get paid on CREATORSREWARDS?',
    answer:
      'Payments are sent directly to your linked bank account every two weeks. You need a minimum balance of ₦5,000 to trigger a payout. No third-party wallets, no delays.',
  },
  {
    question: 'What types of creators can join?',
    answer:
      'Any content creator — YouTubers, TikTokers, bloggers, podcasters, photographers, and more. As long as you have an active audience, you qualify.',
  },
  {
    question: 'How does brand matching work?',
    answer:
      "Our algorithm matches your niche, audience demographics, and engagement rate to brands actively looking for those exact profiles. You only see deals you're genuinely eligible for.",
  },
  {
    question: 'Is there a fee to sign up?',
    answer:
      'No. Joining CREATORSREWARDS is completely free. We take a small platform commission only when you complete a paid deal — nothing upfront.',
  },
  {
    question: 'Can I negotiate campaign rates?',
    answer:
      'Yes. Every campaign listing shows a base rate, but you can submit a counter-offer. Brands review counter-offers within 48 hours.',
  },
];

export const categories: { label: string; value: BlogCategory }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'CREATOR ECONOMY', value: 'creator-economy' },
  { label: 'MONETIZATION', value: 'monetization' },
  { label: 'TOOLS & TECH', value: 'tools-tech' },
  { label: 'GROWTH', value: 'growth' },
  { label: 'CASE STUDIES', value: 'case-studies' },
];

export const browseTopics: { label: string; value: BlogCategory }[] = [
  { label: 'MONETIZATION', value: 'monetization' },
  { label: 'CREATOR ECONOMY', value: 'creator-economy' },
  { label: 'TOOLS & TECH', value: 'tools-tech' },
  { label: 'GROWTH', value: 'growth' },
  { label: 'CASE STUDIES', value: 'case-studies' },
  { label: 'BRAND DEALS', value: 'all' },
  { label: 'COMMUNITY', value: 'all' },
  { label: 'ANALYTICS', value: 'all' },
];
