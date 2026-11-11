"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  CalendarCheck2,
  CheckCircle2,
  Clock,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { CANDIDATES, ELECTION_INFO } from "@/constants/electionData";

const VOTING_START_MS = new Date("2026-11-24T09:00:00+09:00").getTime();
const VOTING_END_MS = new Date("2026-11-26T18:00:00+09:00").getTime();

interface CountdownState {
  phase: "before" | "ongoing" | "ended";
  dDayLabel: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function computeCountdown(nowMs: number): CountdownState {
  if (nowMs < VOTING_START_MS) {
    const diff = Math.max(0, VOTING_START_MS - nowMs);
    const totalSeconds = Math.floor(diff / 1000);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    // Calendar D-Day calculation in KST
    const kstOffset = 9 * 60 * 60 * 1000;
    const nowKstDay = Math.floor((nowMs + kstOffset) / 86400000);
    const startKstDay = Math.floor((VOTING_START_MS + kstOffset) / 86400000);
    const calDiff = Math.max(0, startKstDay - nowKstDay);

    return {
      phase: "before",
      dDayLabel: calDiff === 0 ? "D-DAY" : `D-${calDiff}`,
      days: String(d).padStart(2, "0"),
      hours: String(h).padStart(2, "0"),
      minutes: String(m).padStart(2, "0"),
      seconds: String(s).padStart(2, "0"),
    };
  }

  if (nowMs <= VOTING_END_MS) {
    const diff = Math.max(0, VOTING_END_MS - nowMs);
    const totalSeconds = Math.floor(diff / 1000);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return {
      phase: "ongoing",
      dDayLabel: "투표 진행중",
      days: String(d).padStart(2, "0"),
      hours: String(h).padStart(2, "0"),
      minutes: String(m).padStart(2, "0"),
      seconds: String(s).padStart(2, "0"),
    };
  }

  return {
    phase: "ended",
    dDayLabel: "투표 마감",
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  };
}

function splitYearAndCareer(career: string): { year: string | null; text: string } {
  const match = career.match(/^(\d{4}년)\s+(.*)$/);
  if (match) {
    return { year: match[1], text: match[2] };
  }
  return { year: null, text: career };
}

export function CandidatesSection() {
  const [imageError, setImageError] = useState(false);
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    setNowMs(Date.now());
    const timer = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown: CountdownState =
    nowMs !== null
      ? computeCountdown(nowMs)
      : {
          phase: "before",
          dDayLabel: "D-DAY",
          days: "--",
          hours: "--",
          minutes: "--",
          seconds: "--",
        };

  const electionInfoExt = ELECTION_INFO as typeof ELECTION_INFO & {
    candidateNumber?: string;
    votingDate?: string;
  };
  const votingDateText =
    electionInfoExt.votingDate || "투표일 : 11월 24일(화) - 11월 26일(목)";

  const renderPhotoCard = () => (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-[#8FD0D4] shadow-[0_20px_45px_rgba(116,195,201,0.28)]">
      {/* Top Poster-Style Sky-Blue Header Strip */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-[#74C3C9] to-[#8FD0D4] border-b border-white/50 flex items-center justify-between gap-2 text-white">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-white/95">
            2027년도 학생회 총선거 글로벌정경대학 기호 1번
          </p>
          <h3 className="text-sm sm:text-base font-black text-white mt-0.5 truncate drop-shadow-sm">
            글로벌정경대학 선거운동본부{" "}
            <span className="underline decoration-white/60 underline-offset-4">
              {ELECTION_INFO.teamFullTitle}
            </span>
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-white text-[#358C94] font-black text-xs sm:text-sm shrink-0 shadow-sm">
          기호 1번
        </span>
      </div>

      {!imageError ? (
        <div className="relative w-full bg-gradient-to-b from-[#BCE6E9]/45 via-[#EAF6F7] to-white pt-3 sm:pt-5 overflow-hidden">
          {/* Soft Sky-Blue Halo Backdrop behind Cutout Candidates */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#8FD0D4]/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-4 inset-x-0 text-center text-6xl sm:text-7xl font-black text-[#74C3C9]/20 tracking-widest"
          >
            {ELECTION_INFO.teamHanja}
          </div>

          <img
            src="/images/candidates-hero.png"
            alt="2027년도 글로벌정경대학 학생회 총선거 기호 1번 비상 부후보 손정현(좌), 정후보 최우헌(우) 공식 프로필 사진"
            onError={() => setImageError(true)}
            className="relative z-10 w-full h-auto object-contain block opacity-100"
          />

          {/* Bottom Name Badges Bar Matching Poster Sky-Blue Style (Left: 부후보 손정현, Right: 정후보 최우헌) */}
          <div className="relative z-20 bg-gradient-to-r from-[#74C3C9] via-[#8FD0D4] to-[#74C3C9] border-t border-white/50 p-3 sm:p-4 text-white">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Left in Photo: 부후보 손정현 */}
              <div className="rounded-xl bg-white/95 border border-white px-3 py-2 sm:px-3.5 sm:py-2.5 text-center shadow-sm">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#58B4BC] text-white text-[10px] sm:text-[11px] font-extrabold mb-0.5">
                  <span>부후보</span>
                </div>
                <p className="text-sm sm:text-base font-black text-[#111827] tracking-tight">
                  손정현
                </p>
                <p className="text-[11px] sm:text-xs font-bold text-[#358C94] break-keep">
                  정치외교학과 24
                </p>
              </div>

              {/* Right in Photo: 정후보 최우헌 */}
              <div className="rounded-xl bg-white/95 border border-white px-3 py-2 sm:px-3.5 sm:py-2.5 text-center shadow-sm">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#58B4BC] text-white text-[10px] sm:text-[11px] font-extrabold mb-0.5">
                  <span>정후보</span>
                </div>
                <p className="text-sm sm:text-base font-black text-[#111827] tracking-tight">
                  최우헌
                </p>
                <p className="text-[11px] sm:text-xs font-bold text-[#358C94] break-keep">
                  경제학과 21
                </p>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/35 flex items-center justify-between gap-2 text-[11px] sm:text-xs text-white">
              <span className="inline-flex items-center gap-1.5 font-extrabold">
                <CalendarCheck2 className="w-3.5 h-3.5 text-white shrink-0" />
                <span>{votingDateText}</span>
              </span>
              <span className="font-black text-white hidden sm:inline">
                {ELECTION_INFO.teamFullTitle}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback Card if /images/candidates-hero.png fails */
        <div className="p-4 sm:p-7 flex flex-col justify-between min-h-[340px] sm:min-h-[460px] bg-[#F2F9FA] relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 my-4 sm:my-6">
            <div className="rounded-2xl bg-white border-2 border-[#BCE6E9] p-3 sm:p-4 flex flex-col items-center text-center shadow-sm">
              <span className="px-2.5 py-0.5 rounded-full bg-[#58B4BC] text-white text-[10px] sm:text-[11px] font-bold mb-1">
                부후보
              </span>
              <p className="text-sm sm:text-lg font-extrabold text-[#111827]">손정현</p>
              <p className="text-[11px] sm:text-xs text-[#358C94] font-bold mt-0.5">
                정치외교학과 24학번
              </p>
            </div>
            <div className="rounded-2xl bg-white border-2 border-[#BCE6E9] p-3 sm:p-4 flex flex-col items-center text-center shadow-sm">
              <span className="px-2.5 py-0.5 rounded-full bg-[#58B4BC] text-white text-[10px] sm:text-[11px] font-bold mb-1">
                정후보
              </span>
              <p className="text-sm sm:text-lg font-extrabold text-[#111827]">최우헌</p>
              <p className="text-[11px] sm:text-xs text-[#358C94] font-bold mt-0.5">
                경제학과 21학번
              </p>
            </div>
          </div>
          <div className="relative z-10 rounded-xl bg-[#74C3C9] p-3 text-center text-xs text-white font-bold">
            <UserCheck className="w-4 h-4 inline mr-1.5 text-white" />
            {votingDateText}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section
      id="candidates"
      className="relative overflow-hidden bg-gradient-to-b from-[#8FD0D4]/40 via-[#EAF6F7] to-white text-[#111827] py-10 px-4 sm:py-16 sm:px-6 lg:py-24 scroll-mt-14 sm:scroll-mt-16"
    >
      {/* Soft Sky-Blue Atmospheric Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-28 -left-28 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#8FD0D4]/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1/4 right-0 w-72 sm:w-[28rem] h-72 sm:h-[28rem] rounded-full bg-[#BCE6E9]/50 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column: Poster Sky-Blue Banner Header, Live Countdown, Mobile Photo Card, & Candidate Bios */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-4 text-center sm:text-left"
            >
              {/* Top Rounded Sky-Blue Badges Matching Poster Top-Left Header */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-[#58B4BC] text-white text-[11px] sm:text-xs font-extrabold tracking-tight shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="break-keep">
                    2027년도 학생회 총선거 글로벌정경대학 기호 1번
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border-2 border-[#8FD0D4] text-[#358C94] text-[11px] sm:text-xs font-extrabold tracking-tight shadow-sm">
                  <CalendarCheck2 className="w-3.5 h-3.5 text-[#58B4BC] shrink-0" />
                  <span>{votingDateText}</span>
                </div>
              </div>

              {/* Main Title */}
              <div className="space-y-1.5 sm:space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111827] leading-tight">
                  {ELECTION_INFO.teamFullTitle}
                </h1>
                <p className="text-base sm:text-xl lg:text-2xl font-extrabold text-[#358C94] tracking-tight break-keep">
                  &ldquo;{ELECTION_INFO.mainSlogan}&rdquo;
                </p>
              </div>

              {/* Live Voting D-Day Countdown Card (Crisp White & Poster Sky Blue) */}
              <div className="pt-1">
                <div className="rounded-2xl bg-white border-2 border-[#8FD0D4] p-3.5 sm:p-5 shadow-[0_12px_28px_rgba(116,195,201,0.2)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#BCE6E9]">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#58B4BC] text-white text-xs font-black tracking-tight shadow-sm">
                        <Clock className="w-3 h-3 text-white" />
                        <span>{countdown.dDayLabel}</span>
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#111827] tracking-tight break-keep">
                        {countdown.phase === "before" &&
                          "🗳️ 투표 시작까지 남은 시간"}
                        {countdown.phase === "ongoing" &&
                          "🗳️ 현재 글로벌정경대학 학생회 총선거 투표 진행 중입니다!"}
                        {countdown.phase === "ended" &&
                          "🗳️ 2027 글로벌정경대학 학생회 총선거 투표가 종료되었습니다"}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-[#358C94]">
                      11월 24일(화) 09:00 ~ 11월 26일(목) 18:00
                    </span>
                  </div>

                  {/* 4 Sky-Blue Digital Cards */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {[
                      { value: countdown.days, label: "일 (DAYS)" },
                      { value: countdown.hours, label: "시간 (HRS)" },
                      { value: countdown.minutes, label: "분 (MIN)" },
                      { value: countdown.seconds, label: "초 (SEC)" },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="rounded-xl bg-gradient-to-b from-[#74C3C9] to-[#58B4BC] border border-[#8FD0D4] py-2.5 px-2 sm:py-3 sm:px-3 text-center text-white shadow-sm"
                      >
                        <div className="text-xl sm:text-3xl font-black text-white tabular-nums tracking-tight leading-none drop-shadow-sm">
                          {unit.value}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-extrabold text-white/95 mt-1 tracking-wider">
                          {unit.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile-Only Candidate Profile Card right after Hero Title & Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="block lg:hidden"
            >
              {renderPhotoCard()}
            </motion.div>

            {/* Candidate Bio & Full Career Cards Matching Poster's Sky-Blue Role Bar & White Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
              {CANDIDATES.map((candidate, index) => (
                <motion.div
                  key={candidate.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 * (index + 1),
                    ease: "easeOut",
                  }}
                  className="rounded-2xl bg-white border-2 border-[#BCE6E9] overflow-hidden shadow-[0_10px_28px_rgba(116,195,201,0.18)] hover:border-[#74C3C9] transition-colors"
                >
                  {/* Candidate Header Bar Matching Poster Sky-Blue Bar */}
                  <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#74C3C9] to-[#8FD0D4] text-white flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#358C94] text-[11px] sm:text-xs font-extrabold mb-1 shadow-sm">
                        <Award className="w-3.5 h-3.5 text-[#58B4BC]" />
                        <span>기호 1번 · {candidate.role}</span>
                      </div>
                      <h2 className="text-base sm:text-xl font-black text-white tracking-tight break-keep drop-shadow-sm">
                        {candidate.fullTitle}
                      </h2>
                    </div>
                  </div>

                  {/* Full Career History List with Sky-Blue Year Pills */}
                  <ul className="p-4 sm:p-5 space-y-2 sm:space-y-2.5 bg-white">
                    {candidate.careers.map((career, cIdx) => {
                      const { year, text } = splitYearAndCareer(career);
                      return (
                        <li
                          key={cIdx}
                          className="flex items-start gap-2 text-[13px] sm:text-sm text-[#1E293B] leading-snug sm:leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#58B4BC] shrink-0 mt-0.5" />
                          {year ? (
                            <div className="flex items-baseline gap-1.5 min-w-0">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-[#EAF6F7] border border-[#BCE6E9] text-[#358C94] text-[11px] font-extrabold shrink-0">
                                {year}
                              </span>
                              <span className="break-keep font-semibold text-[#111827]">
                                {text}
                              </span>
                            </div>
                          ) : (
                            <span className="break-keep font-semibold text-[#111827]">
                              {text}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column (Desktop Only): Candidate Photo Area */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block lg:col-span-5 w-full lg:sticky lg:top-24"
          >
            {renderPhotoCard()}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CandidatesSection;
