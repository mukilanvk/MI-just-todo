
import React, { useState } from 'react';
import { Board, Category } from '../types';
import { 
  Rocket, 
  Lightbulb, 
  Target, 
  Calendar, 
  FolderOpen, 
  PieChart, 
  Users, 
  Plus, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';

interface BoardCreationProps {
  onBack: () => void;
  onContinue: (board: Partial<Board>) => void;
  initialData?: Partial<Board>;
}

const BoardCreation: React.FC<BoardCreationProps> = ({ onBack, onContinue, initialData }) => {
  const [selectedIcon, setSelectedIcon] = useState(initialData?.icon || 'rocket_launch');
  const [selectedThemeIdx, setSelectedThemeIdx] = useState(0);
  const [name, setName] = useState(initialData?.title || '');
  const [desc, setDesc] = useState('');

  const icons = [
    { name: 'rocket_launch', component: Rocket },
    { name: 'lightbulb', component: Lightbulb },
    { name: 'target', component: Target },
    { name: 'calendar_month', component: Calendar },
    { name: 'folder_open', component: FolderOpen },
    { name: 'pie_chart', component: PieChart },
    { name: 'group', component: Users },
    { name: 'add', component: Plus }
  ];

  const themes = ['from-blue-500 to-purple-600', 'from-emerald-400 to-cyan-600', 'from-orange-400 to-pink-600', 'from-fuchsia-400 to-indigo-500', 'from-slate-600 to-slate-800'];

  const handleCreate = () => {
    if (!name) return;
    onContinue({
      title: name,
      icon: selectedIcon,
      gradient: themes[selectedThemeIdx],
      category: Category.Project,
      progress: 0,
      tasks: [],
      members: [],
      avatars: [],
      status: 'Active',
      statusIcon: 'bolt',
      statusColor: 'text-primary'
    });
  };

  return (
    <div className="glass-panel w-full max-w-[800px] rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-10 bg-white/70 shadow-2xl relative overflow-hidden border border-white/80 animate-fade-in">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
      
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
          <span className="text-primary">Workspace Configuration</span>
          <span>{initialData ? 'Editing Board' : 'Step 1 of 1'}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {initialData ? 'Update your workspace' : "Let's build your new workspace"}
        </h1>
        <p className="text-slate-500 text-lg font-medium">Customize the identity of your project board.</p>
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Choose an Icon</label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {icons.map((iconObj) => {
              const Icon = iconObj.component;
              return (
                <button
                  key={iconObj.name}
                  onClick={() => setSelectedIcon(iconObj.name)}
                  className={`aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    selectedIcon === iconObj.name 
                      ? 'bg-primary text-white shadow-lg shadow-primary/25 ring-2 ring-offset-2 ring-primary scale-110'
                      : 'bg-white/50 border border-slate-200/50 text-slate-400 hover:text-primary hover:bg-white hover:scale-105'
                  }`}
                >
                  <Icon size={24} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest" htmlFor="board-name">Board Name</label>
            <input 
              className="w-full bg-white/60 border border-slate-200 rounded-2xl px-6 py-4 placeholder-slate-300 text-lg font-bold outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" 
              id="board-name" 
              placeholder="e.g. Q4 Marketing Roadmap" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest" htmlFor="board-desc">Description (Optional)</label>
            <textarea 
              className="w-full bg-white/60 border border-slate-200 rounded-2xl px-6 py-4 placeholder-slate-300 text-base font-medium outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none" 
              id="board-desc" 
              placeholder="What is this board used for?" 
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Color Theme</label>
          <div className="flex flex-wrap gap-4">
            {themes.map((theme, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedThemeIdx(idx)}
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme} transition-all shadow-sm ${
                  selectedThemeIdx === idx ? 'ring-4 ring-offset-4 ring-primary scale-110' : 'hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-slate-100">
        <button onClick={onBack} className="px-8 py-3.5 rounded-2xl text-slate-500 font-bold hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-2">
          <ArrowLeft size={18} /> Cancel
        </button>
        <button 
          onClick={handleCreate} 
          disabled={!name}
          className="px-10 py-3.5 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {initialData ? 'Save Changes' : 'Create Board'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default BoardCreation;
