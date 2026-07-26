import { Link } from 'react-router-dom';

export default function BlogNavbar() {
  return (
    <nav className="flex items-center justify-between px-7 py-4 bg-cr-yellow border-b-2 border-cr-pink">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <div className="w-6 h-6 bg-cr-pink rounded" />
        <span className="font-display text-sm font-extrabold text-cr-pink uppercase tracking-wider">
          CreatorsRewards
        </span>
        <span className="font-body text-[10px] font-bold text-cr-dark uppercase tracking-widest border-[1.5px] border-cr-dark px-2 py-0.5 rounded-sm">
          Marketplace Editorial
        </span>
      </Link>

      {/* Subscribe CTA */}
      <Link
        to="/join"
        className="bg-cr-pink text-white font-display text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--cr-dark)] shadow-[3px_3px_0px_var(--cr-dark)] transition-all duration-150"
      >
        Subscribe — Free
      </Link>
    </nav>
  );
}
