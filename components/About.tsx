import React from 'react';
import { ABOUT_IMAGE_URL } from '../constants.ts';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark-bg relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
             <div className="absolute -inset-4 border border-gold/30 opacity-50 z-0 translate-x-4 translate-y-4"></div>
             <img 
              src={ABOUT_IMAGE_URL} 
              alt="MIAOCHEN Artistic Profile" 
              className="w-full h-[600px] object-cover grayscale relative z-10 shadow-2xl shadow-black"
            />
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2">
            <h3 className="text-gold text-xs uppercase tracking-[0.3em] mb-4">设计理念</h3>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
              发型，<br/> 是你行走的 <br/> 艺术宣言。
            </h2>
            <div className="space-y-6 text-gray-400 font-sans font-light text-lg">
              <p>
                我不只是修剪头发，而是在雕刻自信。我的旅程始于一个简单的信念：
                风格是一种无需言语的表达，它在你开口之前就已经替你说话。
              </p>
              <p>
                专注于年轻潮流美学，我将经典理发技艺与现代时尚感完美融合。
                无论你是追求利落的渐变，充满质感的纹理，还是一次彻底的形象改造，
                我的座椅都是你重塑自我的空间。
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-4">
              <div className="h-px w-16 bg-gold"></div>
              <span className="font-logo text-xl text-white italic">MIAOCHEN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;