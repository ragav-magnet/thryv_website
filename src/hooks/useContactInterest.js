import { useEffect } from 'react';

const EVENT = 'thryv:contact-interest';

/**
 * Lets any "Talk about …" button pre-select the topic in the contact form.
 * Call `selectInterest('Outsourced Sales')` from an onClick; the form listens.
 */
export function selectInterest(interest) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: interest }));
}

export function useInterestListener(callback) {
  useEffect(() => {
    const handler = (e) => callback(e.detail);
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, [callback]);
}
