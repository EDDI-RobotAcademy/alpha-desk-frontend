"use client";

import StockSummaryCard from "../components/StockSummaryCard";
import { MOCK_STOCK_SUMMARIES } from "./mocks/stockSummaryMocks";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">대시보드</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">종목 요약 정보를 확인하세요</p>
        </header>

        <section>
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
            종목 카드
            <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
              {MOCK_STOCK_SUMMARIES.length}개
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_STOCK_SUMMARIES.map((stock) => (
              <StockSummaryCard key={stock.name} {...stock} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
