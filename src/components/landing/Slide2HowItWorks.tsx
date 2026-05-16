
import SplitText from './SplitText';

export default function Slide2HowItWorks({ active }: { active: boolean }) {
  const steps = [
    {
      num: '01',
      title: 'Apply',
      desc: 'Fill your profile. We verify you.'
    },
    {
      num: '02',
      title: 'Browse',
      desc: 'Pick deals that match your vibe.'
    },
    {
      num: '03',
      title: 'Get Paid',
      desc: 'Post content. Cash hits your account.'
    }
  ];

  return (
    <section className={`slide bg-pink-grad ${active ? 'active' : ''}`}>
      <h2 className="mobile-text-lg" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 6vw, 64px)',
        fontWeight: 700,
        color: 'white',
        lineHeight: 1.1,
        marginBottom: '32px',
        textTransform: 'uppercase',
        maxWidth: '800px'
      }}>
        <SplitText text="THREE STEPS TO YOUR FIRST DEAL" active={active} delay={0.3} />
      </h2>

      <div className="mobile-px-4" style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        {steps.map((step, i) => (
          <div key={i} className={`animate-slide-up delay-${i + 3}`} style={{
            backgroundColor: 'white',
            padding: '16px 20px',
            borderRadius: '20px',
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '6px 6px 0px rgba(0,0,0,0.15)',
            border: '2px solid var(--cr-dark)'
          }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--cr-yellow)',
              color: 'var(--cr-dark)',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              fontWeight: 900,
              fontSize: '18px',
              flexShrink: 0
            }}>{step.num}</span>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--cr-pink)',
                textTransform: 'uppercase',
                lineHeight: 1,
                marginBottom: '4px'
              }}>{step.title}</h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--cr-dark)',
                lineHeight: 1.3,
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                opacity: 0.6
              }}>{step.desc}</p>
            </div>
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
    </section>
  );
}
