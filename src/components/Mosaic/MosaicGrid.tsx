"use client";

import { useState } from "react";
import Image from "next/image";
import type { MosaicImage } from "@/types/project";
import styles from "./mosaic.module.css";

const sizeClassMap: Record<string, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  wide: styles.sizeWide,
  tall: styles.sizeTall,
};

export function MosaicGrid({ images }: { images: MosaicImage[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.mosaicGrid}>
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`${styles.tile} ${sizeClassMap[img.size]}`}
          data-active={
            hoveredIndex === null
              ? "idle"
              : hoveredIndex === i
                ? "focused"
                : "blurred"
          }
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
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
  );
}
