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

`vercel.json` configures Vite, `npm ci`, `npm run build`, the `dist/` output, and security headers. Contact form delivery uses the public Formspree form ID in `src/data/portfolio.ts`. Local Vercel metadata and environment files are excluded from uploads and version control.

## Contact form and Gmail delivery

The form is configured to submit to `https://formspree.io/f/xaeqealw`. Its ID is stored as `contact.formId` in `src/data/portfolio.ts`.

1. In your Formspree dashboard, verify that this form is active and its notification recipient is `sanmiguelhansernie@gmail.com`. Verify the recipient email if requested.
2. This implementation submits with `fetch` and requests JSON, so confirmation and errors stay in the portfolio UI. Formspree's hosted/interstitial reCAPTCHA is incompatible with AJAX: disable that reCAPTCHA option for this form, or add a custom in-page CAPTCHA integration with its matching secret configured in Formspree. This repository does not currently load a custom CAPTCHA. See [Formspree's CAPTCHA guidance](https://formspree.io/blog/recaptcha-methods/) and [reCAPTCHA settings](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings). Other provider spam filtering and the `_gotcha` honeypot remain applicable. No provider settings are changed automatically.
3. To change forms, update `contact.formId`. You can optionally override it with `VITE_FORMSPREE_FORM_ID` in `.env.local` or Vercel environment settings (see `.env.example`). Use only the ID, not the full endpoint URL; restart Vite or rebuild after changing environment settings. An empty override disables sending. Never put Gmail passwords, SMTP credentials, or secret API keys in a `VITE_` variable.
4. Send a test message from the deployed site and check Gmail, including Spam. This repository's automated tests do not send real email.

Fields stay editable except while sending. If the form ID is missing or invalid, sending is disabled and the email link remains available. Background submission keeps visitors on the portfolio, shows a loading state, then displays an accessible inline success or error message. Input is cleared only after Formspree confirms acceptance; errors preserve it. Requests have a 15-second timeout, never follow HTTP redirects, and never navigate to a JSON `next` URL. CAPTCHA/verification destinations are treated as failures, not successful sends. No messages are stored by this application; Formspree processes and stores submissions according to its own policies and your account settings.

### Submission limits and security scope

- One submission attempt per 60 seconds and five attempts per rolling hour in this browser. Attempts are counted before sending, even if delivery later fails. Provider `429` responses also apply a retry cooldown. Timestamp-only storage survives refreshes and synchronizes ordinary activity across tabs. No names, addresses, or messages are saved to local storage.
- The browser limiter is a usability/accidental-repeat safeguard. It can be bypassed by clearing storage, changing browsers, or calling the provider directly. Input validation, maximum field lengths, the hidden spam field, and duplicate-click protection are also browser controls.
- Formspree receives the hidden `_gotcha` honeypot field. A honeypot alone cannot stop targeted bots. For CAPTCHA protection with AJAX, an in-page CAPTCHA integration is required instead of Formspree's hosted challenge. See [Honeypot spam filtering](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/).
- Custom enforceable limits require every delivery to pass through a backend with a shared limiter such as Redis, plus a provider setup that prevents bypassing that backend. The current limits are browser safeguards.
- Production security headers include a Content Security Policy allowing background requests to Formspree and restricting scripts, frames, and assets to the app and its analytics service; frame embedding prevention; MIME sniffing prevention; a referrer policy; restricted browser permissions; and HSTS. Native form navigation is restricted to this site. Inline styles are allowed for the existing React/Motion styling. These headers are applied by Vercel, not the local Vite development server. Update the allowlist if you intentionally add another external service.

Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build` before publishing. The contact tests cover validation against control characters and oversized input, cooldown/hourly limits, corrupted timestamps, endpoint validation, JSON submission, confirmed success, CAPTCHA/error responses, redirect prevention, timeouts, and provider throttling. They do not send real email.

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
- `src/lib/`: contact validation, browser submission limits, and Formspree endpoint configuration
- `tests/`: contact validation and delivery checks
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
