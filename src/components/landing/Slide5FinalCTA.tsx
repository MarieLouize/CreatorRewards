
import { useNavigate } from 'react-router-dom';
import { useWaitlistCount } from '../../hooks/useWaitlistCount';
import { VerifiedBadge } from './SocialElements';

export default function Slide5FinalCTA({ active }: { active: boolean }) {
  const navigate = useNavigate();
  const count = useWaitlistCount();

  return (
    <section className={`slide bg-pink-grad ${active ? 'active' : ''}`}>
      <div className="animate-pop-bounce delay-1">
        <span className="annotation-pill float-subtle" style={{ 
          position: 'relative', top: '0', left: '0', marginBottom: '32px',
          backgroundColor: 'white', color: 'var(--cr-pink)', borderColor: 'white'
        }}>
          {count && count > 0 ? `${count.toLocaleString()} creators joined` : 'Waitlist Open Now'} <VerifiedBadge />
        </span>
      </div>

      <h2 className="animate-slide-up delay-2 mobile-text-xl" style={{
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
        DON'T<br />MISS YOUR<br />SPOT.
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

      <div className="animate-pop-bounce delay-4" style={{ animationDelay: '0.4s' }}>
        <button 
          className="pulse-glow-button"
          onClick={() => navigate('/join')}
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
      </div>

      <div className="animate-slide-up delay-5 mobile-stack mobile-px-4" style={{
        marginTop: '64px',
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="annotation-pill float-subtle no-circles" style={{ position: 'relative', top: '0', left: '0', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'white', animationDelay: '0s' }}>
          @CreatorRewards on IG
        </div>
        <div className="annotation-pill float-subtle no-circles" style={{ position: 'relative', top: '0', left: '0', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'white', animationDelay: '0.5s' }}>
          TikTok
        </div>
        <div className="annotation-pill float-subtle no-circles" style={{ position: 'relative', top: '0', left: '0', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'white', animationDelay: '1s' }}>
          X
        </div>
      </div>

      {/* Decorative Confetti Shapes (CSS only) */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          borderRadius: i % 2 === 0 ? '50%' : '2px',
          backgroundColor: ['var(--cr-yellow)', 'var(--cr-blush)', 'var(--cr-orange)'][i % 3],
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.6,
          animation: `spin ${5 + Math.random() * 5}s linear infinite`,
          pointerEvents: 'none'
        }} />
      ))}
    </section>
  );
}
