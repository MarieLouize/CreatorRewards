import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Rocket, Check, Copy, ArrowLeft } from 'lucide-react';

interface Props {
  position: number;
  email: string;
}

export default function SuccessView({ position, email }: Props) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}/join?ref=${encodeURIComponent(email)}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      {/* Animated checkmark circle */}
      <div style={{
        width: '100px', height: '100px', borderRadius: '50%',
        background: 'var(--cr-green)',
        border: '4px solid var(--cr-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 32px',
        boxShadow: '8px 8px 0px var(--cr-dark)',
        animation: 'popBounce 0.6s cubic-bezier(0.16,1,0.3,1) both'
      }}>
        <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
          <path
            d="M8 18l8 8 12-14"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{ animation: 'checkDraw 0.7s ease forwards 0.4s' }}
          />
        </svg>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(32px, 6vw, 48px)',
        fontWeight: 700, 
        color: 'var(--cr-pink)', 
        marginBottom: '12px',
        textTransform: 'uppercase',
        lineHeight: 1
      }}>You're on the list!</h2>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '12px',
        background: 'var(--cr-yellow)', 
        border: '3px solid var(--cr-dark)',
        borderRadius: '100px', 
        padding: '12px 24px', 
        marginBottom: '32px',
        boxShadow: '4px 4px 0px var(--cr-dark)',
        animation: 'popBounce 0.6s cubic-bezier(0.16,1,0.3,1) both 0.2s'
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--cr-dark)' }}>
          #{position.toLocaleString()}
        </span>
        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--cr-dark)', opacity: 0.7, textTransform: 'uppercase' }}>in line</span>
      </div>

      <p style={{ color: 'var(--cr-dark)', fontSize: '18px', fontWeight: 500, maxWidth: '420px', margin: '0 auto 40px' }}>
        We'll notify you at <strong style={{ color: 'var(--cr-pink)' }}>{email}</strong> when CreatorRewards launches.
      </p>

      {/* Referral share card */}
      <div style={{
        background: 'white', 
        border: '3px solid var(--cr-pink)',
        borderRadius: '20px', 
        padding: '32px',
        maxWidth: '440px', 
        margin: '0 auto 32px',
        boxShadow: '8px 8px 0px var(--cr-pink)',
        animation: 'popBounce 0.6s cubic-bezier(0.16,1,0.3,1) both 0.4s'
      }}>
        <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--cr-dark)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textTransform: 'uppercase' }}>
          <Rocket size={18} color="var(--cr-pink)" strokeWidth={2.5} />
          Move up the list
        </p>
        <p style={{ fontSize: '14px', color: 'var(--cr-dark)', opacity: 0.8, marginBottom: '24px', fontWeight: 500 }}>
          Share your referral link and skip ahead when friends join.
        </p>
        <button 
          className="persistent-cta" 
          style={{ position: 'relative', bottom: 'auto', right: 'auto', zIndex: 'auto', width: '100%', justifyContent: 'center' }} 
          onClick={copyLink}
        >
          {copied
            ? <><Check size={18} strokeWidth={2.5} /> Link Copied!</>
            : <><Copy size={18} strokeWidth={2} /> Copy Referral Link</>
          }
        </button>
      </div>

      <button 
        className="btn-ghost" 
        onClick={() => navigate('/')}
        style={{ 
          color: 'var(--cr-pink)', 
          fontWeight: 700, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          margin: '0 auto' 
        }}
      >
        <ArrowLeft size={18} strokeWidth={2.5} /> Back to Home
      </button>
    </div>
  );
}
