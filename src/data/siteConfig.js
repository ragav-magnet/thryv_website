// Central contact + brand details. Change them here and they update everywhere.
export const siteConfig = {
  name: 'THRYV™ PARTNERS',
  email: 'vikas@thryvpartners.in',
  phone: {
    display: '+91 99863 68486',
    href: 'tel:+919986368486',
  },
  tagline: 'Think clearly · Act decisively · Build capability that lasts',
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
};

export const mailto = (subject) =>
  `mailto:${siteConfig.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const navLinks = [
  { href: '#questions', label: 'Growth Questions' },
  { href: '#offerings', label: 'Our Services' },
  { href: '#deal-hub', label: 'The Deal Hub' },
  { href: '#approach', label: 'Our Approach' },
  { href: '#about', label: 'About' },
];
