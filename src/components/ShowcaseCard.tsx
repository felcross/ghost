"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ShowcaseBlock } from "@/config/showcase";
import { useMosaic } from "@/components/Mosaic/MosaicProvider";
import { getProjectByBrand } from "@/config/projects";
import { pool } from "@/lib/videoConcurrency";

const aspectRatios: Record<string, string> = {
  third: "4/3",
  half: "16/10",
  two_thirds: "16/9",
  full: "21/9",
};

let idCounter = 0;

export default function ShowcaseCard({ block }: { block: ShowcaseBlock }) {
  const { openProject } = useMosaic();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoId = useRef(`video-${block.id}-${++idCounter}`);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn = (navigator as any).connection as { saveData?: boolean } | undefined;
    setSaveData(conn?.saveData ?? false);
  }, []);

  // Register/unregister with pool
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    pool.register(videoId.current, el);
    return () => pool.unregister(videoId.current);
  }, []);

  // IntersectionObserver — updates pool visibility + distance
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        pool.setInView(videoId.current, entry.isIntersecting);
        // Calculate distance from viewport center
        const rect = entry.boundingClientRect;
        const viewCenter = window.innerHeight / 2;
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewCenter - elCenter);
        pool.updateDistance(videoId.current, distance);
      },
      { threshold: 0.25, rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lazy-load video src when near viewport
  useEffect(() => {
    const el = videoRef.current;
    if (!el || reducedMotion || saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !el.src) {
          el.src = block.previewVideo.mp4;
          el.preload = "metadata";
          setReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [block.previewVideo.mp4, reducedMotion, saveData]);

  const showVideo = ready && !reducedMotion && !saveData;

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
        ref={containerRef}
        className="relative w-full"
        style={{
          aspectRatio: isMobile ? "4/5" : (aspectRatios[block.width] || "16/9"),
          contentVisibility: "auto",
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

        {/* Video preview — fades in over poster */}
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
            <path d="M20 12v8h8" />
          </svg>
        </div>
      )}

      {/* Clickable text block — desktop only */}
      <button
        onClick={() => {
          const project = getProjectByBrand(block.client);
          if (project) openProject(project);
        }}
        className={`absolute bottom-4 left-4 z-10 pointer-events-auto cursor-pointer group/text flex items-end gap-2 ${
          isMobile ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-dm-sans)] font-bold uppercase tracking-[0.05em] text-white text-sm">
            {block.client}
            <span className="font-normal text-white/80"> — {block.title}</span>
          </span>
          {block.category && (
            <span className="font-[family-name:var(--font-dm-sans)] font-medium uppercase tracking-[0.08em] text-accent text-[10px] mt-0.5">
              {block.category}
            </span>
          )}
        </div>
        <ArrowRight
          size={14}
          className="text-white/60 opacity-0 group-hover/text:opacity-100 transition-opacity duration-200 mb-0.5"
        />
      </button>

      {/* Mobile hairline divider */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.08]" />
      )}
    </div>
  );
}
