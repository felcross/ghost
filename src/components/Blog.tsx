"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

interface Article {
  id: number;
  title: string;
  date: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Tendências de Produção 2025",
    date: "15 Jan 2025",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&q=80",
  },
  {
    id: 2,
    title: "Como Criar Conteúdo Visual",
    date: "22 Fev 2025",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  },
  {
    id: 3,
    title: "Eventos: Do Conceito à Execução",
    date: "10 Mar 2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
];

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group cursor-pointer">
      {/* Thumbnail */}
      <div className="aspect-[16/10] bg-[#111111]/10 overflow-hidden rounded-2xl mb-4">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <p className="text-[#111111]/40 text-xs tracking-widest mb-2">
        {article.date}
      </p>
      <h3 className="font-[family-name:var(--font-inter)] text-lg font-bold text-[#111111] group-hover:text-[#FF4D1C] transition-colors duration-300">
        {article.title}
      </h3>
    </article>
  );
}

export default function Blog() {
  return (
    <section className="py-20 lg:py-32 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="mb-16">
          <p className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-4">
            ● Blog
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-[#111111]">
            CONTEÚDO
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.15}
            pagination={{ clickable: true }}
          >
            {articles.map((article) => (
              <SwiperSlide key={article.id}>
                <ArticleCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
