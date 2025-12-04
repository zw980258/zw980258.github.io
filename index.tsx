
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { Menu, X, ArrowDown, MessageSquare, Send, Sparkles, Loader2, MapPin, Phone, Mail } from 'lucide-react';

// --- TYPES ---
interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// --- CONSTANTS ---
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"; 
const ABOUT_IMAGE_URL = "https://pic1.imgdb.cn/item/69314d0ba11464095f8a6b21.jpg"; 
const VIBE_IMAGE_URL = "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2459&auto=format&fit=crop";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
];

const SERVICES_DATA: Service[] = [
  {
    id: '1',
    title: '高定剪裁',
    price: '¥380',
    description: '根据脸型与生活方式量身定制的精准剪裁。包含洗护与造型设计。'
  },
  {
    id: '2',
    title: '质感烫发',
    price: '¥880+',
    description: '现代纹理烫发，增加发量与动感。擅长韩式气垫烫与日系纹理。'
  },
  {
    id: '3',
    title: '创意染发',
    price: '¥1280+',
    description: '从潮色漂染到微光挑染。全线使用进口无氨护理染膏。'
  }
];

// --- AI SERVICE ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getStyleAdvice = async (userQuery: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuery,
      config: {
        systemInstruction: `你是一位名叫 MIAOCHEN 的顶级发型师的 AI 助理。
        你的语气是时尚、专业、略带高冷的（edgy）。
        请用简体中文回答。
        保持回答简洁（80字以内）。
        根据用户的描述（脸型、发质、风格偏好）提供发型建议。
        如果被问及价格，请引导他们查看服务菜单（Book Now）。`,
      }
    });
    
    return response.text || "我的剪刀正在打磨中，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "灵感连接暂时中断，请稍后再试。";
  }
};

// --- COMPONENTS ---

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

const AIStylist: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "你好。我是 MIAOCHEN 的 AI 助理。请描述你的脸型、发质，或者你想要的风格感觉，我会为你推荐适合的造型。" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const advice = await getStyleAdvice(input);
    
    const modelMsg: ChatMessage = { role: 'model', text: advice };
    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  return (
    <section id="ai-stylist" className="py-24 bg-stone-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-1 border border-gold/40 rounded-full mb-6">
              <Sparkles size={14} className="text-gold" />
              <span className="text-gold text-xs uppercase tracking-widest">AI 驱动</span>
           </div>
           <h2 className="font-serif text-3xl md:text-5xl text-white mb-4">专属造型顾问</h2>
           <p className="text-gray-400 font-light">拿捏不准风格？向 AI 获取专业建议。</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden shadow-2xl h-[500px] flex flex-col">
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-lg text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-black rounded-tr-none' 
                    : 'bg-stone-800 text-gray-200 border border-stone-700 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-stone-800 p-4 rounded-lg rounded-tl-none border border-stone-700 flex items-center gap-2">
                  <Loader2 className="animate-spin text-gold" size={16} />
                  <span className="text-gray-400 text-xs">思考中...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="例如：我是圆脸，头发细软，想尝试韩式风格..."
              className="flex-1 bg-stone-900 border border-stone-700 text-white rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-gold text-black p-3 rounded-md hover:bg-white transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

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

// --- MAIN APP ---
const App: React.FC = () => {
  return (
    <div className="bg-dark-bg min-h-screen text-white selection:bg-gold selection:text-black">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <AIStylist />
        <Gallery />
      </main>
      <Contact />
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
