import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("shows the agreed identity and evidence without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Andrian\s*Karsanashvili/,
  );
  await expect(page.locator("#about")).toContainText("Senior Full-Stack Engineer");
  await expect(page.locator("#about li").first()).toHaveText("AI-assisted engineering");
  await expect(page.locator("#ai-heading")).toContainText("People make the calls");
  await expect(page.locator("#experience")).toContainText(
    "submits team time reports automatically",
  );
  await expect(page.locator("#impact dl")).toContainText("200%+");
  await expect(page.locator("#case-architecture")).toContainText(
    "seven teams of five engineers",
  );
  await expect(page.locator("#impact")).not.toContainText("$200K");
  await expect(page.locator("#experience")).toContainText("Senior Full-Stack Developer");
  await expect(page.locator("#expertise")).toContainText("ASP.NET Core");
  expect(errors).toEqual([]);
});

test("presents the AI workflow in order with a human review gate", async ({ page }) => {
  await page.goto("/");
  const workflow = page.getByRole("article", {
    name: "AI agents with clear handoffs. People make the calls.",
  });
  await expect(workflow.getByRole("heading", { level: 3 })).toHaveText(
    "AI agents with clear handoffs. People make the calls.",
  );
  await expect(workflow.locator("ol > li h4")).toHaveText([
    "Legacy analysis",
    "Full-stack design",
    "Implementation",
    "Review",
  ]);
  await expect(workflow).toContainText("Human review gates");
});

test("exposes clean accessible text for the name and specialties", async ({ page }) => {
  await page.goto("/");
  expect(await page.locator("h1").textContent()).toBe("Andrian Karsanashvili");
  const specialties = await page.locator("#about ul").first().ariaSnapshot();
  expect(specialties).not.toContain("/");
  expect(specialties).toContain("C# & .NET");
});

test("keeps every in-page link pointed at a unique, existing target", async ({
  page,
}) => {
  await page.goto("/");
  const { missing, duplicates } = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    const targets = [...document.querySelectorAll<HTMLAnchorElement>("a[href*='#']")]
      .map((anchor) => new URL(anchor.href).hash.slice(1))
      .filter(Boolean);
    return {
      missing: targets.filter((target) => !ids.includes(target)),
      duplicates: ids.filter((id, index) => ids.indexOf(id) !== index),
    };
  });
  expect(missing).toEqual([]);
  expect(duplicates).toEqual([]);
});

test("hero contact action stays on the current language page", async ({ page }) => {
  for (const [path, label] of [
    ["/", "Get in touch"],
    ["/es", "Contactar"],
  ]) {
    await page.goto(path);
    const contact = page
      .locator("#about")
      .getByRole("link", { name: label, exact: true });
    await expect(contact).toHaveAttribute("href", `${path}#contact`);
    await expect(contact).not.toHaveAttribute("target", "_blank");
    await contact.click();
    await expect(page).toHaveURL(new RegExp(`${path}#contact$`));
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeInViewport();
  }
});

test("skips the portrait on phones and serves a right-sized one to desktops", async ({
  browser,
  baseURL,
}) => {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      baseURL,
    });
    try {
      const page = await context.newPage();
      const portraitRequests: string[] = [];
      page.on("request", (request) => {
        const url = new URL(request.url());
        if (
          url.pathname === "/_next/image" &&
          url.searchParams.get("url")?.includes("/me.")
        ) {
          portraitRequests.push(request.url());
        }
      });
      await page.goto("/", { waitUntil: "load" });
      const image = page.getByAltText(
        "Andrian Karsanashvili resting his chin on his hand",
      );
      if (width <= 760) {
        await expect(image).toBeHidden();
        expect(portraitRequests).toEqual([]);
        continue;
      }
      await expect(image).toBeVisible();
      await expect
        .poll(() => image.evaluate((element: HTMLImageElement) => element.currentSrc))
        .toContain("/_next/image");
      const { served, rendered, loaded, density } = await image.evaluate(
        (element: HTMLImageElement) => ({
          served: element.naturalWidth,
          rendered: element.getBoundingClientRect().width,
          loaded: element.complete && element.naturalWidth > 0,
          density: window.devicePixelRatio,
        }),
      );
      expect(loaded).toBeTruthy();
      expect(served).toBeLessThanOrEqual(Math.max(640, rendered * density * 1.5));
    } finally {
      await context.close();
    }
  }
});

