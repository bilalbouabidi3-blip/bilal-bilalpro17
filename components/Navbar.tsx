
import React, { useState, useEffect } from 'react';
import { AppSection } from '../types';

interface NavbarProps {
  currentSection: AppSection;
  setSection: (section: AppSection) => void;
  lang: string;
  setLang: (lang: string) => void;
}

export const Logo: React.FC<{ className?: string; hideText?: boolean }> = ({ className = "h-10", hideText = false }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {/* Stylized SVG Logo based on the official image */}
    <svg viewBox="0 0 100 100" className="h-full w-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10H60C75 10 85 20 85 35C85 45 80 50 75 53C82 56 88 64 88 75C88 90 78 100 63 100H20V10Z" fill="#004aad"/>
      <path d="M45 40C45 35 48 32 52 32H75C70 32 65 35 65 40V70C65 75 70 78 75 78H52C48 78 45 75 45 70V40Z" fill="white"/>
      <path d="M25 40C25 35 28 32 32 32H55C50 32 45 35 45 40V70C45 75 50 78 55 78H32C28 78 25 75 25 70V40Z" fill="white" opacity="0.9"/>
      <rect x="20" y="20" width="10" height="20" fill="#004aad" transform="rotate(-45 20 20)"/>
      <rect x="20" y="80" width="10" height="20" fill="#004aad" transform="rotate(45 20 80)"/>
    </svg>
    {!hideText && (
      <span className="text-2xl font-black text-[#002d72] dark:text-blue-400 tracking-tighter brand-highlight lowercase">bayanstudy</span>
    )}
  </div>
);

const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection, lang, setLang }) => {
  const [isDark, setIsDark] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const translations: any = {
    ar: { 
      home: "الرئيسية", 
      courses: "المواد الدراسية", 
      exercises: "التمارين والامتحانات", 
      aiTools: "أدوات الذكاء الاصطناعي", 
      progress: "تتبع التقدم",
      assistant: "المساعد الذكي",
      login: "تسجيل الدخول",
      googleLogin: "الدخول عبر حساب Google",
      loginHeader: "مرحباً بك في بيان ستادي",
      loginSub: "سجل دخولك لحفظ تقدمك والوصول لميزات حصرية",
      termsLabel: "أوافق على شروط الاستخدام",
      close: "إغلاق"
    }
  };

  const t = translations[lang] || translations.ar;

  const navItems = [
    { id: AppSection.HOME, label: t.home, icon: 'fa-home' },
    { id: AppSection.COURSES, label: t.courses, icon: 'fa-book' },
    { id: AppSection.EXERCISES, label: t.exercises, icon: 'fa-pencil-alt' },
    { id: AppSection.AI_TOOLS, label: t.aiTools, icon: 'fa-robot' },
    { id: AppSection.PROGRESS, label: t.progress, icon: 'fa-chart-line' },
    { id: AppSection.ASSISTANT, label: t.assistant, icon: 'fa-comment-dots' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[100] glass shadow-sm px-4 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 lg:gap-12">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-blue-900 dark:text-white bg-gray-100 dark:bg-slate-800 rounded-xl"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="cursor-pointer" onClick={() => setSection(AppSection.HOME)}>
            <Logo className="h-9 md:h-11" />
          </div>

          <div className="hidden lg:flex items-center gap-6 font-bold text-gray-500 dark:text-gray-400 text-sm">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setSection(item.id)} 
                className={`transition-all duration-200 hover:text-[#004aad] py-1 relative ${currentSection === item.id ? 'text-[#004aad] after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#004aad]' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block relative group">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="appearance-none bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm font-bold outline-none cursor-pointer pr-8 dark:text-white"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-yellow-400 border border-gray-100 dark:border-slate-700"
          >
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <button 
            onClick={() => setShowLoginModal(true)}
            className="bg-[#004aad] hover:bg-[#003580] text-white px-6 md:px-8 py-2.5 rounded-xl font-black shadow-lg text-sm md:text-base whitespace-nowrap"
          >
            {t.login}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[150] lg:hidden transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)}></div>
        
        <div className={`absolute top-0 bottom-0 ${lang === 'ar' ? 'right-0' : 'left-0'} w-[280px] bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <Logo className="h-8" />
              <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-slate-800 rounded-full text-gray-500">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { setSection(item.id); setIsMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${currentSection === item.id ? 'bg-[#004aad] text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentSection === item.id ? 'bg-white/20' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600'}`}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-[450px] rounded-[2rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95">
            <div className="p-8 flex flex-col items-center text-center">
              <button onClick={() => setShowLoginModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <i className="fas fa-times text-xl"></i>
              </button>
              <div className="mb-6">
                <Logo className="h-16" hideText={true} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{t.loginHeader}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">{t.loginSub}</p>
              <button className="w-full flex items-center justify-center gap-4 py-4 px-6 rounded-2xl border-2 transition-all bg-white dark:bg-slate-800 border-gray-100 hover:border-[#004aad]">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="w-6 h-6" />
                <span className="font-bold text-gray-700 dark:text-white">{t.googleLogin}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
