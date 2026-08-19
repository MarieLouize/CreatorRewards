import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../../data/blogPosts';

function isThisWeek(dateStr: string): boolean {
  const postDate = new Date(dateStr);
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  weekAgo.setHours(0, 0, 0, 0);
  now.setHours(23, 59, 59, 999);

  return postDate >= weekAgo && postDate <= now;
}

export default function BlogBanner() {
  const articleCount = useMemo(() => {
    const recentCount = blogPosts.filter((p) => isThisWeek(p.date)).length;
    return recentCount > 0 ? recentCount : blogPosts.length;
  }, []);

  const label = articleCount === 1 ? 'article' : 'articles';
  const copy =
    articleCount === blogPosts.length && blogPosts.length > 0
      ? `${articleCount} ${label} available now`
      : `${articleCount} ${label} this week`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-cr-pink px-5 md:px-7 py-4 flex items-center justify-between"
    >
      <div className="max-w-[1440px] w-full mx-auto md:flex justify-between items-center gap-3">
        <h2
          className="
          font-display text-lg md:text-xl lg:text-2xl 
          font-black text-white uppercase 
          tracking-[0.2em] md:tracking-[0.25em]
        "
        >
          Insights & Stories
        </h2>
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="font-mono text-[10px] md:text-[11px] font-bold text-white/80 uppercase tracking-widest"
        >
          {copy}
        </motion.span>
      </div>
    </motion.div>
  );
}
