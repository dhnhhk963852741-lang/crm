
import React, { useState, useCallback, useEffect } from 'react';
import { Lead, LeadStatus } from '../types';
import { generateLeadInsights } from '../services/ai';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db';

const Leads: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [aiInsight, setAiInsight] = useState<{insight: string, nextStep: string} | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');

  // New Lead Form State
  const [newLead, setNewLead] = useState({ name: '', company: '', email: '', status: LeadStatus.NEW, source: 'Manual' });

  useEffect(() => {
    setLeads(db.getLeads());
  }, []);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const added = db.addLead(newLead as any);
    setLeads([...leads, added]);
    setIsModalOpen(false);
    setNewLead({ name: '', company: '', email: '', status: LeadStatus.NEW, source: 'Manual' });
  };

  const handleGetInsights = useCallback(async (lead: Lead) => {
    setIsAiLoading(true);
    setSelectedLead(lead);
    const langName = language === 'he' ? 'Hebrew' : language === 'ar' ? 'Arabic' : 'English';
    const result = await generateLeadInsights(lead.name, lead.status, `Lead info: ${lead.company}. Language: ${langName}.`);
    setAiInsight(result);
    setIsAiLoading(false);
  }, [language]);

  const filteredLeads = leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Company,Status,Date", ...leads.map(l => `${l.name},${l.company},${l.status},${l.createdAt}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "crm_leads.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">{t.leads}</h1>
          <p className="text-slate-500 mt-1">{t.tagline}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="h-11 px-5 bg-white dark:bg-surface-dark border dark:border-border-dark rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined">download</span>
            {t.export}
          </button>
          <button onClick={() => setIsModalOpen(true)} className="h-11 px-5 bg-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
            <span className="material-symbols-outlined">add</span>
            {t.addLead}
          </button>
        </div>
      </div>

      <div className="flex gap-2 bg-slate-100 dark:bg-surface-dark p-1 rounded-xl w-fit">
        <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-white dark:bg-background-dark shadow-sm text-primary' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined text-[18px]">list</span>
          List
        </button>
        <button onClick={() => setViewMode('board')} className={`px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'board' ? 'bg-white dark:bg-background-dark shadow-sm text-primary' : 'text-slate-500'}`}>
          <span className="material-symbols-outlined text-[18px]">view_kanban</span>
          Board
        </button>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-border-dark shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="p-4 border-b dark:border-border-dark">
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full bg-slate-50 dark:bg-background-dark rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary`}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-slate-50 dark:bg-background-dark/50 text-slate-500 font-bold border-b dark:border-border-dark">
                <tr>
                  <th className="px-6 py-4">{t.name}</th>
                  <th className="px-6 py-4">{t.company}</th>
                  <th className="px-6 py-4">{t.status}</th>
                  <th className="px-6 py-4">{t.date}</th>
                  <th className="px-6 py-4 text-center">{t.aiInsights}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-surface-highlight transition-colors">
                    <td className="px-6 py-4 font-bold">{lead.name}</td>
                    <td className="px-6 py-4 text-slate-500">{lead.company}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">{lead.status}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{lead.createdAt}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleGetInsights(lead)} className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                        <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                   <tr><td colSpan={5} className="p-10 text-center text-slate-400 font-bold">No leads found. Add your first lead to start!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in slide-in-from-bottom-4 duration-500">
           {Object.values(LeadStatus).map(status => (
             <div key={status} className="bg-slate-50 dark:bg-background-dark/30 p-4 rounded-2xl border-t-4 border-primary/20">
                <h3 className="font-black text-sm uppercase text-slate-400 mb-4 flex justify-between">
                  {status}
                  <span className="bg-slate-200 dark:bg-surface-dark px-2 rounded-lg text-primary">{leads.filter(l => l.status === status).length}</span>
                </h3>
                <div className="space-y-3">
                   {leads.filter(l => l.status === status).map(l => (
                     <div key={l.id} className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-transparent hover:border-primary transition-all cursor-grab active:cursor-grabbing">
                        <p className="font-bold">{l.name}</p>
                        <p className="text-xs text-slate-500">{l.company}</p>
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>
      )}

      {/* Add Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md">
           <form onSubmit={handleAddLead} className="bg-white dark:bg-surface-dark w-[450px] p-8 rounded-3xl shadow-2xl animate-in zoom-in duration-200">
              <h2 className="text-2xl font-black mb-6">{t.formTitleLead}</h2>
              <div className="space-y-4">
                 <input required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" placeholder={t.name} value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} />
                 <input required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" placeholder={t.company} value={newLead.company} onChange={e => setNewLead({...newLead, company: e.target.value})} />
                 <input type="email" required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" placeholder={t.email} value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} />
                 <select className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3" value={newLead.status} onChange={e => setNewLead({...newLead, status: e.target.value as LeadStatus})}>
                    {Object.values(LeadStatus).map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
              </div>
              <div className="mt-8 flex gap-3">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 dark:bg-background-dark rounded-xl font-bold">{t.cancel}</button>
                 <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30">{t.save}</button>
              </div>
           </form>
        </div>
      )}

      {/* AI Side Panel (Same as before but with better loading) */}
      {selectedLead && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setSelectedLead(null)}>
          <div className={`w-[400px] h-full bg-white dark:bg-surface-dark shadow-2xl p-8 animate-in ${t.dir === 'rtl' ? 'slide-in-from-left' : 'slide-in-from-right'} duration-300`} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-black">{t.aiInsights}</h2>
               <button onClick={() => setSelectedLead(null)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-surface-highlight">
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>
            {isAiLoading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4 animate-pulse">
                <div className="size-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-primary">Gemini AI is analyzing...</p>
              </div>
            ) : aiInsight && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                   <h4 className="text-sm font-black text-primary mb-2">Insight</h4>
                   <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{aiInsight.insight}</p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                   <h4 className="text-sm font-black text-emerald-500 mb-2">Next Step</h4>
                   <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{aiInsight.nextStep}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
