import { NextResponse, type NextRequest } from "next/server";
import {
  isLocale,
  localeCookie,
  localeHeader,
  localePath,
  type Locale,
} from "@/i18n/config";

const crawlers =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|discord|embedly|lighthouse/i;

// Galician, Catalan, Basque and Asturian readers in Spain get the Spanish edition.
const spanishRegional = new Set(["gl", "ca", "eu", "ast"]);

export function preferredLocale(header: string | null): Locale {
  const choices = (header ?? "")
    .split(",")
    .map((entry, order) => {
      const [tag, ...parameters] = entry.trim().split(";");
      const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const language = tag.toLowerCase().split("-")[0];
      return {
        locale: spanishRegional.has(language) ? "es" : language,
        weight: quality ? Number(quality.trim().slice(2)) : 1,
        order,
      };
    })
    .filter(({ locale, weight }) => isLocale(locale) && weight > 0 && weight <= 1)
    .sort((first, second) => second.weight - first.weight || first.order - second.order);
  return choices[0]?.locale === "es" ? "es" : "en";
}

function privateResponse(response: NextResponse) {
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Accept-Language, Cookie, User-Agent");
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const selection = request.nextUrl.searchParams.get("language");
  if ((pathname === "/" || pathname === "/es") && isLocale(selection)) {
    const target = request.nextUrl.clone();
    target.pathname = localePath(selection);
    target.searchParams.delete("language");
    const response = privateResponse(NextResponse.redirect(target, 307));
    response.cookies.set(localeCookie, selection, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
      httpOnly: true,
      secure: request.nextUrl.protocol === "https:",
    });
    return response;
  }
  if (pathname === "/" && !crawlers.test(request.headers.get("user-agent") ?? "")) {
    const saved = request.cookies.get(localeCookie)?.value;
    const locale = isLocale(saved)
      ? saved
      : preferredLocale(request.headers.get("accept-language"));
    if (locale === "es") {
      const target = request.nextUrl.clone();
      target.pathname = "/es";
      return privateResponse(NextResponse.redirect(target, 307));
    }
  }
  const segment = pathname.split("/")[1];
  const locale = isLocale(segment) ? segment : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(localeHeader, locale);
  if (isLocale(segment))
    return NextResponse.next({ request: { headers: requestHeaders } });
  const target = request.nextUrl.clone();
  target.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(target, { request: { headers: requestHeaders } });
}

export const config = {
  // Dotted paths are skipped as files, except under /es so Spanish 404s stay Spanish.
  matcher: ["/((?!_next|opengraph-image|icon(?:/|$)|.*\\.).*)", "/es/:path*"],
};
