
import React from 'react';
import { MAIN_VEHICLE, FLEET_MAIN_VIDEO } from '../constants';

const Fleet: React.FC = () => {
  return (
    <section id="flota" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-20">
          <span className="text-gold font-bold tracking-widest uppercase text-sm block mb-4">Exclusive Vehicle Experience</span>
          <h2 className="text-4xl md:text-6xl font-bold">The Black Edition Fleet</h2>
          <div className="h-1 w-20 bg-gold mt-6"></div>
        </header>

        {/* Featured Vehicle Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          <article className="order-2 lg:order-1">
            <span className="text-gold font-bold tracking-widest uppercase text-xs mb-3 block">Our Dedicated Premium Van</span>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 serif">{MAIN_VEHICLE.name}</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
              Experience the gold standard in <span className="text-white">luxury transport</span>. {MAIN_VEHICLE.description}
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
                <span className="text-gray-500 text-xs block uppercase tracking-widest mb-1">Passenger Capacity</span>
                <span className="font-bold">{MAIN_VEHICLE.capacity}</span>
              </div>
              <div className="px-6 py-3 bg-zinc-900 border border-white/10 rounded-xl">
                <span className="text-gray-500 text-xs block uppercase tracking-widest mb-1">Luggage Space</span>
                <span className="font-bold">{MAIN_VEHICLE.luggage}</span>
              </div>
            </div>
          </article>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full aspect-[4/5] md:aspect-square object-cover"
                title="Interior and exterior of the Black Edition Mercedes Luxury Van"
              >
                <source src={FLEET_MAIN_VIDEO} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6">
                <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-gold/30">
                  <span className="text-gold text-xs font-bold uppercase tracking-widest">Premium Chauffeur Service Marbella</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interior/Exterior Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <figure className="group relative overflow-hidden rounded-xl aspect-[16/9] border border-white/5">
            <img 
              src={MAIN_VEHICLE.images[0]} 
              alt="Exterior view of Mercedes Black Edition XL private transfer vehicle" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <figcaption className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></figcaption>
          </figure>
          <figure className="group relative overflow-hidden rounded-xl aspect-[16/9] border border-white/5">
            <img 
              src={MAIN_VEHICLE.images[1]} 
              alt="Luxury interior seating of Mercedes Black Edition for VIP transfers" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <figcaption className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></figcaption>
          </figure>
        </div>

        <div className="bg-zinc-900/30 border border-white/5 p-8 md:p-12 rounded-3xl text-center">
          <blockquote className="text-2xl italic serif text-gray-300 max-w-3xl mx-auto">
            "Your comfort is our only priority. We provide this specific top-tier Mercedes Black Edition XL for every booking, ensuring you always receive the highest level of <span className="text-gold">private transfer excellence</span> in the Costa del Sol."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
