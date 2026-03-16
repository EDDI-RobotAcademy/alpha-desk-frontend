"use client";

import { useState } from "react";
import WatchlistForm from "./components/WatchlistForm";
import WatchlistItem, { WatchlistStock } from "./components/WatchlistItem";

export default function WatchlistPage() {
  const [input, setInput] = useState("");
  const [stocks, setStocks] = useState<WatchlistStock[]>([]);

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newStock: WatchlistStock = {
      id: crypto.randomUUID(),
      ticker: trimmed.toUpperCase(),
      name: trimmed,
    };

    setStocks((prev) => [newStock, ...prev]);
    setInput("");
  };

  const handleDelete = (id: string) => {
    setStocks((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">관심종목</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">종목 등록</h2>
        <WatchlistForm value={input} onChange={setInput} onSubmit={handleAdd} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
          관심종목 목록
          {stocks.length > 0 && (
            <span className="ml-2 text-blue-600 dark:text-blue-400">{stocks.length}</span>
          )}
        </h2>

        {stocks.length === 0 ? (
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
