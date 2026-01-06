
import React, { useState, useEffect, useRef } from 'react';
import { User, Calendar, Clock, Phone, MapPin, Users, Send, MapPinned, Mail, Luggage, MessageSquare, Loader2, CheckCircle2, Search } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { WHATSAPP_NUMBER } from '../constants';
import { getPlaceSuggestions } from '../services/gemini';

const TravelForm: React.FC = () => {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    phone: '',
    origin: '',
    destination: '',
    passengers: '1',
    luggage: '1-2 Large',
    observations: ''
  });

  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<'origin' | 'destination' | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'origin' || name === 'destination') {
      handleAutocomplete(name, value);
    }
  };

  const handleAutocomplete = async (name: 'origin' | 'destination', value: string) => {
    if (value.length < 3) {
      name === 'origin' ? setOriginSuggestions([]) : setDestSuggestions([]);
      return;
    }

    setIsSearching(true);
    const suggestions = await getPlaceSuggestions(value);
    if (name === 'origin') {
      setOriginSuggestions(suggestions);
    } else {
      setDestSuggestions(suggestions);
    }
    setIsSearching(false);
  };

  const selectSuggestion = (name: 'origin' | 'destination', value: string) => {
    setFormData({ ...formData, [name]: value });
    if (name === 'origin') setOriginSuggestions([]);
    else setDestSuggestions([]);
    setActiveInput(null);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData(prev => ({
          ...prev,
          origin: `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`
        }));
      }, (err) => {
        console.warn("Geolocation access denied or unavailable.");
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const message = `Hello Black Edition Transfer! 
I would like to request a quote for a luxury transfer:
- Name: ${formData.name}
- Email: ${formData.email || 'Not provided'}
- Date: ${formData.date}
- Time: ${formData.time}
- Passengers: ${formData.passengers}
- Luggage: ${formData.luggage}
- Pickup: ${formData.origin}
- Destination: ${formData.destination}
- Contact Phone: ${formData.phone}
${formData.observations ? `- Observations: ${formData.observations}` : ''}

Please let me know the availability and price. Thank you!`;

    try {
      const env = (import.meta as any).env;
      const serviceId = env.VITE_EMAILJS_SERVICE_ID;
      const templateId = env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            origin: formData.origin,
            destination: formData.destination,
            passengers: formData.passengers,
            luggage: formData.luggage,
            observations: formData.observations,
            message: message 
          },
          publicKey
        );
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      const encoded = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encoded}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsSending(false);
        if (isSuccess) {
           setFormData({
            name: '', email: '', date: '', time: '', phone: '', origin: '', destination: '',
            passengers: '1', luggage: '1-2 Large', observations: ''
           });
        }
      }, 800);
    }
  };

  const handleDateClick = () => {
    if (dateInputRef.current) {
      // Modern browsers allow triggering the native picker
      if ('showPicker' in HTMLInputElement.prototype) {
        try {
          dateInputRef.current.showPicker();
        } catch (e) {
          dateInputRef.current.focus();
        }
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const inputClasses = "w-full bg-black/40 border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all text-sm";
  const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-gold opacity-70";
  const labelClasses = "block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-1";

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setOriginSuggestions([]);
      setDestSuggestions([]);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  if (isSuccess) {
    return (
      <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="bg-gold/20 p-6 rounded-full border border-gold/30">
            <CheckCircle2 size={48} className="text-gold" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 serif text-white">Request Received!</h3>
        <p className="text-gray-400 max-w-sm mx-auto mb-8">
          Your inquiry has been sent. We are also opening WhatsApp to provide you with an immediate quote.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="text-gold text-xs uppercase tracking-widest font-bold hover:text-white transition-colors"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className={labelClasses}>Full Name</label>
          <div className="relative">
            <User size={18} className={iconClasses} />
            <input required type="text" name="name" placeholder="e.g. John Doe" className={inputClasses} onChange={handleChange} disabled={isSending} value={formData.name} autoComplete="name" />
          </div>
        </div>
        <div className="relative">
          <label className={labelClasses}>Email Address (Optional)</label>
          <div className="relative">
            <Mail size={18} className={iconClasses} />
            <input type="email" name="email" placeholder="email@example.com" className={inputClasses} onChange={handleChange} disabled={isSending} value={formData.email} autoComplete="email" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className={labelClasses}>Phone (inc. Country Code)</label>
          <div className="relative">
            <Phone size={18} className={iconClasses} />
            <input required type="tel" name="phone" placeholder="+34 000 000 000" className={inputClasses} onChange={handleChange} disabled={isSending} value={formData.phone} autoComplete="tel" />
          </div>
        </div>
        <div className="relative">
          <label className={labelClasses}>Travel Date</label>
          <div className="relative cursor-pointer" onClick={handleDateClick}>
            <Calendar size={18} className={iconClasses} />
            <input 
              ref={dateInputRef}
              required 
              type="date" 
              name="date" 
              className={`${inputClasses} cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer`} 
              onChange={handleChange} 
              disabled={isSending} 
              value={formData.date} 
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative">
          <label className={labelClasses}>Pickup Time</label>
          <div className="relative">
            <Clock size={18} className={iconClasses} />
            <input required type="time" name="time" className={inputClasses} onChange={handleChange} disabled={isSending} value={formData.time} />
          </div>
        </div>
        <div className="relative">
          <label className={labelClasses}>Passengers</label>
          <div className="relative">
            <Users size={18} className={iconClasses} />
            <select name="passengers" className={inputClasses} onChange={handleChange} value={formData.passengers} disabled={isSending}>
              {[1,2,3,4,5,6,7].map(num => (<option key={num} value={num} className="bg-zinc-900 text-white">{num} Passengers</option>))}
              <option value="8+" className="bg-zinc-900 text-white">8+ (Multiple Vehicles)</option>
            </select>
          </div>
        </div>
        <div className="relative">
          <label className={labelClasses}>Luggage</label>
          <div className="relative">
            <Luggage size={18} className={iconClasses} />
            <select name="luggage" className={inputClasses} onChange={handleChange} value={formData.luggage} disabled={isSending}>
              <option value="Hand Luggage only" className="bg-zinc-900 text-white">Hand luggage only</option>
              <option value="1-2 Large Suitcases" className="bg-zinc-900 text-white">1-2 Large Suitcases</option>
              <option value="3-5 Large Suitcases" className="bg-zinc-900 text-white">3-5 Large Suitcases</option>
              <option value="6-8 Large Suitcases" className="bg-zinc-900 text-white">6-8 Large Suitcases</option>
              <option value="9+ Large Suitcases" className="bg-zinc-900 text-white">9+ Large Suitcases</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pickup Location */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-end mb-2">
            <label className={labelClasses}>Pickup Location</label>
            <button type="button" onClick={handleUseLocation} disabled={isSending} className="text-[9px] text-gold hover:text-white flex items-center gap-1 uppercase tracking-tighter mb-2 transition-colors disabled:opacity-30"><MapPinned size={10} /> Use my location</button>
          </div>
          <div className="relative">
            <MapPin size={18} className={iconClasses} />
            <input 
              required 
              type="text" 
              name="origin" 
              autoComplete="shipping address-line1"
              value={formData.origin} 
              placeholder="Airport, Hotel, or Address" 
              className={inputClasses} 
              onChange={handleChange} 
              onFocus={() => setActiveInput('origin')}
              disabled={isSending} 
            />
            {isSearching && activeInput === 'origin' && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 size={14} className="text-gold animate-spin" />
              </div>
            )}
            
            {originSuggestions.length > 0 && activeInput === 'origin' && (
              <ul className="absolute z-[60] w-full mt-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                {originSuggestions.map((s, i) => (
                  <li 
                    key={i} 
                    onClick={() => selectSuggestion('origin', s)}
                    className="px-4 py-3 text-sm text-gray-300 hover:bg-gold hover:text-black cursor-pointer transition-colors flex items-center gap-3"
                  >
                    <Search size={14} className="opacity-50" />
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Destination */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <label className={labelClasses}>Destination</label>
          <div className="relative pt-[22px]">
            <MapPin size={18} className="absolute left-4 top-[calc(50%+11px)] -translate-y-1/2 text-gold opacity-70" />
            <input 
              required 
              type="text" 
              name="destination" 
              autoComplete="shipping address-line1"
              placeholder="Drop-off point" 
              className={inputClasses} 
              onChange={handleChange} 
              onFocus={() => setActiveInput('destination')}
              disabled={isSending} 
              value={formData.destination} 
            />
            {isSearching && activeInput === 'destination' && (
              <div className="absolute right-4 top-[calc(50%+11px)] -translate-y-1/2">
                <Loader2 size={14} className="text-gold animate-spin" />
              </div>
            )}

            {destSuggestions.length > 0 && activeInput === 'destination' && (
              <ul className="absolute z-[60] w-full mt-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                {destSuggestions.map((s, i) => (
                  <li 
                    key={i} 
                    onClick={() => selectSuggestion('destination', s)}
                    className="px-4 py-3 text-sm text-gray-300 hover:bg-gold hover:text-black cursor-pointer transition-colors flex items-center gap-3"
                  >
                    <Search size={14} className="opacity-50" />
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="relative">
        <label className={labelClasses}>Observations (Optional)</label>
        <div className="relative">
          <MessageSquare size={18} className="absolute left-4 top-5 text-gold opacity-70" />
          <textarea name="observations" placeholder="e.g. Flight number, child seats required, extra stops..." className={`${inputClasses} h-24 pt-4 resize-none`} onChange={handleChange} disabled={isSending} value={formData.observations}></textarea>
        </div>
      </div>
      <button type="submit" disabled={isSending} className="w-full py-5 bg-gold hover:bg-white text-black font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-gold/10 mt-4 disabled:opacity-70 disabled:hover:bg-gold disabled:cursor-not-allowed">
        {isSending ? (<><Loader2 size={18} className="animate-spin" /> Processing Request...</>) : (<><Send size={18} /> Send Quote via Email & WhatsApp</>)}
      </button>
    </form>
  );
};
export default TravelForm;
