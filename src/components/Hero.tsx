"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/I18nProvider";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
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

  // GSAP Hero animations
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const conditions = ctx.conditions as { reduceMotion?: boolean } | undefined;
        const reduceMotion = conditions?.reduceMotion ?? false;

        if (reduceMotion) {
          gsap.set(taglineRef.current, { opacity: 1, y: 0 });
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(taglineRef.current, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
        });

        if (videoRef.current) {
          gsap.to(videoRef.current, {
            scale: 1.05,
            duration: 18,
            ease: "none",
            repeat: -1,
            yoyo: true,
            transformOrigin: "50% 50%",
          });
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-dvh w-full overflow-hidden bg-dark-bg"
    >
      {/* Background media */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
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

      {/* Scrim gradient */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,0.55) 100%)",
        }}
      />

      {/* Top: Tagline + WORK/SERVICES */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-20 md:px-10 lg:px-20">
        <p
          ref={taglineRef}
          className="text-white/30 text-[9px] md:text-[10px] lg:text-[11px] tracking-[0.3em] uppercase font-light"
        >
          {t("hero.kicker")}
        </p>
        <a
          href="/work"
          className="inline-block mt-3 text-white/30 text-[13px] md:text-[10px] lg:text-[11px] tracking-[0.3em] uppercase font-bold hover:text-white/60 transition-colors duration-300"
        >
          {t("nav.work")}
        </a>
        <a
          href="/services"
          className="inline-block mt-3 ml-6 text-white/30 text-[13px] md:text-[10px] lg:text-[11px] tracking-[0.3em] uppercase font-bold hover:text-white/60 transition-colors duration-300"
        >
          {t("nav.services")}
        </a>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6 md:px-10 lg:px-20">
        {/* Mobile: stacked layout */}
        <div className="flex flex-col gap-2 md:hidden">
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-light hover:text-white/60 transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-light hover:text-white/60 transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
          <a
            href="/contact"
            className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-light hover:text-white/60 transition-colors duration-300"
          >
            studio@theghosthub.com
          </a>
        </div>

        {/* Desktop: side by side */}
        <div className="hidden md:flex items-center justify-between">
          <a
            href="/contact"
            className="text-white/30 text-[10px] lg:text-[11px] tracking-[0.3em] uppercase font-light hover:text-white/60 transition-colors duration-300"
          >
            studio@theghosthub.com
          </a>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-[10px] lg:text-[11px] tracking-[0.3em] uppercase font-light hover:text-white/60 transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-[10px] lg:text-[11px] tracking-[0.3em] uppercase font-light hover:text-white/60 transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
