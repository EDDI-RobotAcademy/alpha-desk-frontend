"use client"

import { useState } from "react"
import Link from "next/link"
import { useSharedCards } from "@/features/share/application/hooks/useSharedCards"
import { useCardActions } from "@/features/share/application/hooks/useCardActions"
import { usePublicSummaries } from "@/features/public/application/hooks/usePublicSummaries"
import { deleteSharedCard } from "@/features/share/infrastructure/api/shareApi"
import { getAccountIdCookie } from "@/features/share/infrastructure/utils/guestName"
import { CommentModal } from "@/features/share/ui/components/CommentModal"
import type { SharedCard } from "@/features/share/domain/model/sharedCard"

const SOURCE_LABEL: Record<string, string> = { NEWS: "뉴스", DISCLOSURE: "공시", REPORT: "재무" }

const SENTIMENT_STYLE: Record<string, string> = {
    POSITIVE: "border-tertiary text-tertiary",
    NEUTRAL: "border-on-surface-variant text-on-surface-variant",
    NEGATIVE: "border-error text-error",
}

const SENTIMENT_LABEL: Record<string, string> = {
    POSITIVE: "긍정",
    NEUTRAL: "중립",
    NEGATIVE: "부정",
}

function SharedCardItem({ card, onReload }: { card: SharedCard; onReload: () => void }) {
    const {
        likeCount, liked, handleLike,
        comments, commentLoading,
        loadComments, handleAddComment,
    } = useCardActions(card.id, card.like_count, card.user_has_liked)

    const [commentOpen, setCommentOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const isOwner =
        card.sharer_account_id !== null &&
        card.sharer_account_id === Number(getAccountIdCookie())

    const scoreStr = `${card.sentiment_score > 0 ? "+" : ""}${card.sentiment_score.toFixed(2)}`

    const handleDelete = async () => {
        if (!confirm("이 카드의 공유를 취소할까요?")) return
        setDeleting(true)
        try {
            await deleteSharedCard(card.id)
            onReload()
        } finally {
            setDeleting(false)
        }
    }

    return (
        <article className="border border-outline bg-surface-container-low">
            <div className="p-5 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-sm font-bold text-outline">{card.symbol}</span>
                        <span className="font-mono text-base font-bold text-on-surface">{card.name}</span>
                        {SOURCE_LABEL[card.source_type] && (
                            <span className="border border-outline font-mono text-xs px-1.5 py-0.5 text-on-surface-variant uppercase">
                                {SOURCE_LABEL[card.source_type]}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`border font-mono text-xs px-2 py-0.5 font-bold ${SENTIMENT_STYLE[card.sentiment] ?? SENTIMENT_STYLE.NEUTRAL}`}>
                            {SENTIMENT_LABEL[card.sentiment] ?? card.sentiment} {scoreStr}
                        </span>
                        {isOwner && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="font-mono text-xs text-outline hover:text-error disabled:opacity-40 uppercase"
                            >
                                DEL
                            </button>
                        )}
                    </div>
                </div>

                {/* Summary */}
                <p className="font-mono text-sm text-on-surface leading-relaxed">{card.summary}</p>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                    {card.tags.map((tag) => (
                        <span key={tag} className="border border-outline font-mono text-xs px-2 py-0.5 text-on-surface-variant">
                            #{tag}
                        </span>
                    ))}
                    <span className="font-mono text-xs text-outline ml-auto">
                        신뢰도 {Math.round(card.confidence * 100)}%
                    </span>
                </div>

                {/* Confidence bar */}
                <div className="h-1 bg-surface-container-highest">
                    <div className="h-full bg-primary" style={{ width: `${card.confidence * 100}%` }} />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 border-t border-outline-variant pt-2">
                    <button
                        type="button"
                        onClick={handleLike}
                        className={`flex items-center gap-1.5 font-mono text-xs uppercase transition-none ${
                            liked ? "text-error font-bold" : "text-on-surface-variant hover:text-error"
                        }`}
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            {liked ? "favorite" : "favorite_border"}
                        </span>
                        {likeCount}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setCommentOpen(true); loadComments() }}
                        className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant hover:text-primary uppercase transition-none"
                    >
                        <span className="material-symbols-outlined text-[14px]">chat_bubble_outline</span>
                        {card.comment_count}
                    </button>
                    <span className="ml-auto font-mono text-xs text-outline">
                        {card.sharer_nickname} · {new Date(card.created_at).toLocaleDateString("ko-KR")}
                    </span>
                </div>
            </div>

            <CommentModal
                cardId={card.id}
                open={commentOpen}
                comments={comments}
                loading={commentLoading}
                onOpen={loadComments}
                onClose={() => setCommentOpen(false)}
                onSubmit={async (content, nickname) => {
                    await handleAddComment(content, nickname)
                    onReload()
                }}
            />
        </article>
    )
}

