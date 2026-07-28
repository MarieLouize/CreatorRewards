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
    <div className="bg-cr-pink px-5 md:px-7 py-4 flex items-center justify-between ">
      <div className="max-w-[1440px] w-full mx-auto md:flex justify-between">
        <h2
          className="
          font-display text-lg md:text-xl lg:text-2xl 
          font-black text-white uppercase 
          tracking-[0.2em] md:tracking-[0.25em]
        "
        >
          Insights & Stories
        </h2>
        <span className="font-mono text-[10px] md:text-[11px] font-bold text-white/80 uppercase tracking-widest">
          {articleCount} articles this week
        </span>
      </div>
    </div>
  );
}
