import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function BlogNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between py-4 bg-cr-yellow relative max-w-[1440px] w-full mx-auto">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 no-underline">
        <div className="w-5 h-5 md:w-8 md:h-8 bg-cr-pink rounded" />
        <span className="font-condensed text-xs md:text-[20px] font-extrabold text-cr-pink uppercase tracking-wider pr-2">
          CreatorsRewards
        </span>
        <span className="hidden sm:inline font-body text-[10px] font-bold text-cr-deep uppercase tracking-widest border-[1.5px] border-deep px-2 py-0.5 rounded-sm">
          Marketplace Editorial
        </span>
      </Link>

      {/* Desktop Subscribe */}
      <Link
        to="/join"
        className="hidden md:inline-flex bg-cr-pink text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--cr-dark)] transition-all"
      >
        <p className="text-white"> Subscribe — Free</p>
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 text-cr-dark"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-cr-yellow border-b-2 border-cr-pink p-4 md:hidden z-50">
          <Link
            to="/join"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-cr-pink text-white font-display text-sm font-bold uppercase tracking-wide px-5 py-3 rounded shadow-[3px_3px_0px_var(--cr-dark)]"
          >
            <p className="text-white">Subscribe — Free</p>
          </Link>
        </div>
      )}
    </nav>
  );
}
