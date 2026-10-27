import { motion, useReducedMotion } from 'framer-motion';

/**
 * Headline whose words pull up one by one (21st.dev "Words Pull Up" / text-reveal pattern).
 * `segments` lets parts of the headline carry their own className, e.g. a highlight.
 */
export default function WordsPullUp({ as = 'h2', segments, text, className, delay = 0, inView = true }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.h2;
  const parts = segments ?? [{ text }];

  const words = parts.flatMap((seg, si) =>
    seg.text.split(' ').filter(Boolean).map((w, wi) => ({ w, cls: seg.className, key: `${si}-${wi}` })),
  );

  const trigger = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -60px 0px' } }
    : { animate: 'show' };

  return (
    <Tag
      className={className}
      initial={reduce ? false : 'hidden'}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      aria-label={parts.map((p) => p.text).join(' ')}
    >
      {words.map(({ w, cls, key }) => (
        <span key={key} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em' }}>
          <motion.span
            className={cls}
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '105%', opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}
          </motion.span>
          {' '}
        </span>
      ))}
    </Tag>
  );
}
