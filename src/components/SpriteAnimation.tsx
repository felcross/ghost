"use client";

import { useState, useEffect } from "react";

interface SpriteAnimationProps {
  src: string;
  frameCount: number;
  fps: number;
  alt: string;
  className?: string;
}

export function SpriteAnimation({
  src,
  frameCount,
  fps,
  alt,
  className = "",
}: SpriteAnimationProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const duration = frameCount / fps;

  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: `${frameCount * 100}% auto`,
        backgroundPosition: reducedMotion ? "0 0" : undefined,
        animation: reducedMotion
          ? "none"
          : `sprite-cycle ${duration}s steps(${frameCount}) infinite`,
      }}
    />
  );
}
