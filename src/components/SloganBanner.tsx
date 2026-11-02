"use client";

import React from "react";
import { motion } from "framer-motion";
import { ELECTION_INFO } from "@/constants/electionData";

export function SloganBanner() {
  return (
    <section
      aria-label="선거 핵심 슬로건 배너"
      className="relative overflow-hidden bg-gradient-to-r from-[#163B34] via-[#357F72] to-[#163B34] text-white py-10 px-4 sm:py-16 md:py-20 border-y border-[#99DED0]/25"
    >
      {/* Subtle Goryeo Celadon Jade Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,222,208,0.2),transparent_70%)]"
      />

      {/* Giant 飛上 Hanja Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="text-[6.5rem] sm:text-[12rem] md:text-[16rem] font-black tracking-widest text-white opacity-5 leading-none">
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
          <p className="text-xs sm:text-base md:text-lg font-semibold text-[#99DED0] tracking-wide break-keep">
            {ELECTION_INFO.bannerTopText}
          </p>

          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight break-keep leading-snug">
            &ldquo; {ELECTION_INFO.mainSlogan} &rdquo;
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-medium text-[#EDF5F2]/90 tracking-tight pt-0.5 sm:pt-1 break-keep">
            {ELECTION_INFO.bannerBottomText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default SloganBanner;
