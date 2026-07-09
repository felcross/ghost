"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/I18nProvider";
import { videoUrls } from "@/config/images";
import BentoGrid from "./BentoGrid";
import { SpriteAnimation } from "./SpriteAnimation";

function VideoBlock({ src, poster, spriteSrc, spriteFrameCount = 6 }: { src: string; poster?: string; spriteSrc?: string; spriteFrameCount?: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

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
    if (isVisible && videoRef.current && !isMobile) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVisible, isMobile]);

  return (
    <div ref={sectionRef} className="relative aspect-video overflow-hidden">
      {isVisible && (
        isMobile && spriteSrc ? (
          <SpriteAnimation
            src={spriteSrc}
            frameCount={spriteFrameCount}
            fps={3}
            alt="Production moment"
            className="object-cover opacity-80"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            poster={poster}
          >
            <source src={src} type="video/mp4" />
          </video>
        )
      )}
      <div className="absolute inset-0 bg-overlay-medium" />
    </div>
  );
}

export default function WhyWorkWithUs() {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-32 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Block A — Two-video split */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 lg:mb-32"
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-6">
            {t("whyWorkWithUs.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-3xl lg:text-4xl font-black tracking-tight text-white mb-10 leading-tight max-w-4xl">
            {t("whyWorkWithUs.title")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <VideoBlock
              src={videoUrls.whyWorkWithUsFesta}
              poster="/data/festa-poster.jpg"
              spriteSrc="/data/optimized/festa-sprite.webp"
              spriteFrameCount={5}
            />
            <VideoBlock
              src={videoUrls.whyWorkWithUsClaquete}
              poster="/data/claquete-poster.jpg"
              spriteSrc="/data/optimized/claquete-sprite.webp"
              spriteFrameCount={6}
            />
          </div>
        </motion.div>

        {/* Block B — Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-[family-name:var(--font-inter)] text-3xl lg:text-4xl font-black tracking-tight text-white mb-10 leading-tight">
            {t("whyWorkWithUs.titleB")}
          </h2>
        </motion.div>

        {/* Bento Grid — photo grid after Block B */}
        <BentoGrid />
      </div>
    </section>
  );
}
