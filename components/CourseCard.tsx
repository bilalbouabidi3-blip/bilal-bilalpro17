
import React, { useState } from 'react';
import { Subject } from '../types';

interface Resource {
  name: string;
  url: string;
  desc: string;
  icon: string;
  color: string;
  category: 'tutorial' | 'ai-tool' | 'document';
}

interface CourseCardProps {
  subject: Subject;
  onClick: () => void;
  lang: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ subject, onClick, lang }) => {
  const [showPortal, setShowPortal] = useState(false);

  // قاعدة بيانات المصادر الذكية (Smart Contextual Resources)
  const getResources = (id: string): Resource[] => {
    const common: Resource[] = [
      { name: "AlloSchool", url: "https://www.alloschool.com", desc: "أكبر منصة للملخصات المغربية", icon: "fa-graduation-cap", color: "#10b981", category: 'tutorial' },
      { name: "Moutamadris", url: "https://www.moutamadris.ma", desc: "نماذج الامتحانات والفروض", icon: "fa-file-pdf", color: "#3b82f6", category: 'document' }
    ];
    
    // تخصيص المصادر بناءً على المادة
    if (id.includes('math') || id.includes('pc')) {
      return [
        { name: "WolframAlpha", url: "https://www.wolframalpha.com", desc: "محرك المعرفة الحسابي الذكي", icon: "fa-calculator", color: "#ef4444", category: 'ai-tool' },
        ...common,
        { name: "Khan Academy", url: "https://ar.khanacademy.org", desc: "شروحات فيديو تفاعلية مجانية", icon: "fa-play-circle", color: "#f59e0b", category: 'tutorial' }
      ];
    }
    
    if (id.includes('it') || id.includes('code')) {
      return [
        { name: "W3Schools", url: "https://www.w3schools.com", desc: "تعلم البرمجة من الصفر", icon: "fa-code", color: "#282a35", category: 'tutorial' },
        { name: "ChatGPT", url: "https://chat.openai.com", desc: "مساعدك في تصحيح الكود", icon: "fa-robot", color: "#10a37f", category: 'ai-tool' },
        ...common
      ];
    }

    return common;
  };

  const t: any = {
    ar: { 
      action: 'استكشاف المصادر',
      portalTitle: 'بوابة التعلم الذكي',
      suggested: 'المصادر المقترحة لهذه المادة:',
      visit: 'فتح الرابط',
      close: 'إغلاق'
    },
    en: { 
      action: 'Explore Resources',
      portalTitle: 'Smart Learning Portal',
      suggested: 'Suggested resources for this subject:',
      visit: 'Visit',
      close: 'Close'
    }
  }[lang] || { ar: {} };

  return (
    <>
      <div 
        onClick={() => { setShowPortal(true); onClick(); }}
        className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden icon-3d-container"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
        
        <div className="icon-3d w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl" style={{ backgroundColor: subject.color + '20', color: subject.color }}>
          <i className={`fas ${subject.icon}`}></i>
        </div>
        
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{subject.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
          انقر للوصول إلى دروس {subject.name}، التمارين المصححة، وأفضل أدوات الذكاء الاصطناعي للمساعدة.
        </p>
        
        <div className="flex justify-between items-center text-blue-600 dark:text-blue-400 font-bold text-sm">
          <span className="group-hover:underline underline-offset-4">{t.action}</span>
          <i className={`fas fa-arrow-${lang === 'ar' ? 'left' : 'right'} group-hover:translate-x-${lang === 'ar' ? '-3' : '3'} transition-all`}></i>
        </div>
      </div>

      {/* Smart Resources Portal Modal */}
      {showPortal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
            <div className="p-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg" style={{ backgroundColor: subject.color + '20', color: subject.color }}>
                  <i className={`fas ${subject.icon}`}></i>
                </div>
                <div>
                  <h2 className="text-xl font-black dark:text-white leading-tight">{subject.name}</h2>
                  <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{t.portalTitle}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPortal(false)}
                className="w-10 h-10 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                aria-label={t.close}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-8 space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-400 font-bold mb-2">{t.suggested}</p>
              {getResources(subject.id).map((res, i) => (
                <a 
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-3xl bg-gray-50 dark:bg-slate-800/40 border border-transparent hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-lg shadow-sm group-hover:scale-110 transition-transform" style={{ color: res.color }}>
                      <i className={`fas ${res.icon}`}></i>
                    </div>
                    <div>
                      <div className="font-black text-slate-800 dark:text-white flex items-center gap-2">
                        {res.name}
                        {res.category === 'ai-tool' && <i className="fas fa-bolt text-[10px] text-blue-500"></i>}
                      </div>
                      <div className="text-xs text-gray-400 line-clamp-1">{res.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t.visit}</span>
                    <i className="fas fa-external-link-alt"></i>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-8 bg-gray-50 dark:bg-slate-800/50">
              <button 
                onClick={() => setShowPortal(false)}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
