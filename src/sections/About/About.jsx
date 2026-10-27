import { Zap, Gauge, Repeat } from 'lucide-react';
import WordsPullUp from '../../components/ui/WordsPullUp';
import { Reveal, Stagger, StaggerItem } from '../../components/ui/Reveal';
import { about } from '../../data/content';
import './About.css';

const ICONS = [Zap, Gauge, Repeat];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div>
          <Reveal y={12} blur={false}><div className="eyebrow">{about.eyebrow}</div></Reveal>
          <WordsPullUp as="h2" className="h2" text={about.title} />
        </div>
        <div className="about__rule">
          <Reveal><p className="lead">{about.lead}</p></Reveal>
          <Reveal delay={0.1}><p className="about__strong">{about.strong}</p></Reveal>
          <Stagger as="ul" className="about__pillars" stagger={0.12} delay={0.15}>
            {about.pillars.map((pillar, i) => {
              const Icon = ICONS[i];
              return (
                <StaggerItem as="li" key={pillar}>
                  <Icon size={18} aria-hidden="true" />
                  {pillar}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
