import { Mail, Phone } from 'lucide-react';
import mark from '../../../assets/images/thryv-mark.webp';
import { siteConfig } from '../../../data/siteConfig';
import { Reveal } from '../../ui/Reveal';
import './Footer.css';

const explore = [
  { href: '#questions', label: 'The Questions' },
  { href: '#offerings', label: 'Offerings' },
  { href: '#approach', label: 'Our Approach' },
  { href: '#deal-hub', label: 'The Deal Hub' },
];
const company = [
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="site-footer__grid">
          <div className="site-footer__about">
            <a href="#top" className="site-footer__brand" aria-label="Back to top">
              <img src={mark} alt="" width="52" height="52" className="site-footer__mark" />
              <div>
                <div className="site-footer__wordmark">THRYV<sup>™</sup></div>
                <div className="site-footer__partners">PARTNERS</div>
              </div>
            </a>
            <p>Battle-tested sales leadership, practical commercial thinking and focused execution for your growth agenda.</p>
          </div>

          <div>
            <h3>Explore</h3>
            <ul className="site-footer__links">
              {explore.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Company</h3>
            <ul className="site-footer__links">
              {company.map((l) => (
                <li key={l.href}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Get in touch</h3>
            <ul className="site-footer__contact">
              <li>
                <a href={`mailto:${siteConfig.email}`}>
                  <span className="site-footer__icon"><Mail size={15} aria-hidden="true" /></span>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.phone.href} aria-label={`Call ${siteConfig.phone.display}`}>
                  <span className="site-footer__icon"><Phone size={15} aria-hidden="true" /></span>
                  {siteConfig.phone.display}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="site-footer__fine">
          <span>© {year} {siteConfig.name}</span>
          <span>{siteConfig.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
