"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "@/i18n/I18nProvider";
import { blogPosts, type BlogPillar } from "@/config/blog";
import BlogCard from "./BlogCard";

const pillarOrder: BlogPillar[] = ["locations", "logistics", "culture", "guides"];

export default function Blog() {
  const [activePillar, setActivePillar] = useState<BlogPillar | "all">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { t } = useTranslation();

  const filteredPosts =
    activePillar === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.pillar === activePillar);

  const readingTimeLabel = t("blogV2.readingTime");

  return (
    <section className="py-20 lg:py-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            {t("blogV2.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-text-on-light">
            {t("blogV2.title")}
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActivePillar("all")}
            className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full transition-all duration-300 ${
              activePillar === "all"
                ? "bg-text-on-light text-white"
                : "bg-transparent text-text-on-light-muted hover:text-text-on-light border border-border-light"
            }`}
          >
            {t("blogV2.allLabel")}
          </button>
          {pillarOrder.map((pillar) => (
            <button
              key={pillar}
              onClick={() => setActivePillar(pillar)}
              className={`px-4 py-2 text-xs tracking-wider uppercase rounded-full transition-all duration-300 ${
                activePillar === pillar
                  ? "bg-text-on-light text-white"
                  : "bg-transparent text-text-on-light-muted hover:text-text-on-light border border-border-light"
              }`}
            >
              {t(`blogV2.pillars.${pillar}`)}
            </button>
          ))}
        </div>

        {/* Masonry grid — desktop */}
        <div
          className="hidden md:grid gap-6"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "200px",
          }}
        >
          {filteredPosts.map((post, index) => {
            const isHovered = hoveredId === post.id;
            const isDimmed = hoveredId !== null && !isHovered;

            // Assign grid spans based on size
            const gridStyles: Record<string, React.CSSProperties> = {
              square: { gridColumn: "span 1", gridRow: "span 2" },
              wide: { gridColumn: "span 2", gridRow: "span 2" },
              tall: { gridColumn: "span 1", gridRow: "span 3" },
            };

            return (
              <motion.div
                key={post.id}
                style={gridStyles[post.size]}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <BlogCard
                  post={post}
                  isHovered={isHovered}
                  isDimmed={isDimmed}
                  readingTimeLabel={readingTimeLabel}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.15}
            pagination={{ clickable: true }}
          >
            {filteredPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <BlogCard post={post} readingTimeLabel={readingTimeLabel} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
