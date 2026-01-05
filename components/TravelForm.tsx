
import React, { useState } from 'react';
import { User, Calendar, Clock, Phone, MapPin, Users, Send, MapPinned } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

const TravelForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    phone: '',
    origin: '',
    destination: '',
    passengers: '1'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Black Edition Transfer! 
I would like to request a quote for a luxury transfer:
- Name: ${formData.name}
- Date: ${formData.date}
- Time: ${formData.time}
- Passengers: ${formData.passengers}
- Pickup: ${formData.origin}
- Destination: ${formData.destination}
- Contact Phone: ${formData.phone}

Please let me know the availability and price. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encoded}`, '_blank');
  };

  const inputClasses = "w-full bg-black/40 border border-white/10 rounded-xl px-11 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all text-sm";
  const iconClasses = "absolute left-4 top-1/2 -translate-y-1/2 text-gold opacity-70";
  const labelClasses = "block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2 ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="relative">
          <label className={labelClasses}>Full Name</label>
          <div className="relative">
            <User size={18} className={iconClasses} />
            <input 
              required
              type="text" 
              name="name"
              placeholder="e.g. John Doe"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Phone */}
        <div className="relative">
          <label className={labelClasses}>Phone Number</label>
          <div className="relative">
            <Phone size={18} className={iconClasses} />
            <input 
              required
              type="tel" 
              name="phone"
              placeholder="+34 000 000 000"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Date */}
        <div className="relative">
          <label className={labelClasses}>Travel Date</label>
          <div className="relative">
            <Calendar size={18} className={iconClasses} />
            <input 
              required
              type="date" 
              name="date"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Time */}
        <div className="relative">
          <label className={labelClasses}>Pickup Time</label>
          <div className="relative">
            <Clock size={18} className={iconClasses} />
            <input 
              required
              type="time" 
              name="time"
              className={inputClasses}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="relative">
          <label className={labelClasses}>Passengers</label>
          <div className="relative">
            <Users size={18} className={iconClasses} />
            <select 
              name="passengers"
              className={inputClasses}
              onChange={handleChange}
              value={formData.passengers}
            >
              {[1,2,3,4,5,6,7].map(num => (
                <option key={num} value={num} className="bg-zinc-900 text-white">{num} Passengers</option>
              ))}
              <option value="8+" className="bg-zinc-900 text-white">8+ (Multiple Vehicles)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Origin */}
      <div className="relative">
        <div className="flex justify-between items-end mb-2">
          <label className={labelClasses}>Pickup Location</label>
          <button 
            type="button"
            onClick={handleUseLocation}
            className="text-[9px] text-gold hover:text-white flex items-center gap-1 uppercase tracking-tighter mb-2 transition-colors"
          >
            <MapPinned size={10} /> Use my location
          </button>
        </div>
        <div className="relative">
          <MapPin size={18} className={iconClasses} />
          <input 
            required
            type="text" 
            name="origin"
            value={formData.origin}
            placeholder="Airport, Hotel, or Address"
            className={inputClasses}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Destination */}
      <div className="relative">
        <label className={labelClasses}>Destination</label>
        <div className="relative">
          <MapPin size={18} className={iconClasses} />
          <input 
            required
            type="text" 
            name="destination"
            placeholder="Drop-off point"
            className={inputClasses}
            onChange={handleChange}
          />
        </div>
      </div>

      <button 
        type="submit"
        className="w-full py-5 bg-gold hover:bg-white text-black font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-gold/10 mt-4"
      >
        <Send size={18} />
        Request Instant Quote
      </button>
      
      <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">
        Available 24/7 • Professional Multi-lingual Chauffeurs
      </p>
    </form>
  );
};

export default TravelForm;
