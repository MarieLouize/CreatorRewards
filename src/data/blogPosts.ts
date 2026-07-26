import type { BlogCategory, BlogPost, FAQItem } from '../types/blog';

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
    image: '/images/blog/b2b-creators.jpg',
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
    image: '/images/blog/pricing-models.jpg',
  },
  {
    id: '3',
    slug: 'platform-fatigue-creator-response',
    title: `The Marketplace Model Is Broken for Most Creators (And Who's Fixing It)
`,
    excerpt: `30% cuts, opaque ranking signals, payment holds. The creator-first platforms are finally arriving — but not from the incumbents.`,
    content: '',
    category: 'monetization',
    tag: 'opinion',
    author: { name: 'Priya Nkosi', role: 'Head of Creator Research' },
    date: '2026-06-18',
    readTime: '4 min read',
    image: '/images/blog/platform-fatigue.jpg',
  },
  {
    id: '4',
    slug: 'ai-workflow-stack-2026',
    title: 'THE AI WORKFLOW STACK EVERY CREATOR NEEDS IN 2026',
    excerpt:
      'From ideation to distribution, these tools cut production time in half without sacrificing quality.',
    content: '',
    category: 'tools-tech',
    tag: 'deep-dive',
    author: { name: 'Tunde Bakare', role: 'Tech Editor' },
    date: '2026-06-15',
    readTime: '8 min read',
    image: '/images/blog/ai-workflows.jpg',
  },
  {
    id: '5',
    slug: 'micro-creators-outgrowing-mega',
    title: 'HOW MICRO-CREATORS ARE OUTGROWING MEGA-INFLUENCERS',
    excerpt:
      'Smaller audiences, deeper trust, better monetization. The math is simple.',
    content: '',
    category: 'growth',
    tag: 'strategy',
    author: { name: 'Amara Diallo', role: 'Audience Growth Lead' },
    date: '2026-06-12',
    readTime: '5 min read',
    image: '/images/blog/micro-creators.jpg',
  },
  {
    id: '6',
    slug: 'nigerian-beauty-brand-case-study',
    title:
      'CASE STUDY: HOW A NIGERIAN BEAUTY BRAND BUILT A $2M CREATOR PROGRAM',
    excerpt:
      'No celebrity endorsements. No massive ad spend. Just smart creator partnerships and authentic storytelling.',
    content: '',
    category: 'case-studies',
    tag: 'case-study',
    author: { name: 'Chioma Eze', role: 'Brand Partnerships Director' },
    date: '2026-06-10',
    readTime: '11 min read',
    image: '/images/blog/beauty-case-study.jpg',
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
