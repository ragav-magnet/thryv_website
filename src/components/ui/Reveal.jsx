import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/** Fade-and-rise on scroll into view (21st.dev "Blur Fade" pattern). */
export function Reveal({ as = 'div', delay = 0, y = 28, blur = true, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: blur ? 'blur(6px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its <StaggerItem> children as they enter the viewport. */
export function Stagger({ as = 'div', stagger = 0.08, delay = 0, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ as = 'div', className, children, ...rest }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: 26, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
