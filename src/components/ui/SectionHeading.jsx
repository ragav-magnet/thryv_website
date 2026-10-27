import { Reveal } from './Reveal';
import WordsPullUp from './WordsPullUp';
import './SectionHeading.css';

/** Eyebrow + animated title + lead, with the gradient rule from the original design. */
export default function SectionHeading({ eyebrow, title, lead, light = false, rule = true, className = '' }) {
  return (
    <div className={`section-heading ${rule ? 'section-heading--rule' : ''} ${light ? 'section-heading--light' : ''} ${className}`}>
      {eyebrow && (
        <Reveal y={12} blur={false}>
          <div className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{eyebrow}</div>
        </Reveal>
      )}
      <WordsPullUp as="h2" className="h2" text={title} />
      {lead && (
        <Reveal delay={0.15}>
          <p className="lead">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
