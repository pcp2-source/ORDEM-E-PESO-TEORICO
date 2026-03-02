import React, { useState } from 'react';
import { 
  LayoutDashboard, PlusCircle, ListTodo, Search, Menu, X, 
  Settings, Scale, LogOut, UserCheck, Lock, LogIn, Eye, EyeOff,
  Calculator, Table, Compass, History, Bell, Calendar, ChevronDown, 
  AlertCircle, CheckCircle2, Clock, PlayCircle
} from 'lucide-react';

// --- COMPONENTES DE ESTILO ---

const StatCard = ({ label, value, icon: Icon, color, bgColor }) => (
  <div className={`p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center min-w-[160px] shadow-sm ${bgColor}`}>
    <div className={`p-3 rounded-xl mb-3 ${color} bg-white shadow-inner`}>
      <Icon size={20} />
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h3 className={`text-4xl font-black ${color.replace('text-', 'text-')}`}>{value}</h3>
  </div>
);

// --- VISÃO DO DASHBOARD (IGUAL À SUA IMAGEM) ---

const DashboardView = () => (
  <div className="animate-in fade-in duration-500">
    <div className="flex items-center gap-4 mb-8">
      <div className="h-1 w-12 bg-[#FFB800] rounded-full"></div>
      <h2 className="text-3xl font-black text-[#002855] italic uppercase tracking-tighter">
        Monitoramento em Tempo Real
      </h2>
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-10 -mt-6">Linha de Produção SÓ AÇO</p>

    {/* Filtros Superiores */}
    <div className="flex gap-4 mb-10">
      <div className="bg-white px-6 py-2 rounded-full border border-slate-200 flex items-center gap-3 shadow-sm text-xs font-bold text-[#002855]">
        <Calendar size={14} /> MARÇO <ChevronDown size={14} />
      </div>
      <div className="bg-white px-6 py-2 rounded-full border border-slate-200 flex items-center gap-3 shadow-sm text-xs font-bold text-[#002855]">
        2026 <ChevronDown size={14} />
      </div>
      <div className="bg-white px-6 py-2 rounded-full border border-slate-200 flex items-center gap-3 shadow-sm text-xs font-bold text-[#002855]">
        <Settings size={14} /> SETOR <ChevronDown size={14} />
      </div>
    </div>

    {/* Cartões de Indicadores */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
      <StatCard label="Ordens Registradas" value="0" icon={Table} color="text-[#FFB800]" bgColor="bg-[#002855]" />
      <StatCard label="Em Produção" value="0" icon={PlayCircle} color="text-[#FFB800]" bgColor="bg-orange-50" />
      <StatCard label="Concluídas" value="0" icon={CheckCircle2} color="text-green-600" bgColor="bg-green-50" />
      <StatCard label="Urgentes" value="0" icon={AlertCircle} color="text-red-600" bgColor="bg-red-50" />
      <StatCard label="Atrasadas" value="0" icon={Clock} color="text-slate-400" bgColor="bg-slate-50" />
    </div>

    {/* Gráficos Placeholder */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[300px]">
        <div className="flex justify-between mb-6">
          <h4 className="font-black text-[#002855] italic flex items-center gap-2 uppercase text-sm">Mix de Produção</h4>
          <span className="text-[10px] font-bold text-slate-300 uppercase">Status Geral</span>
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[300px]">
        <div className="flex justify-between mb-6">
          <h4 className="font-black text-[#002855] italic flex items-center gap-2 uppercase text-sm">Demanda por Prioridade</h4>
          <span className="text-[10px] font-bold text-slate-300 uppercase">Carga Máxima</span>
        </div>
      </div>
    </div>
  </div>
);

// --- APLICAÇÃO PRINCIPAL ---

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pass, setPass] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#001a35] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl text-center border-t-8 border-[#FFB800]">
          <div className="text-4xl font-black italic tracking-tighter text-[#002855] mb-8">
            SÓ<span className="text-[#FFB800]">AÇO</span>
            <div className="w-2 h-2 bg-[#FFB800] rounded-full inline-block ml-1 animate-pulse"></div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Acesso Restrito ao Sistema PCP</p>
          <input 
            type="password" 
            placeholder="SENHA DE ACESSO" 
            className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl mb-4 text-center font-black outline-none focus:border-[#FFB800]"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
          <button 
            onClick={() => pass === '104210' && setIsLoggedIn(true)}
            className="w-full py-5 bg-[#002855] text-[#FFB800] font-black uppercase rounded-2xl shadow-xl hover:scale-[1.02] transition-transform"
          >
            Entrar no Sistema
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-slate-900 font-sans">
      {/* Sidebar - Visual SÓ AÇO */}
      <aside className="w-72 bg-[#001a35] text-white flex flex-col p-8 shadow-2xl z-20">
        <div className="text-3xl font-black italic tracking-tighter mb-12 flex items-center justify-between">
          <div>SÓ<span className="text-[#FFB800]">AÇO</span><span className="text-[#FFB800] text-4xl">.</span></div>
          <X className="text-slate-500 cursor-pointer" size={20} />
        </div>
        
        <nav className="flex-1 space-y-3">
          <MenuButton icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <MenuButton icon={ListTodo} label="Ordens de Serviço" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <MenuButton icon={PlusCircle} label="Nova OP Simples" active={activeTab === 'new-order'} onClick={() => setActiveTab('new-order')} />
          <MenuButton icon={Table} label="Detalhamento" active={activeTab === 'detail'} onClick={() => setActiveTab('detail')} />
          <MenuButton icon={Scale} label="Cálculo de Peso" active={activeTab === 'weight'} onClick={() => setActiveTab('weight')} />
          <MenuButton icon={Compass} label="Cadastro ENG" active={activeTab === 'eng'} onClick={() => setActiveTab('eng')} />
          <MenuButton icon={History} label="Histórico Carga" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
        </nav>

        <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-3 p-4 text-rose-400 font-black uppercase text-[10px] tracking-widest bg-rose-500/10 rounded-2xl">
          <LogOut size={16} /> Sair do Sistema
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar por ID, Cliente, Produto ou Notas..." 
              className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#FFB800]/20"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#002855]">
                <UserCheck size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">Sessão Ativa</span>
                <span className="text-[11px] font-black text-[#002855] uppercase">GABRIEL</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-[#002855] uppercase tracking-tighter">Unidade SÓ AÇO</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Administrador</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#002855] border-2 border-[#FFB800] flex items-center justify-center text-white font-black">GA</div>
          </div>
        </header>

        {activeTab === 'dashboard' ? <DashboardView /> : (
          <div className="bg-white p-20 rounded-[3rem] border border-slate-100 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Settings className="text-slate-200 animate-spin-slow" size={40} />
            </div>
            <h3 className="text-[#002855] font-black uppercase italic text-xl">Módulo em Manutenção</h3>
            <p className="text-slate-400 font-bold text-sm mt-2">A interface da aba {activeTab} está sendo otimizada.</p>
          </div>
        )}
      </main>
    </div>
  );
};

const MenuButton = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
      active ? 'bg-[#FFB800] text-[#002855] shadow-lg shadow-[#FFB800]/20 scale-[1.02]' : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={18} /> {label}
  </button>
);

export default App;