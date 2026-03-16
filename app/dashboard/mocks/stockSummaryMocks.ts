import { StockSummaryCardProps } from "@/app/components/StockSummaryCard";

export const MOCK_STOCK_SUMMARIES: StockSummaryCardProps[] = [
  {
    name: "삼성전자",
    summary:
      "반도체·스마트폰·가전을 아우르는 글로벌 IT 대기업. HBM 수요 확대와 함께 AI 서버향 메모리 매출이 성장세를 보이고 있습니다.",
    tags: ["반도체", "스마트폰", "IT", "대형주"],
  },
  {
    name: "SK하이닉스",
    summary:
      "DRAM·NAND 플래시 전문 메모리 반도체 기업. HBM3E 양산 본격화로 엔비디아 공급 물량이 증가하고 있습니다.",
    tags: ["반도체", "메모리", "HBM", "대형주"],
  },
  {
    name: "NAVER",
    summary:
      "국내 최대 검색·쇼핑·콘텐츠 플랫폼. 하이퍼클로바X 기반 AI 서비스 확대와 라인 일본 사업 안정화가 주요 관전 포인트입니다.",
    tags: ["인터넷", "플랫폼", "AI", "IT"],
  },
  {
    name: "카카오",
    summary:
      "메신저 기반 생활 플랫폼 기업. 광고·커머스·콘텐츠 사업 다각화를 추진 중이며 AI 신사업 로드맵을 발표했습니다.",
    tags: ["인터넷", "플랫폼", "콘텐츠"],
  },
  {
    name: "LG에너지솔루션",
    summary:
      "전기차·ESS용 리튬이온 배터리 세계 2위 업체. 북미 IRA 보조금 수혜와 유럽 고객사 공급 다변화가 진행 중입니다.",
    tags: ["배터리", "2차전지", "EV", "대형주"],
  },
  {
    name: "현대차",
    summary:
      "글로벌 완성차 기업으로 EV·수소차 전환을 가속화 중. 아이오닉 시리즈 판매 호조와 미국 공장 가동이 실적을 견인하고 있습니다.",
    tags: ["자동차", "EV", "수소", "대형주"],
  },
];
