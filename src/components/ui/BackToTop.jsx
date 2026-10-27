import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/** Floating back-to-top button that appears after scrolling. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileHover={{ y: -3 }}
          style={{
            position: 'fixed', right: 20, bottom: 20, zIndex: 90,
            width: 46, height: 46, borderRadius: '50%',
            display: 'grid', placeItems: 'center',
            background: 'var(--ink)', color: 'var(--white)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <ArrowUp size={19} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
