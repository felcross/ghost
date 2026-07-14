"use client";

import { useRef, useEffect, useState } from "react";
import { showcaseBlocks } from "@/config/showcase";
import ShowcaseCard from "./ShowcaseCard";

export default function PortfolioShowcaseGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Fallback: scale-to-fit for very short viewports
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const fitToViewport = () => {
      const vh = window.innerHeight;
      if (vh < 500) {
        const contentHeight = el.scrollHeight;
        const s = Math.min(1, vh / contentHeight);
        setScale(s);
      } else {
        setScale(1);
      }
    };

    fitToViewport();
    window.addEventListener("resize", fitToViewport);
    return () => window.removeEventListener("resize", fitToViewport);
  }, []);

  return (
    <section
      id="work"
      className="relative bg-dark-bg overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <div
        ref={gridRef}
        className="w-full h-full grid gap-[2px]"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
        }}
      >
        {showcaseBlocks.map((block) => (
          <div
            key={block.id}
            style={{
              gridColumn: block.gridCol,
              gridRow: block.gridRow,
              minWidth: 0,
              minHeight: 0,
            }}
          >
            <ShowcaseCard block={block} />
          </div>
        ))}
      </div>
    </section>
  );
}
