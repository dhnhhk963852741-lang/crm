
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db';

const Sales: React.FC = () => {
  const { t } = useLanguage();
  const [sales, setSales] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSale, setNewSale] = useState({ client: '', amount: '', status: 'Negotiation' });

  useEffect(() => {
    setSales(db.getSales());
  }, []);

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    const added = db.addSale(newSale);
    setSales([...sales, added]);
    setIsModalOpen(false);
    setNewSale({ client: '', amount: '', status: 'Negotiation' });
  };

  const chartData = [
    { name: 'Jan', sales: 12000 },
    { name: 'Feb', sales: 19000 },
    { name: 'Mar', sales: 15000 },
    { name: 'Apr', sales: 22000 },
  ];

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">{t.sales}</h1>
          <p className="text-slate-500">Track your Waterberry revenue streams.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="h-12 px-6 bg-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
          <span className="material-symbols-outlined">add_shopping_cart</span>
          {t.addSale}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border dark:border-surface-highlight shadow-sm">
          <h3 className="text-lg font-bold mb-6">Revenue Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', background: '#1e293b' }} />
                <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border dark:border-surface-highlight flex flex-col gap-6">
          <h3 className="text-lg font-bold">Performance Targets</h3>
          {[
            { label: 'Monthly Goal', current: '₪85k', target: '₪100k', progress: 85 },
            { label: 'Retention Target', current: '94%', target: '98%', progress: 96 },
            { label: 'Deal Size Avg', current: '₪12k', target: '₪15k', progress: 70 }
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-500">{item.label}</span>
                <span>{item.current} / {item.target}</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-background-dark rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{width: `${item.progress}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-3xl border dark:border-surface-highlight overflow-hidden shadow-sm">
        <div className="p-6 border-b dark:border-surface-highlight flex justify-between items-center bg-slate-50/50 dark:bg-background-dark/30">
          <h3 className="text-lg font-bold">Recent Deals</h3>
          <span className="text-xs text-slate-500 font-bold">{sales.length} Deals Total</span>
        </div>
        <div className="divide-y dark:divide-surface-highlight">
          {sales.map((deal, i) => (
            <div key={deal.id} className="p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-surface-highlight transition-colors">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">
                  {deal.client[0]}
                </div>
                <div>
                  <p className="font-bold">{deal.client}</p>
                  <p className="text-xs text-slate-500">{deal.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{deal.amount.includes('₪') ? deal.amount : `₪${deal.amount}`}</p>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg ${deal.status === 'Closed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  {deal.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md">
           <form onSubmit={handleAddSale} className="bg-white dark:bg-surface-dark w-[450px] p-8 rounded-3xl shadow-2xl animate-in">
              <h2 className="text-2xl font-black mb-6">{t.addSale}</h2>
              <div className="space-y-4">
                 <input required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" placeholder="Client Name" value={newSale.client} onChange={e => setNewSale({...newSale, client: e.target.value})} />
                 <input required type="number" className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" placeholder="Amount (₪)" value={newSale.amount} onChange={e => setNewSale({...newSale, amount: e.target.value})} />
                 <select className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" value={newSale.status} onChange={e => setNewSale({...newSale, status: e.target.value})}>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Invoiced">Invoiced</option>
                    <option value="Closed">Closed</option>
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

export default Sales;
