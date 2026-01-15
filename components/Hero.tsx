
import React from 'react';
import { AppSection } from '../types';

interface HeroProps {
  onStart: (section: AppSection) => void;
  lang: string;
}

const Hero: React.FC<HeroProps> = ({ onStart, lang }) => {
  const content: any = {
    ar: {
      title: "مستقبلك يبدأ مع بيان ستادي",
      desc: "المنصة الذكية الأولى في المغرب المخصصة لنجاح الطلاب. دروس تفاعلية، تمارين مصححة، ومساعد ذكي يدعمك.",
      ctaPrimary: "ابدأ المراجعة",
      ctaSecondary: "المساعد الذكي",
      join: "انضم لـ +10,000 طالب",
      badge1: "تمارين مصححة",
      badge2: "ذكاء اصطناعي"
    },
    en: {
      title: "Your Future Starts with BayanStudy",
      desc: "The premier smart platform in Morocco for student success. Interactive lessons and AI support.",
      ctaPrimary: "Start Now",
      ctaSecondary: "AI Assistant",
      join: "Join +10,000 students",
      badge1: "Corrected Exercises",
      badge2: "AI Support"
    },
    fr: {
      title: "Votre Avenir Commence ici",
      desc: "La plateforme intelligente au Maroc pour réussir vos études. Cours interactifs et IA.",
      ctaPrimary: "Réviser",
      ctaSecondary: "Assistant IA",
      join: "Rejoignez +10,000 élèves",
      badge1: "Exercices Corrigés",
      badge2: "Intelligence Artificielle"
    }
  };

  const t = content[lang] || content.ar;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 pt-10 md:pt-16 pb-20 md:pb-32 transition-colors duration-300">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className={`text-${lang === 'ar' ? 'right' : 'left'} z-10 flex flex-col items-center lg:items-start`}>
          <div className="relative inline-block">
             <h1 className="text-4xl md:text-7xl font-black text-blue-900 dark:text-white mb-6 leading-tight text-center lg:text-start typing-effect">
               {t.title}
             </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl text-center lg:text-start">
            {t.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => onStart(AppSection.COURSES)}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl active:scale-95"
            >
              {t.ctaPrimary}
            </button>
            <button 
              onClick={() => onStart(AppSection.ASSISTANT)}
              className="bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              {t.ctaSecondary}
            </button>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <div className={`flex -space-x-3 ${lang === 'ar' ? 'space-x-reverse' : ''}`}>
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover shadow-md" src={`https://picsum.photos/seed/${i+10}/100/100`} alt="student" />
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-bold text-sm">{t.join}</p>
          </div>
        </div>
        
        <div className="relative icon-3d-container flex justify-center lg:block">
          <div className="absolute top-0 -right-4 z-20 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl floating-3d border border-gray-100 dark:border-slate-700 hidden sm:block">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><i className="fas fa-check"></i></div>
                <div className="font-black text-xs dark:text-white">{t.badge1}</div>
             </div>
          </div>

          <div className="absolute bottom-0 -left-4 z-20 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl floating-3d border border-gray-100 dark:border-slate-700 hidden sm:block" style={{animationDelay: '-3s'}}>
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center"><i className="fas fa-bolt"></i></div>
                <div className="font-black text-xs dark:text-white">{t.badge2}</div>
             </div>
          </div>

          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=600" 
            alt="Learning" 
            className="rounded-[2.5rem] md:rounded-[3rem] relative z-10 border-4 md:border-8 border-white dark:border-slate-800 shadow-2xl w-full max-w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
