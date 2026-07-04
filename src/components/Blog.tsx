"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "@/i18n/I18nProvider";

const images = [
  "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&q=80",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
];

const dates = ["15 Jan 2025", "22 Feb 2025", "10 Mar 2025"];

function ArticleCard({ title, date, image }: { title: string; date: string; image: string }) {
  return (
    <article className="group cursor-pointer">
      <div className="aspect-[16/10] bg-[#111111]/10 overflow-hidden rounded-2xl mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <p className="text-[#111111]/40 text-xs tracking-widest mb-2">
        {date}
      </p>
      <h3 className="font-[family-name:var(--font-inter)] text-lg font-bold text-[#111111] group-hover:text-[#FF4D1C] transition-colors duration-300">
        {title}
      </h3>
    </article>
  );
}

export default function Blog() {
  const { t, tArray } = useTranslation();
  const articleTitles = tArray("blog.articles") as string[];

  return (
    <section className="py-20 lg:py-32 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-4">
            {t("blog.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
            {t("blog.title")}
          </h2>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8">
          {articleTitles.map((title, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ArticleCard title={title} date={dates[index]} image={images[index]} />
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.15}
            pagination={{ clickable: true }}
          >
            {articleTitles.map((title, index) => (
              <SwiperSlide key={index}>
                <ArticleCard title={title} date={dates[index]} image={images[index]} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
