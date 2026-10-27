import './BorderBeam.css';

/**
 * A light beam that travels around the border of its parent
 * (21st.dev / Magic UI "Border Beam"). Parent must be position:relative.
 */
export default function BorderBeam({ duration = 8, colorFrom = '#d7c2a0', colorTo = '#bfd6d1', width = 1.5 }) {
  return (
    <span
      aria-hidden="true"
      className="border-beam"
      style={{ '--beam-duration': `${duration}s`, '--beam-from': colorFrom, '--beam-to': colorTo, '--beam-width': `${width}px` }}
    />
  );
}
