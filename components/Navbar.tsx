
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
      aiTools: "أدوات الذكاء الاصطناعي", 
      progress: "نتائجي",
      assistant: "المساعد",
      login: "دخول",
      googleLogin: "الدخول بواسطة Gmail",
      loginHeader: "مرحباً بك في بيان ستادي",
      loginSub: "سجل دخولك لمتابعة تقدمك الدراسي",
      disclaimer: "بمتابعتك، أنت توافق على شروط الاستخدام وسياسة الخصوصية الخاصة ببيان ستادي.",
      termsLabel: "أوافق على شروط الاستخدام وسياسة الخصوصية",
      termsTitle: "شروط الاستخدام والسياسات",
      legalAge: "1. العمر القانوني: يجب أن يكون عمرك 13 سنة أو أكثر أو بموافقة ولي الأمر.",
      correctInfo: "2. معلومات صحيحة: يجب تقديم بيانات دقيقة وصحيحة عند التسجيل.",
      accountSecurity: "3. حماية الحساب: أنت مسؤول عن سرية كلمة مرورك ونشاط حسابك.",
      usagePolicy: "4. الاستخدام المسموح: الحساب للأغراض التعليمية فقط ويمنع أي استخدام مخالف.",
      verification: "5. التحقق: قد يطلب الموقع تأكيد بريدك الإلكتروني لضمان التواصل.",
      cancellation: "6. إلغاء الحساب: يحق للموقع تعليق الحسابات المخالفة للشروط."
    },
    en: { 
      home: "Home", 
      courses: "Lessons", 
      exercises: "Exercises", 
      aiTools: "AI Tools", 
      progress: "My Progress",
      assistant: "Assistant",
      login: "Login",
      googleLogin: "Login with Gmail",
      loginHeader: "Welcome to BayanStudy",
      loginSub: "Login to track your academic progress",
      disclaimer: "By continuing, you agree to our Terms and Conditions.",
      termsLabel: "I agree to the terms and conditions",
      termsTitle: "Terms of Use & Policies"
    },
    fr: { 
      home: "Accueil", 
      courses: "Cours", 
      exercises: "Exercices", 
      aiTools: "Outils IA", 
      progress: "Mon Progrès",
      assistant: "Assistant",
      login: "Connexion",
      googleLogin: "Connexion avec Gmail",
      loginHeader: "Bienvenue sur BayanStudy",
      loginSub: "Connectez-vous pour suivre votre progrès",
      termsLabel: "J'accepte les conditions d'utilisation",
      termsTitle: "Conditions d'Utilisation"
    }
  };

  const t = translations[lang] || translations.ar;

  const navItems = [
    { id: AppSection.HOME, label: t.home },
    { id: AppSection.COURSES, label: t.courses },
    { id: AppSection.EXERCISES, label: t.exercises },
    { id: AppSection.AI_TOOLS, label: t.aiTools },
    { id: AppSection.PROGRESS, label: t.progress },
    { id: AppSection.ASSISTANT, label: t.assistant },
  ];

  const handleGoogleLogin = () => {
    if (!agreedToTerms) {
      alert(lang === 'ar' ? 'يرجى الموافقة على الشروط أولاً' : 'Please agree to the terms first');
      return;
    }
    alert('توجيه إلى Google...');
  };

  return (
    <>
      <nav className="sticky top-0 z-[100] glass shadow-sm px-4 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-6 lg:gap-12">
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => setSection(AppSection.HOME)}>
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-lg">
              B
            </div>
            <span className="text-2xl font-black text-blue-900 dark:text-blue-400 tracking-tight hidden sm:block">BayanStudy</span>
          </div>

          <div className="hidden lg:flex items-center gap-6 font-bold text-gray-500 dark:text-gray-400">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setSection(item.id)} 
                className={`transition-all duration-200 hover:text-blue-600 py-1 relative ${
                  currentSection === item.id 
                  ? 'text-blue-600 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600' 
                  : 'hover:after:content-[""] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative group">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="appearance-none bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-xs md:text-sm font-bold outline-none cursor-pointer pr-10 hover:border-blue-500 transition-colors dark:text-white"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 group-hover:text-blue-500">
              <i className="fas fa-chevron-down text-[10px]"></i>
            </div>
          </div>

          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-yellow-400 transition-all border border-gray-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700"
          >
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <button 
            onClick={() => setShowLoginModal(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 md:px-10 py-2.5 rounded-xl font-black transition-all shadow-lg active:scale-95 whitespace-nowrap text-sm md:text-base border-none outline-none ring-offset-2 focus:ring-2 focus:ring-blue-500 !bg-opacity-100"
          >
            {t.login}
          </button>
        </div>
      </nav>

      {/* Login Modal - Matches Screenshot with Terms UI */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-[500px] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] overflow-hidden relative border-2 border-blue-500/20 animate-in zoom-in-95 duration-300">
            <div className="p-8 md:p-12 flex flex-col items-center text-center">
              <button 
                onClick={() => {setShowLoginModal(false); setShowTermsDetail(false);}}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>

              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-3xl text-blue-600 mb-8 shadow-inner">
                <i className="fas fa-user"></i>
              </div>

              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{t.loginHeader}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">{t.loginSub}</p>

              {!showTermsDetail ? (
                <>
                  <button 
                    onClick={handleGoogleLogin}
                    className={`w-full flex items-center justify-center gap-4 py-4.5 px-6 rounded-2xl transition-all shadow-sm hover:shadow-md group mb-6 border-2 ${
                      agreedToTerms 
                      ? 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-blue-500' 
                      : 'bg-gray-50 dark:bg-slate-800 border-gray-100 cursor-not-allowed grayscale'
                    }`}
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" alt="Google" className="w-6 h-6" />
                    <span className="font-bold text-gray-700 dark:text-white text-lg group-hover:text-blue-600 transition-colors">{t.googleLogin}</span>
                  </button>

                  <div className="flex flex-col gap-4 w-full">
                    <label className="flex items-center gap-3 cursor-pointer group text-right">
                      <input 
                        type="checkbox" 
                        checked={agreedToTerms} 
                        onChange={() => setAgreedToTerms(!agreedToTerms)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                      />
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-bold group-hover:text-blue-600">
                        {t.termsLabel}
                      </span>
                    </label>
                    <button 
                      onClick={() => setShowTermsDetail(true)}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >
                      {lang === 'ar' ? 'قراءة الشروط بالتفصيل' : 'Read full terms'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-full text-right bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl max-h-[300px] overflow-y-auto mb-6 custom-scrollbar">
                  <h3 className="font-black text-blue-600 mb-4">{t.termsTitle}</h3>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-3 font-bold leading-relaxed">
                    <li><i className="fas fa-check-circle text-blue-500 ml-2"></i> {t.legalAge}</li>
                    <li><i className="fas fa-check-circle text-blue-500 ml-2"></i> {t.correctInfo}</li>
                    <li><i className="fas fa-check-circle text-blue-500 ml-2"></i> {t.accountSecurity}</li>
                    <li><i className="fas fa-check-circle text-blue-500 ml-2"></i> {t.usagePolicy}</li>
                    <li><i className="fas fa-check-circle text-blue-500 ml-2"></i> {t.verification}</li>
                    <li><i className="fas fa-check-circle text-blue-500 ml-2"></i> {t.cancellation}</li>
                  </ul>
                  <button 
                    onClick={() => setShowTermsDetail(false)}
                    className="mt-6 w-full py-2 bg-blue-600 text-white rounded-xl font-bold"
                  >
                    {lang === 'ar' ? 'فهمت، عودة' : 'Got it, Back'}
                  </button>
                </div>
              )}

              <div className="pt-8 border-t border-gray-100 dark:border-slate-800 w-full">
                <p className="text-[11px] text-gray-400 font-bold leading-relaxed max-w-[350px] mx-auto">
                  {t.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
