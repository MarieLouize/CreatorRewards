import type { BlogCategory, BlogPost, FAQItem } from '../types/blog';
import { getImageSrc } from '../utils/imagesUtils';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'creator-millionaires-b2b',
    title: 'HOW TO GET PAID AS A UGC CREATOR IN AFRICA (THE COMPLETE GUIDE)',
    excerpt:
      "The creator economy is worth hundreds of billions of dollars globally. Africa's share of that number is still being decided and right now, it is wide open.",
    content: '',
    category: 'blueprint',
    tag: 'featured',
    author: { name: 'Priya Nkosi', role: 'Head of Creator Research' },
    date: '2026-06-24',
    readTime: '9 min read',
    image: getImageSrc('creatorImg.png'),
    blocks: [
      {
        type: 'paragraph',
        text: "The creator economy is worth hundreds of billions of dollars globally. Africa's share of that number is still being decided and right now, it is wide open.",
      },
      {
        type: 'paragraph',
        text: 'Talented creators across Nigeria, Ghana, Kenya, South Africa, and the diaspora are producing content every single day. Product reviews. Demo videos. Unboxing clips. Testimonials that convert better than any polished ad a brand could produce. The demand for that content is real. The brands are ready to pay.',
      },
      {
        type: 'paragraph',
        text: 'The problem has never been the content. It has been infrastructure, clear pathways to find brand deals, structured ways to get paid, and platforms that actually understand the African market.',
      },
      {
        type: 'paragraph',
        text: 'This guide breaks all of it down. Whether you are a video creator, a Clipper, or an Affiliate, this is your starting point.',
      },
      {
        type: 'callout',
        linkText: 'Join CreatorsRewards',
        text: ' — built for African creators.',
        linkUrl: '/join',
      },
    ],
  },
  {
    id: '2',
    slug: 'pricing-models-mrr-q1-2026',
    title: "WHAT IS A UGC CREATOR? (AND WHY YOU DON'T NEED A FOLLOWING)",
    excerpt:
      'UGC stands for user-generated content. A brand pays a UGC creator because they produce authentic, conversion-focused content — not for their audience reach.',
    content: '',
    category: 'creator-basics',
    tag: 'strategy',
    author: { name: 'Marcus Delgado', role: 'Growth Economist' },
    date: '2026-06-20',
    readTime: '6 min read',
    image: getImageSrc('monetizationImg.png'),
    blocks: [
      {
        type: 'heading2',
        text: "What Is a UGC Creator? (And Why You Don't Need a Following)",
      },
      {
        type: 'heading3',
        text: 'UGC creators vs. influencers — the key difference',
      },
      {
        type: 'paragraph',
        text: 'UGC stands for user-generated content. As a career path, it means one specific thing: you create content for brands, not about your own life or audience.',
      },
      {
        type: 'paragraph',
        text: 'Influencer marketing is about reach. A brand pays an influencer because of their audience.',
      },
      {
        type: 'paragraph',
        text: 'UGC is different. A brand pays a UGC creator because they can produce authentic, conversion-focused content. You do not need followers. You need skill.',
      },
      {
        type: 'heading3',
        text: 'The three creator types on CreatorsRewards',
      },
      {
        type: 'bulletList',
        items: [
          {
            boldPrefix: 'UGC Creators',
            text: ' produce original content for brands based on a brief. You are the talent and the production.',
          },
          {
            boldPrefix: 'Clippers',
            text: ' take existing long-form content and cut it into high-performing short-form clips.',
          },
          {
            boldPrefix: 'Affiliates',
            text: ' drive sales through trackable links and earn commission on every conversion.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Each path is legitimate. Each path pays.',
      },
      {
        type: 'heading3',
        text: 'Why brands are shifting budget to UGC',
      },
      {
        type: 'paragraph',
        text: 'Traditional advertising is losing trust. Consumers scroll past polished brand content and stop for something that looks real. UGC consistently converts at higher rates than studio-produced creative and brands know it.',
      },
      {
        type: 'paragraph',
        text: 'For African creators, this shift is a direct opportunity. Brands want real people, real environments, real reactions. That is not a limitation, that is the product.',
      },
      {
        type: 'callout',
        linkText: 'Join CreatorsRewards',
        text: ' — built for African creators.',
        linkUrl: '/join',
      },
    ],
  },
  {
    id: '3',
    slug: 'Creator-stack-2026',
    title:
      'THE AFRICAN CREATOR ECONOMY: GROWTH, GAPS, AND DIASPORA OPPORTUNITY',
    excerpt:
      'The African creator economy is growing fast, but global platforms leave local talent out. Here is what the numbers say and where the gaps lie.',
    content: '',
    category: 'market-report',
    tag: 'deep dive',
    author: { name: 'Aiko Tanaka', role: 'Product Strategist' },
    date: '2026-06-17',
    readTime: '11 min read',
    image: getImageSrc('toolsTechImg.png'),
    blocks: [
      {
        type: 'heading2',
        text: 'The African Creator Economy — What the Numbers Say',
      },
      {
        type: 'heading3',
        text: 'Growth, gaps, and why global platforms leave African creators out',
      },
      {
        type: 'paragraph',
        text: 'The African creator economy is growing fast. Nigeria alone has tens of millions of active content creators across platforms. But the infrastructure has not kept up.',
      },
      {
        type: 'paragraph',
        text: 'Global creator platforms were built for Western markets. Payment systems assume a US bank account. Brand networks skew toward creators in the US, UK, and Europe. African creators with genuine skill have been functionally invisible to brands willing to pay for their work.',
      },
      {
        type: 'paragraph',
        text: 'The gap is not talent. It is access.',
      },
      {
        type: 'heading3',
        text: 'Nigeria, Ghana, Kenya, South Africa and the diaspora opportunity',
      },
      {
        type: 'paragraph',
        text: 'Creator activity in Africa is concentrated in key markets but it is not limited to them. Nigerian creators in London, Ghanaian creators in Toronto, South African creators in Dubai, the diaspora is enormous, digitally active, and deeply connected to African brands and audiences.',
      },
      {
        type: 'paragraph',
        text: "CreatorsRewards is built for all of them. The platform understands that 'African creator' is not a geography, it is a cultural and economic identity that extends globally.",
      },
    ],
  },
  {
    id: '4',
    slug: 'nigerian-beauty-brand-case-study',
    title:
      'HOW UGC CREATORS GET PAID: BRAND DEALS, PERFORMANCE & PAYMENT RAILS',
    excerpt:
      'Cross-border payments in Africa are broken. Here is how performance-based pay works and how dual Fiat and USDT rails solve payout friction.',
    content: '',
    category: 'payouts & rails',
    tag: 'getting paid',
    author: { name: 'Editorial Team', role: 'CREATORSREWARDS Magazine' },
    date: '2026-06-14',
    readTime: '14 min read',
    image: getImageSrc('casestudyImg.png'),
    blocks: [
      {
        type: 'heading2',
        text: 'How UGC Creators Actually Get Paid',
      },
      {
        type: 'heading3',
        text: 'Brand deals vs. affiliate commissions vs. platform payouts',
      },
      {
        type: 'paragraph',
        text: 'There are three main ways creators earn on performance-driven platforms:',
      },
      {
        type: 'bulletList',
        items: [
          {
            boldPrefix: 'Brand deals',
            text: ' — a brand commissions specific content at an agreed rate. Flat fee per deliverable.',
          },
          {
            boldPrefix: 'Affiliate commissions',
            text: ' — you promote a product with a unique link and earn a percentage of every sale you drive.',
          },
          {
            boldPrefix: 'Platform payouts',
            text: ' — the platform aggregates campaigns and pays based on performance metrics: views, clicks, conversions.',
          },
        ],
      },
      {
        type: 'heading3',
        text: 'How performance-based pay works (and why it rewards quality)',
      },
      {
        type: 'paragraph',
        text: 'Flat-fee models pay the same whether your content drives ten sales or ten thousand. Performance models do not.',
      },
      {
        type: 'paragraph',
        text: 'On a performance platform, your track record becomes your asset. A creator who consistently drives conversions commands higher rates. Your portfolio is your leverage — not your follower count.',
      },
      {
        type: 'heading3',
        text: 'The payment problem in Africa and how CreatorsRewards solves it',
      },
      {
        type: 'paragraph',
        text: 'The single biggest friction point for African creators has always been infrastructure. Cross-border payments are slow, expensive, and often inaccessible. Receiving USD into a Nigerian account has historically been unreliable.',
      },
      {
        type: 'paragraph',
        text: 'CreatorsRewards removes this friction with dual payment rails built for the African market:',
      },
      {
        type: 'bulletList',
        items: [
          {
            boldPrefix: 'Fiat',
            text: ' — local currency payouts directly to your bank account. Fast, familiar, no conversion friction.',
          },
          {
            boldPrefix: 'USDT',
            text: ' — dollar-pegged stablecoin payouts to your wallet. Ideal for diaspora creators.',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'You choose the rail that works for your situation. The platform handles the rest.',
      },
    ],
  },
  {
    id: '5',
    slug: 'platform-dependency',
    title: 'WHAT BRANDS ACTUALLY WANT FROM A UGC CREATOR (AND PORTFOLIO SPECS)',
    excerpt:
      'Brands check your work, not your follower count. Learn the content types that convert best and what a high-performing starter portfolio requires.',
    content: '',
    category: 'brand-standards',
    tag: 'best practices',
    author: { name: 'James Fortier', role: 'Creator Economist' },
    date: '2026-06-10',
    readTime: '8 min read',
    image: getImageSrc('analysisImg.png'),
    blocks: [
      {
        type: 'heading2',
        text: 'What Brands Actually Want From a UGC Creator',
      },
      {
        type: 'heading3',
        text: 'Output quality over follower count',
      },
      {
        type: 'paragraph',
        text: 'Brands commissioning UGC do not check your follower count. They check your work. Can you follow a brief? Can you produce content that looks authentic but is still strategically composed? Can you deliver on time?',
      },
      {
        type: 'paragraph',
        text: 'A creator with 800 followers and a tight portfolio will consistently win work over a creator with 50,000 followers and inconsistent output.',
      },
      {
        type: 'heading3',
        text: 'The content types brands commission most',
      },
      {
        type: 'bulletList',
        items: [
          {
            boldPrefix: 'Product demo videos',
            text: ' — showing how a product works in a real environment',
          },
          {
            boldPrefix: 'Testimonials',
            text: ' — first-person, camera-facing reviews that feel genuine',
          },
          {
            boldPrefix: 'Unboxing clips',
            text: ' — the first-impression reveal that drives curiosity',
          },
          {
            boldPrefix: 'Lifestyle integration',
            text: ' — the product appearing naturally in your daily life',
          },
          {
            boldPrefix: 'Before/after content',
            text: ' — showing a transformation in beauty, fitness, or home',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Short-form video dominates. If you can produce a compelling 15-60 second clip, you are in the right format.',
      },
      {
        type: 'heading3',
        text: 'What a strong UGC portfolio looks like',
      },
      {
        type: 'paragraph',
        text: 'You do not need ten brand deals to start. You need three to five strong pieces that demonstrate range and execution:',
      },
      {
        type: 'bulletList',
        items: [
          {
            boldPrefix: 'Clean framing and lighting',
            text: ' — no shaky cam, no cluttered backgrounds',
          },
          {
            boldPrefix: 'Clear audio',
            text: ' — brands will not use content where the voiceover is muddy',
          },
          {
            boldPrefix: 'Structured delivery',
            text: ' — hook, product moment, clear close',
          },
          {
            boldPrefix: 'Variety',
            text: ' — at least two different content styles or product categories',
          },
        ],
      },
      {
        type: 'paragraph',
        text: 'Shoot spec content if you have no brand deals yet. Pick a product you own, write a brief for yourself, and produce the video. Brands cannot tell the difference.',
      },
      {
        type: 'heading3',
        text: 'Red flags brands avoid and how to never be one',
      },
      {
        type: 'bulletList',
        items: [
          { text: 'Missing deadlines without communication' },
          { text: 'Ignoring the brief and producing off-brand content' },
          { text: 'Inconsistent output quality across deliverables' },
          { text: 'Unavailability when revisions are needed' },
        ],
      },
      {
        type: 'paragraph',
        text: 'The creator economy is small. Reputation compounds in both directions.',
      },
    ],
  },
  {
    id: '6',
    slug: 'platform-fatigue-creator-response',
    title: 'HOW TO GET STARTED AS A UGC CREATOR IN AFRICA (STEP BY STEP)',
    excerpt:
      'A practical 4-step roadmap for African creators: pick a niche, build a 3-piece portfolio, join a dedicated platform, and scale your earnings.',
    content: '',
    category: 'action-plan',
    tag: 'roadmap',
    author: { name: 'Priya Nkosi', role: 'Head of Creator Research' },
    date: '2026-06-06',
    readTime: '7 min read',
    image: getImageSrc('marketplaceImg.png'),
    blocks: [
      {
        type: 'heading2',
        text: 'How to Get Started as a UGC Creator in Africa (Step by Step)',
      },
      {
        type: 'paragraph',
        text: 'Step 1: Pick a niche or content format — You do not have to be a generalist. Niche creators are easier for brands to trust because the relevance is obvious. Common entry niches: beauty and skincare, food and lifestyle, fashion, tech and gadgets, fitness, fintech, home and interior. Pick the space where you already have context.',
      },
      {
        type: 'paragraph',
        text: 'Step 2: Build a starter portfolio (3-5 pieces is enough) — Shoot your portfolio content before you apply for any campaigns. Use products you already own. Write yourself a brief: brand name, product benefit, target audience, tone of voice, deliverable format. Treat it like a real job.',
      },
      {
        type: 'paragraph',
        text: 'Step 3: Join a platform that connects you to brands — The right platform removes the friction of finding and closing brand deals yourself. You focus on creating. The platform handles brand matchmaking, campaign management, and payment infrastructure.',
      },
      {
        type: 'callout',
        linkText: 'Join CreatorsRewards',
        text: ' — built for African creators.',
        linkUrl: '/join',
      },
      {
        type: 'paragraph',
        text: 'Step 4: Deliver, track your results, raise your rating — Every campaign is a data point. On CreatorsRewards, performance data is built into the platform. You see your conversion metrics. You build a track record. That track record becomes leverage for higher ratings for future campaigns.',
      },
      {
        type: 'heading3',
        text: "Not a video creator? Here's how Clippers and Affiliates fit in",
      },
      {
        type: 'paragraph',
        text: 'Clippers: If you are a strong editor with an eye for what works in short-form, Clipping is a direct path to income without producing original content.',
      },
      {
        type: 'paragraph',
        text: 'Affiliates: If you have an engaged audience in a specific niche, Affiliate marketing lets you earn on every sale you drive. No production required.',
      },
      {
        type: 'heading2',
        text: 'Ready to Start Earning?',
      },
      {
        type: 'paragraph',
        text: 'The path is straightforward: build your skill, build a portfolio, join a platform that gives you access to brands and pays you reliably, deliver results, and grow your rates.',
      },
      {
        type: 'callout',
        linkText: 'Join CreatorsRewards',
        text: ' — built for African creators.',
        linkUrl: '/join',
      },
    ],
  },

  {
    id: '7',
    slug: 'choosing-the-right-creator-platform-africa',
    title:
      'CHOOSING THE RIGHT PLATFORM: WHAT AFRICAN UGC CREATORS MUST LOOK FOR',
    excerpt:
      'Not all creator platforms are built equal. From payment reliability to local market context, here are the non-negotiable criteria before signing up.',
    content: '',
    category: 'infrastructure',
    tag: 'playbook',
    author: { name: 'Marcus Delgado', role: 'Growth Economist' },
    date: '2026-06-02',
    readTime: '5 min read',
    image: getImageSrc('marketplaceImg.png'), // Or create/use another image key
    blocks: [
      {
        type: 'heading2',
        text: 'Choosing the Right Platform — What to Look For',
      },
      {
        type: 'heading3',
        text: 'The criteria that actually matter',
      },
      {
        type: 'paragraph',
        text: 'When evaluating platforms to find brand deals and monetize your content, do not get distracted by flashy marketing. Look at the core execution:',
      },
      {
        type: 'bulletList',
        items: [
          {
            boldPrefix: 'Payment reliability',
            text: ' — does the platform pay on a clear, predictable schedule without holds?',
          },
          {
            boldPrefix: 'Payment infrastructure',
            text: ' — can you actually withdraw funds seamlessly in your local currency or stablecoins?',
          },
          {
            boldPrefix: 'Brand quality',
            text: ' — are the participating brands real businesses with dedicated budgets?',
          },
          {
            boldPrefix: 'Creator support',
            text: ' — does the platform offer resources, feedback, and growth pathways?',
          },
          {
            boldPrefix: 'African market understanding',
            text: ' — does the platform understand local banking, cultural context, and creator realities?',
          },
        ],
      },
      {
        type: 'heading3',
        text: 'Why most global platforms underserve African creators',
      },
      {
        type: 'paragraph',
        text: 'Global platforms were built for Western markets, treating other regions as an afterthought. This leads to broken payout systems for African bank accounts, brand networks excluding African businesses, and support teams lacking local context.',
      },
      {
        type: 'heading3',
        text: 'What CreatorsRewards was built to fix',
      },
      {
        type: 'paragraph',
        text: 'CreatorsRewards was built specifically to close this gap — a performance-driven platform where African creators connect with brands that want their work, get paid in rails that actually function, and build track records that grow their earning power. No gatekeeping. No nepotism. Measurable results, transparent payouts.',
      },
      {
        type: 'callout',
        linkText: 'Join CreatorsRewards',
        text: ' — built for African creators.',
        linkUrl: '/join',
      },
    ],
  },
];
export const faqItems: FAQItem[] = [
  {
    question: 'Do I need a large following to join CreatorsRewards?',
    answer:
      'No. CreatorsRewards is a UGC platform. Brands are paying for content quality and conversion performance, not your follower count. A strong portfolio matters more than a large audience.',
  },
  {
    question: 'How much can a UGC creator earn in Nigeria?',
    answer:
      'Earnings vary based on content type, campaign performance, and the brands you work with. On performance-based platforms, creators who deliver consistent results earn significantly more than flat-fee models allow. Your track record directly influences your earning potential over time.',
  },
  {
    question: 'How quickly do creators get paid?',
    answer:
      'CreatorsRewards processes payouts on a defined schedule tied to campaign completion and performance validation. Both local currency and USDT rails are designed for speed and reliability.',
  },
  {
    question: 'Can I join CreatorsRewards from outside Nigeria?',
    answer:
      'Yes. CreatorsRewards is built for African creators and the African diaspora globally. If you create content anywhere in Africa or in the diaspora, the platform is for you.',
  },
  {
    question: 'Can I negotiate campaign rates?',
    answer:
      'Yes. Every campaign listing shows a base rate, but you can submit a counter-offer. Brands review counter-offers within 48 hours.',
  },
];

export const categories: { label: string; value: BlogCategory }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'BLUEPRINT', value: 'blueprint' },
  { label: 'CREATOR BASICS', value: 'creator-basics' },
  { label: 'MARKET REPORT', value: 'market-report' },
  { label: 'BRAND STANDARDS', value: 'brand-standards' },
  { label: 'PAYOUTS & RAILS', value: 'payouts & rails' },
  { label: 'ACTION PLAN', value: 'action-plan' },
  { label: 'INFRASTRUCTURE', value: 'infrastructure' },
];

export const browseTopics: { label: string; value: BlogCategory }[] = [
  { label: 'blueprint', value: 'blueprint' },
  { label: 'CREATOR BASICS', value: 'creator-basics' },

  { label: 'MARKET REPORT', value: 'market-report' },
  { label: 'BRAND STANDARDS', value: 'brand-standards' },
  { label: 'PAYOUTS & RAILS', value: 'payouts & rails' },
  { label: 'ACTION PLAN', value: 'action-plan' },
  { label: 'INFRASTRUCTURE', value: 'infrastructure' },
  { label: 'BRAND DEALS', value: 'all' },
  { label: 'COMMUNITY', value: 'all' },
  { label: 'ANALYTICS', value: 'all' },
];
