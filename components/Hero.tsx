
import React, { useState, useEffect } from 'react';
import HeroBookingForm from './HeroBookingForm';

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
    <section id="inicio" className="relative min-h-screen md:h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-0">
      {/* Parallax Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ 
            transform: `translateY(${scrollY * 0.4}px) scale(1.1)`,
            transition: 'transform 0.1s linear'
          }}
        >
          <img 
            src={heroImageUrl} 
            alt="Mercedes Black Edition XL Luxury Transfer Marbella" 
            className="w-full h-full object-cover brightness-[0.4]"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 md:px-6 mt-10 md:mt-0 flex flex-col items-center">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-white text-4xl md:text-7xl font-bold serif mb-2 tracking-tight">
            Exclusive <span className="text-gold italic">Transfers</span>
          </h1>
          <div className="flex items-center justify-center gap-3 md:gap-6 text-gold/60 text-[9px] md:text-xs tracking-[0.4em] uppercase font-black">
            <span>Marbella</span>
            <span className="w-1 h-1 bg-gold/30 rounded-full"></span>
            <span>Málaga</span>
            <span className="w-1 h-1 bg-gold/30 rounded-full"></span>
            <span>Gibraltar</span>
          </div>
        </div>
        
        <HeroBookingForm />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-30 hidden md:block">
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
