
import React, { useState } from 'react';
import { MessageSquare, Send, Bot, Loader2 } from 'lucide-react';
import { parseTravelRequest } from '../services/gemini';
import { WHATSAPP_NUMBER } from '../constants';

const BookingAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const parsed = await parseTravelRequest(input);
    setResult(parsed);
    setIsLoading(false);
  };

  const handleWhatsAppRedirect = () => {
    const text = result?.summary || input;
    const encoded = encodeURIComponent(`Hello Black Edition Transfer. I would like a quote for: ${text}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-6 md:p-10 border-b border-white/5 bg-gradient-to-r from-gold/10 to-transparent">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gold rounded-full text-black">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Smart Assistant</h3>
            <p className="text-xs text-gold uppercase tracking-widest font-semibold">Instant Response</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          Tell us your plans (e.g., "I need a transfer from Marbella to Malaga Airport for 4 people on Friday"). Our assistant will prepare the details for you.
        </p>
      </div>

      <div className="p-6 md:p-10">
        <form onSubmit={handleSubmit} className="relative mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your request here..."
            className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors resize-none h-32"
          />
          <button 
            disabled={isLoading}
            className="absolute bottom-4 right-4 p-3 bg-gold text-black rounded-xl hover:bg-white transition-all disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>

        {result && (
          <div className="animate-in fade-in slide-in-from-top duration-500 bg-white/5 rounded-2xl p-6 border border-gold/20">
            <h4 className="text-gold font-bold text-xs uppercase tracking-widest mb-4">Detected Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <span className="block text-gray-500">Origin</span>
                <span className="font-medium">{result.origin || 'Not specified'}</span>
              </div>
              <div>
                <span className="block text-gray-500">Destination</span>
                <span className="font-medium">{result.destination || 'Not specified'}</span>
              </div>
              <div>
                <span className="block text-gray-500">Passengers</span>
                <span className="font-medium">{result.passengers || '-'}</span>
              </div>
              <div>
                <span className="block text-gray-500">Type</span>
                <span className="font-medium capitalize">{result.serviceType || 'Transfer'}</span>
              </div>
            </div>
            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-colors"
            >
              <MessageSquare size={20} />
              Confirm via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingAssistant;