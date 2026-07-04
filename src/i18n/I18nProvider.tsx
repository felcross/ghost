"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { dictionaries, defaultLocale, getNestedValue, type Locale } from "./config";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => unknown[];
  tObject: (key: string) => Record<string, unknown>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("en")) return "en";
  return defaultLocale;
}

function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("ghost-studio-locale") as Locale | null;
  if (stored && ["pt", "en", "zh"].includes(stored)) return stored;
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredLocale();
    if (stored) {
      setLocaleState(stored);
    } else {
      setLocaleState(detectBrowserLocale());
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("ghost-studio-locale", newLocale);
    document.documentElement.lang = newLocale === "pt" ? "pt-BR" : newLocale;
  };

  const t = (key: string): string => {
    const value = getNestedValue(dictionaries[locale], key);
    if (typeof value === "string") return value;
    return key;
  };

  const tArray = (key: string): unknown[] => {
    const value = getNestedValue(dictionaries[locale], key);
    if (Array.isArray(value)) return value;
    return [];
  };

  const tObject = (key: string): Record<string, unknown> => {
    const value = getNestedValue(dictionaries[locale], key);
    if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
    return {};
  };

  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: defaultLocale, setLocale, t, tArray, tObject }}>
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tArray, tObject }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
