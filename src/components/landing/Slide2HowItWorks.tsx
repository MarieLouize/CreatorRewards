

import { NotificationBanner } from './SocialElements';

const CursorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M5 3l14 9-7 1-4 7L5 3z" fill="#1C1917" stroke="#1C1917" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>
);

export default function Slide2HowItWorks({ active }: { active: boolean }) {
  const steps = [
    {
      num: '01',
      title: 'Apply & Get Verified',
      desc: 'Fill your profile. We check you’re legit.'
    },
    {
      num: '02',
      title: 'Browse Campaigns',
      desc: 'Pick brand deals that match your vibe and niche.'
    },
    {
      num: '03',
      title: 'Post & Get Paid',
      desc: 'Drop the content. Money hits your account.'
    }
  ];

  return (
    <section className={`slide bg-pink-grad ${active ? 'active' : ''}`}>
      {active && (
        <NotificationBanner 
          brand="NIKE" 
          brandIcon="N" 
          offer="Campaign Invite: ₦150k" 
          className="animate-toast"
        />
      )}

      <div className="animate-pop-bounce delay-1">
        <span className="annotation-pill" style={{ 
          position: 'relative', top: '0', left: '0', marginBottom: '16px',
          backgroundColor: 'white', color: 'var(--cr-pink)', borderColor: 'white'
        }}>
          HOW IT WORKS
        </span>
      </div>

      <h2 className="animate-slide-up delay-2 mobile-text-lg" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(32px, 6vw, 64px)',
        fontWeight: 700,
        color: 'white',
        lineHeight: 1.1,
        marginBottom: '24px',
        textTransform: 'uppercase',
        maxWidth: '800px'
      }}>
        THREE STEPS TO YOUR FIRST BRAND DEAL
      </h2>

      <div className="mobile-scroll-y mobile-px-4" style={{
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1100px',
        width: '100%'
      }}>
        {steps.map((step, i) => (
          <div key={i} className={`animate-slide-up delay-${i + 3}`} style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '24px',
            flex: '1',
            minWidth: '260px',
            textAlign: 'left',
            position: 'relative',
            boxShadow: '8px 8px 0px rgba(0,0,0,0.1)'
          }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: 'var(--cr-yellow)',
              color: 'var(--cr-dark)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '16px',
              marginBottom: '12px'
            }}>{step.num}</span>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              color: 'var(--cr-pink)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              lineHeight: 1.2
            }}>{step.title}</h3>
            <p style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--cr-dark)',
              lineHeight: 1.4,
              fontSize: '14px'
            }}>{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Watermark */}
      <div className="float-subtle mobile-hide" style={{
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '300px',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        color: 'white',
        opacity: 0.05,
        zIndex: -1,
        pointerEvents: 'none',
        animationDuration: '6s'
      }}>
        ₦
      </div>

      <div className="animate-pop-bounce delay-6 annotation-pill float-subtle mobile-pill-hero-4" style={{ bottom: '15%', right: '15%', transform: 'rotate(-5deg)', animationDelay: '0.6s, 2s' }}>
        avg ₦35K per deal <CursorIcon />
      </div>
    </section>
  );
}
