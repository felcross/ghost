"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { MosaicImage } from "@/types/project";

interface LightboxProps {
  images: MosaicImage[];
  startIndex: number;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

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
    if (currentIndex > 0) preloadImage(images[currentIndex - 1].src);
    if (currentIndex < images.length - 1) preloadImage(images[currentIndex + 1].src);
  }, [currentIndex, images]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(images.length - 1, i + 1));
  }, [images.length]);

  // Keyboard navigation + focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) goPrev();
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) goNext();

      // Focus trap
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length, onClose, goPrev, goNext]);

  // Focus management: save previous focus, move focus into lightbox, restore on close
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  // Lock body scroll + mark background as inert
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.setAttribute("aria-hidden", "true");
      mainContent.setAttribute("inert", "");
    }
    return () => {
      document.body.style.overflow = "";
      if (mainContent) {
        mainContent.removeAttribute("aria-hidden");
        mainContent.removeAttribute("inert");
      }
    };
  }, []);

  const animationDuration = reducedMotion ? "0ms" : "200ms";
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image lightbox: ${images[currentIndex].alt}`}
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Tap zones — full half-screen targets */}
      <div className="absolute inset-0 z-5 flex">
        <div
          className={`w-1/2 h-full ${isFirst ? "cursor-default" : "cursor-pointer"}`}
          onClick={(e) => { e.stopPropagation(); if (!isFirst) goPrev(); }}
        />
        <div
          className={`w-1/2 h-full ${isLast ? "cursor-default" : "cursor-pointer"}`}
          onClick={(e) => { e.stopPropagation(); if (!isLast) goNext(); }}
        />
      </div>

      {/* Visual arrow affordances (not clickable) */}
      {!isFirst && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-30 pointer-events-none">
          <ChevronLeft size={24} className="text-white" />
        </div>
      )}
      {!isLast && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-30 pointer-events-none">
          <ChevronRight size={24} className="text-white" />
        </div>
      )}

      {/* Close button — styled like BackToGhostBox */}
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute bottom-6 right-6 z-10 flex flex-col items-start gap-0.5 cursor-pointer group"
        aria-label="Close lightbox, back to showcase"
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
          key={images[currentIndex].src}
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
        <span aria-live="polite" className="sr-only">
          Image {currentIndex + 1} of {images.length}
        </span>
        <span aria-hidden="true">{currentIndex + 1} / {images.length}</span>
      </div>
    </div>
  );
}
