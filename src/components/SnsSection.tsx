"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarCheck2,
  FileText,
  Instagram,
  MessageSquareHeart,
  ExternalLink,
} from "lucide-react";
import {
  ELECTION_INFO,
  FLOATING_PDF,
  SNS_CARDS,
  SnsCard,
} from "@/constants/electionData";

export interface SnsSectionProps {
  onTriggerToast: (message: string) => void;
}

export function SnsSection({ onTriggerToast }: SnsSectionProps) {
  const handleCardClick = (card: SnsCard) => {
    const targetUrl = card.url?.trim() ?? "";
    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } else {
      onTriggerToast(card.toastMessage || "현재 오픈 준비 중입니다.");
    }
  };

  const handleFloatingPdfClick = () => {
    const floatingData = FLOATING_PDF as {
      pdfUrl?: string;
      url?: string;
      toastMessage?: string;
    };
    const targetUrl = (floatingData.pdfUrl ?? floatingData.url ?? "").trim();
    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } else {
      onTriggerToast(
        floatingData.toastMessage || "공약안내서 PDF 준비 중입니다."
      );
    }
  };

  const getCardIcon = (id: string) => {
    switch (id) {
      case "instagram":
        return <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-[#99DED0]" />;
      case "pledge-pdf":
        return <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#99DED0]" />;
      case "anonymous":
      default:
        return <MessageSquareHeart className="w-5 h-5 sm:w-6 sm:h-6 text-[#99DED0]" />;
    }
  };

  return (
    <>
      <section
        id="sns"
        className="relative overflow-hidden bg-[#0D2622] text-white pt-12 sm:pt-20 md:pt-24 pb-28 sm:pb-20 scroll-mt-14 sm:scroll-mt-16 border-t border-[#76C7B7]/15"
      >
        {/* Subtle Celadon Atmospheric Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-0 left-1/2 -translate-x-1/2 w-80 sm:w-[36rem] h-52 sm:h-64 rounded-full bg-[#357F72]/25 blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Title Box */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center justify-center px-5 py-2 sm:px-6 sm:py-2.5 rounded-2xl bg-[#163B34] border border-[#76C7B7]/40 shadow-lg">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-white">
                [{ELECTION_INFO.teamHanja}] SNS &amp; 소통창구
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#99DED0]/90 font-medium mt-2.5 sm:mt-3 break-keep">
              학우 여러분과 언제나 가까이에서 소통하는 기호 1번 {ELECTION_INFO.teamFullTitle}이 되겠습니다
            </p>
          </motion.div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {SNS_CARDS.map((card, index) => (
              <motion.button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(card)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: 0.08 * index,
                  ease: "easeOut",
                }}
                className="group text-left rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#163B34]/90 to-[#0D2622] border border-[#76C7B7]/25 hover:border-[#76C7B7] p-5 sm:p-7 min-h-[48px] flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.28)] hover:shadow-[0_16px_36px_rgba(53,127,114,0.35)] active:scale-[0.99] sm:hover:-translate-y-1 transition-all duration-200 focus:outline-none"
              >
                <div className="flex sm:block items-start gap-3.5 sm:space-y-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#357F72]/50 border border-[#99DED0]/35 flex items-center justify-center group-hover:bg-[#357F72] transition-colors shrink-0">
                    {getCardIcon(card.id)}
                  </div>

                  <div className="space-y-1 sm:space-y-2 min-w-0">
                    <h3 className="text-base sm:text-xl font-extrabold text-white group-hover:text-[#99DED0] transition-colors break-keep">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#EDF5F2]/85 leading-relaxed break-keep">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-[#76C7B7]/15 flex items-center justify-between text-xs sm:text-sm font-bold text-[#99DED0] group-hover:text-white transition-colors">
                  <span>{card.actionText}</span>
                  <ExternalLink className="w-4 h-4 text-[#76C7B7] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Official Election Footer with Voting Period & Election Commission Bar */}
          <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#76C7B7]/15 text-center space-y-3">
            {/* Official Poster Bottom Bar Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-2xl bg-[#163B34]/90 border border-[#96D1CD]/35 text-xs sm:text-sm font-bold text-[#99DED0]">
              <span className="inline-flex items-center gap-1.5 text-white">
                <CalendarCheck2 className="w-4 h-4 text-[#96D1CD] shrink-0" />
                <span>투표일 : 11월 24일(화) - 11월 26일(목)</span>
              </span>
              <span className="text-[#96D1CD]/40 hidden sm:inline">|</span>
              <span className="text-[#99DED0]">
                인천대학교 학생회 총선거 중앙선거관리위원회
              </span>
            </div>

            <div className="space-y-1 pt-1">
              <p className="text-xs sm:text-sm font-bold text-white/90 break-keep">
                2027년도 인천대학교 학생회 총선거 글로벌정경대학 기호 1번{" "}
                <span className="text-[#99DED0]">{ELECTION_INFO.teamFullTitle}</span>
              </p>
              <p className="text-[11px] sm:text-xs text-[#EDF5F2]/65 break-keep">
                정후보 경제학과 21학번 최우헌 · 부후보 정치외교학과 24학번 손정현
              </p>
              <p className="text-[10px] sm:text-[11px] text-white/40 pt-1">
                &copy; 2027 INU College of Global Politics and Economics Election Campaign{" "}
                {ELECTION_INFO.teamHanja}. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </section>

      {/* Bottom-Right Floating PDF Button */}
      <button
        type="button"
        onClick={handleFloatingPdfClick}
        aria-label="전체 설명 보기 - 공약안내서 PDF"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2.5 sm:gap-3 bg-white hover:bg-[#EDF5F2] text-[#111827] px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl shadow-2xl border-2 border-[#357F72] hover:border-[#0D2622] active:scale-95 sm:hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
      >
        <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#357F72] group-hover:bg-[#0D2622] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#99DED0]" />
        </span>
        <span className="text-left leading-tight pr-0.5 sm:pr-1">
          <span className="block text-[10px] sm:text-[11px] font-semibold text-[#4B5563]">
            전체 설명 보기
          </span>
          <span className="block text-xs sm:text-sm font-extrabold text-[#0D2622]">
            공약안내서 PDF
          </span>
        </span>
      </button>
    </>
  );
}

export default SnsSection;
