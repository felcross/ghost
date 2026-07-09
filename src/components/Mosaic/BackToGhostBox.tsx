"use client";

import { ArrowRight } from "lucide-react";

export function BackToGhostBox({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 pointer-events-auto flex flex-col items-start gap-0.5 cursor-pointer group"
    >
      <span className="font-[family-name:var(--font-dm-sans)] font-bold uppercase tracking-[0.05em] text-white text-sm">
        GHOST STUDIO
      </span>
      <span className="font-[family-name:var(--font-dm-sans)] font-medium uppercase tracking-[0.08em] text-white/60 text-[10px] flex items-center gap-1 transition-opacity duration-200 group-hover:text-white/90">
        <ArrowRight size={10} />
        Back to Ghost
      </span>
    </button>
  );
}
