import uz from "./dictionaries/uz.json";
import type { Locale } from "./config";

export type Dictionary = typeof uz;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  uz: () => import("./dictionaries/uz.json").then((module) => module.default),
  ru: () => import("./dictionaries/ru.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
