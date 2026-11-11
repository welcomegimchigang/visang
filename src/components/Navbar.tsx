"use client";

import React from "react";
import { ELECTION_INFO, NAV_ITEMS } from "@/constants/electionData";

export function Navbar() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visibleNavItems = NAV_ITEMS.filter(
    (item) =>
      item.href !== "#sns" &&
      !item.label.toUpperCase().includes("SNS") &&
      !item.label.includes("공약안내서")
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#74C3C9]/95 border-b border-white/40 text-white shadow-[0_4px_20px_rgba(116,195,201,0.28)] transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-2">
        {/* Left: Compact College Badge + 기호 1번 飛上 Logo */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none shrink-0 active:scale-[0.98] transition-transform"
          aria-label="상단으로 이동"
        >
          <span className="bg-white text-[#358C94] text-[11px] sm:text-xs font-extrabold px-2.5 py-1 sm:px-3 sm:py-1 rounded-full tracking-tight shadow-sm group-hover:bg-[#F2F9FA] transition-colors">
            {ELECTION_INFO.collegeBadge} 기호 1번
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white drop-shadow-sm">
              {ELECTION_INFO.teamHanja}
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm font-bold text-white/95">
              ({ELECTION_INFO.teamKor})
            </span>
          </div>
        </button>

        {/* Right: Single-Tap Thumb-Friendly Pill Links on Mobile & Clean Links on Desktop */}
        <nav
          aria-label="주요 메뉴"
          className="flex items-center gap-1.5 sm:gap-3 md:gap-7 shrink-0"
        >
          {visibleNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative px-3 py-1.5 sm:px-3.5 sm:py-2 md:px-1 md:py-2 rounded-full md:rounded-none text-xs sm:text-sm lg:text-base font-extrabold text-white bg-[#4AA8B0]/85 sm:bg-[#4AA8B0]/70 md:bg-transparent border border-white/40 md:border-0 hover:text-white active:bg-[#3B97A0] transition-all group"
            >
              {item.label}
              <span className="hidden md:block absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
