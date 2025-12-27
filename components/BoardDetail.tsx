import React, { useState, useMemo, useRef, useEffect } from 'react';
import BoardSettings from './BoardSettings';
import TaskModal from './TaskModal';
import TaskDetailView from './TaskDetailView';
import { Board, Task, Column, Member, Comment } from '../types';
import { 
  LayoutDashboard, 
  List, 
  Settings, 
  Check, 
  MoreHorizontal, 
  Columns, 
  MessageCircle, 
  X, 
  Plus, 
  Calendar, 
  Trash2, 
  Rocket, 
  Lightbulb, 
  Target, 
  FolderOpen, 
  PieChart, 
  Users, 
  Bolt,
  Download,
  Send,
  History,
  Image as ImageIcon
} from 'lucide-react';

interface BoardDetailProps {
  board: Board;
  onBack: () => void;
  onUpdateTasks: (tasks: Task[]) => void;
  onUpdateBoard: (updatedBoard: Partial<Board>) => void;
  onAddSnack: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const BoardDetail: React.FC<BoardDetailProps> = ({ board, onBack, onUpdateTasks, onUpdateBoard, onAddSnack }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddColumnPopup, setShowAddColumnPopup] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [showCommunityChat, setShowCommunityChat] = useState(false);
  const [activeTab, setActiveTab] = useState<'Board' | 'List'>('Board');
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);

  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(board.columns.map(c => c.title));
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<string[]>([]);

  const filteredTasks = useMemo(() => {
    return board.tasks.filter(task => {
      const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(task.priority);
      const matchesStatus = selectedStatuses.includes(task.status);
      const matchesAssignee = selectedAssigneeIds.length === 0 || 
        task.assignees.some(avatar => board.members.find(m => m.avatar === avatar && selectedAssigneeIds.includes(m.id)));
      return matchesPriority && matchesStatus && matchesAssignee;
    });
  }, [board.tasks, selectedPriorities, selectedStatuses, selectedAssigneeIds, board.members]);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const task = board.tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      const updatedTasks = board.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
      onUpdateTasks(updatedTasks);
      onAddSnack(`Task "${task.title}" moved to ${newStatus}`, 'info');
    }
  };

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;
    const newCol: Column = {
      id: Math.random().toString(36).substr(2, 9),
      title: newColumnName,
      color: 'bg-sky-500'
    };
    onUpdateBoard({ columns: [...board.columns, newCol] });
    setSelectedStatuses([...selectedStatuses, newColumnName]);
    setNewColumnName('');
    setShowAddColumnPopup(false);
    onAddSnack(`Column "${newColumnName}" created`, 'success');
  };

  const executeDeleteTask = () => {
    if (!taskToDeleteId) return;
    const taskTitle = board.tasks.find(t => t.id === taskToDeleteId)?.title;
    const updatedTasks = board.tasks.filter(t => t.id !== taskToDeleteId);
    onUpdateTasks(updatedTasks);
    setTaskToDeleteId(null);
    setSelectedTask(null);
    onAddSnack(`Task deleted: ${taskTitle}`, 'info');
  };

  const doneCount = board.tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = board.tasks.length > 0 ? Math.round((doneCount / board.tasks.length) * 100) : 0;

  const getPrimaryColorClass = () => {
    if (board.gradient.includes('sky')) return 'text-sky-500';
    if (board.gradient.includes('emerald')) return 'text-emerald-500';
    if (board.gradient.includes('blue')) return 'text-blue-500';
    if (board.gradient.includes('orange')) return 'text-orange-500';
    return 'text-sky-500';
  };

  const getIconComponent = (iconName: string, size = 24) => {
    const props = { size, strokeWidth: 2.5 };
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
    <div className="flex h-full w-full bg-[#F9FBFF] overflow-hidden font-sans relative">
      <aside className="w-[300px] shrink-0 bg-white border-r border-slate-100 flex flex-col p-10 overflow-y-auto scrollbar-hide z-20 shadow-sm">
        <div className="mb-12">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-300 mb-8 px-1">Views</p>
          <div className="space-y-3">
            <SidebarNavItem 
              icon={<LayoutDashboard size={24} />} 
              label="Board" 
              active={activeTab === 'Board'} 
              onClick={() => setActiveTab('Board')}
              primaryColor={getPrimaryColorClass()} 
            />
            <SidebarNavItem 
              icon={<List size={24} />} 
              label="List" 
              active={activeTab === 'List'} 
              onClick={() => setActiveTab('List')}
              primaryColor={getPrimaryColorClass()} 
            />
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 px-1">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-800">Status</h4>
            <button 
              onClick={() => setSelectedStatuses(board.columns.map(c => c.title))}
              className={`text-[11px] font-black ${getPrimaryColorClass()} hover:underline`}
            >
              Reset
            </button>
          </div>
          <div className="space-y-5">
            {board.columns.map(col => (
              <label key={col.id} className="flex items-center justify-between cursor-pointer group hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-4">
                  <div className={`size-5 rounded-lg border-2 flex items-center justify-center transition-all ${selectedStatuses.includes(col.title) ? 'bg-primary border-primary shadow-md shadow-primary/20' : 'border-slate-200 bg-slate-50'}`}>
                    {selectedStatuses.includes(col.title) && <Check size={12} className="text-white" strokeWidth={4} />}
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedStatuses.includes(col.title)}
                      onChange={() => {
                        setSelectedStatuses(prev => prev.includes(col.title) ? prev.filter(s => s !== col.title) : [...prev, col.title]);
                      }}
                    />
                  </div>
                  <div className={`size-2.5 rounded-full ${col.color}`}></div>
                  <span className="text-[14px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{col.title}</span>
                </div>
                <span className="text-[11px] font-black text-slate-300">
                  {board.tasks.filter(t => t.status === col.title).length}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 px-1">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-800">Team</h4>
            <button 
              onClick={() => setSelectedAssigneeIds([])}
              className={`text-[11px] font-black ${getPrimaryColorClass()} hover:underline`}
            >
              Select All
            </button>
          </div>
          <div className="space-y-4">
            {board.members.map(member => (
              <label key={member.id} className="flex items-center gap-4 cursor-pointer group">
                <div className={`size-5 rounded-lg border-2 flex items-center justify-center transition-all ${selectedAssigneeIds.includes(member.id) ? 'bg-primary border-primary shadow-md shadow-primary/20' : 'border-slate-200 bg-slate-50'}`}>
                  {selectedAssigneeIds.includes(member.id) && <Check size={12} className="text-white" strokeWidth={4} />}
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={selectedAssigneeIds.includes(member.id)}
                    onChange={() => {
                      setSelectedAssigneeIds(prev => prev.includes(member.id) ? prev.filter(id => id !== member.id) : [...prev, member.id]);
                    }}
                  />
                </div>
                <img src={member.avatar} className="size-9 rounded-xl border border-slate-100 shadow-sm object-cover" alt={member.name} />
                <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors truncate">{member.name}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="relative min-h-[180px] shrink-0 overflow-hidden flex flex-col justify-end bg-white border-b border-slate-100">
          <div className={`absolute inset-0 bg-gradient-to-r ${board.gradient} opacity-[0.05] pointer-events-none`}></div>
          <div className="px-12 pb-12 flex items-center justify-between relative z-10 w-full animate-fade-in">
            <div className="flex items-center gap-12">
              <div className={`size-28 rounded-[2rem] bg-gradient-to-br ${board.gradient} shadow-2xl flex items-center justify-center text-white ring-8 ring-white/50 hover:scale-105 transition-all duration-500`}>
                 {getIconComponent(board.icon, 48)}
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{board.title}</h1>
                <div className="flex items-center gap-3">
                  <div className="size-3 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.6)] animate-pulse"></div>
                  <p className="text-slate-400 text-[16px] font-bold tracking-tight">{board.description || 'Global marketing strategy and content roadmap'}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="bg-white rounded-3xl border border-slate-100 px-10 py-6 shadow-xl shadow-slate-100/50 flex items-center gap-12">
                <StatPill label="Tasks" value={board.tasks.length} />
                <div className="w-px h-12 bg-slate-100"></div>
                <StatPill label="Progress" value={`${progressPercent}%`} color="text-emerald-500" />
                <div className="w-px h-12 bg-slate-100"></div>
                <StatPill label="Team" value={board.members.length} />
              </div>
              <button 
                onClick={() => setShowSettings(true)}
                className="flex items-center justify-center size-14 bg-white border-2 border-slate-100 text-slate-500 rounded-2xl shadow-sm hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all group"
              >
                <Settings size={28} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto scrollbar-hide px-12 pt-12 pb-32 relative z-10">
          {activeTab === 'Board' ? (
            <div className="flex gap-12 items-start w-full min-w-max">
              {board.columns.map(col => (
                <div 
                  key={col.id} 
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, col.title)}
                  className="w-[420px] shrink-0"
                >
                  <div className="flex items-center justify-between mb-10 px-8 py-5 bg-white/90 backdrop-blur-md rounded-3xl border border-white shadow-xl shadow-slate-200/20">
                    <div className="flex items-center gap-4">
                      <div className={`size-3.5 rounded-full ${col.color} shadow-sm`}></div>
                      <h3 className="font-black text-slate-800 text-[18px] tracking-tight">{col.title}</h3>
                      <span className="bg-slate-100 text-slate-400 px-4 py-1 rounded-full text-[12px] font-black">
                        {board.tasks.filter(t => t.status === col.title).length}
                      </span>
                    </div>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal size={24} />
                    </button>
                  </div>
                  <div className="space-y-12">
                    {filteredTasks.filter(t => t.status === col.title).map(task => (
                      <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} onDragStart={(e) => handleDragStart(e, task.id)} />
                    ))}
                    <button 
                      onClick={() => setShowCreateTask(true)}
                      className="w-full py-8 rounded-[2rem] border-4 border-dashed border-slate-100 text-primary font-black text-[15px] flex items-center justify-center gap-4 hover:bg-white hover:border-primary/20 transition-all group shadow-sm active:scale-[0.98]"
                    >
                      <Plus size={28} className="group-hover:rotate-90 transition-transform" /> Create New Task
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setShowAddColumnPopup(true)}
                className="w-[420px] shrink-0 h-24 rounded-[2rem] border-4 border-dashed border-slate-100 text-slate-400 font-black text-[16px] flex items-center justify-center gap-4 hover:bg-white/90 hover:text-primary transition-all shadow-sm active:scale-[0.98]"
              >
                <Columns size={32} /> Add Pipeline
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-12 overflow-hidden animate-fade-in w-full">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b-2 border-slate-50">
                        <th className="pb-10 px-8 text-[12px] font-black text-slate-400 uppercase tracking-widest">Task Details</th>
                        <th className="pb-10 px-8 text-[12px] font-black text-slate-400 uppercase tracking-widest text-right">Deadline</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredTasks.map(task => (
                        <tr key={task.id} onClick={() => setSelectedTask(task)} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                           <td className="py-8 px-8 font-black text-slate-800 text-lg group-hover:text-primary transition-colors">{task.title}</td>
                           <td className="py-8 px-8 text-right text-[15px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors">{task.dueDate}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          )}
        </div>

        <div className="fixed bottom-12 right-12 flex flex-col gap-6 z-40">
           <button 
            onClick={() => setShowCommunityChat(!showCommunityChat)}
            className={`size-18 rounded-3xl ${showCommunityChat ? 'bg-indigo-600' : 'bg-slate-900'} text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group border-4 border-white`}
            style={{ width: '72px', height: '72px' }}
          >
            {showCommunityChat ? <X size={36} /> : <MessageCircle size={36} />}
            {!showCommunityChat && <span className="absolute -top-1.5 -right-1.5 size-7 bg-rose-500 rounded-full border-4 border-white flex items-center justify-center text-[12px] font-black animate-pulse">3</span>}
          </button>
          <button 
            onClick={() => setShowCreateTask(true)}
            className="size-18 rounded-3xl bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group border-4 border-white"
            style={{ width: '72px', height: '72px' }}
          >
            <Plus size={44} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>

      {showCommunityChat && <CommunityChatPanel comments={board.comments} onClose={() => setShowCommunityChat(false)} />}
      
      {taskToDeleteId && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[3rem] p-16 w-full max-w-[500px] shadow-2xl animate-scale-up text-center border border-white">
            <div className="size-24 bg-rose-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-rose-100">
              <Trash2 size={48} className="text-rose-500" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Delete Task?</h3>
            <p className="text-slate-500 font-bold mb-12 leading-relaxed text-lg">This action is permanent and cannot be reversed. Are you sure?</p>
            <div className="flex gap-6">
               <button onClick={() => setTaskToDeleteId(null)} className="flex-1 py-5 text-[15px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Go Back</button>
               <button onClick={executeDeleteTask} className="flex-1 py-5 bg-rose-500 text-white rounded-[1.25rem] text-[15px] font-black uppercase tracking-widest shadow-2xl shadow-rose-500/20 active:scale-95 transition-all">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {showSettings && <BoardSettings board={board} onUpdateBoard={(u) => { onUpdateBoard(u); onAddSnack('Settings Updated', 'success'); }} onClose={() => setShowSettings(false)} />}
      
      {showAddColumnPopup && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[2.5rem] p-12 w-full max-w-[460px] shadow-2xl animate-scale-up border border-white">
            <div className="flex items-center gap-4 mb-10">
              <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                 <Columns size={24} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">New Pipeline</h3>
            </div>
            <input autoFocus className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-7 py-5 text-lg font-black focus:bg-white focus:border-primary/50 outline-none transition-all shadow-inner mb-12" value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} placeholder="e.g. Quality Assurance" onKeyDown={(e) => e.key === 'Enter' && handleAddColumn()} />
            <div className="flex gap-6">
               <button onClick={() => setShowAddColumnPopup(false)} className="flex-1 py-5 text-[14px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">Cancel</button>
               <button onClick={handleAddColumn} className="flex-1 py-5 bg-primary text-white rounded-[1.25rem] text-[14px] font-black uppercase tracking-widest shadow-2xl shadow-primary/20 active:scale-95 transition-all">Add Column</button>
            </div>
          </div>
        </div>
      )}

      {(showCreateTask || showEditTask) && (
        <TaskModal 
          boardName={board.title} 
          boardIcon={board.icon}
          members={board.members}
          columns={board.columns}
          initialTask={showEditTask ? selectedTask! : undefined}
          onCreate={(t) => {
            if (showEditTask && selectedTask) {
              onUpdateTasks(board.tasks.map(task => task.id === selectedTask.id ? { ...task, ...t } : task));
              setShowEditTask(false);
              setSelectedTask(null);
              onAddSnack(`Task Updated`, 'info');
            } else {
              onUpdateTasks([...board.tasks, { ...t as Task, id: `TSK-${Math.floor(Math.random() * 9000 + 1000)}`, subtasks: [], attachments: [], versions: [] }]);
              setShowCreateTask(false);
              onAddSnack(`Task Created`, 'success');
            }
          }} 
          onClose={() => { setShowCreateTask(false); setShowEditTask(false); }} 
        />
      )}

      {selectedTask && !showEditTask && (
        <TaskDetailView 
          task={selectedTask} 
          members={board.members}
          boardName={board.title}
          onClose={() => setSelectedTask(null)} 
          onUpdateTask={(updatedTask) => { onUpdateTasks(board.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)); setSelectedTask(null); onAddSnack(`Saved`, 'info'); }}
          onDeleteTask={(id) => { setTaskToDeleteId(id); }}
          onEdit={() => setShowEditTask(true)}
        />
      )}
    </div>
  );
};

// Moved helper components here and ensured they are declared only once.
const TaskCard: React.FC<{ task: Task, onClick: () => void, onDragStart: (e: React.DragEvent) => void }> = ({ task, onClick, onDragStart }) => {
  const getStyle = (p: string, s: string) => {
    if (s === 'Completed') return { badge: 'bg-emerald-50 text-emerald-600', bar: 'bg-emerald-500', label: 'DONE' };
    switch (p) {
      case 'Urgent': return { badge: 'bg-rose-50 text-rose-600', bar: 'bg-rose-500', label: 'URGENT' };
      case 'High': return { badge: 'bg-orange-50 text-orange-600', bar: 'bg-orange-500', label: 'HIGH' };
      default: return { badge: 'bg-sky-50 text-sky-600', bar: 'bg-sky-500', label: 'NORMAL' };
    }
  };
  const style = getStyle(task.priority, task.status);
  return (
    <div draggable onDragStart={onDragStart} onClick={onClick} className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/30 border border-slate-100 hover:shadow-primary/10 hover:-translate-y-4 transition-all duration-500 cursor-pointer relative overflow-hidden group active:scale-[0.98]">
      <div className={`absolute top-0 left-0 w-2 h-full ${style.bar} opacity-10 group-hover:opacity-100 transition-all duration-500`}></div>
      <div className="mb-10 flex justify-between items-start">
        <span className={`text-[12px] font-black uppercase tracking-[0.25em] px-6 py-2.5 rounded-2xl ${style.badge}`}>{style.label}</span>
      </div>
      <h4 className="font-black text-slate-900 text-2xl mb-10 leading-snug group-hover:text-primary transition-colors line-clamp-2 tracking-tight">{task.title}</h4>
      <div className="flex items-center justify-between pt-10 border-t border-slate-50">
        <div className="flex items-center gap-3 text-[15px] font-black text-slate-400 group-hover:text-slate-900 transition-colors">
            <Calendar size={20} className="text-slate-300" />
            <span>{task.dueDate}</span>
        </div>
        <div className="flex -space-x-4">
           {task.assignees.map((a, i) => <img key={i} src={a} className="size-11 rounded-2xl border-4 border-white shadow-xl object-cover ring-2 ring-slate-100" alt="member" />)}
        </div>
      </div>
    </div>
  );
};

const SidebarNavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, primaryColor?: string }> = ({ icon, label, active = false, onClick, primaryColor = 'text-primary' }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl text-[16px] font-black transition-all active:scale-95 ${active ? `bg-primary/5 ${primaryColor} border-2 border-primary/10 shadow-lg shadow-primary/5` : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600 border-2 border-transparent'}`}>
    <span className="shrink-0">{icon}</span>
    {label}
  </button>
);

const StatPill = ({ label, value, color = 'text-slate-900' }: any) => (
  <div className="flex flex-col items-center gap-2">
    <p className={`text-[28px] font-black leading-none ${color}`}>{value}</p>
    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{label}</p>
  </div>
);

const CommunityChatPanel: React.FC<{ comments: Comment[], onClose: () => void }> = ({ comments, onClose }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Comments' | 'Activity'>('All');
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [comments]);

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] flex flex-col z-[100] animate-slide-in border-l border-slate-100">
      <header className="px-12 py-10 shrink-0 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="size-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20">
              <MessageCircle size={32} strokeWidth={2.5} />
            </div>
            <div>
               <h3 className="font-black text-slate-900 text-2xl tracking-tight leading-none">Activity Feed</h3>
               <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-2">Team Engagement</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-400">
            <X size={32} />
          </button>
        </div>
        <div className="flex bg-slate-100 p-2 rounded-2xl border-2 border-white shadow-inner">
          {['All', 'Comments', 'Activity'].map((t) => (
            <button key={t} onClick={() => setActiveTab(t as any)} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
          ))}
        </div>
      </header>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 scrollbar-hide bg-slate-50/30">
        {comments.map((c) => (
          <React.Fragment key={c.id}>
            {c.dateLabel && <div className="flex justify-center py-6"><span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] px-8 py-3 rounded-full border-2 border-white bg-white shadow-sm">{c.dateLabel}</span></div>}
            {c.type === 'activity' ? (
              <div className="flex gap-6 px-4">
                <div className="size-12 rounded-[1.25rem] bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center text-slate-400">
                  <History size={24} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[15px] font-bold text-slate-800">{c.userName} <span className="text-slate-400 font-medium">{c.text}</span> <span className="text-emerald-500 font-black">{c.statusChange}</span></p>
                  <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{c.timestamp}</span>
                </div>
              </div>
            ) : (
              <div className="flex gap-6">
                <img src={c.userAvatar} className="size-12 rounded-[1.25rem] object-cover border-4 border-white shadow-2xl" alt="u" />
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[16px] font-black text-slate-900">{c.userName}</span>
                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{c.timestamp}</span>
                  </div>
                  <div className="bg-white p-7 rounded-[2rem] border-2 border-white shadow-xl shadow-slate-200/20 text-[15px] font-bold text-slate-600 leading-relaxed">
                    {c.text}
                    {c.attachment && (
                      <div className="mt-6 p-4 bg-slate-50 rounded-2xl border-2 border-white flex items-center gap-4 group cursor-pointer hover:bg-white transition-all">
                        <div className="size-12 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center"><ImageIcon size={24} /></div>
                        <div className="flex-1 min-w-0"><p className="text-sm font-black text-slate-800 truncate">{c.attachment.name}</p><p className="text-[11px] text-slate-400 font-black mt-0.5">{c.attachment.size}</p></div>
                        <Download size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {c.reactions?.map(r => (
                      <button key={r.emoji} className={`px-4 py-1.5 rounded-full text-xs font-black border-2 transition-all flex items-center gap-2 ${r.userReacted ? 'bg-primary/5 border-primary text-primary shadow-lg shadow-primary/10' : 'bg-white border-slate-50 text-slate-400 hover:border-slate-200'}`}>{r.emoji} {r.count}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="p-10 border-t border-slate-100 bg-white">
        <div className="bg-slate-50 rounded-[2rem] p-6 border-2 border-slate-100 focus-within:bg-white focus-within:border-primary/50 focus-within:ring-[12px] focus-within:ring-primary/5 transition-all">
          <textarea className="w-full bg-transparent border-none focus:ring-0 text-[16px] font-bold text-slate-700 placeholder-slate-300 resize-none h-28" placeholder="Share your thoughts..." value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-slate-200/30">
            <div className="flex gap-2">
              <button className="p-2.5 text-slate-300 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"><Plus size={22} /></button>
              <button className="p-2.5 text-slate-300 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"><ImageIcon size={22} /></button>
            </div>
            <button className="bg-primary text-white px-8 py-3.5 rounded-2xl text-[13px] font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">Send <Send size={18} strokeWidth={3} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;