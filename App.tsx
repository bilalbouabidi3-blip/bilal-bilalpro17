
import React, { useState, useEffect } from 'react';
import { AppSection, Subject } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCard from './components/CourseCard';
import ChatBot from './components/ChatBot';
import AIToolkit from './components/AIToolkit';
import ProgressTracker from './components/ProgressTracker';
import DailyReward from './components/DailyReward';
import { generateQuiz } from './geminiService';

const LEVELS_DATA: Record<string, any> = {
  ar: [
    { id: 'primary', name: 'التعليم الابتدائي', icon: 'fa-child', color: '#10b981' },
    { id: 'middle', name: 'التعليم الإعدادي', icon: 'fa-user-graduate', color: '#3b82f6' },
    { id: 'high', name: 'التعليم الثانوي التأهيلي', icon: 'fa-book-reader', color: '#f59e0b' },
    { id: 'higher', name: 'التعليم العالي والجامعي', icon: 'fa-university', color: '#8b5cf6' },
  ],
  en: [
    { id: 'primary', name: 'Primary Education', icon: 'fa-child', color: '#10b981' },
    { id: 'middle', name: 'Middle School', icon: 'fa-user-graduate', color: '#3b82f6' },
    { id: 'high', name: 'High School', icon: 'fa-book-reader', color: '#f59e0b' },
    { id: 'higher', name: 'Higher Education', icon: 'fa-university', color: '#8b5cf6' },
  ],
  fr: [
    { id: 'primary', name: 'Enseignement Primaire', icon: 'fa-child', color: '#10b981' },
    { id: 'middle', name: 'Enseignement Collégial', icon: 'fa-user-graduate', color: '#3b82f6' },
    { id: 'high', name: 'Enseignement Secondaire', icon: 'fa-book-reader', color: '#f59e0b' },
    { id: 'higher', name: 'Enseignement Supérieur', icon: 'fa-university', color: '#8b5cf6' },
  ]
};

