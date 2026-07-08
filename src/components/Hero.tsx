"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/i18n/I18nProvider";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [useVideo, setUseVideo] = useState(true);

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

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const kicker = kickerRef.current;
    const headline = headlineRef.current;
    const wipe = wipeRef.current;
    if (!section || !media || !kicker || !headline || !wipe) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(kicker, { opacity: 1, y: 0 });
      gsap.set(headline, { opacity: 1, y: 0 });
      gsap.set(wipe, { display: "none" });
      return;
    }

    // Play video if available
    const video = videoRef.current;
    if (video && useVideo) {
      video.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      // Hero pin + media scale + type parallax-out
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      heroTimeline
        .to(
          media,
          {
            scale: 1.12,
            ease: "none",
          },
          0
        )
        .to(
          kicker,
          {
            yPercent: -140,
            opacity: 0,
            ease: "power1.in",
          },
          0
        )
        .to(
          headline,
          {
            yPercent: -90,
            opacity: 0,
            ease: "power1.in",
          },
          0.05
        );

      // PageWipe — clip-path reveal
      gsap.to(wipe, {
        clipPath: "inset(0% 0 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
        },
      });

      // Hide wipe panel after animation completes, restore on reverse
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        onLeave: () => gsap.set(wipe, { visibility: "hidden" }),
        onLeaveBack: () => gsap.set(wipe, { visibility: "visible" }),
      });
    }, section);

    return () => ctx.revert();
  }, [useVideo]);

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="relative h-dvh w-full overflow-hidden bg-dark-bg"
      >
        {/* Background media */}
        <div
          ref={mediaRef}
          className="absolute inset-0 w-full h-full origin-center"
        >
          {useVideo ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              poster="/data/hero-poster.jpg"
            >
              <source src="/data/hero.mp4" type="video/mp4" />
            </video>
          ) : (
            <img
              src="/data/hero-poster.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60"
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

        {/* Content — bottom-anchored */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-[12vh] md:px-10 lg:px-20">
          <p
            ref={kickerRef}
            className="text-accent text-[11px] md:text-xs lg:text-[13px] tracking-[0.3em] uppercase mb-4 md:mb-5 lg:mb-6"
            style={{ opacity: 0 }}
          >
            {t("hero.kicker")}
          </p>

          <h1
            ref={headlineRef}
            className="font-[family-name:var(--font-inter)] font-black text-white leading-[0.92] md:leading-[0.96] lg:leading-[0.94]"
            style={{
              fontSize: "clamp(2.75rem, 9vw, 11rem)",
              letterSpacing: "-0.02em",
              opacity: 0,
            }}
          >
            WELCOME TO THE
            <br />
            INVISIBLE FLOOR
          </h1>
        </div>
      </section>

      {/* PageWipe panel — fixed, clipped from bottom */}
      <div
        ref={wipeRef}
        id="hero-wipe-panel"
        className="fixed inset-0 z-[5] bg-dark-bg"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      />
    </>
  );
}
