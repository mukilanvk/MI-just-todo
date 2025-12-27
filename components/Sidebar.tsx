
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Home, LayoutDashboard, BarChart2, Users, Settings, PlusCircle } from 'lucide-react';

interface SidebarProps {
  onCreateNew?: () => void;
  activeItem?: string;
  onNavigate?: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreateNew, activeItem = 'Boards', onNavigate }) => {
  const getIcon = (label: string) => {
    switch (label) {
      case 'Home': return <Home size={20} />;
      case 'Boards': return <LayoutDashboard size={20} />;
      case 'Analytics': return <BarChart2 size={20} />;
      case 'Team': return <Users size={20} />;
      case 'Settings': return <Settings size={20} />;
      default: return <LayoutDashboard size={20} />;
    }
  };

  return (
    <aside className="relative z-50 w-64 shrink-0 hidden md:flex flex-col border-r border-slate-200 glass-panel bg-white/80">
      <div className="flex flex-col h-full p-6 justify-between">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 items-center px-2 cursor-pointer" onClick={() => onNavigate?.('Home')}>
            <div className="size-11 flex items-center justify-center bg-gradient-to-br from-primary to-indigo-600 rounded-2xl shadow-xl shadow-primary/20 text-white">
              <LayoutDashboard size={24} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 text-lg font-black leading-tight tracking-tight">ProTasker</h1>
              <p className="text-primary text-[10px] font-black uppercase tracking-widest leading-none mt-1">Workspace</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate?.(item.label)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group border ${
                  activeItem === item.label 
                    ? 'bg-primary/10 text-primary border-primary/10 font-black' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-transparent font-bold'
                }`}
              >
                <span className={`transition-transform duration-300 ${activeItem === item.label ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {getIcon(item.label)}
                </span>
                <span className="text-sm tracking-tight">{item.label}</span>
                {activeItem === item.label && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full shadow-sm shadow-primary/50" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <button 
            onClick={onCreateNew}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-[1.25rem] bg-slate-900 text-white text-sm font-black hover:bg-black hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10"
          >
            <PlusCircle size={18} strokeWidth={2.5} />
            <span>New Project</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
