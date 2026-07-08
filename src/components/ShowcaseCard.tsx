"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import type { ShowcaseBlock } from "@/config/showcase";

export default function ShowcaseCard({ block }: { block: ShowcaseBlock }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // IntersectionObserver for viewport detection
  useEffect(() => {
    const el = videoRef.current?.parentElement;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px", threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Lazy-load video src and control play/pause
  useEffect(() => {
    const el = videoRef.current;
    if (!el || reducedMotion) return;

    if (inView) {
      // Lazy-attach src only when in viewport
      if (!el.src) {
        el.src = block.previewVideo.mp4;
      }
      el.play().catch(() => {});
      setReady(true);
    } else {
      el.pause();
    }
  }, [inView, block.previewVideo.mp4, reducedMotion]);

  return (
    <a
      href={block.href}
      className="group block relative overflow-hidden rounded-xl"
    >
      {/* Poster image */}
      <div className="relative aspect-video w-full">
        <Image
          src={block.poster.src}
          alt={block.poster.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-500 ${
            ready && !reducedMotion ? "opacity-0" : "opacity-100"
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
            ready && !reducedMotion ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Metadata overlay — hidden by default, revealed on hover/focus */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
          transition-all duration-300 ease-out
          ${isTouchDevice ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}
          ${isTouchDevice ? "translate-y-0" : "translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0"}
        `}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
          {block.category && (
            <span className="inline-block px-2 py-0.5 bg-white/20 text-white text-[10px] tracking-wider uppercase rounded-full mb-2 backdrop-blur-sm">
              {block.category}
            </span>
          )}
          <h3 className="font-[family-name:var(--font-inter)] text-lg lg:text-xl font-bold text-white mb-1">
            {block.client}
          </h3>
          <p className="text-white/70 text-sm">
            {block.title}
            {block.year && <span className="ml-2 text-white/50">{block.year}</span>}
          </p>
        </div>
      </div>
    </a>
  );
}
