import React from 'react';
import { GALLERY_IMAGES } from '../constants.ts';

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-stone-950">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h3 className="text-gold text-xs uppercase tracking-[0.3em] mb-2">作品集</h3>
            <h2 className="font-serif text-4xl text-white">最新造型</h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 text-xs uppercase hover:text-white underline underline-offset-4">
            @MIAOCHEN
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((src, index) => (
            <div key={index} className={`relative overflow-hidden group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img 
                src={src} 
                alt={`Cut ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-serif text-lg italic border-b border-gold pb-1">查看详情</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;