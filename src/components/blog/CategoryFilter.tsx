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
    <div className="flex gap-2 bg-cr-yellow border-b-2 border-cr-pink overflow-x-auto scrollbar-hide">
      <div className="max-w-[1440px] w-full mx-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => handleClick(cat.value)}
              className={`
          flex-shrink-0 px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-widest
          cursor-pointer whitespace-nowrap border-2 transition-all duration-200
          ${isActive ? 'bg-cr-pink text-[white] border-transparent' : ' text-cr-deep border-transparent md:border-r-cr-pink'}
        `}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
