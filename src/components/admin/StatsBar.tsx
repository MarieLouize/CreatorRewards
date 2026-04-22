import type { WaitlistEntry } from '../../types/waitlist';

interface Props {
  entries: WaitlistEntry[];
  total: number;
}

export default function StatsBar({ entries, total }: Props) {
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = entries.filter(e => new Date(e.created_at).getTime() > weekAgo).length;

  const platformCounts: Record<string, number> = {};
  entries.forEach(e => {
    (e.selected_platforms || []).forEach(p => {
      platformCounts[p] = (platformCounts[p] || 0) + 1;
    });
  });
  const topPlatform = Object.entries(platformCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  const brandExperience = entries.filter(e => e.has_worked_with_brands).length;
  const brandPercent = total > 0 ? Math.round((brandExperience / total) * 100) : 0;

  const stats = [
    { label: 'Total Signups', value: total.toLocaleString() },
    { label: 'This Week', value: thisWeek.toLocaleString() },
    { label: 'Top Platform', value: topPlatform.charAt(0).toUpperCase() + topPlatform.slice(1) },
    { label: 'Brand Experience', value: `${brandPercent}%` },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      marginBottom: '24px',
    }}>
      {stats.map(s => (
        <div key={s.label} style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderTop: '3px solid var(--accent-gold)',
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px', fontWeight: 700,
            color: 'var(--text-primary)', marginBottom: '4px',
          }}>{s.value}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
