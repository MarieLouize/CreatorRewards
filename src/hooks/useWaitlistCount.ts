import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useWaitlistCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from('waitlist_entries')
      .select('id', { count: 'exact', head: true })
      .then(({ count: c }: { count: number | null }) => {
        if (c !== null) setCount(c);
      });
  }, []);

  return count;
}
