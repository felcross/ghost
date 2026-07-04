"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const VIDEO_URL = "https://videos.pexels.com/video-files/35933207/15244916_2560_1440_60fps.mp4";
const POSTER_URL = "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1920&q=80";

export default function BrazilShowcase() {
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
      id="brazil"
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

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-4"
        >
          PRODUCTION IN BRAZIL
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-inter)] text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight"
        >
          YOUR NEXT MASTERPIECE
          <br />
          BEGINS HERE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/70 text-sm md:text-base leading-relaxed mb-10 max-w-2xl"
        >
          World-class locations, legendary talent, and stories only Brazil can
          tell. From the streets of Rio to the Amazon rainforest — we bring your
          vision to life.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          href="#contact"
          className="group inline-flex items-center gap-3 bg-[#FF4D1C] text-white px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-[#111111] transition-all duration-300"
        >
          START YOUR PROJECT
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
