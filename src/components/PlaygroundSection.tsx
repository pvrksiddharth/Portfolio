import PlaygroundField from './PlaygroundField';

export default function PlaygroundSection() {
  return (
    <section className="section" id="playground" aria-labelledby="playground-heading">
      <div className="container">
        <p className="section-label reveal">Digital Playground</p>
        <h2 className="section-title reveal" id="playground-heading">
          A small field, listening to you.
        </h2>
        <p className="section-intro reveal">
          Points form connections when they drift close enough — and reorganise
          around wherever your cursor goes. When idle, the field wanders on its own.
          Move your pointer across the frame.
        </p>

        <div className="playground-stage reveal">
          <PlaygroundField />
          <div className="playground-caption">
            <span>
              <span className="hint-key">pointer</span> → attractor&ensp;·&ensp;distance → link opacity
            </span>
            <span>canvas 2d · rAF · no libraries</span>
          </div>
        </div>
      </div>
    </section>
  );
}
