"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/I18nProvider";
import { whyWorkWithUsImages } from "@/config/images";

export default function WhyWorkWithUs() {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-overlay-light overflow-hidden">
                <img
                  src={whyWorkWithUsImages.team}
                  alt="Team collaboration"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] bg-overlay-light overflow-hidden mt-8">
                <img
                  src={whyWorkWithUsImages.creative}
                  alt="Creative process"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 aspect-[16/9] bg-overlay-light overflow-hidden">
                <img
                  src={whyWorkWithUsImages.studio}
                  alt="Production studio"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-accent text-xs tracking-[0.3em] uppercase mb-6">
              {t("whyWorkWithUs.kicker")}
            </p>
            <h2 className="font-[family-name:var(--font-inter)] text-3xl lg:text-4xl font-black tracking-tight text-text-on-light mb-8 leading-tight">
              {t("whyWorkWithUs.title")}
            </h2>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border-light">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-white text-sm font-bold">GS</span>
                </div>
                <div className="bg-light-bg rounded-2xl rounded-tl-none px-4 py-3">
                  <p className="text-text-on-light text-sm">
                    {t("whyWorkWithUs.chat1")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 justify-end">
                <div className="bg-dark-bg rounded-2xl rounded-tr-none px-4 py-3">
                  <p className="text-white text-sm">
                    {t("whyWorkWithUs.chat2")}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-overlay-light flex items-center justify-center">
                  <span className="text-text-on-light text-sm font-bold">VC</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
