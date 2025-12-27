
import React from 'react';
import { Task, Member } from '../../types/board.types';
import { 
  CheckCircle2, 
  X, 
  Edit3, 
  Share2, 
  MoreHorizontal, 
  Flag, 
  Calendar, 
  UserPlus, 
  Plus, 
  Download, 
  Trash2,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

interface TaskDetailViewProps {
  task: Task;
  members: Member[];
  boardName: string;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onEdit: () => void;
}

const TaskDetailView: React.FC<TaskDetailViewProps> = ({ 
  task, 
  boardName, 
  onClose, 
  onDeleteTask,
  onEdit
}) => {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-[950px] h-[90vh] flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in-up border border-white">
        <header className="flex-none flex items-start justify-between p-10 border-b border-slate-100 bg-white/50 backdrop-blur-sm z-10">
          <div className="flex flex-col gap-4 flex-1 mr-8">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60 shadow-sm">
                <CheckCircle2 size={16} className="text-primary" />
                <span className="font-bold text-slate-700">{boardName}</span>
              </div>
              <span className="text-slate-300 font-bold">/</span>
              <div className="flex items-center gap-1 font-black uppercase tracking-widest text-[11px] text-slate-400">
                {task.id}
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">
              {task.title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onEdit} className="p-3 rounded-2xl bg-primary text-white hover:bg-primary-dark transition-all flex items-center gap-2 px-6 py-3.5 shadow-lg shadow-primary/25 hover:-translate-y-1 active:scale-95">
              <Edit3 size={18} strokeWidth={2.5} />
              <span className="text-xs font-black uppercase tracking-widest">Edit Task</span>
            </button>
            <button className="p-3 rounded-2xl hover:bg-slate-100 text-slate-500 transition-all border border-transparent hover:border-slate-200">
              <Share2 size={22} />
            </button>
            <button className="p-3 rounded-2xl hover:bg-slate-100 text-slate-500 transition-all border border-transparent hover:border-slate-200">
              <MoreHorizontal size={22} />
            </button>
            <button onClick={onClose} className="p-3 rounded-2xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all ml-2">
              <X size={26} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-10 lg:p-14 space-y-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-inner">
            <MetaItem label="Status" value={task.status} icon={CheckCircle2} colorClass="bg-blue-50 text-blue-700 border-blue-100" />
            <MetaItem label="Priority" value={`${task.priority} Priority`} icon={Flag} colorClass="bg-rose-50 text-rose-700 border-rose-100" />
            
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Team</span>
              <div className="flex items-center -space-x-3">
                {task.assignees.map((a, i) => (
                  <img key={i} src={a} className="w-11 h-11 rounded-2xl ring-4 ring-white shadow-md object-cover" alt="u" />
                ))}
                <button className="w-11 h-11 rounded-2xl ring-4 ring-white bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 border-2 border-slate-100 transition-all hover:scale-110">
                  <UserPlus size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Deadline</span>
              <div className="flex items-center gap-3 text-slate-900 font-black text-sm h-11 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <Calendar size={18} className="text-slate-300" />
                <span>{task.dueDate}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Description</h3>
              <button onClick={onEdit} className="text-[11px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2 hover:underline transition-all">
                <Edit3 size={14} /> Update Content
              </button>
            </div>
            <div className="text-slate-600 text-xl leading-relaxed font-medium bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              {task.description || "No project description provided for this task yet."}
            </div>
          </div>

          <div className="bg-[#F8FAFF] rounded-[2.5rem] p-10 border border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-5">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Roadmap</h3>
                <span className="bg-white text-primary px-4 py-1.5 rounded-full text-[11px] font-black border border-primary/10 shadow-sm">1 / 3 COMPLETE</span>
              </div>
              <button className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-all">
                <Plus size={18} /> New Milestone
              </button>
            </div>
            <div className="h-3 w-full bg-slate-200/70 rounded-full mb-10 overflow-hidden shadow-inner">
              <div className="h-full bg-primary rounded-full w-1/3 shadow-[0_0_20px_rgba(14,165,233,0.5)] transition-all duration-1000 ease-out"></div>
            </div>
            <div className="space-y-5">
              {task.subtasks.map((sub) => (
                <div key={sub.id} className="flex items-center gap-5 group p-2 hover:bg-white rounded-2xl transition-all">
                  <div className={`size-7 rounded-xl border-2 flex items-center justify-center transition-all ${sub.completed ? 'bg-primary border-primary shadow-lg shadow-primary/20' : 'bg-white border-slate-200 group-hover:border-primary'}`}>
                    {sub.completed && <CheckCircle2 size={16} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-lg font-bold ${sub.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{sub.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Project Assets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {task.attachments.map((att) => (
                <div key={att.id} className="group relative bg-white p-5 rounded-[1.8rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer flex items-center gap-5 overflow-hidden active:scale-95">
                  <div className={`w-14 h-14 ${att.type === 'image' ? 'bg-purple-50 text-purple-600' : 'bg-rose-50 text-rose-500'} rounded-2xl flex items-center justify-center shrink-0`}>
                    {att.type === 'image' ? <ImageIcon size={26} /> : <FileText size={26} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-black text-slate-900 truncate">{att.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{att.size}</p>
                  </div>
                  <button className="absolute right-4 opacity-0 group-hover:opacity-100 p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">
                    <Download size={18} className="text-slate-700" />
                  </button>
                </div>
              ))}
              <div className="border-2 border-dashed border-slate-200 rounded-[1.8rem] flex flex-col items-center justify-center p-5 cursor-pointer hover:bg-slate-50 transition-all text-slate-400 hover:text-primary hover:border-primary/50 gap-2 group">
                <Plus size={32} className="group-hover:rotate-90 transition-transform" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">Upload File</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="flex-none p-8 lg:px-14 bg-white border-t border-slate-100 flex items-center justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.03)] z-20">
          <div className="flex gap-5">
            <button onClick={() => onDeleteTask?.(task.id)} className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-rose-50 text-rose-600 text-sm font-black hover:bg-rose-100 transition-all hover:scale-105">
              <Trash2 size={20} />
              <span>Delete Task</span>
            </button>
            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-100 text-slate-600 text-sm font-black hover:bg-slate-200 transition-all">
              <UserPlus size={20} />
              <span>Handover</span>
            </button>
          </div>
          <button onClick={onClose} className="flex items-center gap-4 px-12 py-4 rounded-2xl bg-slate-900 text-white text-sm font-black shadow-2xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all">
            <CheckCircle2 size={22} className="text-emerald-400" strokeWidth={3} />
            Complete Task
          </button>
        </footer>
      </div>
    </div>
  );
};

const MetaItem: React.FC<{ label: string, value: string, icon: any, colorClass: string }> = ({ label, value, icon: Icon, colorClass }) => (
  <div className="flex flex-col gap-3">
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</span>
    <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl w-fit border shadow-sm ${colorClass} transition-all hover:scale-105`}>
      <Icon size={18} strokeWidth={2.5} />
      <span className="text-[13px] font-black tracking-tight">{value}</span>
    </div>
  </div>
);

export default TaskDetailView;
