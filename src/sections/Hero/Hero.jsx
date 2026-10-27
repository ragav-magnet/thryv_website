import { motion, useReducedMotion } from 'framer-motion';
import Button from '../../components/ui/Button';
import BorderBeam from '../../components/ui/BorderBeam';
import GridBackground from '../../components/ui/GridBackground';
import Marquee from '../../components/ui/Marquee';
import WordsPullUp from '../../components/ui/WordsPullUp';
import { hero } from '../../data/content';
import './Hero.css';

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

function Leaf() {
  return (
    <svg className="hero-panel__leaf" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M25.9 4.2C14.1 4.1 6.5 10.1 6.7 19.7c.1 4.7 3 7.4 7 7.4 8.5-.1 13.2-9.5 12.2-22.9Z" fill="#DFEAE2" stroke="#356B68" strokeWidth="1.2" />
      <path d="M4 28c5.4-8.9 10.2-12.7 18.5-17.9" stroke="#356B68" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const m = (delay) => (reduce ? {} : fadeUp(delay));
  const { panel } = hero;

  return (
    <section className="hero" id="main-content">
      <GridBackground variant="grid" />
      <div className="hero__stripe" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.div className="eyebrow" {...m(0.05)}>{hero.eyebrow}</motion.div>
          <WordsPullUp
            as="h1"
            className="hero__title"
            inView={false}
            delay={0.15}
            segments={[{ text: hero.titleLead }, { text: hero.titleHighlight, className: 'hero__highlight' }]}
          />
          <motion.p className="lead hero__lead" {...m(0.55)}>{hero.lead}</motion.p>
          <motion.div className="hero__actions" {...m(0.7)}>
            <Button href="#contact" size="lg" arrow shine>Talk to us</Button>
            <Button href="#approach" size="lg" variant="outline">Explore our approach</Button>
          </motion.div>
          <motion.div className="hero__note" {...m(0.85)}>
            <span className="hero__note-dot" aria-hidden="true" />
            {hero.note}
          </motion.div>
        </div>

        <motion.aside
          className="hero-panel"
          aria-label="Thryv's three levels of commercial support"
          initial={reduce ? false : { opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
        >
          <BorderBeam duration={10} />
          <div className="hero-panel__top">
            <div>
              <div className="hero-panel__kicker">{panel.kicker}</div>
              <h2>{panel.title}</h2>
            </div>
            <Leaf />
          </div>

          <ol className="hero-panel__steps">
            <motion.span
              className="hero-panel__rail"
              aria-hidden="true"
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
            />
            {panel.steps.map((step, i) => (
              <motion.li
                key={step.n}
                className="hero-panel__step"
                initial={reduce ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.18, ease: EASE }}
              >
                <span className={`hero-panel__num hero-panel__num--${step.tone}`}>{step.n}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
          <div className="hero-panel__foot">{panel.foot}</div>
        </motion.aside>
      </div>

      <motion.div className="hero__marquee" {...m(1.1)}>
        <Marquee items={hero.marquee} speed={45} />
      </motion.div>
    </section>
  );
}
