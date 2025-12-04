import React from 'react';
import { SERVICES_DATA, VIBE_IMAGE_URL } from '../constants.ts';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-dark-bg relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse md:flex-row gap-12">
          
          {/* List */}
          <div className="w-full md:w-1/2 space-y-12">
            <h2 className="font-serif text-4xl text-white mb-12">服务菜单</h2>
            {SERVICES_DATA.map((service) => (
              <div key={service.id} className="group cursor-pointer">
                <div className="flex justify-between items-baseline border-b border-stone-800 pb-4 mb-4 group-hover:border-gold transition-colors duration-500">
                  <h3 className="text-xl md:text-2xl text-white font-serif">{service.title}</h3>
                  <span className="text-gold font-sans">{service.price}</span>
                </div>
                <p className="text-gray-500 text-sm font-light max-w-sm group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>
              </div>
            ))}
            <div className="pt-8">
               <button className="px-8 py-3 bg-white text-black text-xs uppercase tracking-widest hover:bg-gold transition-colors">
                 预约全套服务
               </button>
            </div>
          </div>

          {/* Vibe Image (Cigarette) */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
            <div className="relative w-full h-[500px]">
              <img 
                src={VIBE_IMAGE_URL} 
                alt="Stylist Vibe" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm p-4 border-l-2 border-gold">
                <p className="text-white text-sm font-serif italic">"风格，即态度。"</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;