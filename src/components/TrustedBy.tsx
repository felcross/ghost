"use client";

import { useTranslation } from "@/i18n/I18nProvider";
import { trustedByLogos } from "@/config/images";

export default function TrustedBy() {
  const { t } = useTranslation();

  return (
    <section className="py-16 lg:py-24 bg-light-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <p className="text-text-on-light-faint text-xs tracking-[0.3em] uppercase text-center">
          {t("trustedBy")}
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-light-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-light-bg to-transparent z-10" />

        <div className="flex animate-scroll-left">
          {[...trustedByLogos, ...trustedByLogos, ...trustedByLogos].map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex-shrink-0 px-8 lg:px-16 flex items-center justify-center"
            >
              <span className="font-[family-name:var(--font-inter)] text-xl lg:text-2xl font-black text-text-on-light-ghost hover:text-text-on-light-faint transition-colors duration-500 whitespace-nowrap">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
