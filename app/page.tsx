"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/features/auth/application/hooks/useAuth"

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
    { icon: "bar_chart",   title: "대시보드",  desc: "관심종목 AI 요약을 카드 형태로 한눈에 확인. 파이프라인 직접 실행 가능." },
    { icon: "visibility",  title: "워치리스트", desc: "종목 검색 후 추가. 일별 등락 히트맵으로 최근 6주 흐름 파악." },
    { icon: "forum",       title: "커뮤니티",   desc: "종목 분석·시황 의견을 팀원·사용자와 공유하는 게시판." },
    { icon: "play_circle", title: "영상 피드",  desc: "관심종목 관련 유튜브 영상을 자동으로 수집해 탭별로 제공." },
]

export default function LandingPage() {
    const router = useRouter()
    const { state, loadUser } = useAuth()

    useEffect(() => {
        loadUser()
    }, [loadUser])

    useEffect(() => {
        if (state.status === "AUTHENTICATED") {
            router.push("/home")
        }
    }, [state.status, router])

    if (state.status === "LOADING" || state.status === "AUTHENTICATED") {
        return <div className="h-full bg-background" />
    }

    return (
        <div className="h-full overflow-y-auto bg-[#d1d1d1] font-body text-on-surface">

            {/* Landing Nav */}
            <nav className="sticky top-0 w-full z-50 bg-surface-container border-b-2 border-primary flex justify-between items-center px-6 h-12">
                <span className="font-headline font-bold text-xl text-primary uppercase tracking-tighter">
                    ALPHA_DESK_v1.0
                </span>
                <div className="hidden md:flex gap-6 items-center font-mono uppercase tracking-tighter text-sm">
                    <a href="#how" className="text-on-surface-variant hover:text-primary">HOW_IT_WORKS</a>
                    <a href="#features" className="text-on-surface-variant hover:text-primary">FEATURES</a>
                </div>
                <Link href="/login" className="bg-primary text-white font-mono text-xs px-3 py-1.5 uppercase hover:opacity-90">
                    SYS_LOGIN →
                </Link>
            </nav>

            {/* Paper Feed */}
            <main className="relative my-8 mx-auto w-full max-w-5xl bg-white flex">
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

                            {/* CTA 버튼 */}
                            <div className="flex gap-3 flex-wrap">
                                <Link
                                    href="/login"
                                    className="bg-primary text-white font-mono text-sm px-5 py-2.5 uppercase hover:opacity-90"
                                >
                                    시작하기 →
                                </Link>
                                <Link
                                    href="/home"
                                    className="border border-primary text-primary font-mono text-sm px-5 py-2.5 uppercase hover:bg-primary hover:text-white"
                                >
                                    게스트로 시작하기
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
                                    <p className="font-mono text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="micro-perforation my-12" />

                    {/* ── [02] Features ── */}
                    <section id="features" className="mb-16">
                        <h2 className="font-headline font-bold text-xl text-primary mb-8 border-b border-primary pb-2 uppercase tracking-widest">
                            [02] SYSTEM_MODULES
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {FEATURES.map((f) => (
                                <div
                                    key={f.title}
                                    className="border border-outline p-5 bg-surface-container-low flex gap-4"
                                >
                                    <span className="material-symbols-outlined text-primary flex-shrink-0" style={{ fontSize: "32px" }}>
                                        {f.icon}
                                    </span>
                                    <div>
                                        <div className="font-headline font-bold text-on-surface uppercase text-base mb-1">{f.title}</div>
                                        <p className="font-mono text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Disclosure ── */}
                    <section className="mt-20 mb-4">
                        <div className="bg-primary text-white p-8 text-center border-4 border-double border-white outline outline-4 outline-primary">
                            <h2 className="font-headline font-extrabold text-3xl md:text-5xl tracking-[0.15em] mb-3">
                                AI 분석 참고용
                            </h2>
                            <p className="font-mono text-sm uppercase opacity-90 leading-relaxed">
                                FOR AI ANALYSIS REFERENCE ONLY.<br />
                                NOT FINANCIAL ADVICE. INVESTMENT DECISIONS ARE SOLELY YOUR RESPONSIBILITY.
                            </p>
                            <div className="mt-6 flex gap-3 justify-center flex-wrap">
                                <Link href="/login" className="bg-white text-primary font-mono text-sm font-bold px-6 py-2.5 uppercase hover:opacity-90 inline-block">
                                    시작하기 →
                                </Link>
                                <Link href="/home" className="border-2 border-white text-white font-mono text-sm px-6 py-2.5 uppercase hover:bg-white hover:text-primary inline-block">
                                    게스트로 둘러보기
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>

                <div className="w-12 sprocket-margin border-l border-outline-variant hidden sm:block flex-shrink-0" />
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-dashed border-outline bg-surface py-8 px-4 flex flex-col items-center gap-3">
                <div className="font-mono text-xs uppercase text-outline text-center space-y-2">
                    <div>(C) 2025 ALPHA DESK SYSTEMS. ALL RIGHTS RESERVED.</div>
                </div>
                <div className="font-headline font-bold text-primary text-xs tracking-widest">ALPHA_DESK_CORP</div>
            </footer>

        </div>
    )
}
