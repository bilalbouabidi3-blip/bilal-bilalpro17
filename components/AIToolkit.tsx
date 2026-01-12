
import React, { useState } from 'react';

interface ToolLink {
  name: string;
  url: string;
  isFree: boolean;
  desc: string;
}

interface AIFunction {
  name: string;
  desc: string;
  icon: string;
  isPaid?: boolean;
  trend?: string;
  color?: string;
  tools?: ToolLink[];
}

interface AICategory {
  title: string;
  icon: string;
  functions: AIFunction[];
}

interface AIToolkitProps {
  lang: string;
}

const AIToolkit: React.FC<AIToolkitProps> = ({ lang }) => {
  const [activeFunction, setActiveFunction] = useState<AIFunction | null>(null);

  const categories: Record<string, AICategory[]> = {
    ar: [
      {
        title: "التلخيص والكتابة",
        icon: "fa-file-alt",
        functions: [
          { 
            name: "تلخيص الدروس", 
            desc: "حول الدروس الطويلة إلى ملخصات ذكية ومركزة", 
            icon: "fa-compress-alt", 
            isPaid: false, 
            trend: "1.2k+", 
            color: "#3b82f6",
            tools: [
              { name: "BayanSummary (خاص)", desc: "أداة الموقع الداخلية لتلخيص المناهج المغربية", url: "#", isFree: true },
              { name: "ChatPDF", desc: "لرفع ملفات الدروس وتلخيصها فوراً", url: "https://www.chatpdf.com", isFree: true },
              { name: "Humata AI", desc: "ممتاز للأبحاث الطويلة والمعقدة", url: "https://www.humata.ai", isFree: false }
            ]
          },
          { 
            name: "توسيع النص", 
            desc: "أضف تفاصيل وشروحات إضافية لفقراتك المختصرة", 
            icon: "fa-expand-arrows-alt", 
            isPaid: false, 
            color: "#8b5cf6",
            tools: [
              { name: "Wordtune", desc: "إعادة صياغة وتوسيع الجمل بذكاء", url: "https://www.wordtune.com", isFree: true },
              { name: "Copy.ai", desc: "مساعد كتابة إبداعي شامل", url: "https://www.copy.ai", isFree: false }
            ]
          },
          { name: "مساعد المقالات", desc: "بناء هيكل المقالات الأدبية والفلسفية باحترافية", icon: "fa-pen-fancy", isPaid: true, color: "#ec4899", tools: [{ name: "Jasper", desc: "أقوى كاتب محتوى بالذكاء الاصطناعي", url: "https://www.jasper.ai", isFree: false }] },
          { name: "تصحيح لغوي", desc: "تدقيق إملائي ونحوي ذكي لجميع النصوص", icon: "fa-spell-check", isPaid: false, trend: "800+", color: "#10b981", tools: [{ name: "Grammarly", desc: "التدقيق الأفضل للإنجليزية", url: "https://www.grammarly.com", isFree: true }, { name: "أداة تدقيق العربية", desc: "خاصة ببيان ستادي", url: "#", isFree: true }] }
        ]
      },
      {
        title: "الأسئلة والاختبارات",
        icon: "fa-question-circle",
        functions: [
          { 
            name: "توليد كويزات", 
            desc: "إنشاء أسئلة MCQ تفاعلية من أي نص تعليمي", 
            icon: "fa-tasks", 
            isPaid: false, 
            trend: "2.5k+", 
            color: "#f59e0b",
            tools: [
              { name: "Quizgecko", desc: "حول أي نص أو رابط إلى اختبار", url: "https://quizgecko.com", isFree: true },
              { name: "Conker", desc: "توليد اختبارات كاملة في ثوانٍ", url: "https://www.conker.ai", isFree: true }
            ]
          },
          { name: "حلول التمارين", desc: "شرح مفصل لخطوات حل المسائل الرياضية المعقدة", icon: "fa-calculator", isPaid: true, color: "#ef4444", tools: [{ name: "Photomath", desc: "حل المسائل عبر الكاميرا", url: "https://photomath.com", isFree: true }, { name: "Symbolab", desc: "آلة حاسبة علمية ذكية", url: "https://www.symbolab.com", isFree: true }] },
          { name: "محاكي الامتحانات", desc: "التدريب على نماذج الامتحانات الوطنية السابقة", icon: "fa-graduation-cap", isPaid: false, color: "#6366f1", tools: [{ name: "أرشيف الامتحانات", desc: "قاعدة بيانات الامتحانات المغربية", url: "#", isFree: true }] },
          { name: "بطاقات الذاكرة", desc: "صناعة Flashcards ذكية للمراجعة والحفظ السريع", icon: "fa-clone", isPaid: false, color: "#06b6d4", tools: [{ name: "Anki", desc: "نظام التكرار المتباعد الأشهر", url: "https://apps.ankiweb.net/", isFree: true }, { name: "Quizlet", desc: "دراسة عبر الألعاب والبطاقات", url: "https://quizlet.com", isFree: true }] }
        ]
      },
      {
        title: "الوسائط والعروض",
        icon: "fa-project-diagram",
        functions: [
          { 
            name: "توليد الصور", 
            desc: "تحويل المفاهيم العلمية إلى رسوم توضيحية دقيقة", 
            icon: "fa-palette", 
            isPaid: true, 
            trend: "400+", 
            color: "#f43f5e",
            tools: [
              { name: "DALL-E 3", desc: "دقة متناهية في فهم النصوص", url: "https://openai.com/dall-e-3", isFree: false },
              { name: "Canva Magic Media", desc: "توليد صور داخل تصاميمك", url: "https://www.canva.com", isFree: true }
            ]
          },
          { name: "منشئ العروض", desc: "تصميم شرائح PowerPoint متكاملة بضغطة واحدة", icon: "fa-chalkboard", isPaid: true, color: "#8b5cf6", tools: [{ name: "Gamma.app", desc: "أفضل منشئ عروض تقديمية حالياً", url: "https://gamma.app", isFree: true }, { name: "Tome", desc: "سرد قصصي وعروض بصرية مبهرة", url: "https://tome.app", isFree: false }] },
          { name: "تحويل النص لصوت", desc: "تحويل الملخصات المكتوبة إلى ملفات صوتية مسموعة", icon: "fa-volume-up", isPaid: false, color: "#3b82f6", tools: [{ name: "ElevenLabs", desc: "أصوات بشرية واقعية جداً", url: "https://elevenlabs.io", isFree: true }] },
          { name: "مخططات ذهنية", desc: "رسم خرائط مفاهيمية أوتوماتيكية لتنظيم الأفكار", icon: "fa-sitemap", isPaid: false, trend: "600+", color: "#10b981", tools: [{ name: "Whimsical", desc: "خرائط ذهنية ذكية وسريعة", url: "https://whimsical.com", isFree: true }, { name: "Miro AI", desc: "مساحة تعاونية للتفكير البصري", url: "https://miro.com", isFree: true }] }
        ]
      }
    ]
  };

  // Map to FR versions
  const categoriesFR: AICategory[] = categories.ar.map(cat => ({
    ...cat,
    title: cat.title === "التلخيص والكتابة" ? "Rédaction & Résumé" : 
           cat.title === "الأسئلة والاختبارات" ? "Tests & Quiz" : "Média & Présentations",
    functions: cat.functions.map(f => ({
      ...f,
      name: f.name === "تلخيص الدروس" ? "Résumer les cours" : 
            f.name === "توسيع النص" ? "Expansion de texte" :
            f.name === "مساعد المقالات" ? "Assistant Rédaction" :
            f.name === "تصحيح لغوي" ? "Correction" : 
            f.name === "توليد كويزات" ? "Générer Quiz" :
            f.name === "حلول التمارين" ? "Solutions" :
            f.name === "محاكي الامتحانات" ? "Simulateur" :
            f.name === "بطاقات الذاكرة" ? "Flashcards" :
            f.name === "توليد الصور" ? "Images IA" :
            f.name === "منشئ العروض" ? "Présentations" :
            f.name === "تحويل النص لصوت" ? "Synthèse Vocale" : "Cartes Mentales",
      desc: f.desc.includes("حول الدروس") ? "Transformez vos cours en résumés intelligents." : f.desc
    }))
  }));

  const translations: any = {
    ar: { free: "مجاني", paid: "مدفوع", visit: "فتح الأداة", more: "عرض كل الخدمات", featured: "خدمات ذكية متميزة", back: "عودة للقائمة", availableTools: "الأدوات المتوفرة لهذه الخدمة" },
    en: { free: "Free", paid: "Paid", visit: "Open Tool", more: "Show all services", featured: "Featured AI Services", back: "Back to menu", availableTools: "Tools available for this service" },
    fr: { free: "Gratuit", paid: "Payant", visit: "Ouvrir", more: "Tous les services", featured: "Services IA Vedettes", back: "Retour", availableTools: "Outils disponibles" }
  };
  const t = translations[lang] || translations.ar;
  const currentCats = lang === 'fr' ? categoriesFR : (categories[lang] || categories.ar);

  if (activeFunction) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button onClick={() => setActiveFunction(null)} className="mb-8 flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all">
          <i className={`fas fa-arrow-${lang === 'ar' ? 'right' : 'left'}`}></i> {t.back}
        </button>
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-blue-50 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
            <div className="icon-3d w-24 h-24 rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl" style={{ backgroundColor: `${activeFunction.color}15`, color: activeFunction.color }}>
              <i className={`fas ${activeFunction.icon}`}></i>
            </div>
            <div className="text-center md:text-right flex-1">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">{activeFunction.name}</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">{activeFunction.desc}</p>
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">{t.availableTools}</h3>
          <div className="grid gap-4">
            {activeFunction.tools?.map((tool, idx) => (
              <a key={idx} href={tool.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-6 rounded-3xl bg-gray-50 dark:bg-slate-800/50 hover:bg-blue-600 dark:hover:bg-blue-600 transition-all border border-transparent hover:border-blue-400">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><i className="fas fa-link"></i></div>
                  <div>
                    <h4 className="font-black text-lg text-slate-800 dark:text-white group-hover:text-white">{tool.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-blue-100">{tool.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${tool.isFree ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{tool.isFree ? t.free : t.paid}</span>
                  <div className="text-slate-300 group-hover:text-white transition-colors"><i className={`fas fa-external-link-alt`}></i></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-8"><h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{t.featured}</h2><div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentCats.flatMap(c => c.functions).slice(0, 4).map((func, idx) => (
          <div key={idx} onClick={() => setActiveFunction(func)} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group icon-3d-container cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="icon-3d w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${func.color}15`, color: func.color }}><div className="icon-3d-base"></div><i className={`fas ${func.icon} text-2xl`}></i></div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${func.isPaid ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>{func.isPaid ? t.paid : t.free}</div>
            </div>
            <h4 className="text-xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{func.name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 line-clamp-2 leading-relaxed">{func.desc}</p>
            <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/20 active:scale-95"><i className="fas fa-bolt-lightning text-xs"></i>{t.visit}</button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {currentCats.map((cat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[3rem] p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50 dark:border-slate-800">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 icon-3d"><i className={`fas ${cat.icon} text-xl`}></i></div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white">{cat.title}</h3>
            </div>
            <div className="space-y-2">
              {cat.functions.map((func, fIdx) => (
                <div key={fIdx} onClick={() => setActiveFunction(func)} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-300 dark:text-slate-600 w-5">{fIdx + 1}.</span>
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-all"><i className={`fas ${func.icon} text-sm`}></i></div>
                    <div className="flex flex-col"><span className="font-bold text-slate-700 dark:text-slate-200 text-sm group-hover:text-blue-600 transition-colors">{func.name}</span></div>
                  </div>
                  <div className="flex items-center gap-3">
                    {func.isPaid && <i className="fas fa-crown text-amber-400 text-xs"></i>}
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all"><i className={`fas fa-arrow-${lang === 'ar' ? 'left' : 'right'} text-[10px]`}></i></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIToolkit;
