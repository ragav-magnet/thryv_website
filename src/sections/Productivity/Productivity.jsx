import { ChevronRight } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import SpotlightCard from '../../components/ui/SpotlightCard';
import BorderBeam from '../../components/ui/BorderBeam';
import { Stagger, StaggerItem } from '../../components/ui/Reveal';
import { productivity } from '../../data/content';
import './Productivity.css';

export default function Productivity() {
  const { question, support } = productivity;
  return (
    <section className="section productivity" id="productivity">
      <div className="container">
        <SectionHeading eyebrow={productivity.eyebrow} title={productivity.title} lead={productivity.lead} />

        <Stagger className="productivity__grid" stagger={0.15}>
          <StaggerItem className="productivity__cell">
            <SpotlightCard className="prod-card prod-card--soft">
              <div className="prod-card__label">{question.label}</div>
              <h3>{question.title}</h3>
              <p className="small">{question.text}</p>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem className="productivity__cell">
            <div className="prod-card prod-card--dark">
              <BorderBeam duration={7} />
              <div className="prod-card__label">{support.label}</div>
              <h3>{support.title}</h3>
              <ol className="prod-chain">
                {support.chain.map((step, i) => (
                  <li key={step}>
                    <span>{step}</span>
                    {i < support.chain.length - 1 && <ChevronRight size={16} aria-hidden="true" />}
                  </li>
                ))}
              </ol>
              <p className="small">{support.text}</p>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
