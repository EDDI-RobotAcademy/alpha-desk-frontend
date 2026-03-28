"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/features/auth/application/hooks/useAuth"
import { usePublicSummaries } from "@/features/public/application/hooks/usePublicSummaries"

const HOW_IT_WORKS = [
    {
        step: "01",
        title: "관심종목 등록",
        desc: "삼성전자, 현대차, NAVER 등 분석하고 싶은 종목을 검색해서 워치리스트에 추가합니다.",
        icon: "playlist_add",
    },
    {
        step: "02",
        title: "AI 자동 수집·분석",
        desc: "매일 07:00 KST, AI가 등록 종목의 뉴스·공시·재무 리포트를 자동 수집하고 요약합니다.",
        icon: "smart_toy",
    },
    {
        step: "03",
        title: "대시보드에서 확인",
        desc: "감성 점수, 리스크 태그, 3~5줄 요약을 대시보드에서 한눈에 확인합니다. 투자 판단은 본인이.",
        icon: "dashboard",
    },
]

const FEATURES = [
    {
        icon: "bar_chart",
        title: "대시보드",
        desc: "관심종목 AI 요약을 카드 형태로 한눈에 확인. 파이프라인 직접 실행 가능.",
        href: "/dashboard",
    },
    {
        icon: "visibility",
        title: "워치리스트",
        desc: "종목 검색 후 추가. 일별 등락 히트맵으로 최근 6주 흐름 파악.",
        href: "/watchlist",
    },
    {
        icon: "forum",
        title: "커뮤니티",
        desc: "종목 분석·시황 의견을 팀원·사용자와 공유하는 게시판.",
        href: "/board",
    },
    {
        icon: "play_circle",
        title: "영상 피드",
        desc: "관심종목 관련 유튜브 영상을 자동으로 수집해 탭별로 제공.",
        href: "/youtube",
    },
]

const SOURCE_LABEL: Record<string, string> = { NEWS: "뉴스", DISCLOSURE: "공시", REPORT: "재무" }

const SENTIMENT_STYLE: Record<string, string> = {
    POSITIVE: "border-tertiary text-tertiary",
    NEUTRAL:  "border-on-surface-variant text-on-surface-variant",
    NEGATIVE: "border-error text-error",
}

const SENTIMENT_LABEL: Record<string, string> = {
    POSITIVE: "긍정",
    NEUTRAL:  "중립",
    NEGATIVE: "부정",
}

function LoginRequiredModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <button
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
                aria-label="닫기"
            />
            <div className="relative z-10 w-full max-w-sm mx-4 border-2 border-primary bg-white p-8 text-center">
                <div className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-4">
                    ACCESS_DENIED
                </div>
                <p className="font-headline font-bold text-on-surface text-lg uppercase mb-2">
                    로그인이 필요합니다
                </p>
                <p className="font-mono text-sm text-on-surface-variant mb-6">
                    AI 분석 기능은 회원 전용입니다.<br />
                    무료로 가입하고 바로 이용하세요.
                </p>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 font-mono text-sm border border-outline px-4 py-2 text-on-surface-variant hover:bg-surface-container uppercase"
                    >
                        닫기
                    </button>
                    <Link
                        href="/login"
                        className="flex-1 bg-primary text-white font-mono text-sm px-4 py-2 uppercase hover:opacity-90 text-center"
                    >
                        로그인 →
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function LandingPage() {
    const router = useRouter()
    const { state, loadUser } = useAuth()
    const { summaries, isLoading: isSummaryLoading } = usePublicSummaries()
    const [showLoginModal, setShowLoginModal] = useState(false)

    useEffect(() => {
        loadUser()
    }, [loadUser])

    useEffect(() => {
        if (state.status === "AUTHENTICATED") {
            router.push("/dashboard")
        }
    }, [state.status, router])

    const isLoggedIn = state.status === "AUTHENTICATED"

    if (state.status === "LOADING" || isLoggedIn) {
        return <div className="h-full bg-background" />
    }

    return (
        <div className="h-full overflow-y-auto bg-[#d1d1d1] font-body text-on-surface">

            {showLoginModal && <LoginRequiredModal onClose={() => setShowLoginModal(false)} />}

            {/* Landing Nav */}
            <nav className="sticky top-0 w-full z-40 bg-surface-container border-b-2 border-primary flex justify-between items-center px-6 h-12">
                <span className="font-headline font-bold text-xl text-primary uppercase tracking-tighter">
                    ALPHA_DESK_v1.0
                </span>
                <div className="hidden md:flex gap-6 items-center font-mono uppercase tracking-tighter text-sm">
                    <a href="#how" className="text-on-surface-variant hover:text-primary">HOW_IT_WORKS</a>
                    <a href="#live" className="text-on-surface-variant hover:text-primary">LIVE_FEED</a>
                    <a href="#features" className="text-on-surface-variant hover:text-primary">FEATURES</a>
                </div>
                <div>
                    <Link href="/login" className="bg-primary text-white font-mono text-xs px-3 py-1.5 uppercase hover:opacity-90">
                        SYS_LOGIN →
                    </Link>
                </div>
            </nav>

            {/* Paper Feed */}
            <main className="relative my-8 mx-auto w-full max-w-5xl bg-white flex">
                {/* Left Sprocket */}
                <div className="w-12 sprocket-margin border-r border-outline-variant hidden sm:block flex-shrink-0" />

                <div className="flex-1 bg-white p-6 sm:p-12 min-w-0">

                    {/* ── Hero ── */}
                    <section className="mb-16">
                        <div className="border-4 border-primary p-6 md:p-10 flex flex-col gap-6">
                            <div className="bg-primary text-on-primary px-3 py-1 font-mono text-xs uppercase w-fit">
                                SYSTEM_STATUS: ONLINE
                            </div>

                            <div>
                                <h1 className="font-headline font-bold text-4xl md:text-6xl tracking-tighter text-primary leading-none uppercase mb-4">
                                    관심종목<br />AI 인텔리전스<br />터미널
                                </h1>
                                <p className="font-mono text-sm text-on-surface-variant leading-relaxed max-w-lg">
                                    뉴스·공시·리포트를 매일 자동 수집하고<br />
                                    AI가 3~5줄로 요약 + 감성 점수 + 리스크 태그를 부착합니다.<br />
                                    <span className="text-outline">투자 추천은 하지 않습니다. 판단은 본인이 합니다.</span>
                                </p>
                            </div>

                            <div className="flex gap-3 flex-wrap">
                                <Link href="/login" className="bg-primary text-white font-mono text-sm px-5 py-2.5 uppercase hover:opacity-90">
                                    무료로 시작 →
                                </Link>
                                <Link href="/board" className="border border-primary text-primary font-mono text-sm px-5 py-2.5 uppercase hover:bg-primary hover:text-white">
                                    커뮤니티 보기
                                </Link>
                            </div>

                            <div className="border-t border-primary pt-4 grid grid-cols-3 gap-4 font-mono text-xs">
                                <div>
                                    <div className="text-2xl font-bold text-primary">07:00</div>
                                    <div className="text-outline uppercase">KST 자동 수집</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">3~5줄</div>
                                    <div className="text-outline uppercase">AI 요약</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">100%</div>
                                    <div className="text-outline uppercase">사실 기반</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="micro-perforation my-12" />

                    {/* ── [01] How It Works ── */}
                    <section id="how" className="mb-16">
                        <h2 className="font-headline font-bold text-xl text-primary mb-8 border-b border-primary pb-2 uppercase tracking-widest">
                            [01] HOW_IT_WORKS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline">
                            {HOW_IT_WORKS.map((step, i) => (
                                <div
                                    key={step.step}
                                    className={`p-6 flex flex-col gap-3 ${i < HOW_IT_WORKS.length - 1 ? "border-b md:border-b-0 md:border-r border-outline" : ""}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-3xl font-bold text-primary leading-none">{step.step}</span>
                                        <span className="material-symbols-outlined text-primary" style={{ fontSize: "28px" }}>{step.icon}</span>
                                    </div>
                                    <div className="font-headline font-bold text-on-surface uppercase tracking-tight text-base">
                                        {step.title}
                                    </div>
                                    <p className="font-mono text-sm text-on-surface-variant leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="micro-perforation my-12" />

                    {/* ── [02] Live Feed ── */}
                    <section id="live" className="mb-16">
                        <h2 className="font-headline font-bold text-xl text-primary mb-2 border-b border-primary pb-2 uppercase tracking-widest">
                            [02] LIVE_AI_FEED
                        </h2>
                        <p className="font-mono text-xs text-outline mb-6 uppercase tracking-widest">
                            * 주요 종목 최신 AI 분석 결과입니다. 내 관심종목 분석은 로그인 후 이용하세요.
                        </p>

                        {isSummaryLoading ? (
                            <div className="space-y-3">
                                {[1, 2].map((i) => (
                                    <div key={i} className="h-28 bg-surface-container animate-pulse" />
                                ))}
                            </div>
                        ) : summaries.length === 0 ? (
                            <div className="border border-dashed border-outline px-6 py-10 text-center">
                                <p className="font-mono text-sm text-on-surface-variant">
                                    오늘의 AI 분석 데이터를 준비 중입니다.
                                </p>
                                <p className="font-mono text-xs text-outline mt-1">
                                    매일 07:00 KST 자동 수집됩니다.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {summaries.map((s) => (
                                    <div key={s.symbol} className="border border-outline bg-surface-container-low p-5">
                                        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                                            <div className="flex items-center gap-3">
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

                                        <p className="font-mono text-sm text-on-surface leading-relaxed mb-3">
                                            {s.summary}
                                        </p>

                                        <div className="flex items-center gap-3 flex-wrap">
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

                        {/* 선택종목 분석 버튼 */}
                        <div className="mt-6 border border-dashed border-outline px-6 py-6 text-center">
                            <p className="font-mono text-sm text-on-surface-variant mb-3">
                                내 관심종목 AI 분석을 직접 실행하려면 로그인이 필요합니다.
                            </p>
                            <div className="flex gap-3 justify-center flex-wrap">
                                <button
                                    type="button"
                                    onClick={() => setShowLoginModal(true)}
                                    className="bg-primary text-white font-mono text-sm px-5 py-2 uppercase hover:opacity-90"
                                >
                                    AI 분석 실행
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowLoginModal(true)}
                                    className="border border-primary text-primary font-mono text-sm px-5 py-2 uppercase hover:bg-primary hover:text-white"
                                >
                                    선택종목 분석
                                </button>
                            </div>
                        </div>
                    </section>

                    <div className="micro-perforation my-12" />

                    {/* ── [03] Features ── */}
                    <section id="features" className="mb-16">
                        <h2 className="font-headline font-bold text-xl text-primary mb-8 border-b border-primary pb-2 uppercase tracking-widest">
                            [03] SYSTEM_MODULES
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {FEATURES.map((f) => (
                                <Link
                                    key={f.title}
                                    href="/login"
                                    className="border border-outline p-5 bg-surface-container-low hover:border-primary group flex gap-4"
                                >
                                    <span className="material-symbols-outlined text-primary flex-shrink-0 group-hover:scale-110 transition-transform" style={{ fontSize: "32px" }}>
                                        {f.icon}
                                    </span>
                                    <div>
                                        <div className="font-headline font-bold text-on-surface uppercase text-base mb-1">
                                            {f.title}
                                        </div>
                                        <p className="font-mono text-sm text-on-surface-variant leading-relaxed">
                                            {f.desc}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* ── Disclosure Banner ── */}
                    <section className="mt-20 mb-4">
                        <div className="bg-primary text-white p-8 text-center border-4 border-double border-white outline outline-4 outline-primary">
                            <h2 className="font-headline font-extrabold text-3xl md:text-5xl tracking-[0.15em] mb-3">
                                AI 분석 참고용
                            </h2>
                            <p className="font-mono text-sm uppercase opacity-90 leading-relaxed">
                                FOR AI ANALYSIS REFERENCE ONLY.<br />
                                NOT FINANCIAL ADVICE. INVESTMENT DECISIONS ARE SOLELY YOUR RESPONSIBILITY.
                            </p>
                            <div className="mt-6">
                                <Link href="/login" className="bg-white text-primary font-mono text-sm font-bold px-6 py-2.5 uppercase hover:opacity-90 inline-block">
                                    시작하기 →
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Right Sprocket */}
                <div className="w-12 sprocket-margin border-l border-outline-variant hidden sm:block flex-shrink-0" />
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-dashed border-outline bg-surface py-8 px-4 flex flex-col items-center gap-3">
                <div className="font-mono text-xs uppercase text-outline text-center space-y-2">
                    <div>(C) 2025 ALPHA DESK SYSTEMS. ALL RIGHTS RESERVED.</div>
                    <div className="flex justify-center gap-6">
                        <span className="hover:text-primary cursor-pointer">PRIVACY.SYS</span>
                        <span className="hover:text-primary cursor-pointer">TERMS.EXE</span>
                    </div>
                </div>
                <div className="font-headline font-bold text-primary text-xs tracking-widest">ALPHA_DESK_CORP</div>
            </footer>

        </div>
    )
}
