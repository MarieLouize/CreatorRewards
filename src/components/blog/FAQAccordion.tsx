import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { faqItems } from '../../data/blogPosts';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-cr-blush border-4 border-cr-pink rounded-[8px] overflow-hidden shadow-[6px_6px_0px_var(--cr-dark)]">
      {/* Header */}
      <div className="px-5 py-4 border-b-2 border-cr-pink/20">
        <h3 className="font-display text-xs font-extrabold text-cr-pink uppercase tracking-widest">
          FAQ
        </h3>
      </div>

      {/* Items */}
      <div className="divide-y divide-cr-pink/20">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cr-yellow/30 transition-colors"
              >
                <span className="font-body text-sm font-bold text-cr-dark pr-4">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={16} className="text-cr-pink shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 font-body text-xs text-cr-deep leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
