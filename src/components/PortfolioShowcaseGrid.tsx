"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/I18nProvider";
import { showcaseRows } from "@/config/showcase";
import ShowcaseCard from "./ShowcaseCard";

const widthClasses = {
  full: "w-full",
  two_thirds: "w-[calc(66.666%-0.5rem)]",
  half: "w-[calc(50%-0.5rem)]",
  third: "w-[calc(33.333%-0.5rem)]",
};

export default function PortfolioShowcaseGrid() {
  const { t } = useTranslation();

  return (
    <section id="work" className="py-20 lg:py-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            {t("selectedWorkV2.kicker")}
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-text-on-light">
            {t("selectedWorkV2.title")}
          </h2>
        </div>

        {/* Showcase grid — editorial flex rows */}
        <div className="space-y-4">
          {showcaseRows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: rowIndex * 0.1 }}
              className="flex gap-4"
            >
              {row.blocks.map((block) => (
                <div
                  key={block.id}
                  className={`${widthClasses[block.width]} shrink-0`}
                >
                  <ShowcaseCard block={block} />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
