export type BlogPillar = "locations" | "logistics" | "culture" | "guides";

export type BlogContentSize = "square" | "wide" | "tall";

export interface BlogAuthor {
  name: string;
  role: string;
  avatarUrl?: string;
}

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; url: string; caption?: string; fullBleed?: boolean }
  | { type: "callout"; text: string };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  pillar: BlogPillar;
  publishDate: string;
  readingTime: number;
  featuredImageUrl: string;
  imageAlt: string;
  targetKeyword: string;
  excerpt: string;
  href: string;
  size: BlogContentSize;
  author?: BlogAuthor;
  content: BlogContentBlock[];
  relatedImages: { url: string; caption?: string }[];
  relatedPostIds: string[];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return blogPosts.filter((p) => post.relatedPostIds.includes(p.id));
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "5-locations-brazil-global-brands",
    title: "5 Locations in Brazil Global Brands Haven't Discovered Yet",
    metaTitle: "5 Hidden Filming Locations in Brazil | Ghost Studio",
    metaDescription: "Beyond Christ the Redeemer — discover Guanabara Bay, the Amazon delta, and 3 hidden gems offering world-class production value at a fraction of Western costs.",
    pillar: "locations",
    publishDate: "15 Jan 2025",
    readingTime: 6,
    featuredImageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&q=80",
    imageAlt: "Aerial view of Rio de Janeiro coastline at sunset with mountains in background",
    targetKeyword: "filming locations Brazil",
    excerpt: "Beyond Christ the Redeemer — Rio's Guanabara Bay, the Amazon delta, and three hidden gems that offer world-class production value at a fraction of Western costs.",
    href: "/blog/5-locations-brazil-global-brands",
    size: "wide",
    author: { name: "Ghost Studio", role: "Production" },
    content: [
      { type: "heading", level: 2, text: "Why Location Matters More Than Budget" },
      { type: "paragraph", text: "When international brands think about filming in Brazil, they picture the same three images: Christ the Redeemer, Copacabana Beach, and maybe the Amazon canopy. But Brazil's real production value lies in locations that most foreign producers have never considered — places that offer visual distinction, logistical access, and cost efficiency that Western European and North American locations simply can't match." },
      { type: "paragraph", text: "Over the past decade, Ghost Studio has produced campaigns, events, and content across Brazil. Here are five locations that consistently deliver results for international clients — and why they should be on your production radar." },
      { type: "heading", level: 2, text: "1. Guanabara Bay, Rio de Janeiro" },
      { type: "paragraph", text: "Guarabara Bay offers something rare: a dramatic waterfront backdrop within minutes of Rio's production infrastructure. The bay's industrial edges — shipyards, old warehouses, dock cranes — create an aesthetic that reads as authentic and cinematic, far from the polished resort look that screams stock footage." },
      { type: "image", url: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=1200&q=80", caption: "Guanabara Bay at golden hour — industrial texture meets dramatic light", fullBleed: true },
      { type: "paragraph", text: "For brand films and fashion shoots, the bay's changing light — from harsh midday to the warm amber of late afternoon — provides natural variety without moving the crew. Permits are straightforward, and local production support is well-established from decades of international film work." },
      { type: "heading", level: 2, text: "2. The Amazon Delta, Pará" },
      { type: "paragraph", text: "The Amazon isn't just rainforest. The delta region near Belém offers a visual language that most audiences have never seen: river communities on stilts, floating markets, mangrove forests meeting open water, and a quality of light filtered through perpetual humidity that creates a soft, almost painterly atmosphere." },
      { type: "callout", text: "Why this matters for your production: The Amazon delta is logistically accessible from Belém (direct flights from Miami and Lisbon), and Ghost Studio has established relationships with local fixers who handle permits, transport, and community engagement. This isn't expedition production — it's manageable, repeatable, and visually extraordinary." },
      { type: "heading", level: 2, text: "3. Chapada Diamantina, Bahia" },
      { type: "paragraph", text: "This national park in interior Bahia looks like it belongs in Patagonia or the American Southwest — dramatic table-top mountains, crystal-clear natural pools, caves with underground waterfalls, and vast plateaus covered in cactus. The visual contrast with typical 'tropical Brazil' imagery makes it powerful for brands wanting to challenge expectations." },
      { type: "heading", level: 2, text: "4. Northeast Coastline, Bahia & Pernambuco" },
      { type: "paragraph", text: "Beyond the famous beaches of Porto de Galinhas and Jericoacoara, the northeastern coast offers coconut palm-lined shores, historic colonial towns (Salvador's Pelourinho is a UNESCO site), and a cultural richness — Afro-Brazilian traditions, capoeira, candomblé — that adds depth to any production. The light here is consistently warm and golden, ideal for beauty and lifestyle content." },
      { type: "image", url: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=1200&q=80", caption: "Northeast Brazil — where colonial architecture meets tropical coastline", fullBleed: true },
      { type: "heading", level: 2, text: "5. São Paulo's Industrial South" },
      { type: "paragraph", text: "São Paulo's southern industrial zone — warehouses, factories, street art corridors — has become a go-to for fashion and automotive brands shooting in Brazil. The texture is raw, urban, and distinctly non-tropical, which is exactly why it works. It reads as global, modern, and edgy." },
      { type: "callout", text: "Why this matters for your production: Ghost Studio is based in São Paulo. Our home turf means zero travel logistics, instant access to equipment rental, and a crew that knows every alley and warehouse worth shooting in. When clients need fast turnarounds or multi-day shoots, our local advantage becomes your cost advantage." },
      { type: "heading", level: 3, text: "Ready to Scout?" },
      { type: "paragraph", text: "Every location has its own permit requirements, seasonal considerations, and logistical nuances. Ghost Studio handles the full production pipeline — from initial scout to final delivery — so you can focus on the creative." },
    ],
    relatedImages: [
      { url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80", caption: "Chapada Diamantina table-top mountains" },
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", caption: "Northeast coastline at sunset" },
    ],
    relatedPostIds: ["3", "4"],
  },
  {
    id: "2",
    slug: "film-production-incentives-brazil",
    title: "Film Production Incentives in Brazil: A Complete Guide",
    metaTitle: "Brazil Film Production Incentives & Tax Rebates | Ghost Studio",
    metaDescription: "Brazil's Lei do Audiovisual offers up to 20% cash back on qualified production spend. Navigate ANCINE registration, tax rebates, and work visas.",
    pillar: "logistics",
    publishDate: "22 Feb 2025",
    readingTime: 8,
    featuredImageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
    imageAlt: "Professional film crew setting up equipment on location in Brazil",
    targetKeyword: "film production incentives Brazil",
    excerpt: "Brazil's Lei do Audiovisual offers up to 20% cash back on qualified production spend. Here's how foreign crews navigate ANCINE registration, tax rebates, and work visas.",
    href: "/blog/film-production-incentives-brazil",
    size: "tall",
    author: { name: "Ghost Studio", role: "Production" },
    content: [
      { type: "heading", level: 2, text: "The Financial Case for Producing in Brazil" },
      { type: "paragraph", text: "Brazil isn't just competitively priced — it actively subsidizes foreign production through the Lei do Audiovisual (Audiovisual Law), administered by ANCINE (the National Cinema Agency). For qualifying productions, this means direct cash rebates of up to 20% on qualified Brazilian spend, plus additional benefits through state-level incentive programs." },
      { type: "paragraph", text: "This guide covers what foreign producers need to know: eligibility, the registration process, qualified expenses, work visa requirements, and practical tips from Ghost Studio's experience navigating the system for international clients." },
      { type: "heading", level: 2, text: "Lei do Audiovisual: The Basics" },
      { type: "paragraph", text: "The Lei do Audiovisual (Law 13.109/2015 and subsequent regulations) provides a cash rebate mechanism for audiovisual productions that spend a minimum threshold in Brazil. The rebate rate is 20% on qualified expenses, capped at BRL 5 million per project (approximately USD 1 million at current exchange rates)." },
      { type: "callout", text: "Why this matters for your production: A 20% rebate on Brazilian spend can offset significant production costs — crew, equipment rental, locations, catering, accommodation. For a production spending USD 200,000 in Brazil, that's potentially USD 40,000 back. Combined with competitive local rates, the effective cost reduction is substantial." },
      { type: "heading", level: 2, text: "Eligibility Requirements" },
      { type: "paragraph", text: "To qualify for the rebate, productions must meet several criteria: minimum Brazilian spend threshold, registration with ANCINE before production begins, use of Brazilian service providers for qualified expenses, and submission of complete documentation within 12 months of production completion." },
      { type: "paragraph", text: "Eligible productions include feature films, documentaries, TV series, commercials, and corporate content — though the specific requirements vary by format. Ghost Studio handles the ANCINE registration process as part of our production package, ensuring compliance from day one." },
      { type: "heading", level: 2, text: "Work Visas for Foreign Crew" },
      { type: "paragraph", text: "Foreign crew members working in Brazil need proper work authorization. The most common pathway is the VITEM V (work visa), which requires a job offer from a Brazilian entity and ANCINE approval for audiovisual productions. Processing time is typically 2-4 weeks, though expedited processing is available." },
      { type: "paragraph", text: "For shorter assignments (under 90 days), some crew members may qualify for temporary work permits. Ghost Studio's production management team handles all visa coordination, including document preparation and ANCINE submissions." },
      { type: "heading", level: 2, text: "State-Level Incentives" },
      { type: "paragraph", text: "Beyond the federal Lei do Audiovisual, several Brazilian states offer additional incentives for audiovisual production. Rio de Janeiro, São Paulo, Bahia, and Paraná all have programs that can stack with the federal rebate, further reducing effective costs." },
      { type: "image", url: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1200&q=80", caption: "Production planning session — Ghost Studio office, São Paulo", fullBleed: true },
      { type: "heading", level: 3, text: "Let Us Handle the Paperwork" },
      { type: "paragraph", text: "Navigating ANCINE registrations, visa applications, and state incentive programs requires local expertise. Ghost Studio manages the full administrative pipeline, so your team can focus on creative decisions while we ensure every rebate opportunity is captured." },
    ],
    relatedImages: [
      { url: "https://images.unsplash.com/photo-1585644198527-f01326c42e2a?w=600&q=80", caption: "Equipment prep for international shoot" },
      { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", caption: "Local crew member on set" },
    ],
    relatedPostIds: ["1", "3"],
  },
  {
    id: "3",
    slug: "local-expertise-more-than-cost-savings",
    title: "Why Local Expertise Matters More Than Cost Savings",
    metaTitle: "Local Production Crew Value Brazil | Ghost Studio",
    metaDescription: "Bilingual crews, local permits knowledge, and cultural fluency — the real value of producing in Brazil isn't just the exchange rate.",
    pillar: "culture",
    publishDate: "10 Mar 2025",
    readingTime: 5,
    featuredImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    imageAlt: "Diverse production team collaborating on set in Rio de Janeiro",
    targetKeyword: "production crew Brazil",
    excerpt: "Bilingual crews, local permits knowledge, and cultural fluency — the real value of producing in Brazil isn't just the exchange rate.",
    href: "/blog/local-expertise-more-than-cost-savings",
    size: "square",
    author: { name: "Ghost Studio", role: "Production" },
    content: [
      { type: "heading", level: 2, text: "The Hidden Cost of 'Cheap Production'" },
      { type: "paragraph", text: "International brands often approach Brazil seduced by the exchange rate. And yes, the financial advantage is real — Brazilian production rates run 30-50% below Western European equivalents for comparable quality. But the real value of producing in Brazil isn't the discount. It's the expertise that turns a cost saving into a creative advantage." },
      { type: "paragraph", text: "When you bring a foreign crew to Brazil without local partners, you're paying for flights, accommodation, per diems, and the learning curve of navigating a new country. When you work with Ghost Studio, you're accessing a bilingual, bicultural production team that eliminates the friction entirely." },
      { type: "heading", level: 2, text: "Bilingual Communication" },
      { type: "paragraph", text: "Every member of Ghost Studio's core team is fluent in English and Portuguese. This isn't a nice-to-have — it's the difference between a shoot where instructions get lost in translation and one where every department head understands the creative brief instantly. Our directors, producers, and department heads can communicate directly with international clients without interpreters." },
      { type: "heading", level: 2, text: "Permits and Bureaucracy" },
      { type: "paragraph", text: "Brazilian permit processes are notoriously complex — different rules for each municipality, overlapping jurisdictions, and documentation requirements that change without notice. Ghost Studio's production management team maintains relationships with permit offices across Rio, São Paulo, and Bahia. We know which offices move fast, which documents they actually check, and how to expedite when timelines are tight." },
      { type: "callout", text: "Why this matters for your production: A permit delay can cost a day of shooting — easily USD 20,000-50,000 in crew costs, equipment rental, and location fees. Ghost Studio's local relationships and permit expertise eliminate this risk. We've never lost a shooting day to permit issues." },
      { type: "heading", level: 2, text: "Cultural Fluency" },
      { type: "paragraph", text: "Brazilian production culture operates differently from European or American sets. The rhythm of work, the social dynamics, the way departments interact — understanding these nuances prevents the friction that slows down international productions. Our team bridges both worlds, ensuring that international creative standards are met while respecting local working customs." },
      { type: "image", url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80", caption: "Ghost Studio team during pre-production planning", fullBleed: true },
      { type: "heading", level: 3, text: "The Right Partner" },
      { type: "paragraph", text: "Cost savings are the entry point. Expertise is the value. Ghost Studio delivers both — competitive Brazilian rates backed by the local knowledge that ensures your production runs on time, on budget, and at the creative standard your brand demands." },
    ],
    relatedImages: [
      { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", caption: "On-set collaboration between local and international team" },
      { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", caption: "Ghost Studio production office" },
    ],
    relatedPostIds: ["2", "4"],
  },
  {
    id: "4",
    slug: "plan-corporate-event-rio-guide",
    title: "How to Plan a Corporate Event in Rio: A Practical Guide",
    metaTitle: "Corporate Event Planning Rio de Janeiro Guide | Ghost Studio",
    metaDescription: "From venue selection to catering logistics — a step-by-step framework for international brands planning events in Rio de Janeiro.",
    pillar: "guides",
    publishDate: "25 Mar 2025",
    readingTime: 7,
    featuredImageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    imageAlt: "Elegant corporate event setup with Rio skyline backdrop at dusk",
    targetKeyword: "corporate event Rio de Janeiro",
    excerpt: "From venue selection to catering logistics — a step-by-step framework for international brands planning events in Rio de Janeiro.",
    href: "/blog/plan-corporate-event-rio-guide",
    size: "square",
    author: { name: "Ghost Studio", role: "Production" },
    content: [
      { type: "heading", level: 2, text: "Why Rio for Your Next Corporate Event" },
      { type: "paragraph", text: "Rio de Janeiro offers something few cities can match: a dramatic natural setting that elevates any event from ordinary to memorable. Imagine a product launch against the backdrop of Guanabara Bay, a leadership retreat with mountain views from a hilltop venue, or a client dinner on a rooftop overlooking Copacabana. The visual impact alone justifies the location choice — and the logistical advantages make it practical." },
      { type: "paragraph", text: "This guide walks through the key decisions for international brands planning corporate events in Rio: venue selection, timing, logistics, catering, and the local partnerships that make execution seamless." },
      { type: "heading", level: 2, text: "Step 1: Define Your Event Format" },
      { type: "paragraph", text: "Before choosing a venue, clarify the event type. Rio excels at several formats, each with different venue requirements:" },
      { type: "paragraph", text: "• Product launches and press events — need AV infrastructure, media access, and brandable spaces\n• Executive retreats — prioritize privacy, comfort, and breakout spaces\n• Client entertainment — leverage Rio's natural beauty for experiential moments\n• Team-building events — outdoor activities, cultural experiences, adventure elements" },
      { type: "heading", level: 2, text: "Step 2: Venue Selection" },
      { type: "paragraph", text: "Rio's venue landscape ranges from iconic hotels (Copacabana Palace, Fasano) to industrial warehouses in Porto Maravilha, hilltop estates in Santa Teresa, and beachfront spaces in Barra da Tijuca. The right choice depends on your event format, guest count, and brand positioning." },
      { type: "callout", text: "Why this matters for your production: Ghost Studio maintains relationships with over 30 venues across Rio. We can match your event format and brand aesthetic to the right space, negotiate favorable rates, and handle all venue logistics — from AV setup to permit coordination." },
      { type: "heading", level: 2, text: "Step 3: Timing and Weather" },
      { type: "paragraph", text: "Rio's climate is tropical, with distinct seasons that affect event planning:" },
      { type: "paragraph", text: "• December-March: Summer — hot (30-40°C), humid, peak tourist season. Best for beach-adjacent events.\n• April-June: Autumn — mild (20-28°C), lower humidity, ideal for outdoor events.\n• July-September: Winter — cool (18-25°C), dry season, perfect for rooftop and hilltop venues.\n• October-November: Spring — warming up, occasional rain, good balance of weather and availability." },
      { type: "heading", level: 2, text: "Step 4: Catering and Entertainment" },
      { type: "paragraph", text: "Rio's culinary scene ranges from traditional churrascarias to world-class contemporary restaurants. For corporate events, we typically recommend a mix of Brazilian and international options — it signals cultural appreciation while ensuring all guests feel comfortable. Live music (bossa nova, samba, MPB) adds authentic atmosphere without overwhelming conversation." },
      { type: "image", url: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80", caption: "Brazilian cuisine presentation at corporate event", fullBleed: true },
      { type: "heading", level: 2, text: "Step 5: Production and Technical Requirements" },
      { type: "paragraph", text: "Every event needs AV, lighting, staging, and possibly live streaming. Rio has robust production infrastructure — Ghost Studio's equipment network includes everything from LED walls to professional sound systems. We handle technical riders, vendor coordination, and on-site management so your event runs without technical hiccups." },
      { type: "heading", level: 3, text: "Let's Plan Your Event" },
      { type: "paragraph", text: "Ghost Studio handles end-to-end event production in Rio de Janeiro — from initial concept and venue scouting through technical execution and post-event content delivery. We've produced events for international brands across technology, automotive, fashion, and financial services." },
    ],
    relatedImages: [
      { url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80", caption: "Evening event with city skyline backdrop" },
      { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", caption: "Fine dining setup for corporate reception" },
    ],
    relatedPostIds: ["1", "2"],
  },
];
