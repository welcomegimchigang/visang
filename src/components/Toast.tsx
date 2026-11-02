"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";

export interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  return (
    <AnimatePresence>
      {message && (
        <div className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-[calc(100vw-2rem)] max-w-sm flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="status"
            aria-live="polite"
            className="pointer-events-auto w-full flex items-center justify-between gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-[#0D2622]/95 backdrop-blur-md border border-[#76C7B7]/45 text-white shadow-[0_12px_32px_rgba(13,38,34,0.55)]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#357F72]/45 border border-[#99DED0]/45 text-[#99DED0] shrink-0">
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
              <p className="text-[13px] sm:text-sm md:text-base font-medium tracking-tight text-white break-keep leading-snug">
                {message}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="알림 닫기"
              className="p-1.5 rounded-lg text-[#99DED0]/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
