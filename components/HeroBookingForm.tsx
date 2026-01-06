
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Users, Search, Loader2, Luggage, User, Phone, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { getPlaceSuggestions } from '../services/gemini';
import { WHATSAPP_NUMBER } from '../constants';

const HeroBookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    datetime: '',
    passengers: '1',
    luggage: '1-2 Large',
    name: '',
    email: '',
    phone: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<'origin' | 'destination' | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setActiveField(null);
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAutocomplete = async (field: 'origin' | 'destination', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setActiveField(field);
    
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    
    setIsSearching(true);
    const results = await getPlaceSuggestions(value);
    setSuggestions(results);
    setIsSearching(false);
  };

  const selectSuggestion = (value: string) => {
    if (activeField) {
      setFormData(prev => ({ ...prev, [activeField]: value }));
      setSuggestions([]);
      setActiveField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const message = `Luxury Inquiry:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Email: ${formData.email || 'N/A'}
- From: ${formData.origin}
- To: ${formData.destination}
- Date/Time: ${formData.datetime}
- Pax: ${formData.passengers}
- Luggage: ${formData.luggage}`;

    try {
      const env = (import.meta as any).env;
      const serviceId = env.VITE_EMAILJS_SERVICE_ID;
      const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.datetime,
          origin: formData.origin,
          destination: formData.destination,
          passengers: formData.passengers,
          luggage: formData.luggage,
          message: message 
        }, publicKey);
      }
    } catch (error) {
      console.error('Form Error:', error);
    } finally {
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encoded}`, '_blank');
      setIsSending(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const cellClass = "relative px-4 py-3 md:px-6 md:py-4 border-white/5 transition-all hover:bg-white/[0.02]";
  const labelClass = "text-[9px] font-bold text-gold uppercase tracking-[0.2em] mb-1.5 block opacity-70";
  const inputClass = "bg-transparent border-none text-white focus:ring-0 placeholder:text-zinc-600 text-[13px] md:text-[14px] w-full outline-none p-0 h-6 font-medium appearance-none";
  const iconClass = "text-zinc-500 shrink-0";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-0 relative z-20">
      <div className="bg-[#080808]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">
          
          {/* Row 1: Core Logistics */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
            <div className={`${cellClass} md:col-span-4 border-b md:border-b-0 md:border-r`}>
              <label className={labelClass}>Pickup</label>
              <div className="flex items-center gap-3">
                <MapPin size={16} className={iconClass} />
                <input 
                  required type="text" placeholder="Origin..." className={inputClass}
                  value={formData.origin}
                  onChange={(e) => handleAutocomplete('origin', e.target.value)}
                  onFocus={() => setActiveField('origin')}
                  autoComplete="shipping address-line1"
                />
                {isSearching && activeField === 'origin' && <Loader2 size={12} className="animate-spin text-gold" />}
              </div>
              {activeField === 'origin' && suggestions.length > 0 && (
                <SuggestionList suggestions={suggestions} onSelect={selectSuggestion} />
              )}
            </div>

            <div className={`${cellClass} md:col-span-4 border-b md:border-b-0 md:border-r`}>
              <label className={labelClass}>Destination</label>
              <div className="flex items-center gap-3">
                <MapPin size={16} className={iconClass} />
                <input 
                  required type="text" placeholder="Where to?" className={inputClass}
                  value={formData.destination}
                  onChange={(e) => handleAutocomplete('destination', e.target.value)}
                  onFocus={() => setActiveField('destination')}
                  autoComplete="shipping address-line1"
                />
                {isSearching && activeField === 'destination' && <Loader2 size={12} className="animate-spin text-gold" />}
              </div>
              {activeField === 'destination' && suggestions.length > 0 && (
                <SuggestionList suggestions={suggestions} onSelect={selectSuggestion} />
              )}
            </div>

            <div className={`${cellClass} md:col-span-4 rounded-tr-xl`}>
              <label className={labelClass}>Date & Time</label>
              <div className="flex items-center gap-3">
                <Calendar size={16} className={iconClass} />
                <input 
                  required type="datetime-local" className={`${inputClass} [color-scheme:dark]`}
                  value={formData.datetime}
                  onChange={(e) => setFormData({...formData, datetime: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Personal Details & Confirmation */}
          <div className="grid grid-cols-2 md:grid-cols-12">
            
            <div className={`${cellClass} col-span-1 md:col-span-1 border-r border-b md:border-b-0 border-white/10`}>
              <label className={labelClass}>Pax</label>
              <div className="flex items-center gap-2">
                <Users size={14} className={iconClass} />
                <select 
                  className={inputClass} value={formData.passengers}
                  onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                >
                  {[1,2,3,4,5,6,7].map(n => <option key={n} value={n} className="bg-zinc-900">{n}</option>)}
                  <option value="8+" className="bg-zinc-900">8+</option>
                </select>
              </div>
            </div>

            <div className={`${cellClass} col-span-1 md:col-span-2 border-b md:border-b-0 md:border-r border-white/10`}>
              <label className={labelClass}>Luggage</label>
              <div className="flex items-center gap-2">
                <Luggage size={14} className={iconClass} />
                <select 
                  className={inputClass} value={formData.luggage}
                  onChange={(e) => setFormData({...formData, luggage: e.target.value})}
                >
                  <option value="Hand only" className="bg-zinc-900">Hand luggage</option>
                  <option value="1-2 Large" className="bg-zinc-900">1-2 Suitcases</option>
                  <option value="3-5 Large" className="bg-zinc-900">3-5 Suitcases</option>
                  <option value="6-8 Large" className="bg-zinc-900">6-8 Suitcases</option>
                  <option value="9+" className="bg-zinc-900">9+ Suitcases</option>
                </select>
              </div>
            </div>

            <div className={`${cellClass} col-span-2 md:col-span-2 border-b md:border-b-0 md:border-r border-white/10`}>
              <label className={labelClass}>Name</label>
              <div className="flex items-center gap-2">
                <User size={14} className={iconClass} />
                <input 
                  required type="text" placeholder="Full Name" className={inputClass}
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className={`${cellClass} col-span-1 md:col-span-2 border-r border-white/10`}>
              <label className={labelClass}>Phone (+Code)</label>
              <div className="flex items-center gap-2">
                <Phone size={14} className={iconClass} />
                <input 
                  required type="tel" placeholder="+34..." className={inputClass}
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className={`${cellClass} col-span-1 md:col-span-2 border-r-0 md:border-r border-white/10`}>
              <label className={labelClass}>Email</label>
              <div className="flex items-center gap-2">
                <Mail size={14} className={iconClass} />
                <input 
                  type="email" placeholder="Email" className={inputClass}
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="col-span-2 md:col-span-3 flex">
              <button 
                type="submit" disabled={isSending}
                className="w-full bg-[#c5a059] hover:bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] h-full flex items-center justify-center gap-3 transition-all px-4 py-5 md:py-0 min-h-[60px] md:min-h-0 group rounded-br-xl"
              >
                {isSending ? <Loader2 size={16} className="animate-spin" /> : (isSuccess ? <CheckCircle2 size={16} /> : <Search size={16} />)}
                <span>{isSuccess ? "Sent" : "Get Quote"}</span>
                {!isSending && !isSuccess && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-4 text-[9px] text-white/30 uppercase tracking-[0.4em] font-bold">
          <span>Discretion</span>
          <span className="w-1 h-1 bg-gold/40 rounded-full"></span>
          <span>Excellence</span>
          <span className="w-1 h-1 bg-gold/40 rounded-full"></span>
          <span>24/7 Priority</span>
        </div>
      </div>
    </div>
  );
};

const SuggestionList = ({ suggestions, onSelect }: { suggestions: string[], onSelect: (v: string) => void }) => (
  <ul className="absolute z-[100] top-full left-0 w-full mt-2 bg-zinc-900/98 backdrop-blur-3xl border border-white/10 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-1 animate-in fade-in slide-in-from-top-2 duration-200">
    {suggestions.map((s, i) => (
      <li 
        key={i} 
        onClick={() => onSelect(s)}
        className="px-5 py-3 text-[12px] text-zinc-300 hover:bg-gold hover:text-black cursor-pointer transition-colors border-b border-white/5 last:border-0 flex items-center gap-3"
      >
        <MapPin size={12} className="opacity-40" />
        <span className="truncate">{s}</span>
      </li>
    ))}
  </ul>
);

export default HeroBookingForm;
