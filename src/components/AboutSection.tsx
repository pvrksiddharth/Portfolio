const focusAreas = [
  {
    title: 'Technical ↔ commercial bridge',
    body: 'Turning solution architecture and scope documents into proposals that procurement committees can actually evaluate.',
  },
  {
    title: 'Bid coordination end-to-end',
    body: 'Owning the tender calendar — compliance checklists, documentation, pricing inputs, and on-time submission across Gov/PSU portals.',
  },
  {
    title: 'AI-assisted research & drafting',
    body: 'Using ChatGPT, Claude, and Gemini for proposal refinement, requirement analysis, and faster, better-structured first drafts.',
  },
];

export default function AboutSection() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <p className="section-label reveal">About</p>
        <h2 className="section-title reveal" id="about-heading">
          Between the solution and the signature.
        </h2>

        <div className="about-layout">
          <div className="about-copy reveal">
            <p>
              I am Siddharth Pendyala — a pre-sales and bid-management professional with{' '}
              <strong>2.9+ years of experience</strong> across Government, PSU, and enterprise
              technology tenders, holding a <strong>B.Tech in Electronics &amp; Communication
              Engineering</strong>.
            </p>
            <p>
              My day-to-day sits in one specific gap: <strong>bridging technical solutions and
              commercial success.</strong> Engineers describe what a system does; buyers decide
              whether it is worth signing. I work on the translation — scope, compliance,
              positioning, and the discipline of never missing a deadline.
            </p>
            <p>
              I lean on modern AI tools — <strong>ChatGPT, Claude, and Gemini</strong> — for
              proposal refinement, requirement research, and drafting, treating them as careful
              first-draft partners rather than shortcuts.
            </p>
          </div>

          <div className="principles">
            {focusAreas.map((p, i) => (
              <div className="principle reveal" key={p.title} style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}>
                <span className="idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
