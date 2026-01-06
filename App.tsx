
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandMessage from './components/BrandMessage';
import Services from './components/Services';
import TrustQuote from './components/TrustQuote';
import Fleet from './components/Fleet';
import Contact from './components/Contact';
import Legal from './components/Legal';
import CookieBanner from './components/CookieBanner';

type View = 'home' | 'legal';

function App() {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    // Smooth scroll behavior for internal links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        if (view === 'legal' && anchor.hash.startsWith('#')) {
          setView('home');
          setTimeout(() => {
            const targetElement = document.querySelector(anchor.hash);
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          return;
        }

        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('click', handleAnchorClick);
    return () => window.removeEventListener('click', handleAnchorClick);
  }, [view]);

  const navigateToLegal = () => {
    setView('legal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      <Navbar onNavigateHome={navigateToHome} />
      <main>
        {view === 'home' ? (
          <>
            <Hero />
            <BrandMessage />
            <Services />
            <TrustQuote />
            <Fleet />
            <Contact onNavigateLegal={navigateToLegal} />
          </>
        ) : (
          <Legal onBack={navigateToHome} />
        )}
      </main>
      <CookieBanner />
    </div>
  );
}

export default App;
