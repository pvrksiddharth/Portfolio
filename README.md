# Siddharth Pendyala — Portfolio

A bespoke, dark, interactive single-page portfolio built with React + Vite + TypeScript.
The nano-particle background is hand-written Canvas 2D; charts use Recharts.

## Run locally

    npm install
    npm run dev        # http://localhost:5173

## Production build

    npm run build      # outputs to dist/
    npm run preview    # serve the production build locally

## Resume download

Place your real resume PDF at:

    public/resume/Siddharth_Pendyala_Resume.pdf

It is then served at `/resume/Siddharth_Pendyala_Resume.pdf` and wired into the
resume dialog automatically (path configured in `src/data/site.ts`).
See `public/resume/README.md` for details. Until the file is added, the
download link will 404 by design — no fake PDF is committed.

## Projects gallery

Project data lives in `src/data/site.ts` (`builds` array). Only real builds
are listed; unfinished work is labelled "Work in progress". Add entries there
when you have an actual repository or deployment to link — do not fabricate projects.

## Deployment

Static output in `dist/` — compatible with Netlify (build command `npm run build`,
publish directory `dist`). `public/_redirects` provides SPA fallback for any deep links.
