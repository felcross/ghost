"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";
import { faqImage } from "@/config/images";

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
    <section className="py-20 lg:py-32 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
              {t("faq.kicker")}
            </p>
            <h2 className="font-[family-name:var(--font-inter)] text-3xl lg:text-4xl font-black tracking-tight text-text-on-light mb-8">
              {t("faq.title")}
            </h2>

            <div className="aspect-[4/3] bg-overlay-light overflow-hidden rounded-2xl">
              <img
                src={faqImage}
                alt="FAQ"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openItem === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div
                  key={index}
                  className="border-b border-border-light"
                >
                  <button
                    id={buttonId}
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full py-6 flex items-center justify-between text-left"
                  >
                    <span className="font-[family-name:var(--font-inter)] text-lg font-bold text-text-on-light pr-4">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} className="text-text-on-light-faint flex-shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-text-on-light-muted text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
