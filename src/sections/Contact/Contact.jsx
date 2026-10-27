import { Mail, Phone, MapPin } from 'lucide-react';
import GridBackground from '../../components/ui/GridBackground';
import WordsPullUp from '../../components/ui/WordsPullUp';
import { Reveal, Stagger, StaggerItem } from '../../components/ui/Reveal';
import { contact, offerings } from '../../data/content';
import { siteConfig } from '../../data/siteConfig';
import ContactForm from './ContactForm';
import './Contact.css';

const cities = offerings.items.find((o) => o.cities)?.cities ?? [];

export default function Contact() {
  const details = [
    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: 'Phone', value: siteConfig.phone.display, href: siteConfig.phone.href },
    { icon: MapPin, label: 'Markets', value: cities.join(' · ') },
  ];

  return (
    <section className="section contact" id="contact">
      <GridBackground variant="dots" />
      <div className="container contact__grid">
        <div className="contact__copy">
          <Reveal y={12} blur={false}><div className="eyebrow">{contact.eyebrow}</div></Reveal>
          <WordsPullUp as="h2" className="h2" text={contact.title} />
          <Reveal delay={0.1}><p className="lead">{contact.lead}</p></Reveal>

          <Stagger as="ul" className="contact__details" stagger={0.1} delay={0.2}>
            {details.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <span className="contact__icon"><Icon size={18} aria-hidden="true" /></span>
                  <span>
                    <span className="contact__label">{label}</span>
                    <span className="contact__value">{value}</span>
                  </span>
                </>
              );
              return (
                <StaggerItem as="li" key={label}>
                  {href ? <a href={href} className="contact__detail">{inner}</a> : <div className="contact__detail">{inner}</div>}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal delay={0.15} y={36}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
