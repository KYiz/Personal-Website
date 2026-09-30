# Yixiang Zou — AI Agent & Product Portfolio

A bilingual React + TypeScript + Vite portfolio with Tailwind CSS, responsive layouts and five detailed case studies. It is a static website: no backend, database or AI service is required.

## Run locally

Requires Node.js 22 or later and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. To build and preview production files:

```bash
npm run build
npm run preview
```

The build runs TypeScript, a content integrity check and Vite. The integrity check validates five unique projects, five linked experiences, bilingual fields, PDF files and all preview pages. It verifies consistency and file availability; it does not establish the truth of source documents.

This workspace also keeps a local npm CLI because npm is not on the current environment's PATH. From this project folder, the equivalent PowerShell command is:

```powershell
node '..\..\work\npm-cli\npm\bin\npm-cli.js' run dev
```

Replace `dev` with `build` or `preview` as needed. This local tool is outside the website project and is not deployed.

## Deploy to GitHub Pages

1. Upload the contents of this project folder to the `main` branch of your GitHub repository. Exclude `node_modules/`, `dist/` and `*.tsbuildinfo`.
2. In **Settings → Pages**, select **GitHub Actions**.
3. Push to `main`, or run **Deploy portfolio to GitHub Pages** manually under **Actions**.
4. The workflow runs `npm ci` and `npm run build`, then uploads and deploys `dist/`. Its deployment output supplies the public URL.

Vite uses a relative base (`./`). Hash routes such as `#/projects/caretrip-ops` work when refreshed under a repository subpath. Only npm and `package-lock.json` are used.

## Update content

- `src/data.ts`: profile, education, skills, five projects, experience, categories, strengths, working style, illustrations and PDF metadata.
- `src/copy.ts`: common English and Chinese interface text.
- `src/ui.tsx`: shared headings, arrows and PDF download controls.
- `src/App.tsx`: routing, navigation, language storage and document metadata.
- `src/CareerTimeline.tsx`: the shared year-grouped timeline used on Home and Experience.
- `src/ParticleField.tsx`: lightweight decorative canvas particles, without animation libraries.
- Other TSX files contain the home sections, introductory animation, project details and PDF reader. Components are kept short; no Python is used by the website.
- `src/styles.css`: shared and inner-page styles. `src/showcase.css`: homepage, categories and particle positioning. `src/career.css`: the shared timeline, imported by its component.
- `scripts/check-content.mjs`: the build-time integrity check.

The project count is derived from `projects`; experience periods use the matching project period. PDF page count and preview paths are defined once in `portfolioDocument`.

The GitHub profile, email and LinkedIn links are configured in `src/data.ts`. The default language is English; visitors can switch to Chinese. Storage failures do not stop the site.

## Visuals and interactions

Home follows: 0–100 intro → animated cloud scene and draggable five-category rail → profile, skills and six experiences (five project cases plus volunteer service) → five projects → core strengths → contact. Role opens About; other categories filter related projects. Project experience, strength and working-style cards link to evidence cases; the volunteer card links to its certificate.

The timeline has one horizontal axis: 2025 on the left and 2026 on the right. Experiences in each year stack vertically beneath that year. Both Home and Experience use the same component and centralized project periods; the two year columns remain side by side on mobile.

The intro runs on each document load, takes at least three seconds, shows 100% for half a second and has no skip button. Slow assets can extend it, with an eight-second resource timeout. It measures intro progress, not download bytes. Underlying content is inert and scrolling is held until the intro finishes.

The scene uses CSS motion on a single anime illustration. Reduced-motion preferences disable decorative movement. The generated illustrations are stored as optimized WebP files in `public/visuals/`. They are concept illustrations, not evidence of product implementation. The actual portrait is used on About. Fonts use local/system fallbacks, with no Google Fonts request.

The visual system combines cinematic cover art, large editorial typography, technical architecture diagrams, a tactile portfolio book and restrained glass surfaces. Ambient particle constellations appear behind pages; the hero uses floating light dust. Canvas rendering is capped at about 30 fps and 1.5× pixel density, uses fewer particles on mobile, pauses while hidden or outside the viewport, and becomes static when reduced motion is requested. The canvas never captures clicks or obscures document content.

## PDFs

`public/docs/Yixiang_Zou_Resume.pdf` is the supplied bilingual résumé. `public/docs/Yixiang_Zou_AI_Agent_Product_Portfolio.pdf` is the supplied 16-page combined portfolio. Both downloads preserve the original files.

The portfolio reader displays converted page images with previous/next controls, a page selector and loading/error feedback. There is no separate “Open PDF” button. The yellow book cover is built with CSS. Download controls fetch the original PDF and request a browser file save. Some embedded browsers restrict file downloads; this browser policy cannot be removed by website code. The image reader works independently of a browser PDF plugin.

## Project content and privacy

The five case studies draw on the supplied project reports, CareTrip presentation and plan, résumé materials and combined portfolio. Each case connects the problem, personal contribution, architecture, process, delivery and technical reflection. Content presents the work for AI Agent developer, applied AI engineer and AI product roles.

- **Allied Medical:** enterprise RAG engineering, source refresh and asynchronous Front integration on an existing Spring Boot prototype, March–July 2026.
- **CareTrip Ops:** Agent product and solution design, including 1 Manager + 5 Workers, 27 layered Skills and 4 planned MCP service types. The companion plan also details a 16-core-Skill inventory.
- **UAV:** New Zealand Customs internship case, five-stage advisory Agent, regulatory retrieval and structured scenario testing; public material excludes partner data.
- **Meet-ta:** vision-model development and evaluation, connected to the team's multimodal conversation prototype.
- **NLP:** TED-MDB preprocessing, MiniLM experiments, metric analysis, visualization and research writing.
- **Awards:** AI model development and growth strategy competition achievements from the supplied résumé materials.

Raw enterprise reports, customer messages, ERP exports, credentials and partner internal data are excluded from public assets. Illustrations communicate the portfolio's visual identity; original project facts are maintained in `src/data.ts`.

## SEO and accessibility

Semantic headings, keyboard focus, current-page navigation, localized accessible labels, descriptive metadata and reduced-motion styles are included. Titles and descriptions update by page and language. Hash routes share the initial static HTML; this is not independent static HTML for each project and does not guarantee per-project search indexing. Email and LinkedIn links are the only configured external contacts; no analytics or form service is included.

## Maintenance and privacy

The parent `work/` directory contains only the local npm CLI described above. The website has one source tree; historical copies, extraction scripts, audit backups, duplicate images and ZIP packages have been removed. `node_modules/` is kept locally for development, while `dist/` and `*.tsbuildinfo` are generated by each build and can be removed afterward. Upload only this project folder's source, public assets and configuration to GitHub. Do not upload customer records, ERP exports, credentials or internal enterprise repositories as public evidence.
