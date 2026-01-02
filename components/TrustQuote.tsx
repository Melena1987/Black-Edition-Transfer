
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const TrustQuote: React.FC = () => {
  return (
    <section className="py-20 bg-zinc-950 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gold/10 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-gold/10 text-gold border border-gold/20">
            <ShieldCheck size={40} strokeWidth={1} />
          </div>
        </div>
        
        <blockquote className="relative">
          <span className="absolute -top-10 -left-4 md:-left-10 text-9xl text-gold/10 serif font-bold leading-none select-none">“</span>
          <h2 className="text-3xl md:text-5xl font-medium leading-tight serif italic text-gray-100 mb-8 px-4">
            Flying is the safest part of your journey. To conclude it with the same <span className="text-gold">excellence and security</span>, choose your final transfer with care.
          </h2>
          <span className="absolute -bottom-20 -right-4 md:-right-10 text-9xl text-gold/10 serif font-bold leading-none select-none rotate-180">“</span>
        </blockquote>
        
        <div className="inline-block mt-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
          <p className="mt-4 text-gold text-xs font-bold tracking-[0.5em] uppercase">Black Edition Commitment</p>
        </div>
      </div>
    </section>
  );
};

export default TrustQuote;
