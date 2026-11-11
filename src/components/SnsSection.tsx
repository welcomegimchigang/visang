"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Share2 } from "lucide-react";
import { ELECTION_INFO } from "@/constants/electionData";

export function SnsSection() {
  const [copied, setCopied] = useState(false);

  const handleShareClick = async () => {
    const shareUrl =
      typeof window !== "undefined" ? window.location.href : "";
    if (!shareUrl) return;

    // 1. Copy URL to clipboard first so user always gets immediate feedback
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      // Ignore clipboard errors if blocked
    }

    // 2. Trigger native mobile/browser share sheet if supported
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "2027 글로벌정경대학 기호 1번 비상(飛上)",
          text: "비상: 함께 더 높이, 더 멀리 | 2027학년도 인천대학교 글로벌정경대학 학생회 선거운동본부",
          url: shareUrl,
        });
      } catch {
        // Ignore AbortError when user closes share sheet
      }
    }
  };

  return (
    <>
      <footer className="relative overflow-hidden bg-[#0D2622] text-white pt-10 sm:pt-12 pb-24 sm:pb-16 border-t border-[#96D1CD]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            {/* Official Poster Bottom Bar Info */}
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 px-5 py-3 rounded-2xl bg-[#163B34]/90 border border-[#96D1CD]/35 text-xs sm:text-sm font-bold text-[#EDF5F2] shadow-md">
              <span className="tracking-tight">
                ▶ 인천대학교 학생회 총선거 중앙선거관리위원회
              </span>
              <span className="hidden sm:inline text-[#96D1CD]/40">|</span>
              <span className="text-[#99DED0] tracking-tight">
                ▶ 투표일 : 11월 24일(화) - 11월 26일(목)
              </span>
            </div>

            {/* Campaign Title & Candidates */}
            <div className="space-y-1 pt-1">
              <p className="text-xs sm:text-sm font-extrabold text-white/95 break-keep">
                2027년도 학생회 총선거 글로벌정경대학 기호 1번{" "}
                <span className="text-[#99DED0]">{ELECTION_INFO.teamFullTitle}</span>
              </p>
              <p className="text-[11px] sm:text-xs text-[#EDF5F2]/70 break-keep">
                정후보 경제학과 21학번 최우헌 · 부후보 정치외교학과 24학번 손정현
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Copy Feedback Toast Pill */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="status"
            aria-live="polite"
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 pointer-events-none flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0D2622]/95 backdrop-blur-md border border-[#96D1CD]/60 text-[#99DED0] text-xs sm:text-sm font-extrabold shadow-[0_12px_28px_rgba(13,38,34,0.55)]"
          >
            <Check className="w-4 h-4 text-[#99DED0] shrink-0" />
            <span>✓ 홍보 페이지 링크가 복사되었습니다!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-Right Floating Share / Copy Link Button */}
      <button
        type="button"
        onClick={handleShareClick}
        aria-label="페이지 공유 및 링크 복사하기"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2.5 sm:gap-3 bg-white hover:bg-[#EDF5F2] text-[#0D2622] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-[0_12px_32px_rgba(13,38,34,0.45)] border-2 border-[#357F72] hover:border-[#0D2622] active:scale-95 sm:hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
      >
        <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#357F72] group-hover:bg-[#0D2622] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
          {copied ? (
            <Check className="w-4 h-4 text-[#99DED0]" />
          ) : (
            <Share2 className="w-4 h-4 text-[#99DED0]" />
          )}
        </span>
        <span className="text-left leading-tight pr-0.5 sm:pr-1">
          <span className="block text-[10px] sm:text-[11px] font-semibold text-[#357F72]">
            학우들에게 알리기
          </span>
          <span className="block text-xs sm:text-sm font-extrabold text-[#0D2622]">
            {copied ? "링크 복사 완료!" : "공유 · 링크 복사"}
          </span>
        </span>
      </button>
    </>
  );
}

export const Footer = SnsSection;
export default SnsSection;
