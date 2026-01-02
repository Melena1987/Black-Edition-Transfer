
import React from 'react';
import { Phone, MapPin, Instagram, MessageSquare, Clock, Globe, Heart } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_LINK, PHONE_NUMBER } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contacto" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="animate-in fade-in slide-in-from-left duration-1000">
            <span className="text-gold font-bold tracking-widest uppercase text-sm block mb-4">Contact</span>
            <h2 className="text-4xl md:text-7xl font-bold mb-10 leading-tight">Book Your <br />VIP Service</h2>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center text-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-2">Main Base</h4>
                  <p className="text-2xl font-bold">Marbella, Spain</p>
                  <p className="text-gray-400 font-light">We operate across all of Andalusia, Portugal, and Madrid.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                  <Clock size={24} className="text-gold mb-4" />
                  <h5 className="font-bold text-lg mb-2">Hourly Hire</h5>
                  <p className="text-gray-400 text-sm">8, 10, and 12-hour blocks available with advance booking.</p>
                </div>
                <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                  <Globe size={24} className="text-gold mb-4" />
                  <h5 className="font-bold text-lg mb-2">Long Distance</h5>
                  <p className="text-gray-400 text-sm">Transfers to Seville, Granada, Ronda, Madrid, and Portugal.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold serif mb-2">Direct Contact</h3>
              <p className="text-gold text-xs uppercase tracking-widest font-semibold">Personalized Attention 24/7</p>
            </div>

            <div className="space-y-6">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full p-6 bg-green-600/10 border border-green-600/20 hover:bg-green-600 hover:text-white rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-600 rounded-xl text-white group-hover:bg-white group-hover:text-green-600 transition-colors">
                    <MessageSquare size={24} />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs uppercase font-bold tracking-widest opacity-70">Send Message</span>
                    <span className="text-xl font-bold">{WHATSAPP_NUMBER}</span>
                  </div>
                </div>
                <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>

              <a 
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center justify-between w-full p-6 bg-gold/10 border border-gold/20 hover:bg-gold hover:text-black rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gold rounded-xl text-black group-hover:bg-black group-hover:text-gold transition-colors">
                    <Phone size={24} />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs uppercase font-bold tracking-widest opacity-70">Direct Call</span>
                    <span className="text-xl font-bold">{PHONE_NUMBER}</span>
                  </div>
                </div>
                <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>

              <div className="pt-8 text-center">
                <p className="text-gray-500 text-sm italic">
                  "Excellence and discretion in every transfer. We speak your language."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-24 pt-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <div className="flex justify-center mb-8">
          <a 
            href="https://www.instagram.com/agp__marbella_transfers/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram size={28} />
          </a>
        </div>
        <p className="mb-2">© {new Date().getFullYear()} Black Edition Transfer Marbella. All rights reserved.</p>
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="hover:text-white transition-colors">Legal Notice</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
        
        <div className="pb-8">
          <a 
            href="https://melenamarketing.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/5 hover:border-gold/30 hover:text-white transition-all group"
          >
            <span className="text-[10px] uppercase tracking-widest">Web hecha con</span>
            <Heart size={12} className="text-red-500 fill-red-500 animate-pulse group-hover:scale-125 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">por <span className="text-gold">Melena Marketing</span></span>
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
