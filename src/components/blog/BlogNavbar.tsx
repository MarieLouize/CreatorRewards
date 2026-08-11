import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function BlogNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-center justify-between py-4 bg-cr-yellow relative max-w-[1440px] w-full mx-auto px-5 md:px-0"
    >
      <Link
        to="/"
        className="px-2 md:px-0 flex items-center gap-2 no-underline"
      >
        <span className="font-condensed text-xs md:text-[20px] font-extrabold text-cr-pink uppercase tracking-wider pr-2">
          CreatorsRewards
        </span>
      </Link>

      <motion.div whileHover={{ y: -2, scale: 1.01 }}>
        <Link
          to="/join"
          className="hidden md:inline-flex bg-cr-pink text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--cr-dark)] transition-all"
        >
          <p className="text-white"> Subscribe — Free</p>
        </Link>
      </motion.div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 text-cr-dark"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-cr-yellow border-b-2 border-cr-pink p-4 md:hidden z-50"
          >
            <Link
              to="/join"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center bg-cr-pink text-white font-display text-sm font-bold uppercase tracking-wide px-5 py-3 rounded shadow-[3px_3px_0px_var(--cr-dark)]"
            >
              <p className="text-white">Subscribe — Free</p>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
