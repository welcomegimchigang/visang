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

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0D2622]/90 border-b border-[#76C7B7]/15 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 md:h-20 flex items-center justify-between gap-2">
        {/* Left: Compact College Badge + 기호 1번 飛上 Logo */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none shrink-0 active:scale-[0.98] transition-transform"
          aria-label="상단으로 이동"
        >
          <span className="bg-[#357F72] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1 rounded-md tracking-tight shadow-sm border border-[#99DED0]/35 group-hover:bg-[#2E7568] transition-colors">
            {ELECTION_INFO.collegeBadge} 기호 1번
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-[#99DED0] transition-colors">
              {ELECTION_INFO.teamHanja}
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#99DED0]/90">
              ({ELECTION_INFO.teamKor})
            </span>
          </div>
        </button>

        {/* Right: Single-Tap Thumb-Friendly Pill Links on Mobile & Clean Links on Desktop */}
        <nav
          aria-label="주요 메뉴"
          className="flex items-center gap-1 sm:gap-3 md:gap-7 shrink-0"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-1 md:py-2 rounded-full md:rounded-none text-xs sm:text-sm lg:text-base font-semibold text-white/95 bg-[#163B34]/80 sm:bg-[#163B34]/60 md:bg-transparent border border-[#76C7B7]/25 md:border-0 hover:text-[#99DED0] active:bg-[#357F72] transition-all group"
            >
              {item.label}
              <span className="hidden md:block absolute bottom-0 left-0 w-0 h-0.5 bg-[#76C7B7] rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
