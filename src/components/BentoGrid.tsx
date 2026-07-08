"use client";

import Image from "next/image";

const bentoImages = [
  { id: "0W6A1069", alt: "Ghost Studio production moment" },
  { id: "0W6A1285", alt: "Creative team at work" },
  { id: "0W6A1292", alt: "Behind the scenes" },
  { id: "0W6A1384-3", alt: "Production setup" },
  { id: "0W6A5954", alt: "Studio environment" },
  { id: "0W6A5969-2", alt: "Event production" },
  { id: "0W6A6289_vBsDjR", alt: "On-location shoot" },
  { id: "0W6A6547", alt: "Team collaboration" },
  { id: "0W6A6597", alt: "Equipment preparation" },
  { id: "0W6A9723_vBsDjR", alt: "Final production" },
];

// Bento Grid layout: CSS Grid with explicit spans
// Desktop: 4 columns, some cells span 2col or 2row
// Mobile: 2 columns, simpler layout
const gridSpans = [
  { col: "span 2", row: "span 1" },   // 0: wide
  { col: "span 1", row: "span 2" },   // 1: tall
  { col: "span 1", row: "span 1" },   // 2
  { col: "span 1", row: "span 1" },   // 3
  { col: "span 1", row: "span 1" },   // 4
  { col: "span 2", row: "span 1" },   // 5: wide
  { col: "span 1", row: "span 1" },   // 6
  { col: "span 1", row: "span 1" },   // 7
  { col: "span 1", row: "span 2" },   // 8: tall
  { col: "span 1", row: "span 1" },   // 9
];

export default function BentoGrid() {
  return (
    <div className="mt-12">
      {/* Desktop grid */}
      <div
        className="hidden md:grid gap-[3px]"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "200px",
        }}
      >
        {bentoImages.map((img, i) => (
          <div
            key={img.id}
            className="relative overflow-hidden"
            style={{
              gridColumn: gridSpans[i].col,
              gridRow: gridSpans[i].row,
            }}
          >
            <Image
              src={`/Por Que Nos Escolher/optimized/${img.id}-desktop.webp`}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Mobile grid — 2 columns, simpler */}
      <div
        className="grid md:hidden gap-[3px]"
        style={{
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: "180px",
        }}
      >
        {bentoImages.map((img, i) => (
          <div
            key={img.id}
            className="relative overflow-hidden"
            style={{
              gridColumn: i === 0 || i === 5 ? "span 2" : "span 1",
              gridRow: "span 1",
            }}
          >
            <Image
              src={`/Por Que Nos Escolher/optimized/${img.id}-mobile.webp`}
              alt={img.alt}
              fill
              sizes="50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
