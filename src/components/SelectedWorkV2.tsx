"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/i18n/I18nProvider";
import { portfolioItems, type PortfolioItem } from "@/config/images";

export default function SelectedWorkV2() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const loadedVideos = useRef<Set<string>>(new Set());
  const { t } = useTranslation();

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left + 20,
      y: e.clientY - rect.top - 60,
    });
  };

  const handleMouseEnter = (item: PortfolioItem) => {
    if (isTouchDevice || reducedMotion) return;
    setHoveredId(item.id);

    // Lazy-load video src on first hover
    if (item.previewVideoUrl && !loadedVideos.current.has(item.id)) {
      const video = videoRefs.current.get(item.id);
      if (video) {
        video.src = item.previewVideoUrl;
        loadedVideos.current.add(item.id);
      }
    }

    // Play video
    const video = videoRefs.current.get(item.id);
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;

    // Pause and reset video
    if (hoveredId) {
      const video = videoRefs.current.get(hoveredId);
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }

    setHoveredId(null);
  };

  return (
    <section id="work" className="py-20 lg:py-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            {t("selectedWorkV2.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-text-on-light">
            {t("selectedWorkV2.title")}
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
        >
          {portfolioItems.map((item) => {
            const isHovered = hoveredId === item.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <a
                key={item.id}
                href={item.href}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                className="block border-b border-border-light py-6 lg:py-8 transition-opacity duration-300"
                style={{ opacity: isDimmed ? 0.4 : 1 }}
              >
                <div className="flex items-center gap-4 lg:gap-8">
                  {/* Index */}
                  <span className="text-text-on-light-subtle text-sm font-mono w-8 shrink-0">
                    {item.index}
                  </span>

                  {/* Client + Title */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-[family-name:var(--font-inter)] text-xl lg:text-2xl font-black tracking-tight transition-colors duration-300 ${
                        isHovered ? "text-accent" : "text-text-on-light"
                      }`}
                    >
                      {item.client}
                    </h3>
                    <p className="text-text-on-light-muted text-sm mt-1">
                      {item.title}
                    </p>
                  </div>

                  {/* Category */}
                  <span className="hidden md:block text-text-on-light-faint text-xs tracking-wider uppercase shrink-0">
                    {t(`selectedWorkV2.categories.${item.category}`)}
                  </span>

                  {/* Year */}
                  {item.year && (
                    <span className="hidden md:block text-text-on-light-subtle text-xs shrink-0">
                      {item.year}
                    </span>
                  )}

                  {/* Thumbnail */}
                  <div className="relative w-24 h-16 lg:w-44 lg:h-28 overflow-hidden shrink-0 rounded-sm">
                    {/* Static image */}
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 96px, 176px"
                      className={`object-cover transition-all duration-500 ${
                        reducedMotion
                          ? "opacity-100"
                          : isHovered && !item.previewVideoUrl
                          ? "scale-105"
                          : isHovered && item.previewVideoUrl
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />

                    {/* Video preview (only renders if has video URL) */}
                    {item.previewVideoUrl && (
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current.set(item.id, el);
                        }}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                          isHovered && !reducedMotion ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </a>
            );
          })}

          {/* Cursor label (desktop only) */}
          {!isTouchDevice && !reducedMotion && hoveredId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none fixed z-50 bg-text-on-light text-white px-4 py-2 text-xs tracking-wider uppercase rounded-full shadow-lg"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
            >
              {t("selectedWorkV2.viewProject")}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
