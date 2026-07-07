export const servicesImages = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
];

export const testimonialAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
];

export const portfolioImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
];

export const portfolioClients = ["Renner", "Filá", "Vogue", "Chili Beans", "Ashua", "Avatim"];

export const whyWorkWithUsImages = {
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
  creative: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
  studio: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
};

export const faqImage = "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80";

export const videoUrls = {
  hero: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
  heroPoster: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80",
  showcase: "https://videos.pexels.com/video-files/8951964/8951964-uhd_2560_1440_24fps.mp4",
  showcasePoster: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80",
  brazil: "https://videos.pexels.com/video-files/35933207/15244916_2560_1440_60fps.mp4",
  brazilPoster: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1920&q=80",
};

export const trustedByLogos = [
  "RENNER",
  "FILÁ",
  "VOGUE",
  "CHILI BEANS",
  "ASHUA",
  "AVATIM",
  "NIKE",
  "ADIDAS",
  "ZARA",
  "H&M",
];

// --- SelectedWork V2 data model ---

export interface PortfolioItem {
  id: string;
  index: string;
  client: string;
  title: string;
  category: string;
  year?: string;
  thumbnailUrl: string;
  previewVideoUrl?: string;
  href: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    index: "01",
    client: "Renner",
    title: "Campanha Verão 2024",
    category: "Brand Film",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    href: "#",
  },
  {
    id: "2",
    index: "02",
    client: "Filá",
    title: "Lançamento Collection",
    category: "Content",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    href: "#",
  },
  {
    id: "3",
    index: "03",
    client: "Vogue",
    title: "Fashion Week SP",
    category: "Event Production",
    year: "2024",
    thumbnailUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",
    href: "#",
  },
  {
    id: "4",
    index: "04",
    client: "Chili Beans",
    title: "Festival de Inverno",
    category: "Event Production",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&q=80",
    href: "#",
  },
  {
    id: "5",
    index: "05",
    client: "Ashua",
    title: "Showroom Prime",
    category: "Brand Film",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
    href: "#",
  },
  {
    id: "6",
    index: "06",
    client: "Avatim",
    title: "Campanha Black",
    category: "Content",
    year: "2023",
    thumbnailUrl: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&q=80",
    href: "#",
  },
];
