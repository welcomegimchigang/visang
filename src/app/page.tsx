"use client";

import React, { useState, useCallback } from "react";
import IntroSequence from "@/components/IntroSequence";
import Navbar from "@/components/Navbar";
import CandidatesSection from "@/components/CandidatesSection";
import SloganBanner from "@/components/SloganBanner";
import PledgesSection from "@/components/PledgesSection";
import SnsSection from "@/components/SnsSection";

export default function HomePage() {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0D2622] text-white">
      {!introDone && <IntroSequence onComplete={handleIntroComplete} />}

      <Navbar />

      <main>
        <CandidatesSection />
        <SloganBanner />
        <PledgesSection />
      </main>

      <SnsSection />
    </div>
  );
}
