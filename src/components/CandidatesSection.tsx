"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Sparkles, UserCheck } from "lucide-react";
import { CANDIDATES, ELECTION_INFO } from "@/constants/electionData";

function splitYearAndCareer(career: string): { year: string | null; text: string } {
  const match = career.match(/^(\d{4}년)\s+(.*)$/);
  if (match) {
    return { year: match[1], text: match[2] };
  }
  return { year: null, text: career };
}

export function CandidatesSection() {
  const [imageError, setImageError] = useState(false);

  const renderPhotoCard = () => (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#163B34]/90 via-[#0D2622]/95 to-[#0D2622] border border-[#76C7B7]/35 shadow-[0_16px_40px_rgba(13,38,34,0.5)]">
      {/* Top Decorative Celadon Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#2E7568] via-[#5BB5A2] to-[#99DED0]" />

      {!imageError ? (
        <div className="relative w-full">
          <img
            src="/images/candidates-hero.png"
            alt="2027학년도 글로벌정경대학 학생회 선거운동본부 비상 정후보 최우헌, 부후보 손정현 프로필 사진"
            onError={() => setImageError(true)}
            className="w-full h-auto object-cover block"
          />
        </div>
      ) : (
        /* Sophisticated Goryeo Celadon Silhouette Placeholder Card */
        <div className="p-4 sm:p-7 flex flex-col justify-between min-h-[340px] sm:min-h-[480px] relative overflow-hidden">
          {/* Subtle Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-3 top-6 text-7xl sm:text-8xl font-black text-white/5 tracking-widest"
          >
            {ELECTION_INFO.teamHanja}
          </div>

          {/* Top Emblem */}
          <div className="relative z-10 flex items-center justify-between gap-2 border-b border-[#76C7B7]/15 pb-3.5">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#99DED0]">
                OFFICIAL CANDIDATES PROFILE
              </p>
              <h3 className="text-sm sm:text-lg font-extrabold text-white mt-0.5 break-keep">
                2027 글로벌정경대학 선거운동본부{" "}
                <span className="text-[#99DED0]">{ELECTION_INFO.teamHanja}</span>
              </h3>
            </div>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#357F72]/55 border border-[#99DED0]/40 flex items-center justify-center text-white font-black text-xs sm:text-sm shrink-0">
              {ELECTION_INFO.teamHanja}
            </div>
          </div>

          {/* Dual Candidate Silhouette Cards */}
          <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 my-4 sm:my-6">
            {CANDIDATES.map((candidate) => (
              <div
                key={candidate.name}
                className="group rounded-2xl bg-gradient-to-b from-[#357F72]/40 to-[#0D2622]/85 border border-[#76C7B7]/30 p-3 sm:p-4 flex flex-col items-center text-center shadow-inner"
              >
                {/* Stylized Avatar Silhouette */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#163B34] via-[#357F72] to-[#76C7B7]/75 border-2 border-[#99DED0]/55 flex flex-col items-center justify-end overflow-hidden shadow-lg mb-2.5 sm:mb-3 relative">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#EDF5F2]/90 mb-1" />
                  <div className="w-12 h-7 sm:w-16 sm:h-9 rounded-t-full bg-[#EDF5F2]/85" />
                </div>

                <span className="px-2 py-0.5 rounded-full bg-[#357F72] text-[#99DED0] text-[10px] sm:text-[11px] font-bold tracking-tight mb-1 border border-[#99DED0]/25">
                  {candidate.role}
                </span>
                <p className="text-sm sm:text-lg font-extrabold text-white">
                  {candidate.name}
                </p>
                <p className="text-[11px] sm:text-xs text-[#99DED0]/90 font-medium mt-0.5 break-keep">
                  {candidate.department}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Slogan & Preview Indicator */}
          <div className="relative z-10 rounded-xl sm:rounded-2xl bg-[#0D2622]/85 border border-[#76C7B7]/15 p-3 sm:p-4 space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs text-[#99DED0]">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#76C7B7] shrink-0" />
                <span>정후보 최우헌 · 부후보 손정현</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-white/55 font-mono truncate">
                /images/candidates-hero.png
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white/90 text-center pt-1.5 border-t border-white/10">
              &ldquo;{ELECTION_INFO.mainSlogan}&rdquo;
            </p>
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
        className="pointer-events-none select-none absolute -top-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#76C7B7]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-1/3 right-0 w-72 sm:w-[30rem] h-72 sm:h-[30rem] rounded-full bg-[#99DED0]/12 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column: Election Title, Mobile Photo Card, & Candidate Bios */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-3 sm:space-y-4 text-center sm:text-left"
            >
              {/* Top Rounded Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#357F72]/60 border border-[#99DED0]/35 text-[#EDF5F2] text-[11px] sm:text-xs font-semibold tracking-tight shadow-sm backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#99DED0] shrink-0" />
                <span className="break-keep">{ELECTION_INFO.badge}</span>
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
            </motion.div>

            {/* Mobile-Only Candidate Profile Card right after Hero Title */}
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
                  className="rounded-2xl bg-[#0D2622]/60 backdrop-blur-md border border-[#76C7B7]/30 p-4 sm:p-6 shadow-[0_12px_32px_rgba(13,38,34,0.35)] hover:border-[#99DED0]/55 transition-colors"
                >
                  {/* Candidate Header */}
                  <div className="pb-3.5 mb-3.5 border-b border-[#76C7B7]/15 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#357F72] text-[#EDF5F2] text-[11px] sm:text-xs font-bold mb-1.5 border border-[#99DED0]/25">
                        <Award className="w-3.5 h-3.5 text-[#99DED0]" />
                        <span>{candidate.role}</span>
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
