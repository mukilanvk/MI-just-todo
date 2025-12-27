
import React from 'react';
import { Search, Bell, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onToggleNotifications: () => void;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleNotifications, breadcrumbs, userName = "Jane Doe" }) => {
  return (
    <header className="h-20 shrink-0 border-b border-slate-200 glass-panel flex items-center justify-between px-8 md:px-10 sticky top-0 z-40 bg-white/40 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-3 text-sm">
          {breadcrumbs ? (
            breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight size={14} className="text-slate-300" strokeWidth={3} />}
                <button 
                  onClick={crumb.onClick}
                  className={`transition-all ${idx === breadcrumbs.length - 1 ? 'text-slate-900 font-black text-lg tracking-tight' : 'text-slate-400 font-bold hover:text-primary'}`}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))
          ) : (
            <span className="text-slate-900 font-black text-xl tracking-tight">Dashboard</span>
          )}
        </nav>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-12">
        <div className="relative w-full group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Search size={18} strokeWidth={2.5} />
          </span>
          <input
            className="w-full bg-slate-100/70 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all shadow-inner"
            placeholder="Search everything..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={onToggleNotifications}
          className="relative p-3 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
        >
          <Bell size={24} />
          <span className="absolute top-2.5 right-2.5 size-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-4 pl-1">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-black text-slate-900 leading-none">{userName}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Elite Member</p>
          </div>
          <div 
            className="bg-center bg-no-repeat bg-cover rounded-2xl size-11 ring-4 ring-white shadow-xl cursor-pointer hover:scale-105 transition-all"
            style={{ backgroundImage: 'url("https://picsum.photos/seed/user/80/80")' }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
