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
          className={`min-w-[44px] min-h-[44px] flex items-center justify-center px-3 py-2 text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
            locale === lang.code
              ? "bg-text-on-light text-white"
              : "text-text-on-light-faint hover:text-text-on-light"
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.short}
        </button>
      ))}
    </div>
  );
}
