"use client";

import React, { useState, useCallback } from "react";
import IntroSequence from "@/components/IntroSequence";
import Navbar from "@/components/Navbar";
import CandidatesSection from "@/components/CandidatesSection";
import SloganBanner from "@/components/SloganBanner";
import PledgesSection from "@/components/PledgesSection";
import SnsSection from "@/components/SnsSection";
import Toast from "@/components/Toast";

export default function HomePage() {
  const [introDone, setIntroDone] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  const handleTriggerToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  const handleCloseToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0D2622] text-white">
      {!introDone && <IntroSequence onComplete={handleIntroComplete} />}

      <Navbar />

      <main>
        <CandidatesSection />
        <SloganBanner />
        <PledgesSection />
        <SnsSection onTriggerToast={handleTriggerToast} />
      </main>

      <Toast message={toastMessage} onClose={handleCloseToast} />
    </div>
  );
}
