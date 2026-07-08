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
        title: "Brand Campaign 2024",
        client: "Mercedes-Benz",
        category: "Brand Film",
        year: "2024",
        width: "two_thirds",
        poster: {
          src: "/data/mercedes-poster.jpg",
          alt: "Mercedes-Benz luxury vehicle in cinematic setting",
        },
        previewVideo: { mp4: "/data/mercedes.mp4" },
        href: "#",
      },
      {
        id: "2",
        title: "Summer Collection",
        client: "New Balance",
        category: "Content",
        year: "2024",
        width: "third",
        poster: {
          src: "/data/newbalance-poster.jpg",
          alt: "New Balance athletic sneakers close-up",
        },
        previewVideo: { mp4: "/data/newbalance.mp4" },
        href: "#",
      },
    ],
  },
  // Row 2: third + third + third
  {
    blocks: [
      {
        id: "3",
        title: "Fashion Week SP",
        client: "Fila",
        category: "Event Production",
        year: "2024",
        width: "third",
        poster: {
          src: "/data/fila-poster.jpg",
          alt: "Fila sportswear collection display",
        },
        previewVideo: { mp4: "/data/fila_new.mp4" },
        href: "#",
      },
      {
        id: "4",
        title: "Holiday Campaign",
        client: "Original Penguin",
        category: "Brand Film",
        year: "2023",
        width: "third",
        poster: {
          src: "/data/originalpenguin-poster.jpg",
          alt: "Original Penguin casual polo fashion",
        },
        previewVideo: { mp4: "/data/originalpenguin.mp4" },
        href: "#",
      },
      {
        id: "5",
        title: "Black Friday Campaign",
        client: "Renner",
        category: "Content",
        year: "2023",
        width: "third",
        poster: {
          src: "/data/renner-poster.jpg",
          alt: "Renner fashion retail campaign",
        },
        previewVideo: { mp4: "/data/renner.mp4" },
        href: "#",
      },
    ],
  },
  // Row 3: third + two_thirds
  {
    blocks: [
      {
        id: "6",
        title: "Music Festival",
        client: "LIVE!",
        category: "Event Production",
        year: "2024",
        width: "third",
        poster: {
          src: "/data/live-poster.jpg",
          alt: "LIVE! music festival concert production",
        },
        previewVideo: { mp4: "/data/live.mp4" },
        href: "#",
      },
      {
        id: "7",
        title: "Brand Experience",
        client: "Ferracini",
        category: "Brand Film",
        year: "2024",
        width: "two_thirds",
        poster: {
          src: "/data/ferracini-poster.jpg",
          alt: "Ferracini brand experience production",
        },
        previewVideo: { mp4: "/data/ferracini.mp4" },
        href: "#",
      },
    ],
  },
  // Row 4: full (closing frame)
  {
    blocks: [
      {
        id: "8",
        title: "Editorial Feature",
        client: "Esquire",
        category: "Content",
        year: "2024",
        width: "full",
        poster: {
          src: "/data/esquire-poster.jpg",
          alt: "Esquire editorial content production",
        },
        previewVideo: { mp4: "/data/esquire.mp4" },
        href: "#",
      },
    ],
  },
];
