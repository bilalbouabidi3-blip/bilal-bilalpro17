
import React, { useState, useEffect } from 'react';

interface GradeRow {
  id: string;
  name: string;
  exam1: string;
  exam2: string;
  exam3: string;
  exam4: string;
  activities: string;
  coefficient: number;
}

interface ProgressTrackerProps {
  lang: string;
}

const DEFAULT_SUBJECTS: GradeRow[] = [
  { id: '1', name: 'اللغة العربية', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 2 },
  { id: '2', name: 'اللغة الفرنسية', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 4 },
  { id: '3', name: 'اللغة الإنجليزية', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 2 },
  { id: '4', name: 'الرياضيات', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 7 },
  { id: '5', name: 'الفيزياء والكيمياء', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 7 },
  { id: '6', name: 'علوم الحياة والأرض', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 5 },
  { id: '7', name: 'التربية الإسلامية', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 2 },
  { id: '8', name: 'الفلسفة', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 2 },
  { id: '9', name: 'التربية البدنية', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 4 },
];

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ lang }) => {
  const [rows, setRows] = useState<GradeRow[]>(() => {
    const saved = localStorage.getItem('bayan_grades_table');
    return saved ? JSON.parse(saved) : DEFAULT_SUBJECTS;
  });

  const [level, setLevel] = useState('السنة الثانية بكالوريا');
  const [branch, setBranch] = useState('علوم فيزيائية');

  useEffect(() => {
    localStorage.setItem('bayan_grades_table', JSON.stringify(rows));
  }, [rows]);

  const updateRow = (id: string, field: keyof GradeRow, value: string | number) => {
    setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const calculateRowAverage = (row: GradeRow) => {
    const values = [row.exam1, row.exam2, row.exam3, row.exam4, row.activities]
      .map(v => parseFloat(v))
      .filter(v => !isNaN(v));
    
    if (values.length === 0) return null;
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  };

  const calculateTotalAverage = () => {
    let totalWeighted = 0;
    let totalCoef = 0;
    let hasData = false;

    rows.forEach(row => {
      const avg = calculateRowAverage(row);
      if (avg !== null) {
        totalWeighted += avg * row.coefficient;
        totalCoef += row.coefficient;
        hasData = true;
      }
    });

    return hasData ? (totalWeighted / totalCoef).toFixed(2) : '0.00';
  };

  const getStats = () => {
    const averages = rows.map(r => calculateRowAverage(r)).filter(v => v !== null) as number[];
    return {
      count: rows.length,
      completed: averages.length,
      max: averages.length > 0 ? Math.max(...averages).toFixed(2) : '-',
      min: averages.length > 0 ? Math.min(...averages).toFixed(2) : '-'
    };
  };

  const stats = getStats();

  return (
    <div className="w-full pb-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Content Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-gray-100 dark:border-slate-800 overflow-hidden mb-12">
          
          {/* Top Bar with Selectors */}
          <div className="bg-gray-50/50 dark:bg-slate-800/50 p-8 md:p-12 border-b border-gray-100 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-end">
              <div className="space-y-3">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest block pr-2">السلك التعليمي والمستوى</label>
                <div className="relative">
                  <i className="fas fa-graduation-cap absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <select 
                    value={level} 
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full pr-12 pl-4 py-4 bg-white dark:bg-slate-900 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold text-slate-800 dark:text-white outline-none shadow-sm transition-all appearance-none cursor-pointer"
                  >
                    <option>السنة الثانية بكالوريا</option>
                    <option>السنة الأولى بكالوريا</option>
                    <option>الجذع المشترك</option>
                    <option>الثالثة إعدادي</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest block pr-2">الشعبة / المسلك</label>
                <div className="relative">
                  <i className="fas fa-layer-group absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <select 
                    value={branch} 
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full pr-12 pl-4 py-4 bg-white dark:bg-slate-900 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold text-slate-800 dark:text-white outline-none shadow-sm transition-all appearance-none cursor-pointer"
                  >
                    <option>علوم فيزيائية</option>
                    <option>علوم الحياة والأرض</option>
                    <option>علوم رياضية</option>
                    <option>آداب وعلوم إنسانية</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end gap-3 pb-1">
                <button 
                  onClick={() => setRows([...rows, { id: Date.now().toString(), name: 'مادة إضافية', exam1: '', exam2: '', exam3: '', exam4: '', activities: '', coefficient: 1 }])}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
                >
                  <i className="fas fa-plus"></i> إضافة مادة
                </button>
                <button 
                  onClick={() => { if(confirm('هل أنت متأكد من مسح جميع المعطيات؟')) setRows(DEFAULT_SUBJECTS); }}
                  className="bg-white dark:bg-slate-800 text-red-500 border border-red-100 dark:border-red-900/30 px-6 py-4 rounded-2xl font-black text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-all active:scale-95"
                >
                  <i className="fas fa-trash-alt"></i> مسح الجدول
                </button>
              </div>
            </div>
          </div>

          {/* Professional Table Section */}
          <div className="p-4 md:p-8">
            <div className="overflow-x-auto rounded-[2rem] border border-gray-100 dark:border-slate-800 custom-scrollbar">
              <table className="w-full text-center min-w-[800px]">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-6 font-black text-sm uppercase tracking-wider text-right pr-10">المادة الدراسية</th>
                    <th className="p-6 font-black text-sm uppercase">فرض 1</th>
                    <th className="p-6 font-black text-sm uppercase">فرض 2</th>
                    <th className="p-6 font-black text-sm uppercase">فرض 3</th>
                    <th className="p-6 font-black text-sm uppercase">فرض 4</th>
                    <th className="p-6 font-black text-sm uppercase">الأنشطة</th>
                    <th className="p-6 font-black text-sm uppercase bg-amber-500 text-amber-950">المعامل</th>
                    <th className="p-6 font-black text-sm uppercase bg-blue-600">المعدل الدورى</th>
                    <th className="p-6 font-black text-sm uppercase"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {rows.map((row) => {
                    const avg = calculateRowAverage(row);
                    return (
                      <tr key={row.id} className="hover:bg-blue-50/20 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 text-right pr-10">
                          <input 
                            value={row.name}
                            onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                            className="bg-transparent font-black text-slate-700 dark:text-slate-200 outline-none w-full focus:text-blue-600"
                          />
                        </td>
                        {[1, 2, 3, 4].map(n => (
                          <td key={n} className="p-4">
                            <input 
                              type="number" step="0.25" placeholder="--"
                              value={row[`exam${n}` as keyof GradeRow] as string}
                              onChange={(e) => updateRow(row.id, `exam${n}` as keyof GradeRow, e.target.value)}
                              className="w-14 h-12 text-center bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl font-black text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
                            />
                          </td>
                        ))}
                        <td className="p-4">
                          <input 
                            type="number" step="0.25" placeholder="--"
                            value={row.activities}
                            onChange={(e) => updateRow(row.id, 'activities', e.target.value)}
                            className="w-14 h-12 text-center bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl font-black text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          />
                        </td>
                        <td className="p-4 bg-amber-500/5">
                          <input 
                            type="number"
                            value={row.coefficient}
                            onChange={(e) => updateRow(row.id, 'coefficient', parseInt(e.target.value) || 1)}
                            className="w-12 h-12 text-center bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800/50 rounded-xl font-black text-amber-700 dark:text-amber-400 outline-none shadow-sm"
                          />
                        </td>
                        <td className="p-4 bg-blue-50/30 dark:bg-blue-900/10">
                          <span className={`text-lg font-black ${avg !== null ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300'}`}>
                            {avg !== null ? avg.toFixed(2) : '-'}
                          </span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => setRows(rows.filter(r => r.id !== row.id))}
                            className="text-slate-300 hover:text-red-500 transition-colors p-2"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Boxes Section */}
          <div className="p-8 md:p-12 bg-gray-50/50 dark:bg-slate-800/50 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'عدد المواد المقررة', value: stats.count, icon: 'fa-book' },
              { label: 'مواد تم إدخال نقطها', value: stats.completed, icon: 'fa-check-double' },
              { label: 'أعلى نقطة محصل عليها', value: stats.max, icon: 'fa-award' },
              { label: 'أدنى نقطة محصل عليها', value: stats.min, icon: 'fa-chart-line' }
            ].map((s, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-5 group hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  <i className={`fas ${s.icon}`}></i>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-800 dark:text-white">{s.value}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Final Average Banner */}
          <div className="p-10 md:p-16 bg-white dark:bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-right">
              <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">المعدل العام التقديري</h2>
              <p className="text-slate-500 font-bold">يتم الحساب بناءً على النقط المدخلة والمعاملات الخاصة بكل مادة</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-[2rem] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center text-4xl shadow-inner">
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="text-right">
                <div className="flex items-baseline gap-2">
                   <span className="text-8xl font-black text-blue-600 dark:text-blue-400 drop-shadow-xl">{calculateTotalAverage()}</span>
                   <span className="text-2xl font-black text-slate-400">/ 20</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {[
            { title: 'طريقة الحساب المعتمدة', content: 'المعدل = مجموع (نقطة المادة × المعامل) ÷ مجموع المعاملات الإجمالي.', color: 'bg-blue-500', icon: 'fa-info' },
            { title: 'عتبة النجاح الدراسية', content: 'يعتبر الطالب ناجحاً إذا حصل على معدل عام يساوي أو يفوق 10/20.', color: 'bg-emerald-500', icon: 'fa-trophy' },
            { title: 'الأنشطة الصفية', content: 'تتضمن نقطة الأنشطة المشاركة، السلوك، والواجبات المنزلية والبحوث.', color: 'bg-amber-500', icon: 'fa-puzzle-piece' },
            { title: 'الحفاظ على المعطيات', content: 'يتم حفظ نقطك تلقائياً في متصفحك للعودة إليها في أي وقت لاحقاً.', color: 'bg-indigo-500', icon: 'fa-save' }
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all">
              <div className={`w-12 h-12 rounded-2xl ${card.color} text-white flex items-center justify-center text-xl mb-6 shadow-lg shadow-inherit/20`}>
                <i className={`fas ${card.icon}`}></i>
              </div>
              <h4 className="font-black text-slate-800 dark:text-white mb-3 text-lg">{card.title}</h4>
              <p className="text-sm text-slate-400 font-bold leading-relaxed">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
