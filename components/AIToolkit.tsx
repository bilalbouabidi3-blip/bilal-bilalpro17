
import React, { useState } from 'react';

interface ToolLink {
  name: string;
  url: string;
  isFree: boolean;
  desc: string;
}

interface AIFunction {
  name: string;
  desc: string;
  icon: string;
  color: string;
  tools: ToolLink[];
}

interface AICategory {
  title: string;
  icon: string;
  functions: AIFunction[];
}

interface AIToolkitProps {
  lang: string;
}

const AIToolkit: React.FC<AIToolkitProps> = ({ lang }) => {
  const [activeFunction, setActiveFunction] = useState<AIFunction | null>(null);

  const categories: Record<string, AICategory[]> = {
    ar: [
      {
        title: "إدارة المستندات والتعلم",
        icon: "fa-folder-open",
        functions: [
          {
            name: "📁 ملفات PDF وملخصات ذكية",
            desc: "أدوات لتحويل ملفات PDF المعقدة والمراجع الطويلة إلى ملخصات مركزة وقابلة للدردشة.",
            icon: "fa-file-pdf",
            color: "#ef4444",
            tools: [
              { name: "ChatPDF", desc: "الموقع الأشهر للدردشة مع ملفاتك.", url: "https://www.chatpdf.com", isFree: true },
              { name: "Humata AI", desc: "مساعد ذكي للمستندات العلمية والتقنية.", url: "https://www.humata.ai", isFree: true },
              { name: "AskYourPDF", desc: "نظام تفاعلي متقدم للملفات الدراسية.", url: "https://askyourpdf.com", isFree: true },
              { name: "Scholarcy", desc: "تفكيك الأوراق البحثية لبطاقات ملخص.", url: "https://www.scholarcy.com", isFree: true },
              { name: "SciSummary", desc: "تلخيص الأبحاث العلمية الطويلة فوراً.", url: "https://scisummary.com", isFree: true },
              { name: "PDF.ai", desc: "دردشة وتحليل للملفات القانونية والدراسية.", url: "https://pdf.ai", isFree: true },
              { name: "LightPDF AI", desc: "مجموعة أدوات PDF شاملة بالذكاء.", url: "https://lightpdf.com", isFree: true },
              { name: "Sharly AI", desc: "تلخيص جماعي للمستندات والكتب.", url: "https://www.sharly.ai", isFree: true },
              { name: "Docalysis", desc: "تحليل ذكي للميزانيات والتقارير الطويلة.", url: "https://docalysis.com", isFree: false },
              { name: "Unsummary", desc: "أداة ذكية لاختصار المحتوى الأكاديمي.", url: "https://unsummary.com", isFree: true },
              { name: "SmallPDF AI", desc: "دمج، ضغط وتلخيص الملفات بذكاء.", url: "https://smallpdf.com/ai-pdf", isFree: true },
              { name: "Explainpaper", desc: "شرح الأبحاث المعقدة بلغة بسيطة.", url: "https://www.explainpaper.com", isFree: true },
              { name: "Paper Digest", desc: "ملخصات ورقية للباحثين في دقائق.", url: "https://paper-digest.com", isFree: true },
              { name: "PopAi", desc: "مساعد شامل للمستندات والبحث.", url: "https://www.popai.pro", isFree: true },
              { name: "Skim AI", desc: "متصفح ذكي يقرأ الملفات عنك.", url: "https://skim.ai", isFree: true },
              { name: "Genei", desc: "تلخيص وتنظيم المصادر العلمية.", url: "https://www.genei.io", isFree: false },
              { name: "Casper AI", desc: "امتداد كروم لتلخيص أي مقال فوراً.", url: "https://casper.ai", isFree: true }
            ]
          },
          {
            name: "📑 تنظيم وملاحظات ذكية",
            desc: "نظم معرفتك، دون دروسك، واربط أفكارك باستخدام أنظمة الذكاء الاصطناعي.",
            icon: "fa-brain",
            color: "#8b5cf6",
            tools: [
              { name: "Notion AI", desc: "المساعد الشامل للملاحظات والمشاريع.", url: "https://www.notion.so", isFree: true },
              { name: "Mem.ai", desc: "مفكرة ذكية تنظم ذاتها تلقائياً.", url: "https://mem.ai", isFree: true },
              { name: "Obsidian Canvas", desc: "بناء خرائط ذهنية ذكية لأفكارك.", url: "https://obsidian.md", isFree: true },
              { name: "Reflect Notes", desc: "ربط الملاحظات بأسلوب العقل البشري.", url: "https://reflect.app", isFree: false },
              { name: "Napkin AI", desc: "تحويل الأفكار النصية لرسوم بصرية.", url: "https://www.napkin.ai", isFree: true },
              { name: "Logseq", desc: "تنظيم المعرفة بأسلوب مفتوح المصدر.", url: "https://logseq.com", isFree: true },
              { name: "Heptabase", desc: "لوحة بصرية للأبحاث المعقدة.", url: "https://heptabase.com", isFree: false },
              { name: "Taskade AI", desc: "منصة ملاحظات وتعاون ذكية.", url: "https://www.taskade.com", isFree: true },
              { name: "MyMind", desc: "ذاكرة رقمية لكل ما تراه على الويب.", url: "https://mymind.com", isFree: true },
              { name: "Readwise Reader", desc: "تنظيم تظليلات الكتب والمقالات.", url: "https://readwise.io", isFree: false },
              { name: "Otter.ai", desc: "تحويل المحاضرات الصوتية لملاحظات.", url: "https://otter.ai", isFree: true },
              { name: "Fireflies.ai", desc: "تسجيل وتلخيص اللقاءات الدراسية.", url: "https://fireflies.ai", isFree: true },
              { name: "Evernote AI", desc: "بحث ذكي داخل الملاحظات والملفات.", url: "https://evernote.com", isFree: true },
              { name: "Jamie", desc: "تدوين ملخصات الاجتماعات والمحاضرات.", url: "https://meetjamie.ai", isFree: false },
              { name: "Mindgrasp AI", desc: "تحويل أي فيديو أو ملف لملاحظات.", url: "https://mindgrasp.ai", isFree: true },
              { name: "NoteGPT", desc: "تلخيص يوتيوب وتحويله لملاحظات.", url: "https://notegpt.io", isFree: true }
            ]
          }
        ]
      },
      {
        title: "الإنتاجية وإدارة الوقت",
        icon: "fa-stopwatch",
        functions: [
          {
            name: "📅 جداول ومهام ذكية",
            desc: "أدوات لإدارة وقتك، بناء جداولك الدراسية، والتغلب على التسويف.",
            icon: "fa-calendar-check",
            color: "#10b981",
            tools: [
              { name: "Reclaim.ai", desc: "جدولة العادات والمهام في تقويم جوجل.", url: "https://reclaim.ai", isFree: true },
              { name: "Motion.so", desc: "تخطيط تلقائي ليومك بذكاء اصطناعي.", url: "https://www.usemotion.com", isFree: false },
              { name: "Clockwise", desc: "تحسين جدول المواعيد لزيادة التركيز.", url: "https://www.getclockwise.com", isFree: true },
              { name: "Sunsama", desc: "مخطط يومي يركز على الهدوء والعمل.", url: "https://sunsama.com", isFree: false },
              { name: "Any.do AI", desc: "إدارة مهام مع مساعد ذكي مدمج.", url: "https://www.any.do", isFree: true },
              { name: "BeforeSunset AI", desc: "تخطيط ذكي لإنهاء المهام بإنتاجية.", url: "https://www.beforesunset.ai", isFree: true },
              { name: "BeeDone", desc: "تحويل المهام إلى لعبة محفزة (Gamification).", url: "https://beedone.co", isFree: true },
              { name: "Trevor AI", desc: "جدولة مهام تعتمد على الكتل الزمنية.", url: "https://www.trevorai.com", isFree: true },
              { name: "Akiflow", desc: "تجميع المهام من كل التطبيقات في مكان واحد.", url: "https://akiflow.com", isFree: false },
              { name: "SkedPal", desc: "الجدولة التلقائية الأكثر ذكاءً.", url: "https://www.skedpal.com", isFree: false },
              { name: "Zapier AI", desc: "أتمتة المهام الدراسية الروتينية.", url: "https://zapier.com", isFree: true },
              { name: "Flowace", desc: "تتبع الوقت والإنتاجية آلياً.", url: "https://flowace.ai", isFree: true },
              { name: "Todoist AI", desc: "تنظيم المهام بفلترة ذكية.", url: "https://todoist.com", isFree: true },
              { name: "Monday.com AI", desc: "إدارة المشاريع الدراسية الجماعية.", url: "https://monday.com", isFree: true },
              { name: "Asana AI", desc: "متابعة تقدم المشاريع بذكاء.", url: "https://asana.com", isFree: true },
              { name: "ClickUp Brain", desc: "مساعد ذكي داخل لوحة المهام.", url: "https://clickup.com", isFree: true }
            ]
          }
        ]
      },
      {
        title: "صناعة المحتوى والإبداع",
        icon: "fa-wand-sparkles",
        functions: [
          {
            name: "المساعدات اللغوية والدردشة",
            desc: "أقوى المحركات الذكية للإجابة على التساؤلات المعقدة وكتابة البحوث.",
            icon: "fa-comment-dots",
            color: "#3b82f6",
            tools: [
              { name: "ChatGPT", desc: "الرائد عالمياً في المحادثة وحل المسائل.", url: "https://chat.openai.com", isFree: true },
              { name: "Gemini", desc: "ذكاء جوجل المتكامل للبحث والمستندات.", url: "https://gemini.google.com", isFree: true },
              { name: "Claude", desc: "يتميز بالدقة العالية والأسلوب الطبيعي.", url: "https://claude.ai", isFree: true },
              { name: "Perplexity AI", desc: "محرك بحث إجابات موثقة بالمصادر.", url: "https://www.perplexity.ai", isFree: true },
              { name: "Poe", desc: "دخول لكل نماذج الذكاء في منصة واحدة.", url: "https://poe.com", isFree: true },
              { name: "Jasper", desc: "متخصص في الكتابة الإبداعية والأكاديمية.", url: "https://jasper.ai", isFree: false },
              { name: "Copy.ai", desc: "توليد نصوص وبحوث سريعة بذكاء.", url: "https://copy.ai", isFree: true },
              { name: "Writesonic", desc: "كتابة مقالات طويلة بجودة احترافية.", url: "https://writesonic.com", isFree: true },
              { name: "QuillBot", desc: "إعادة صياغة وتلخيص النصوص ببراعة.", url: "https://quillbot.com", isFree: true },
              { name: "Grammarly", desc: "تصحيح لغوي ونحوي ذكي للمقالات.", url: "https://grammarly.com", isFree: true },
              { name: "Rytr", desc: "مساعد كتابة بسيط وفعال يدعم العربية.", url: "https://rytr.me", isFree: true },
              { name: "DeepL Write", desc: "تحسين جودة الكتابة باللغات الأجنبية.", url: "https://www.deepl.com/write", isFree: true },
              { name: "HuggingChat", desc: "بديل مجاني ومفتوح المصدر للدردشة.", url: "https://huggingface.co/chat", isFree: true },
              { name: "Wordtune", desc: "إعادة صياغة الجمل بأساليب متعددة.", url: "https://wordtune.com", isFree: true },
              { name: "HyperWrite", desc: "مساعد كتابة يتعلم أسلوبك الشخصي.", url: "https://hyperwriteai.com", isFree: true }
            ]
          }
        ]
      }
    ]
  };

  const translations: any = {
    ar: { 
      free: "مجاني / محدود", 
      paid: "مدفوع", 
      visit: "فتح الأداة", 
      featured: "أقوى مواقع الذكاء الاصطناعي للطلاب", 
      back: "العودة للقائمة الرئيسية", 
      availableTools: "المواقع المختارة (أكثر من 15 لكل فئة)", 
      subtitle: "استخدم هذه الأدوات لتسريع دراستك، تنظيم وقتك، وتلخيص دروسك بذكاء."
    }
  };

  const t = translations[lang] || translations.ar;
  const currentCats = categories[lang] || categories.ar;

  if (activeFunction) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <button 
          onClick={() => setActiveFunction(null)} 
          className="mb-10 flex items-center gap-3 text-blue-600 font-black hover:gap-5 transition-all group"
        >
          <i className={`fas fa-arrow-${lang === 'ar' ? 'right' : 'left'} group-hover:scale-125`}></i> {t.back}
        </button>
        
        <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-8 md:p-16 shadow-2xl border border-blue-50 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full -mr-40 -mt-40 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16 relative z-10">
            <div className="icon-3d w-28 h-28 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl border-4 border-white dark:border-slate-800" style={{ backgroundColor: `${activeFunction.color}15`, color: activeFunction.color }}>
              <i className={`fas ${activeFunction.icon}`}></i>
            </div>
            <div className={`text-center ${lang === 'ar' ? 'md:text-right' : 'md:text-left'} flex-1`}>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{activeFunction.name}</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{activeFunction.desc}</p>
            </div>
          </div>

          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 border-b-2 border-gray-100 dark:border-slate-800 pb-6 flex items-center gap-3">
             <i className="fas fa-list-check text-blue-600"></i> {t.availableTools}
          </h3>

          <div className="grid gap-4 max-h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
            {activeFunction.tools.map((tool, idx) => (
              <a 
                key={idx} 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col sm:flex-row items-center justify-between p-6 rounded-[2rem] bg-gray-50 dark:bg-slate-800/40 hover:bg-blue-600 dark:hover:bg-blue-600 transition-all border border-transparent hover:border-blue-400 hover:shadow-xl"
              >
                <div className="flex items-center gap-6 mb-4 sm:mb-0">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center text-blue-600 shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all">
                    <i className="fas fa-arrow-up-right-from-square text-xl"></i>
                  </div>
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <h4 className="font-black text-lg text-slate-800 dark:text-white group-hover:text-white mb-1">{tool.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-blue-100 font-medium">{tool.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-wider ${tool.isFree ? 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-400 group-hover:text-white' : 'bg-amber-100 text-amber-700 group-hover:bg-amber-400 group-hover:text-white'}`}>
                    {tool.isFree ? t.free : t.paid}
                  </span>
                  <div className="text-slate-300 group-hover:text-white transition-colors text-lg">
                    <i className={`fas fa-chevron-${lang === 'ar' ? 'left' : 'right'}`}></i>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 w-full max-w-7xl mx-auto px-4 pb-20">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t.featured}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8 font-medium">{t.subtitle}</p>
        <div className="h-2 w-24 bg-blue-600 mx-auto rounded-full shadow-lg shadow-blue-600/30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentCats.flatMap(c => c.functions).map((func, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveFunction(func)} 
            className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[3rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group icon-3d-container cursor-pointer relative overflow-hidden reveal"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div 
                className="icon-3d w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-xl" 
                style={{ backgroundColor: `${func.color}15`, color: func.color }}
              >
                <i className={`fas ${func.icon} text-3xl`}></i>
              </div>
              <div className="px-3 py-1 bg-blue-50 dark:bg-slate-800 rounded-full text-[10px] font-black text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-700">
                {func.tools.length}+ أداة
              </div>
            </div>
            <h4 className="text-2xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{func.name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium line-clamp-2">{func.desc}</p>
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20 active:scale-95 group-hover:gap-5">
              <i className="fas fa-bolt text-sm"></i>
              {t.visit}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIToolkit;
