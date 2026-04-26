import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

const localeCookieName = "NEXT_LOCALE";

function getLocaleFromAcceptLanguage(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");

  if (!header) {
    return defaultLocale;
  }

  const languages = header
    .split(",")
    .map((language) => language.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const language of languages) {
    const baseLanguage = language.split("-")[0];
    if (isLocale(baseLanguage)) {
      return baseLanguage;
    }
  }

  return defaultLocale;
}

function getPreferredLocale(request: NextRequest): Locale {
  const localeCookie = request.cookies.get(localeCookieName)?.value;

  if (localeCookie && isLocale(localeCookie)) {
    return localeCookie;
  }

  return getLocaleFromAcceptLanguage(request);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
