
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
    <section id="inicio" className="relative h-[85vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
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
            className="w-full h-full object-cover brightness-[0.45]"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 animate-in fade-in slide-in-from-bottom duration-1000">
        <div className="text-center mb-12">
          <h1 className="text-white text-3xl md:text-5xl font-bold serif mb-2 tracking-tight">
            Exclusive <span className="text-gold italic">Transfers</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base tracking-[0.2em] uppercase font-light">
            Marbella • Málaga • Gibraltar
          </p>
        </div>
        
        <HeroBookingForm />
      </div>
    </section>
  );
};

export default Hero;
