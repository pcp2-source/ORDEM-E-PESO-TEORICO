import React, { useState } from 'react';
import { 
  LayoutDashboard, PlusCircle, ListTodo, Search, Menu, X, 
  Settings, Scale, LogOut, UserCheck, Lock, LogIn, Eye, EyeOff,
  Calculator, Layers, Circle, Square
} from 'lucide-react';

// --- COMPONENTES INTERNOS (Para evitar erros de arquivo faltando) ---

const DashboardLocal = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Ordens Ativas</p>
      <h3 className="text-3xl font-black text-[#002855]">12</h3>
    </div>
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Produzido hoje</p>
      <h3 className="text-3xl font-black text-green-600">450kg</h3>
    </div>
    <div className="bg-[#002855] p-6 rounded-3xl shadow-sm border border-[#FFB800]/20">
      <p className="text-[#FFB800] text-[10px] font-black uppercase tracking-widest">Eficiência</p>
      <h3 className="text-3xl font-black text-white">98%</h3>
    </div>
  </div>
);

const WeightCalcLocal = () => {
  const [espessura, setEspessura] = useState('');
  const [largura, setLargura] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    const peso = parseFloat(espessura) * (parseFloat(largura)/1000) * (parseFloat(comprimento)/1000) * 7.85;
    setResultado(peso);
  };

  return (
    <div className="max-w-2xl bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
      <h2 className="text-xl font-black text-[#002855] uppercase italic mb-6 flex items-center gap-2">
        <Scale className="text-[#FFB800]" /> Calculadora de Chapas
      </h2>
      <div className="space-y-4">
        <input type="number" placeholder="Espessura (mm)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#FFB800]" value={espessura} onChange={e => setEspessura(e.target.value)} />
        <input type="number" placeholder="Largura (mm)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#FFB800]" value={largura} onChange={e => setLargura(e.target.value)} />
        <input type="number" placeholder="Comprimento (mm)" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#FFB800]" value={comprimento} onChange={e => setComprimento(e.target.value)} />
        <button onClick={calcular} className="w-full py-4 bg-[#002855] text-[#FFB800] font-black uppercase rounded-2xl hover:bg-[#001a35]">Calcular Peso</button>
        {resultado !== null && (
          <div className="mt-6 p-6 bg-slate-900 rounded-2xl text-center">
            <p className="text-[#FFB800] text-xs font-black uppercase">Peso Teórico</p>
            <p className="text-3xl font-black text-white">{resultado.toFixed(2)} KG</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- APLICAÇÃO PRINCIPAL ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pass, setPass] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#001a35] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <div className="text-3xl font-black italic tracking-tighter text-[#002855]">
              SÓ<span className="text-[#FFB800]">AÇO</span>
            </div>
          </div>
          <input 
            type="password" 
            placeholder="SENHA (104210)" 
            className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl mb-4 text-center font-black"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
          <button 
            onClick={() => pass === '104210' && setIsLoggedIn(true)}
            className="w-full py-5 bg-[#002855] text-[#FFB800] font-black uppercase rounded-2xl"
          >
            Entrar no Sistema
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Menu Lateral */}
      <aside className="w-64 bg-[#001a35] text-white flex flex-col p-6">
        <div className="text-2xl font-black italic tracking-tighter mb-10">
          SÓ<span className="text-[#FFB800]">AÇO</span>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold ${activeTab === 'dashboard' ? 'bg-[#FFB800] text-[#002855]' : 'text-slate-400'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('weight-calc')} className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold ${activeTab === 'weight-calc' ? 'bg-[#FFB800] text-[#002855]' : 'text-slate-400'}`}>
            <Scale size={20} /> Cálculo de Peso
          </button>
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold ${activeTab === 'orders' ? 'bg-[#FFB800] text-[#002855]' : 'text-slate-400'}`}>
            <ListTodo size={20} /> Ordens
          </button>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 p-4 text-rose-500 font-bold">
          <LogOut size={20} /> Sair
        </button>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-[#002855] uppercase italic">{activeTab}</h1>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <UserCheck size={16} className="text-[#002855]" />
            <span className="text-xs font-black text-[#002855]">OPERADOR MASTER</span>
          </div>
        </header>

        {activeTab === 'dashboard' && <DashboardLocal />}
        {activeTab === 'weight-calc' && <WeightCalcLocal />}
        {activeTab === 'orders' && (
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 text-center">
            <p className="text-slate-400 font-bold">Lista de Ordens em desenvolvimento...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;