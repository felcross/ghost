"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useTranslation } from "@/i18n/I18nProvider";
import { testimonialAvatars } from "@/config/images";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function TestimonialCard({ testimonial, avatar }: { testimonial: { quote: string; name: string; role: string }; avatar: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-border-light">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-accent text-accent"
          />
        ))}
      </div>

      <p className="text-text-on-light text-sm leading-relaxed mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={testimonial.name}
          loading="lazy"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-[family-name:var(--font-inter)] text-sm font-bold text-text-on-light">
            {testimonial.name}
          </p>
          <p className="text-text-on-light-muted text-xs">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t, tArray } = useTranslation();
  const testimonialsData = tArray("testimonials.items") as Array<{
    quote: string;
    name: string;
    role: string;
  }>;
  const statsData = tArray("testimonials.stats") as Stat[];

  return (
    <section className="py-20 lg:py-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            {t("testimonials.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-text-on-light">
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8 mb-16">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} avatar={testimonialAvatars[index]} />
            </motion.div>
          ))}
        </div>

        <div className="md:hidden mb-16">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.15}
            pagination={{ clickable: true }}
          >
            {testimonialsData.map((testimonial, index) => (
              <SwiperSlide key={index}>
              <TestimonialCard testimonial={testimonial} avatar={testimonialAvatars[index]} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="font-[family-name:var(--font-inter)] text-5xl lg:text-6xl font-black text-text-on-light mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-text-on-light-muted text-sm tracking-widest uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
