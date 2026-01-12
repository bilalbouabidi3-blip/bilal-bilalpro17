
import React, { useState, useEffect } from 'react';
import { ScoreEntry, Subject } from '../types';

interface ProgressTrackerProps {
  subjects: Subject[];
  lang: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ subjects, lang }) => {
  const [scores, setScores] = useState<ScoreEntry[]>(() => {
    const saved = localStorage.getItem('bayan_scores');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newScore, setNewScore] = useState({ subjectId: subjects[0]?.id || '', score: '', total: '20' });

  useEffect(() => {
    localStorage.setItem('bayan_scores', JSON.stringify(scores));
  }, [scores]);

  const addScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScore.score || !newScore.total) return;
    
    const entry: ScoreEntry = {
      id: Date.now().toString(),
      subjectId: newScore.subjectId,
      score: parseFloat(newScore.score),
      total: parseFloat(newScore.total),
      date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : (lang === 'fr' ? 'fr-FR' : 'en-US'))
    };
    
    setScores([entry, ...scores]);
    setNewScore({ ...newScore, score: '' });
  };

  const labels: any = {
    ar: { 
      title: "تتبع مساري الدراسي", add: "إضافة نقطة جديدة", subject: "المادة", 
      score: "النقطة", total: "على", save: "حفظ النقطة", 
      history: "سجل النقط", average: "المعدل العام", trend: "ملاحظة التطور",
      noScores: "لا توجد نقط مسجلة بعد. ابدأ بإضافة أول نقطة لك!"
    },
    en: { 
      title: "My Progress Tracker", add: "Add New Score", subject: "Subject", 
      score: "Score", total: "Out of", save: "Save Score", 
      history: "Score History", average: "Overall Average", trend: "Progress Observation",
      noScores: "No scores recorded yet. Start by adding your first score!"
    },
    fr: { 
      title: "Suivi de Progrès", add: "Ajouter une note", subject: "Matière", 
      score: "Note", total: "Sur", save: "Enregistrer", 
      history: "Historique", average: "Moyenne Générale", trend: "Évolution",
      noScores: "Aucune note enregistrée. Ajoutez votre première note !"
    }
  };

  const t = labels[lang] || labels.ar;

  const calculateAverage = () => {
    if (scores.length === 0) return 0;
    const percentages = scores.map(s => (s.score / s.total) * 20);
    const sum = percentages.reduce((a, b) => a + b, 0);
    return (sum / scores.length).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl flex flex-col items-center justify-center text-center">
          <span className="text-blue-100 font-bold mb-2 uppercase tracking-wider">{t.average}</span>
          <div className="text-5xl font-black">{calculateAverage()}</div>
          <span className="text-blue-200 mt-2">/ 20</span>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-plus-circle text-blue-600"></i> {t.add}
          </h3>
          <form onSubmit={addScore} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-bold text-gray-400 mb-2">{t.subject}</label>
              <select 
                value={newScore.subjectId}
                onChange={e => setNewScore({...newScore, subjectId: e.target.value})}
                className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-xl outline-none dark:text-white"
              >
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">{t.score}</label>
              <input 
                type="number" step="0.25" placeholder="18"
                value={newScore.score}
                onChange={e => setNewScore({...newScore, score: e.target.value})}
                className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-xl outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">{t.total}</label>
              <input 
                type="number" placeholder="20"
                value={newScore.total}
                onChange={e => setNewScore({...newScore, total: e.target.value})}
                className="w-full p-3 bg-gray-50 dark:bg-slate-800 rounded-xl outline-none dark:text-white"
              />
            </div>
            <button className="bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95">
              {t.save}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-slate-800">
        <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
          <i className="fas fa-chart-line text-blue-600"></i> {t.trend}
        </h3>
        
        {scores.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="font-bold">{t.noScores}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {scores.map((score) => {
              const sub = subjects.find(s => s.id === score.subjectId);
              const percent = (score.score / score.total) * 100;
              return (
                <div key={score.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 group">
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: sub?.color || '#3b82f6' }}>
                      <i className={`fas ${sub?.icon || 'fa-book'}`}></i>
                    </div>
                    <div>
                      <div className="font-bold dark:text-white">{sub?.name}</div>
                      <div className="text-xs text-gray-400">{score.date}</div>
                    </div>
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <span className="text-lg font-black text-blue-600">{score.score}</span>
                    <span className="text-gray-400 font-bold ml-1">/ {score.total}</span>
                  </div>
                  <button 
                    onClick={() => setScores(scores.filter(s => s.id !== score.id))}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 transition-all"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
