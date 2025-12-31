
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db';

const Customers: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCust, setNewCust] = useState({ name: '', company: '', email: '', phone: '', status: 'Active' });

  useEffect(() => {
    setCustomers(db.getCustomers());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const added = db.addCustomer(newCust);
    setCustomers([...customers, added]);
    setIsModalOpen(false);
    setNewCust({ name: '', company: '', email: '', phone: '', status: 'Active' });
  };

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8 animate-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{t.customers}</h1>
          <p className="text-slate-500 font-medium mt-1">{t.tagline}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="h-12 px-6 bg-primary text-white rounded-2xl font-black flex items-center gap-2 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">person_add</span>
          {t.addCustomer}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'סה"כ לקוחות', value: customers.length, icon: 'groups', color: 'blue' },
          { label: 'שימור לקוחות', value: '94%', icon: 'verified', color: 'emerald' },
          { label: 'שווי ממוצע', value: '₪8,400', icon: 'payments', color: 'amber' }
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-[2rem] border dark:border-surface-highlight shadow-sm">
            <span className={`material-symbols-outlined text-${s.color}-500 text-3xl mb-4`}>{s.icon}</span>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <h3 className="text-3xl font-black mt-1">{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] border dark:border-surface-highlight shadow-xl overflow-hidden">
        <div className="p-6 border-b dark:border-surface-highlight flex items-center gap-4 bg-slate-50/50 dark:bg-background-dark/30">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input 
            className="flex-1 bg-transparent border-none p-0 outline-none text-lg font-bold placeholder:text-slate-300"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead className="bg-slate-50/50 dark:bg-background-dark/50 text-slate-400 text-xs font-black uppercase tracking-widest border-b dark:border-surface-highlight">
              <tr>
                <th className="px-8 py-5 text-start">{t.name}</th>
                <th className="px-8 py-5 text-start">{t.company}</th>
                <th className="px-8 py-5 text-start">{t.phone}</th>
                <th className="px-8 py-5 text-start">{t.status}</th>
                <th className="px-8 py-5 text-center">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-surface-highlight">
              {filtered.map(c => (
                <tr 
                  key={c.id} 
                  className="hover:bg-slate-50 dark:hover:bg-surface-highlight/50 transition-all cursor-pointer group"
                  onClick={() => navigate(`/customer/${c.id}`)}
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                        {c.name[0]}
                      </div>
                      <span className="font-black text-slate-900 dark:text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-500 font-bold">{c.company}</td>
                  <td className="px-8 py-5 text-slate-400 font-medium">{c.phone || '-'}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${c.status === 'Active' || c.status === 'Premium' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-200 dark:bg-background-dark text-slate-500'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="h-9 px-4 bg-primary/10 text-primary rounded-xl text-xs font-black hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100">
                      {t.viewProfile}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
           <form onSubmit={handleAdd} className="bg-white dark:bg-surface-dark w-full max-w-[500px] p-10 rounded-[3rem] shadow-2xl animate-in zoom-in">
              <h2 className="text-3xl font-black mb-8 tracking-tighter">{t.formTitleCustomer}</h2>
              <div className="space-y-5">
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">{t.name}</label>
                    <input required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-2xl px-5 py-4 font-bold" value={newCust.name} onChange={e => setNewCust({...newCust, name: e.target.value})} />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">{t.company}</label>
                    <input required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-2xl px-5 py-4 font-bold" value={newCust.company} onChange={e => setNewCust({...newCust, company: e.target.value})} />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">{t.phone}</label>
                    <input required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-2xl px-5 py-4 font-bold" value={newCust.phone} onChange={e => setNewCust({...newCust, phone: e.target.value})} />
                 </div>
              </div>
              <div className="mt-10 flex gap-4">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 dark:bg-background-dark rounded-2xl font-black uppercase text-xs tracking-widest">{t.cancel}</button>
                 <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/30">{t.save}</button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default Customers;
