
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
      desc: "المنصة الذكية الأولى في المغرب لنجاح الطلاب. دروس تفاعلية، تمارين مصححة، ومساعد ذكي يدعمك في كل خطوة من مسارك الدراسي.", 
      ctaPrimary: "ابدأ المراجعة الآن", 
      ctaSecondary: "جرب المساعد الذكي", 
      join: "انضم لـ +10,000 طالب متفوق",
      badge1: "تمارين مصححة",
      badge2: "ذكاء اصطناعي"
    },
    en: { 
      title: "Your Future Starts with BayanStudy", 
      desc: "The first smart platform in Morocco for student success. Interactive lessons, corrected exercises, and a smart assistant.", 
      ctaPrimary: "Start Now", 
      ctaSecondary: "Try AI Assistant", 
      join: "Join +10,000 students",
      badge1: "Corrected Exercises",
      badge2: "AI Assistant"
    },
    fr: { 
      title: "Votre Avenir Commence avec BayanStudy", 
      desc: "La première plateforme intelligente au Maroc. Cours interactifs, exercices corrigés et assistant IA.", 
      ctaPrimary: "Commencer", 
      ctaSecondary: "Assistant IA", 
      join: "Rejoignez +10,000 élèves",
      badge1: "Exercices Corrigés",
      badge2: "Intelligence Artificielle"
    },
    tr: {
      title: "Geleceğiniz BayanStudy ile Başlıyor",
      desc: "Öğrenci başarısı için Fas'taki ilk akıllı platform. İnteraktif dersler, düzeltilmiş egzersizler ve akıllı asistan.",
      ctaPrimary: "Şimdi Başla",
      ctaSecondary: "Yapay Zeka Dene",
      join: "+10.000 öğrenciye katılın",
      badge1: "Düzeltilmiş Alıştırmalar",
      badge2: "Yapay Zeka"
    },
    zh: {
      title: "您的未来从 BayanStudy 开始",
      desc: "摩洛哥首个助力学生成功的智能平台。互动课程、批改练习和智能助手，全程为您保驾护航。",
      ctaPrimary: "现在开始",
      ctaSecondary: "体验助手",
      join: "加入 +10,000 名学生",
      badge1: "批改练习",
      badge2: "人工智能"
    }
  };

  const t = content[lang] || content.ar;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 pt-12 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className={`text-${lang === 'ar' ? 'right' : 'left'} z-10 animate-in fade-in slide-in-from-top-8 duration-700`}>
          <h1 className="text-4xl md:text-6xl font-black text-blue-900 dark:text-white mb-6 leading-[1.2]">
            {t.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed max-w-lg">
            {t.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onStart(AppSection.COURSES)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-500/30 transition-all active:scale-95 text-lg">
              {t.ctaPrimary}
            </button>
            <button onClick={() => onStart(AppSection.ASSISTANT)} className="bg-white dark:bg-slate-900 border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 dark:hover:bg-slate-800 transition-all active:scale-95 text-lg">
              {t.ctaSecondary}
            </button>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => <img key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 object-cover shadow-sm" src={`https://picsum.photos/seed/${i+20}/100/100`} />)}
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-bold text-xs">{t.join}</p>
          </div>
        </div>

        {/* Right Side: Visual Image with Desktop-style Animations */}
        <div className="relative flex justify-center items-center group icon-3d-container scale-90 md:scale-100">
          
          {/* Main Image Container with Blue Border as per Screenshot */}
          <div className="relative p-2 border-[6px] border-blue-500/30 rounded-[3rem] overflow-visible floating-3d">
            
            {/* Floating Badge 1: Top Right */}
            <div className="absolute -top-6 -right-6 z-30 bg-white/95 dark:bg-slate-900/95 py-3 px-5 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-100 dark:border-slate-800 animate-in zoom-in delay-300">
               <span className="font-black text-sm text-gray-800 dark:text-white whitespace-nowrap">{t.badge1}</span>
               <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                 <i className="fas fa-check"></i>
               </div>
            </div>

            {/* Floating Badge 2: Bottom Left */}
            <div className="absolute -bottom-6 -left-6 z-30 bg-white/95 dark:bg-slate-900/95 py-3 px-5 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-100 dark:border-slate-800 animate-in zoom-in delay-500">
               <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                 <i className="fas fa-bolt"></i>
               </div>
               <span className="font-black text-sm text-gray-800 dark:text-white whitespace-nowrap">{t.badge2}</span>
            </div>

            <div className="relative w-[320px] md:w-[450px] h-[320px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:rotate-x-6 group-hover:rotate-y-[-6deg]">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=800" 
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110" 
                alt="BayanStudy Dashboard" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Background Decorative Circles */}
          <div className="absolute -z-10 w-[120%] h-[120%] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-[100px] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
