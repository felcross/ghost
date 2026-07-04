"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const { t, tArray } = useTranslation();
  const faqData = tArray("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-32 bg-[#F5F2ED]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-4">
              {t("faq.kicker")}
            </p>
            <h2 className="font-[family-name:var(--font-inter)] text-3xl lg:text-4xl font-black tracking-tight text-[#111111] mb-8">
              {t("faq.title")}
            </h2>

            <div className="aspect-[4/3] bg-[#111111]/10 overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80"
                alt="FAQ"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="border-b border-[#111111]/10"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 flex items-center justify-between text-left"
                >
                  <span className="font-[family-name:var(--font-inter)] text-lg font-bold text-[#111111] pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openItem === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-[#111111]/40 flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItem === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#111111]/60 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
