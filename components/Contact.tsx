import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-black py-24 border-t border-stone-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Brand */}
          <div>
            <h2 className="font-logo text-3xl text-white font-bold mb-6">MIAOCHEN<span className="text-gold">.</span></h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              为现代摩登时代打造的高定风格。<br/>坐落于创意街区核心地带。
            </p>
          </div>

          {/* Info */}
          <div className="space-y-6">
             <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <MapPin className="text-gold mt-1" size={20} />
                <div>
                  <h4 className="text-white text-sm uppercase tracking-wider mb-2">工作室地址</h4>
                  <p className="text-gray-500 text-sm">时尚大道 123 号<br/>创意园区 B座 101</p>
                </div>
             </div>
             <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <Phone className="text-gold mt-1" size={20} />
                <div>
                  <h4 className="text-white text-sm uppercase tracking-wider mb-2">联系方式</h4>
                  <p className="text-gray-500 text-sm">+86 138-1234-5678</p>
                </div>
             </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white text-sm uppercase tracking-wider mb-6">营业时间</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="flex justify-between max-w-[200px] mx-auto md:mx-0">
                <span>周一 至 周五</span>
                <span className="text-white">10:00 - 20:00</span>
              </li>
              <li className="flex justify-between max-w-[200px] mx-auto md:mx-0">
                <span>周六</span>
                <span className="text-white">10:00 - 18:00</span>
              </li>
              <li className="flex justify-between max-w-[200px] mx-auto md:mx-0">
                <span>周日</span>
                <span className="text-gold">休息</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-20 pt-8 border-t border-stone-900 text-center text-stone-700 text-xs">
          &copy; {new Date().getFullYear()} MIAOCHEN HAIR STUDIO. 保留所有权利.
        </div>
      </div>
    </footer>
  );
};

export default Contact;