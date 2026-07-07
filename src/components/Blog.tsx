"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "@/i18n/I18nProvider";
import { blogImages, blogDates } from "@/config/images";

function ArticleCard({ title, date, image }: { title: string; date: string; image: string }) {
  return (
    <article className="group cursor-pointer">
      <div className="aspect-[16/10] bg-overlay-light overflow-hidden rounded-2xl mb-4">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <p className="text-text-on-light-faint text-xs tracking-widest mb-2">
        {date}
      </p>
      <h3 className="font-[family-name:var(--font-inter)] text-lg font-bold text-text-on-light group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
    </article>
  );
}

export default function Blog() {
  const { t, tArray } = useTranslation();
  const articleTitles = tArray("blog.articles") as string[];

  return (
    <section className="py-20 lg:py-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            {t("blog.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-text-on-light">
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
              <ArticleCard title={title} date={blogDates[index]} image={blogImages[index]} />
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
                <ArticleCard title={title} date={blogDates[index]} image={blogImages[index]} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
