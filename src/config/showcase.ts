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
          src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
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
          src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
          alt: "New Balance athletic sneakers close-up",
        },
        previewVideo: { mp4: "/data/newbalance.mp4" },
        href: "#",
      },
    ],
  },
  {
    blocks: [
      {
        id: "3",
        title: "Fashion Week SP",
        client: "Fila",
        category: "Event Production",
        year: "2024",
        width: "half",
        poster: {
          src: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80",
          alt: "Fila sportswear collection display",
        },
        previewVideo: { mp4: "/data/fila.mp4" },
        href: "#",
      },
      {
        id: "4",
        title: "Holiday Campaign",
        client: "Original Penguin",
        category: "Brand Film",
        year: "2023",
        width: "half",
        poster: {
          src: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=1200&q=80",
          alt: "Original Penguin casual polo fashion",
        },
        previewVideo: { mp4: "/data/originalpenguin.mp4" },
        href: "#",
      },
    ],
  },
  {
    blocks: [
      {
        id: "5",
        title: "Black Friday Campaign",
        client: "Renner",
        category: "Content",
        year: "2023",
        width: "third",
        poster: {
          src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
          alt: "Renner fashion retail store interior",
        },
        previewVideo: { mp4: "/data/renner.mp4" },
        href: "#",
      },
      {
        id: "6",
        title: "Music Festival",
        client: "LIVE!",
        category: "Event Production",
        year: "2024",
        width: "two_thirds",
        poster: {
          src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
          alt: "LIVE! music festival concert production",
        },
        previewVideo: { mp4: "/data/live.mp4" },
        href: "#",
      },
    ],
  },
];
