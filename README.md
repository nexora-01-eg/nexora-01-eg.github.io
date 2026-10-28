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
| `index.html` | The premium CV website (hero, selected work, skills, process, education, contact, filterable archive) |
| `styles.css` | Design system — editorial style: warm paper, near-black ink, deep navy, champagne accents |
| `app.js` | Progressive enhancements only (reveal-on-scroll, archive filter). Site fully works without JS |
| `ats-resume.html` | ATS-friendly résumé — single column, printable A4 |
| `full-cv.html` | Full portfolio CV with the complete categorized archive — printable A4 |
| `downloads/Mohamed-Sadek-ATS-Resume.pdf` | Generated PDF (selectable text, 2 pages) |
| `downloads/Mohamed-Sadek-Portfolio-CV.pdf` | Generated PDF (selectable text, 5 pages) |

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

- Console: no errors (real browser session)
- Lighthouse: Accessibility 0.96 · Best Practices 1.0 · SEO 1.0
- No horizontal overflow at 1280 / 768 / 481 px viewports; all `nowrap` elements ≤ ~170 px
- Archive filter verified with real clicks (aria-pressed + row visibility)
- Keyboard: skip link focuses and targets `#main`; all controls are native buttons/links
- PDFs: generated, 2 + 5 pages, text extraction verified (including Arabic)
- All 35 outbound links verified live at publish time (statuses recorded in the audit)

## Content policy (do not break)

1. Never list a skill without an inspectable example.
2. Never present concept demos as production or client work.
3. Forked repositories on the account are excluded everywhere.
4. No invented numbers: no clients, revenue, users, conversion rates, or proficiency ratings.
5. If a project's status changes (e.g., an offline demo returns), update its archive status chip.
