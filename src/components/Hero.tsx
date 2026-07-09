"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/I18nProvider";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();

  const [useVideo, setUseVideo] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const saveData = "connection" in navigator && (navigator as { connection?: { saveData?: boolean } }).connection?.saveData;
    const isLowEnd =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    if (prefersReducedMotion || saveData || isLowEnd) {
      setUseVideo(false);
    }
  }, []);

  // IntersectionObserver for lazy video play
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current && useVideo) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVisible, useVideo]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-dvh w-full overflow-hidden bg-dark-bg"
    >
      {/* Background media */}
      <div className="absolute inset-0 w-full h-full">
        {useVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover object-[center_40%] opacity-60"
            poster="/mercedes/optimized/hero-poster.jpg"
          >
            <source src="/data/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="/mercedes/optimized/hero-poster.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_40%] opacity-60"
          />
        )}
      </div>

      {/* Scrim gradient — ensures headline legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,0.55) 100%)",
        }}
      />

      {/* Tagline — top, discreet */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-20 md:px-10 lg:px-20">
        <p className="text-white/30 text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.3em] uppercase font-light">
          {t("hero.kicker")}
        </p>
      </div>

    </section>
  );
}
