
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db';

const CustomerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>(null);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (id) {
      const data = db.getCustomerById(id);
      if (data) setCustomer(data);
      else navigate('/customers');
    }
  }, [id, navigate]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !id) return;
    const note = db.addCustomerNote(id, newNote);
    setCustomer({ ...customer, notes: [...(customer.notes || []), note] });
    setNewNote('');
  };

  if (!customer) return null;

  return (
    <div className="max-w-6xl mx-auto animate-in space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/customers')}
          className="size-12 rounded-2xl bg-white dark:bg-surface-dark border dark:border-surface-highlight flex items-center justify-center hover:bg-slate-50 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black tracking-tighter">{customer.name}</h1>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-xl uppercase tracking-widest">{customer.status}</span>
          </div>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">{customer.company}</p>
        </div>
        <div className="flex gap-3">
          <button className="h-11 px-5 bg-white dark:bg-surface-dark border dark:border-surface-highlight rounded-xl font-bold text-sm">ערוך לקוח</button>
          <button className="h-11 px-5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20">עסקה חדשה</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Tags */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border dark:border-surface-highlight shadow-sm">
            <h3 className="text-lg font-black mb-6 border-b dark:border-surface-highlight pb-4">{t.personalInfo}</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.email}</p>
                <p className="font-bold text-slate-900 dark:text-white">{customer.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.phone}</p>
                <p className="font-bold text-slate-900 dark:text-white">{customer.phone}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.tags}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {customer.tags?.map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-background-dark text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-tighter">#{tag}</span>
                  ))}
                  <button className="size-6 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 p-8 rounded-[2.5rem] border border-primary/10">
            <h3 className="text-lg font-black mb-4">סיכום פעילות</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-bold text-slate-500">סה"כ עסקאות</span>
                <span className="font-black">₪24,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-bold text-slate-500">זמן כלקוח</span>
                <span className="font-black">1.4 שנים</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Notes */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border dark:border-surface-highlight shadow-sm">
            <h3 className="text-lg font-black mb-6">{t.customerNotes}</h3>
            <form onSubmit={handleAddNote} className="mb-8">
              <textarea 
                className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-2xl px-5 py-4 font-medium h-24 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="כתוב משהו על הלקוח..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
              />
              <div className="flex justify-end mt-3">
                <button type="submit" className="px-6 py-2 bg-primary text-white font-black rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                  {t.addNote}
                </button>
              </div>
            </form>

            <div className="space-y-6">
              {customer.notes?.slice().reverse().map((note: any) => (
                <div key={note.id} className="p-5 bg-slate-50 dark:bg-background-dark/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-black text-primary uppercase tracking-widest">{note.date}</span>
                     <button className="text-slate-300 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                   </div>
                   <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{note.text}</p>
                </div>
              ))}
              {(!customer.notes || customer.notes.length === 0) && (
                <div className="text-center py-10">
                   <span className="material-symbols-outlined text-slate-200 text-5xl">sticky_note_2</span>
                   <p className="text-slate-400 font-bold mt-2">אין הערות עדיין.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark p-8 rounded-[2.5rem] border dark:border-surface-highlight shadow-sm">
             <h3 className="text-lg font-black mb-6">{t.history}</h3>
             <div className="space-y-8 relative">
                <div className="absolute top-0 bottom-0 right-[15px] w-0.5 bg-slate-100 dark:bg-background-dark"></div>
                {[
                  { title: 'עסקה נסגרה', desc: 'Acme Pro License', date: 'היום, 14:00', icon: 'check_circle', color: 'emerald' },
                  { title: 'שיחת פולו-אפ', desc: 'בוצעה ע"י ישראל ישראלי', date: 'אתמול, 10:30', icon: 'call', color: 'blue' },
                  { title: 'לקוח נוצר', desc: 'ייבוא מקובץ CSV', date: '01/01/2024', icon: 'person_add', color: 'slate' }
                ].map((item, i) => (
                  <div key={i} className="relative pr-12">
                    <div className={`absolute right-0 top-0 size-8 rounded-full bg-${item.color}-500/10 text-${item.color}-500 flex items-center justify-center z-10 border-4 border-white dark:border-surface-dark`}>
                      <span className="material-symbols-outlined text-sm font-bold">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-black text-slate-900 dark:text-white leading-none">{item.title}</p>
                      <p className="text-sm text-slate-500 font-medium mt-1">{item.desc}</p>
                      <p className="text-[10px] font-black text-slate-300 uppercase mt-2 tracking-widest">{item.date}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
