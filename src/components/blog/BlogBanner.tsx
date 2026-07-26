import { useMemo } from 'react';
import { blogPosts } from '../../data/blogPosts';

function isThisWeek(dateStr: string): boolean {
  const postDate = new Date(dateStr);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return postDate >= weekAgo && postDate <= now;
}

export default function BlogBanner() {
  const articleCount = useMemo(
    () => blogPosts.filter((p) => isThisWeek(p.date)).length,
    []
  );

  return (
    <div className="bg-cr-pink px-7 py-3.5 flex items-center justify-between">
      <h2 className="font-display text-sm md:text-lg font-extrabold text-white uppercase tracking-widest">
        Insights & Stories
      </h2>
      <span className="font-mono text-[11px] font-bold text-white/80 uppercase tracking-widest">
        {articleCount} articles this week
      </span>
    </div>
  );
}
