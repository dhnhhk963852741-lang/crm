
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const Analytics: React.FC = () => {
  const { t } = useLanguage();
  const data = [
    { name: 'Q1', revenue: 45000, leads: 240 },
    { name: 'Q2', revenue: 52000, leads: 310 },
    { name: 'Q3', revenue: 68000, leads: 420 },
    { name: 'Q4', revenue: 95000, leads: 600 },
  ];

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">{t.analytics}</h1>
          <p className="text-slate-500">Advanced reports and business intelligence.</p>
        </div>
        <button className="h-11 px-5 bg-white dark:bg-surface-dark border dark:border-border-dark rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
          <span className="material-symbols-outlined">download</span>
          {t.export}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border dark:border-border-dark">
          <h3 className="text-lg font-bold mb-6">Growth Projection</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#283039" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#137fec" fill="#137fec" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border dark:border-border-dark">
          <h3 className="text-lg font-bold mb-6">Lead Generation Efficiency</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#283039" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="leads" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Customer Acquisition Cost', value: '₪240', trend: '-12%', color: 'emerald' },
          { label: 'Churn Rate', value: '2.1%', trend: '+0.4%', color: 'red' },
          { label: 'Profit Margin', value: '38%', trend: '+5%', color: 'emerald' }
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border dark:border-border-dark">
            <p className="text-xs font-bold text-slate-500 uppercase">{s.label}</p>
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-2xl font-black">{s.value}</h3>
              <span className={`text-xs font-bold text-${s.color}-500`}>{s.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
