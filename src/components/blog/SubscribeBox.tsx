import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function SubscribeBox() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-cr-pink rounded-md p-6 "
    >
      <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wide mb-2">
        Don't Miss Next Week's Drop
      </h3>
      <p className="font-body text-xs text-white/80 leading-relaxed mb-5">
        Creator economy intelligence, every Tuesday. No fluff, no brand deals
        pretending to be editorial.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="
            w-full px-4 py-3 rounded-sm border-2 border-white
            font-mono text-sm text-white placeholder:text-white/50 placeholder:font-condensed
            focus:outline-none focus:border-white focus:bg-white/30
            transition-colors
          "
        />
        <motion.button
          whileHover={{ y: -2, scale: 1.01 }}
          type="submit"
          className="
            w-full flex items-center justify-center gap-2 px-4 py-3
            bg-white text-cr-pink font-condensed text-xs font-bold uppercase tracking-widest
            rounded-sm
            hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--cr-pink)]
            transition-all duration-150
          "
        >
          Subscribe Free <ArrowRight size={14} strokeWidth={2.5} />
        </motion.button>
      </form>
    </motion.div>
  );
}
