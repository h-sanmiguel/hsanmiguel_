# Hans — Developer Portfolio

A dark, responsive portfolio built with Vite, React, TypeScript, Tailwind CSS, HeroUI, Motion for React, and Lucide icons. Inspired by the supplied purple portfolio reference.

## Run locally

From this directory:

```powershell
npm install
npm run dev
```

Open the Local URL printed by Vite (normally http://localhost:5173).

From the workspace root, run `cd frontend` first.

## Production

```powershell
npm run typecheck
npm run build
npm run preview
```

Live portfolio: https://hsanmiguel.vercel.app/

The project is linked to Vercel as `hans-portfolio`. From this directory, publish changes with:

```powershell
npm exec --yes --package=vercel@latest -- vercel deploy --prod
```

`vercel.json` configures Vite, `npm ci`, `npm run build`, and the `dist/` output. No backend or application environment variables are required. Local Vercel metadata and environment files are excluded from uploads and version control.

Vercel Web Analytics is mounted once in `src/App.tsx` using `@vercel/analytics/react`. Web Analytics is enabled for the linked Vercel project. View visitors and page views in the project's Analytics dashboard after production visits. Local development uses the SDK's debug mode.

## Personalize

All personal information, section copy, navigation, technologies, projects, timeline entries, and social URLs live in `src/data/portfolio.ts`.

Your content:

- Email, GitHub, LinkedIn, and your Naga City location are configured. Missing project URLs still show a friendly notification.
- Your full name, education history, frontend/UI/UX focus, and skills reflect your supplied resume. The IT Essentials course completion certificate is listed with its completion date of 21 January 2026 and a link to the original PDF.
- Musubi and Appoint are displayed as projects built with your groupmates. Appoint links to its live deployment; add individual repository URLs and a Musubi live URL when available.
- Your supplied portrait is connected at `public/profile.jpg`. The image falls back safely if it cannot load. To replace it, update this file or change `about.photo.src` and `about.photo.alt`.
- Project previews use your actual screenshots at `public/projects/musubi.png` and `public/projects/appoint.png`. Select a preview to open the full screenshot. Group contributions are credited in both descriptions. Exact Musubi technology choices and project dates remain unspecified; its tags describe features rather than an assumed stack.
- Your supplied resume is available at `public/cv.pdf`, and the original Cisco certificate at `public/certificates/it-essentials.pdf`. View certificate opens `CertificateModal` within the portfolio, showing a preview rendered from the original PDF at `public/certificates/it-essentials.png`, with zoom and PDF download controls. HeroUI handles keyboard dismissal, focus containment, and focus restoration. The CV download checks for a PDF before saving the file.
- Edit `index.html` for your metadata. The canonical URL, `og:url`, and absolute Open Graph image URL use the production Vercel domain. Update these if you add a custom domain. A local 1200 × 630 social image is included at `public/og-image.png`.

## Structure

- `src/components/layout/`: navigation and footer
- `src/components/ui/`: section heading, motion reveal, actions, local brand icons
- `src/components/cards/`: projects and technology categories
- `src/sections/`: hero, about, stack, projects, education, contact
- `src/hooks/`: active section tracking
- `src/styles/globals.css`: theme and responsive styling
- `public/projects/`: supplied project screenshots
- `public/certificates/`: supplied credential PDFs

## Accessibility and behavior

Semantic section headings, a skip link, keyboard focus indicators, active navigation, a HeroUI mobile disclosure menu, lazy-loaded project previews, and reduced-motion support are included. Escape and section selection close the mobile menu. The font is served locally.

HeroUI v3 uses compound components and does not require a provider. The installation follows the current [HeroUI quick start](https://heroui.com/en/docs/react/getting-started/quick-start) and [Tailwind Vite instructions](https://tailwindcss.com/docs/installation/using-vite). Generic icons come from Lucide; the small brand marks are local SVG components because Lucide 1.x excludes brands.

## Verification

Strict TypeScript checking and a production build are required. A server-rendered smoke check also checks sections, project cards, local assets, and configured contact/social link rendering. Visual and browser interaction QA could not be run in this session because no preview browser was connected.
