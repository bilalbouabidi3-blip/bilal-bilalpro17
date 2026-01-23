
import React, { useState, useEffect } from 'react';
import { AppSection, Subject } from './types';
import Navbar, { Logo } from './components/Navbar';
import Hero from './components/Hero';
import CourseCard from './components/CourseCard';
import ChatBot from './components/ChatBot';
import AIToolkit from './components/AIToolkit';
import ProgressTracker from './components/ProgressTracker';
import DailyReward from './components/DailyReward';
import SubjectLessons from './components/SubjectLessons';
import { generateQuiz } from './geminiService';

const LEVELS_DATA: Record<string, any> = {
  ar: [
    { id: 'primary', name: 'التعليم الابتدائي', icon: 'fa-child', color: '#10b981' },
    { id: 'middle', name: 'التعليم الإعدادي الثانوى', icon: 'fa-user-graduate', color: '#004aad' },
    { id: 'high', name: 'التعليم الثانوي التأهيلي', icon: 'fa-book-reader', color: '#f59e0b' },
    { id: 'higher', name: 'التعليم العالي وتكوين الأطر', icon: 'fa-university', color: '#8b5cf6' },
  ]
};

const SUBJECTS_BY_LEVEL: Record<string, any> = {
  primary: {
    ar: [
      { id: 'ar_p', name: 'اللغة العربية', icon: 'fa-pen-nib', color: '#f59e0b' },
      { id: 'math_p', name: 'الرياضيات', icon: 'fa-calculator', color: '#004aad' },
      { id: 'sci_p', name: 'النشاط العلمي', icon: 'fa-flask', color: '#10b981' },
      { id: 'fr_p', name: 'اللغة الفرنسية', icon: 'fa-language', color: '#ef4444' },
    ]
  },
  middle: {
    ar: [
      { id: 'math_m', name: 'الرياضيات', icon: 'fa-calculator', color: '#004aad' },
      { id: 'pc_m', name: 'الفيزياء والكيمياء', icon: 'fa-atom', color: '#ef4444' },
      { id: 'svt_m', name: 'علوم الحياة والأرض', icon: 'fa-leaf', color: '#10b981' },
      { id: 'eng_m', name: 'اللغة الإنجليزية', icon: 'fa-flag-usa', color: '#8b5cf6' },
    ]
  },
  high: {
    ar: [
      { id: 'math_h', name: 'الرياضيات', icon: 'fa-square-root-variable', color: '#004aad' },
      { id: 'pc_h', name: 'الفيزياء والكيمياء', icon: 'fa-microscope', color: '#ef4444' },
      { id: 'phi_h', name: 'الفلسفة', icon: 'fa-brain', color: '#ec4899' },
      { id: 'svt_h', name: 'علوم الحياة والأرض', icon: 'fa-dna', color: '#10b981' },
    ]
  }
};

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.HOME);
  const [lang, setLang] = useState('ar');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<any[]>([]);

  const levels = LEVELS_DATA[lang] || LEVELS_DATA.ar;
  
  const getSubjects = (levelId: string) => {
    const levelData = SUBJECTS_BY_LEVEL[levelId];
    if (!levelData) return [];
    return levelData[lang] || levelData.ar || [];
  };

  const handleStartExercises = async (subject: string) => {
    setQuizLoading(true);
    setCurrentSection(AppSection.EXERCISES);
    const quiz = await generateQuiz(subject, selectedLevel || 'Bac');
    setActiveQuiz(quiz);
    setQuizLoading(false);
  };

  const content: any = {
    ar: {
      stats: [
        { label: 'سنة من العطاء', value: '15+', icon: 'fa-calendar-check' },
        { label: 'تلميذ مستفيد', value: '50k+', icon: 'fa-user-graduate' },
        { label: 'مورد تعليمي', value: '200+', icon: 'fa-book-open' },
        { label: 'أستاذ خبير', value: '120+', icon: 'fa-chalkboard-teacher' },
      ],
      levelsTitle: 'اختر سلكك الدراسي',
      levelsSub: 'موارد تعليمية تغطي كافة المستويات من الابتدائي إلى الجامعي',
      subjectsTitle: 'المواد الدراسية لـ',
      subjectsSub: 'استكشف الدروس، الملخصات والتمارين التفاعلية',
      exercisesTitle: 'تمارين تفاعلية ذكية',
      footerRights: 'جميع الحقوق محفوظة لمنصة بيان ستادي.',
      backToLevels: 'العودة لاختيار السلك'
    }
  };

  const t = content[lang] || content.ar;

  const renderContent = () => {
    switch (currentSection) {
      case AppSection.HOME:
        return (
          <>
            <Hero onStart={(sec) => setCurrentSection(sec)} lang={lang} />
            <div className="container mx-auto px-6 mb-20 -mt-20 relative z-20">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 py-16 px-8 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8">
                  {t.stats.map((stat: any, i: number) => (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-[#004aad] rounded-full flex items-center justify-center mx-auto mb-4 text-xl border border-blue-100 dark:border-transparent">
                        <i className={`fas ${stat.icon}`}></i>
                      </div>
                      <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
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
          </>
        );

      case AppSection.COURSES:
        return (
          <div className="container mx-auto px-6 py-20">
            {selectedSubject ? (
              <SubjectLessons 
                subject={selectedSubject} 
                levelId={selectedLevel!} 
                lang={lang} 
                onBack={() => setSelectedSubject(null)} 
              />
            ) : !selectedLevel ? (
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
                      <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-[#004aad]">{lvl.name}</h3>
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
                    <p className="text-gray-500 dark:text-gray-400">{t.subjectsSub}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedLevel(null)}
                    className="flex items-center gap-2 text-[#004aad] font-bold hover:underline"
                  >
                    <i className={`fas fa-arrow-right`}></i>
                    {t.backToLevels}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {getSubjects(selectedLevel).map((sub: Subject) => (
                    <CourseCard key={sub.id} subject={sub} lang={lang} onClick={() => setSelectedSubject(sub)} />
                  ))}
                </div>
              </>
            )}
          </div>
        );

      case AppSection.EXERCISES:
        return (
          <div className="container mx-auto px-6 py-20">
             <div className="mb-12 text-center">
              <h2 className="text-4xl font-black text-blue-900 dark:text-white mb-4">{t.exercisesTitle}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedLevel ? getSubjects(selectedLevel) : levels).map((item: any) => (
                <div key={item.id} onClick={() => handleStartExercises(item.name)} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 cursor-pointer hover:shadow-xl transition-all group text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: item.color + '20', color: item.color }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <h4 className="text-2xl font-black mb-2 dark:text-white">{item.name}</h4>
                </div>
              ))}
            </div>
          </div>
        );

      case AppSection.PROGRESS:
        return (
          <div className="container mx-auto px-6 py-20">
            <ProgressTracker lang={lang} />
          </div>
        );

      case AppSection.ASSISTANT:
        return (
          <div className="container mx-auto px-6 py-12">
            <ChatBot lang={lang} />
          </div>
        );
      
      case AppSection.AI_TOOLS:
        return (
          <div className="container mx-auto px-6 py-12">
            <AIToolkit lang={lang} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar currentSection={currentSection} setSection={setCurrentSection} lang={lang} setLang={setLang} />
      <main className="transition-all duration-500 min-h-[calc(100vh-200px)]">
        {renderContent()}
      </main>
      
      <footer className="bg-white dark:bg-slate-900 py-12 border-t border-gray-200 dark:border-slate-800 mt-20">
        <div className={`container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
          <Logo className="h-9" />
          <p className="text-gray-400 text-sm">© 2025 بيان ستادي. {t.footerRights}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
