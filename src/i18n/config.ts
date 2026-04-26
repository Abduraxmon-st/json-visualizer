export const locales = ["uz", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

export const localeLabels: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

export const localeNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const [, maybeLocale] = pathname.split("/");
  return maybeLocale && isLocale(maybeLocale) ? maybeLocale : null;
}

export function pathnameWithoutLocale(pathname: string) {
  const segments = pathname.split("/");
  const [, maybeLocale] = segments;

  if (!maybeLocale || !isLocale(maybeLocale)) {
    return pathname || "/";
  }

  const path = `/${segments.slice(2).join("/")}`;
  return path === "/" ? "/" : path.replace(/\/$/, "");
}

export function localizePathname(pathname: string, locale: Locale) {
  const cleanPathname = pathnameWithoutLocale(pathname);
  return cleanPathname === "/" ? `/${locale}` : `/${locale}${cleanPathname}`;
}
