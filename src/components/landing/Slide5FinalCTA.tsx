import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Music2, AtSign } from 'lucide-react';
import { useWaitlistCount } from '../../hooks/useWaitlistCount';
import { VerifiedBadge } from './SocialElements';
import SplitText from './SplitText';
import MagneticWrapper from './MagneticWrapper';

export default function Slide5FinalCTA({ active }: { active: boolean }) {
  const navigate = useNavigate();
  const count = useWaitlistCount();

  const confetti = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: ['var(--cr-yellow)', 'var(--cr-blush)', 'var(--cr-orange)'][i % 3],
      duration: 5 + Math.random() * 5,
      isCircle: i % 2 === 0
    }));
  }, []);

  return (
    <section className={`slide bg-pink-grad ${active ? 'active' : ''}`}>
      <div className="animate-pop-bounce delay-1">
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: '4px',
          borderLeft: '4px solid white', color: 'white', fontWeight: 700,
          fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em',
          marginBottom: '32px'
        }}>
          {count && count > 0 ? `${count.toLocaleString()} creators joined` : 'Waitlist Open Now'} <VerifiedBadge />
        </div>
      </div>

      <h2 className="mobile-text-xl" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(60px, 12vw, 96px)',
        fontWeight: 700,
        color: 'white',
        lineHeight: 0.9,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        marginBottom: '40px'
      }}>
        <SplitText text="DON'T" active={active} delay={0.1} /><br />
        <SplitText text="MISS YOUR" active={active} delay={0.4} /><br />
        <SplitText text="SPOT." active={active} delay={0.7} />
      </h2>

      <p className="animate-slide-up delay-3 mobile-text-sm mobile-px-4" style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(18px, 2vw, 24px)',
        color: 'white',
        marginBottom: '48px',
        maxWidth: '600px'
      }}>
        CreatorRewards is launching soon. Waitlist closes when we hit capacity.
      </p>

      <MagneticWrapper range={100} className="animate-pop-bounce delay-4" style={{ animationDelay: '0.4s' }}>
        <button 
          className="pulse-glow-button"
          onClick={() => navigate('/join')}
          onMouseEnter={e => (e.currentTarget.style.animation = 'chromatic-shift 0.2s infinite linear, pulseGlow 2s ease-in-out infinite')}
          onMouseLeave={e => (e.currentTarget.style.animation = active ? 'pulseGlow 2s ease-in-out infinite' : 'none')}
          style={{
            backgroundColor: 'var(--cr-yellow)',
            color: 'var(--cr-dark)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(18px, 3vw, 24px)',
            padding: '16px 36px',
            borderRadius: '100px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '6px 6px 0px #1A1A1A',
            transition: 'transform 0.15s, box-shadow 0.15s',
            textTransform: 'uppercase',
            animation: active ? 'pulseGlow 2s ease-in-out infinite' : 'none',
            animationDelay: '1s'
          }}
        >
          Secure My Spot →
        </button>
      </MagneticWrapper>

      <div className="animate-slide-up delay-5 mobile-stack mobile-px-4" style={{
        marginTop: '64px',
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {[
          { Icon: Camera, link: '#' },
          { Icon: Music2, link: '#' },
          { Icon: AtSign, link: '#' }
        ].map((social, i) => (
          <a 
            key={i} 
            href={social.link} 
            className="float-subtle" 
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '48px', height: '48px', borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', 
              border: '2px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s ease',
              animationDelay: `${i * 0.3}s`
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'var(--cr-pink)';
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <social.Icon size={20} strokeWidth={2.5} />
          </a>
        ))}
      </div>

      {/* Decorative Confetti Shapes (CSS only) */}
      {confetti.map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          borderRadius: c.isCircle ? '50%' : '2px',
          backgroundColor: c.color,
          top: c.top,
          left: c.left,
          opacity: 0.6,
          animation: `spin ${c.duration}s linear infinite`,
          pointerEvents: 'none',
          zIndex: -1
        }} />
      ))}
    </section>
  );
}
