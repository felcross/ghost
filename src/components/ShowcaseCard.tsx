"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, ArrowRight } from "lucide-react";
import type { ShowcaseBlock } from "@/config/showcase";
import { useMosaic } from "@/components/Mosaic/MosaicProvider";
import { getProjectByBrand } from "@/config/projects";

const aspectRatios: Record<string, string> = {
  third: "4/3",
  half: "16/10",
  two_thirds: "16/9",
  full: "21/9",
};

export default function ShowcaseCard({ block }: { block: ShowcaseBlock }) {
  const { openProject } = useMosaic();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn = (navigator as any).connection as { saveData?: boolean } | undefined;
    setSaveData(conn?.saveData ?? false);
  }, []);

  // IntersectionObserver — threshold 0.35
  useEffect(() => {
    const el = videoRef.current?.parentElement;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lazy-load video src and control play/pause
  useEffect(() => {
    const el = videoRef.current;
    if (!el || reducedMotion || saveData) return;

    if (inView) {
      if (!el.src) {
        el.src = block.previewVideo.mp4;
      }
      el.play().catch(() => {});
      setReady(true);
      setVideoStarted(true);
    } else {
      el.pause();
    }
  }, [inView, block.previewVideo.mp4, reducedMotion, saveData]);

  // Tap-to-play for saveData/low-end
  const handleTapPlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!el.src) {
      el.src = block.previewVideo.mp4;
    }
    if (el.paused) {
      el.play().catch(() => {});
      setVideoStarted(true);
      setReady(true);
    } else {
      el.pause();
    }
  };

  const showVideo = ready && !reducedMotion && !saveData;
  const canTapPlay = saveData && !videoStarted;

  return (
    <div
      className={`group block relative overflow-hidden ${
        isMobile ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
      }`}
      onClick={isMobile ? () => {
        const project = getProjectByBrand(block.client);
        if (project) openProject(project);
      } : undefined}
      role={isMobile ? "button" : undefined}
      tabIndex={isMobile ? 0 : undefined}
      aria-label={isMobile ? `${block.client} — ${block.title}${block.category ? `, ${block.category}` : ""}` : undefined}
      onKeyDown={isMobile ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const project = getProjectByBrand(block.client);
          if (project) openProject(project);
        }
      } : undefined}
    >
      {/* Poster image */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: isMobile ? "4/5" : (aspectRatios[block.width] || "16/9"),
        }}
      >
        <Image
          src={block.poster.src}
          alt={block.poster.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="eager"
          className={`object-cover transition-opacity duration-500 ${
            showVideo ? "opacity-0" : "opacity-100"
          }`}
          priority={false}
        />

        {/* Video preview */}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Corner brackets — desktop only, hover-gated */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          aria-hidden="true"
        >
          <svg className="absolute top-3 left-3 w-5 h-5 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0 8V0h8" />
          </svg>
          <svg className="absolute top-3 right-3 w-5 h-5 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 8V0h-8" />
          </svg>
          <svg className="absolute bottom-3 left-3 w-5 h-5 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M0 12v8h8" />
          </svg>
          <svg className="absolute bottom-3 right-3 w-5 h-5 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 12v8h-8" />
          </svg>
        </div>
      )}

      {/* Play/Pause affordance — mobile only, 40×40px tap target */}
      {isMobile && videoStarted && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); handleTapPlay(); }}
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm opacity-85 pointer-events-auto"
          aria-label={videoRef.current?.paused ? "Play video" : "Pause video"}
        >
          {videoRef.current?.paused ? (
            <Play size={16} className="text-white" />
          ) : (
            <Pause size={16} className="text-white" />
          )}
        </button>
      )}

      {/* SaveData tap-to-play indicator */}
      {canTapPlay && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto">
          <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <Play size={24} className="text-white ml-1" />
          </div>
        </div>
      )}

      {/* Clickable text block — the ONLY interactive zone (desktop only) */}
      <button
        onClick={() => {
          const project = getProjectByBrand(block.client);
          if (project) openProject(project);
        }}
        className={`absolute bottom-4 left-4 z-10 pointer-events-auto cursor-pointer group/text flex items-end gap-2 ${
          canTapPlay || isMobile ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <span className={`font-[family-name:var(--font-dm-sans)] font-bold uppercase tracking-[0.05em] text-white ${isMobile ? "text-sm" : "text-sm"}`}>
            {block.client}
            <span className="font-normal text-white/80"> — {block.title}</span>
          </span>
          {block.category && (
            <span className={`font-[family-name:var(--font-dm-sans)] font-medium uppercase tracking-[0.08em] text-accent ${isMobile ? "text-[10px] mt-0.5" : "text-[10px] mt-0.5"}`}>
              {block.category}
            </span>
          )}
        </div>
        <ArrowRight
          size={14}
          className={`text-white/60 transition-opacity duration-200 mb-0.5 ${
            isMobile ? "opacity-100" : "opacity-0 group-hover/text:opacity-100"
          }`}
        />
      </button>

      {/* Mobile hairline divider */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.08]" />
      )}
    </div>
  );
}
