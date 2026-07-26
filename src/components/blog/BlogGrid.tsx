import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import type { BlogCategory } from '../../types/blog';
import BlogPostCard from './BlogPostCard';

export default function BlogGrid() {
  const [searchParams] = useSearchParams();
  const category = (searchParams.get('category') as BlogCategory) || 'all';

  const filteredPosts = useMemo(() => {
    if (category === 'all') return blogPosts;
    return blogPosts.filter((p) => p.category === category);
  }, [category]);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="flex flex-col gap-6">
      {/* Featured Card */}
      {featuredPost && <BlogPostCard post={featuredPost} variant="featured" />}

      {/* Grid Cards */}
      {gridPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gridPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
