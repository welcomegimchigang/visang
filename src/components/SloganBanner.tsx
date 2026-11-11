"use client";

import React from "react";
import { motion } from "framer-motion";
import { ELECTION_INFO } from "@/constants/electionData";

export function SloganBanner() {
  return (
    <section
      aria-label="선거 핵심 슬로건 배너"
      className="relative overflow-hidden bg-gradient-to-r from-[#74C3C9] via-[#8FD0D4] to-[#74C3C9] text-white py-10 px-4 sm:py-16 md:py-20 border-y border-white/50 shadow-inner"
    >
      {/* Subtle White Radial Light Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.28),transparent_70%)]"
      />

      {/* Giant 飛上 Hanja Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="text-[6.5rem] sm:text-[12rem] md:text-[16rem] font-black tracking-widest text-white opacity-15 leading-none">
          {ELECTION_INFO.teamHanja}
        </span>
      </div>

      {/* Center-Aligned Banner Copy */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="space-y-2.5 sm:space-y-4"
        >
          <p className="text-xs sm:text-base md:text-lg font-bold text-white/95 tracking-wide break-keep drop-shadow-sm">
            {ELECTION_INFO.bannerTopText}
          </p>

          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight break-keep leading-snug drop-shadow-sm">
            &ldquo; {ELECTION_INFO.mainSlogan} &rdquo;
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-semibold text-white/95 tracking-tight pt-0.5 sm:pt-1 break-keep">
            {ELECTION_INFO.bannerBottomText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default SloganBanner;
