
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db';

const Employees: React.FC = () => {
  const { t } = useLanguage();
  const [employees, setEmployees] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', role: '', email: '' });

  useEffect(() => {
    setEmployees(db.getEmployees());
  }, []);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const added = db.addEmployee(newEmp);
    setEmployees([...employees, added]);
    setIsModalOpen(false);
    setNewEmp({ name: '', role: '', email: '' });
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">{t.employees}</h1>
          <p className="text-slate-500">Manage your Waterberry talent.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="h-12 px-6 bg-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
          <span className="material-symbols-outlined">person_add</span>
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {employees.map((emp, i) => (
          <div key={emp.id} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border dark:border-surface-highlight flex flex-col items-center text-center group hover:shadow-2xl hover:scale-[1.02] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-primary">more_vert</span>
            </div>
            <div className="size-24 rounded-full bg-slate-200 dark:bg-background-dark mb-6 ring-4 ring-primary/10 group-hover:ring-primary flex items-center justify-center transition-all overflow-hidden shadow-inner">
               <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-all">account_circle</span>
            </div>
            <h3 className="font-black text-xl text-slate-900 dark:text-white">{emp.name}</h3>
            <p className="text-xs text-primary font-black uppercase tracking-[0.2em] mb-4 mt-1">{emp.role}</p>
            <p className="text-sm text-slate-500 mb-8">{emp.email}</p>
            
            <div className="w-full pt-6 border-t dark:border-surface-highlight flex justify-between items-center px-4">
               <div className="text-left">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Perf.</p>
                 <p className="font-black text-emerald-500 text-lg">{emp.performance}</p>
               </div>
               <button className="h-10 px-5 bg-slate-100 dark:bg-background-dark text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all">Manage</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md">
           <form onSubmit={handleAddEmployee} className="bg-white dark:bg-surface-dark w-[450px] p-8 rounded-3xl shadow-2xl animate-in">
              <h2 className="text-2xl font-black mb-6">New Team Member</h2>
              <div className="space-y-4">
                 <input required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" placeholder="Full Name" value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} />
                 <input required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" placeholder="Role (e.g. Sales, Dev)" value={newEmp.role} onChange={e => setNewEmp({...newEmp, role: e.target.value})} />
                 <input required type="email" className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" placeholder="Work Email" value={newEmp.email} onChange={e => setNewEmp({...newEmp, email: e.target.value})} />
              </div>
              <div className="mt-8 flex gap-3">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 dark:bg-background-dark rounded-xl font-bold">{t.cancel}</button>
                 <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg">{t.save}</button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default Employees;
