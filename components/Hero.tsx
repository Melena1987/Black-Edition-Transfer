
import React, { useState, useEffect } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
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
            className="w-full h-full object-cover brightness-[0.5]"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl animate-in fade-in slide-in-from-bottom duration-1000">
        <h2 className="text-gold text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-4">Premium Transfer & Chauffeur Services</h2>
        <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
          Transfers <span className="text-gold italic">Marbella</span> Málaga <br />
          <span className="text-white">Gibraltar</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          Reliable private transfers throughout <span className="text-white font-medium">Andalusia</span>. <br className="hidden md:block" />
          Specialized in <span className="text-white font-medium">Málaga Airport (AGP)</span>, luxury chauffeur hire, and port connections with local Marbella expertise.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book your Marbella transfer via WhatsApp"
            className="w-full sm:w-auto px-10 py-5 bg-gold hover:bg-white text-black font-bold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-3 shadow-xl shadow-gold/20"
          >
            Instant Quote <MessageSquare size={20} />
          </a>
          <a 
            href="#flota"
            className="w-full sm:w-auto px-10 py-5 border border-white/30 hover:bg-white/10 text-white font-bold uppercase tracking-widest transition-all rounded-sm backdrop-blur-sm"
          >
            Explore Fleet
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gold/50 hidden md:block">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
