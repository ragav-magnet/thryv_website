import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { Stagger, StaggerItem } from '../../components/ui/Reveal';
import { questions } from '../../data/content';
import './Questions.css';

const ACCENTS = ['teal', 'sky', 'clay'];

export default function Questions() {
  return (
    <section className="section questions" id="questions">
      <div className="container">
        <SectionHeading eyebrow={questions.eyebrow} title={questions.title} lead={questions.lead} />

        <Stagger className="questions__grid" stagger={0.07}>
          {questions.items.map((item, i) => (
            <StaggerItem key={item.q}>
              <SpotlightCard as="article" className={`question-card question-card--${ACCENTS[i % 3]}`}>
                <div className="question-card__num">Question {String(i + 1).padStart(2, '0')}</div>
                <h3 className="question-card__q">{item.q}</h3>
                <p className="question-card__hint">{item.hint}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
          <StaggerItem>
            <a href="#contact" className="question-card question-card--cta">
              <div className="question-card__num">Your question</div>
              <h3 className="question-card__q">Recognise one of these? Let’s talk it through.</h3>
              <span className="question-card__go">
                Start the conversation <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            </a>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
