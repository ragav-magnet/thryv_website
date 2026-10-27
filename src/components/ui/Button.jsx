import { ArrowUpRight } from 'lucide-react';
import './Button.css';

/**
 * Pill button with an optional shimmer sweep (inspired by 21st.dev "Shimmer Button").
 * Renders an <a> when `href` is supplied, otherwise a <button>.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  shine = false,
  className = '',
  children,
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, shine && 'btn--shine', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <ArrowUpRight className="btn__arrow" size={17} aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