test("keeps keyboard focus visible and unobscured", async ({ page, browserName }) => {
  await page.goto("/");
  const navigationKey =
    browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab";
  const problems: string[] = [];
  for (let step = 0; step < 40; step++) {
    await page.keyboard.press(navigationKey);
    const focus = await page.evaluate(() => {
      const element = document.activeElement;
      if (!element || element === document.body) return null;
      const rect = element.getBoundingClientRect();
      const x = Math.min(Math.max(rect.left + rect.width / 2, 1), innerWidth - 1);
      const y = Math.min(Math.max(rect.top + rect.height / 2, 1), innerHeight - 1);
      const hit = document.elementFromPoint(x, y);
      return {
        label: (element.getAttribute("aria-label") ?? element.textContent ?? "").trim(),
        outlined: getComputedStyle(element).outlineStyle !== "none",
        unobscured: hit === element || element.contains(hit),
      };
    });
    if (!focus) break;
    if (!focus.outlined || !focus.unobscured) problems.push(focus.label);
  }
  expect(problems).toEqual([]);
});

test("prints contact details without navigation chrome", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("header")).toBeHidden();
  await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
  await expect(page.locator('#contact a[href^="tel:"]')).toBeVisible();
});

test("navigation lands each section directly under the sticky header", async ({
  page,
}) => {
  await page.goto("/");
  for (const [label, id] of [
    ["Impact", "impact"],
    ["Experience", "experience"],
    ["Expertise", "expertise"],
    ["Contact", "contact"],
  ]) {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    const gap = () =>
      page.evaluate((target) => {
        const section = document.getElementById(target)!.getBoundingClientRect();
        const header = document.querySelector("header")!.getBoundingClientRect();
        return Math.round(section.top - header.bottom) + 0;
      }, id);
    // The last section can't scroll up to the header because the page ends.
    if (id === "contact") await expect.poll(gap).toBeGreaterThanOrEqual(0);
    else await expect.poll(gap).toBe(0);
    await expect(page.locator(`#${id} h2`)).toBeInViewport();
  }
});

test("puts metrics and case studies before the AI workflow", async ({ page }) => {
  await page.goto("/");
  const layout = await page.evaluate(() => {
    const metrics = document.querySelector("#impact dl")!;
    const cases = [...document.querySelectorAll("#impact article[id^='case-']")];
    const workflow = document.querySelector("#ai-heading")!.closest("article")!;
    const precedes = (first: Element, second: Element) =>
      Boolean(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING);
    return {
      cases: cases.map((element) => element.id),
      metricsFirst: precedes(metrics, cases[0]),
      workflowLast: cases.every((element) => precedes(element, workflow)),
      noOverlap:
        metrics.getBoundingClientRect().bottom <= cases[0].getBoundingClientRect().top,
    };
  });
  expect(layout.cases).toEqual([
    "case-modernization",
    "case-architecture",
    "case-antelu",
  ]);
  expect(layout.metricsFirst).toBe(true);
  expect(layout.workflowLast).toBe(true);
  expect(layout.noOverlap).toBe(true);
  await expect(page.locator("#impact dl > div")).toHaveCount(3);
});

