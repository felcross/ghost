"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";
import { videoUrls } from "@/config/images";

export default function BrazilShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

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
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="brazil"
      className="relative h-[70dvh] w-full overflow-hidden bg-dark-bg"
    >
      {isVisible && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          poster={videoUrls.brazilPoster}
        >
          <source src={videoUrls.brazil} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-overlay-medium" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-accent text-xs tracking-[0.3em] uppercase mb-4"
        >
          {t("brazilShowcase.kicker")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-inter)] text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight"
        >
          {t("brazilShowcase.line1")}
          <br />
          {t("brazilShowcase.line2")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/70 text-sm md:text-base leading-relaxed mb-10 max-w-2xl"
        >
          {t("brazilShowcase.description")}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          href="#contact"
          className="group inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-text-on-light transition-all duration-300"
        >
          {t("brazilShowcase.cta")}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
