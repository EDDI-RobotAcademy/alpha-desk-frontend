"use client";

import StockSummaryCard, { StockSummaryCardProps } from "../components/StockSummaryCard";

const MOCK_STOCKS: StockSummaryCardProps[] = [
  {
    name: "삼성전자",
    summary: "반도체 및 스마트폰 사업을 영위하는 글로벌 IT 기업입니다.",
    tags: ["반도체", "IT", "대형주"],
  },
  {
    name: "SK하이닉스",
    summary: "메모리 반도체 전문 기업으로 DRAM 및 NAND 플래시를 생산합니다.",
    tags: ["반도체", "메모리", "대형주"],
  },
  {
    name: "NAVER",
    summary: "국내 최대 포털 및 검색 서비스를 운영하는 인터넷 플랫폼 기업입니다.",
    tags: ["인터넷", "플랫폼", "IT"],
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">대시보드</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">종목 요약 정보를 확인하세요</p>
        </header>

        <section>
          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">종목 카드</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_STOCKS.map((stock) => (
              <StockSummaryCard key={stock.name} {...stock} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
