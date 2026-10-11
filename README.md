<a href="https://andrian-kars.com">
  <img src="https://andrian-kars.com/opengraph-image" width="100%" alt="Andrian Karsanashvili, Senior Full-Stack Engineer. AI-assisted engineering, React and TypeScript, C# and .NET.">
</a>

# andrian-kars.com

[![Portfolio checks](https://github.com/andrian-kars/personal/actions/workflows/ci.yml/badge.svg)](https://github.com/andrian-kars/personal/actions/workflows/ci.yml)

Portfolio and CV of Andrian Karsanashvili, Senior Full-Stack Engineer based in Galicia, Spain. A fast, accessible page in English and Spanish that gets recruiters and hiring teams to the evidence quickly.

**Live:** [andrian-kars.com](https://andrian-kars.com)

## Stack

- Next.js 16 (App Router, statically generated language pages) and React 19
- TypeScript in strict mode
- SCSS Modules with self-hosted variable fonts (Manrope, Source Sans 3)
- Localized Open Graph images, icon, sitemap, robots and ProfilePage/Person JSON-LD
- Security headers and permanent redirects from the old site's URLs

## Quality

Every push runs ESLint, type checks, Prettier, a production build and the Playwright suite in Chromium, WebKit and a mobile viewport. The tests cover:

- content, metadata and the CV download
- keyboard navigation, visible focus, the skip link and native disclosure
- automated WCAG 2.2 AA checks with axe, including expanded content
- layouts without JavaScript and in print
- grid alignment, anchor offsets and reflow from 320px to 1920px
- right-sized images, with no portrait download on phones
- language negotiation, remembered choices, localized 404s and both CV downloads

## Getting started

Requires Node.js 24 (see `.nvmrc`).

```bash
npm ci
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

## Scripts

| Command                | What it does                                                      |
| :--------------------- | :---------------------------------------------------------------- |
| `npm run dev`          | Development server                                                |
| `npm run build`        | Production build                                                  |
| `npm start`            | Serve the production build                                        |
| `npm run lint`         | ESLint                                                            |
| `npm run typecheck`    | Generate route types, then `tsc --noEmit`                         |
| `npm run format`       | Format with Prettier (`format:check` to verify only)              |
| `npm run test:e2e`     | Playwright suite against the production build on port 3101        |

Run `npm run build` and `npx playwright install chromium webkit` before the first `test:e2e`.

## Project structure

```text
app/              routes, metadata, Open Graph image, icon, sitemap, robots
components/       layout (header, main) and the home page
content/          typed English and Spanish copy
data/portfolio.ts shared identity, project dates and measurements
i18n/             locale, URL, date-formatting and server helpers
proxy.ts          default-language rewrite and language selection
styles/           design tokens and global styles
tests/            Playwright end-to-end and accessibility tests
public/           English/Spanish CVs (PDF) and portrait
```

## Updating content

Edit shared facts in `data/portfolio.ts` and copy in `content/en.ts` and `content/es.ts`. Spanish translations are keyed by the English entries' stable IDs and are built from shared facts plus Spanish text, never by copying English entries. `tests/i18n.spec.ts` walks both dictionaries and fails on missing keys, different list lengths, changed shared values or any sentence left in English; official job titles, project names and technology names are the only deliberate exceptions. Preserve actual technologies, dates, currency and measurement scope when translating. Month labels come from each dictionary, not from the runtime's locale data.

English is canonical at `/`; Spanish is at `/es`. Internally, the proxy rewrites English pages to `/en`. Do not redirect that internal path back to `/` inside the proxy: rewritten requests can pass through it again. The internal alias points canonically to `/` and is excluded from the sitemap and navigation.

Only root visits negotiate the language: an explicit saved choice wins over `Accept-Language`, and Galician, Catalan, Basque and Asturian preferences count as Spanish. Explicit `/es` visits remain Spanish. Known crawlers and link-preview clients receive the default English page at `/`. Selection links use a short-lived query parameter to set a one-year, same-site preference cookie and redirect to the clean URL, including without JavaScript. Personalized redirects are not cacheable; the generated page bodies remain cacheable.

Unknown URLs render `app/global-not-found.tsx` on the server, with a 404 status, the full header and footer, and the language the proxy forwards in the `x-locale` request header (Spanish under `/es`). A `notFound()` thrown from a route under the `[lang]` root layout only renders client-side in Next.js 16, so the app has no catch-all route and the `[lang]` layout disables dynamic params.

Both languages have their own canonical URL, reciprocal `hreflang` links and social metadata. The share images are prerendered at build time: `/opengraph-image` is English and `/opengraph-image/es` is Spanish.

## Updating the CVs

The English PDF keeps its existing URL: `public/andrian-kars-cv.pdf`. Spanish uses `public/andrian-kars-cv-es.pdf`. Each page downloads its own language and offers the other edition in the contact section.

Keep editable CV sources, document-generation tooling and private evidence notes outside this public repository. Generate each edition from its reviewed source, check all pages visually and verify selectable text, reading order and hyperlinks. Then replace only the final PDFs and update their SHA-256 hashes in `tests/i18n.spec.ts` and the English hash in `tests/portfolio.spec.ts`.

The Spanish edition discloses AI-assisted translation for written communication; it does not claim Spanish proficiency. Work authorization is intentionally omitted until its issuance is confirmed. Do not add it based on an expected date.
