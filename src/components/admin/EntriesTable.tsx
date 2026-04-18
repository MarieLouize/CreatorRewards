import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import type { WaitlistEntry } from '../../types/waitlist';

interface Props {
  entries: WaitlistEntry[];
  total: number;
  loading: boolean;
  filters: { status: string; platform: string; search: string; page: number };
  onFilterChange: (key: string, value: string | number) => void;
  onUpdateStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
  onRowClick: (entry: WaitlistEntry) => void;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:  { bg: 'rgba(160,160,160,0.15)', color: '#A0A0A0' },
  approved: { bg: 'rgba(61,255,151,0.12)',  color: '#3DFF97' },
  rejected: { bg: 'rgba(255,92,92,0.12)',   color: '#FF5C5C' },
};

const PLATFORMS = ['all', 'instagram', 'tiktok', 'youtube', 'twitter', 'facebook'];
const PAGE_SIZE = 25;

function exportCSV(entries: WaitlistEntry[]) {
  const headers = ['Position', 'Name', 'Email', 'Phone', 'Platform', 'Followers', 'Niches', 'City', 'Country', 'Status', 'Signed Up'];
  const rows = entries.map(e => [
    e.waitlist_position ?? '',
    e.full_name,
    e.email,
    e.phone ?? '',
    e.primary_platform,
    e.primary_follower_count ?? '',
    (e.content_niches ?? []).join('; '),
    e.location_city ?? '',
    e.location_country ?? '',
    e.status,
    new Date(e.created_at).toLocaleDateString(),
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `creatorRewards-waitlist-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function EntriesTable({ entries, total, loading, filters, onFilterChange, onUpdateStatus, onRowClick }: Props) {
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
      {/* Filter bar */}
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid var(--border)',
        display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Status tabs */}
          {['all', 'pending', 'approved', 'rejected'].map(s => (
            <button key={s} type="button"
              onClick={() => onFilterChange('status', s)}
              style={{
                padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
                border: `1px solid ${filters.status === s ? 'var(--accent-gold)' : 'var(--border)'}`,
                background: filters.status === s ? 'rgba(245,200,66,0.1)' : 'transparent',
                color: filters.status === s ? 'var(--accent-gold)' : 'var(--text-secondary)',
                textTransform: 'capitalize',
              }}>
              {s}
            </button>
          ))}
          {/* Platform filter */}
          <select
            value={filters.platform}
            onChange={e => onFilterChange('platform', e.target.value)}
            style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: '6px', color: 'var(--text-secondary)', fontSize: '13px',
              padding: '6px 10px', cursor: 'pointer', outline: 'none',
            }}>
            {PLATFORMS.map(p => <option key={p} value={p} style={{ textTransform: 'capitalize' }}>{p === 'all' ? 'All Platforms' : p}</option>)}
          </select>
          {/* Search */}
          <input
            type="text" placeholder="Search name or email…"
            value={filters.search}
            onChange={e => onFilterChange('search', e.target.value)}
            style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: '6px', color: 'var(--text-primary)', fontSize: '13px',
              padding: '6px 12px', outline: 'none', width: '200px',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent-gold)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
        <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '13px' }}
          onClick={() => exportCSV(entries)}>
          <Download size={14} strokeWidth={2} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['#', 'Name', 'Email', 'Platform', 'Followers', 'Niches', 'Location', 'Signed Up', 'Status', 'Action'].map(h => (
                <th key={h} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading…</td></tr>
            ) : entries.length === 0 ? (
              <tr><td colSpan={10} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No entries found</td></tr>
            ) : entries.map(entry => {
              const sc = STATUS_COLORS[entry.status];
              return (
                <tr key={entry.id}
                  onClick={() => onRowClick(entry)}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    {entry.waitlist_position ?? '—'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                    {entry.full_name}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {entry.email}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                    {entry.primary_platform}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {entry.primary_follower_count?.toLocaleString() ?? '—'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {(entry.content_niches ?? []).slice(0, 3).join(', ')}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {[entry.location_city, entry.location_country].filter(Boolean).join(', ') || '—'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {new Date(entry.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-block', padding: '3px 10px', borderRadius: '100px',
                      fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em',
                      textTransform: 'capitalize',
                      background: sc.bg, color: sc.color,
                    }}>{entry.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }} onClick={e => e.stopPropagation()}>
                    <select
                      value={entry.status}
                      onChange={e => onUpdateStatus(entry.id, e.target.value as 'pending' | 'approved' | 'rejected')}
                      style={{
                        background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                        borderRadius: '6px', color: 'var(--text-secondary)', fontSize: '12px',
                        padding: '4px 8px', cursor: 'pointer', outline: 'none',
                      }}>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          padding: '16px 20px', borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Page {filters.page + 1} of {totalPages} · {total} entries
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: '13px' }}
              disabled={filters.page === 0}
              onClick={() => onFilterChange('page', filters.page - 1)}>
          <ChevronLeft size={14} strokeWidth={2} /> Prev
            </button>
            <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: '13px' }}
              disabled={filters.page >= totalPages - 1}
              onClick={() => onFilterChange('page', filters.page + 1)}>
          Next <ChevronRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
