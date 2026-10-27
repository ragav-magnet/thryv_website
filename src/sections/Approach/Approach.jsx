import { motion, useReducedMotion } from 'framer-motion';
import { Target, Handshake, Cog } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';
import WordsPullUp from '../../components/ui/WordsPullUp';
import { Reveal, Stagger, StaggerItem } from '../../components/ui/Reveal';
import { approach } from '../../data/content';
import './Approach.css';

const ICONS = [Target, Handshake, Cog];

export default function Approach() {
  const reduce = useReducedMotion();
  return (
    <section className="section approach" id="approach">
      <div className="container">
        <div className="approach__intro">
          <div>
            <Reveal y={12} blur={false}><div className="eyebrow">{approach.eyebrow}</div></Reveal>
            <WordsPullUp as="h2" className="h2" text={approach.title} />
            <Reveal delay={0.1}><p className="lead">{approach.lead}</p></Reveal>
          </div>
          <Reveal delay={0.2} className="approach__promise">
            <span className="approach__quote" aria-hidden="true">“</span>
            {approach.promise}
          </Reveal>
        </div>

        <Stagger className="approach__levels" stagger={0.15}>
          {approach.levels.map((level, i) => {
            const Icon = ICONS[i];
            return (
              <StaggerItem key={level.index} className="approach__cell">
                <SpotlightCard as="article" className={`level-card level-card--${level.tone}`} color="rgba(255,255,255,0.6)">
                  <div className="level-card__top">
                    <span className="level-card__index">{level.index}</span>
                    <span className="level-card__icon"><Icon size={20} aria-hidden="true" /></span>
                  </div>
                  <h3>{level.title}</h3>
                  <p>{level.text}</p>
                  <span className="level-card__bar" aria-hidden="true" style={{ '--fill': `${(i + 1) * 33.33}%` }} />
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <motion.div
          aria-hidden="true"
          className="approach__line"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
}
