import { useState, useEffect } from 'react';
import { api } from '../api';
import type { Deal } from '../types';

interface UseDealsReturn {
  deals: Deal[];
  expiringSoon: Deal[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDeals(): UseDealsReturn {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [expiringSoon, setExpiringSoon] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([api.getDeals(), api.getExpiringSoonDeals()])
      .then(([all, soon]) => {
        if (!cancelled) {
          setDeals(all);
          setExpiringSoon(soon);
          setError(null);
        }
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tick]);

  return { deals, expiringSoon, loading, error, refetch: () => setTick((t) => t + 1) };
}
