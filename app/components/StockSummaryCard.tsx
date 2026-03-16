"use client";

export interface StockSummaryCardProps {
  name: string;
  summary: string;
  tags: string[];
}

export default function StockSummaryCard({ name, summary, tags }: StockSummaryCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h2>

      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{summary}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
