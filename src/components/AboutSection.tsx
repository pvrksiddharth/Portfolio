const principles = [
  {
    title: 'Understand first',
    body: 'Most problems are mislabelled. Reading a problem carefully is half of solving it.',
  },
  {
    title: 'Build small, then grow',
    body: 'A working sketch beats a perfect plan. Ship the smallest honest version and iterate.',
  },
  {
    title: 'Details compound',
    body: 'Spacing, timing, and wording — the quiet decisions are what make software feel considered.',
  },
];

export default function AboutSection() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <p className="section-label reveal">About</p>
        <h2 className="section-title reveal" id="about-heading">
          The person behind the particles.
        </h2>

        <div className="about-layout">
          <div className="about-copy reveal">
            <p>
              I like taking things apart to see how they work — protocols, interfaces,
              arguments for why something is built the way it is. This site is where that
              habit lives publicly: <strong>a workshop, not a showcase reel.</strong>
            </p>
            <p>
              My interest sits where <strong>software meets intelligence meets design</strong> —
              systems that reason about information, wrapped in interfaces that respect the
              person using them. I learn by building, refine by questioning, and keep a short
              list of things worth doing well.
            </p>
          </div>

          <div className="principles">
            {principles.map((p, i) => (
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
