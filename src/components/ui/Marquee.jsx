import './Marquee.css';

/** Infinite, edge-faded ticker (21st.dev "Marquee"). Pauses on hover. */
export default function Marquee({ items, speed = 40, className = '' }) {
  const row = (hidden) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="marquee__item">
          <span className="marquee__dot" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`} style={{ '--marquee-speed': `${speed}s` }}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
