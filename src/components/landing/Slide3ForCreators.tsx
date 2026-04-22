import { AudienceComment, DMNotification } from './SocialElements';
import SplitText from './SplitText';

const CursorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M5 3l14 9-7 1-4 7L5 3z" fill="#1C1917" stroke="#1C1917" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>
);

export default function Slide3ForCreators({ active }: { active: boolean }) {
  return (
    <section className={`slide bg-matcha-grad ${active ? 'active' : ''}`}>
      <h2 className="mobile-text-xl" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(56px, 10vw, 96px)',
        fontWeight: 800,
        color: 'var(--cr-dark)',
        lineHeight: 0.9,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        maxWidth: '900px'
      }}>
        <SplitText text="SORRY, I HAVE" active={active} delay={0.1} /><br />
        <span style={{ color: 'var(--cr-pink)' }}><SplitText text="PLANS" active={active} delay={0.4} /></span> <SplitText text="TONIGHT." active={active} delay={0.6} />
      </h2>

      <div style={{ position: 'relative', width: '100%', height: '300px', marginTop: '40px' }}>
        {/* Thought Bubbles */}
        <div className="animate-pop-bounce delay-3 annotation-pill float-subtle mobile-pill-creators-1" 
          style={{ top: '0', left: '10%', transform: 'rotate(-5deg)' }}>
          editing reels 📱
        </div>

        <div className="animate-pop-bounce delay-5 annotation-pill float-subtle mobile-hide" 
          style={{ top: '20px', right: '15%', transform: 'rotate(8deg)', '--bubble-bg': 'var(--cr-purple)' } as any}>
          batching content 🎥
        </div>

        <div className="animate-pop-bounce delay-7 annotation-pill float-subtle mobile-pill-creators-3" 
          style={{ bottom: '20px', left: '12%', transform: 'rotate(3deg)' }}>
          stalking brand deals 🔍
        </div>

        {/* Audience Comments & DMs */}
        <AudienceComment 
          text="omg need this immediately! 😍" 
          avatarColor="var(--cr-pink)" 
          className="animate-pop-bounce delay-4 float-subtle mobile-hide" 
          style={{ position: 'absolute', top: '25%', left: '30%', animationDelay: '2s, 0s' }} 
        />

        <DMNotification 
          sender="Glo" 
          message="Are you available for a collab?" 
          className="animate-pop-bounce delay-6 float-subtle mobile-pill-creators-2"
          style={{ position: 'absolute', top: '10%', right: '5%', transform: 'rotate(-3deg)' }}
        />

        <AudienceComment 
          text="this is so real 😭" 
          avatarColor="var(--cr-orange)" 
          className="animate-pop-bounce delay-8 float-subtle mobile-hide" 
          style={{ position: 'absolute', bottom: '15%', right: '25%' }} 
        />

        <div className="animate-pop-bounce delay-9 annotation-pill float-subtle mobile-pill-creators-4" 
          style={{ bottom: '0', right: '10%', transform: 'rotate(-4deg)', '--bubble-bg': 'var(--cr-orange)' } as any}>
          checking dashboard ₦ <CursorIcon />
        </div>
      </div>

      <p className="animate-slide-up delay-10 mobile-text-sm mobile-px-4" style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(18px, 2vw, 24px)',
        color: 'var(--cr-dark)',
        marginTop: '60px',
        maxWidth: '600px',
        fontWeight: 600,
        opacity: 0.8
      }}>
        You work hard. CreatorRewards makes sure you get paid for it.
      </p>
    </section>
  );
}
