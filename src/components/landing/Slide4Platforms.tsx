

export default function Slide4Platforms({ active }: { active: boolean }) {
  const platforms = [
    { name: 'Instagram', icon: '📸' },
    { name: 'TikTok', icon: '🎵' },
    { name: 'YouTube', icon: '📺' },
    { name: 'X/Twitter', icon: '🐦' },
    { name: 'Facebook', icon: '👥' }
  ];

  const niches = [
    { name: 'Lifestyle', color: 'var(--cr-pink)' },
    { name: 'Fashion', color: 'var(--cr-orange)' },
    { name: 'Comedy', color: 'var(--cr-purple)' },
    { name: 'Tech', color: 'var(--cr-pink)' },
    { name: 'Food', color: 'var(--cr-orange)' },
    { name: 'Travel', color: 'var(--cr-purple)' },
    { name: 'Beauty', color: 'var(--cr-pink)' },
    { name: 'Gaming', color: 'var(--cr-orange)' },
    { name: 'Sports', color: 'var(--cr-purple)' },
    { name: 'Finance', color: 'var(--cr-pink)' },
    { name: 'Music', color: 'var(--cr-orange)' },
    { name: 'Parenting', color: 'var(--cr-purple)' },
    { name: 'Fitness', color: 'var(--cr-pink)' },
    { name: 'Entertainment', color: 'var(--cr-orange)' }
  ];

  return (
    <section className={`slide bg-blush-grad ${active ? 'active' : ''}`}>
      <div className="animate-pop-bounce delay-1">
        <span className="annotation-pill" style={{ 
          position: 'relative', top: '0', left: '0', marginBottom: '24px'
        }}>
          WE SUPPORT
        </span>
      </div>

      <h2 className="animate-slide-up delay-2 mobile-text-lg" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(32px, 6vw, 64px)',
        fontWeight: 700,
        color: 'var(--cr-pink)',
        lineHeight: 1.1,
        marginBottom: '48px',
        textTransform: 'uppercase'
      }}>
        EVERY CREATOR. EVERY FORMAT. EVERY NICHE.
      </h2>

      {/* Platforms Row */}
      <div className="mobile-px-4" style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        {platforms.map((p, i) => (
          <div key={i} className={`animate-pop-bounce delay-${i + 3} annotation-pill no-circles float-subtle`} style={{ 
            position: 'relative', top: '0', left: '0',
            backgroundColor: 'white', color: 'var(--cr-pink)', borderColor: 'var(--cr-pink)',
            animationDelay: `${0.3 + i * 0.1}s, ${i * 0.5}s`,
            fontSize: '13px',
            padding: '6px 14px'
          }}>
            {p.icon} {p.name}
          </div>
        ))}
      </div>

      {/* Niches Cloud */}
      <div className="mobile-px-4" style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '900px'
      }}>
        {niches.map((n, i) => (
          <div key={i} className={`animate-pop-bounce annotation-pill no-circles float-subtle ${i > 7 ? 'mobile-hide' : ''}`} style={{ 
            position: 'relative', top: '0', left: '0',
            backgroundColor: n.color, 
            color: 'white', 
            borderColor: 'transparent',
            fontSize: `${12 + (i % 2) * 2}px`,
            padding: '5px 12px',
            animationDelay: `${0.5 + (i * 0.05)}s, ${Math.random() * 2}s`,
            animationDuration: '0.6s, 5s'
          }}>
            {n.name}
          </div>
        ))}
      </div>

      {/* Decorative Sparkle */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        fontSize: '48px',
        animation: 'spin 10s linear infinite'
      }}>
        ✦
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        fontSize: '48px',
        animation: 'spin 15s linear infinite reverse'
      }}>
        ✦
      </div>
    </section>
  );
}
