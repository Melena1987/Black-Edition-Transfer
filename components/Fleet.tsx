
import React from 'react';
import { MAIN_VEHICLE, FLEET_MAIN_VIDEO } from '../constants';

const Fleet: React.FC = () => {
  return (
    <section id="flota" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-gold font-bold tracking-widest uppercase text-sm block mb-4">The Experience</span>
          <h2 className="text-4xl md:text-6xl font-bold">Exclusive Vehicle</h2>
          <div className="h-1 w-20 bg-gold mt-6"></div>
        </div>

        {/* Featured Vehicle Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          <div className="order-2 lg:order-1">
            <h3 className="text-gold font-bold tracking-widest uppercase text-xs mb-3">Our Dedicated Premium Van</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 serif">{MAIN_VEHICLE.name}</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              {MAIN_VEHICLE.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10">
              {MAIN_VEHICLE.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white/90">
                  <div className="text-gold bg-gold/10 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-zinc-900 border border-white/10 rounded-xl">
                <span className="text-gray-500 text-xs block uppercase tracking-widest mb-1">Capacity</span>
                <span className="font-bold">{MAIN_VEHICLE.capacity}</span>
              </div>
              <div className="px-6 py-3 bg-zinc-900 border border-white/10 rounded-xl">
                <span className="text-gray-500 text-xs block uppercase tracking-widest mb-1">Luggage</span>
                <span className="font-bold">{MAIN_VEHICLE.luggage}</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full aspect-[4/5] md:aspect-square object-cover"
              >
                <source src={FLEET_MAIN_VIDEO} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6">
                <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-gold/30">
                  <span className="text-gold text-xs font-bold uppercase tracking-widest">Premium Interior</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interior/Exterior Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="group relative overflow-hidden rounded-xl aspect-[16/9] border border-white/5">
            <img 
              src={MAIN_VEHICLE.images[0]} 
              alt="Exterior Mercedes Black Edition" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          <div className="group relative overflow-hidden rounded-xl aspect-[16/9] border border-white/5">
            <img 
              src={MAIN_VEHICLE.images[1]} 
              alt="Interior Mercedes Black Edition" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-white/5 p-8 md:p-12 rounded-3xl text-center">
          <p className="text-2xl italic serif text-gray-300 max-w-3xl mx-auto">
            "Your comfort is our only priority. We provide this specific top-tier Mercedes Black Edition XL for every booking, ensuring you always receive the highest level of service."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
