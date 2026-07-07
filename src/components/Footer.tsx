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
    <footer className="py-12 lg:py-16 bg-light-bg border-t border-border-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <a href="#" className="inline-block mb-4">
              <span className="font-[family-name:var(--font-inter)] text-2xl font-black tracking-tight text-text-on-light">
                GHOST STUDIO
              </span>
            </a>
            <p className="text-text-on-light-muted text-sm leading-relaxed">
              {t("footer.tagline1")}
              <br />
              {t("footer.tagline2")}
            </p>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-sm font-bold text-text-on-light mb-4 tracking-widest uppercase">
              {t("footer.links")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#work" className="text-text-on-light-muted text-sm hover:text-text-on-light transition-colors">
                  {t("footer.work")}
                </a>
              </li>
              <li>
                <a href="#services" className="text-text-on-light-muted text-sm hover:text-text-on-light transition-colors">
                  {t("footer.services")}
                </a>
              </li>
              <li>
                <a href="#about" className="text-text-on-light-muted text-sm hover:text-text-on-light transition-colors">
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-text-on-light-muted text-sm hover:text-text-on-light transition-colors">
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-sm font-bold text-text-on-light mb-4 tracking-widest uppercase">
              {t("footer.social")}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-overlay-light flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Camera size={18} className="text-text-on-light" />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-overlay-light flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} className="text-text-on-light" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-inter)] text-sm font-bold text-text-on-light mb-4 tracking-widest uppercase">
              {t("footer.newsletter")}
            </h4>
            <p className="text-text-on-light-muted text-sm mb-4">
              {t("footer.newsletterText")}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                required
                className="flex-1 bg-transparent border border-border-light px-4 py-2.5 text-text-on-light text-sm placeholder-text-on-light-subtle focus:border-accent focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-text-on-light text-white px-5 py-2.5 text-sm font-bold hover:bg-accent transition-colors"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border-light">
          <p className="text-text-on-light-subtle text-xs text-center tracking-widest">
            © {currentYear} GHOST STUDIO. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