test("groups four Vertafore assignments within continuous EPAM employment", async ({
  page,
}) => {
  await page.goto("/");
  const entries = page.locator("#experience ol > li");
  await expect(entries).toHaveCount(5);
  const epam = page.getByRole("region", { name: "EPAM Systems", exact: true });
  await expect(epam.locator("ol > li")).toHaveCount(4);
  await expect(epam).toContainText("Vertafore");
  await expect(epam.locator("time").first()).toHaveAttribute("datetime", "2021-02");
  expect(
    await epam.locator("li[data-experience-id]").evaluateAll((items) =>
      items.map((item) => ({
        id: item.getAttribute("data-experience-id"),
        dates: [...item.querySelectorAll("time")].map((time) => time.dateTime),
      })),
    ),
  ).toEqual([
    { id: "recent", dates: ["2026-07"] },
    { id: "certificates", dates: ["2025-05", "2026-07"] },
    { id: "agency", dates: ["2024-01", "2025-05"] },
    { id: "sagitta", dates: ["2021-02", "2024-01"] },
  ]);
  await expect(entries.last()).toContainText("Independent Software Engineer");
  await expect(epam).not.toContainText("Independent Software Engineer");
  for (const entry of await entries.all()) {
    await expect(entry.locator("> p").first()).not.toBeEmpty();
    await expect(entry.locator("> h3, > h4")).toHaveCount(1);
    await expect(entry.locator("> p").nth(1)).toContainText("·");
  }
  await expect(page.locator("#experience details")).toHaveCount(1);
  const offsets = await entries.evaluateAll((items) =>
    items.map((item) => {
      const dot = getComputedStyle(item, "::before");
      const line = item.parentElement!;
      const lineCenter =
        line.getBoundingClientRect().left +
        parseFloat(getComputedStyle(line).borderLeftWidth) / 2;
      const dotCenter =
        item.getBoundingClientRect().left +
        parseFloat(dot.left) +
        parseFloat(dot.width) / 2;
      return Math.abs(dotCenter - lineCenter);
    }),
  );
  for (const offset of offsets) expect(offset).toBeLessThanOrEqual(0.5);
});

test("keeps each education year directly above its title", async ({ page }) => {
  await page.goto("/");
  const education = page.locator("#expertise article", {
    has: page.getByRole("heading", { name: "Education & development" }),
  });
  const items = education.locator("li");
  await expect(items).toHaveCount(2);
  for (const item of await items.all()) {
    const year = (await item.locator("time").boundingBox())!;
    const title = (await item.locator("h4").boundingBox())!;
    expect(Math.abs(year.x - title.x)).toBeLessThanOrEqual(2);
    expect(title.y - (year.y + year.height)).toBeGreaterThanOrEqual(0);
    expect(title.y - (year.y + year.height)).toBeLessThanOrEqual(16);
  }
});

test("renders the hero portrait without a stray frame line", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "The portrait is hidden on phones.");
  await page.goto("/");
  const portrait = await page.locator("#about figure").evaluate((figure) => {
    const foot = figure.closest("section")!.lastElementChild!.getBoundingClientRect();
    return {
      frame: getComputedStyle(figure).borderRightWidth,
      position: getComputedStyle(figure).position,
      gapToFoot: Math.round(foot.top - figure.getBoundingClientRect().bottom),
    };
  });
  expect(portrait.frame).toBe("0px");
  if (portrait.position === "absolute") expect(portrait.gapToFoot).toBe(0);
});

test("supports keyboard skip navigation and native disclosure", async ({
  page,
  browserName,
}) => {
  await page.goto("/");
  const navigationKey =
    browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab";
  await page.keyboard.press(navigationKey);
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  const summary = page.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details")).toHaveAttribute("open", "");
  await expect(page.locator("details ul")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("details")).not.toHaveAttribute("open");
});

