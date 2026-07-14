"use client";

import { useTranslation } from "@/i18n/I18nProvider";
import { showcaseRows } from "@/config/showcase";
import ShowcaseCard from "./ShowcaseCard";

export default function WorkPanels() {
  const { t } = useTranslation();

  return (
    <>
      {/* Panel 0: Intro / Hero-like panel */}
      <section
        className="panel flex items-center justify-center bg-dark-bg"
        style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
      >
        <div className="text-center px-6">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-6">
            {t("selectedWorkV2.kicker")}
          </p>
          <h1 className="font-[family-name:var(--font-inter)] text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-tight">
            {t("selectedWorkV2.title")}
          </h1>
          <p className="text-white/40 text-sm tracking-[0.2em] uppercase">
            SCROLL &rarr;
          </p>
        </div>
      </section>

      {/* Panels 1-3: Showcase rows */}
      {showcaseRows.map((row, rowIndex) => (
        <section
          key={rowIndex}
          className="panel relative bg-dark-bg"
          style={{ width: "100vw", height: "100vh", flexShrink: 0 }}
        >
          <div className="w-full h-full flex">
            {row.blocks.map((block) => (
              <div
                key={block.id}
                className="h-full"
                style={{
                  width:
                    block.width === "full"
                      ? "100%"
                      : block.width === "two_thirds"
                        ? "66.6667%"
                        : block.width === "half"
                          ? "50%"
                          : "33.3333%",
                  flexShrink: 0,
                }}
              >
                <ShowcaseCard block={block} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
