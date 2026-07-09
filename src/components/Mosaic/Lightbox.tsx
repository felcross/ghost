"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { MosaicImage } from "@/types/project";

interface LightboxProps {
  images: MosaicImage[];
  startIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Preload next/prev images
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    const prev = (currentIndex - 1 + images.length) % images.length;
    const next = (currentIndex + 1) % images.length;
    preloadImage(images[prev].src);
    preloadImage(images[next].src);
  }, [currentIndex, images]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  // Swipe handling
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipe = 50;
    if (distance > minSwipe) goNext();
    if (distance < -minSwipe) goPrev();
  };

  const animationDuration = reducedMotion ? "0ms" : "200ms";

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button — styled like BackToGhostBox */}
      <button
        onClick={onClose}
        className="absolute bottom-6 right-6 z-10 flex flex-col items-start gap-0.5 cursor-pointer group"
        aria-label="Back to showcase"
      >
        <span className="font-[family-name:var(--font-dm-sans)] font-bold uppercase tracking-[0.05em] text-white text-sm">
          GHOST STUDIO
        </span>
        <span className="font-[family-name:var(--font-dm-sans)] font-medium uppercase tracking-[0.08em] text-white/60 text-[10px] flex items-center gap-1 transition-opacity duration-200 group-hover:text-white/90">
          <ArrowRight size={10} />
          Back to Showcase
        </span>
      </button>

      {/* Image */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          sizes="100vw"
          className="object-contain"
          style={{ transition: `opacity ${animationDuration} ease` }}
        />
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-[family-name:var(--font-dm-sans)]">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
