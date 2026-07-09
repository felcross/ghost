import type { Project } from "@/types/project";

const SIZE_CYCLE: Array<"lg" | "sm" | "md" | "wide" | "tall"> = [
  "lg", "sm", "md", "wide", "tall", "sm", "md", "lg", "wide", "tall", "sm", "md",
];

export const projects: Project[] = [
  {
    slug: "mercedes",
    brand: "MERCEDES",
    category: "GLOBAL CAMPAIGN",
    cover: "/mercedes/optimized/mercedes-poster.jpg",
    gallery: [
      { src: "/mercedes/optimized/mercedes-inspire-desktop.webp", alt: "Mercedes-Benz cinematic campaign", size: "lg" },
      { src: "/mercedes/optimized/mercedes-inspire-1-desktop.webp", alt: "Mercedes-Benz global campaign", size: "sm" },
      { src: "/mercedes/optimized/mercedes-inspire-2-desktop.webp", alt: "Mercedes-Benz production", size: "md" },
      { src: "/mercedes/optimized/mercedes-inspire-3-desktop.webp", alt: "Mercedes-Benz brand film", size: "wide" },
      { src: "/mercedes/optimized/site1-desktop.webp", alt: "Mercedes-Benz luxury setting", size: "tall" },
    ],
  },
  {
    slug: "fila",
    brand: "FILA",
    category: "INTERNATIONAL PRODUCTION",
    cover: "/fila/optimized/fila-poster.jpg",
    gallery: [
      { src: "/fila/optimized/fila-rcm04879-desktop.webp", alt: "Fila Italy campaign", size: "lg" },
      { src: "/fila/optimized/fila-rcm00738-desktop.webp", alt: "Fila sportswear collection", size: "md" },
    ],
  },
  {
    slug: "original-penguin",
    brand: "Original Penguin",
    category: "EXECUTIVE PRODUCTION & CREATIVE DIRECTION",
    cover: "/original-penguin/optimized/originalpenguin-poster.jpg",
    gallery: [
      { src: "/original-penguin/optimized/0526IKPG_2574-desktop.webp", alt: "Original Penguin collection launch", size: "lg" },
      { src: "/original-penguin/optimized/0526IKPG_2571-desktop.webp", alt: "Original Penguin fashion", size: "sm" },
      { src: "/original-penguin/optimized/0526IKPG_1725-desktop.webp", alt: "Original Penguin brand experience", size: "md" },
    ],
  },
  {
    slug: "renner",
    brand: "RENNER",
    category: "EXECUTIVE PRODUCTION",
    cover: "/renner/optimized/renner-poster.jpg",
    gallery: [
      { src: "/renner/optimized/251108_MM_RENNER_3959-desktop.webp", alt: "Renner summer campaign", size: "lg" },
      { src: "/renner/optimized/251108_MM_RENNER_3842-desktop.webp", alt: "Renner fashion retail", size: "sm" },
      { src: "/renner/optimized/20250706_NH_RENNER_ALUF_21048-desktop.webp", alt: "Renner production", size: "md" },
      { src: "/renner/optimized/20250706_NH_RENNER_ALUF_21518-desktop.webp", alt: "Renner brand shoot", size: "wide" },
      { src: "/renner/optimized/20250706_NH_RENNER_ALUF_21667-desktop.webp", alt: "Renner campaign", size: "tall" },
      { src: "/renner/optimized/20250706_NH_RENNER_ALUF_21717-desktop.webp", alt: "Renner editorial", size: "sm" },
    ],
  },
  {
    slug: "live",
    brand: "LIVE",
    category: "EXECUTIVE PRODUCTION & COPYWRITING",
    cover: "/live/optimized/live-poster.jpg",
    gallery: [
      { src: "/live/optimized/0W6A8623-desktop.webp", alt: "LIVE Shape Your Mind campaign", size: "lg" },
      { src: "/live/optimized/0W6A8830-desktop.webp", alt: "LIVE music festival", size: "md" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectByBrand(brand: string): Project | undefined {
  return projects.find((p) => p.brand === brand);
}
