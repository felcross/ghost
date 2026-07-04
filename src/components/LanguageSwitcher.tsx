"use client";

import { useTranslation } from "@/i18n/I18nProvider";

const languages: { code: "pt" | "en" | "zh"; label: string; short: string }[] = [
  { code: "pt", label: "Português", short: "PT" },
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "中文", short: "中文" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`px-2 py-1 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
            locale === lang.code
              ? "bg-[#111111] text-white"
              : "text-[#111111]/40 hover:text-[#111111]"
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.short}
        </button>
      ))}
    </div>
  );
}
