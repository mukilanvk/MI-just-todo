
import React from 'react';
import { X, FilePlus, AlertCircle, BellOff, AtSign } from 'lucide-react';

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      title: "Design System Update",
      time: "2m",
      text: "Alex assigned you to the task 'Iconography Set'.",
      icon: FilePlus,
      color: "text-sky-500",
      bg: "bg-sky-50",
      dot: "bg-sky-500"
    },
    {
      id: 2,
      title: "New Comment",
      time: "1h",
      text: "Sarah mentioned you in #marketing: \"Can we review this mockup?\"",
      avatar: "https://picsum.photos/seed/sarah/40/40",
      dot: "bg-violet-500",
      mention: true
    },
    {
      id: 3,
      title: "Q3 Report Overdue",
      time: "2h",
      text: "This task is now overdue by 2 hours. Please provide an update.",
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      dot: "bg-red-500",
      urgent: true
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-[400px] h-full glass-panel bg-white/90 shadow-2xl animate-slide-in flex flex-col border-l border-white/60">
        <header className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-slate-800 text-xl font-bold tracking-tight">Notifications</h2>
              <span className="flex items-center justify-center bg-primary text-white text-[10px] font-bold h-5 min-w-[20px] px-1.5 rounded-full shadow-sm">4</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all">
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex p-1 bg-slate-100 rounded-lg border border-white w-fit">
              {['All', 'Mentions', 'Updates'].map((tab, i) => (
                <button key={tab} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${i === 0 ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <button className="text-primary text-xs font-bold hover:underline">Mark all read</button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          <div className="flex items-center justify-between px-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">New</p>
            <span className="text-[10px] text-slate-300 font-medium">Wednesday, Oct 24</span>
          </div>

          {notifications.map((notif, idx) => (
            <div key={notif.id} className={`glass-card rounded-2xl p-4 flex gap-4 cursor-pointer hover:shadow-lg transition-all animate-fade-in-up`} style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="relative shrink-0">
                {notif.avatar ? (
                  <img src={notif.avatar} className="w-10 h-10 rounded-xl object-cover border border-white shadow-sm" alt="user" />
                ) : (
                  <div className={`w-10 h-10 rounded-xl ${notif.bg} border border-white/60 flex items-center justify-center shadow-sm`}>
                    {notif.icon && <notif.icon className={notif.color} size={20} />}
                  </div>
                )}
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ${notif.dot} border-2 border-white shadow-sm flex items-center justify-center`}>
                  {notif.mention && <AtSign size={8} className="text-white" strokeWidth={4} />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <p className="text-sm font-bold text-slate-800 truncate">{notif.title}</p>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{notif.text}</p>
              </div>
            </div>
          ))}

          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <div className="size-20 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
               <BellOff size={32} className="text-slate-300" />
            </div>
            <h3 className="text-slate-800 font-bold text-sm">All caught up!</h3>
            <p className="text-slate-400 text-xs mt-1">Enjoy the peace and quiet.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
