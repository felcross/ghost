export type BlockWidth = "full" | "two_thirds" | "half" | "third";

export interface ShowcaseBlock {
  id: string;
  title: string;
  client: string;
  category?: string;
  year?: string;
  width: BlockWidth;
  poster: { src: string; alt: string };
  previewVideo: { mp4: string };
  sprite?: string;
  spriteFrameCount?: number;
  href: string;
}

export interface ShowcaseRow {
  blocks: ShowcaseBlock[];
}

export const showcaseRows: ShowcaseRow[] = [
  // Row 1: two_thirds + third
  {
    blocks: [
      {
        id: "1",
        title: "140 years 140 places Campaign",
        client: "MERCEDES",
        category: "GLOBAL CAMPAIGN",
        width: "two_thirds",
        poster: {
          src: "/data/mercedes-poster.jpg",
          alt: "Mercedes-Benz luxury vehicle in cinematic setting",
        },
        previewVideo: { mp4: "/data/mercedes.mp4" },
        sprite: "/data/optimized/mercedes-sprite.webp",
        spriteFrameCount: 6,
        href: "#",
      },
      {
        id: "2",
        title: "Italy Campaign",
        client: "FILA",
        category: "INTERNATIONAL PRODUCTION",
        width: "third",
        poster: {
          src: "/data/fila-poster.jpg",
          alt: "Fila sportswear collection display",
        },
        previewVideo: { mp4: "/data/fila_new.mp4" },
        sprite: "/data/optimized/fila-sprite.webp",
        spriteFrameCount: 5,
        href: "#",
      },
    ],
  },
  // Row 2: third + third + third
  {
    blocks: [
      {
        id: "3",
        title: "Collection Launch",
        client: "Original Penguin",
        category: "EXECUTIVE PRODUCTION & CREATIVE DIRECTION",
        width: "third",
        poster: {
          src: "/data/originalpenguin-poster.jpg",
          alt: "Original Penguin casual polo fashion",
        },
        previewVideo: { mp4: "/data/originalpenguin.mp4" },
        sprite: "/data/optimized/originalpenguin-sprite.webp",
        spriteFrameCount: 6,
        href: "#",
      },
      {
        id: "4",
        title: "Launch Collection",
        client: "FERRACINI",
        category: "EXECUTIVE PRODUCTION & CREATIVE DIRECTION",
        width: "third",
        poster: {
          src: "/data/ferracini-poster.jpg",
          alt: "Ferracini brand experience production",
        },
        previewVideo: { mp4: "/data/ferracini.mp4" },
        sprite: "/data/optimized/ferracini-sprite.webp",
        spriteFrameCount: 6,
        href: "#",
      },
      {
        id: "5",
        title: "Shape Your Mind Campaign",
        client: "LIVE",
        category: "EXECUTIVE PRODUCTION & COPYWRITING",
        width: "third",
        poster: {
          src: "/data/live-poster.jpg",
          alt: "LIVE! music festival concert production",
        },
        previewVideo: { mp4: "/data/live.mp4" },
        sprite: "/data/optimized/live-sprite.webp",
        spriteFrameCount: 6,
        href: "#",
      },
    ],
  },
  // Row 3: third + two_thirds
  {
    blocks: [
      {
        id: "6",
        title: "Summer Campaign",
        client: "RENNER",
        category: "EXECUTIVE PRODUCTION",
        width: "two_thirds",
        poster: {
          src: "/data/renner-poster.jpg",
          alt: "Renner fashion retail campaign",
        },
        previewVideo: { mp4: "/data/renner.mp4" },
        sprite: "/data/optimized/renner-sprite.webp",
        spriteFrameCount: 6,
        href: "#",
      },
    ],
  },
];
