import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, PlusCircle, ListTodo, Search, Menu, X, Loader2, BrainCircuit,
  Settings, Table as TableIcon, UserCheck, Scale, Compass, History as HistoryIcon,
  Lock, LogIn, LogOut, ShieldAlert, Eye, EyeOff, KeyRound, ShieldCheck, Layers, Circle, Square, Type
} from 'lucide-react';

// LOGO DA SÓ AÇO
const SoAcoLogo = ({ light = false, large = false }) => (
  <div className="flex items-center gap-2 select-none">
    <div className={`flex items-baseline font-black italic tracking-tighter ${large ? 'text-5xl' : 'text-2xl'}`}>
      <span className="text-[#FFB800]">SÓ</span>
      <span className={light ? "text-white ml-1" : "text-[#002855] ml-1"}>AÇO</span>
    </div>
    <div className={`${large ? 'w-4 h-4' : 'w-2 h-2'} rounded-full bg-[#FFB800] mt-2 animate-pulse`}></div>
  </div>
);

const App: React.FC = () => {
  // ESTADOS DE NAVEGAÇÃO E LOGIN
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [isSettingsUnlocked, setIsSettingsUnlocked] = useState(false);
  const [settingsUnlockInput, setSettingsUnlockInput] = useState('');

  // Senha padrão para testes conforme seu código original
  const MASTER_PASSWORD = '104210';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === MASTER_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleSettingsUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (settingsUnlockInput === MASTER_PASSWORD) {
      setIsSettingsUnlocked(true);
    } else {
      alert("Acesso Negado.");
    }
  };

  // TELA DE LOGIN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#001a35] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 relative z-10">
           <div className="flex flex-col items-center mb-10">
              <SoAcoLogo large />
              <div className="mt-6 flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                 <Lock className="w-3.5 h-3.5 text-[#002855]" />
                 <span className="text-[9px] font-black text-[#002855] uppercase tracking-widest">Acesso Industrial</span>
              </div>
           </div>
           <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Senha Individual</label>
                 <div className="relative">
                    <input 
                      type={showLoginPass ? "text" : "password"} 
                      value={loginPassword} 
                      onChange={e => setLoginPassword(e.target.value)} 
                      placeholder="DIGITE 104210 PARA TESTAR" 
                      className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 font-black text-[#002855] outline-none focus:border-[#FFB800]" 
                    />
                    <button type="button" onClick={() => setShowLoginPass(!showLoginPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300">
                      {showLoginPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                 </div>
              </div>
              <button type="submit" className="w-full py-6 bg-[#002855] text-[#FFB800] font-black uppercase text-xs rounded-2xl shadow-xl flex items-center justify-center gap-3 border-b-4 border-[#FFB800]">
                 <LogIn className="w-5 h-5" /> Entrar no Sistema
              </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden text-slate-900">
      {/* SIDEBAR */}
      <aside className={`bg-[#001a35] text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col shadow-2xl z-20`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          {isSidebarOpen && <SoAcoLogo light />}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-6 h-6 mx-auto" />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeTab === 'dashboard'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<ListTodo />} label="Ordens de Serviço" active={activeTab === 'orders'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('orders')} />
          <NavItem icon={<PlusCircle />} label="Nova OP Simples" active={activeTab === 'new-order'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('new-order')} />
          <NavItem icon={<Scale />} label="Cálculo de Peso" active={activeTab === 'weight-calc'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('weight-calc')} />
          <NavItem icon={<Settings />} label="Configurações" active={activeTab === 'settings'} collapsed={!isSidebarOpen} onClick={() => setActiveTab('settings')} />
        </nav>
        
        <button onClick={() => setIsLoggedIn(false)} className="m-4 p-3 rounded-xl bg-rose-500/10 text-rose-500 flex items-center gap-3 font-bold">
          <LogOut className="w-5 h-5" /> {isSidebarOpen && "Sair"}
        </button>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="font-black uppercase text-[#002855] italic tracking-tight">{activeTab}</h2>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <UserCheck className="w-4 h-4 text-[#002855]" />
            <span className="text-[11px] font-black text-[#002855] uppercase">OPERADOR MASTER</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          {/* RENDERIZAÇÃO CONDICIONAL DAS ABAS */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
            
            {activeTab === 'settings' && !isSettingsUnlocked ? (
              <form onSubmit={handleSettingsUnlock} className="max-w-xs w-full space-y-4">
                <KeyRound className="w-12 h-12 text-[#FFB800] mx-auto mb-4" />
                <h3 className="font-black uppercase">Área Restrita</h3>
                <input 
                  type="password" 
                  value={settingsUnlockInput}
                  onChange={e => setSettingsUnlockInput(e.target.value)}
                  placeholder="SENHA DE ACESSO"
                  className="w-full p-4 rounded-xl bg-slate-50 border-2 border-slate-100 text-center font-bold"
                />
                <button className="w-full p-4 bg-[#002855] text-[#FFB800] rounded-xl font-black uppercase text-xs">Liberar Painel</button>
              </form>
            ) : (
              <>
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 border border-[#FFB800]/30">
                  <Scale className="w-10 h-10 text-[#FFB800]" />
                </div>
                <h2 className="text-2xl font-black mb-2 uppercase text-[#002855]">Módulo {activeTab.toUpperCase()}</h2>
                <p className="text-slate-400 font-bold max-w-md">
                  A interface está pronta. Deseja que eu gere o formulário de cálculo ou a tabela de ordens para esta aba?
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// COMPONENTE DE ITEM DO MENU
interface NavItemProps { icon: React.ReactNode; label: string; active: boolean; collapsed: boolean; onClick: () => void; }
const NavItem: React.FC<NavItemProps> = ({ icon, label, active, collapsed, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all ${active ? 'bg-[#FFB800] text-[#001a35] font-black shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-[#001a35]'} ${collapsed ? 'justify-center' : ''}`}>
    <span className="w-6 h-6 flex-shrink-0">{icon}</span>
    {!collapsed && <span className="font-bold tracking-tight">{label}</span>}
  </button>
);

export default App;