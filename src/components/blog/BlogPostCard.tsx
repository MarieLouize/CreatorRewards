import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, LucideTag, Timer } from 'lucide-react';
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="lg:h-[620px] group bg-cr-blush border-2 border-cr-pink rounded-lg overflow-hidden shadow-[4px_4px_0px_var(--cr-pink)] hover:shadow-[6px_6px_0px_var(--cr-pink)] transition-shadow duration-200"
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden h-48 md:h-96">
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded font-mono text-[10px] font-bold uppercase tracking-widest text-white bg-cr-pink">
            {post.tag}
          </div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 right-4 z-10"
          >
            {/* <Link
            to={`/blog/${post.slug}`}
            
          > */}

            <div className="w-10 h-10 bg-white rounded-[8px] flex items-center justify-center transition-transform duration-200 group-hover:rotate-45">
              <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="text-cr-pink transition-transform duration-200"
              />
            </div>

            {/* </Link> */}
          </motion.div>

          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className={`p-5 ${isFeatured ? 'md:p-7' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <LucideTag className="w-3 h-3 text-cr-pink" />
            <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-cr-pink">
              {post.category.replace('-', ' ')}
            </span>
          </div>

          <h3
            className={`
            font-condensed font-extrabold text-cr-pink uppercase leading-[100%] mb-3
            ${isFeatured ? 'text-2xl md:text-4xl' : 'text-lg'}
          `}
          >
            {post.title}
          </h3>

          <p
            className={`font-body text-cr-deep leading-relaxed mb-4 ${isFeatured ? 'text-sm md:text-base' : 'text-xs'}`}
          >
            {post.excerpt}
          </p>

          <div className="h-0.5 bg-cr-pink mb-2" />

          <div className="flex items-end justify-between">
            <div>
              <p className="font-body text-sm font-bold text-cr-dark">
                {post.author.name}
              </p>
              <p className="font-mono text-[10px] text-cr-deep">
                {post.author.role}
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-cr-deep">
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1">
                <Timer className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
