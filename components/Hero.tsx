
import React, { useState, useEffect } from 'react';
import { ChevronDown, MessageSquare, MapPin } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroImageUrl = "https://firebasestorage.googleapis.com/v0/b/galeriaoficialapp.firebasestorage.app/o/users%2FI5KZz4BuUEfxcoAvSCAWllkQtwt1%2Fphotos%2F1767375317170_Black_Edition.png?alt=media&token=b858d521-eed4-49fb-b3c7-fc4719880825";

  return (
    <section id="inicio" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Parallax Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ 
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`,
            transition: 'transform 0.1s linear'
          }}
        >
          <img 
            src={heroImageUrl} 
            alt="Mercedes Black Edition XL Luxury Transfer Marbella" 
            className="w-full h-full object-cover brightness-[0.45]"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl animate-in fade-in slide-in-from-bottom duration-1000">
        <div className="flex items-center justify-center gap-2 text-gold text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/20 inline-flex">
          <MapPin size={14} /> Base en Marbella
        </div>
        
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]">
          Transfers en <span className="text-gold italic serif">toda Andalucía</span> <br />
          <span className="text-white text-3xl md:text-5xl lg:text-6xl block mt-2 font-light">Málaga Airport & Gibraltar</span>
        </h1>
        
        <p className="text-gray-300 text-base md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          Your premier choice for luxury private transport. Serving <span className="text-white font-medium">Puerto Banús</span>, 
          <span className="text-white font-medium"> Málaga (AGP)</span>, and <span className="text-white font-medium">Gibraltar</span> with 
          unmatched VIP excellence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book your Marbella transfer via WhatsApp"
            className="w-full sm:w-auto px-12 py-5 bg-gold hover:bg-white text-black font-extrabold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-3 shadow-2xl shadow-gold/30 hover:-translate-y-1"
          >
            Instant Quote <MessageSquare size={20} />
          </a>
          <a 
            href="#flota"
            className="w-full sm:w-auto px-12 py-5 border border-white/20 hover:border-gold/50 hover:bg-white/5 text-white font-bold uppercase tracking-widest transition-all rounded-sm backdrop-blur-sm"
          >
            Explore Fleet
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gold/30 hidden md:block">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
