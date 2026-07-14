"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { MosaicImage } from "@/types/project";
import styles from "./mosaic.module.css";
import { Lightbox } from "./Lightbox";

const sizeClassMap: Record<string, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  wide: styles.sizeWide,
  tall: styles.sizeTall,
};

export function MosaicGrid({ images }: { images: MosaicImage[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <div className={styles.mosaicGrid}>
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`${styles.tile} ${sizeClassMap[img.size]} ${
              isMobile ? "cursor-pointer" : ""
            }`}
            data-active={
              hoveredIndex === null
                ? "idle"
                : hoveredIndex === i
                  ? "focused"
                  : "blurred"
            }
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={isMobile ? () => setLightboxIndex(i) : undefined}
            role={isMobile ? "button" : undefined}
            tabIndex={isMobile ? 0 : undefined}
            aria-label={isMobile ? img.alt : undefined}
            onKeyDown={isMobile ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(i);
              }
            } : undefined}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={styles.tileImg}
            />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
