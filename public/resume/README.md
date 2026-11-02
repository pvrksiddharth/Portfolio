# Resume asset

Place your resume PDF here with the exact filename:

    Siddharth_Pendyala_Resume.pdf

i.e. the full path in this repository is:

    public/resume/Siddharth_Pendyala_Resume.pdf

At build time Vite copies `public/` to `dist/`, so the file will be served at:

    /resume/Siddharth_Pendyala_Resume.pdf

The site's "Download Resume" button links to that URL (see `RESUME_PATH`
in `src/data/site.ts`). If you use a different filename, update `RESUME_PATH`
to match. No placeholder PDF is committed — until you add the real file, the
download link will 404.
