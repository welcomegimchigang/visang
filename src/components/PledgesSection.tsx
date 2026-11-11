"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, FileText, X } from "lucide-react";
import { ELECTION_INFO, PLEDGE_CATEGORIES } from "@/constants/electionData";

export function PledgesSection() {
  const [activeTabId, setActiveTabId] = useState<string>(
    PLEDGE_CATEGORIES[0]?.id ?? "culture"
  );
  const [posterError, setPosterError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeCategory =
    PLEDGE_CATEGORIES.find((cat) => cat.id === activeTabId) ??
    PLEDGE_CATEGORIES[0];

  const totalPledgeCount = PLEDGE_CATEGORIES.reduce(
    (sum, cat) => sum + cat.pledges.length,
    0
  );

  return (
    <section
      id="pledges"
      className="bg-[#F2F9FA] text-[#111827] py-12 px-4 sm:py-20 sm:px-6 lg:py-28 scroll-mt-14 sm:scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border-2 border-[#8FD0D4] text-[#358C94] text-xs font-extrabold shadow-sm">
            <span>글로벌정경대학 기호 1번 {ELECTION_INFO.teamFullTitle}</span>
            <span>·</span>
            <span>총 {totalPledgeCount}개 핵심 공약</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#111827]">
            ✦ 부문별 핵심 공약 ✦
          </h2>
          <p className="text-xs sm:text-base text-[#4B5563] font-medium break-keep">
            카테고리 탭을 클릭하여 {PLEDGE_CATEGORIES.length}대 부문 {totalPledgeCount}개 공약을 확인해보세요
          </p>
        </motion.div>

        {/* 4 Category Tab Buttons: Balanced 2x2 Grid on Mobile, Flex Row on Tablet/Desktop */}
        <div
          role="tablist"
          aria-label="공약 카테고리"
          className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 mb-6 sm:mb-10"
        >
          {PLEDGE_CATEGORIES.map((category) => {
            const isActive = category.id === activeCategory.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabId(category.id)}
                className={`min-h-[46px] px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-base font-extrabold transition-all duration-200 focus:outline-none active:scale-[0.98] flex items-center justify-center gap-1.5 ${
                  isActive
                    ? "bg-[#58B4BC] text-white shadow-md sm:scale-[1.02] border-2 border-[#4AA8B0]"
                    : "bg-white text-slate-600 border-2 border-[#BCE6E9] hover:border-[#74C3C9] hover:text-[#358C94]"
                }`}
              >
                <span className="truncate">{category.tabLabel}</span>
                <span
                  className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-black shrink-0 ${
                    isActive
                      ? "bg-white text-[#358C94]"
                      : "bg-[#EAF6F7] text-[#358C94]"
                  }`}
                >
                  {category.pledges.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom White Container Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 shadow-[0_16px_40px_rgba(116,195,201,0.18)] border-2 border-[#BCE6E9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
            {/* Left (7 cols): Static Pledge Item List */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Selected Category Header */}
                  <div className="border-b-2 border-[#EAF6F7] pb-3.5 sm:pb-4 flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#358C94] bg-[#EAF6F7] border border-[#BCE6E9] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-1.5 sm:mb-2">
                        핵심 공약 부문
                      </span>
                      <h3 className="text-xl sm:text-3xl font-black text-[#111827] tracking-tight">
                        {activeCategory.title}
                      </h3>
                      <p className="text-xs sm:text-base text-[#358C94] font-bold mt-0.5 sm:mt-1 break-keep">
                        {activeCategory.slogan}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#58B4BC] text-white text-[11px] sm:text-xs font-extrabold shrink-0 shadow-sm">
                      총 {activeCategory.pledges.length}개 공약
                    </span>
                  </div>

                  {/* Static Pledge List (NO accordion, NO chevron icons, NO sub-descriptions) */}
                  <ul className="grid grid-cols-1 gap-2.5 sm:gap-3">
                    {activeCategory.pledges.map((pledgeTitle, idx) => {
                      const badgeNumber = String(idx + 1).padStart(2, "0");
                      return (
                        <li
                          key={`${activeCategory.id}-${idx}`}
                          className="flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F2F9FA] border border-[#BCE6E9] hover:bg-[#EAF6F7] hover:border-[#74C3C9] transition-colors"
                        >
                          <span className="bg-[#58B4BC] text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-black shrink-0 shadow-sm">
                            {badgeNumber}
                          </span>
                          <span className="text-[#111827] font-bold text-[14px] sm:text-base leading-snug tracking-tight break-keep">
                            {pledgeTitle}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right (5 cols): Official A2 Election Poster Preview + Category Summary */}
            <div
              id="poster"
              className="lg:col-span-5 w-full lg:sticky lg:top-24 scroll-mt-20"
            >
              <div className="rounded-2xl overflow-hidden border-2 border-[#8FD0D4] bg-white text-[#111827] shadow-[0_14px_35px_rgba(116,195,201,0.22)]">
                {/* Official Poster Image Preview (Immediately visible with opacity-100!) */}
                {!posterError && (
                  <div className="relative group bg-[#EAF6F7] border-b-2 border-[#BCE6E9]">
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      aria-label="공식 선거 포스터 크게 보기"
                      className="relative block w-full text-left focus:outline-none overflow-hidden"
                    >
                      <img
                        src="/images/pledge-poster.jpg"
                        alt="2027년도 글로벌정경대학 학생회 총선거 기호 1번 비상 공식 A2 선거 포스터"
                        onError={() => setPosterError(true)}
                        className="w-full h-auto object-contain block opacity-100 group-hover:scale-[1.015] transition-transform duration-300"
                      />
                      <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#58B4BC]/95 backdrop-blur-md border border-white/60 text-xs font-extrabold text-white shadow-lg">
                        <Expand className="w-3.5 h-3.5" />
                        <span>포스터 크게 보기</span>
                      </div>
                    </button>

                    {/* Action Bar below Poster Image */}
                    <div className="px-4 py-2.5 bg-gradient-to-r from-[#74C3C9] to-[#8FD0D4] flex items-center justify-between gap-2 text-xs text-white">
                      <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        className="inline-flex items-center gap-1.5 font-extrabold text-white hover:underline transition-colors"
                      >
                        <Expand className="w-3.5 h-3.5 text-white" />
                        <span>고화질 포스터 확대</span>
                      </button>
                      <a
                        href="/poster-2027.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#358C94] hover:bg-[#F2F9FA] font-extrabold shadow-sm transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#58B4BC]" />
                        <span>포스터 원본 PDF</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Sky-Blue & White Overall Pledge Summary Card */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 bg-gradient-to-b from-[#EAF6F7] to-white relative overflow-hidden">
                  {/* Subtle Watermark */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -right-3 -bottom-4 text-7xl sm:text-8xl font-black text-[#74C3C9]/15 leading-none"
                  >
                    {ELECTION_INFO.teamHanja}
                  </div>

                  {/* Poster Header */}
                  <div className="relative z-10 border-b border-[#BCE6E9] pb-3.5 sm:pb-4">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#58B4BC] text-white text-[10px] sm:text-[11px] font-extrabold">
                        {ELECTION_INFO.collegeBadge} 기호 1번
                      </span>
                      <span className="text-[11px] sm:text-xs font-extrabold text-[#358C94]">
                        {PLEDGE_CATEGORIES.length}대 부문 · {totalPledgeCount}개 공약
                      </span>
                    </div>
                    <h4 className="text-base sm:text-xl font-black text-[#111827] tracking-tight break-keep">
                      2027 글로벌정경대학 {ELECTION_INFO.teamHanja} 핵심 공약 한눈에 보기
                    </h4>
                    <p className="text-xs text-[#358C94] font-bold mt-1">
                      &ldquo;{ELECTION_INFO.mainSlogan}&rdquo;
                    </p>
                  </div>

                  {/* 4 Categories Summary Grid inside the Poster */}
                  <div className="relative z-10 space-y-2.5 sm:space-y-3">
                    {PLEDGE_CATEGORIES.map((category) => {
                      const isCurrent = category.id === activeCategory.id;
                      return (
                        <div
                          key={category.id}
                          onClick={() => setActiveTabId(category.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setActiveTabId(category.id);
                            }
                          }}
                          className={`rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer border-2 active:scale-[0.99] ${
                            isCurrent
                              ? "bg-[#74C3C9] text-white border-[#58B4BC] shadow-md"
                              : "bg-white text-[#111827] border-[#BCE6E9] hover:border-[#8FD0D4]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`text-xs sm:text-sm font-black ${
                                isCurrent ? "text-white" : "text-[#358C94]"
                              }`}
                            >
                              {category.title}
                            </span>
                            <span
                              className={`text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                                isCurrent
                                  ? "bg-white text-[#358C94]"
                                  : "bg-[#EAF6F7] text-[#358C94]"
                              }`}
                            >
                              {category.pledges.length}개 공약
                            </span>
                          </div>
                          <p
                            className={`text-[11px] sm:text-xs leading-relaxed line-clamp-2 ${
                              isCurrent ? "text-white/95 font-semibold" : "text-[#4B5563]"
                            }`}
                          >
                            {category.pledges.join(" · ")}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Poster Footer */}
                  <div className="relative z-10 pt-2 border-t border-[#BCE6E9] flex items-center justify-between text-[11px] text-[#4B5563] font-semibold">
                    <span>투표일 : 11월 24일(화) - 11월 26일(목)</span>
                    <span className="font-extrabold text-[#358C94]">
                      기호 1번 {ELECTION_INFO.teamFullTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Poster Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md p-3 sm:p-6 flex flex-col items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white border-2 border-[#8FD0D4] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="px-4 py-3 bg-gradient-to-r from-[#74C3C9] to-[#8FD0D4] border-b border-white/40 flex items-center justify-between gap-2 text-white">
                <span className="text-xs sm:text-sm font-black truncate">
                  2027년도 글로벌정경대학 기호 1번 飛上 (비상) 공식 선거 포스터
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="/poster-2027.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#358C94] hover:bg-[#F2F9FA] text-xs font-extrabold shadow-sm transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#58B4BC]" />
                    <span>포스터 원본 PDF</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(false)}
                    aria-label="포스터 닫기"
                    className="p-1.5 rounded-full bg-white/25 hover:bg-white/40 text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-auto p-2 sm:p-4 flex justify-center bg-[#F2F9FA]">
                <img
                  src="/images/pledge-poster.jpg"
                  alt="2027년도 글로벌정경대학 학생회 총선거 기호 1번 비상 공식 선거 포스터 확대 이미지"
                  className="max-w-full h-auto object-contain block opacity-100 rounded-lg shadow-md"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default PledgesSection;
