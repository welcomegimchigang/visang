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
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#163B34] via-[#0D2622] to-[#0D2622] border border-[#96D1CD]/45 shadow-[0_20px_50px_rgba(13,38,34,0.55)]">
      {/* Top Decorative Celadon Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#357F72] via-[#96D1CD] to-[#99DED0]" />

      {/* Top Header Strip inside Photo Card */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 bg-[#0D2622]/90 border-b border-[#96D1CD]/20 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-[#96D1CD]">
            2027년도 학생회 총선거 글로벌정경대학 기호 1번
          </p>
          <h3 className="text-sm sm:text-base font-black text-white mt-0.5 truncate">
            글로벌정경대학 선거운동본부{" "}
            <span className="text-[#99DED0]">{ELECTION_INFO.teamFullTitle}</span>
          </h3>
        </div>
        <span className="px-2.5 py-1 rounded-xl bg-[#357F72] border border-[#96D1CD]/45 text-white font-black text-xs sm:text-sm shrink-0 shadow-sm">
          기호 1번
        </span>
      </div>

      {!imageError ? (
        <div className="relative w-full bg-gradient-to-b from-[#96D1CD]/25 via-[#357F72]/20 to-[#0D2622] pt-3 sm:pt-5 overflow-hidden">
          {/* Subtle Celadon Glow Backdrop behind Cutout Candidates */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#96D1CD]/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-4 inset-x-0 text-center text-6xl sm:text-7xl font-black text-white/10 tracking-widest"
          >
            {ELECTION_INFO.teamHanja}
          </div>

          <img
            src="/images/candidates-hero.png"
            alt="2027년도 글로벌정경대학 학생회 총선거 기호 1번 비상 부후보 손정현(좌), 정후보 최우헌(우) 공식 프로필 사진"
            onError={() => setImageError(true)}
            className="relative z-10 w-full h-auto object-contain block opacity-100"
          />

          {/* Bottom Name Badges Overlay Matching Cutout Photo Positions (Left: 부후보 손정현, Right: 정후보 최우헌) */}
          <div className="relative z-20 bg-gradient-to-t from-[#0D2622] via-[#0D2622]/95 to-[#0D2622]/80 border-t border-[#96D1CD]/25 p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Left in Photo: 부후보 손정현 */}
              <div className="rounded-xl bg-[#163B34]/90 border border-[#96D1CD]/35 px-3 py-2 sm:px-3.5 sm:py-2.5 text-center shadow-sm">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#357F72] text-[#99DED0] text-[10px] sm:text-[11px] font-extrabold mb-0.5">
                  <span>부후보</span>
                </div>
                <p className="text-sm sm:text-base font-black text-white tracking-tight">
                  손정현
                </p>
                <p className="text-[11px] sm:text-xs font-medium text-[#96D1CD] break-keep">
                  정치외교학과 24
                </p>
              </div>

              {/* Right in Photo: 정후보 최우헌 */}
              <div className="rounded-xl bg-[#163B34]/90 border border-[#96D1CD]/35 px-3 py-2 sm:px-3.5 sm:py-2.5 text-center shadow-sm">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#357F72] text-[#99DED0] text-[10px] sm:text-[11px] font-extrabold mb-0.5">
                  <span>정후보</span>
                </div>
                <p className="text-sm sm:text-base font-black text-white tracking-tight">
                  최우헌
                </p>
                <p className="text-[11px] sm:text-xs font-medium text-[#96D1CD] break-keep">
                  경제학과 21
                </p>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-[11px] sm:text-xs text-[#99DED0]">
              <span className="inline-flex items-center gap-1.5 font-bold">
                <CalendarCheck2 className="w-3.5 h-3.5 text-[#96D1CD] shrink-0" />
                <span>{votingDateText}</span>
              </span>
              <span className="font-extrabold text-white hidden sm:inline">
                {ELECTION_INFO.teamFullTitle}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback Silhouette Card if /images/candidates-hero.png fails */
        <div className="p-4 sm:p-7 flex flex-col justify-between min-h-[340px] sm:min-h-[460px] relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 my-4 sm:my-6">
            <div className="rounded-2xl bg-gradient-to-b from-[#357F72]/40 to-[#0D2622]/85 border border-[#96D1CD]/30 p-3 sm:p-4 flex flex-col items-center text-center">
              <span className="px-2 py-0.5 rounded-full bg-[#357F72] text-[#99DED0] text-[10px] sm:text-[11px] font-bold mb-1">
                부후보
              </span>
              <p className="text-sm sm:text-lg font-extrabold text-white">손정현</p>
              <p className="text-[11px] sm:text-xs text-[#99DED0]/90 font-medium mt-0.5">
                정치외교학과 24학번
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-b from-[#357F72]/40 to-[#0D2622]/85 border border-[#96D1CD]/30 p-3 sm:p-4 flex flex-col items-center text-center">
              <span className="px-2 py-0.5 rounded-full bg-[#357F72] text-[#99DED0] text-[10px] sm:text-[11px] font-bold mb-1">
                정후보
              </span>
              <p className="text-sm sm:text-lg font-extrabold text-white">최우헌</p>
              <p className="text-[11px] sm:text-xs text-[#99DED0]/90 font-medium mt-0.5">
                경제학과 21학번
              </p>
            </div>
          </div>
          <div className="relative z-10 rounded-xl bg-[#0D2622]/85 border border-[#76C7B7]/15 p-3 text-center text-xs text-[#99DED0] font-semibold">
            <UserCheck className="w-4 h-4 inline mr-1.5 text-[#76C7B7]" />
            {votingDateText}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section
      id="candidates"
      className="relative overflow-hidden bg-gradient-to-br from-[#0D2622] via-[#163B34] to-[#357F72] text-white py-10 px-4 sm:py-16 sm:px-6 lg:py-24 scroll-mt-14 sm:scroll-mt-16"
    >
      {/* Subtle Celadon Jade Atmospheric Light Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#96D1CD]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1/3 right-0 w-72 sm:w-[30rem] h-72 sm:h-[30rem] rounded-full bg-[#99DED0]/12 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column: Election Title, Live D-Day Countdown, Mobile Photo Card, & Candidate Bios */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-4 text-center sm:text-left"
            >
              {/* Top Rounded Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#357F72]/70 border border-[#96D1CD]/45 text-[#EDF5F2] text-[11px] sm:text-xs font-bold tracking-tight shadow-sm backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#99DED0] shrink-0" />
                  <span className="break-keep">
                    2027년도 학생회 총선거 글로벌정경대학 기호 1번
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0D2622]/75 border border-[#96D1CD]/35 text-[#99DED0] text-[11px] sm:text-xs font-bold tracking-tight">
                  <CalendarCheck2 className="w-3.5 h-3.5 text-[#96D1CD] shrink-0" />
                  <span>{votingDateText}</span>
                </div>
              </div>

              {/* Main Title */}
              <div className="space-y-1.5 sm:space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  {ELECTION_INFO.teamFullTitle}
                </h1>
                <p className="text-base sm:text-xl lg:text-2xl font-bold text-[#99DED0] tracking-tight break-keep">
                  &ldquo;{ELECTION_INFO.mainSlogan}&rdquo;
                </p>
              </div>

              {/* Live Voting D-Day Countdown Card */}
              <div className="pt-1">
                <div className="rounded-2xl bg-[#0D2622]/70 backdrop-blur-md border border-[#96D1CD]/40 p-3.5 sm:p-5 shadow-[0_12px_30px_rgba(13,38,34,0.4)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#96D1CD]/20">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#357F72] border border-[#99DED0]/50 text-white text-xs font-black tracking-tight shadow-sm">
                        <Clock className="w-3 h-3 text-[#99DED0]" />
                        <span>{countdown.dDayLabel}</span>
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#EDF5F2] tracking-tight break-keep">
                        {countdown.phase === "before" &&
                          "🗳️ 투표 시작까지 남은 시간"}
                        {countdown.phase === "ongoing" &&
                          "🗳️ 현재 글로벌정경대학 학생회 총선거 투표 진행 중입니다!"}
                        {countdown.phase === "ended" &&
                          "🗳️ 2027 글로벌정경대학 학생회 총선거 투표가 종료되었습니다"}
                      </span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-[#96D1CD]">
                      11월 24일(화) 09:00 ~ 11월 26일(목) 18:00
                    </span>
                  </div>

                  {/* 4 Digital Flip / Glass Cards */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {[
                      { value: countdown.days, label: "일 (DAYS)" },
                      { value: countdown.hours, label: "시간 (HRS)" },
                      { value: countdown.minutes, label: "분 (MIN)" },
                      { value: countdown.seconds, label: "초 (SEC)" },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="rounded-xl bg-gradient-to-b from-[#163B34]/95 to-[#0D2622]/95 border border-[#96D1CD]/35 py-2.5 px-2 sm:py-3 sm:px-3 text-center shadow-inner"
                      >
                        <div className="text-xl sm:text-3xl font-black text-white tabular-nums tracking-tight leading-none">
                          {unit.value}
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-bold text-[#96D1CD] mt-1 tracking-wider">
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

            {/* Candidate Bio & Full Career Cards */}
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
                  className="rounded-2xl bg-[#0D2622]/65 backdrop-blur-md border border-[#96D1CD]/35 p-4 sm:p-6 shadow-[0_12px_32px_rgba(13,38,34,0.35)] hover:border-[#99DED0]/60 transition-colors"
                >
                  {/* Candidate Header */}
                  <div className="pb-3.5 mb-3.5 border-b border-[#76C7B7]/15 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#357F72] text-[#EDF5F2] text-[11px] sm:text-xs font-bold mb-1.5 border border-[#99DED0]/25">
                        <Award className="w-3.5 h-3.5 text-[#99DED0]" />
                        <span>기호 1번 · {candidate.role}</span>
                      </div>
                      <h2 className="text-base sm:text-xl font-extrabold text-white tracking-tight break-keep">
                        {candidate.fullTitle}
                      </h2>
                    </div>
                  </div>

                  {/* Full Career History List with clear Year Pills */}
                  <ul className="space-y-2 sm:space-y-2.5">
                    {candidate.careers.map((career, cIdx) => {
                      const { year, text } = splitYearAndCareer(career);
                      return (
                        <li
                          key={cIdx}
                          className="flex items-start gap-2 text-[13px] sm:text-sm text-[#EDF5F2]/95 leading-snug sm:leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#76C7B7] shrink-0 mt-0.5" />
                          {year ? (
                            <div className="flex items-baseline gap-1.5 min-w-0">
                              <span className="inline-block px-1.5 py-0.5 rounded bg-[#163B34] border border-[#76C7B7]/30 text-[#99DED0] text-[11px] font-bold shrink-0">
                                {year}
                              </span>
                              <span className="break-keep font-medium text-[#EDF5F2]">
                                {text}
                              </span>
                            </div>
                          ) : (
                            <span className="break-keep font-medium">{text}</span>
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
