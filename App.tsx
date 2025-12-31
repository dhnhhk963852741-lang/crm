import React, { useMemo, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Customers from './pages/Customers';
import CustomerProfile from './pages/CustomerProfile';
import Sales from './pages/Sales';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Marketing from './pages/Marketing';
import Support from './pages/Support';
import Employees from './pages/Employees';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const PageWrapper: React.FC<{ children: React.ReactNode; showSidebar?: boolean }> = ({ children, showSidebar = true }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = useMemo(() => localStorage.getItem('WATERBERRY_SESSION') === 'true', [location]);

  if (!t) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black animate-pulse tracking-tighter text-3xl">WATERBERRY...</div>;

  if (!isAuthenticated && location.pathname !== '/') {
    return <Navigate to="/" replace />;
  }
  
  const isLoginPage = location.pathname === '/';
  const dir = t.dir || 'rtl';
  
  if (isLoginPage) return <>{children}</>;

  return (
    <div className={`flex min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`fixed inset-y-0 z-[100] transition-transform duration-500 lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : (dir === 'rtl' ? 'translate-x-full' : '-translate-x-full')} lg:block`}>
         <Sidebar onClose={() => setMobileMenuOpen(false)} />
      </div>
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="fixed bottom-6 left-6 z-[80] size-14 bg-primary text-white rounded-full shadow-2xl lg:hidden flex items-center justify-center"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
      <Route path="/leads" element={<PageWrapper><Leads /></PageWrapper>} />
      <Route path="/customers" element={<PageWrapper><Customers /></PageWrapper>} />
      <Route path="/customer/:id" element={<PageWrapper><CustomerProfile /></PageWrapper>} />
      <Route path="/sales" element={<PageWrapper><Sales /></PageWrapper>} />
      <Route path="/tasks" element={<PageWrapper><Tasks /></PageWrapper>} />
      <Route path="/analytics" element={<PageWrapper><Analytics /></PageWrapper>} />
      <Route path="/marketing" element={<PageWrapper><Marketing /></PageWrapper>} />
      <Route path="/support" element={<PageWrapper><Support /></PageWrapper>} />
      <Route path="/employees" element={<PageWrapper><Employees /></PageWrapper>} />
      <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;