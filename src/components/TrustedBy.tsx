"use client";

const logos = [
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

export default function TrustedBy() {
  return (
    <section className="py-16 lg:py-24 bg-[#F5F2ED] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <p className="text-[#111111]/40 text-xs tracking-[0.3em] uppercase text-center">
          Trusted by
        </p>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F2ED] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F2ED] to-transparent z-10" />

        {/* Scrolling Container */}
        <div className="flex animate-scroll-left">
          {/* Duplicate for infinite effect */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex-shrink-0 px-8 lg:px-16 flex items-center justify-center"
            >
              <span className="font-[family-name:var(--font-inter)] text-xl lg:text-2xl font-black text-[#111111]/15 hover:text-[#111111]/40 transition-colors duration-500 whitespace-nowrap">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
