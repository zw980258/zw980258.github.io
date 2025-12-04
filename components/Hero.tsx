import React from 'react';
import { HERO_IMAGE_URL } from '../constants.ts';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={HERO_IMAGE_URL} 
          alt="MIAOCHEN Professional Stylist" 
          className="w-full h-full object-cover object-center filter brightness-75 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-gold uppercase tracking-[0.5em] text-sm md:text-base mb-4 animate-pulse font-logo">
          Est. 2018
        </h2>
        <h1 className="font-serif text-5xl md:text-8xl text-white font-bold leading-tight mb-6">
          重塑<br/> <span className="italic font-light">你的优雅</span>
        </h1>
        <p className="font-sans text-gray-300 max-w-lg text-sm md:text-lg tracking-wide mb-10 font-light">
          为现代精英打造的精准剪裁与前卫造型。<br/>蜕变，由此开始。
        </p>
        <a 
          href="#services"
          className="group relative px-8 py-3 overflow-hidden bg-transparent border border-white/30 text-white transition-all hover:border-gold"
        >
          <span className="relative z-10 text-xs uppercase tracking-widest group-hover:text-gold transition-colors">
            探索服务
          </span>
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;