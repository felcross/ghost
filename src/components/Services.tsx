"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/I18nProvider";

const images = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
];

export default function Services() {
  const { t, tArray } = useTranslation();
  const servicesData = tArray("services.items") as Array<{
    title: string;
    tags: string[];
    description: string;
  }>;

  return (
    <section id="services" className="py-20 lg:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-4">
            {t("services.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-white">
            {t("services.title")}
          </h2>
        </div>

        <div className="space-y-0">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`py-8 lg:py-12 ${
                index < servicesData.length - 1
                  ? "border-b border-dashed border-white/20"
                  : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-[family-name:var(--font-inter)] text-5xl lg:text-6xl font-black text-[#FF4D1C]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[family-name:var(--font-inter)] text-2xl lg:text-3xl font-black tracking-tight text-white">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#1C1C1C] text-[#9A9A9A] text-xs tracking-wider rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[#9A9A9A] text-sm leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>

                <div className="aspect-[16/10] bg-[#1C1C1C] overflow-hidden">
                  <img
                    src={images[index]}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
