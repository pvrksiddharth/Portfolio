import type { Build } from '../data/site';

/**
 * Reusable project card. Visual previews are pure CSS/SVG compositions —
 * no stock imagery. Add new entries in src/data/site.ts.
 */

function InterfacePreview() {
  return (
    <div className="preview-ui" aria-hidden="true">
      <div className="mini-window">
        <div className="mini-window-bar">
          <i /><i /><i />
        </div>
        <div className="mini-window-body">
          <div className="mini-row accent" />
          <div className="mini-row mid" />
          <div className="mini-row short" />
          <div className="mini-row" />
          <div className="mini-row mid" />
        </div>
      </div>
    </div>
  );
}

function GraphPreview() {
  const nodes = [
    [18, 30], [46, 14], [72, 34], [30, 66], [62, 70], [88, 60], [50, 44],
  ];
  const edges = [[0,1],[1,2],[0,3],[3,4],[2,4],[2,5],[1,6],[6,4],[3,6]];
  return (
    <div className="preview-blueprint" aria-hidden="true">
      <svg className="node-graph" viewBox="0 0 100 84">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]} y1={nodes[a][1]}
            x2={nodes[b][0]} y2={nodes[b][1]}
            stroke="rgba(17,24,39,0.2)" strokeWidth="0.4"
          />
        ))}
        {nodes.map(([x, y], i) => (
          <circle
            key={i}
            cx={x} cy={y} r={i === 6 ? 2.4 : 1.6}
            fill={i === 6 ? '#1e3a8a' : 'rgba(17,24,39,0.45)'}
            opacity={i === 6 ? 0.9 : 0.7}
          />
        ))}
      </svg>
    </div>
  );
}

function CodePreview() {
  return (
    <div className="preview-code" aria-hidden="true">
      {'const field = createField()\n\n'}
      {'field.particles.map((p) => {\n'}
      {'  p.drift('}<span className="s">noise(t)</span>{');\n'}
      {'  p.respond('}<span className="n">pointer</span>{');\n'}
      {'});\n\n'}
      {'render(field);'}
    </div>
  );
}

export default function BuildCard({ build }: { build: Build }) {
  const statusLabel =
    build.status === 'live' ? 'Live' : build.status === 'wip' ? 'Work in progress' : 'Archived';

  return (
    <article className="build-card reveal">
      <div className="build-preview">
        {build.preview === 'interface' && <InterfacePreview />}
        {build.preview === 'graph' && <GraphPreview />}
        {build.preview === 'code' && <CodePreview />}
      </div>
      <div className="build-body">
        <div className="build-meta">
          <span>{build.category}</span>
          <span className={`status-chip ${build.status}`}>
            <span className="pip" aria-hidden="true" />
            {statusLabel}
          </span>
        </div>
        <h3 className="build-name">{build.name}</h3>
        <p className="build-desc">{build.description}</p>
        <div className="build-tags">
          {build.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        {(build.link || build.github) && (
          <div className="build-links">
            {build.link && (
              <a className="build-link" href={build.link} target="_blank" rel="noopener noreferrer">
                Explore
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            )}
            {build.github && (
              <a className="build-link" href={build.github} target="_blank" rel="noopener noreferrer">
                GitHub
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
