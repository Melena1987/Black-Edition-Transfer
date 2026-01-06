
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
import { Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';

type View = 'home' | 'legal';

function App() {
  const [view, setView] = useState<View>('home');
  const [needsApiKey, setNeedsApiKey] = useState(false);

  useEffect(() => {
    // Check if API key is already selected
    const checkApiKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        // Only show selection if we are in a production-like environment and key is missing
        if (!hasKey && !process.env.API_KEY) {
          setNeedsApiKey(true);
        }
      }
    };
    checkApiKey();

    // Listen for API errors from services to re-trigger selection
    const handleApiError = () => setNeedsApiKey(true);
    window.addEventListener('gemini-api-error', handleApiError);

    // Smooth scroll behavior
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
    return () => {
      window.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('gemini-api-error', handleApiError);
    };
  }, [view]);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setNeedsApiKey(false);
      // Optional: reload to ensure all instances of GoogleGenAI get the new key
      window.location.reload();
    }
  };

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
      
      {/* API Key Selection Overlay - Modern & Discreet */}
      {needsApiKey && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-zinc-900 border border-gold/30 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6 border border-gold/20">
              <Sparkles size={32} />
            </div>
            <h2 className="text-2xl font-bold serif mb-4 text-white uppercase tracking-widest">Enable Smart Features</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              To activate smart location suggestions and our booking assistant in production, you must link your Google AI project.
            </p>
            <div className="space-y-4">
              <button 
                onClick={handleSelectKey}
                className="w-full bg-gold hover:bg-white text-black font-black uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-lg shadow-gold/10"
              >
                Connect API Project
              </button>
              <button 
                onClick={() => setNeedsApiKey(false)}
                className="w-full bg-white/5 hover:bg-white/10 text-white/50 py-3 rounded-xl text-xs uppercase tracking-widest transition-all"
              >
                Continue manually
              </button>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-gold/60 flex items-center justify-center gap-2 hover:text-gold transition-colors"
              >
                <ShieldCheck size={12} />
                Requires Google Cloud Billing Project <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      )}

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
