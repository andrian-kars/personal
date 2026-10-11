import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { en } from "../content/en";
import { es } from "../content/es";
import { engagements, identity, measurements } from "../data/portfolio";
import { localeCookie, localePath, locales } from "../i18n/config";

const sharedValues = new Set<string>();
const collect = (value: unknown) => {
  if (typeof value === "string") sharedValues.add(value);
  else if (value && typeof value === "object") Object.values(value).forEach(collect);
};
[identity, engagements, measurements].forEach(collect);
const sharedKeys = new Set(["id", "code", "year", "start", "end"]);
// Proper names that deliberately stay in English on the Spanish page and CV.
const intentionalEnglish = new Set([
  "Senior Full-Stack Developer",
  "Front-End Architecture Consultant",
  "Senior Front-End Developer",
  "Full-Stack Engineer",
  "Independent Software Engineer",
  "Certificates Platform",
  "Import Tool",
  "Agency One",
  "Sagitta",
  "Senior Engineer Growth Program",
  "GitHub Copilot",
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Redux Toolkit",
  "TanStack Query",
  "React Router",
  "SCSS / CSS Modules",
  "C#",
  ".NET",
  "ASP.NET Core",
  "Node.js",
  "NestJS",
  "Express",
  "Jest",
  "React Testing Library",
  "Playwright",
  "Git / GitLab",
  "CI/CD",
  "Vite",
  "Webpack",
]);

/** Walks both dictionaries together, returning problems and the English strings that were translated. */
function compareDictionaries() {
  const problems: string[] = [];
  const translated: string[] = [];
  const walk = (english: unknown, spanish: unknown, path: string, key: string) => {
    if (typeof english === "string") {
      if (typeof spanish !== "string") problems.push(`${path}: missing`);
      else if (sharedKeys.has(key) || sharedValues.has(english)) {
        if (english !== spanish) problems.push(`${path}: shared value changed`);
      } else if (english === spanish) {
        if (!intentionalEnglish.has(english)) problems.push(`${path}: untranslated`);
      } else translated.push(english);
      return;
    }
    if (Array.isArray(english)) {
      if (!Array.isArray(spanish) || spanish.length !== english.length) {
        problems.push(`${path}: length differs`);
        return;
      }
      english.forEach((item, index) =>
        walk(item, spanish[index], `${path}[${index}]`, key),
      );
      return;
    }
    if (english && typeof english === "object") {
      const other = (spanish ?? {}) as Record<string, unknown>;
      for (const name of new Set([...Object.keys(english), ...Object.keys(other)])) {
        if (!(name in english) || !(name in other))
          problems.push(`${path}.${name}: key differs`);
        else
          walk(
            (english as Record<string, unknown>)[name],
            other[name],
            `${path}.${name}`,
            name,
          );
      }
    }
  };
  walk(en, es, "content", "");
  return { problems, translated };
}

test("Spanish matches the English structure and translates every sentence", () => {
  expect(compareDictionaries().problems).toEqual([]);
});

test("negotiates only the root without caching preferences or looping", async ({
  request,
}) => {
  for (const [header, cookie, agent, destination] of [
    ["es-ES,es;q=0.9,en;q=0.8", "", "Mozilla/5.0", "/es"],
    ["en-GB,en;q=0.9,es;q=0.5", "", "Mozilla/5.0", null],
    ["es;q=0,en;q=0.8", "", "Mozilla/5.0", null],
    ["fr-FR", "", "Mozilla/5.0", null],
    ["gl-ES,gl;q=0.9", "", "Mozilla/5.0", "/es"],
    ["ca-ES,ca;q=0.9,en;q=0.8", "", "Mozilla/5.0", "/es"],
    ["en-GB,en;q=0.9,gl;q=0.8", "", "Mozilla/5.0", null],
    ["es", `${localeCookie}=en`, "Mozilla/5.0", null],
    ["en", `${localeCookie}=es`, "Mozilla/5.0", "/es"],
    ["es", `${localeCookie}=es`, "Googlebot", null],
    ["es", "", "LinkedInBot", null],
  ] as const) {
    const response = await request.get("/", {
      maxRedirects: 0,
      headers: { "Accept-Language": header, Cookie: cookie, "User-Agent": agent },
    });
    expect(response.status()).toBe(destination ? 307 : 200);
    if (destination) {
      expect(response.headers()["cache-control"]).toContain("private, no-store");
      expect(new URL(response.headers().location, response.url()).pathname).toBe(
        destination,
      );
    } else expect(await response.text()).toContain('lang="en"');
  }
  const alias = await request.get("/en", { headers: { "Accept-Language": "es" } });
  expect(alias.status()).toBe(200);
  expect(await alias.text()).toContain('rel="canonical" href="https://andrian-kars.com"');
  const spanish = await request.get("/es", { headers: { Cookie: `${localeCookie}=en` } });
  expect(spanish.status()).toBe(200);
  expect(await spanish.text()).toContain('lang="es"');
});

