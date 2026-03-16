"use client";

export interface WatchlistStock {
  id: string;
  ticker: string;
  name: string;
}

interface WatchlistItemProps {
  stock: WatchlistStock;
  onDelete: (id: string) => void;
}

export default function WatchlistItem({ stock, onDelete }: WatchlistItemProps) {
  return (
    <li className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          {stock.ticker}
        </span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{stock.name}</span>
      </div>
      <button
        onClick={() => onDelete(stock.id)}
        className="rounded-md px-3 py-1 text-xs text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
      >
        삭제
      </button>
    </li>
  );
}
