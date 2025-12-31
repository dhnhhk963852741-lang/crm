
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db';

const Tasks: React.FC = () => {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    setTasks(db.getTasks());
  }, []);

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updated);
    db.setTasks(updated);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText) return;
    const newTask = { id: Date.now().toString(), text: newTaskText, completed: false, due: 'Today', priority: 'Medium' };
    const updated = [...tasks, newTask];
    setTasks(updated);
    db.setTasks(updated);
    setIsModalOpen(false);
    setNewTaskText('');
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">{t.tasks}</h1>
          <p className="text-slate-500">Organize your daily workflow.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="h-12 px-6 bg-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg">
          <span className="material-symbols-outlined">add_task</span>
          {t.addTask}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {tasks.map(task => (
            <div key={task.id} className={`p-4 bg-white dark:bg-surface-dark border dark:border-border-dark rounded-2xl flex items-center justify-between group transition-all animate-in fade-in ${task.completed ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-4">
                <button onClick={() => toggleTask(task.id)} className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-primary border-primary text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                  {task.completed && <span className="material-symbols-outlined text-sm font-bold">done</span>}
                </button>
                <div>
                  <p className={`font-bold ${task.completed ? 'line-through' : ''}`}>{task.text}</p>
                  <p className="text-xs text-slate-500">{task.due}</p>
                </div>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${task.priority === 'Urgent' || task.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                {task.priority}
              </span>
            </div>
          ))}
          {tasks.length === 0 && <p className="text-center p-10 text-slate-400">No tasks yet. Enjoy your day!</p>}
        </div>

        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border dark:border-border-dark flex flex-col gap-6">
          <h3 className="text-lg font-bold">Activity Log</h3>
          <div className="space-y-4">
             <div className="flex gap-4 border-r-2 border-primary pr-4">
               <span className="text-xs text-primary font-bold">12:30</span>
               <p className="text-sm">Added new lead from Facebook</p>
             </div>
             <div className="flex gap-4 border-r-2 border-slate-300 pr-4">
               <span className="text-xs text-slate-400 font-bold">10:00</span>
               <p className="text-sm">Meeting with Marketing team</p>
             </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-md">
           <form onSubmit={handleAdd} className="bg-white dark:bg-surface-dark w-[450px] p-8 rounded-3xl shadow-2xl animate-in zoom-in duration-200">
              <h2 className="text-2xl font-black mb-6">{t.addTask}</h2>
              <textarea required className="w-full bg-slate-50 dark:bg-background-dark border-none rounded-xl px-4 py-3 h-32" placeholder="What needs to be done?" value={newTaskText} onChange={e => setNewTaskText(e.target.value)} />
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

export default Tasks;