test("serves the approved CV and downloads it", async ({ page, request }) => {
  const response = await request.get("/andrian-kars-cv.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect(
    createHash("sha256")
      .update(await response.body())
      .digest("hex"),
  ).toBe("a135a2b2433a2a2ebfe21d80593da96d5d44eec0db72e7a57bd74026b764c2c9");
  await page.goto("/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download CV (PDF)", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Andrian-Karsanashvili-CV.pdf");
});

test("preserves old URLs with permanent redirects", async ({ page, request }) => {
  for (const [source, destination] of [
    ["/about", "/#about"],
    ["/skills", "/#expertise"],
    ["/works", "/#impact"],
  ]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
    await page.goto(source);
    await expect(page).toHaveURL(new RegExp(`${destination.slice(1)}$`));
  }
});

test("publishes consistent metadata and generated images", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Andrian Karsanashvili | Senior Full-Stack Engineer");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://andrian-kars.com",
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
    "content",
    "1200",
  );
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute(
    "content",
    "630",
  );
  const profilePage = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(profilePage["@type"]).toBe("ProfilePage");
  const person = profilePage.mainEntity;
  expect(person["@type"]).toBe("Person");
  expect(person.name).toBe("Andrian Karsanashvili");
  expect(person.jobTitle).toBe("Senior Full-Stack Engineer");
  expect(person.worksFor).toEqual({ "@type": "Organization", name: "EPAM Systems" });
  expect(person.alumniOf).toEqual([
    { "@type": "CollegeOrUniversity", name: "Ivan Franko National University of Lviv" },
  ]);
  expect(person.homeLocation.name).toBe("Galicia, Spain");
  expect(person.knowsLanguage).toEqual(["en", "de", "ja"]);
  expect(person.knowsAbout).toContain("React");
  expect(person.sameAs).toEqual([
    "https://www.linkedin.com/in/andrian-kars/",
    "https://github.com/andrian-kars",
  ]);
  expect((await request.get(new URL(person.image).pathname)).ok()).toBeTruthy();
  for (const path of ["/opengraph-image", "/icon", "/favicon.ico"]) {
    const image = await request.get(path);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
    expect((await image.body()).length).toBeGreaterThan(1000);
  }
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap: https://andrian-kars.com/sitemap.xml");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("<loc>https://andrian-kars.com</loc>");
});

test("has usable public contact links", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#about");
  const getInTouch = hero.getByRole("link", { name: "Get in touch", exact: true });
  await expect(getInTouch).toHaveAttribute("href", "/#contact");
  await expect(getInTouch).not.toHaveAttribute("target", "_blank");
  await expect(hero.locator('a[href^="mailto:"]')).toHaveAttribute(
    "href",
    "mailto:andrian.karsanashvili@gmail.com",
  );
  const contact = page.locator("#contact");
  await expect(
    contact.getByRole("link", { name: "andrian.karsanashvili@gmail.com" }),
  ).toHaveAttribute("href", "mailto:andrian.karsanashvili@gmail.com");
  await expect(contact.getByRole("link", { name: "+380 68 825 46 64" })).toHaveAttribute(
    "href",
    "tel:+380688254664",
  );
  for (const name of ["LinkedIn", "GitHub"]) {
    await expect(contact.getByRole("link", { name: new RegExp(name) })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  }
});

test("returns a real 404 with a way home", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "This page isn't here.",
  );
  await page.getByRole("link", { name: "Back to the homepage" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Andrian\s*Karsanashvili/,
  );
});

test("has no automated accessibility violations, including expanded content", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("summary").click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("core content and disclosure work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Andrian\s*Karsanashvili/,
    );
    await page.locator("summary").click();
    await expect(page.locator("details ul")).toBeVisible();
    await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
    await expect(page.locator("#case-modernization")).toContainText("Internet Explorer");
    await expect(page.locator("#case-architecture")).toContainText("page refresh");
    await expect(page.locator("#case-antelu")).toContainText("Sveltia CMS");
  } finally {
    await context.close();
  }
});

test("reflows across narrow, wide and zoom-equivalent viewports", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  for (const [width, height] of [
    [320, 740],
    [390, 844],
    [640, 800],
    [768, 1024],
    [1440, 900],
    [1920, 1080],
    [720, 450],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    const name = page.getByRole("heading", { level: 1 });
    await expect(name).toBeInViewport();
    if (height >= 740) {
      await expect(page.locator("#impact").getByText("Selected impact")).toBeInViewport();
    }
    const portrait = page.locator("#about figure");
    if (width <= 760) await expect(portrait).toBeHidden();
    else await expect(portrait).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`) });
    if (width === 1440 || width === 390) {
      for (const section of ["impact", "experience", "expertise", "contact"]) {
        await page.locator(`#${section}`).scrollIntoViewIfNeeded();
        await page.screenshot({ path: testInfo.outputPath(`${section}-${width}.png`) });
      }
    }
  }
});
