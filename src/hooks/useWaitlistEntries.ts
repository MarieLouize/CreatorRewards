import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabaseAdmin } from '../lib/supabaseAdmin';
import type { WaitlistEntry } from '../types/waitlist';

interface Filters {
  status: string;
  search: string;
  page: number;
}

const PAGE_SIZE = 25;

export function useWaitlistEntries(filters: Filters) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabaseAdmin
        .from('waitlist_entries')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }
      if (filters.search) {
        query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }

      const from = filters.page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);

      const { data, count, error: supabaseError } = await query;
      
      if (supabaseError) throw supabaseError;

      setEntries((data as WaitlistEntry[]) ?? []);
      setTotal(count ?? 0);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch entries';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.search, filters.page]);

  useEffect(() => { fetch(); }, [fetch]);

  const updateStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const { error: supabaseError } = await supabaseAdmin
        .from('waitlist_entries')
        .update({ status })
        .eq('id', id);

      if (supabaseError) throw supabaseError;

      setEntries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
      toast.success(`Entry marked as ${status}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update status';
      toast.error(msg);
    }
  };

  const updateNotes = async (id: string, admin_notes: string) => {
    try {
      const { error: supabaseError } = await supabaseAdmin
        .from('waitlist_entries')
        .update({ admin_notes })
        .eq('id', id);

      if (supabaseError) throw supabaseError;

      setEntries(prev => prev.map(e => e.id === id ? { ...e, admin_notes } : e));
      toast.success('Notes updated successfully');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update notes';
      toast.error(msg);
    }
  };

  return { entries, total, loading, error, refresh: fetch, updateStatus, updateNotes };
}
