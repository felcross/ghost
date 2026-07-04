import pt from "./pt.json";
import en from "./en.json";
import zh from "./zh.json";

export type Locale = "pt" | "en" | "zh";

export const dictionaries: Record<Locale, typeof pt> = { pt, en, zh };

export const defaultLocale: Locale = "pt";

export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}