const SUBJECTS_BY_LEVEL: Record<string, any> = {
  primary: {
    ar: [
      { id: 'ar_p', name: 'اللغة العربية', icon: 'fa-pen-nib', color: '#f59e0b' },
      { id: 'math_p', name: 'الرياضيات', icon: 'fa-calculator', color: '#3b82f6' },
      { id: 'sci_p', name: 'النشاط العلمي', icon: 'fa-flask', color: '#10b981' },
      { id: 'fr_p', name: 'اللغة الفرنسية', icon: 'fa-language', color: '#ef4444' },
    ]
  },
  middle: {
    ar: [
      { id: 'math_m', name: 'الرياضيات', icon: 'fa-calculator', color: '#3b82f6' },
      { id: 'pc_m', name: 'الفيزياء والكيمياء', icon: 'fa-atom', color: '#ef4444' },
      { id: 'svt_m', name: 'علوم الحياة والأرض', icon: 'fa-leaf', color: '#10b981' },
      { id: 'eng_m', name: 'اللغة الإنجليزية', icon: 'fa-flag-usa', color: '#8b5cf6' },
    ]
  },
  high: {
    ar: [
      { id: 'math_h', name: 'الرياضيات', icon: 'fa-square-root-variable', color: '#3b82f6' },
      { id: 'pc_h', name: 'الفيزياء والكيمياء', icon: 'fa-microscope', color: '#ef4444' },
      { id: 'phi_h', name: 'الفلسفة', icon: 'fa-brain', color: '#ec4899' },
      { id: 'svt_h', name: 'علوم الحياة والأرض', icon: 'fa-dna', color: '#10b981' },
    ]
  },
  higher: {
    ar: [
      { id: 'uni_math', name: 'التحليل الجبري', icon: 'fa-infinity', color: '#3b82f6' },
      { id: 'uni_econ', name: 'الاقتصاد والتدبير', icon: 'fa-chart-pie', color: '#10b981' },
      { id: 'uni_law', name: 'القانون والعلوم السياسية', icon: 'fa-scale-balanced', color: '#ef4444' },
      { id: 'uni_it', name: 'البرمجة والذكاء الاصطناعي', icon: 'fa-code', color: '#1e293b' },
    ]
  }
};

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);
  const [lang, setLang] = useState('ar');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = LEVELS_DATA[lang] || LEVELS_DATA.ar;
  
  const getSubjects = (levelId: string) => {
    const levelData = SUBJECTS_BY_LEVEL[levelId];
    if (!levelData) return [];
    return levelData[lang] || levelData.ar || [];
  };

  const content: any = {
    ar: {
      stats: [
        { label: 'سنوات الخبرة', value: '15+', icon: 'fa-calendar-check' },
        { label: 'طالب متفوق', value: '50k+', icon: 'fa-user-graduate' },
        { label: 'برنامج إثرائي', value: '200+', icon: 'fa-book-open' },
        { label: 'معلم خبير', value: '120+', icon: 'fa-chalkboard-teacher' },
      ],
      levelsTitle: 'اختر مستواك الدراسي',
      levelsSub: 'جميع الأسلاك التعليمية من الابتدائي إلى التعليم العالي',
      subjectsTitle: 'المواد المتاحة لـ',
      backToLevels: 'العودة للمستويات',
      footerRights: 'جميع الحقوق محفوظة.'
    },
    en: {
      stats: [
        { label: 'Years of Experience', value: '15+', icon: 'fa-calendar-check' },
        { label: 'Top Students', value: '50k+', icon: 'fa-user-graduate' },
        { label: 'Programs', value: '200+', icon: 'fa-book-open' },
        { label: 'Expert Teachers', value: '120+', icon: 'fa-chalkboard-teacher' },
      ],
      levelsTitle: 'Choose Your Level',
      backToLevels: 'Back'
    }
  };

  const t = content[lang] || content.ar;

  const renderContent = () => {
    switch (currentSection) {
      case AppSection.HOME:
        return (
          <div className="animate-in fade-in duration-700">
            <Hero onStart={(sec) => setCurrentSection(sec)} lang={lang} />
            <div className="container mx-auto px-6 mb-20 -mt-20 relative z-20">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 py-12 md:py-16 px-6 md:px-8 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {t.stats.map((stat: any, i: number) => (
                    <div key={i} className="text-center group">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg md:text-xl border border-blue-100 dark:border-transparent group-hover:scale-110 transition-transform">
                        <i className={`fas ${stat.icon}`}></i>
                      </div>
                      <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-black">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <DailyReward lang={lang} />
              </div>
            </div>
            <div className="py-24 bg-gray-50 dark:bg-slate-950">
               <div className="container mx-auto px-6">
                 <AIToolkit lang={lang} />
               </div>
            </div>
          </div>
        );

      case AppSection.COURSES:
        return (
          <div className="container mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!selectedLevel ? (
              <>
                <div className="mb-12 text-center">
                  <h2 className="text-4xl font-black text-blue-900 dark:text-white mb-4">{t.levelsTitle}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{t.levelsSub}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {levels.map((lvl: any) => (
                    <div 
                      key={lvl.id} 
                      onClick={() => setSelectedLevel(lvl.id)}
                      className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer text-center group icon-3d-container"
                    >
                      <div className="icon-3d w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-xl" style={{ backgroundColor: lvl.color + '20', color: lvl.color }}>
                        <i className={`fas ${lvl.icon}`}></i>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-blue-600">{lvl.name}</h3>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <h2 className="text-3xl font-black text-blue-900 dark:text-white mb-2">
                      {t.subjectsTitle} {levels.find((l:any) => l.id === selectedLevel)?.name}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setSelectedLevel(null)}
                    className="flex items-center gap-2 text-blue-600 font-bold hover:underline"
                  >
                    <i className={`fas fa-arrow-${lang === 'ar' ? 'right' : 'left'}`}></i>
                    {t.backToLevels}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {getSubjects(selectedLevel).map((sub: Subject) => (
                    <CourseCard key={sub.id} subject={sub} lang={lang} onClick={() => {}} />
                  ))}
                </div>
              </>
            )}
          </div>
        );

      case AppSection.ASSISTANT:
        return <div className="container mx-auto px-6 py-12"><ChatBot lang={lang} /></div>;
      
      case AppSection.AI_TOOLS:
        return <div className="container mx-auto px-6 py-12"><AIToolkit lang={lang} /></div>;

      default:
        return <div className="p-20 text-center font-bold text-gray-400">قيد التطوير...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar currentSection={currentSection} setSection={setCurrentSection} lang={lang} setLang={setLang} />
      <main className="min-h-[calc(100vh-200px)]">
        {renderContent()}
      </main>
      <footer className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-800 mt-20">
        <div className={`container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">B</div>
            <span className="text-xl font-black text-blue-900 dark:text-blue-400">BayanStudy</span>
          </div>
          <p className="text-gray-400 text-sm">© 2024 BayanStudy. {t.footerRights}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
