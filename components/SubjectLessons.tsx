
import React from 'react';
import { Subject } from '../types';

interface Resource {
  name: string;
  desc: string;
  url: string;
  icon: string;
  type: 'official' | 'community' | 'global' | 'video';
}

interface YouTubeChannel {
  name: string;
  url: string;
  subscribers?: string;
  image: string;
}

interface StudyBook {
  title: string;
  type: 'book' | 'solution' | 'dictionary' | 'exercise';
  downloadUrl: string;
  size?: string;
}

interface SubjectLessonsProps {
  subject: Subject;
  levelId: string;
  lang: string;
  onBack: () => void;
}

const RESOURCES_DATA: Record<string, Resource[]> = {
  primary: [
    { name: "تلميذ تيس (Telmidtice)", desc: "المنصة الرسمية لدروس الفيديو والتمارين التفاعلية", url: "https://telmidtice.men.gov.ma", icon: "fa-video", type: 'official' },
    { name: "مدارسي (Madarissi)", desc: "دروس، تمارين وملخصات شاملة لجميع مستويات الابتدائي", url: "https://www.madariss.me", icon: "fa-file-alt", type: 'community' },
    { name: "المدرسة المغربية", desc: "ملخصات وتمارين داعمة مصنفة حسب الوحدات", url: "https://www.almadrasa.ma", icon: "fa-school", type: 'community' },
    { name: "ماروك دروس", desc: "موارد دراسية متنوعة لتعزيز المكتسبات", url: "https://www.marocdorous.com", icon: "fa-book", type: 'community' },
    { name: "قناة الرابعة التربوية", desc: "دروس التلفزة المغربية الرسمية (بث مباشر ومسجل)", url: "http://www.snrt.ma", icon: "fa-tv", type: 'video' },
  ],
  middle: [
    { name: "مدارسي - الإعدادي", desc: "بنك الفروض والامتحانات لجميع سنوات الإعدادي", url: "https://www.madariss.me/college", icon: "fa-graduation-cap", type: 'community' },
    { name: "تلميذ تيس (Telmidtice)", desc: "شروحات فيديو مفصلة لبرنامج الإعدادي", url: "https://telmidtice.men.gov.ma", icon: "fa-laptop-code", type: 'official' },
    { name: "AlloSchool", desc: "مكتبة دروس وتحميلات مجانية شاملة لكل المواد", url: "https://www.alloschool.com", icon: "fa-download", type: 'community' },
    { name: "سكويلة (Escuila)", desc: "دروس وتمارين وفروض محروسة مصححة", url: "https://www.escuila.com", icon: "fa-pencil-ruler", type: 'community' },
    { name: "مول التلاخيص", desc: "ملخصات مركزة للمواد الأدبية والعلمية", url: "https://www.moulttalakiss.com", icon: "fa-lightbulb", type: 'community' },
  ],
  high: [
    { name: "منصة PrepBac", desc: "دروس وامتحانات وطنية للبكالوريا (علمي وأدبي)", url: "https://www.prepbac.ma", icon: "fa-star", type: 'official' },
    { name: "تلميذ تيس - التأهيلي", desc: "الدروس الرسمية المقررة للامتحانات الإشهادية", url: "https://telmidtice.men.gov.ma", icon: "fa-university", type: 'official' },
    { name: "مدارسي - البكالوريا", desc: "أكبر تجمع للامتحانات الوطنية والجهوية المصححة", url: "https://www.madariss.me/lycee", icon: "fa-file-signature", type: 'community' },
    { name: "AlloSchool - Bac", desc: "تمارين تطبيقية وحلول مفصلة لمستوى الباك", url: "https://www.alloschool.com", icon: "fa-atlas", type: 'community' },
    { name: "سكويلة - الثانوي", desc: "موارد دراسية تكميلية للثانوي التأهيلي", url: "https://www.escuila.com", icon: "fa-chalkboard-teacher", type: 'community' },
  ],
  global: [
    { name: "BBC Bitesize", desc: "دروس تفاعلية عالمية لتعزيز المفاهيم العلمية واللغات", url: "https://www.bbc.co.uk/bitesize", icon: "fa-globe", type: 'global' },
    { name: "Brilliant", desc: "تدريبات تفاعلية في الرياضيات والعلوم بأسلوب عصري", url: "https://brilliant.org", icon: "fa-brain", type: 'global' },
    { name: "GCFGlobal", desc: "تعلم المهارات الرقمية والتقنية المطلوبة", url: "https://edu.gcfglobal.org", icon: "fa-laptop", type: 'global' },
  ]
};

