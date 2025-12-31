
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const isRtl = t.dir === 'rtl';

  const revenueData = [
    { name: 'Jan', val: 45000 }, { name: 'Feb', val: 52000 }, { name: 'Mar', val: 48000 },
    { name: 'Apr', val: 61000 }, { name: 'May', val: 55000 }, { name: 'Jun', val: 72000 },
  ];

  return (
    <div className="flex flex-col gap-10 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{t.dashboard}</h1>
        <p className="text-slate-400 font-medium text-lg uppercase tracking-widest text-xs">{t.tagline}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: t.revenue, value: '₪125,400', trend: '+12.4%', icon: 'payments', color: 'indigo' },
           { label: t.newLeads, value: '84', trend: '+4.2%', icon: 'radar', color: 'blue' },
           { label: t.newCustomers, value: '26', trend: '+1.8%', icon: 'verified', color: 'emerald' },
           { label: t.openTasks, value: '14', trend: '-2.5%', icon: 'task_alt', color: 'amber' }
         ].map((stat, i) => (
           <div key={i} className="group bg-white dark:bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/50 transition-all card-hover">
             <div className="flex justify-between items-start mb-6">
                <div className={`size-12 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500 flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                </div>
                <span className={`text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'} bg-${stat.trend.startsWith('+') ? 'emerald' : 'red'}-500/10 px-2 py-1 rounded-lg`}>{stat.trend}</span>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
             <h3 className="text-3xl font-black mt-2 tracking-tighter text-slate-900 dark:text-white">{stat.value}</h3>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex justify-between items-center mb-10">
             <h3 className="text-xl font-black tracking-tight">{t.revenueTrend}</h3>
             <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
               {['W', 'M', 'Y'].map(t => <button key={t} className={`px-4 py-1 rounded-lg text-[10px] font-black ${t === 'M' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>)}
             </div>
           </div>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} orientation={isRtl ? 'right' : 'left'} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                  />
                  <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={4} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900/40 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-8">
           <h3 className="text-xl font-black tracking-tight">{t.todayTasks}</h3>
           <div className="space-y-4">
             {[
               { text: 'Call CEO of Microsoft', time: '14:30', prio: 'High' },
               { text: 'Finalize Wix proposal', time: '16:00', prio: 'Medium' },
               { text: 'Team sync', time: '17:30', prio: 'Low' }
             ].map((task, i) => (
               <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl flex items-center justify-between group cursor-pointer border border-transparent hover:border-primary/20 transition-all">
                  <div className="flex gap-4 items-center">
                    <div className={`size-2 rounded-full ${task.prio === 'High' ? 'bg-red-500' : task.prio === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                    <div>
                      <p className="text-sm font-bold group-hover:text-primary transition-colors">{task.text}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{task.time}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 transition-all">chevron_right</span>
               </div>
             ))}
           </div>
           <button className="mt-auto w-full h-14 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary hover:border-primary transition-all font-black text-xs uppercase tracking-widest">
             Manage All Tasks
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