for (const locale of locales) {
  const content = locale === "en" ? en : es;
  const path = localePath(locale);
  test(`${locale}: downloads the matching verified CV`, async ({ page, request }) => {
    const response = await request.get(content.profile.cv, {
      headers: { "Accept-Language": locale === "en" ? "es" : "en" },
    });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const hashes = {
      en: "ba7e20198d72dd22b3409ee6a21149d3143696160038849f8948baf3d80af06b",
      es: "d30b1d8a6c27c6e99a9735c492a7c06305839f84ae1485cc7a758c3016fee62f",
    };
    expect(
      createHash("sha256")
        .update(await response.body())
        .digest("hex"),
    ).toBe(hashes[locale]);
    await page.goto(path);
    const downloadPromise = page.waitForEvent("download");
    await page
      .getByRole("link", { name: `${content.navigation.download} (PDF)`, exact: true })
      .click();
    expect((await downloadPromise).suggestedFilename()).toBe(content.profile.cvFileName);
    await expect(
      page.getByRole("link", { name: `${content.ui.otherCv} (PDF)`, exact: true }),
    ).toHaveAttribute("href", locale === "en" ? es.profile.cv : en.profile.cv);
  });

  test(`${locale}: localized metadata, content and images`, async ({ page, request }) => {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page).toHaveTitle(`${content.profile.name} | ${content.profile.role}`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      locale === "en" ? en.profile.url : `${en.profile.url}/es`,
    );
    for (const [language, href] of [
      ["en", en.profile.url],
      ["es", `${en.profile.url}/es`],
      ["x-default", en.profile.url],
    ]) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${language}"]`),
      ).toHaveAttribute("href", href);
    }
    const schema = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    expect(schema.inLanguage).toBe(locale);
    expect(schema.mainEntity["@id"]).toBe(`${en.profile.url}/#person`);
    expect(schema.mainEntity.knowsLanguage).toEqual(["en", "de", "ja"]);
    expect(schema.mainEntity.homeLocation.name).toBe(content.profile.location);
    await expect(page.locator("#contact")).toContainText(content.ui.communication);
    await expect(page.locator("#contact")).toContainText(content.ui.availability);
    await expect(
      page.getByRole("link", {
        name: `${content.navigation.download} (PDF)`,
        exact: true,
      }),
    ).toHaveAttribute("href", content.profile.cv);
    const imageUrl = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(imageUrl).toContain(
      locale === "es" ? "/opengraph-image/es" : "/opengraph-image",
    );
    const image = await request.get(new URL(imageUrl!).pathname);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
    await expect(page.locator("#experience time").first()).toHaveText(
      locale === "en" ? "Sep 2025" : "sept 2025",
    );
    await expect(page.locator("#contact h2 > span")).toHaveText(".");
    await expect(page.locator("#contact li")).toHaveText([
      content.ui.availability,
      content.ui.communication,
    ]);
    if (locale === "es") {
      const { translated } = compareDictionaries();
      const { nodes, attributes } = await page.evaluate(() => {
        const walker = document.createTreeWalker(
          document.documentElement,
          NodeFilter.SHOW_TEXT,
        );
        const nodes: string[] = [];
        while (walker.nextNode()) nodes.push(walker.currentNode.textContent!.trim());
        const attributes = [
          ...document.querySelectorAll("[alt], [aria-label], meta[content]"),
        ]
          .map((element) =>
            ["alt", "aria-label", "content"].map(
              (name) => element.getAttribute(name) ?? "",
            ),
          )
          .flat();
        return { nodes, attributes };
      });
      const textNodes = new Set(nodes);
      const leaks = translated.filter(
        (english) =>
          textNodes.has(english) ||
          (english.length >= 8 && attributes.some((value) => value.includes(english))),
      );
      expect(leaks).toEqual([]);
    }
  });

  test(`${locale}: accessible layout and disclosure without overflow`, async ({
    page,
  }, testInfo) => {
    await page.goto(path);
    await page.locator("summary").click();
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    if (testInfo.project.name !== "chromium") return;
    for (const width of [320, 390, 640, 768, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      ).toBe(true);
      const header = await page.locator("header").boundingBox();
      const links = await page.locator("header a").evaluateAll((elements) =>
        elements.map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          };
        }),
      );
      for (const [index, link] of links.entries()) {
        expect(link.left).toBeGreaterThanOrEqual(0);
        expect(link.right).toBeLessThanOrEqual(width);
        for (const other of links.slice(index + 1)) {
          expect(
            link.left < other.right &&
              link.right > other.left &&
              link.top < other.bottom &&
              link.bottom > other.top,
          ).toBe(false);
        }
      }
      await page.screenshot({ path: testInfo.outputPath(`${locale}-${width}.png`) });
      await page
        .locator("header")
        .getByRole("link", { name: content.navigation.links[0].label, exact: true })
        .click();
      await expect
        .poll(async () => {
          const section = await page.locator("#impact").boundingBox();
          return Math.abs(section!.y - header!.height);
        })
        .toBeLessThanOrEqual(2);
    }
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("header")).toBeHidden();
    await expect(page.getByText(content.ui.communication)).toBeVisible();
  });
}

