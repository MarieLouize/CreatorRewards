import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-matcha-grad" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '24px', textAlign: 'center', position: 'relative', overflow: 'hidden'
    }}>
      {/* Decorative Blobs */}
      <div style={{
        position: 'absolute', top: '10%', right: '-10%', width: '400px', height: '400px',
        background: 'var(--cr-pink)', filter: 'url(#liquid-filter)', opacity: 0.1, zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-10%', width: '300px', height: '300px',
        background: 'var(--cr-purple)', filter: 'url(#liquid-filter)', opacity: 0.1, zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(80px, 15vw, 160px)',
          fontWeight: 900, color: 'var(--cr-dark)', lineHeight: 1, marginBottom: '20px',
          textShadow: '8px 8px 0px var(--cr-pink)',
          animation: 'popBounce 0.8s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          404
        </h1>
        
        <div className="card" style={{
          padding: '40px', maxWidth: '500px', margin: '0 auto',
          animation: 'popBounce 0.8s cubic-bezier(0.16,1,0.3,1) both 100ms'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700,
            marginBottom: '16px', color: 'var(--cr-dark)'
          }}>
            Lost in the Feed?
          </h2>
          <p style={{
            fontSize: '18px', color: 'var(--cr-dark)', opacity: 0.7,
            marginBottom: '32px', lineHeight: 1.6
          }}>
            The page you're looking for doesn't exist or has been moved to a different niche.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-pink" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none'
            }}>
              <Home size={18} /> Back to Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="btn-ghost" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <ArrowLeft size={18} /> Go Back
            </button>
          </div>
        </div>
      </div>

      {/* SVG Filter for Liquid Blobs */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="liquid-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
        </filter>
      </svg>
    </div>
  );
}
