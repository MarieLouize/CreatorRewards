import { useState, useRef, useEffect } from 'react';
import { Download, ChevronLeft, ChevronRight, Mail, User, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import type { WaitlistEntry } from '../../types/waitlist';

interface Props {
  entries: WaitlistEntry[];
  total: number;
  loading: boolean;
  filters: { status: string; search: string; page: number };
  onFilterChange: (key: string, value: string | number) => void;
  onUpdateStatus: (id: string, status: 'pending' | 'approved' | 'rejected') => void;
  onRowClick: (entry: WaitlistEntry) => void;
  fetchAllMatching: () => Promise<WaitlistEntry[]>;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:  { bg: 'rgba(160,160,160,0.15)', color: '#A0A0A0' },
  approved: { bg: 'rgba(61,255,151,0.12)',  color: '#3DFF97' },
  rejected: { bg: 'rgba(255,92,92,0.12)',   color: '#FF5C5C' },
};

const PAGE_SIZE = 25;

const dropdownItemStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 12px',
  borderRadius: '6px',
  background: 'transparent',
  border: 'none',
  color: 'var(--text-primary)',
  fontSize: '13px',
  cursor: 'pointer',
  transition: 'background 0.2s',
  textAlign: 'left',
};

function generateCSV(entries: WaitlistEntry[]) {
  const headers = ['Position', 'Name', 'Email', 'Phone', 'Platforms', 'Niches', 'Follower Range', 'City', 'Status', 'Signed Up', 'Admin Notes'];
  const rows = entries.map(e => [
    e.waitlist_position ?? '',
    e.full_name,
    e.email,
    e.phone ?? '',
    (e.selected_platforms ?? []).join('; '),
    (e.content_niches ?? []).join('; '),
    e.follower_range ?? '',
    e.location_city ?? '',
    e.status,
    new Date(e.created_at).toLocaleDateString(),
    e.admin_notes ?? '',
  ]);
  return [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
}

export default function EntriesTable({ entries, total, loading, filters, onFilterChange, onUpdateStatus, onRowClick, fetchAllMatching }: Props) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const [exportOpen, setExportOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = async (type: 'csv' | 'emails' | 'names') => {
    setExporting(true);
    setExportOpen(false);
    try {
      const allEntries = await fetchAllMatching();
      if (allEntries.length === 0) {
        toast.error('No entries to export');
        return;
      }

      if (type === 'csv') {
        const csv = generateCSV(allEntries);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CR-Waitlist-${filters.status}-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`Exported ${allEntries.length} entries to CSV`);
      } else if (type === 'emails') {
        const emails = allEntries.map(e => e.email).join(', ');
        await navigator.clipboard.writeText(emails);
        toast.success(`Copied ${allEntries.length} emails to clipboard`);
      } else if (type === 'names') {
        const names = allEntries.map(e => e.full_name).join('\n');
        await navigator.clipboard.writeText(names);
        toast.success(`Copied ${allEntries.length} names to clipboard`);
      }
    } catch (err) {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

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
          {/* Search */}
          <input
            type="text" placeholder="Search name or email…"
            value={filters.search}
            onChange={e => onFilterChange('search', e.target.value)}
            style={{
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              borderRadius: '6px', color: 'var(--text-primary)', fontSize: '13px',
              padding: '6px 12px', outline: 'none', width: '250px',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent-gold)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>
        
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button 
            className="btn-gold" 
            style={{ padding: '8px 16px', fontSize: '13px', gap: '8px' }}
            disabled={exporting}
            onClick={() => setExportOpen(!exportOpen)}
          >
            {exporting ? 'Exporting...' : (
              <>
                <Download size={14} strokeWidth={2.5} /> 
                Quick Export
                <ChevronDown size={14} style={{ marginLeft: '4px', transform: exportOpen ? 'rotate(180)deg' : 'none', transition: 'transform 0.2s' }} />
              </>
            )}
          </button>

          {exportOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: '8px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '8px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.4)',
              zIndex: 100, width: '220px', padding: '6px',
            }}>
              <div style={{ padding: '8px 12px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Format Options
              </div>
              <button 
                className="dropdown-item" 
                onClick={() => handleExport('csv')} 
                style={dropdownItemStyle}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Download size={14} color="var(--accent-gold)" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600 }}>Download CSV</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Full spreadsheet data</div>
                </div>
              </button>
              <button 
                className="dropdown-item" 
                onClick={() => handleExport('emails')} 
                style={dropdownItemStyle}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <Mail size={14} color="var(--accent-gold)" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600 }}>Copy Emails</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Paste directly into BCC</div>
                </div>
              </button>
              <button 
                className="dropdown-item" 
                onClick={() => handleExport('names')} 
                style={dropdownItemStyle}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <User size={14} color="var(--accent-gold)" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600 }}>Copy Names</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>List of all creator names</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['#', 'Name', 'Email', 'Platforms', 'Niches', 'City', 'Signed Up', 'Status', 'Action'].map(h => (
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
              <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading…</td></tr>
            ) : entries.length === 0 ? (
              <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No entries found</td></tr>
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
                    {entry.selected_platforms?.slice(0, 2).join(', ')}{(entry.selected_platforms?.length ?? 0) > 2 ? '...' : ''}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {(entry.content_niches ?? []).slice(0, 3).join(', ')}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {entry.location_city || '—'}
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
