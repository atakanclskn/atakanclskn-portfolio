
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Profile, Project, ExperienceItem } from '../types';

interface AIAssistantProps {
  profile: Profile;
  projects: Project[];
  experiences: ExperienceItem[];
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ profile, projects, experiences }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: `Merhaba! Ben Atakan'ın dijital ikiziyim. Onun projeleri, deneyimleri veya teknik yetkinlikleri hakkında merak ettiğin her şeyi bana sorabilirsin.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        Sen Atakan Çalışkan'ın portfolyo sitesindeki dijital ikizisin.
        Atakan hakkında bilgiler:
        - İsim: ${profile.name}
        - Bio: ${profile.bio}
        - Unvanlar: ${profile.titles.join(', ')}
        - Deneyimler: ${experiences.map(e => `${e.role} @ ${e.company} (${e.description})`).join('; ')}
        - Projeler: ${projects.map(p => `${p.title}: ${p.description}`).join('; ')}
        
        Kurallar:
        1. Atakan gibi nazik, profesyonel ama teknoloji meraklısı bir tonda konuş.
        2. Sadece Atakan ile ilgili bilgiler ver. Bilmediğin konularda "Bu konuda Atakan'ın kendisine danışmak daha iyi olabilir" de.
        3. Kısa ve öz cevaplar ver.
        4. Türkçe konuş.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `${context}\n\nKullanıcı sorusu: ${userMessage}` }] }
        ],
      });

      const aiText = response.text || "Üzgünüm, şu an bağlantı kuramıyorum. Lütfen tekrar dene.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sistemde bir hata oluştu, ama Atakan kodları düzeltiyor olabilir!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[110] w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-500 hover:scale-110 active:scale-90 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-8 right-8 z-[120] w-[350px] md:w-[400px] h-[500px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-primary/5 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">AI Digital Twin</h3>
              <p className="text-[9px] text-primary/60 font-mono">STATUS: ONLINE</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl flex gap-3 ${m.role === 'user' ? 'bg-primary/10 border border-primary/20 text-white' : 'bg-white/5 border border-white/10 text-gray-300'}`}>
                <div className="flex-shrink-0 mt-1">
                  {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-primary" />}
                </div>
                <p className="leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 pr-12 text-xs text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-2 p-2 text-primary hover:scale-110 transition-transform disabled:opacity-50"
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[8px] text-gray-600 text-center mt-3 font-mono">POWERED BY GEMINI 2.5 FLASH</p>
        </div>
      </div>
    </>
  );
};
