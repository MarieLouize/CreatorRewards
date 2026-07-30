import { motion } from 'framer-motion';
import BlogNavbar from '../../components/blog/BlogNavbar';
import BlogBanner from '../../components/blog/BlogBanner';
import CategoryFilter from '../../components/blog/CategoryFilter';
import BlogGrid from '../../components/blog/BlogGrid';
import BlogSidebar from '../../components/blog/BlogSidebar';

export default function BlogPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-cr-yellow flex flex-col"
    >
      <BlogNavbar />
      <BlogBanner />
      <CategoryFilter />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 py-8 md:px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          <div className="flex-1 min-w-0">
            <BlogGrid />
          </div>

          <div className="w-full lg:w-80 flex-shrink-0">
            <BlogSidebar />
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
