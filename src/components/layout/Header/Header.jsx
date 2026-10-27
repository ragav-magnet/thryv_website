import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../../ui/Button';
import logo from '../../../assets/images/thryv-logo.webp';
import { navLinks } from '../../../data/siteConfig';
import useActiveSection from '../../../hooks/useActiveSection';
import './Header.css';

const SECTION_IDS = navLinks.map((l) => l.href.slice(1));

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 940 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container site-header__inner">
        <a href="#top" className="site-header__brand" aria-label="Thryv Partners home" onClick={close}>
          <img src={logo} alt="THRYV™ PARTNERS logo" width="232" height="74" />
        </a>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a key={link.href} href={link.href} className={isActive ? 'is-active' : ''} aria-current={isActive ? 'true' : undefined}>
                {isActive && <motion.span layoutId="nav-pill" className="site-header__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="site-header__link-label">{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <Button href="#contact" size="sm" className="site-header__cta" shine>
            Talk to us
          </Button>
          <button
            type="button"
            className="site-header__toggle"
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mobile-nav__inner">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={close}
                className="mobile-nav__contact"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.05 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
