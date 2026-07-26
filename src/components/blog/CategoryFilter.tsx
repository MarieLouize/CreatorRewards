import { useSearchParams } from 'react-router-dom';
import { categories } from '../../data/blogPosts';
import type { BlogCategory } from '../../types/blog';

export default function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory =
    (searchParams.get('category') as BlogCategory) || 'all';

  const handleClick = (value: BlogCategory) => {
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <div className="flex border-b-2 border-cr-pink overflow-x-auto scrollbar-hide">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => handleClick(cat.value)}
            className={`
              flex-shrink-0 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-widest
              cursor-pointer border-0 border-r-2 border-cr-pink whitespace-nowrap
              transition-colors duration-200
              ${
                isActive
                  ? 'bg-cr-pink text-white'
                  : 'bg-cr-yellow text-cr-dark hover:bg-cr-blush'
              }
            `}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
