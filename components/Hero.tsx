
import React from 'react';
import { AppSection } from '../types';

interface HeroProps {
  onStart: (section: AppSection) => void;
  lang: string;
}

const Hero: React.FC<HeroProps> = ({ onStart, lang }) => {
  const content: any = {
    ar: {
      titlePrefix: "مستقبلك الدراسي يبدأ مع ",
      brandName: "بيان ستادي",
      desc: "بيان ستادي هي المنصة الذكية الأولى في المغرب التي تسخر قدرات الذكاء الاصطناعي لدعم الطلاب في التحصيل والمراجعة. نوفر لك شروحات مبسطة، تمارين تفاعلية، وملخصات ذكية تغطي كافة المواد التعليمية وفق المعايير الوطنية.",
      ctaPrimary: "ابدأ المراجعة الآن",
      ctaSecondary: "اسأل المساعد الذكي",
      badge1: "تمارين وتصحيحات",
      badge2: "مراجعة ذكية"
    }
  };

  const t = content[lang] || content.ar;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 pt-10 md:pt-16 pb-20 md:pb-32 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="p-8 md:p-12 border-2 border-[#004aad] rounded-[3.5rem] animate-in fade-in duration-1000 bg-gradient-to-br from-white to-blue-50/30 dark:from-slate-950 dark:to-blue-900/10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`text-${lang === 'ar' ? 'right' : 'left'} z-10 flex flex-col items-center lg:items-start animate-in slide-in-from-right-8 duration-700`}>
              <div className="relative inline-block mb-6">
                <h1 className="text-4xl md:text-7xl font-black text-[#002d72] dark:text-white leading-tight text-center lg:text-start tracking-tight">
                  {t.titlePrefix} <span className="brand-highlight text-[#004aad]">{t.brandName}</span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 leading-relaxed max-w-xl text-center lg:text-start font-medium">
                {t.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => onStart(AppSection.COURSES)}
                  className="bg-[#004aad] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#003580] transition-all shadow-xl shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-3"
                >
                  {t.ctaPrimary}
                  <i className={`fas fa-arrow-${lang === 'ar' ? 'left' : 'right'}`}></i>
                </button>
                <button 
                  onClick={() => onStart(AppSection.ASSISTANT)}
                  className="bg-white dark:bg-slate-900 border-2 border-[#004aad] text-[#004aad] dark:text-blue-400 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                >
                  {t.ctaSecondary}
                </button>
              </div>
            </div>
            
            <div className="relative icon-3d-container flex justify-center lg:block animate-in slide-in-from-left-8 duration-700">
              <div className="absolute top-0 -right-4 z-20 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl floating-3d border border-gray-100 dark:border-slate-700 hidden sm:block">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><i className="fas fa-check"></i></div>
                    <div className="font-black text-xs dark:text-white">{t.badge1}</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[#004aad]/10 blur-3xl rounded-full"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=600" 
                  alt="Learning" 
                  className="rounded-[2.5rem] md:rounded-[3rem] relative z-10 border-4 md:border-8 border-white dark:border-slate-800 shadow-2xl w-full max-w-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
