import { MotionConfig } from 'framer-motion';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import { Hero, Questions, Offerings, DealHub, Approach, Productivity, QuoteBand, About, Contact } from './sections';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Questions />
        <Offerings />
        <DealHub />
        <Approach />
        <Productivity />
        <QuoteBand />
        <About />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
