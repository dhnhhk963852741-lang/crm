
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="sticky top-0 z-[40] flex h-20 w-full items-center justify-between px-8 glass border-b border-slate-200 dark:border-slate-800">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative group max-w-md w-full">
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            className="w-full h-11 bg-slate-100 dark:bg-slate-900/50 border-none rounded-2xl pr-12 pl-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="h-11 w-11 rounded-2xl bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
          <span className="material-symbols-outlined text-[20px]">calendar_month</span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-11 w-11 rounded-2xl bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all relative"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute left-0 mt-4 w-80 bg-white dark:bg-surface-dark rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 animate-in">
              <div className="flex justify-between items-center mb-4 px-2">
                <h4 className="font-black text-sm">Notifications</h4>
                <button className="text-[10px] font-black text-primary uppercase">Mark all read</button>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-3">
                  <div className="size-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">payments</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold">New Sale! ₪4,200 from Wix</p>
                    <p className="text-[10px] text-slate-400">2 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-sm font-black text-slate-900 dark:text-white leading-none">{t.user}</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.admin}</span>
          </div>
          <div className="size-11 rounded-2xl bg-primary text-white flex items-center justify-center font-black shadow-lg shadow-primary/30">
            M
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
