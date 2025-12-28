
import React from 'react';
import { Board } from '../../types/board.types';
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
  LayoutDashboard,
  Home,
  Megaphone,
  Plane,
  Globe,
  CircleDollarSign,
  Clock
} from 'lucide-react';

interface BoardCardProps {
  board: Board;
  onClick?: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({ board, onClick }) => {
  const getIcon = (iconName: string) => {
    const props = { size: 30, strokeWidth: 2.5, className: "text-white" };
    switch (iconName) {
      case 'rocket_launch': return <Rocket {...props} />;
      case 'lightbulb': return <Lightbulb {...props} />;
      case 'target': return <Target {...props} />;
      case 'calendar_month': return <Calendar {...props} />;
      case 'folder_open': return <FolderOpen {...props} />;
      case 'pie_chart': return <PieChart {...props} />;
      case 'group': return <Users {...props} />;
      case 'bolt': return <Bolt {...props} />;
      case 'home_work': return <Home {...props} />;
      case 'campaign': return <Megaphone {...props} />;
      case 'flight_takeoff': return <Plane {...props} />;
      case 'web': return <Globe {...props} />;
      case 'attach_money': return <CircleDollarSign {...props} />;
      default: return <LayoutDashboard {...props} />;
    }
  };

  return (
    <article 
      onClick={onClick}
      className="glass-panel rounded-2xl p-6 group transition-all duration-300 hover:bg-white hover:translate-y-[-4px] hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer border border-slate-100 flex flex-col"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-4 items-center">
          <div className={`size-16 rounded-2xl bg-gradient-to-br ${board.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {getIcon(board.icon)}
          </div>
          <div>
            <h3 className="text-slate-800 text-lg font-bold leading-tight group-hover:text-primary transition-colors">
              {board.title}
            </h3>
            <p className="text-slate-500 text-sm mt-0.5">{board.category}</p>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="text-slate-400 hover:text-slate-700 transition-colors p-1"
        >
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2 font-medium">
          <span className="text-slate-400">Progress</span>
          <span className="text-slate-700 font-bold">{board.progress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${board.gradient} rounded-full transition-all duration-700 ease-out`} 
            style={{ width: `${board.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
        <div className="flex -space-x-2">
          {board.avatars.slice(0, 3).map((avatar, idx) => (
            <img 
              key={idx}
              src={avatar}
              className="size-8 rounded-full object-cover ring-2 ring-white border border-slate-100 shadow-sm"
              alt="team"
            />
          ))}
          {board.avatars.length > 3 && (
            <div className="size-8 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 flex items-center justify-center ring-2 ring-white border border-slate-100 shadow-sm">
              +{board.avatars.length - 3}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          {board.progress < 100 ? (
             <>
               <Clock size={18} className="text-orange-400" />
               <span className="font-medium text-orange-500">{board.status}</span>
             </>
          ) : (
            <>
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span className="font-medium text-emerald-600">Completed</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default BoardCard;
