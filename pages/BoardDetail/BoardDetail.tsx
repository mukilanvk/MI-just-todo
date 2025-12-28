
import React, { useState, useMemo, useRef, useEffect } from 'react';
import BoardSettings from '../../components/BoardSettings/BoardSettings';
import TaskModal from '../../components/TaskModal/TaskModal';
import TaskDetailView from '../../components/TaskDetailView/TaskDetailView';
import { Board, Task, Column, Comment } from '../../types/board.types';
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
  Image as ImageIcon,
  Clock,
  ChevronRight
} from 'lucide-react';

interface BoardDetailProps {
  board: Board;
  onBack: () => void;
  onUpdateTasks: (tasks: Task[]) => void;
  onUpdateBoard: (updatedBoard: Partial<Board>) => void;
  onAddSnack: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const BoardDetail: React.FC<BoardDetailProps> = ({ board, onUpdateTasks, onUpdateBoard, onAddSnack }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddColumnPopup, setShowAddColumnPopup] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [showCommunityChat, setShowCommunityChat] = useState(false);
  const [activeTab, setActiveTab] = useState<'Board' | 'List'>('Board');
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(board.columns.map(c => c.title));
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<string[]>([]);

  const filteredTasks = useMemo(() => {
    return board.tasks.filter(task => {
      const matchesStatus = selectedStatuses.includes(task.status);
      const matchesAssignee = selectedAssigneeIds.length === 0 || 
        task.assignees.some(avatar => board.members.find(m => m.avatar === avatar && selectedAssigneeIds.includes(m.id)));
      return matchesStatus && matchesAssignee;
    });
  }, [board.tasks, selectedStatuses, selectedAssigneeIds, board.members]);

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
      onAddSnack(`Moved to ${newStatus}`, 'info');
    }
  };

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;
    const newCol: Column = {
      id: Math.random().toString(36).substr(2, 9),
      title: newColumnName,
      color: 'bg-primary'
    };
    onUpdateBoard({ columns: [...board.columns, newCol] });
    setSelectedStatuses([...selectedStatuses, newColumnName]);
    setNewColumnName('');
    setShowAddColumnPopup(false);
    onAddSnack(`Pipeline created`, 'success');
  };

  const executeDeleteTask = () => {
    if (!taskToDeleteId) return;
    const updatedTasks = board.tasks.filter(t => t.id !== taskToDeleteId);
    onUpdateTasks(updatedTasks);
    setTaskToDeleteId(null);
    setSelectedTask(null);
    onAddSnack(`Task removed`, 'info');
  };

  const doneCount = board.tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = board.tasks.length > 0 ? Math.round((doneCount / board.tasks.length) * 100) : 0;

  const getIconComponent = (iconName: string, size = 20) => {
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
    <div className="flex h-full w-full bg-[#F8FBFF] overflow-hidden font-sans relative">
      {/* Refined Sidebar */}
      <aside className="w-64 shrink-0 bg-white border-r border-slate-100 flex flex-col p-6 overflow-y-auto scrollbar-hide z-20 shadow-sm">
        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 px-1">Views</p>
          <div className="space-y-1.5">
            <SidebarNavItem icon={<LayoutDashboard size={18} />} label="Board" active={activeTab === 'Board'} onClick={() => setActiveTab('Board')} />
            <SidebarNavItem icon={<List size={18} />} label="List" active={activeTab === 'List'} onClick={() => setActiveTab('List')} />
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Pipelines</h4>
            <button onClick={() => setSelectedStatuses(board.columns.map(c => c.title))} className="text-[10px] font-black text-primary hover:underline">Reset</button>
          </div>
          <div className="space-y-3">
            {board.columns.map(col => (
              <label key={col.id} className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 p-1.5 rounded-lg transition-all">
                <div className="flex items-center gap-3">
                  <div className={`size-4 rounded border flex items-center justify-center transition-all ${selectedStatuses.includes(col.title) ? 'bg-primary border-primary shadow-sm' : 'border-slate-300 bg-white'}`}>
                    {selectedStatuses.includes(col.title) && <Check size={10} className="text-white" strokeWidth={4} />}
                    <input type="checkbox" className="hidden" checked={selectedStatuses.includes(col.title)} onChange={() => {
                        setSelectedStatuses(prev => prev.includes(col.title) ? prev.filter(s => s !== col.title) : [...prev, col.title]);
                      }} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{col.title}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-300">{board.tasks.filter(t => t.status === col.title).length}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Team</h4>
          </div>
          <div className="space-y-2">
            {board.members.map(member => (
              <label key={member.id} className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1 rounded-lg transition-all">
                <div className={`size-4 rounded border flex items-center justify-center transition-all ${selectedAssigneeIds.includes(member.id) ? 'bg-primary border-primary shadow-sm' : 'border-slate-300 bg-white'}`}>
                  {selectedAssigneeIds.includes(member.id) && <Check size={10} className="text-white" strokeWidth={4} />}
                  <input type="checkbox" className="hidden" checked={selectedAssigneeIds.includes(member.id)} onChange={() => {
                      setSelectedAssigneeIds(prev => prev.includes(member.id) ? prev.filter(id => id !== member.id) : [...prev, member.id]);
                    }} />
                </div>
                <img src={member.avatar} className="size-7 rounded-lg border border-slate-100 shadow-sm object-cover" alt={member.name} />
                <span className="text-[12px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors truncate">{member.name}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Simplified Header */}
        <div className="shrink-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-6">
            <div className={`size-14 rounded-2xl bg-gradient-to-br ${board.gradient} shadow-lg flex items-center justify-center text-white`}>
               {getIconComponent(board.icon, 28)}
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">{board.title}</h1>
              <p className="text-slate-400 text-sm font-medium">{board.description || 'Project Workspace'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-8 px-6 py-3 bg-slate-50 rounded-xl border border-slate-100">
              <StatItem label="Tasks" value={board.tasks.length} />
              <StatItem label="Done" value={`${progressPercent}%`} color="text-emerald-500" />
              <StatItem label="Team" value={board.members.length} />
            </div>
            <button onClick={() => setShowSettings(true)} className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Board/List View Container */}
        <div className="flex-1 overflow-auto p-6 scrollbar-hide relative z-10">
          {activeTab === 'Board' ? (
            <div className="flex gap-6 items-start h-full">
              {board.columns.map(col => (
                <div key={col.id} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, col.title)} className="w-80 shrink-0 flex flex-col max-h-full">
                  <div className="flex items-center justify-between mb-4 px-3">
                    <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${col.color}`}></div>
                      <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">{col.title}</h3>
                      <span className="text-slate-400 text-[10px] font-black">{board.tasks.filter(t => t.status === col.title).length}</span>
                    </div>
                    <button className="text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide pb-20">
                    {filteredTasks.filter(t => t.status === col.title).map(task => (
                      <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} onDragStart={(e) => handleDragStart(e, task.id)} />
                    ))}
                    <button onClick={() => setShowCreateTask(true)} className="w-full py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-white hover:border-primary/40 hover:text-primary transition-all">
                      <Plus size={16} /> New Task
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={() => setShowAddColumnPopup(true)} className="w-80 shrink-0 h-12 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/80 hover:text-primary transition-all">
                <Columns size={18} /> New Pipeline
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-2 animate-fade-in w-full max-w-5xl mx-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-slate-100">
                        <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tasks</th>
                        <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Deadline</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredTasks.map(task => (
                        <tr key={task.id} onClick={() => setSelectedTask(task)} className="hover:bg-slate-50 transition-colors cursor-pointer group border-b border-slate-50 last:border-0">
                           <td className="py-4 px-6 font-bold text-slate-800 text-sm">{task.title}</td>
                           <td className="py-4 px-6">
                              <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-slate-100 text-slate-500">{task.status}</span>
                           </td>
                           <td className="py-4 px-6 text-right text-xs font-semibold text-slate-400">{task.dueDate}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          )}
        </div>

        {/* Fixed Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
           <button onClick={() => setShowCommunityChat(!showCommunityChat)} className={`size-12 rounded-xl ${showCommunityChat ? 'bg-indigo-600' : 'bg-slate-900'} text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-4 border-white`}>
            {showCommunityChat ? <X size={20} /> : <MessageCircle size={20} />}
          </button>
          <button onClick={() => setShowCreateTask(true)} className="size-14 rounded-2xl bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-4 border-white">
            <Plus size={28} strokeWidth={3} />
          </button>
        </div>
      </div>

      {showCommunityChat && <CommunityChatPanel comments={board.comments} onClose={() => setShowCommunityChat(false)} />}
      
      {taskToDeleteId && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-2xl text-center border border-white">
            <h3 className="text-xl font-black text-slate-900 mb-2">Delete Task?</h3>
            <p className="text-slate-500 font-medium mb-8 text-sm">This action cannot be undone.</p>
            <div className="flex gap-4">
               <button onClick={() => setTaskToDeleteId(null)} className="flex-1 py-3 text-sm font-bold text-slate-400 hover:text-slate-600">Cancel</button>
               <button onClick={executeDeleteTask} className="flex-1 py-3 bg-rose-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-500/20">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showSettings && <BoardSettings board={board} onUpdateBoard={(u) => { onUpdateBoard(u); onAddSnack('Settings updated', 'success'); }} onClose={() => setShowSettings(false)} />}
      
      {showAddColumnPopup && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl border border-white">
            <h3 className="text-lg font-black text-slate-900 mb-6">New Pipeline</h3>
            <input autoFocus className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-primary/50 outline-none transition-all mb-8" value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} placeholder="e.g. Backlog" onKeyDown={(e) => e.key === 'Enter' && handleAddColumn()} />
            <div className="flex gap-4">
               <button onClick={() => setShowAddColumnPopup(false)} className="flex-1 py-2.5 text-xs font-bold text-slate-400">Cancel</button>
               <button onClick={handleAddColumn} className="flex-1 py-2.5 bg-primary text-white rounded-lg text-xs font-bold shadow-lg">Create</button>
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
              onAddSnack(`Task saved`, 'info');
            } else {
              onUpdateTasks([...board.tasks, { ...t as Task, id: `TSK-${Math.floor(Math.random() * 9000 + 1000)}`, subtasks: [], attachments: [], versions: [] }]);
              setShowCreateTask(false);
              onAddSnack(`Task created`, 'success');
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

const TaskCard: React.FC<{ task: Task, onClick: () => void, onDragStart: (e: React.DragEvent) => void }> = ({ task, onClick, onDragStart }) => {
  const getPriorityStyle = (p: string) => {
    switch (p) {
      case 'Urgent': return 'text-rose-500';
      case 'High': return 'text-orange-500';
      default: return 'text-sky-500';
    }
  };

  return (
    <div draggable onDragStart={onDragStart} onClick={onClick} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group active:scale-[0.98]">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[9px] font-black uppercase tracking-wider ${getPriorityStyle(task.priority)} bg-slate-50 px-2 py-0.5 rounded`}>
          {task.priority}
        </span>
        <button className="text-slate-200 group-hover:text-slate-400 transition-colors">
          <MoreHorizontal size={14} />
        </button>
      </div>
      <h4 className="font-bold text-slate-800 text-sm mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{task.title}</h4>
      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            <Clock size={12} className="text-slate-300" />
            <span>{task.dueDate}</span>
        </div>
        <div className="flex -space-x-2">
           {task.assignees.slice(0, 2).map((a, i) => <img key={i} src={a} className="size-6 rounded-lg border-2 border-white shadow-sm object-cover" alt="member" />)}
           {task.assignees.length > 2 && <div className="size-6 rounded-lg bg-slate-50 border-2 border-white flex items-center justify-center text-[8px] font-black text-slate-400">+{task.assignees.length - 2}</div>}
        </div>
      </div>
    </div>
  );
};

const SidebarNavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }> = ({ icon, label, active = false, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold transition-all ${active ? 'bg-primary/5 text-primary shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
    <span className="shrink-0">{icon}</span>
    {label}
  </button>
);

const StatItem = ({ label, value, color = 'text-slate-900' }: any) => (
  <div className="flex flex-col">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
    <p className={`text-sm font-black leading-none ${color}`}>{value}</p>
  </div>
);

const CommunityChatPanel: React.FC<{ comments: Comment[], onClose: () => void }> = ({ comments, onClose }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [comments]);

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl flex flex-col z-[100] animate-slide-in border-l border-slate-100">
      <header className="px-6 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="size-9 bg-primary text-white rounded-xl flex items-center justify-center">
            <MessageCircle size={20} />
          </div>
          <h3 className="font-black text-slate-900 text-base tracking-tight">Activity Feed</h3>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400">
          <X size={20} />
        </button>
      </header>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide bg-slate-50/20">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-4">
            <img src={c.userAvatar} className="size-8 rounded-lg object-cover border-2 border-white shadow-sm" alt="u" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[13px] font-black text-slate-900">{c.userName}</span>
                <span className="text-[9px] font-black text-slate-300 uppercase">{c.timestamp}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-xs font-medium text-slate-600 leading-relaxed">
                {c.text}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <textarea className="w-full bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-700 placeholder-slate-300 resize-none h-16" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
          <div className="flex items-center justify-end mt-2">
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-[11px] font-black shadow-lg shadow-primary/20 flex items-center gap-2">
              Send <Send size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
