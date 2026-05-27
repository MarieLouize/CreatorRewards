import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useWaitlistCount() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const { count: c, error: err } = await supabase
          .from('waitlist_entries')
          .select('id', { count: 'exact', head: true });

        if (err) {
          console.error('Error fetching waitlist count:', err);
          setError(err.message);
        } else if (c !== null) {
          setCount(c + 100);
        }
      } catch (err) {
        console.error('Unexpected error fetching waitlist count:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }
    fetchCount();
  }, []);

  return { count, error };
}
