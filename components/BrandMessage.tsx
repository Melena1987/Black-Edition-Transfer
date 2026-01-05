
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

const BrandMessage: React.FC = () => {
  return (
    <section className="bg-black py-24 md:py-32 relative overflow-hidden">
      {/* Subtle light effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-gold/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="animate-in fade-in slide-in-from-bottom duration-1000">
          <h2 className="text-gold text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-6">Luxury Chauffeur Service</h2>
          <h2 className="text-5xl md:text-8xl font-bold mb-10 leading-tight">
            Transfers <span className="text-gold italic">Andalucía</span> <br />
            <span className="text-white text-3xl md:text-5xl block mt-4 tracking-widest uppercase font-light">Your Premium Journey Awaits</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Premium private transfers based in <span className="text-white font-medium">Marbella</span>. <br className="hidden md:block" />
            Specialized in <span className="text-white font-medium">Málaga Airport (AGP)</span>, Gibraltar, and port connections throughout the Costa del Sol.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 bg-gold hover:bg-white text-black font-bold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-3 shadow-2xl shadow-gold/10"
            >
              Contact Specialist <MessageSquare size={20} />
            </a>
            <a 
              href="#servicios"
              className="w-full sm:w-auto px-12 py-5 border border-white/20 hover:bg-white/10 text-white font-bold uppercase tracking-widest transition-all rounded-sm backdrop-blur-sm"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandMessage;
