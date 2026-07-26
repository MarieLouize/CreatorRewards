import { browseTopics } from '../../data/blogPosts';

export default function BrowseTopics() {
  return (
    <div className="bg-cr-blush border-4 border-cr-pink rounded-3xl overflow-hidden shadow-[6px_6px_0px_var(--cr-dark)]">
      {/* Header */}
      <div className="px-5 py-4 border-b-2 border-cr-pink/20">
        <h3 className="font-display text-xs font-extrabold text-cr-pink uppercase tracking-widest">
          Browse Topics
        </h3>
      </div>

      {/* Topics */}
      <div className="p-5 flex flex-wrap gap-2">
        {browseTopics.map((topic, index) => (
          <span
            key={index}
            className="
              px-3 py-1.5 rounded-full border-2 border-cr-pink
              font-mono text-[10px] font-bold uppercase tracking-wider text-cr-pink
              bg-white
            "
          >
            {topic.label}
          </span>
        ))}
      </div>
    </div>
  );
}
