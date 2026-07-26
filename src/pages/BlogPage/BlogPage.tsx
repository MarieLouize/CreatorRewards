import BlogNavbar from '../../components/blog/BlogNavbar';
import BlogBanner from '../../components/blog/BlogBanner';
import CategoryFilter from '../../components/blog/CategoryFilter';
import BlogGrid from '../../components/blog/BlogGrid';
import BlogSidebar from '../../components/blog/BlogSidebar';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-cr-yellow flex flex-col">
      <BlogNavbar />
      <BlogBanner />
      <CategoryFilter />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-5 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Posts */}
          <div className="flex-1 min-w-0">
            <BlogGrid />
          </div>

          {/* Sidebar - moves to bottom on mobile */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
