import { httpClient } from "@/infrastructure/http/httpClient";
import { WatchlistStock } from "@/app/watchlist/components/WatchlistItem";

export async function fetchWatchlist(): Promise<WatchlistStock[]> {
  const res = await httpClient.get("/watchlist");
  if (!res.ok) throw new Error("관심종목 목록 조회에 실패했습니다.");
  return res.json();
}

export async function addToWatchlist(ticker: string, name: string): Promise<WatchlistStock> {
  const res = await httpClient.post("/watchlist", { ticker, name });
  if (!res.ok) throw new Error("관심종목 등록에 실패했습니다.");
  return res.json();
}

export async function deleteFromWatchlist(id: string): Promise<void> {
  const res = await httpClient.delete(`/watchlist/${id}`);
  if (!res.ok) throw new Error("관심종목 삭제에 실패했습니다.");
}
