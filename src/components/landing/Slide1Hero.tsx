

import { VerifiedBadge, LikeCounter } from './SocialElements';
import SplitText from './SplitText';

const CursorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M5 3l14 9-7 1-4 7L5 3z" fill="#1C1917" stroke="#1C1917" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>
);

export default function Slide1Hero({ active }: { active: boolean }) {
  return (
    <section className={`slide bg-matcha-grad ${active ? 'active' : ''}`}>
      <div className="animate-pop-bounce delay-1" style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid var(--cr-dark)',
          padding: '6px 16px',
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '4px 4px 0px var(--cr-dark)',
        }}>
          {/* Scanning Effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '30%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(251, 113, 133, 0.2), transparent)',
            animation: 'scan-horizontal 3s infinite linear',
            pointerEvents: 'none'
          }} />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '10px',
            fontWeight: 800,
            fontFamily: 'monospace',
            color: 'var(--cr-pink)',
            textTransform: 'uppercase'
          }}>
            <span style={{ 
              width: '6px', height: '6px', borderRadius: '50%', 
              background: 'var(--cr-pink)', animation: 'pulse-soft 1.5s infinite' 
            }} />
            Live Status
          </div>

          <div style={{ height: '12px', width: '1px', background: 'var(--cr-dark)', opacity: 0.2 }} />

          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--cr-dark)',
            letterSpacing: '0.02em'
          }}>
            LAUNCHING SOON <VerifiedBadge />
          </span>

          <div style={{ height: '12px', width: '1px', background: 'var(--cr-dark)', opacity: 0.2 }} />

          <span style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            fontWeight: 600,
            color: 'var(--text-muted)'
          }}>
            [V2.0.4]
          </span>
        </div>
      </div>

      <h1 className="mobile-text-xl" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(56px, 10vw, 96px)',
        fontWeight: 700,
        color: 'var(--cr-pink)',
        lineHeight: 0.9,
        margin: '24px 0',
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: active ? 'chromatic-shift 4s infinite linear' : 'none'
      }}>
        <SplitText text="GET PAID." active={active} delay={0.2} />
        <SplitText text="STAY YOU." active={active} delay={0.5} />
      </h1>

      {/* Liquid Background Blob */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'var(--cr-yellow)',
        filter: 'url(#liquid-filter)',
        opacity: 0.4,
        zIndex: -2,
        borderRadius: '50%',
        animation: 'drift 20s infinite alternate linear'
      }} />

      <p className="animate-slide-up delay-3 mobile-text-sm" style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(16px, 2vw, 20px)',
        color: 'var(--cr-dark)',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        Post content. Work with brands. Get paid straight to your account.
      </p>

      <div className="animate-pop-bounce delay-5 annotation-pill float-subtle mobile-pill-hero-1" style={{ top: '62%', left: '12%', transform: 'rotate(-5deg)' }}>
        editing reels 📱
      </div>
      
      <div className="animate-pop-bounce delay-6 annotation-pill float-subtle mobile-pill-hero-2" style={{ 
        top: '68%', right: '8%', transform: 'rotate(8deg)'
      }}>
        brand deal incoming 💰
      </div>

      <LikeCounter 
        initialCount={39910} 
        className="animate-pop-bounce delay-8 float-subtle mobile-pill-hero-like" 
        style={{ top: '40%', right: '15%' }} 
      />

      <div className="animate-pop-bounce delay-7 annotation-pill float-subtle mobile-pill-hero-3" style={{ bottom: '25%', left: '15%', transform: 'rotate(-3deg)' }}>
        verified creator ✅
      </div>

      <div className="animate-pop-bounce delay-9 annotation-pill float-subtle mobile-pill-hero-4" style={{ 
        bottom: '12%', right: '10%', transform: 'rotate(4deg)',
        '--bubble-bg': 'var(--cr-purple)', color: 'var(--cr-dark)'
      } as any}>
        ₦42,000 earned this week <CursorIcon />
      </div>

      {/* Decorative Phone Mockup */}
      <div className="animate-slide-up delay-3 float-subtle mobile-hide" style={{
        position: 'absolute',
        right: '20%',
        top: '50%',
        transform: 'translateY(-50%) rotate(5deg)',
        width: '280px',
        height: '560px',
        border: '6px solid var(--cr-pink)',
        borderRadius: '40px',
        backgroundColor: 'var(--cr-blush)',
        zIndex: -1,
        opacity: 0.5,
        animationDelay: '0.3s, 2s'
      }} />
    </section>
  );
}
