<a href="https://andrian-kars.com">
  <img src="https://andrian-kars.com/opengraph-image" width="100%" alt="Andrian Karsanashvili, Senior Full-Stack Engineer. AI-assisted engineering, React and TypeScript, C# and .NET.">
</a>

# andrian-kars.com

[![Portfolio checks](https://github.com/andrian-kars/personal/actions/workflows/ci.yml/badge.svg)](https://github.com/andrian-kars/personal/actions/workflows/ci.yml)

Portfolio and CV of Andrian Karsanashvili, Senior Full-Stack Engineer. One fast, accessible page that gets recruiters and hiring teams to the evidence quickly.

**Live:** [andrian-kars.com](https://andrian-kars.com)

## Stack

- Next.js 16 (App Router, fully static) and React 19
- TypeScript in strict mode
- SCSS Modules with self-hosted variable fonts (Manrope, Source Sans 3)
- Generated Open Graph image, icon, sitemap, robots and Person JSON-LD
- Security headers and permanent redirects from the old site's URLs

## Quality

Every push runs ESLint, type checks, Prettier, a production build and the Playwright suite in Chromium, WebKit and a mobile viewport. The tests cover:

- content, metadata and the CV download
- keyboard navigation, visible focus, the skip link and native disclosure
- automated WCAG 2.2 AA checks with axe, including expanded content
- layouts without JavaScript and in print
- grid alignment, anchor offsets and reflow from 320px to 1920px
- right-sized images, with no portrait download on phones

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
data/portfolio.ts all content: profile, impact, experience, skills, education
styles/           design tokens and global styles
tests/            Playwright end-to-end and accessibility tests
public/           CV (PDF) and portrait
```

## Updating content

Edit `data/portfolio.ts`. The page, metadata, Open Graph image and JSON-LD all read from it. To publish a new CV, replace `public/andrian-kars-cv.pdf` and update its SHA-256 hash in `tests/portfolio.spec.ts`.
