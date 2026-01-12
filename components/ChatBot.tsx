
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getAITutorResponse } from '../geminiService';

interface ChatBotProps {
  lang: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const intros: any = {
    ar: 'مرحباً! أنا رفيقك الدراسي الذكي. كيف يمكنني مساعدتك اليوم؟',
    en: 'Hello! I am your smart study companion. How can I help you today?',
    fr: 'Bonjour ! Je suis ton tuteur intelligent. Comment puis-je t\'aider aujourd\'hui ?'
  };

  const labels: any = {
    ar: { header: 'المساعد الدراسي الذكي', sub: 'متصل وجاهز لمساعدتك', placeholder: 'اسألني عن أي تمرين أو شرح...' },
    en: { header: 'Smart Study Assistant', sub: 'Connected and ready to help', placeholder: 'Ask me about any exercise or explanation...' },
    fr: { header: 'Assistant Intelligent', sub: 'Connecté et prêt à t\'aider', placeholder: 'Pose-moi une question sur tes cours...' }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: intros[lang] || intros.ar }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await getAITutorResponse(input);
    const modelMsg: ChatMessage = { role: 'model', text: responseText || "حدث خطأ ما" };
    
    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  const l = labels[lang] || labels.ar;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl flex flex-col h-[70vh] overflow-hidden border border-gray-100 dark:border-slate-800">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex items-center gap-4 group">
        <div className="icon-3d floating-icon w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/20">
          <i className="fas fa-robot"></i>
        </div>
        <div>
          <h2 className="text-xl font-black">{l.header}</h2>
          <p className="text-blue-100 text-sm font-medium">{l.sub}</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-slate-950/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm text-sm md:text-base leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-slate-700'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-end">
            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 rounded-3xl rounded-bl-none flex gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-slate-800 flex gap-3 bg-white dark:bg-slate-900">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={l.placeholder}
          className="flex-1 px-6 py-4 bg-gray-100 dark:bg-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium dark:text-white"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-xl active:scale-95"
        >
          <i className="fas fa-paper-plane transform -rotate-45"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
