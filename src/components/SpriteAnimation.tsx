"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { requestSpriteSlot, releaseSpriteSlot } from "@/lib/spriteScheduler";

interface SpriteAnimationProps {
  src: string;
  frameCount: number;
  fps: number;
  alt: string;
  isVisible: boolean;
  className?: string;
}

export function SpriteAnimation({
  src,
  frameCount,
  fps,
  alt,
  isVisible,
  className = "",
}: SpriteAnimationProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const hasRequestedSlot = useRef(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Request slot when visible
  useEffect(() => {
    if (isVisible && !reducedMotion && !hasPlayed && !hasRequestedSlot.current) {
      hasRequestedSlot.current = true;
      requestSpriteSlot(() => {
        setShouldAnimate(true);
      });
    }
  }, [isVisible, reducedMotion, hasPlayed]);

  const handleAnimationEnd = useCallback(() => {
    setHasPlayed(true);
    releaseSpriteSlot();
  }, []);

  const duration = frameCount / fps;

  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      role="img"
      aria-label={alt}
      onAnimationEnd={shouldAnimate && !hasPlayed ? handleAnimationEnd : undefined}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: `${frameCount * 100}% 100%`,
        animation: !shouldAnimate || reducedMotion
          ? "none"
          : `sprite-cycle ${duration}s steps(${frameCount}, jump-none) forwards`,
      }}
    />
  );
}
