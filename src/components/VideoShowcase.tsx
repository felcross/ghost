"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VIDEO_URL = "https://videos.pexels.com/video-files/8951964/8951964-uhd_2560_1440_24fps.mp4";
const POSTER_URL = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80";

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="showcase"
      className="relative h-[70vh] w-full overflow-hidden bg-[#0A0A0A]"
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
          poster={POSTER_URL}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-4"
        >
          NOSSO REEL
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-inter)] text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-8 leading-tight"
        >
          CADA PROJETO UMA
          <br />
          NOVA HISTÓRIA
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          href="#work"
          className="group inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-[#FF4D1C] hover:border-[#FF4D1C] transition-all duration-300"
        >
          <Play size={16} className="group-hover:scale-110 transition-transform" />
          Ver Projetos
        </motion.a>
      </div>
    </section>
  );
}
