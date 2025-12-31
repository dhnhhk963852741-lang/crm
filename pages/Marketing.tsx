
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { performMarketIntel } from '../services/ai';

const Marketing: React.FC = () => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [intel, setIntel] = useState<{ text: string, sources: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIntel = async () => {
    if (!query) return;
    setLoading(true);
    const result = await performMarketIntel(query, language);
    setIntel(result);
    setLoading(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">{t.marketing}</h1>
          <p className="text-slate-500">Run campaigns and analyze market trends.</p>
        </div>
      </div>

      {/* AI Market Intel Section */}
      <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 p-8 rounded-3xl border border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.marketIntel}</h2>
            <p className="text-sm text-slate-500">Research competitors and industry trends with real-time web search.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-white dark:bg-surface-dark border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary shadow-sm"
            placeholder="Search market trends for real estate in Tel Aviv..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button 
            onClick={handleIntel}
            disabled={loading}
            className="h-12 px-6 bg-primary text-white rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Research'}
          </button>
        </div>

        {intel && (
          <div className="mt-8 p-6 bg-white dark:bg-surface-dark rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
            <h4 className="font-bold mb-4 text-primary">Strategic Analysis</h4>
            <div className="text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
              {intel.text}
            </div>
            {intel.sources.length > 0 && (
              <div className="mt-6 pt-4 border-t dark:border-border-dark">
                <p className="text-xs font-bold text-slate-500 mb-2">Sources:</p>
                <div className="flex flex-wrap gap-2">
                  {intel.sources.map((src, i) => (
                    <a key={i} href={src} target="_blank" className="text-[10px] bg-slate-100 dark:bg-background-dark px-2 py-1 rounded hover:text-primary transition-colors truncate max-w-[200px]">
                      {src}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border dark:border-border-dark">
          <h3 className="text-lg font-bold mb-4">Active Campaigns</h3>
          <div className="space-y-4">
            {[
              { name: 'Black Friday Sale', reach: '45,200', conversion: '3.2%', spend: '₪2,400' },
              { name: 'Newsletter Weekly', reach: '12,000', conversion: '1.5%', spend: '₪0' },
              { name: 'FB Retargeting', reach: '8,400', conversion: '5.8%', spend: '₪1,200' }
            ].map((c, i) => (
              <div key={i} className="p-4 bg-slate-50 dark:bg-background-dark/50 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold">{c.name}</p>
                  <p className="text-xs text-slate-500">Reach: {c.reach}</p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-bold">{c.conversion}</p>
                  <p className="text-[10px] text-slate-400">{c.spend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border dark:border-border-dark">
          <h3 className="text-lg font-bold mb-4">Email Performance</h3>
          <div className="flex items-center justify-center h-48">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-primary">28%</span>
              <p className="text-slate-500 font-bold">Open Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