test("switches language with the current section and remembers the choice", async ({
  page,
  context,
}) => {
  await page.goto("/#experience");
  await page.getByRole("link", { name: "ES (Español)", exact: true }).click();
  await expect(page).toHaveURL(/\/es#experience$/);
  expect(
    (await context.cookies()).find((cookie) => cookie.name === localeCookie)?.value,
  ).toBe("es");
  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
  await page.getByRole("link", { name: "EN (English)", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(
    (await context.cookies()).find((cookie) => cookie.name === localeCookie)?.value,
  ).toBe("en");
});

test("language links and Spanish disclosure work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    locale: "es-ES",
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/es$/);
    await page.locator("summary").click();
    await expect(page.locator("details ul")).toBeVisible();
    await page.getByRole("link", { name: "EN (English)", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  } finally {
    await context.close();
  }
});

test("sitemap lists both canonical languages without internal aliases", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  const xml = await response.text();
  expect(xml.match(/<loc>/g)).toHaveLength(2);
  expect(xml).toContain('<xhtml:link rel="alternate" hreflang="es"');
  expect(xml).not.toContain("andrian-kars.com/en");
});

test("404 pages are server-rendered, branded and in the right language", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    for (const [path, locale] of [
      ["/missing-page", "en"],
      ["/es/missing-page", "es"],
      ["/old-page.html", "en"],
      ["/es/old-cv.pdf", "es"],
      ["/en/missing-page", "en"],
      ["/es/es", "es"],
    ] as const) {
      const content = locale === "en" ? en : es;
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(404);
      await expect(page.locator("html"), path).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 }), path).toHaveText(
        content.ui.notFound.title,
      );
      await expect(page.locator("header nav").first(), path).toBeVisible();
      await expect(
        page.getByRole("link", { name: content.ui.notFound.home }),
        path,
      ).toHaveAttribute("href", localePath(locale));
      await expect(page.locator('meta[name="robots"]'), path).toHaveAttribute(
        "content",
        /noindex/,
      );
    }
  } finally {
    await context.close();
  }
});
