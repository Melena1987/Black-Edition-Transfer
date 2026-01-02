
import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="servicios" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="text-gold font-bold tracking-widest uppercase text-sm block mb-4">Our Expertise</span>
          <h2 className="text-4xl md:text-6xl font-bold">Exclusive Services</h2>
          <div className="h-1 w-20 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group relative overflow-hidden bg-zinc-900/50 border border-white/5 rounded-2xl transition-all duration-500 hover:border-gold/50"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                />
              </div>
              <div className="p-8">
                <div className="bg-gold/10 w-12 h-12 flex items-center justify-center rounded-lg text-gold mb-6 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 serif">{service.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;