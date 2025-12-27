
import React, { useState } from 'react';
import Hero from '../../components/Hero/Hero';
import BoardCard from '../../components/BoardCard/BoardCard';
import { Board } from '../../types/board.types';
import { ChevronDown, LayoutGrid, List as ListIcon, Plus, ArrowRight } from 'lucide-react';

interface DashboardProps {
  boards: Board[];
  onSelectBoard: (board: Board) => void;
  onCreateNew: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ boards, onSelectBoard, onCreateNew }) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState('All Boards');

  const filteredBoards = activeFilter === 'All Boards' 
    ? boards 
    : boards.filter(b => b.category === activeFilter);

  return (
    <div className="p-6 md:p-8 lg:p-12 pb-24 w-full mx-auto">
      <Hero onCreateNew={onCreateNew} />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
          {['All Boards', 'Personal', 'Work', 'Family', 'Project'].map(f => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeFilter === f 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-100' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2">
                {f !== 'All Boards' && <span className={`size-2 rounded-full ${
                  f === 'Personal' ? 'bg-blue-500' : 
                  f === 'Work' ? 'bg-teal-400' : 
                  f === 'Family' ? 'bg-purple-500' : 'bg-orange-500'
                }`}></span>}
                {f}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-400">Sort by:</span>
            <div className="relative group">
              <select className="appearance-none bg-white text-slate-700 text-sm font-bold pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 cursor-pointer hover:bg-slate-50 shadow-sm transition-all min-w-[140px]">
                <option>Last Active</option>
                <option>Progress</option>
                <option>Name (A-Z)</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
          
          <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/50 shadow-inner">
            <button 
              onClick={() => setLayout('grid')}
              className={`p-2 rounded-lg transition-all ${layout === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setLayout('list')}
              className={`p-2 rounded-lg transition-all ${layout === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <ListIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      {layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 animate-fade-in">
          {filteredBoards.map((board) => (
            <BoardCard key={board.id} board={board} onClick={() => onSelectBoard(board)} />
          ))}
          <article 
            onClick={onCreateNew} 
            className="rounded-[1.8rem] p-8 border-2 border-dashed border-slate-200 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-5 group cursor-pointer min-h-[280px]"
          >
            <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 shadow-sm">
              <Plus size={36} className="text-slate-400 group-hover:text-primary transition-colors" strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <h3 className="text-slate-700 font-black text-lg group-hover:text-primary transition-colors tracking-tight">Create New Board</h3>
              <p className="text-slate-400 text-sm font-bold mt-1 uppercase tracking-widest">Start from scratch</p>
            </div>
          </article>
        </div>
      ) : (
        <div className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
           <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Workspace</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Progress</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBoards.map((board) => (
                  <tr key={board.id} onClick={() => onSelectBoard(board)} className="hover:bg-slate-50/80 transition-colors cursor-pointer group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`size-10 rounded-xl bg-gradient-to-br ${board.gradient} flex items-center justify-center text-white shadow-sm`}>
                          <LayoutGrid size={18} />
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-base leading-none">{board.title}</p>
                          <p className="text-[10px] font-black uppercase text-slate-400 mt-1.5 tracking-widest">{board.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest ${board.statusColor}`}>
                         <Plus size={14} />
                         {board.status}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4 min-w-[120px]">
                         <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div className={`h-full bg-gradient-to-r ${board.gradient}`} style={{ width: `${board.progress}%` }}></div>
                         </div>
                         <span className="text-xs font-black text-slate-800">{board.progress}%</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="text-slate-300 hover:text-slate-600 transition-colors">
                         <ArrowRight size={24} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
