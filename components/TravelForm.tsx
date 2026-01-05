import React, { useState } from 'react';
import { User, Calendar, Clock, Phone, MapPin, Users, Send, MapPinned, Mail, Luggage, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { WHATSAPP_NUMBER } from '../constants';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData(prev => ({
          ...prev,
          origin: `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`
        }));
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

    // 1. Send via EmailJS (Mandatory execution)
    try {
      // Use process.env instead of import.meta.env to resolve property access errors on ImportMeta
      const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error("Missing EmailJS environment variables");
        throw new Error("EmailJS config missing");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          // Map properties to match the configured EmailJS template placeholders
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
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('EmailJS Execution Error:', error);
    } finally {
      // 2. Redirect to WhatsApp as secondary contact channel
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
      }, 1000);
    }
  };

  const inputClasses = "w-full bg-black/40 border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all text-sm";
  const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-gold opacity-70";
  const labelClasses = "block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-1";

  if (isSuccess) {
    return (
      <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="bg-gold/20 p-6 rounded-full border border-gold/30">
            <CheckCircle2 size={48} className="text-gold" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 serif">Request Received!</h3>
        <p className="text-gray-400 max-w-sm mx-auto mb-8">
          We have sent your details via email. Our team is also preparing your quote on WhatsApp.
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
            <input required type="text" name="name" placeholder="e.g. John Doe" className={inputClasses} onChange={handleChange} disabled={isSending} value={formData.name} />
          </div>
        </div>
        <div className="relative">
          <label className={labelClasses}>Email Address (Optional)</label>
          <div className="relative">
            <Mail size={18} className={iconClasses} />
            <input type="email" name="email" placeholder="email@example.com" className={inputClasses} onChange={handleChange} disabled={isSending} value={formData.email} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className={labelClasses}>Phone Number</label>
          <div className="relative">
            <Phone size={18} className={iconClasses} />
            <input required type="tel" name="phone" placeholder="+34 000 000 000" className={inputClasses} onChange={handleChange} disabled={isSending} value={formData.phone} />
          </div>
        </div>
        <div className="relative">
          <label className={labelClasses}>Travel Date</label>
          <div className="relative">
            <Calendar size={18} className={iconClasses} />
            <input required type="date" name="date" className={inputClasses} onChange={handleChange} disabled={isSending} value={formData.date} />
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
        <div className="relative">
          <div className="flex justify-between items-end mb-2">
            <label className={labelClasses}>Pickup Location</label>
            <button type="button" onClick={handleUseLocation} disabled={isSending} className="text-[9px] text-gold hover:text-white flex items-center gap-1 uppercase tracking-tighter mb-2 transition-colors disabled:opacity-30"><MapPinned size={10} /> Use my location</button>
          </div>
          <div className="relative">
            <MapPin size={18} className={iconClasses} />
            <input required type="text" name="origin" value={formData.origin} placeholder="Airport, Hotel, or Address" className={inputClasses} onChange={handleChange} disabled={isSending} />
          </div>
        </div>
        <div className="relative">
          <label className={labelClasses}>Destination</label>
          <div className="relative pt-[22px]">
            <MapPin size={18} className="absolute left-4 top-[calc(50%+11px)] -translate-y-1/2 text-gold opacity-70" />
            <input required type="text" name="destination" placeholder="Drop-off point" className={inputClasses} onChange={handleChange} disabled={isSending} value={formData.destination} />
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