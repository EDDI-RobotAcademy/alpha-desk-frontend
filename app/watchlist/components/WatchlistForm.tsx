"use client";

interface WatchlistFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function WatchlistForm({ value, onChange, onSubmit }: WatchlistFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="종목 코드 또는 종목명 입력"
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        등록
      </button>
    </form>
  );
}
