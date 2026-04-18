import { Link } from 'react-router-dom';
import { Camera, AtSign, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '56px 28px 36px',
    }}>
      <div className="container" style={{
        display: 'flex', flexWrap: 'wrap', gap: '40px',
        justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '48px',
      }}>
        {/* Brand */}
        <div style={{ maxWidth: '260px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #F5C842, #FFB800)',
              color: '#000', fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: '12px', padding: '4px 10px', borderRadius: '100px',
              boxShadow: '0 2px 10px rgba(245,200,66,0.3)',
            }}>CR</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>
              CreatorRewards
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7 }}>
            Nigeria's #1 creator rewards platform. Get paid for your content.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Company
            </span>
            {[
              { label: 'Privacy Policy', href: '#' },
              { label: 'Contact', href: '#' },
            ].map(item => (
              <a key={item.label} href={item.href}
                style={{ color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                {item.label}
              </a>
            ))}
            <Link to="/join"
              style={{ color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
              Join Waitlist
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Follow
            </span>
            {[
              { label: 'Instagram', Icon: Camera },
              { label: 'Twitter / X', Icon: AtSign },
              { label: 'TikTok', Icon: Music2 },
            ].map(({ label, Icon }) => (
              <a key={label} href="#"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                <Icon size={14} strokeWidth={1.75} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{
        paddingTop: '24px', borderTop: '1px solid var(--border-subtle)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
      }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          © {new Date().getFullYear()} CreatorRewards. All rights reserved.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          Built for Nigerian creators
        </p>
      </div>
    </footer>
  );
}
