"use client";

import { useState } from "react";
import { Camera, MessageCircle } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

export default function Footer() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Obrigado por se inscrever!");
    setEmail("");
  };

  return (
    <footer className="py-12 lg:py-16 bg-[#F5F2ED] border-t border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <a href="#" className="inline-block mb-4">
              <span className="font-[family-name:var(--font-inter)] text-2xl font-black tracking-tight text-[#111111]">
                GHOST STUDIO
              </span>
            </a>
            <p className="text-[#111111]/50 text-sm leading-relaxed">
              {t("footer.tagline1")}
              <br />
              {t("footer.tagline2")}
            </p>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#111111] mb-4 tracking-widest uppercase">
              {t("footer.links")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#work" className="text-[#111111]/50 text-sm hover:text-[#111111] transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#111111]/50 text-sm hover:text-[#111111] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#111111]/50 text-sm hover:text-[#111111] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#111111]/50 text-sm hover:text-[#111111] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#111111] mb-4 tracking-widest uppercase">
              {t("footer.social")}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111111]/5 flex items-center justify-center hover:bg-[#FF4D1C] hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Camera size={18} className="text-[#111111]" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#111111]/5 flex items-center justify-center hover:bg-[#FF4D1C] hover:text-white transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} className="text-[#111111]" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-sm font-bold text-[#111111] mb-4 tracking-widest uppercase">
              {t("footer.newsletter")}
            </h4>
            <p className="text-[#111111]/50 text-sm mb-4">
              {t("footer.newsletterText")}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                required
                className="flex-1 bg-transparent border border-[#111111]/20 px-4 py-2 text-[#111111] text-sm placeholder-[#111111]/30 focus:border-[#FF4D1C] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-[#111111] text-white px-4 py-2 text-sm font-bold hover:bg-[#FF4D1C] transition-colors"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[#111111]/10">
          <p className="text-[#111111]/30 text-xs text-center tracking-widest">
            © {currentYear} GHOST STUDIO. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
