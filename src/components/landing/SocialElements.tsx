import { Check, Heart, MousePointer2 } from 'lucide-react';
import { useState, useEffect, type CSSProperties } from 'react';

export const VerifiedBadge = () => (
  <span className="verified-badge">
    <Check size={12} strokeWidth={4} />
  </span>
);

interface HeartParticle {
  id: number;
  tx: number;
  ty: number;
}

export const LikeCounter = ({ initialCount, className = '', style }: { initialCount: number, className?: string, style?: CSSProperties }) => {
  const [count, setCount] = useState(initialCount);
  const [isFilled, setIsFilled] = useState(false);
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const triggerViralMoment = () => {
      // Toggle filled state
      setIsFilled(true);
      
      // Create randomized particles
      const newParticles = [...Array(8)].map((_, i) => ({
        id: Date.now() + i,
        tx: (Math.random() - 0.5) * 120, // Random X spread
        ty: -(Math.random() * 80 + 40),   // Random Y height
      }));
      setParticles(newParticles);

      // Cleanup particles and reset heart after a cycle
      setTimeout(() => {
        setParticles([]);
        setIsFilled(false);
      }, 1500);

      // Kinetic count up
      let iterations = 0;
      const totalSteps = 60; // More steps for a larger increase
      const increment = 13090 + Math.floor(Math.random() * 200); // Minimum 13,090
      
      const interval = setInterval(() => {
        iterations++;
        const progress = iterations / totalSteps;
        // decelerating motion
        const easeOut = 1 - Math.pow(1 - progress, 4);
        
        // Calculate the target count for this specific iteration based on easeOut curve
        const nextValue = initialCount + (increment * easeOut);
        setCount(Math.floor(nextValue));

        if (iterations >= totalSteps) clearInterval(interval);
      }, 25);
    };

    const loop = setInterval(() => {
      // Sync with naturalCursor animation click (1.8s into 4s loop)
      setTimeout(triggerViralMoment, 1800);
    }, 4000);

    return () => clearInterval(loop);
  }, []);

  return (
    <div className={`like-counter ${className}`} style={{ 
      ...style, 
      position: 'absolute', 
      padding: '10px 24px', 
      fontSize: '20px', 
      boxShadow: '6px 6px 0px var(--cr-dark)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div className="like-counter-heart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {isFilled ? (
          <Heart size={24} fill="#EF4444" stroke="#EF4444" style={{ transform: 'scale(1.2)', transition: 'transform 0.1s' }} />
        ) : (
          <Heart size={24} stroke="currentColor" strokeWidth={2.5} />
        )}
      </div>
      
      <span style={{ minWidth: '60px', textAlign: 'left', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
        {count.toLocaleString()}
      </span>

      {/* Randomized Heart Particles */}
      {particles.map(p => (
        <span 
          key={p.id} 
          className="heart-particle" 
          style={{ 
            position: 'absolute',
            left: '20px',
            top: '0',
            opacity: 0.4, // Low opacity as requested
            fontSize: '16px',
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`
          } as any}
        >
          ❤️
        </span>
      ))}
      
      {/* Animated Cursor */}
      <div className="animate-cursor" style={{ position: 'absolute', bottom: '-20px', right: '-20px' }}>
        <MousePointer2 size={32} fill="white" stroke="var(--cr-dark)" strokeWidth={1.5} style={{ filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.15))' }} />
      </div>
    </div>
  );
};

export const AudienceComment = ({ text, avatarColor, className = '', style }: { text: string, avatarColor: string, className?: string, style?: CSSProperties }) => (
  <div className={`annotation-pill ${className}`} style={{ ...style, borderRadius: '15px' }}>
    <div className="avatar" style={{ backgroundColor: avatarColor, width: '28px', height: '28px', borderRadius: '50%', border: '2px solid var(--cr-dark)' }} />
    <span style={{ fontSize: '14px' }}>{text}</span>
  </div>
);

export const NotificationBanner = ({ brand, brandIcon, offer, className = '', style }: { brand: string, brandIcon: string, offer: string, className?: string, style?: CSSProperties }) => (
  <div className={`notification-banner ${className}`} style={style}>
    <div className="brand-icon" style={{ 
      width: '40px', height: '40px', borderRadius: '10px', 
      background: 'var(--cr-pink)', border: '2px solid var(--cr-dark)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 900, fontSize: '18px', flexShrink: 0
    }}>{brandIcon}</div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--cr-dark)', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Campaign Alert</span>
      <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--cr-dark)', lineHeight: 1.2 }}>{brand}: {offer}</span>
    </div>
  </div>
);

export const DMNotification = ({ sender, message, className = '', style }: { sender: string, message: string, className?: string, style?: CSSProperties }) => (
  <div className={`annotation-pill ${className}`} style={{ ...style, backgroundColor: 'var(--cr-white)', border: '2px solid var(--cr-dark)', borderRadius: '12px' }}>
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--cr-orange)', border: '2px solid var(--cr-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>👤</div>
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '2px' }}>
      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--cr-pink)' }}>DM from {sender}</span>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cr-dark)' }}>{message}</span>
    </div>
  </div>
);
