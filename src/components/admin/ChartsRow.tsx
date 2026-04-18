import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import type { WaitlistEntry } from '../../types/waitlist';

interface Props {
  entries: WaitlistEntry[];
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: '#FF5C5C',
  tiktok: '#69C9D0',
  youtube: '#FF0000',
  twitter: '#1DA1F2',
  facebook: '#1877F2',
};

export default function ChartsRow({ entries }: Props) {
  // Daily signups last 30 days
  const days: Record<string, number> = {};
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days[d.toISOString().slice(0, 10)] = 0;
  }
  entries.forEach(e => {
    const day = e.created_at.slice(0, 10);
    if (day in days) days[day] = (days[day] || 0) + 1;
  });
  const lineData = Object.entries(days).map(([date, count]) => ({
    date: date.slice(5),
    count,
  }));

  // Platform breakdown
  const platformCounts: Record<string, number> = {};
  entries.forEach(e => {
    platformCounts[e.primary_platform] = (platformCounts[e.primary_platform] || 0) + 1;
  });
  const pieData = Object.entries(platformCounts).map(([name, value]) => ({ name, value }));

  const tooltipStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '13px',
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '16px',
      marginBottom: '24px',
    }}>
      {/* Line chart */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '24px',
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Signups — Last 30 Days
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 11 }} tickLine={false} axisLine={false} interval={6} />
            <YAxis tick={{ fill: '#555', fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="count" stroke="var(--accent-gold)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: 'var(--accent-gold)' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart */}
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '24px',
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Platform Split
        </h3>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {pieData.map(entry => (
                  <Cell key={entry.name} fill={PLATFORM_COLORS[entry.name] || '#888'} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend formatter={(value: string) => <span style={{ color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'capitalize' }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'var(--text-muted)', fontSize: '14px' }}>
            No data yet
          </div>
        )}
      </div>
    </div>
  );
}
