import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, Loader2 } from 'lucide-react';
import { getStyleAdvice } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

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

export default AIStylist;