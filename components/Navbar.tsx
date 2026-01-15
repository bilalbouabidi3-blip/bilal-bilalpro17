
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
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsDetail, setShowTermsDetail] = useState(false);
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
      courses: "الدروس", 
      exercises: "التمرين", 
      aiTools: "أدوات الذكاء", 
      progress: "نتائجي",
      assistant: "المساعد",
      login: "دخول",
      googleLogin: "الدخول بواسطة Gmail",
      loginHeader: "مرحباً بك في بيان ستادي",
      loginSub: "سجل دخولك لمتابعة تقدمك الدراسي",
      disclaimer: "بمتابعتك، أنت توافق على الشروط والخصوصية.",
      termsLabel: "أوافق على شروط الاستخدام",
      close: "إغلاق"
    },
    en: { 
      home: "Home", 
      courses: "Lessons", 
      exercises: "Exercises", 
      aiTools: "AI Tools", 
      progress: "Progress",
      assistant: "Assistant",
      login: "Login",
      googleLogin: "Login with Gmail",
      loginHeader: "Welcome to BayanStudy",
      loginSub: "Login to track your progress",
      disclaimer: "By continuing, you agree to our Terms.",
      termsLabel: "I agree to terms",
      close: "Close"
    },
    fr: { 
      home: "Accueil", 
      courses: "Cours", 
      exercises: "Exercices", 
      aiTools: "Outils IA", 
      progress: "Progrès",
      assistant: "Assistant",
      login: "Connexion",
      googleLogin: "Connexion avec Gmail",
      loginHeader: "Bienvenue sur BayanStudy",
      loginSub: "Connectez-vous pour suivre votre progrès",
      termsLabel: "J'accepte les conditions",
      close: "Fermer"
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

  const handleGoogleLogin = () => {
    if (!agreedToTerms) {
      alert(lang === 'ar' ? 'يرجى الموافقة على الشروط أولاً' : 'Please agree to the terms first');
      return;
    }
    alert('Google Login...');
  };

  return (
    <>
      <nav className="sticky top-0 z-[100] glass shadow-sm px-4 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 lg:gap-12">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-blue-900 dark:text-white bg-gray-100 dark:bg-slate-800 rounded-xl"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSection(AppSection.HOME)}>
            <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-lg">B</div>
            <span className="text-xl font-black text-blue-900 dark:text-blue-400 tracking-tight hidden xs:block">BayanStudy</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 font-bold text-gray-500 dark:text-gray-400 text-sm">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setSection(item.id)} 
                className={`transition-all duration-200 hover:text-blue-600 py-1 relative ${currentSection === item.id ? 'text-blue-600 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600' : ''}`}
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
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 md:px-8 py-2.5 rounded-xl font-black shadow-lg text-sm md:text-base whitespace-nowrap"
          >
            {t.login}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar (Side Drawer) */}
      <div className={`fixed inset-0 z-[150] lg:hidden transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)}></div>
        
        {/* Sidebar Content */}
        <div className={`absolute top-0 bottom-0 ${lang === 'ar' ? 'right-0' : 'left-0'} w-[280px] bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-black text-blue-700">BayanStudy</span>
              <button onClick={() => setIsMenuOpen(false)} className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-slate-800 rounded-full text-gray-500">
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { setSection(item.id); setIsMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${currentSection === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentSection === item.id ? 'bg-white/20' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600'}`}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
              <div className="grid grid-cols-3 gap-2">
                {['ar', 'en', 'fr'].map(l => (
                  <button 
                    key={l}
                    onClick={() => setLang(l)}
                    className={`py-2 rounded-xl text-xs font-black uppercase ${lang === l ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-[450px] rounded-[2rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95">
            <div className="p-8 flex flex-col items-center text-center">
              <button onClick={() => setShowLoginModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <i className="fas fa-times text-xl"></i>
              </button>
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl text-blue-600 mb-6"><i className="fas fa-user"></i></div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{t.loginHeader}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">{t.loginSub}</p>
              <button onClick={handleGoogleLogin} className={`w-full flex items-center justify-center gap-4 py-4 px-6 rounded-2xl border-2 transition-all ${agreedToTerms ? 'bg-white dark:bg-slate-800 border-gray-100 hover:border-blue-500' : 'bg-gray-50 grayscale opacity-50'}`}>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="w-6 h-6" />
                <span className="font-bold text-gray-700 dark:text-white">{t.googleLogin}</span>
              </button>
              <label className="mt-6 flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="w-5 h-5 rounded text-blue-600" />
                <span className="text-xs text-gray-500 font-bold">{t.termsLabel}</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
