"use client";

import { motion } from "framer-motion";

interface Service {
  id: number;
  number: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    number: "01",
    title: "PRODUÇÃO",
    tags: ["Cinema", "Eventos", "Conteúdo", "Audiovisual"],
    description: "Produção completa de eventos, conteúdo audiovisual e experiências imersivas.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
  {
    id: 2,
    number: "02",
    title: "CRIAÇÃO",
    tags: ["Roteiro", "Storytelling", "Conceito", "Identidade"],
    description: "Desenvolvimento de conceitos criativos e identidades visuais marcantes.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    id: 3,
    number: "03",
    title: "DIREÇÃO",
    tags: ["Artística", "Fotografia", "Vídeo", "Campanha"],
    description: "Direção artística e fotográfica para campanhas e projetos especiais.",
    image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80",
  },
  {
    id: 4,
    number: "04",
    title: "PÓS-PRODUÇÃO",
    tags: ["Edição", "Color Grading", "VFX", "Motion"],
    description: "Edição, color grading e efeitos visuais para elevar o nível do seu projeto.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="mb-16">
          <p className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-4">
            ● Services
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-4xl lg:text-5xl font-black tracking-tight text-white">
            O QUE FAZEMOS
          </h2>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`py-8 lg:py-12 ${
                index < services.length - 1
                  ? "border-b border-dashed border-white/20"
                  : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side: Number + Title + Tags */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-[family-name:var(--font-inter)] text-5xl lg:text-6xl font-black text-[#FF4D1C]">
                      {service.number}
                    </span>
                    <h3 className="font-[family-name:var(--font-inter)] text-2xl lg:text-3xl font-black tracking-tight text-white">
                      {service.title}
                    </h3>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#1C1C1C] text-[#9A9A9A] text-xs tracking-wider rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[#9A9A9A] text-sm leading-relaxed max-w-md">
                    {service.description}
                  </p>
                </div>

                {/* Right Side: Image */}
                <div className="aspect-[16/10] bg-[#1C1C1C] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
