import './GridBackground.css';

/**
 * Decorative background: a faint grid (or dots) faded by a radial mask, plus
 * slow-drifting colour orbs (21st.dev "Grid Pattern" + "Aurora" patterns).
 */
export default function GridBackground({ variant = 'grid', orbs = true, dark = false }) {
  return (
    <div className={`bg-fx ${dark ? 'bg-fx--dark' : ''}`} aria-hidden="true">
      <div className={`bg-fx__pattern bg-fx__pattern--${variant}`} />
      {orbs && (
        <>
          <span className="bg-fx__orb bg-fx__orb--a" />
          <span className="bg-fx__orb bg-fx__orb--b" />
          <span className="bg-fx__orb bg-fx__orb--c" />
        </>
      )}
    </div>
  );
}
