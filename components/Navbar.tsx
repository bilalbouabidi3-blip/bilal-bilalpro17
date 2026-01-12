
import React, { useState, useEffect } from 'react';
import { AppSection } from '../types';

interface NavbarProps {
  currentSection: AppSection;
  setSection: (section: AppSection) => void;
  lang: string;
  setLang: (lang: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection, lang, setLang }) => {
  const [isDark, setIsDark] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [isDark, lang]);

  const translations: any = {
    ar: { home: "الرئيسية", courses: "الدروس", exercises: "التمرين", ai_tools: "أدوات الذكاء", progress: "نتائجي", assistant: "المساعد", login: "دخول" },
    en: { home: "Home", courses: "Courses", exercises: "Exercises", ai_tools: "AI Tools", progress: "Progress", assistant: "Assistant", login: "Login" },
    fr: { home: "Accueil", courses: "Cours", exercises: "Exercices", ai_tools: "Outils IA", progress: "Progrès", assistant: "Assistant", login: "Connexion" },
    tr: { home: "Ana Sayfa", courses: "Dersler", exercises: "Egzersizler", ai_tools: "AI Araçları", progress: "İlerleme", assistant: "Asistan", login: "Giriş" },
    zh: { home: "首页", courses: "课程", exercises: "练习", ai_tools: "AI工具", progress: "进度", assistant: "助手", login: "登录" }
  };

  const t = translations[lang] || translations.ar;

  return (
    <>
      <nav className="sticky top-0 z-[100] glass shadow-sm px-4 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-6 lg:gap-12">
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0 group" onClick={() => setSection(AppSection.HOME)}>
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg icon-3d-container">
              <div className="icon-3d">B</div>
            </div>
            <span className="text-2xl font-black text-blue-900 dark:text-blue-400 tracking-tight hidden sm:block">BayanStudy</span>
          </div>

          <div className="hidden lg:flex items-center gap-6 font-bold text-gray-500 dark:text-gray-400">
            {Object.keys(AppSection).filter(k => k !== 'SEARCH').map((key) => (
              <button key={key} onClick={() => setSection(AppSection[key as keyof typeof AppSection])} 
                className={`transition-all duration-200 hover:text-blue-600 relative py-2 ${currentSection === AppSection[key as keyof typeof AppSection] ? 'text-blue-600' : ''}`}>
                {t[key.toLowerCase()] || key}
                {currentSection === AppSection[key as keyof typeof AppSection] && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full animate-in fade-in slide-in-from-bottom-1"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative group">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)} 
              className="appearance-none bg-gray-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-xs md:text-sm font-black outline-none cursor-pointer pr-10 hover:bg-gray-200 dark:hover:bg-slate-700 dark:text-white transition-all shadow-inner"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="tr">Türkçe</option>
              <option value="zh">中文</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400"><i className="fas fa-chevron-down text-[10px]"></i></div>
          </div>

          <button onClick={() => setIsDark(!isDark)} className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-yellow-400 hover:scale-110 transition-transform shadow-inner">
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <button onClick={() => setShowLoginModal(true)} 
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-2.5 rounded-xl font-black shadow-[0_10px_20px_rgba(29,78,216,0.3)] transition-all active:scale-95 !bg-opacity-100 min-w-[100px]">
            {t.login}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
