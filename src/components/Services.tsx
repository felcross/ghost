"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/i18n/I18nProvider";

interface ServiceItem {
  number: string;
  title: string;
  tags: string[];
  description: string;
}

export default function Services() {
  const { t, tArray } = useTranslation();
  const services = tArray("services.items") as ServiceItem[];

  return (
    <section id="services" className="relative min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/capaservices.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay for legibility */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`py-12 lg:py-16 ${
                index < services.length - 1
                  ? "border-b border-white/10"
                  : ""
              }`}
            >
              {/* Number + Title */}
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-[family-name:var(--font-inter)] text-5xl lg:text-6xl font-black text-white/30">
                  {service.number}
                </span>
                <h3 className="font-[family-name:var(--font-inter)] text-3xl lg:text-4xl font-black tracking-tight text-white">
                  {service.title}
                </h3>
              </div>

              {/* Subtitle */}
              <p className="font-[family-name:var(--font-inter)] text-xs tracking-[0.3em] uppercase text-white/40 mb-6 ml-1">
                {t("services.subtitle")}
              </p>

              {/* Tags as bullet list */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-2 text-white/70 text-sm"
                  >
                    <span className="text-white/30">&#9679;</span>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
