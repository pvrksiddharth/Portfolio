import { builds } from '../data/site';
import BuildCard from './BuildCard';

export default function BuildsSection() {
  return (
    <section className="section" id="builds" aria-labelledby="builds-heading">
      <div className="container">
        <p className="section-label reveal">Selected Builds</p>
        <h2 className="section-title reveal" id="builds-heading">
          Things I am building, <br />and still figuring out.
        </h2>
        <p className="section-intro reveal">
          A small, honest gallery — work in progress is labelled as such. When a
          build has a public repository or live deployment, it will be linked here.
        </p>

        <div className="builds-grid">
          {builds.map((b) => (
            <BuildCard key={b.name} build={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
