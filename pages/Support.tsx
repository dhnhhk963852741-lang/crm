
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db';

const Support: React.FC = () => {
  const { t } = useLanguage();
  const [tickets, setTickets] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTk, setNewTk] = useState({ user: '', issue: '', priority: 'Medium' });

  useEffect(() => {
    setTickets(db.getTickets());
  }, []);

  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const added = db.addTicket({ ...newTk, status: 'New' });
    setTickets([...tickets, added]);
    setIsModalOpen(false);
    setNewTk({ user: '', issue: '', priority: 'Medium' });
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">{t.support}</h1>
          <p className="text-slate-500">Manage customer tickets and helpdesk.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="h-12 px-6 bg-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
          <span className="material-symbols-outlined">contact_support</span>
          Open Ticket
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Open Tickets', value: tickets.length, color: 'indigo' },
          { label: 'Avg Time', value: '42m', color: 'blue' },
          { label: 'Satisfaction', value: '4.9', color: 'emerald' },
          { label: 'Escalated', value: '1', color: 'red' }
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-3xl border dark:border-surface-highlight shadow-sm">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{s.label}</p>
            <h3 className="text-3xl font-black mt-2 text-primary">{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-3xl border dark:border-surface-highlight overflow-hidden shadow-sm">
        <div className="p-6 border-b dark:border-surface-highlight bg-slate-50/50 dark:bg-background-dark/30 flex justify-between items-center">
           <h3 className="font-bold">Active Helpdesk Queue</h3>
           <div className="flex items-center gap-2">
             <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-xs font-bold text-emerald-500 uppercase tracking-tighter">Support Online</span>
           </div>
        </div>
        <div className="divide-y dark:divide-surface-highlight">
          {tickets.map((tk, i) => (
            <div key={tk.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-surface-highlight transition-all group">
              <div className="flex gap-5">
                <div className="text-primary font-mono text-sm font-bold bg-primary/10 px-2 py-1 rounded-lg">{tk.id}</div>
                <div>
                  <p className="font-bold text-lg">{tk.user}</p>
                  <p className="text-sm text-slate-500">{tk.issue}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${tk.priority === 'Urgent' || tk.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-slate-100 dark:bg-background-dark text-slate-500'}`}>
                  {tk.priority}
                </span>
                <button className="px-5 py-2 bg-primary text-white text-xs font-black rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-primary/30">REPLY</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md">
           <form onSubmit={handleAddTicket} className="bg-white dark:bg-surface-dark w-[450px] p-8 rounded-3xl shadow-2xl animate-in">
              <h2 className="text-2xl font-black mb-6">Create New Ticket</h2>
              <div className="space-y-4">
                 <input required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" placeholder="Customer Name" value={newTk.user} onChange={e => setNewTk({...newTk, user: e.target.value})} />
                 <textarea required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3 h-24" placeholder="Describe the issue..." value={newTk.issue} onChange={e => setNewTk({...newTk, issue: e.target.value})} />
                 <select className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" value={newTk.priority} onChange={e => setNewTk({...newTk, priority: e.target.value})}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                 </select>
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

export default Support;
