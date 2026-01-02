
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#inicio' },
    { name: 'Services', href: '#servicios' },
    { name: 'Fleet', href: '#flota' },
    { name: 'Contact', href: '#contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className="flex flex-col">
          <span className="text-xl md:text-2xl font-bold tracking-widest text-white serif uppercase">Black Edition</span>
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-gold uppercase -mt-1 font-semibold">Transfer Marbella</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-gold transition-colors tracking-wide uppercase">
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-black px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2"
          >
            <Phone size={16} />
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 h-screen py-10 px-6 flex flex-col space-y-8 animate-in fade-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-semibold serif"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-black text-center py-4 rounded-xl text-lg font-bold uppercase tracking-widest"
          >
            Direct WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;