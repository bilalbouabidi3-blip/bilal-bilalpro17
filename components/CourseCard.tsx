
import React from 'react';
import { Subject } from '../types';

interface CourseCardProps {
  subject: Subject;
  onClick: () => void;
  lang: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ subject, onClick, lang }) => {
  const content: any = {
    ar: { desc: 'دروس مبسطة وتمارين تطبيقية لمستوى البكالوريا والمنهج المغربي', action: 'تصفح الدروس' },
    en: { desc: 'Simplified lessons and exercises for Baccalaureate and Moroccan curriculum', action: 'Browse Lessons' },
    fr: { desc: 'Cours simplifiés et exercices pratiques pour le Baccalauréat marocain', action: 'Voir les cours' },
    tr: { desc: 'Fas müfredatı ve Bakalorya için basitleştirilmiş dersler ve alıştırmalar', action: 'Derslere Göz At' },
    zh: { desc: '针对摩洛哥课程和学士学位的简明课程与练习', action: '浏览课程' }
  };
  const t = content[lang] || content.ar;

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden icon-3d-container"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/0 to-blue-500/5 dark:to-blue-400/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="icon-3d w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl" style={{ backgroundColor: subject.color + '20', color: subject.color }}>
        <i className={`fas ${subject.icon}`}></i>
      </div>
      
      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{subject.name}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">{t.desc}</p>
      
      <div className="flex justify-between items-center text-blue-600 dark:text-blue-400 font-bold text-sm">
        <span className="group-hover:underline underline-offset-4">{t.action}</span>
        <i className={`fas fa-arrow-${lang === 'ar' ? 'left' : 'right'} group-hover:translate-x-${lang === 'ar' ? '-3' : '3'} transition-all`}></i>
      </div>
    </div>
  );
};

export default CourseCard;