const YOUTUBE_CHANNELS: Record<string, YouTubeChannel[]> = {
  'الرياضيات': [
    { name: "Maths Pro Maroc", subscribers: "1M+", url: "https://www.youtube.com/@MathsProMaroc", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop" },
    { name: "Prof Brahim", subscribers: "500k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop" },
    { name: "قناة الرياضيات للجميع", subscribers: "200k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1596495573175-975a4f4664ec?w=400&h=250&fit=crop" },
  ],
  'الفيزياء والكيمياء': [
    { name: "Science Facile", subscribers: "800k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop" },
    { name: "Prof Najib - PC", subscribers: "400k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=250&fit=crop" },
  ],
  'علوم الحياة والأرض': [
    { name: "Mustapha SVT", subscribers: "600k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=250&fit=crop" },
    { name: "SVT Maroc", subscribers: "300k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1532187875605-186c6af8405c?w=400&h=250&fit=crop" },
  ],
  'الفلسفة': [
    { name: "Amine Philo", subscribers: "200k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop" },
    { name: "Al Moukawil - Philo", subscribers: "700k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1516663713099-3bd377045052?w=400&h=250&fit=crop" },
  ],
  'اللغة العربية': [
    { name: "قناة اللغة العربية", subscribers: "150k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1543165365-07232ed12fad?w=400&h=250&fit=crop" },
  ],
  'اللغة الإنجليزية': [
    { name: "English with Khalid", subscribers: "400k+", url: "https://www.youtube.com", image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=400&h=250&fit=crop" },
  ],
  'default': [
    { name: "قناة الرابعة الثقافية", subscribers: "الرسمية", url: "https://www.youtube.com/@Athaqafia", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=250&fit=crop" },
    { name: "Kezako المغرب", subscribers: "300k+", url: "https://www.youtube.com/@KezakoMaroc", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop" },
  ]
};

const BOOKS_BY_SUBJECT: Record<string, StudyBook[]> = {
  'اللغة العربية': [
    { title: "كتاب التلميذ - مرشدي في اللغة العربية", type: 'book', downloadUrl: "https://www.madariss.me/2023/09/arabic-books.html", size: "12MB" },
    { title: "دليل الإجابة - حلول تمارين الكتاب", type: 'solution', downloadUrl: "#", size: "5MB" },
    { title: "المعجم اللغوي المدرسي - شرح المفردات", type: 'dictionary', downloadUrl: "https://www.almaany.com/ar/dict/ar-ar/", size: "رابط مباشر" },
    { title: "سلسلة تمارين الإنشاء والتعبير الكتابي", type: 'exercise', downloadUrl: "#", size: "3MB" },
  ],
  'الرياضيات': [
    { title: "كتاب المفيد في الرياضيات - المقرر الرسمي", type: 'book', downloadUrl: "#", size: "15MB" },
    { title: "حلول تمارين كتاب المفيد (خطوة بخطوة)", type: 'solution', downloadUrl: "#", size: "8MB" },
    { title: "سلسلة ديما ديما - تمارين تدريبية مكثفة", type: 'exercise', downloadUrl: "#", size: "20MB" },
  ],
  'الفيزياء والكيمياء': [
    { title: "كتاب فضاء الفيزياء والكيمياء", type: 'book', downloadUrl: "#", size: "18MB" },
    { title: "نماذج الفروض المحروسة والامتحانات", type: 'exercise', downloadUrl: "#", size: "10MB" },
    { title: "ملخص القوانين الفيزيائية - مسلك الباك", type: 'solution', downloadUrl: "#", size: "4MB" },
  ],
  'default': [
    { title: "الكتاب المدرسي الرسمي المعتمد", type: 'book', downloadUrl: "#", size: "10MB" },
    { title: "دليل الحلول والتمارين المقترحة", type: 'solution', downloadUrl: "#", size: "5MB" },
    { title: "نماذج فروض المراقبة المستمرة", type: 'exercise', downloadUrl: "#", size: "2MB" },
  ]
};

const SubjectLessons: React.FC<SubjectLessonsProps> = ({ subject, levelId, lang, onBack }) => {
  const levelResources = RESOURCES_DATA[levelId] || RESOURCES_DATA.high;
  const globalResources = RESOURCES_DATA.global;
  const youtubeChannels = YOUTUBE_CHANNELS[subject.name] || YOUTUBE_CHANNELS.default;
  const subjectBooks = BOOKS_BY_SUBJECT[subject.name] || BOOKS_BY_SUBJECT.default;

  const labels: any = {
    ar: {
      title: "الموارد التعليمية لـ",
      back: "العودة للمواد",
      local: "منصات تعليمية مغربية مختارة",
      global: "مصادر عالمية داعمة للتعلم",
      youtube: "أفضل القنوات التعليمية (يوتيوب)",
      books: "الكتب المدرسية، الحلول والنماذج",
      visit: "زيارة المنصة",
      openChannel: "مشاهدة القناة",
      download: "تحميل PDF",
      desc: "استعرض أفضل الموارد المتاحة لمراجعة مادة"
    }
  };

  const t = labels[lang] || labels.ar;

  const getBookIcon = (type: string) => {
    switch (type) {
      case 'book': return 'fa-book-open';
      case 'solution': return 'fa-check-circle';
      case 'dictionary': return 'fa-spell-check';
      case 'exercise': return 'fa-pencil-ruler';
      default: return 'fa-file-pdf';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div className="flex items-center gap-8">
          <div 
            className="w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl border-4 border-white dark:border-slate-800" 
            style={{ backgroundColor: subject.color + '20', color: subject.color }}
          >
            <i className={`fas ${subject.icon}`}></i>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
              {t.title} {subject.name}
            </h2>
            <p className="text-slate-500 font-bold text-lg">{t.desc} {subject.name}</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="bg-white dark:bg-slate-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-[1.5rem] font-black hover:bg-blue-50 transition-all flex items-center gap-3 shadow-xl active:scale-95"
        >
          <i className="fas fa-arrow-right"></i>
          {t.back}
        </button>
      </div>

      <div className="space-y-20 pb-20">
        
        {/* Books & Solutions Section */}
        <section>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <i className="fas fa-layer-group"></i>
            </div>
            {t.books}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjectBooks.map((book, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col sm:flex-row items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-6 mb-4 sm:mb-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
                    book.type === 'dictionary' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    <i className={`fas ${getBookIcon(book.type)}`}></i>
                  </div>
                  <div className="text-right">
                    <h4 className="font-black text-lg text-slate-900 dark:text-white mb-1">{book.title}</h4>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{book.size || 'PDF'}</span>
                  </div>
                </div>
                <a 
                  href={book.downloadUrl} 
                  target="_blank" 
                  className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                    book.type === 'dictionary' 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                  }`}
                >
                  <i className="fas fa-download"></i>
                  {t.download}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube Channels Section */}
        <section className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[3.5rem] border border-gray-100 dark:border-slate-800">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-4">
            <div className="w-10 h-10 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
              <i className="fab fa-youtube"></i>
            </div>
            {t.youtube}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {youtubeChannels.map((channel, idx) => (
              <a 
                key={idx} 
                href={channel.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-red-100"
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={channel.image} alt={channel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">قناة متميزة</span>
                  </div>
                </div>
                <div className="p-6 text-right">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-red-600">{channel.name}</h4>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
                    <i className="fas fa-users"></i>
                    <span>{channel.subscribers} مشترك</span>
                  </div>
                  <div className="w-full py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center text-red-600 font-black text-xs group-hover:bg-red-600 group-hover:text-white transition-all">
                    {t.openChannel}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Moroccan Resources Sites */}
        <section>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-4">
            <div className="w-3 h-10 bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"></div>
            {t.local}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {levelResources.map((res, idx) => (
              <a 
                key={idx} 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 ${
                    res.type === 'official' ? 'bg-blue-100 text-blue-600' : 
                    res.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    <i className={`fas ${res.icon} text-2xl`}></i>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600">{res.name}</h4>
                  <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-bold">{res.desc}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center text-blue-600 font-black text-sm">
                  <span>{t.visit}</span>
                  <i className="fas fa-external-link-alt"></i>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Global Resources */}
        <section>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 flex items-center gap-4">
            <div className="w-3 h-10 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/30"></div>
            {t.global}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {globalResources.map((res, idx) => (
              <a 
                key={idx} 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-slate-50 dark:bg-slate-900/30 p-8 rounded-[2.5rem] border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center mb-6">
                    <i className={`fas ${res.icon} text-2xl`}></i>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600">{res.name}</h4>
                  <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-bold">{res.desc}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-indigo-50 dark:border-indigo-900/20 flex justify-between items-center text-indigo-600 font-black text-sm">
                  <span>{t.visit}</span>
                  <i className="fas fa-chevron-left"></i>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SubjectLessons;
