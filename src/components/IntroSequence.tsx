"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ELECTION_INFO,
  INTRO_LINES,
  INTRO_NODES,
} from "@/constants/electionData";

interface IntroSequenceProps {
  onComplete?: () => void;
}

const MAP_SOURCES = [
  "/campus-map.png",
  "/naver_map%20(1).png",
  "/images/naver_map%20(1).png",
];

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [mapSrcIndex, setMapSrcIndex] = useState(0);
  const [logoImageError, setLogoImageError] = useState(true);

  const handleFinish = useCallback(() => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const finishTimer = setTimeout(() => {
      handleFinish();
    }, 5200);

    return () => clearTimeout(finishTimer);
  }, [handleFinish]);

  const handleMapError = () => {
    if (mapSrcIndex < MAP_SOURCES.length - 1) {
      setMapSrcIndex((prev) => prev + 1);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 0] }}
          transition={{
            duration: 5.2,
            times: [0, 0.9, 1],
            ease: "easeInOut",
          }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className="fixed inset-0 z-50 h-[100dvh] w-screen overflow-hidden bg-slate-900 select-none"
          aria-label="비상 인트로 시퀀스"
        >
          {/* STEP 1: Campus Map & Sequential Nodes/Lines (0.0s ~ 2.6s) */}
          <div className="relative w-full h-full overflow-hidden">
            {/* Ambient Full-Screen Blurred Satellite Backdrop for Portrait Mobile Viewports */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-125 blur-xl opacity-60 pointer-events-none"
              style={{ backgroundImage: "url('/campus-map.png')" }}
            />
            <div className="absolute inset-0 bg-slate-900/35 pointer-events-none" />

            {/* Top-left subtle HUD indicator */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-10 z-30 flex items-center gap-2 text-[11px] sm:text-xs md:text-sm font-medium tracking-wider text-[#8FD0D4] drop-shadow pr-4">
              <span className="inline-block w-2 h-2 shrink-0 rounded-full bg-[#7DD3FC] animate-pulse shadow-[0_0_8px_#38BDF8]" />
              <span className="truncate">
                INCHEON NATIONAL UNIVERSITY · SONGDO CAMPUS
              </span>
            </div>

            {/*
              Unified Coordinate Wrapper:
              - Preserves exact 1901/931 aspect ratio of campus-map.png so percentage coordinates never drift.
              - On Mobile (<640px): w-[320vw] centered on (57.8%, 29.5%) so 14호관(48.8%), 13호관(54.8%), 5호관(66.8%)
                sit right in the center of portrait screens (360px~430px) with ~21vw safe margin on both sides.
              - On Tablet/Desktop (>=640px): fills viewport with scale-[1.35] origin-[58%_28%].
            */}
            <div
              style={{ backgroundImage: "url('/campus-map.png')" }}
              className="
                absolute left-1/2 top-1/2
                aspect-[1901/931]
                w-[320vw] -translate-x-[57.8%] -translate-y-[32%]
                sm:w-auto sm:min-w-[100vw] sm:min-h-[100dvh]
                sm:-translate-x-1/2 sm:-translate-y-1/2
                sm:scale-[1.35] sm:origin-[58%_28%]
                bg-no-repeat bg-[length:100%_100%] bg-center
                shrink-0
              "
            >
              {/* Real Satellite Campus Map Image (Always opacity-100 from SSR mount) */}
              <img
                src={MAP_SOURCES[mapSrcIndex]}
                alt="인천대학교 송도캠퍼스 위성 지도"
                onError={handleMapError}
                className="absolute inset-0 z-0 w-full h-full object-fill opacity-100"
              />

              {/* Subtle Dark Overlay so Satellite Photo is Vivid & Sky-Blue Nodes/Lines Pop Clearly */}
              <div className="absolute inset-0 z-[1] bg-slate-950/35 pointer-events-none" />

              {/* Subtle Sky-Blue Target Rings Around the 3 Buildings */}
              <svg
                className="absolute inset-0 z-[2] w-full h-full pointer-events-none"
                viewBox="0 0 1901 931"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <circle
                  cx={1901 * 0.668}
                  cy={931 * 0.385}
                  r="60"
                  fill="none"
                  stroke="#8FD0D4"
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={1901 * 0.548}
                  cy={931 * 0.262}
                  r="60"
                  fill="none"
                  stroke="#8FD0D4"
                  strokeWidth="1.2"
                  strokeOpacity="0.5"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={1901 * 0.488}
                  cy={931 * 0.202}
                  r="80"
                  fill="none"
                  stroke="#7DD3FC"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  strokeDasharray="5 5"
                />
              </svg>

              {/* SVG Connecting Lines Layer (Locked to 1901/931 Wrapper) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter
                    id="skyBlueLineGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="1.2"
                      floodColor="#38BDF8"
                      floodOpacity="0.95"
                    />
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="2.5"
                      floodColor="#8FD0D4"
                      floodOpacity="0.85"
                    />
                  </filter>
                </defs>

                {INTRO_LINES.map((line) => {
                  const duration = line.endAt - line.startAt;
                  const d = `M ${line.from.x} ${line.from.y} L ${line.to.x} ${line.to.y}`;
                  return (
                    <g key={line.id}>
                      {/* Outer Sky-Blue Glow Path */}
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="#7DD3FC"
                        strokeWidth="6"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        style={{ filter: "url(#skyBlueLineGlow)" }}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        transition={{
                          pathLength: {
                            delay: line.startAt,
                            duration,
                            ease: "easeInOut",
                          },
                          opacity: {
                            delay: line.startAt,
                            duration: 0.1,
                          },
                        }}
                      />
                      {/* Pure White Core Path */}
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: {
                            delay: line.startAt,
                            duration,
                            ease: "easeInOut",
                          },
                          opacity: {
                            delay: line.startAt,
                            duration: 0.1,
                          },
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Campus Nodes Layer (Pixel-locked to Rooftops) */}
              {INTRO_NODES.map((node) => {
                // On narrow mobile screens, place 13호관 badge below the dot so 14호관 and 13호관 badges never collide
                const isMiddleNode = node.id === "node-13";

                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: node.appearAt,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative flex flex-col items-center"
                    >
                      {/* Speech Bubble Badge */}
                      <div
                        className={
                          isMiddleNode
                            ? "absolute top-full mt-2 sm:top-auto sm:bottom-full sm:mt-0 sm:mb-2.5 flex flex-col items-center whitespace-nowrap"
                            : "absolute bottom-full mb-2 sm:mb-2.5 flex flex-col items-center whitespace-nowrap"
                        }
                      >
                        {/* Top Pointer Triangle (only on mobile when 13호관 badge is below dot) */}
                        {isMiddleNode && (
                          <div className="sm:hidden w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[5px] border-b-slate-900/90" />
                        )}

                        <div className="bg-slate-900/90 border border-[#8FD0D4]/80 text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-xl text-[11px] sm:text-xs font-bold tracking-tight flex flex-col sm:flex-row items-center gap-0 sm:gap-1.5 backdrop-blur-md leading-tight">
                          <span className="text-[#8FD0D4]">{node.label}</span>
                          {node.subLabel && (
                            <span className="text-zinc-100 font-medium text-[9px] sm:text-[11px]">
                              <span className="hidden sm:inline">· </span>
                              {node.subLabel}
                            </span>
                          )}
                        </div>

                        {/* Bottom Pointer Triangle */}
                        <div
                          className={
                            isMiddleNode
                              ? "hidden sm:block w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-slate-900/90"
                              : "w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-slate-900/90"
                          }
                        />
                      </div>

                      {/* Outer Sky-Blue Pulse Ring */}
                      <span className="absolute -inset-2 sm:-inset-2.5 rounded-full bg-[#38BDF8]/55 animate-ping" />

                      {/* Glowing Sky-Blue + White Core Dot */}
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-[#38BDF8] shadow-[0_0_16px_4px_rgba(56,189,248,0.95)]" />
                    </motion.div>
                  </div>
                );
              })}

              {/* STEP 2: Node 3 (14호관, left: 48.8%, top: 20.2%) Explosive Whiteout Circle (2.6s ~ 3.5s) */}
              <motion.div
                style={{ left: "48.8%", top: "20.2%" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1, 300], opacity: [0, 1, 1] }}
                transition={{
                  delay: 2.6,
                  duration: 0.85,
                  times: [0, 0.05, 1],
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white pointer-events-none z-30 shadow-[0_0_40px_15px_rgba(255,255,255,1)]"
              />
            </div>
          </div>

          {/* STEP 3: Pure White Full Cover & '飛上' Logo Reveal (3.5s ~ 5.2s) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.35, duration: 0.15 }}
            className="absolute inset-0 z-40 bg-white flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 3.5,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center max-w-full"
            >
              {/* Poster Sky-Blue Wing / Flight Motif Above Logo */}
              <div className="mb-3 flex items-center gap-2">
                <span className="h-[2px] w-6 sm:w-8 md:w-12 bg-gradient-to-r from-transparent to-[#58B4BC]" />
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#58B4BC] uppercase break-keep">
                  {ELECTION_INFO.collegeBadge} 선거운동본부
                </span>
                <span className="h-[2px] w-6 sm:w-8 md:w-12 bg-gradient-to-l from-transparent to-[#58B4BC]" />
              </div>

              {/* Clean Typography Logo (with optional /images/logo-bisang.png support) */}
              {!logoImageError ? (
                <img
                  src="/images/logo-bisang.png"
                  alt={ELECTION_INFO.teamFullTitle}
                  onError={() => setLogoImageError(true)}
                  className="h-20 sm:h-24 md:h-32 w-auto object-contain mb-2 block"
                />
              ) : (
                <div className="relative flex items-center justify-center">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-black">
                    {ELECTION_INFO.teamHanja}
                  </h1>
                  <span
                    className="ml-2 -mt-6 sm:-mt-8 inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#78C7CC]"
                    aria-hidden="true"
                  />
                </div>
              )}

              <p className="text-base sm:text-lg md:text-xl font-medium text-neutral-800 mt-4 tracking-tight break-keep px-4 text-center">
                {ELECTION_INFO.mainSlogan}
              </p>
            </motion.div>
          </motion.div>

          {/* Always-visible Touch-Friendly SKIP > Button at Bottom Right */}
          <button
            type="button"
            onClick={handleFinish}
            className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 min-h-[44px] px-4 py-2.5 rounded-full bg-slate-900/85 hover:bg-[#58B4BC] active:scale-95 text-white border border-[#8FD0D4]/60 text-xs sm:text-sm font-semibold tracking-wider backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center"
            aria-label="인트로 건너뛰기"
          >
            SKIP &gt;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