export default function HomePage() {
    const { cards, loading: cardsLoading, error: cardsError, reload } = useSharedCards(20)
    const { summaries, isLoading: summaryLoading } = usePublicSummaries()

    return (
        <main className="p-6 md:p-8 max-w-2xl mx-auto pb-20 md:pb-8">

            {/* Header */}
            <div className="mb-6 border-b border-outline pb-4">
                <div className="font-headline font-bold text-on-surface text-xl uppercase tracking-tighter">
                    HOME
                </div>
                <div className="font-mono text-sm text-on-surface-variant mt-0.5">
                    공유된 AI 분석 카드와 오늘의 공개 브리핑
                </div>
            </div>

            {/* ── 공유 카드 피드 ── */}
            <section className="mb-10">
                <div className="font-mono text-xs font-bold text-on-surface uppercase tracking-widest mb-3">
                    SHARED_CARDS
                    {cards.length > 0 && (
                        <span className="ml-2 text-outline font-normal">({cards.length})</span>
                    )}
                </div>

                {cardsLoading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-surface-container animate-pulse" />
                        ))}
                    </div>
                ) : cardsError ? (
                    <div className="border border-dashed border-outline px-6 py-8 text-center">
                        <p className="font-mono text-sm text-error">[ERROR] 카드를 불러오지 못했습니다.</p>
                    </div>
                ) : cards.length === 0 ? (
                    <div className="border border-dashed border-outline px-6 py-10 text-center">
                        <p className="font-mono text-sm text-on-surface-variant mb-1">
                            아직 공유된 분석 카드가 없습니다.
                        </p>
                        <p className="font-mono text-xs text-outline mb-4">
                            대시보드에서 AI 분석 후 카드를 공유해보세요.
                        </p>
                        <Link
                            href="/dashboard"
                            className="font-mono text-xs border border-outline px-4 py-2 text-on-surface-variant hover:bg-surface-container uppercase inline-block"
                        >
                            대시보드로 이동
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {cards.map((card) => (
                            <SharedCardItem key={card.id} card={card} onReload={reload} />
                        ))}
                    </div>
                )}
            </section>

            {/* ── 오늘의 공개 AI 브리핑 ── */}
            <section>
                <div className="font-mono text-xs font-bold text-on-surface uppercase tracking-widest mb-1">
                    TODAY_PUBLIC_BRIEF
                </div>
                <div className="font-mono text-xs text-outline mb-3">
                    주요 종목 오늘의 AI 분석 요약 · 매일 07:00 KST 자동 수집
                </div>

                {summaryLoading ? (
                    <div className="space-y-3">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-24 bg-surface-container animate-pulse" />
                        ))}
                    </div>
                ) : summaries.length === 0 ? (
                    <div className="border border-dashed border-outline px-6 py-8 text-center">
                        <p className="font-mono text-sm text-on-surface-variant">
                            오늘의 분석 데이터를 준비 중입니다.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {summaries.map((s) => (
                            <div key={s.symbol} className="border border-outline bg-surface-container-low p-5">
                                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="font-mono text-sm font-bold text-outline">{s.symbol}</span>
                                        <span className="font-mono text-base font-bold text-on-surface">{s.name}</span>
                                        {s.source_type && SOURCE_LABEL[s.source_type] && (
                                            <span className="border border-outline font-mono text-xs px-1.5 py-0.5 text-on-surface-variant">
                                                {SOURCE_LABEL[s.source_type]}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`border font-mono text-xs px-2 py-0.5 font-bold ${SENTIMENT_STYLE[s.sentiment] ?? SENTIMENT_STYLE.NEUTRAL}`}>
                                        {SENTIMENT_LABEL[s.sentiment] ?? s.sentiment}{" "}
                                        {s.sentiment_score > 0 ? "+" : ""}{s.sentiment_score.toFixed(2)}
                                    </span>
                                </div>
                                <p className="font-mono text-sm text-on-surface leading-relaxed mb-3">{s.summary}</p>
                                <div className="flex items-center gap-2 flex-wrap">
                                    {s.tags.map((tag) => (
                                        <span key={tag} className="border border-outline font-mono text-xs px-2 py-0.5 text-on-surface-variant">
                                            #{tag}
                                        </span>
                                    ))}
                                    <span className="font-mono text-xs text-outline ml-auto">
                                        신뢰도 {Math.round(s.confidence * 100)}%
                                    </span>
                                </div>
                                <div className="mt-3 h-1 bg-surface-container-highest">
                                    <div className="h-full bg-primary" style={{ width: `${s.confidence * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
