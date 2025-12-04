import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '品牌理念', href: '#about' },
    { name: '服务项目', href: '#services' },
    { name: '作品廊', href: '#gallery' },
    { name: 'AI 顾问', href: '#ai-stylist' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="font-logo text-2xl font-bold tracking-widest text-white">
          MIAOCHEN <span className="text-gold">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-colors hover:underline decoration-gold underline-offset-4"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="px-6 py-2 border border-white text-white uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300">
            立即预约
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-stone-900 border-t border-stone-800 md:hidden">
          <div className="flex flex-col p-8 space-y-6 text-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white uppercase tracking-widest text-sm"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="text-gold uppercase tracking-widest text-sm font-bold"
            >
              立即预约
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;