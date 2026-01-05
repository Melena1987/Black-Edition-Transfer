
import React from 'react';
import { Phone, MapPin, Instagram, MessageSquare, Clock, Globe, Heart, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_LINK, PHONE_NUMBER } from '../constants';
import TravelForm from './TravelForm';

interface ContactProps {
  onNavigateLegal?: () => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigateLegal }) => {
  return (
    <section id="contacto" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 blur-[120px] rounded-full"></div>
      <div className="absolute top-1/2 -left-48 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs block mb-4">Reservation Inquiry</span>
          <h2 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
            Book Your <span className="text-gold italic serif">VIP Travel</span>
          </h2>
          <div className="h-1 w-24 bg-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md shadow-2xl">
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-white mb-2 serif italic">Travel Details</h3>
              <p className="text-gray-400 text-sm font-light">Please provide your journey details for an accurate quote.</p>
            </div>
            <TravelForm />
          </div>

          {/* Contact Info Side */}
          <div className="lg:col-span-5 space-y-8 h-full flex flex-col justify-between">
            <div className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-sm">
              <div className="mb-12">
                <span className="text-gold font-bold tracking-widest uppercase text-[10px] block mb-6">Direct Channels</span>
                
                <div className="space-y-6">
                  {/* WhatsApp Button */}
                  <a 
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-6 bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/5 rounded-2xl transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="p-4 bg-zinc-950 border border-white/10 rounded-xl text-green-500 group-hover:scale-110 transition-transform duration-500">
                        <MessageSquare size={22} />
                      </div>
                      <div className="text-left">
                        <span className="block text-[9px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-green-500 transition-colors">WhatsApp Message</span>
                        <span className="text-lg md:text-xl font-bold text-white tracking-tight">{WHATSAPP_NUMBER}</span>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-white/20 group-hover:text-green-500 group-hover:translate-x-2 transition-all duration-300 relative z-10" />
                  </a>

                  {/* Direct Call Button */}
                  <a 
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center justify-between w-full p-6 bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/5 rounded-2xl transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="p-4 bg-zinc-950 border border-white/10 rounded-xl text-gold group-hover:scale-110 transition-transform duration-500">
                        <Phone size={22} />
                      </div>
                      <div className="text-left">
                        <span className="block text-[9px] uppercase font-bold tracking-widest text-gray-500 group-hover:text-gold transition-colors">Direct Call</span>
                        <span className="text-lg md:text-xl font-bold text-white tracking-tight">{PHONE_NUMBER}</span>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-white/20 group-hover:text-gold group-hover:translate-x-2 transition-all duration-300 relative z-10" />
                  </a>
                </div>
              </div>

              <div className="space-y-8 pt-6 border-t border-white/5">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-500 uppercase text-[10px] font-bold tracking-widest mb-1">Operational Base</h4>
                    <p className="text-xl font-bold text-white">Marbella & Málaga</p>
                    <p className="text-gray-400 font-light text-xs">Serving all Andalusia and Gibraltar.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-black/40 border border-white/5 rounded-2xl">
                    <Clock size={18} className="text-gold mb-3" />
                    <h5 className="font-bold text-sm mb-1 text-white italic serif">24/7 Service</h5>
                    <p className="text-gray-500 text-[10px] leading-tight">Around the clock availability.</p>
                  </div>
                  <div className="p-5 bg-black/40 border border-white/5 rounded-2xl">
                    <Globe size={18} className="text-gold mb-3" />
                    <h5 className="font-bold text-sm mb-1 text-white italic serif">Andalusia</h5>
                    <p className="text-gray-500 text-[10px] leading-tight">Intercity long-distance travel.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left px-4">
              <p className="text-gray-500 text-xs italic font-light tracking-wide leading-relaxed">
                "Excellence and total discretion in every journey. Our team is ready to assist you in English, Spanish, and French."
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-24 pt-12 border-t border-white/5 text-center text-gray-500 text-[11px] tracking-widest uppercase font-medium">
        <div className="flex justify-center mb-10">
          <a 
            href="https://www.instagram.com/agp__marbella_transfers/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold hover:scale-110 transition-all duration-500 bg-zinc-900/50 backdrop-blur-sm"
            aria-label="Instagram"
          >
            <Instagram size={32} strokeWidth={1.5} />
          </a>
        </div>
        <p className="mb-3">© {new Date().getFullYear()} Black Edition Transfer Marbella</p>
        <div className="flex justify-center gap-8 mb-10 opacity-60">
          <button onClick={onNavigateLegal} className="hover:text-gold transition-colors">Legal Notice</button>
          <button onClick={onNavigateLegal} className="hover:text-gold transition-colors">Privacy Policy</button>
          <button onClick={onNavigateLegal} className="hover:text-gold transition-colors">Cookies</button>
        </div>
        
        <div className="pb-12 flex justify-center">
          <a 
            href="https://melenamarketing.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-4 px-5 md:px-8 py-3 rounded-full bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all group backdrop-blur-sm shadow-xl shadow-black/40 whitespace-nowrap overflow-hidden max-w-full"
          >
            <span className="text-[8px] md:text-[10px] tracking-widest text-white/60">WEBSITE CRAFTED WITH</span>
            <Heart size={14} className="text-red-500 fill-red-500/10 group-hover:fill-red-500 animate-pulse transition-all shrink-0" />
            <span className="text-[8px] md:text-[10px] tracking-widest text-white/60">BY <span className="text-gold font-black group-hover:text-white transition-colors">MELENA MARKETING</span></span>
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
