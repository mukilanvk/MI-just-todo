
import React from 'react';
import { Home, LayoutDashboard, BarChart2, Settings, PlusCircle, Zap } from 'lucide-react';

interface SidebarProps {
  onCreateNew?: () => void;
  activeItem?: string;
  onNavigate?: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreateNew, activeItem = 'Boards', onNavigate }) => {
  const navItems = [
    { label: 'Home', icon: Home },
    { label: 'Boards', icon: LayoutDashboard },
    { label: 'Analytics', icon: BarChart2 },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="relative z-50 w-72 shrink-0 hidden md:flex flex-col bg-white border-r border-slate-100">
      <div className="flex flex-col h-full p-8">
        <div className="flex flex-col gap-12">
          {/* Brand */}
          <div className="flex gap-3 items-center px-2 cursor-pointer" onClick={() => onNavigate?.('Home')}>
            <div className="size-10 flex items-center justify-center bg-[#00cfc1] rounded-xl shadow-lg shadow-[#00cfc1]/20 text-white">
              <Zap size={24} fill="currentColor" strokeWidth={2.5} />
            </div>
            <h1 className="text-slate-900 text-xl font-bold tracking-tight text-nowrap">FocusFlow</h1>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate?.(item.label)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-sky-50 text-primary font-bold border border-primary/10 shadow-sm shadow-primary/5' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'} />
                  <span className="text-sm tracking-tight">{item.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto flex flex-col gap-6">
          <button 
            onClick={onCreateNew}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-900 text-white text-sm font-black hover:bg-black hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10"
          >
            <PlusCircle size={18} strokeWidth={2.5} />
            <span>New Project</span>
          </button>
          
          {/* Profile Card */}
          <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
            <div className="size-10 rounded-xl bg-slate-200 bg-cover bg-center shadow-sm" style={{ backgroundImage: 'url("https://picsum.photos/seed/alex/80/80")' }} />
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-slate-900 truncate">Alex Designer</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Pro Plan</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
