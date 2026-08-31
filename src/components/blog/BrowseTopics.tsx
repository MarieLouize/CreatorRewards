import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { browseTopics } from '../../data/blogPosts';

export default function BrowseTopics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleClick = (value: string) => {
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <div className="bg-cr-blush border-2 border-cr-pink rounded-[4px] overflow-hidden ">
      <div className="px-5 py-4 bg-cr-pink border-cr-pink/20 flex items-center justify-between">
        <h3 className="font-condensed text-xs font-extrabold text-white uppercase tracking-widest">
          Browse Topics
        </h3>
        <span className="font-mono text-[10px] text-cr-dark/60 font-bold uppercase">
          {browseTopics.length} Topics
        </span>
      </div>

      <div className="p-5 flex flex-wrap gap-2">
        {browseTopics.map((topic, index) => {
          const isActive = currentCategory === topic.value;

          return (
            <motion.button
              key={index}
              onClick={() => handleClick(topic.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3.5 py-1.5 rounded-[4px] border-2 border-cr-pink font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer select-none ${
                isActive
                  ? 'bg-cr-pink text-white'
                  : 'bg-white text-cr-pink hover:bg-cr-pink/10'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                {topic.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
