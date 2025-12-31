
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const isRtl = t.dir === 'rtl';
  
  const menuItems = [
    { name: t.dashboard, icon: 'grid_view', path: '/dashboard' },
    { name: t.customers, icon: 'group', path: '/customers' },
    { name: t.leads, icon: 'radar', path: '/leads' },
    { name: t.sales, icon: 'payments', path: '/sales' },
    { name: t.tasks, icon: 'calendar_today', path: '/tasks' },
    { name: t.analytics, icon: 'query_stats', path: '/analytics' },
    { name: t.marketing, icon: 'auto_awesome', path: '/marketing' },
    { name: t.support, icon: 'support_agent', path: '/support' },
    { name: t.employees, icon: 'manage_accounts', path: '/employees' },
    { name: t.settings, icon: 'settings', path: '/settings' },
  ];

  return (
    <aside className={`w-72 bg-white dark:bg-surface-dark border-slate-200 dark:border-slate-800 flex flex-col h-full ${isRtl ? 'border-l' : 'border-r'}`}>
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center gap-4 px-2 mb-12">
          <div className="bg-primary rounded-2xl p-2.5 text-white shadow-xl shadow-primary/40 rotate-12">
            <span className="material-symbols-outlined text-3xl">water_drop</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-2xl font-black tracking-tighter">{t.appName}</h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-0.5 opacity-60">Corporate</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/customers' && location.pathname.startsWith('/customer/'));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group relative ${
                  isActive
                    ? 'bg-primary text-white shadow-xl shadow-primary/25 font-bold'
                    : 'text-slate-400 hover:text-primary hover:bg-primary/5'
                }`}
              >
                <span className={`material-symbols-outlined text-[24px] transition-transform group-hover:scale-110 ${isActive ? 'fill-1' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                {isActive && (
                   <span className={`absolute w-1.5 h-6 bg-white rounded-full opacity-40 ${isRtl ? '-right-1' : '-left-1'}`}></span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 flex flex-col gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
           <div className="flex justify-around bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl">
            {(['he', 'en', 'ar'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                  language === lang 
                    ? 'bg-white dark:bg-surface-dark shadow-sm text-primary' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => { localStorage.removeItem('WATERBERRY_SESSION'); window.location.href='/#/'; }}
            className="flex items-center justify-center gap-3 h-14 w-full rounded-2xl text-red-500 font-black text-xs border border-red-500/10 hover:bg-red-500 hover:text-white transition-all uppercase tracking-[0.1em]"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            {t.logout}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
