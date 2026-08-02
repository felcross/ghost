"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BentoGrid from "./BentoGrid";

export default function InvisibleFloor() {
  return (
    <section className="relative py-20 lg:py-32 bg-dark-bg overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/invisible-floor/optimized/wp12505571-desktop.webp"
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
            "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 lg:mb-20"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl lg:text-5xl font-bold tracking-tight text-white mb-10 leading-tight max-w-4xl">
            Welcome to the Invisible Floor
          </h2>
        </motion.div>

        {/* Bento Grid — photo grid only, no video section */}
        <BentoGrid />
      </div>
    </section>
  );
}
