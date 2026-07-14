"use client";

import { motion } from "framer-motion";
import { showcaseRows } from "@/config/showcase";
import ShowcaseCard from "./ShowcaseCard";

const widthClasses = {
  full: "w-full",
  two_thirds: "w-[66.6667%]",
  half: "w-[50%]",
  third: "w-[33.3333%]",
};

export default function PortfolioShowcaseGrid() {
  return (
    <section id="work" className="relative bg-dark-bg pt-24">
      {/* Showcase grid — zero-gap, full-bleed, edge-to-edge */}
      <div className="relative overflow-hidden">
        {showcaseRows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: rowIndex * 0.1 }}
            className="flex"
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
    </section>
  );
}
