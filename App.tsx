
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import TrustQuote from './components/TrustQuote';
import Fleet from './components/Fleet';
import Contact from './components/Contact';
import Legal from './components/Legal';
import CookieBanner from './components/CookieBanner';
import { MessageSquare } from 'lucide-react';
import { WHATSAPP_LINK } from './constants';

type View = 'home' | 'legal';

function App() {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    // Smooth scroll behavior for internal links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        // If we are in legal view and click a home link, switch back
        if (view === 'legal' && anchor.hash.startsWith('#')) {
          setView('home');
          // Wait for render then scroll
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
            <Services />
            <TrustQuote />
            <Fleet />
            <Contact onNavigateLegal={navigateToLegal} />
          </>
        ) : (
          <Legal onBack={navigateToHome} />
        )}
      </main>
      
      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[90] flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-pulse-gold group"
        aria-label="Contact via WhatsApp"
      >
        <MessageSquare size={32} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
          WhatsApp 24/7
        </span>
      </a>

      <CookieBanner />
    </div>
  );
}

export default App;
