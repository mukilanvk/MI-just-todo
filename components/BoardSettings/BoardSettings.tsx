
import React, { useState } from 'react';
import { Board } from '../../types/board.types';
import { 
  Settings, 
  Users, 
  X, 
  Rocket, 
  Lightbulb, 
  Target, 
  Calendar, 
  FolderOpen, 
  PieChart, 
  Home, 
  Bolt,
  Check,
  MoreHorizontal,
  UserPlus
} from 'lucide-react';

interface BoardSettingsProps {
  onClose: () => void;
  board: Board;
  onUpdateBoard: (updatedBoard: Partial<Board>) => void;
}

const BoardSettings: React.FC<BoardSettingsProps> = ({ onClose, board, onUpdateBoard }) => {
  const [activeTab, setActiveTab] = useState('General');
  
  const [title, setTitle] = useState(board.title);
  const [description, setDescription] = useState(board.description || '');
  const [icon, setIcon] = useState(board.icon);
  const [gradient, setGradient] = useState(board.gradient);
  const [status, setStatus] = useState(board.status);

  const tabs = [
    { label: 'General', icon: Settings },
    { label: 'Members', icon: Users }
  ];

  const icons = [
    { name: 'rocket_launch', component: Rocket },
    { name: 'lightbulb', component: Lightbulb },
    { name: 'target', component: Target },
    { name: 'calendar_month', component: Calendar },
    { name: 'folder_open', component: FolderOpen },
    { name: 'pie_chart', component: PieChart },
    { name: 'group', component: Users },
    { name: 'home_work', component: Home },
    { name: 'bolt', component: Bolt }
  ];

  const themes = [
    'from-sky-400 to-indigo-500',
    'from-emerald-400 to-cyan-600',
    'from-blue-500 to-purple-600',
    'from-orange-400 to-pink-600',
    'from-slate-600 to-slate-800'
  ];

  const handleSave = () => {
    onUpdateBoard({
      title,
      description,
      icon,
      gradient,
      status
    });
    onClose();
  };

  const getIconComponent = (iconName: string, size = 20) => {
    const iconObj = icons.find(i => i.name === iconName);
    const Icon = iconObj ? iconObj.component : Settings;
    return <Icon size={size} />;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm transition-all animate-fade-in">
      <main className="w-full max-w-[650px] flex flex-col glass-panel rounded-[1.5rem] shadow-2xl overflow-hidden bg-white animate-scale-up border border-slate-100">
        <header className="flex items-center justify-between px-7 py-5 border-b border-slate-100 bg-slate-50/40">
          <div className="flex items-center gap-3.5">
            <div className={`flex items-center justify-center size-10 rounded-xl bg-gradient-to-br ${gradient} shadow-md text-white transition-all duration-500`}>
              {getIconComponent(icon)}
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 tracking-tight leading-none">Workspace Settings</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Configuration</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        <div className="px-7 bg-white border-b border-slate-100">
          <nav className="flex gap-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-all ${
                    activeTab === tab.label 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon size={18} className={`transition-transform ${activeTab === tab.label ? 'scale-110' : ''}`} />
                  <span className="text-xs font-black tracking-wider uppercase">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-7 space-y-7 bg-white overflow-y-auto max-h-[60vh] scrollbar-hide">
          {activeTab === 'General' && (
            <div className="space-y-7 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">Workspace Name</label>
                <input 
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-bold text-base focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none" 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">Workspace Description</label>
                <textarea 
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-600 font-medium text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none resize-none" 
                  rows={2}
                  placeholder="Describe the purpose of this workspace..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">Identify Icon</label>
                <div className="flex flex-wrap gap-2">
                  {icons.map((iconObj) => {
                    const Icon = iconObj.component;
                    return (
                      <button
                        key={iconObj.name}
                        onClick={() => setIcon(iconObj.name)}
                        className={`size-9 rounded-lg flex items-center justify-center transition-all ${
                          icon === iconObj.name ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100'
                        }`}
                      >
                        <Icon size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">Workspace Theme</label>
                <div className="flex flex-wrap gap-3">
                  {themes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setGradient(t)}
                      className={`size-8 rounded-full bg-gradient-to-br ${t} transition-all ${
                        gradient === t ? 'ring-4 ring-offset-2 ring-primary scale-110' : 'hover:scale-110 border border-white'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 space-y-4">
                <ToggleSetting label="Public Board" desc="Anyone with the link can view" checked={true} />
                <ToggleSetting label="Show Completed" desc="Keep finished tasks visible" checked={false} />
              </div>
            </div>
          )}

          {activeTab === 'Members' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Team Members</h3>
                <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-primary/10 hover:scale-105 transition-all flex items-center gap-2">
                  <UserPlus size={16} />
                  Invite
                </button>
              </div>

              <div className="space-y-1.5">
                {board.members.map((member) => (
                  <div key={member.id} className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent">
                    <div className="flex items-center gap-3">
                      <img className="h-9 w-9 rounded-full object-cover border border-white shadow-sm" src={member.avatar} alt={member.name} />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 leading-none">{member.name}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase mt-1">{member.role}</span>
                      </div>
                    </div>
                    <button className="p-1.5 text-slate-300 hover:text-slate-600 transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-7 py-5 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3.5">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-slate-500 font-bold text-xs hover:text-slate-800 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-7 py-2.5 rounded-xl bg-primary text-white font-black text-xs shadow-lg shadow-primary/10 transition-all transform active:scale-95 flex items-center gap-2">
            <Check size={16} strokeWidth={3} />
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};

const ToggleSetting = ({ label, desc, checked }: any) => (
  <div className="flex items-center justify-between group cursor-pointer py-1">
    <div className="flex flex-col">
      <span className="text-xs font-bold text-slate-700">{label}</span>
      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{desc}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input defaultChecked={checked} className="sr-only peer" type="checkbox" />
      <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  </div>
);

export default BoardSettings;
