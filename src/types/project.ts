export type MosaicSize = "sm" | "md" | "lg" | "wide" | "tall";

export interface MosaicImage {
  src: string;
  alt: string;
  size: MosaicSize;
}

export interface Project {
  slug: string;
  brand: string;
  category: string;
  cover: string;
  gallery: MosaicImage[];
}
