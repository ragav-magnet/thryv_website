import Button from '../../components/ui/Button';
import GridBackground from '../../components/ui/GridBackground';
import SpotlightCard from '../../components/ui/SpotlightCard';
import WordsPullUp from '../../components/ui/WordsPullUp';
import { Reveal } from '../../components/ui/Reveal';
import { quote } from '../../data/content';
import './QuoteBand.css';

export default function QuoteBand() {
  return (
    <SpotlightCard as="section" className="quote-band" color="rgba(191,214,209,0.10)" aria-labelledby="quote-title">
      <GridBackground dark orbs={false} />
      <div className="quote-band__rings" aria-hidden="true" />
      <div className="container quote-band__inner">
        <Reveal y={12} blur={false}><div className="eyebrow eyebrow--light">{quote.eyebrow}</div></Reveal>
        <WordsPullUp as="h2" className="quote-band__title" text={quote.title} />
        <Reveal delay={0.2}><p className="quote-band__support">{quote.support}</p></Reveal>
        <Reveal delay={0.3} className="quote-band__actions">
          <Button href="#contact" size="lg" arrow shine>Start the Growth Conversation</Button>
          <Button href="#offerings" size="lg" variant="ghost-light">Explore our offerings</Button>
        </Reveal>
      </div>
    </SpotlightCard>
  );
}
