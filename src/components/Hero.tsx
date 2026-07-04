"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const { t, tArray } = useTranslation();
  const keywords = tArray("hero.keywords") as string[];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % keywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [keywords.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80"
      >
        <source
          src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 video-overlay" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-6"
          >
            {t("hero.kicker")}
          </motion.p>

          <h1 className="font-[family-name:var(--font-inter)] text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[0.9]">
            {t("hero.line1")}
            <br />
            {t("hero.line2")}
            <br />
            {t("hero.line3")}
          </h1>

          <div className="h-8 flex items-center justify-center overflow-hidden">
            <motion.span
              key={currentKeyword}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-[#9A9A9A] text-sm tracking-[0.3em] uppercase"
            >
              {keywords[currentKeyword]}
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown size={24} className="text-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
