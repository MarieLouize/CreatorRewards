import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { WaitlistEntry } from '../../types/waitlist';

interface Props {
  entry: WaitlistEntry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

function handleLink(platform: string, handle?: string) {
  if (!handle) return null;
  const clean = handle.replace(/^@/, '');
  const urls: Record<string, string> = {
    instagram: `https://instagram.com/${clean}`,
    tiktok: `https://tiktok.com/@${clean}`,
    twitter: `https://twitter.com/${clean}`,
    youtube: `https://youtube.com/@${clean}`,
    facebook: `https://facebook.com/${clean}`,
  };
  return urls[platform] ?? null;
}

export default function EntryDetailPanel({ entry, onClose, onUpdateStatus, onUpdateNotes }: Props) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (entry) setNotes(entry.admin_notes ?? '');
  }, [entry?.id]);

  if (!entry) return null;

  const handles: { platform: string; handle?: string }[] = [
    { platform: 'instagram', handle: entry.instagram_handle ?? undefined },
    { platform: 'tiktok', handle: entry.tiktok_handle ?? undefined },
    { platform: 'youtube', handle: entry.youtube_handle ?? undefined },
    { platform: 'twitter', handle: entry.twitter_handle ?? undefined },
    { platform: 'facebook', handle: entry.facebook_handle ?? undefined },
  ].filter(h => h.handle);

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200,
      }} />
      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(480px, 100vw)',
        background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border)',
        zIndex: 201, overflowY: 'auto',
        animation: 'slideInRight 0.25s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px', borderBottom: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          position: 'sticky', top: 0, background: 'var(--bg-secondary)', zIndex: 1,
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {entry.full_name}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              #{entry.waitlist_position} · Joined {new Date(entry.created_at).toLocaleDateString()}
            </p>
          </div>
          <button onClick={onClose} style={{
            color: 'var(--text-muted)', background: 'none', border: 'none',
            cursor: 'pointer', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center',
            transition: 'color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLElement).style.background = 'var(--border)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          ><X size={18} strokeWidth={2} /></button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Contact */}
          <Section title="Contact Info">
            <Row label="Email"><a href={`mailto:${entry.email}`} style={{ color: 'var(--accent-gold)' }}>{entry.email}</a></Row>
            {entry.phone && <Row label="Phone">{entry.phone}</Row>}
            <Row label="City">{entry.location_city || '—'}</Row>
            {entry.gender && <Row label="Gender" style={{ textTransform: 'capitalize' }}>{entry.gender.replace(/_/g, ' ')}</Row>}
          </Section>

          {/* Platforms */}
          <Section title="Platforms">
            <Row label="Selected">{entry.selected_platforms?.join(', ') || '—'}</Row>
          </Section>

          {/* Social handles */}
          {handles.length > 0 && (
            <Section title="Social Handles">
              {handles.map(h => {
                const url = handleLink(h.platform, h.handle);
                return (
                  <Row key={h.platform} label={h.platform} style={{ textTransform: 'capitalize' }}>
                    {url
                      ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)' }}>{h.handle}</a>
                      : h.handle}
                  </Row>
                );
              })}
            </Section>
          )}

          {/* Content Preferences */}
          <Section title="Content Preferences">
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>Preferred Content</span>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{entry.preferred_content || '—'}</p>
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>Would Not Promote</span>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{entry.avoid_content || '—'}</p>
            </div>
          </Section>

          {/* Content Taxonomies */}
          {(entry.content_niches?.length || entry.content_formats?.length) && (
            <Section title="Content Tags">
              {entry.content_niches?.length ? (
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>Niches</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {entry.content_niches.map(n => (
                      <span key={n} className="chip selected" style={{ fontSize: '11px', padding: '4px 10px', textTransform: 'capitalize' }}>{n}</span>
                    ))}
                  </div>
                </div>
              ) : null}
              {entry.content_formats?.length ? (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>Formats</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {entry.content_formats.map(f => (
                      <span key={f} className="chip" style={{ fontSize: '11px', padding: '4px 10px', textTransform: 'capitalize' }}>{f.replace(/_/g, ' ')}</span>
                    ))}
                  </div>
                </div>
              ) : null}
            </Section>
          )}

          {/* Brand experience */}
          <Section title="Brand Experience">
            <Row label="Worked with brands">{entry.has_worked_with_brands === true ? 'Yes' : entry.has_worked_with_brands === false ? 'No' : '—'}</Row>
            {entry.brand_count_estimate && <Row label="Brand count">{entry.brand_count_estimate}</Row>}
            {entry.preferred_deal_type?.length ? (
              <Row label="Preferred deals">{entry.preferred_deal_type.map(d => d.replace(/_/g, ' ')).join(', ')}</Row>
            ) : null}
            {entry.referral_source && <Row label="Referral source" style={{ textTransform: 'capitalize' }}>{entry.referral_source.replace(/_/g, ' ')}</Row>}
          </Section>

          {/* Admin actions */}
          <Section title="Admin">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-field">
                <label className="form-label">Status</label>
                <select className="form-input" value={entry.status}
                  onChange={e => onUpdateStatus(entry.id, e.target.value as 'pending' | 'approved' | 'rejected')}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Notes</label>
                <textarea className="form-input" rows={4} value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Internal notes…" />
              </div>
              <button className="btn-gold" style={{ alignSelf: 'flex-start' }}
                onClick={() => onUpdateNotes(entry.id, notes)}>
                Save Notes
              </button>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{
        fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)',
        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px',
        paddingBottom: '8px', borderBottom: '1px solid var(--border)',
      }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>{children}</div>
    </div>
  );
}

function Row({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
      <span style={{ fontSize: '13px', color: 'var(--text-muted)', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'right', ...style }}>{children}</span>
    </div>
  );
}
