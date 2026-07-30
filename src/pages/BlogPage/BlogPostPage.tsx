import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import BlogNavbar from '../../components/blog/BlogNavbar';
import BlogSidebar from '../../components/blog/BlogSidebar';
import ArticleContent from '../../components/blog/ArticleContent';
// import ArticleContent from '../../components/ArticleContent'; // 1. Import your block renderer

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-cr-yellow flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-extrabold text-cr-pink uppercase mb-4">
            Post Not Found
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-cr-pink text-white font-display text-sm font-bold uppercase tracking-wide px-6 py-3 rounded shadow-[4px_4px_0px_var(--cr-dark)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cr-yellow flex flex-col">
      <BlogNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Back Link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cr-dark uppercase tracking-widest mb-6 hover:text-cr-pink transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={2.5} /> Back to Blog
            </Link>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden border-4 border-cr-pink shadow-[8px_8px_0px_var(--cr-dark)] mb-8">
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded bg-cr-pink font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                {post.tag}
              </div>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cr-pink" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-cr-pink">
                {post.category.replace('-', ' ')}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-cr-pink uppercase leading-tight mb-6">
              {post.title}
            </h1>

            {/* Author + Date */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-cr-pink/20">
              <div>
                <p className="font-body text-base font-bold text-cr-dark">
                  {post.author.name}
                </p>
                <p className="font-mono text-[10px] text-cr-dark/50">
                  {post.author.role}
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-cr-dark/50">
                <span>
                  {new Date(post.date).toLocaleDateString('en-NG', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-cr-dark/30" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Content Renderer */}
            <div className="prose prose-lg max-w-none">
              {post.blocks && post.blocks.length > 0 ? (
                <ArticleContent blocks={post.blocks} />
              ) : post.content ? (
                <div
                  className="font-body text-cr-dark leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="space-y-4">
                  <p className="font-body text-cr-dark/60 italic">
                    Full article content coming soon...
                  </p>
                  <div className="h-4 bg-cr-pink/10 rounded w-3/4" />
                  <div className="h-4 bg-cr-pink/10 rounded w-full" />
                  <div className="h-4 bg-cr-pink/10 rounded w-5/6" />
                  <div className="h-4 bg-cr-pink/10 rounded w-2/3" />
                </div>
              )}
            </div>

            {/* Share / CTA */}
            <div className="mt-12 pt-8 border-t-2 border-cr-pink/20">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-cr-dark/50">
                  Share this article
                </p>
                <motion.button
                  whileHover={{ rotate: 45 }}
                  className="w-10 h-10 bg-cr-pink rounded-lg flex items-center justify-center shadow-[3px_3px_0px_var(--cr-dark)]"
                >
                  <ArrowUpRight size={18} className="text-white" />
                </motion.button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
