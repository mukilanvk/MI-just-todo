
import React from 'react';
import Hero from '../../components/Hero/Hero';
import BoardCard from '../../components/BoardCard/BoardCard';
import { Board } from '../../types/board.types';

interface BoardsListProps {
  boards: Board[];
  onSelectBoard: (board: Board) => void;
  onCreateNew: () => void;
}

const BoardsList: React.FC<BoardsListProps> = ({ boards, onSelectBoard, onCreateNew }) => {
  return (
    <div className="p-10 lg:p-14 pb-24 w-full bg-[#f8fbff] min-h-full">
      {/* Hero Section with AI Insights and Workspace Actions */}
      <Hero onCreateNew={onCreateNew} />

      {/* Workspaces Grid Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Workspaces</h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Manage your collaborative project boards</p>
          </div>
          <button onClick={onCreateNew} className="text-sm font-black text-primary hover:underline bg-primary/5 px-6 py-2.5 rounded-xl transition-all">View Archive</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {boards.map(board => (
            <BoardCard 
              key={board.id} 
              board={board} 
              onClick={() => onSelectBoard(board)} 
            />
          ))}
          {/* Empty State placeholder */}
          <button 
            onClick={onCreateNew}
            className="rounded-[1.8rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center p-12 gap-4 text-slate-300 hover:text-primary hover:border-primary/20 hover:bg-white transition-all group"
          >
            <div className="size-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">add</span>
            </div>
            <span className="font-black uppercase tracking-widest text-xs">Create Workspace</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardsList;
