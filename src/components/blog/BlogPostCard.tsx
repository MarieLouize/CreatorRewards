import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { BlogPost } from '../../types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  variant?: 'featured' | 'grid';
}

export default function BlogPostCard({
  post,
  variant = 'grid',
}: BlogPostCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        bg-cr-blush border-4 border-cr-pink rounded-3xl overflow-hidden
        shadow-[8px_8px_0px_var(--cr-dark)] transition-shadow duration-200
        hover:shadow-[12px_12px_0px_var(--cr-dark)]
        ${isFeatured ? 'w-full' : 'w-full'}
      `}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${isFeatured ? 'h-64 md:h-96' : 'h-48'}`}
      >
        {/* Tag Badge */}
        <div
          className={`
            absolute top-4 left-4 z-10 px-3 py-1.5 rounded
            font-mono text-[10px] font-bold uppercase tracking-widest text-white
            ${post.tag === 'featured' ? 'bg-cr-pink' : 'bg-cr-pink/90'}
          `}
        >
          {post.tag}
        </div>

        {/* Arrow CTA */}
        <Link
          to={`/blog/${post.slug}`}
          className="
            absolute bottom-4 right-4 z-10 w-10 h-10 bg-white rounded-lg
            flex items-center justify-center
            shadow-[3px_3px_0px_var(--cr-dark)]
            group transition-transform duration-200
            hover:rotate-45
          "
        >
          <ArrowUpRight
            size={18}
            strokeWidth={2.5}
            className="text-cr-pink transition-transform duration-200 group-hover:rotate-45"
          />
        </Link>

        {/* Placeholder Image */}
        <div className="w-full h-full bg-cr-yellow/50 flex items-center justify-center">
          <div className="w-16 h-16 bg-cr-pink/20 rounded-full" />
        </div>
      </div>

      {/* Content Section */}
      <div className={`p-5 ${isFeatured ? 'md:p-7' : ''}`}>
        {/* Category Label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cr-pink" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-cr-pink">
            {post.category.replace('-', ' ')}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`
            font-display font-extrabold text-cr-pink uppercase leading-tight mb-3
            ${isFeatured ? 'text-2xl md:text-4xl' : 'text-lg'}
          `}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className={`font-body text-cr-dark/70 leading-relaxed mb-4 ${isFeatured ? 'text-sm md:text-base' : 'text-xs'}`}
        >
          {post.excerpt}
        </p>

        {/* Divider */}
        <div className="h-px bg-cr-pink/30 mb-4" />

        {/* Author + Meta */}
        <div className="flex items-end justify-between">
          <div>
            <p className="font-body text-sm font-bold text-cr-dark">
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
      </div>
    </motion.article>
  );
}
