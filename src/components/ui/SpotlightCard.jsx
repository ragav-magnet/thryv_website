import { useRef } from 'react';
import './SpotlightCard.css';

/**
 * Card with a soft radial spotlight that follows the cursor
 * (21st.dev "Spotlight Card" pattern). Pure CSS variables — no re-renders.
 */
export default function SpotlightCard({ as: Tag = 'div', className = '', color = 'rgba(53,107,104,0.12)', children, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight-card ${className}`}
      style={{ '--spot-color': color }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
