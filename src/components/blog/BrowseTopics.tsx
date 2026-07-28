import { useSearchParams } from 'react-router-dom';
import { browseTopics } from '../../data/blogPosts';

export default function BrowseTopics() {
  const [, setSearchParams] = useSearchParams();

  const handleClick = (value: string) => {
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <div className="bg-cr-blush border-4 border-cr-pink rounded-3xl overflow-hidden shadow-[6px_6px_0px_var(--cr-dark)]">
      <div className="px-5 py-4 border-b-2 border-cr-pink/20">
        <h3 className="font-display text-xs font-extrabold text-cr-pink uppercase tracking-widest">
          Browse Topics
        </h3>
      </div>
      <div className="p-5 flex flex-wrap gap-2">
        {browseTopics.map((topic, index) => (
          <button
            key={index}
            onClick={() => handleClick(topic.value)}
            className="px-3 py-1.5 rounded-full border-2 border-cr-pink font-mono text-[10px] font-bold uppercase tracking-wider text-cr-pink bg-white hover:bg-cr-pink hover:text-white transition-colors cursor-pointer"
          >
            {topic.label}
          </button>
        ))}
      </div>
    </div>
  );
}
