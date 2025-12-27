
import React from 'react';
import { Board } from '../types';
import { 
  Rocket, 
  Lightbulb, 
  Target, 
  Calendar, 
  FolderOpen, 
  PieChart, 
  Users, 
  Bolt, 
  MoreVertical, 
  CheckCircle2, 
  LayoutDashboard 
} from 'lucide-react';

interface BoardCardProps {
  board: Board;
  onClick?: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onClick }) => {
  const getIcon = (iconName: string) => {
    const props = { size: 32, strokeWidth: 2.5, className: "text-white" };
    switch (iconName) {
      case 'rocket_launch': return <Rocket {...props} />;
      case 'lightbulb': return <Lightbulb {...props} />;
      case 'target': return <Target {...props} />;
      case 'calendar_month': return <Calendar {...props} />;
      case 'folder_open': return <FolderOpen {...props} />;
      case 'pie_chart': return <PieChart {...props} />;
      case 'group': return <Users {...props} />;
      case 'bolt': return <Bolt {...props} />;
      default: return <LayoutDashboard {...props} />;
    }
  };

  return (
    <article 
      onClick={onClick}
      className="glass-panel rounded-[1.8rem] p-7 group transition-all duration-300 hover:bg-white hover:translate-y-[-6px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] cursor-pointer border border-slate-100"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="flex gap-4 items-center">
          <div className={`size-16 rounded-[1.25rem] bg-gradient-to-br ${board.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
            {getIcon(board.icon)}
          </div>
          <div>
            <h3 className="text-slate-800 text-[18px] font-black leading-tight tracking-tight group-hover:text-primary transition-colors">
              {board.title}
            </h3>
            <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">{board.category}</p>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="text-slate-300 hover:text-slate-600 transition-colors p-1"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-[11px] mb-2 font-black uppercase tracking-widest text-slate-400">
          <span>Progress</span>
          <span className="text-slate-800">{board.progress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
          <div 
            className={`h-full bg-gradient-to-r ${board.gradient} rounded-full transition-all duration-700 ease-out`} 
            style={{ width: `${board.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto">
        <div className="flex -space-x-2.5">
          {board.avatars.map((avatar, idx) => (
            <img 
              key={idx}
              src={avatar}
              className="size-8 rounded-full object-cover ring-2 ring-white border border-slate-100 shadow-sm"
              alt="team"
            />
          ))}
          {board.id === '1' && <div className="size-8 rounded-full bg-slate-50 text-[10px] font-black text-slate-500 flex items-center justify-center ring-2 ring-white border border-slate-100 shadow-sm">+2</div>}
        </div>
        
        <div className={`flex items-center gap-1.5 text-xs font-bold ${board.statusColor}`}>
          <CheckCircle2 size={18} />
          <span className="tracking-tight">
            {board.status}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BoardCard;
