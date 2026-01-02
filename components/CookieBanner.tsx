
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] animate-in slide-in-from-bottom duration-700">
      <div className="max-w-4xl mx-auto bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h4 className="text-white font-bold serif text-lg mb-2 italic">Excellence in <span className="text-gold">Privacy</span></h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            We use essential cookies to ensure you get the best experience on our luxury transfer portal. By continuing to browse, you accept our <span className="text-white underline underline-offset-4 decoration-gold/50">Cookie Policy</span>.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <button 
            onClick={handleAccept}
            className="bg-gold hover:bg-white text-black font-bold uppercase tracking-widest text-[10px] px-8 py-3 rounded-full transition-all"
          >
            Accept All
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
