import { Check, MapPin } from 'lucide-react';
import Button from '../../components/ui/Button';
import SectionHeading from '../../components/ui/SectionHeading';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { Stagger, StaggerItem } from '../../components/ui/Reveal';
import { offerings } from '../../data/content';
import { selectInterest } from '../../hooks/useContactInterest';
import './Offerings.css';

function OfferingCard({ item, index }) {
  return (
    <SpotlightCard as="article" className={`offering-card offering-card--${item.tone}`} color="rgba(255,255,255,0.55)">
      <span className="offering-card__ring" aria-hidden="true" />
      <div>
        <div className="offering-card__head">
          <span className="offering-card__tag">{item.tag}</span>
          <span className="offering-card__index" aria-hidden="true">0{index + 1}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.text}</p>

        {item.list && (
          <ul className="offering-card__list">
            {item.list.map((li) => (
              <li key={li}>
                <Check size={16} aria-hidden="true" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        )}

        {item.cities && (
          <ul className="offering-card__cities" aria-label="Markets covered">
            {item.cities.map((city) => (
              <li key={city}>
                <MapPin size={14} aria-hidden="true" />
                {city}
              </li>
            ))}
          </ul>
        )}
        {item.meta && <p className="offering-card__meta">{item.meta}</p>}
      </div>

      <Button href="#contact" variant={item.variant} arrow onClick={() => selectInterest(item.interest)}>
        {item.cta}
      </Button>
    </SpotlightCard>
  );
}

export default function Offerings() {
  return (
    <section className="section offerings" id="offerings">
      <div className="container">
        <SectionHeading eyebrow={offerings.eyebrow} title={offerings.title} lead={offerings.lead} />
        <Stagger className="offerings__grid" stagger={0.12}>
          {offerings.items.map((item, i) => (
            <StaggerItem key={item.tag} className="offerings__cell">
              <OfferingCard item={item} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
