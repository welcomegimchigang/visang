"use client";

import React from "react";
import { ELECTION_INFO } from "@/constants/electionData";

export function SnsSection() {
  return (
    <footer className="relative overflow-hidden bg-[#0D2622] text-white py-10 sm:py-12 border-t border-[#96D1CD]/25">
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
  );
}

export const Footer = SnsSection;
export default SnsSection;
