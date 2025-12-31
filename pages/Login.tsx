
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../services/db';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t, setLanguage, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!t) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (db.checkAuth(email, password)) {
      localStorage.setItem('WATERBERRY_SESSION', 'true');
      navigate('/dashboard');
    } else {
      setError(t.loginError || 'Invalid Login');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="w-full max-w-[440px] bg-white dark:bg-surface-dark rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 dark:border-surface-highlight overflow-hidden z-10 animate-in">
        <div className="px-8 pt-12 pb-4 flex flex-col items-center">
          <div className="flex items-center gap-3 text-primary mb-8">
            <div className="size-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/40">
               <span className="material-symbols-outlined text-4xl text-white">water_drop</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{t.appName}</h2>
          </div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">{t.loginTitle}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-center text-sm">{t.loginSubtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6 px-10 py-10">
          {error && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded-xl text-xs font-bold text-center border border-red-500/20">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 px-1">{t.emailLabel}</label>
            <input 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-12 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-surface-highlight rounded-2xl px-5 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
              placeholder="example@gmail.com" 
              type="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 px-1">{t.passwordLabel}</label>
              <button type="button" className="text-[10px] font-black text-primary uppercase tracking-tighter hover:underline">{t.forgotPassword}</button>
            </div>
            <input 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-12 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-surface-highlight rounded-2xl px-5 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all outline-none" 
              placeholder="••••••••" 
              type="password"
            />
          </div>

          <button 
            type="submit" 
            className="mt-4 w-full h-14 bg-primary hover:bg-primary-dark text-white font-black rounded-2xl shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 text-lg"
          >
            {t.loginBtn}
          </button>
        </form>

        <div className="flex justify-center gap-6 mb-10">
           {(['he', 'en', 'ar'] as const).map(l => (
             <button 
              key={l}
              onClick={() => setLanguage(l)}
              className={`text-xs font-black uppercase tracking-widest ${language === l ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {l}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
