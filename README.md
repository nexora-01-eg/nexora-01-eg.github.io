# Mohamed Sadek — CV & Portfolio (GitHub Pages user site)

Live at: **https://nexora-01-eg.github.io/**

This repository is the public CV and portfolio of **Mohamed Sadek** — AI-assisted digital
project builder (websites & digital operations), Shebin El-Kom, Egypt.

Everything published here follows a strict evidence policy: every project, skill, and claim was
verified against live sites, public repositories, or project files in October 2026. Concept demos
are labeled as concepts. No clients, revenue, user counts, or metrics are claimed.

## Files

| File | Purpose |
|---|---|
| `index.html` | The premium CV website — **fully bilingual (English + Arabic)** with a language toggle (hero, selected work, skills, process, education, contact, filterable archive) |
| `styles.css` | Design system — editorial style: warm paper, near-black ink, deep navy, champagne accents; RTL/Arabic typography (Amiri + Cairo) built in |
| `app.js` | Progressive enhancements only (language toggle, reveal-on-scroll, archive filter). Site fully works without JS |
| `ats-resume.html` | ATS-friendly résumé — single column, printable A4 (English) |
| `full-cv.html` | Full portfolio CV with the complete categorized archive — printable A4 (English) |
| `downloads/Mohamed-Sadek-ATS-Resume.pdf` | Generated PDF (selectable text, 2 pages) |
| `downloads/Mohamed-Sadek-Portfolio-CV.pdf` | Generated PDF (selectable text, 5 pages) |

## Bilingual site (EN / AR)

The website is fully bilingual. How it works:

- **Language toggle** in the header switches instantly; the choice is remembered
  (`localStorage` key `ms-cv-lang`), and first-time visitors get the language matching their
  browser (`navigator.language`).
- **Arabic mode** flips the whole page to RTL and swaps fonts to Amiri (serif/headers) and Cairo
  (body), with Arabic-tuned line heights. Layout uses logical CSS properties (`margin-inline-start`,
  `inset-inline-start`, …), so RTL is a true mirror, not a patch.
- **Implementation:** each section has paired `.lang-en` / `.lang-ar` blocks; short strings use
  inline `.t-en` / `.t-ar` spans. CSS shows exactly one language based on
  `html[lang]`. No JS is required to display either language — JS only handles the toggle.
- Print/print-to-PDF outputs only the currently active language.
- The downloadable PDFs remain English-only for now (Arabic PDF versions are a possible follow-up).

## Dark mode (light / dark)

- **Theme toggle** (☾/☀) sits next to the language toggle in the header; the choice is remembered
  (`localStorage` key `ms-cv-theme`). First-time visitors get their system preference
  (`prefers-color-scheme`), and the theme is applied by an inline head script **before first
  paint** — no light/dark flash on load.
- The dark theme is a **warm editorial dark** (near-black warm paper `#1a1713`, cream ink,
  light-steel primary, brighter champagne) — same brand, not an inverted gray. Scrollbars and
  form controls follow via `color-scheme`.
- All colors flow through CSS custom properties; the dark theme is a single
  `html[data-theme="dark"]` variable block in `styles.css`.
- **Printing always uses light** (the `@media print` block re-declares the light variables),
  so Ctrl+P and print-to-PDF are always clean paper regardless of the active theme.
- The standalone PDF pages (`ats-resume.html`, `full-cv.html`) are self-contained and unaffected.

### Editing theme colors

Edit the `:root` block (light) and the `html[data-theme="dark"]` block at the top of `styles.css`.
Never hardcode a raw color in a component rule — use a variable, so both themes stay in sync.

### Editing bilingual content

When you edit a section in `index.html`, edit **both** language blocks (`.lang-en` and `.lang-ar`).
For archive rows, update both the `.t-en` and `.t-ar` spans of each cell.

## Local preview

No build step, no dependencies:

```bash
# any static server works, e.g.
python -m http.server 8940
# then open http://localhost:8940/
```

Or open `index.html` directly in a browser.

## Editing content

- **Projects / archive:** edit `index.html` directly — archive rows carry `data-cat` attributes
  (`rest`, `brand`, `creative`, `apps`, `code`) used by the filter buttons.
- **Colors / typography:** edit the `:root` variables at the top of `styles.css`.
- **Résumé pages:** `ats-resume.html` and `full-cv.html` are self-contained (inline CSS).

## Regenerating the PDFs

The PDFs were produced from the HTML pages with Edge headless:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="downloads\Mohamed-Sadek-ATS-Resume.pdf" `
  "file:///<path-to>/ats-resume.html"
```

(Same for `full-cv.html` → `Mohamed-Sadek-Portfolio-CV.pdf`.) Text in both PDFs is selectable
and was verified by extraction.

## Deployment

This is the GitHub Pages **user site** repository (`nexora-01-eg.github.io`), so anything on the
default branch is served automatically at the root URL. Push to deploy:

```bash
git add -A && git commit -m "update CV" && git push
```

Pages is served from the `main` branch root (no build, no Jekyll processing needed — an empty
`.nojekyll` is included as a safeguard).

## QA checklist (performed October 2026)

- Console: no errors (real browser session), **in both EN and AR modes**
- Lighthouse: Accessibility 1.0 · Best Practices 1.0 · SEO 1.0 — **re-verified after dark mode,
  with zero failures** (the language-toggle accessible-name mismatch was fixed in the same pass)
- Dark mode verified with real clicks: theme swap + persistence, system-preference fallback,
  no-flash first paint, AR+RTL+dark combined, zero horizontal overflow in dark too
- No horizontal overflow at 1280 / 768 / 481 px viewports — re-verified after the bilingual
  change at 481 px in **both LTR (EN) and RTL (AR)** via headless probes
- Language toggle verified with real clicks (AR ⇄ EN): `lang`/`dir` swap, title swap,
  persistence, RTL layout, Arabic fonts, filter still working in AR
- Archive filter verified with real clicks (aria-pressed + row visibility)
- Keyboard: skip link focuses and targets `#main`; all controls are native buttons/links
  (skip link uses `position: fixed` so its off-screen state adds no scrollable overflow in RTL)
- PDFs: generated, 2 + 5 pages, text extraction verified (including Arabic)
- All 35 outbound links verified live at publish time (statuses recorded in the audit)

## Content policy (do not break)

1. Never list a skill without an inspectable example.
2. Never present concept demos as production or client work.
3. Forked repositories on the account are excluded everywhere.
4. No invented numbers: no clients, revenue, users, conversion rates, or proficiency ratings.
5. If a project's status changes (e.g., an offline demo returns), update its archive status chip.
