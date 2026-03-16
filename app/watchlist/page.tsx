"use client";

import { useState, useEffect } from "react";
import WatchlistForm from "./components/WatchlistForm";
import WatchlistItem, { WatchlistStock } from "./components/WatchlistItem";
import { fetchWatchlist, addToWatchlist, deleteFromWatchlist } from "@/infrastructure/api/watchlistApi";

export default function WatchlistPage() {
  const [input, setInput] = useState("");
  const [stocks, setStocks] = useState<WatchlistStock[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchlist()
      .then(setStocks)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setError(null);
    try {
      const added = await addToWatchlist(trimmed.toUpperCase(), trimmed);
      setStocks((prev) => [added, ...prev]);
      setInput("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      await deleteFromWatchlist(id);
      setStocks((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">관심종목</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">종목 등록</h2>
        <WatchlistForm value={input} onChange={setInput} onSubmit={handleAdd} />
      </section>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </p>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
          관심종목 목록
          {stocks.length > 0 && (
            <span className="ml-2 text-blue-600 dark:text-blue-400">{stocks.length}</span>
          )}
        </h2>

        {loading ? (
          <p className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">불러오는 중...</p>
        ) : stocks.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-300 py-10 text-center text-sm text-gray-400 dark:border-gray-600 dark:text-gray-500">
            등록된 관심종목이 없습니다.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {stocks.map((stock) => (
              <WatchlistItem key={stock.id} stock={stock} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
