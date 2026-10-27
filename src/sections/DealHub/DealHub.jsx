import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Compass, ScanEye, Sparkles, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import BorderBeam from '../../components/ui/BorderBeam';
import GridBackground from '../../components/ui/GridBackground';
import SpotlightCard from '../../components/ui/SpotlightCard';
import WordsPullUp from '../../components/ui/WordsPullUp';
import { Reveal, Stagger, StaggerItem } from '../../components/ui/Reveal';
import { dealHub } from '../../data/content';
import { mailto } from '../../data/siteConfig';
import './DealHub.css';

const STAGE_ICONS = [Compass, ScanEye, Sparkles, ShieldCheck];
const SUBJECT = 'The Deal Hub Conversation';

export default function DealHub() {
  const processRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: processRef, offset: ['start 85%', 'end 55%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { card, capHead, stages, bottom } = dealHub;

  return (
    <section className="section deal-hub" id="deal-hub">
      <GridBackground variant="dots" orbs={false} />
      <div className="deal-hub__rings" aria-hidden="true" />

      <div className="container deal-hub__container">
        {/* Intro */}
        <div className="deal-hub__hero">
          <div>
            <Reveal y={12} blur={false}><div className="eyebrow">{dealHub.eyebrow}</div></Reveal>
            <WordsPullUp as="h2" className="deal-hub__title" text={dealHub.title} />
            {dealHub.leads.map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.1}>
                <p className="deal-hub__lead">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="deal-hub__actions">
              <Button href="#deal-steps" arrow shine>Explore the approach</Button>
              <Button href={mailto(SUBJECT)} variant="outline">Discuss a strategic pursuit</Button>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <aside className="deal-card">
              <BorderBeam duration={9} />
              <div className="deal-card__label">{card.label}</div>
              <h3>{card.title}</h3>
              <Stagger as="ul" className="deal-card__list" stagger={0.15} delay={0.3}>
                {card.promises.map((p) => (
                  <StaggerItem as="li" key={p.when}>
                    <strong>{p.when}</strong>
                    <span>{p.what}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </aside>
          </Reveal>
        </div>

        {/* Capability head */}
        <div className="deal-hub__cap-head" id="deal-steps">
          <Reveal y={12} blur={false}><div className="eyebrow">{capHead.eyebrow}</div></Reveal>
          <WordsPullUp as="h3" text={capHead.title} />
          <Reveal delay={0.1}><p>{capHead.text}</p></Reveal>
        </div>

        {/* Four-stage process with scroll-linked progress rail */}
        <div className="deal-process" ref={processRef} aria-label="The Deal Hub approach">
          <div className="deal-process__rail" aria-hidden="true">
            <motion.span style={{ scaleX: reduce ? 1 : lineScale }} />
          </div>
          <Stagger className="deal-process__grid" stagger={0.12}>
            {stages.map((s, i) => {
              const Icon = STAGE_ICONS[i];
              return (
                <StaggerItem key={s.n} className="deal-process__cell">
                  <SpotlightCard as="article" className={`deal-stage deal-stage--${i + 1}`}>
                    <div className="deal-stage__top">
                      <span className="deal-stage__icon"><Icon size={19} aria-hidden="true" /></span>
                      <span className="deal-stage__number">{s.n}</span>
                    </div>
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Bottom panel */}
        <Reveal className="deal-hub__bottom">
          <div>
            <div className="eyebrow">{bottom.eyebrow}</div>
            <h3>{bottom.title}</h3>
            <p>{bottom.text}</p>
            <Button href={mailto(SUBJECT)} arrow>Talk about a landmark pursuit</Button>
          </div>
          <div>
            <div className="deal-hub__motto">
              {bottom.motto.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
            <div className="deal-pilot">
              <h4>{bottom.pilotTitle}</h4>
              <p>{bottom.pilotText}</p>
            </div>
            <p className="deal-hub__note">{bottom.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
