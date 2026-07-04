"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "Quanto tempo leva um projeto?",
    answer: "Depende da escopo e complexidade, mas entregamos a maioria dos projetos em 2 a 8 semanas.",
  },
  {
    id: 2,
    question: "Trabalham com qualquer orçamento?",
    answer: "Projetos a partir de R$ 5.000. Cada projeto é orçado de acordo com suas necessidades específicas.",
  },
  {
    id: 3,
    question: "Fazem projetos fora de SP?",
    answer: "Sim, trabalhamos em todo o Brasil. Podemos enviar nossa equipe para qualquer cidade.",
  },
  {
    id: 4,
    question: "Como funciona o processo?",
    answer: "Briefing → Conceito → Produção → Entrega. Mantemos você envolvido em cada etapa.",
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-32 bg-[#F5F2ED]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side: Title + Image */}
          <div>
            <p className="text-[#FF4D1C] text-xs tracking-[0.3em] uppercase mb-4">
              ● FAQ
            </p>
            <h2 className="font-[family-name:var(--font-inter)] text-3xl lg:text-4xl font-black tracking-tight text-[#111111] mb-8">
              PERGUNTAS FREQUENTES
            </h2>

            <div className="aspect-[4/3] bg-[#111111]/10 overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80"
                alt="FAQ"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-[#111111]/10"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-6 flex items-center justify-between text-left"
                >
                  <span className="font-[family-name:var(--font-inter)] text-lg font-bold text-[#111111] pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openItem === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-[#111111]/40 flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#111111]/60 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
