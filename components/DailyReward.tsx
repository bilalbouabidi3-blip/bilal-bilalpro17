
import React, { useState, useEffect } from 'react';

interface DailyRewardProps {
  lang: string;
}

const DailyReward: React.FC<DailyRewardProps> = ({ lang }) => {
  const [streak, setStreak] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('bayan_last_login');
    const savedStreak = parseInt(localStorage.getItem('bayan_streak') || '0');
    const claimedToday = localStorage.getItem('bayan_claimed_today') === today;

    if (lastLogin) {
      const lastDate = new Date(lastLogin);
      const diffDays = Math.floor((new Date().getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        setStreak(savedStreak + 1);
      } else if (diffDays > 1) {
        setStreak(1);
      } else {
        setStreak(savedStreak || 1);
      }
    } else {
      setStreak(1);
    }

    localStorage.setItem('bayan_last_login', today);
    localStorage.setItem('bayan_streak', streak.toString());
    setHasClaimed(claimedToday);
  }, [streak]);

  const claimReward = () => {
    const today = new Date().toDateString();
    localStorage.setItem('bayan_claimed_today', today);
    setHasClaimed(true);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const translations: any = {
    ar: {
      title: "هدية اليوم",
      streak: "تتابع دراسي:",
      days: "أيام",
      claim: "احصل على هديتك",
      claimed: "تم الاستلام بنجاح",
      congrats: "مبروك! حصلت على 10 نقاط ذكاء إضافية",
      subtitle: "سجل دخولك يومياً لفتح ميزات حصرية"
    },
    en: {
      title: "Daily Gift",
      streak: "Study Streak:",
      days: "Days",
      claim: "Claim Your Gift",
      claimed: "Claimed Successfully",
      congrats: "Congrats! You got 10 extra AI points",
      subtitle: "Log in daily to unlock exclusive features"
    },
    fr: {
      title: "Cadeau du Jour",
      streak: "Série d'étude :",
      days: "Jours",
      claim: "Récupérer mon cadeau",
      claimed: "Récupéré avec succès",
      congrats: "Félicitations ! +10 points IA",
      subtitle: "Connectez-vous quotidiennement"
    }
  };

  const t = translations[lang] || translations.ar;

  return (
    <div className="relative group">
      {showCelebration && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-bounce bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-black">
            {t.congrats} 🎉
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative icon-3d-container">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`icon-3d mb-6 w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner border border-white/30 ${!hasClaimed ? 'floating-3d' : ''}`}>
             <i className={`fas ${hasClaimed ? 'fa-gift-open' : 'fa-gift'} text-yellow-300`}></i>
          </div>

          <h3 className="text-2xl font-black mb-2">{t.title}</h3>
          <p className="text-blue-100 text-sm mb-6 opacity-80">{t.subtitle}</p>

          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div key={day} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                streak >= day ? 'bg-yellow-400 text-blue-900 scale-110 shadow-lg' : 'bg-white/10 text-white/40'
              }`}>
                {day}
              </div>
            ))}
          </div>

          <button
            onClick={claimReward}
            disabled={hasClaimed}
            className={`w-full py-4 rounded-2xl font-black text-lg transition-all transform active:scale-95 shadow-xl ${
              hasClaimed ? 'bg-white/10 text-white/50 cursor-default' : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300 hover:-translate-y-1'
            }`}
          >
            {hasClaimed ? t.claimed : t.claim}
          </button>
          
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-100/60">
            <i className="fas fa-fire text-orange-400"></i>
            {t.streak} {streak} {t.days}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyReward;
