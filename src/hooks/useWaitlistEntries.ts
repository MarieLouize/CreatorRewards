import { useEffect, useState, useCallback } from 'react';
import { supabaseAdmin } from '../lib/supabaseAdmin';
import type { WaitlistEntry } from '../types/waitlist';

interface Filters {
  status: string;
  platform: string;
  search: string;
  page: number;
}

const PAGE_SIZE = 25;

export function useWaitlistEntries(filters: Filters) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    let query = supabaseAdmin
      .from('waitlist_entries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    if (filters.platform && filters.platform !== 'all') {
      query = query.eq('primary_platform', filters.platform);
    }
    if (filters.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    const from = filters.page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);

    const { data, count } = await query;
    setEntries((data as WaitlistEntry[]) ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [filters.status, filters.platform, filters.search, filters.page]);

  useEffect(() => { fetch(); }, [fetch]);

  const updateStatus = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    await supabaseAdmin
      .from('waitlist_entries')
      .update({ status })
      .eq('id', id);
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const updateNotes = async (id: string, admin_notes: string) => {
    await supabaseAdmin
      .from('waitlist_entries')
      .update({ admin_notes })
      .eq('id', id);
    setEntries(prev => prev.map(e => e.id === id ? { ...e, admin_notes } : e));
  };

  return { entries, total, loading, refresh: fetch, updateStatus, updateNotes };
}
