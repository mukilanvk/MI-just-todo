
import React, { useState, useMemo } from 'react';
import Hero from '../../components/Hero';
import BoardCard from '../../components/BoardCard';
import { Board } from '../../types/board.types';
import { Grid, List, ChevronDown, Plus, Search, X } from 'lucide-react';

interface BoardsListProps {
  boards: Board[];
  onSelectBoard: (board: Board) => void;
  onCreateNew: () => void;
}

const BoardsList: React.FC<BoardsListProps> = ({ boards, onSelectBoard, onCreateNew }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Last Active');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  // Filtering and Sorting Logic
  const processedBoards = useMemo(() => {
    let result = [...boards];

    // Filter by search query
    if (searchQuery.trim()) {
      result = result.filter(board => 
        board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort logic
    result.sort((a, b) => {
      switch (sortBy) {
        case 'Name (A-Z)':
          return a.title.localeCompare(b.title);
        case 'Progress':
          return b.progress - a.progress;
        case 'Last Active':
        default:
          // In a real app, this would use a timestamp. For mock, we use ID order or a random stable sort.
          return b.id.localeCompare(a.id);
      }
    });

    return result;
  }, [boards, searchQuery, sortBy]);

  return (
    <div className="p-6 md:p-8 lg:px-12 pb-24 w-full bg-slate-50/50 min-h-full animate-fade-in">
      {/* Hero Section */}
      <Hero onCreateNew={onCreateNew} />

      {/* Control Bar: Search & Sort (Replaces old tabs) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        {/* Search Input Area */}
        <div className="relative flex-1 max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your workspaces..."
            className="block w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm shadow-slate-200/50"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Action Group: Sort & View Mode */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest hidden sm:inline">Sort by:</span>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white text-slate-700 text-sm font-bold pl-4 pr-10 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 cursor-pointer hover:bg-slate-50 shadow-sm transition-all min-w-[160px]"
              >
                <option>Last Active</option>
                <option>Name (A-Z)</option>
                <option>Progress</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200 mx-1"></div>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
            <button 
              onClick={() => setViewType('grid')}
              className={`p-2 rounded-xl transition-all ${viewType === 'grid' ? 'bg-primary/10 text-primary shadow-inner' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Grid size={18} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => setViewType('list')}
              className={`p-2 rounded-xl transition-all ${viewType === 'list' ? 'bg-primary/10 text-primary shadow-inner' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className={viewType === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
        : "flex flex-col gap-4"
      }>
        {processedBoards.map(board => (
          <BoardCard 
            key={board.id} 
            board={board} 
            onClick={() => onSelectBoard(board)} 
          />
        ))}
        
        {/* Create New Board Empty State (Always at the end of results if not searching heavily) */}
        {(!searchQuery || processedBoards.length === 0) && (
          <article 
            onClick={onCreateNew}
            className={`rounded-[1.8rem] p-6 border-2 border-dashed border-slate-200 hover:border-primary hover:bg-sky-50 transition-all duration-500 flex flex-col items-center justify-center gap-5 group cursor-pointer min-h-[280px] ${viewType === 'list' ? 'h-32 min-h-0 !flex-row !justify-start !p-8' : ''}`}
          >
            <div className="size-16 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 shadow-inner">
              <Plus size={32} className="text-slate-400 group-hover:text-primary transition-colors" />
            </div>
            <div className={viewType === 'list' ? "text-left" : "text-center"}>
              <h3 className="text-slate-800 text-lg font-black tracking-tight group-hover:text-primary transition-colors">
                {processedBoards.length === 0 && searchQuery ? "No matches found" : "Create New Board"}
              </h3>
              <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">
                {processedBoards.length === 0 && searchQuery ? "Try a different search term" : "Start from scratch or template"}
              </p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default BoardsList;
