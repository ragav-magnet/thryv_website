import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import { contact } from '../../data/content';
import { siteConfig } from '../../data/siteConfig';
import { useInterestListener } from '../../hooks/useContactInterest';

const INITIAL = { name: '', email: '', company: '', phone: '', interest: contact.interests[0], message: '', website: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.email.trim()) errors.email = 'Please add an email so we can reply.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email address doesn’t look quite right.';
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) errors.phone = 'Please use digits, spaces, + or - only.';
  if (values.message.trim().length < 10) errors.message = 'A sentence or two is plenty — what are you trying to achieve?';
  return errors;
}

function buildMailto(v) {
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.company ? `Company: ${v.company}` : null,
    v.phone ? `Phone: ${v.phone}` : null,
    `Topic: ${v.interest}`,
    '',
    v.message,
  ].filter((line) => line !== null).join('\n');
  const subject = `Growth Agenda Conversation — ${v.interest}`;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error

  useInterestListener(
    useCallback((interest) => {
      if (contact.interests.includes(interest)) setValues((v) => ({ ...v, interest }));
    }, []),
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  };

  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return; // honeypot: silently ignore bots
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(found).length) {
      const first = e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }

    if (!siteConfig.contactEndpoint) {
      window.location.href = buildMailto(values);
      setStatus('mailto');
      return;
    }

    try {
      setStatus('sending');
      const { website, ...payload } = values;
      const res = await fetch(siteConfig.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('sent');
      setValues(INITIAL);
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  const err = (name) => (touched[name] ? errors[name] : undefined);
  const done = status === 'sent' || status === 'mailto';

  return (
    <div className="contact-form-card">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            className="contact-form__success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="status"
          >
            <motion.span initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}>
              <CheckCircle2 size={54} aria-hidden="true" />
            </motion.span>
            <h3>{status === 'sent' ? 'Thank you — message received.' : 'Almost there.'}</h3>
            <p>
              {status === 'sent'
                ? 'We’ll be in touch shortly to set up the conversation.'
                : <>Your email app should have opened with your message ready to send to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Just press send.</>}
            </p>
            <Button variant="outline" onClick={() => setStatus('idle')}>Send another message</Button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} className="contact-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="contact-form__head">
              <h3>Tell us about your growth agenda</h3>
              <p>Fields marked * are required.</p>
            </div>
            <div className="contact-form__grid">
              <FormField label="Full name" name="name" required autoComplete="name" placeholder="Your name" value={values.name} onChange={onChange} onBlur={onBlur} error={err('name')} />
              <FormField label="Work email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="you@company.com" value={values.email} onChange={onChange} onBlur={onBlur} error={err('email')} />
              <FormField label="Company" name="company" autoComplete="organization" placeholder="Company name" value={values.company} onChange={onChange} onBlur={onBlur} />
              <FormField label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 …" value={values.phone} onChange={onChange} onBlur={onBlur} error={err('phone')} />
              <FormField label="What would you like to discuss?" name="interest" as="select" options={contact.interests} showOptional={false} value={values.interest} onChange={onChange} className="contact-form__full" />
              <FormField
                label="Your message"
                name="message"
                as="textarea"
                required
                rows={5}
                placeholder="What are you trying to achieve, where is growth getting stuck, and what have you already tried?"
                value={values.message}
                onChange={onChange}
                onBlur={onBlur}
                error={err('message')}
                className="contact-form__full"
              />
              {/* Honeypot — hidden from people, tempting for bots */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
              </div>
            </div>

            {status === 'error' && (
              <p className="contact-form__alert" role="alert">
                Something went wrong sending your message. Please email us directly at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            )}

            <div className="contact-form__footer">
              <Button type="submit" size="lg" shine disabled={status === 'sending'}>
                <span className="contact-form__submit">
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                  <Send size={16} aria-hidden="true" />
                </span>
              </Button>
              <p className="contact-form__privacy">We’ll only use your details to respond to this enquiry.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
