import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ activeSlide = 0 }: { activeSlide?: number }) {
  const navigate = useNavigate();

  // Slides 2 and 5 (index 1 and 4) have pink backgrounds, so we need white text
  const isPinkBg = activeSlide === 1 || activeSlide === 4;

  return (
    <nav className={`navbar-container ${isPinkBg ? 'pink-bg' : ''}`} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 150,
      padding: '0 32px', height: '80px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'transparent',
      transition: 'all 0.3s ease',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="stylized-name">CreatorRewards</span>
      </Link>
      
      <button 
        className="btn-ghost nav-btn" 
        style={{ 
          padding: '10px 24px', 
          fontSize: '14px',
          borderRadius: '100px',
          borderColor: isPinkBg ? '#fff' : 'var(--cr-pink)',
          color: isPinkBg ? '#fff' : 'var(--cr-pink)',
          borderWidth: '2px'
        }}
        onClick={() => navigate('/join')}
      >
        Join Waitlist
      </button>
    </nav>
  );
}
