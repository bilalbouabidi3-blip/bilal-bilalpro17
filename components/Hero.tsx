
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
      desc: "المنصة الذكية الأولى في المغرب المخصصة لنجاح الطلاب. دروس تفاعلية، تمارين مصححة، ومساعد ذكي يدعمك في كل خطوة من مسارك الدراسي.",
      ctaPrimary: "ابدأ المراجعة الآن",
      ctaSecondary: "جرب المساعد الذكي",
      join: "انضم لـ +10,000 طالب متفوق",
      badge1: "تمارين مصححة",
      badge2: "ذكاء اصطناعي"
    },
    en: {
      title: "Your Future Starts with BayanStudy",
      desc: "The premier smart platform in Morocco dedicated to student success. Interactive lessons, corrected exercises, and a smart assistant supporting every step of your journey.",
      ctaPrimary: "Start Reviewing Now",
      ctaSecondary: "Try Smart Assistant",
      join: "Join +10,000 elite students",
      badge1: "Corrected Exercises",
      badge2: "Artificial Intelligence"
    },
    fr: {
      title: "Votre Avenir Commence avec BayanStudy",
      desc: "La première plateforme intelligente au Maroc dédiée à la réussite des élèves. Cours interactifs, exercices corrigés et un assistant IA à vos côtés.",
      ctaPrimary: "Réviser Maintenant",
      ctaSecondary: "Essayer l'Assistant IA",
      join: "Rejoignez +10,000 élèves",
      badge1: "Exercices Corrigés",
      badge2: "Intelligence Artificielle"
    }
  };

  const t = content[lang] || content.ar;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16 pb-32 transition-colors duration-300">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className={`text-${lang === 'ar' ? 'right' : 'left'} z-10`}>
          <h1 className="text-5xl md:text-7xl font-black text-blue-900 dark:text-white mb-6 leading-tight">
            {t.title.split(' ').map((word: string, i: number) => 
              ['بيان', 'ستادي', 'BayanStudy'].includes(word)
              ? <span key={i} className="text-blue-600 dark:text-blue-400 inline-block hover:scale-110 transition-transform cursor-default">{word} </span> 
              : word + ' '
            )}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-xl">
            {t.desc}
          </p>
          <div className="flex gap-4">
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
          
          <div className="mt-12 flex items-center gap-6">
            <div className={`flex -space-x-4 ${lang === 'ar' ? 'space-x-reverse' : ''}`}>
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg transform hover:-translate-y-2 transition-all cursor-pointer" src={`https://picsum.photos/seed/${i+10}/100/100`} alt="student" />
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-bold">{t.join}</p>
          </div>
        </div>
        
        <div className="relative icon-3d-container">
          <div className="absolute top-10 -right-4 z-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl floating-3d border border-gray-100 dark:border-slate-700 hidden lg:block">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
                   <i className="fas fa-check-circle"></i>
                </div>
                <div className="font-black text-sm dark:text-white">{t.badge1}</div>
             </div>
          </div>

          <div className="absolute bottom-10 -left-4 z-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl floating-3d border border-gray-100 dark:border-slate-700 hidden lg:block" style={{animationDelay: '-3s'}}>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl">
                   <i className="fas fa-bolt"></i>
                </div>
                <div className="font-black text-sm dark:text-white">{t.badge2}</div>
             </div>
          </div>

          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=600" 
            alt="Learning" 
            className="rounded-[3rem] hero-img-3d relative z-10 border-8 border-white dark:border-slate-800"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
