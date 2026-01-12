
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
    ],
    en: [
      { id: 'ar_p', name: 'Arabic Language', icon: 'fa-pen-nib', color: '#f59e0b' },
      { id: 'math_p', name: 'Mathematics', icon: 'fa-calculator', color: '#3b82f6' },
      { id: 'sci_p', name: 'Science', icon: 'fa-flask', color: '#10b981' },
      { id: 'fr_p', name: 'French Language', icon: 'fa-language', color: '#ef4444' },
    ],
    fr: [
      { id: 'ar_p', name: 'Langue Arabe', icon: 'fa-pen-nib', color: '#f59e0b' },
      { id: 'math_p', name: 'Mathématiques', icon: 'fa-calculator', color: '#3b82f6' },
      { id: 'sci_p', name: 'Éveil Scientifique', icon: 'fa-flask', color: '#10b981' },
      { id: 'fr_p', name: 'Langue Française', icon: 'fa-language', color: '#ef4444' },
    ]
  },
  middle: {
    ar: [
      { id: 'math_m', name: 'الرياضيات', icon: 'fa-calculator', color: '#3b82f6' },
      { id: 'pc_m', name: 'الفيزياء والكيمياء', icon: 'fa-atom', color: '#ef4444' },
      { id: 'svt_m', name: 'علوم الحياة والأرض', icon: 'fa-leaf', color: '#10b981' },
      { id: 'eng_m', name: 'اللغة الإنجليزية', icon: 'fa-flag-usa', color: '#8b5cf6' },
    ],
    // Same structure for en/fr...
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
        { label: 'سنوات الخبرة', value: '15+', icon: 'fa-calendar-check' },
        { label: 'طالب متفوق', value: '50k+', icon: 'fa-user-graduate' },
        { label: 'برنامج إثرائي', value: '200+', icon: 'fa-book-open' },
        { label: 'معلم خبير', value: '120+', icon: 'fa-chalkboard-teacher' },
      ],
      aiHeader: 'أدوات ذكية لتسريع تعلمك',
      aiSub: 'وفر ساعات من المراجعة التقليدية باستخدام أدواتنا الذكية المخصصة للطلاب. لخص الكتب، افهم المفاهيم المعقدة، وتدرب بفعالية.',
      levelsTitle: 'اختر مستواك الدراسي',
      levelsSub: 'جميع الأسلاك التعليمية من الابتدائي إلى التعليم العالي',
      subjectsTitle: 'المواد المتاحة لـ',
      subjectsSub: 'تصفح أفضل الدروس والملخصات المختارة بعناية',
      exercisesTitle: 'تمارين تفاعلية ذكية',
      exercisesSub: 'اختبر مستواك مع تمارين ذكية مولدة خصيصاً لك',
      assistantTitle: 'المساعد الشخصي',
      assistantSub: 'تحدث مع معلمك الخصوصي المتاح 24/7',
      progressTitle: 'نتائجي وتطوري',
      progressSub: 'سجل نقاطك وراقب تحسن مستواك الدراسي بذكاء',
      footerRights: 'جميع الحقوق محفوظة.',
      quizGenMsg: 'جاري توليد التمارين بالذكاء الاصطناعي...',
      interactiveEx: 'توليد تمارين تفاعلية فورية',
      backToLevels: 'العودة للمستويات'
    },
    en: {
      stats: [
        { label: 'Years of Experience', value: '15+', icon: 'fa-calendar-check' },
        { label: 'Top Students', value: '50k+', icon: 'fa-user-graduate' },
        { label: 'Enrichment Programs', value: '200+', icon: 'fa-book-open' },
        { label: 'Expert Teachers', value: '120+', icon: 'fa-chalkboard-teacher' },
      ],
      aiHeader: 'Smart Tools to Accelerate Learning',
      aiSub: 'Save hours of traditional revision with our smart tools. Summarize books, understand complex concepts, and practice effectively.',
      levelsTitle: 'Choose Your Education Level',
      levelsSub: 'All education levels from Primary to Higher Education',
      subjectsTitle: 'Subjects for',
      subjectsSub: 'Browse the best curated lessons and summaries',
      exercisesTitle: 'Interactive Smart Exercises',
      exercisesSub: 'Test your level with smart exercises generated just for you',
      assistantTitle: 'Personal Assistant',
      assistantSub: 'Chat with your 24/7 private tutor',
      progressTitle: 'My Progress',
      progressSub: 'Track your scores and monitor your academic improvement',
      footerRights: 'All rights reserved.',
      quizGenMsg: 'Generating exercises with AI...',
      interactiveEx: 'Generate instant interactive exercises',
      backToLevels: 'Back to Levels'
    },
    fr: {
      stats: [
        { label: "Années d'Expérience", value: '15+', icon: 'fa-calendar-check' },
        { label: 'Élèves d\'Élite', value: '50k+', icon: 'fa-user-graduate' },
        { label: 'Programmes', value: '200+', icon: 'fa-book-open' },
        { label: 'Enseignants Experts', value: '120+', icon: 'fa-chalkboard-teacher' },
      ],
      aiHeader: 'Outils Intelligents d\'Apprentissage',
      aiSub: 'Gagnez du temps avec nos outils IA. Résumez vos cours, comprenez les concepts complexes et entraînez-vous efficacement.',
      levelsTitle: 'Choisissez Votre Niveau',
      levelsSub: 'Tous les cycles du primaire à l\'enseignement supérieur',
      subjectsTitle: 'Matières pour',
      subjectsSub: 'Consultez les meilleurs cours et résumés sélectionnés',
      exercisesTitle: 'Exercices Interactifs',
      exercisesSub: 'Testez votre niveau avec des exercices générés par IA',
      assistantTitle: 'Assistant Personnel',
      assistantSub: 'Discutez avec votre tuteur privé 24/7',
      progressTitle: 'Mon Progrès',
      progressSub: 'Suivez vos notes et votre évolution académique',
      footerRights: 'Tous droits réservés.',
      quizGenMsg: 'Génération d\'exercices par IA...',
      interactiveEx: 'Générer des exercices instantanés',
      backToLevels: 'Retour aux niveaux'
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
                      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl border border-blue-100 dark:border-transparent">
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
                    <p className="text-gray-500 dark:text-gray-400">{t.subjectsSub}</p>
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
                    <CourseCard key={sub.id} subject={sub} lang={lang} onClick={() => console.log('Selected sub:', sub.id)} />
                  ))}
                </div>
              </>
            )}
          </div>
        );

      // Other sections remain unchanged...
      case AppSection.EXERCISES:
        return (
          <div className="container mx-auto px-6 py-20">
             <div className="mb-12 text-center">
              <h2 className="text-4xl font-black text-blue-900 dark:text-white mb-4">{t.exercisesTitle}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t.exercisesSub}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedLevel ? getSubjects(selectedLevel) : levels).map((item: any) => (
                <div key={item.id} onClick={() => handleStartExercises(item.name)} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 cursor-pointer hover:shadow-xl transition-all group text-center">
                  <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: item.color + '20', color: item.color }}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <h4 className="text-2xl font-black mb-2 dark:text-white">{item.name}</h4>
                  <p className="text-gray-400 text-sm">{t.interactiveEx}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case AppSection.PROGRESS:
        return (
          <div className="container mx-auto px-6 py-20">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-black text-blue-900 dark:text-white mb-4">{t.progressTitle}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t.progressSub}</p>
            </div>
            <ProgressTracker subjects={selectedLevel ? getSubjects(selectedLevel) : []} lang={lang} />
          </div>
        );

      case AppSection.ASSISTANT:
        return (
          <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black text-blue-600 mb-2">{t.assistantTitle}</h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{t.assistantSub}</p>
            </div>
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
