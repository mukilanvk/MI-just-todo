
import React, { useState, useEffect } from 'react';
import { Task, Member, Column } from '../types';
import { 
  CheckCircle2, 
  X, 
  ChevronDown, 
  UserPlus, 
  Calendar, 
  Flag, 
  Type, 
  Bold, 
  Italic, 
  List, 
  Link, 
  Image as ImageIcon,
  Save
} from 'lucide-react';

interface TaskModalProps {
  onClose: () => void;
  onCreate: (task: Partial<Task>) => void;
  boardName: string;
  boardIcon: string;
  members: Member[];
  columns: Column[];
  initialTask?: Task;
}

// Added 'columns' and 'boardIcon' to the destructuring assignment to fix the error where 'columns' was undefined in the component body.
const TaskModal: React.FC<TaskModalProps> = ({ onClose, onCreate, boardName, boardIcon, members, columns, initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [priority, setPriority] = useState<Task['priority']>(initialTask?.priority || 'Normal');
  const [status, setStatus] = useState(initialTask?.status || 'To Do');
  const [desc, setDesc] = useState(initialTask?.description || '');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || new Date().toISOString().split('T')[0]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>(initialTask?.assignees || []);
  const [showMemberPicker, setShowMemberPicker] = useState(false);

  const handleSave = () => {
    if (!title.trim()) return;
    onCreate({
      title,
      description: desc,
      priority,
      status,
      dueDate,
      assignees: selectedAssignees,
    });
  };

  const toggleMember = (avatar: string) => {
    setSelectedAssignees(prev => 
      prev.includes(avatar) ? prev.filter(a => a !== avatar) : [...prev, avatar]
    );
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-[800px] glass-panel bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-scale-up border border-white">
        
        {/* Modal Header */}
        <header className="px-10 py-8 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
              <CheckCircle2 size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">{initialTask ? 'Edit Task' : 'New Task'}</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{boardName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
            <X size={24} />
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="p-10 space-y-10 overflow-y-auto max-h-[70vh] scrollbar-hide">
          
          {/* Title Input */}
          <div className="group">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1 group-focus-within:text-primary transition-colors">Task Title</label>
            <input 
              className="w-full text-2xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none placeholder-slate-200" 
              placeholder="e.g. Design Homepage Hero"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Priority and Status in a row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-sm focus:bg-white focus:border-primary outline-none transition-all cursor-pointer pr-10"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                  >
                    <option>Urgent</option>
                    <option>High</option>
                    <option>Normal</option>
                    <option>Low</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                <div className="relative">
                  <select 
                    className="w-full appearance-none bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-sm focus:bg-white focus:border-primary outline-none transition-all cursor-pointer pr-10"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {columns.map(c => <option key={c.id}>{c.title}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Deadline</label>
              <div className="relative">
                <input 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-sm focus:bg-white focus:border-primary outline-none transition-all [color-scheme:light]" 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Assignees */}
          <div className="space-y-4">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Team Members</label>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setShowMemberPicker(!showMemberPicker)}
                className="size-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 hover:text-slate-600 transition-all border-2 border-dashed border-slate-200"
              >
                <UserPlus size={20} />
              </button>
              {selectedAssignees.map((avatar, i) => (
                <div key={i} className="relative group">
                  <img src={avatar} className="size-12 rounded-2xl object-cover ring-2 ring-white shadow-md" alt="u" />
                  <button 
                    onClick={() => toggleMember(avatar)}
                    className="absolute -top-1.5 -right-1.5 size-5 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-2 border-white"
                  >
                    <X size={10} strokeWidth={4} />
                  </button>
                </div>
              ))}
            </div>

            {showMemberPicker && (
              <div className="bg-slate-50 rounded-[1.5rem] p-4 border-2 border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 animate-fade-in shadow-inner">
                {members.map(m => (
                  <button
                    key={m.id}
                    onClick={() => toggleMember(m.avatar)}
                    className={`flex items-center gap-3 p-2 rounded-xl border transition-all ${selectedAssignees.includes(m.avatar) ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-white hover:border-slate-200'}`}
                  >
                    <img src={m.avatar} className="size-8 rounded-lg object-cover" alt="m" />
                    <span className="text-xs font-black truncate">{m.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col group min-h-[200px]">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Description</label>
              <div className="flex items-center gap-1.5 bg-white/60 p-1.5 rounded-xl border border-slate-100">
                {[Bold, Italic, List, Link, ImageIcon].map((Icon, i) => (
                  <button key={i} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>
            <textarea 
              className="w-full flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-slate-700 leading-relaxed focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none font-medium h-40" 
              placeholder="What needs to be done?"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <footer className="px-10 py-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <button onClick={onClose} className="px-8 py-3.5 rounded-2xl text-slate-400 font-black text-sm uppercase tracking-widest hover:text-slate-600 transition-colors">
            Discard
          </button>
          <button 
            onClick={handleSave}
            className="px-10 py-3.5 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-[0.15em] shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <Save size={18} strokeWidth={2.5} />
            {initialTask ? 'Save Changes' : 'Create Task'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TaskModal;
