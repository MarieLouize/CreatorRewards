import { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, LogOut } from 'lucide-react';
import { useWaitlistEntries } from '../hooks/useWaitlistEntries';
import StatsBar from '../components/admin/StatsBar';
import ChartsRow from '../components/admin/ChartsRow';
import EntriesTable from '../components/admin/EntriesTable';
import EntryDetailPanel from '../components/admin/EntryDetailPanel';
import type { WaitlistEntry } from '../types/waitlist';

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const attempt = () => {
    if (pwd === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authed', '1');
      onSuccess();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '100%', maxWidth: '380px',
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '16px', padding: '40px',
        animation: shaking ? 'shake 0.5s ease' : 'none',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)',
            fontSize: '22px', marginBottom: '16px',
          }}><KeyRound size={22} color="var(--accent-gold)" strokeWidth={1.75} /></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Admin Access</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Enter your admin password to continue</p>
        </div>
        <div className="form-field" style={{ marginBottom: '20px' }}>
          <input
            className={`form-input${error ? ' error' : ''}`}
            type="password" placeholder="Password"
            value={pwd}
            onChange={e => { setPwd(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            autoFocus
          />
          {error && <span className="form-error">Incorrect password</span>}
        </div>
        <button className="btn-gold" style={{ width: '100%', justifyContent: 'center' }} onClick={attempt}>
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_authed') === '1');
  const [filters, setFilters] = useState({ status: 'all', platform: 'all', search: '', page: 0 });
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);

  const { entries, total, loading, updateStatus, updateNotes } = useWaitlistEntries(filters);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value, ...(key !== 'page' ? { page: 0 } : {}) }));
  };

  const handleUpdateStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    await updateStatus(id, status);
    if (selectedEntry?.id === id) {
      setSelectedEntry(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleUpdateNotes = async (id: string, notes: string) => {
    await updateNotes(id, notes);
    if (selectedEntry?.id === id) {
      setSelectedEntry(prev => prev ? { ...prev, admin_notes: notes } : null);
    }
  };

  if (!authed) {
    return <PasswordGate onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Admin navbar */}
      <nav style={{
        background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)',
        padding: '0 24px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: 'var(--accent-gold)', color: '#000',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px',
            padding: '3px 8px', borderRadius: '100px',
          }}>CR</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '13px', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
          <ArrowLeft size={13} strokeWidth={2} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> View Site
          </Link>
          <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            onClick={() => { sessionStorage.removeItem('admin_authed'); setAuthed(false); }}>
            <LogOut size={13} strokeWidth={2} /> Sign Out
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Waitlist Entries
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Manage and review creator applications
          </p>
        </div>

        <StatsBar entries={entries} total={total} />
        <ChartsRow entries={entries} />
        <EntriesTable
          entries={entries}
          total={total}
          loading={loading}
          filters={filters}
          onFilterChange={handleFilterChange}
          onUpdateStatus={handleUpdateStatus}
          onRowClick={setSelectedEntry}
        />
      </div>

      <EntryDetailPanel
        entry={selectedEntry}
        onClose={() => setSelectedEntry(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
      />
    </div>
  );
}
