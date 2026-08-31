import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { ContentBlock } from '../../types/blog';
// import type { ContentBlock } from '../types/blog';

interface ArticleContentProps {
  blocks?: ContentBlock[];
  fallbackContent?: string;
}

export default function ArticleContent({
  blocks,
  fallbackContent,
}: ArticleContentProps) {
  if (!blocks || blocks.length === 0) {
    if (fallbackContent) {
      return (
        <div
          className="font-body text-cr-dark leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: fallbackContent }}
        />
      );
    }
    return null;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading2':
            return (
              <h2
                key={index}
                className="font-display text-2xl md:text-3xl font-extrabold text-cr-pink uppercase tracking-tight pt-6 pb-2 border-b-2 border-cr-pink/20"
              >
                {block.text}
              </h2>
            );

          case 'heading3':
            return (
              <h3
                key={index}
                className="font-display text-lg md:text-xl font-bold text-cr-dark uppercase pt-4"
              >
                {block.text}
              </h3>
            );

          case 'paragraph':
            return (
              <p
                key={index}
                className="font-body text-sm md:text-base text-cr-dark leading-relaxed"
              >
                {block.text}
              </p>
            );

          case 'bulletList':
            return (
              <ul key={index} className="space-y-3 pl-2 my-4">
                {block.items?.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="flex items-start gap-3 text-sm md:text-base"
                  >
                    <span className="w-2 h-2 rounded-full bg-cr-pink shrink-0 mt-2" />
                    <span className="font-body text-cr-dark leading-relaxed">
                      {item.boldPrefix && (
                        <strong className="font-bold text-cr-dark pr-1">
                          {item.boldPrefix}
                        </strong>
                      )}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case 'callout':
            return (
              <div
                key={index}
                className="my-6 p-5 bg-cr-blush border-2 border-cr-pink rounded-xl flex items-center justify-between gap-4"
              >
                <div className="font-body text-sm md:text-base font-bold text-cr-dark">
                  <Link
                    to={block.linkUrl || '/join'}
                    className="text-cr-pink underline decoration-2 underline-offset-4 hover:opacity-80"
                  >
                    {block.linkText}
                  </Link>
                  <span>{block.text}</span>
                </div>
                <Link
                  to={block.linkUrl || '/join'}
                  className="shrink-0 w-8 h-8 bg-cr-pink rounded-lg flex items-center justify-center hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                >
                  <ArrowUpRight color="white" size={16} />
                </Link>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
