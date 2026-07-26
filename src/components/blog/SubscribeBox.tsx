import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function SubscribeBox() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to actual newsletter signup
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <div className="bg-cr-pink rounded-3xl p-6 shadow-[6px_6px_0px_var(--cr-dark)]">
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
            w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/40
            font-mono text-sm text-white placeholder:text-white/50
            focus:outline-none focus:border-white focus:bg-white/30
            transition-colors
          "
        />
        <button
          type="submit"
          className="
            w-full flex items-center justify-center gap-2 px-4 py-3
            bg-white text-cr-pink font-display text-xs font-bold uppercase tracking-widest
            rounded-lg shadow-[3px_3px_0px_var(--cr-dark)]
            hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--cr-dark)]
            transition-all duration-150
          "
        >
          Subscribe Free <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      </form>
    </div>
  );
}
