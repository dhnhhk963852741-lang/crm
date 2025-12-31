
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">{t.settings}</h1>
          <p className="text-slate-500">Configure your system and subscription.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-1">
          {[
            { label: t.profile, icon: 'business_center', active: true },
            { label: t.billing, icon: 'credit_card', active: false },
            { label: t.system, icon: 'settings_suggest', active: false },
            { label: 'Security', icon: 'security', active: false }
          ].map((m, i) => (
            <button key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${m.active ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-surface-highlight text-slate-500'}`}>
              <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border dark:border-border-dark">
             <h3 className="text-xl font-bold mb-6">{t.profile}</h3>
             <div className="grid grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-slate-500">Business Name</label>
                 <input className="bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" defaultValue="My Premium Business Ltd." />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-bold text-slate-500">Contact Email</label>
                 <input className="bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" defaultValue="ceo@business.com" />
               </div>
               <div className="flex flex-col gap-2 lg:col-span-2">
                 <label className="text-xs font-bold text-slate-500">Business Description</label>
                 <textarea className="bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3 h-24" defaultValue="Providing world-class services to our global clients." />
               </div>
             </div>
             <button className="mt-8 h-12 px-8 bg-primary text-white rounded-xl font-bold">Save Changes</button>
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-3xl text-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold">Subscription Plan</h3>
                <p className="text-slate-400 text-sm">Your business is on the Enterprise tier.</p>
              </div>
              <span className="bg-primary px-4 py-2 rounded-xl font-black uppercase text-xs">Active</span>
            </div>
            <div className="flex gap-12 mb-6">
              <div>
                <p className="text-xs text-slate-500 mb-1">Users</p>
                <p className="font-bold">Unlimited</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">AI Credits</p>
                <p className="font-bold">5,000 / Month</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Next Billing</p>
                <p className="font-bold">Dec 1, 2024</p>
              </div>
            </div>
            <button className="h-10 px-6 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all">Manage Billing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
