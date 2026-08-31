import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { blogPosts } from '../../data/blogPosts';
import type { BlogCategory } from '../../types/blog';
import BlogPostCard from './BlogPostCard';

// Add explicit Variants type annotation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Add explicit Variants type annotation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1], // Now typed cleanly via Variants
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

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
    <AnimatePresence mode="wait">
      <motion.div
        key={category}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="flex flex-col gap-6"
      >
        {/* Featured Card */}
        {featuredPost && (
          <motion.div variants={cardVariants} layout>
            <BlogPostCard post={featuredPost} variant="featured" />
          </motion.div>
        )}

        {/* Grid Cards */}
        {gridPosts.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {gridPosts.map((post) => (
              <motion.div key={post.id} variants={cardVariants} layout>
                <BlogPostCard post={post} variant="grid" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            variants={cardVariants}
            className="py-16 text-center border-2 border-dashed border-cr-dark/20 rounded-2xl"
          >
            <p className="font-display text-lg text-cr-dark/60 uppercase">
              No articles found in this category
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
