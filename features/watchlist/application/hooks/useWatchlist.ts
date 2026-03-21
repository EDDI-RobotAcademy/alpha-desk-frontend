'use client';

import { useEffect, useState } from 'react';
import { WatchlistItem } from '@/features/watchlist/domain/model/watchlistItem';
import { watchlistApi } from '@/features/watchlist/infrastructure/api/watchlistApi';

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    watchlistApi
      .getList()
      .then(setItems)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!symbol.trim() || !name.trim()) return;
    setError(null);
    try {
      const added = await watchlistApi.add(symbol.trim(), name.trim());
      setItems((prev) => [...prev, added]);
      setSymbol('');
      setName('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await watchlistApi.remove(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return { items, symbol, setSymbol, name, setName, error, loading, handleAdd, handleDelete };
}
