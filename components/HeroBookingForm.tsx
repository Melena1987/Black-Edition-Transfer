
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Search, Loader2 } from 'lucide-react';
import { getPlaceSuggestions } from '../services/gemini';
import { WHATSAPP_NUMBER } from '../constants';

const HeroBookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: '1'
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<'origin' | 'destination' | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleAutocomplete = async (field: 'origin' | 'destination', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Black Edition Transfer! I'm looking for a quote:
- From: ${formData.origin || 'Not specified'}
- To: ${formData.destination || 'Not specified'}
- Date: ${formData.date || 'TBD'}
- Passengers: ${formData.passengers}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <form 
        onSubmit={handleSearch}
        className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2"
      >
        {/* Origin */}
        <div className="relative flex-1 group">
          <div className="flex flex-col px-6 py-2">
            <label className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Pickup</label>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-white/40 group-hover:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Where from?" 
                className="bg-transparent border-none text-white focus:ring-0 placeholder:text-gray-500 text-sm w-full outline-none"
                value={formData.origin}
                onChange={(e) => handleAutocomplete('origin', e.target.value)}
                onFocus={() => setActiveField('origin')}
              />
            </div>
          </div>
          {activeField === 'origin' && suggestions.length > 0 && (
            <SuggestionList suggestions={suggestions} onSelect={selectSuggestion} />
          )}
        </div>

        <div className="hidden md:block w-px h-8 bg-white/10"></div>

        {/* Destination */}
        <div className="relative flex-1 group">
          <div className="flex flex-col px-6 py-2">
            <label className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Destination</label>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-white/40 group-hover:text-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Where to?" 
                className="bg-transparent border-none text-white focus:ring-0 placeholder:text-gray-500 text-sm w-full outline-none"
                value={formData.destination}
                onChange={(e) => handleAutocomplete('destination', e.target.value)}
                onFocus={() => setActiveField('destination')}
              />
            </div>
          </div>
          {activeField === 'destination' && suggestions.length > 0 && (
            <SuggestionList suggestions={suggestions} onSelect={selectSuggestion} />
          )}
        </div>

        <div className="hidden md:block w-px h-8 bg-white/10"></div>

        {/* Date */}
        <div className="flex-1 group">
          <div className="flex flex-col px-6 py-2">
            <label className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Date</label>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-white/40 group-hover:text-gold transition-colors" />
              <input 
                type="date" 
                className="bg-transparent border-none text-white focus:ring-0 text-sm w-full outline-none cursor-pointer [color-scheme:dark]"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-white/10"></div>

        {/* Passengers */}
        <div className="flex-1 group">
          <div className="flex flex-col px-6 py-2">
            <label className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">Travelers</label>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-white/40 group-hover:text-gold transition-colors" />
              <select 
                className="bg-transparent border-none text-white focus:ring-0 text-sm w-full outline-none appearance-none cursor-pointer"
                value={formData.passengers}
                onChange={(e) => setFormData({...formData, passengers: e.target.value})}
              >
                {[1,2,3,4,5,6,7].map(n => <option key={n} value={n} className="bg-zinc-900">{n} Pax</option>)}
                <option value="8+" className="bg-zinc-900">8+ Pax</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button 
          type="submit"
          className="bg-gold hover:bg-white text-black font-bold py-4 md:py-0 md:h-14 px-8 rounded-xl md:rounded-full transition-all flex items-center justify-center gap-2 shrink-0 group/btn"
        >
          {isSearching ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
          <span className="md:hidden lg:inline">Get Quote</span>
        </button>
      </form>
    </div>
  );
};

const SuggestionList = ({ suggestions, onSelect }: { suggestions: string[], onSelect: (v: string) => void }) => (
  <ul className="absolute z-[100] top-full left-0 w-full mt-4 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl py-2">
    {suggestions.map((s, i) => (
      <li 
        key={i} 
        onClick={() => onSelect(s)}
        className="px-6 py-3 text-sm text-gray-300 hover:bg-gold hover:text-black cursor-pointer transition-colors"
      >
        {s}
      </li>
    ))}
  </ul>
);

export default HeroBookingForm;
