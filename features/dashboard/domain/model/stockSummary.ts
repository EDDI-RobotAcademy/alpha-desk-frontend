export interface TagItem {
  label: string;
  category: string;
}

export interface StockSummary {
  symbol: string;
  name: string;
  summary: string;
  tags: TagItem[];
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  sentiment_score: number;
  confidence: number;
}
