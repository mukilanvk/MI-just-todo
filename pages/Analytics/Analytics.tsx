
import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Share, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  SlidersHorizontal,
  Download,
  Info,
  Cpu,
  Activity,
  ClipboardList,
  Hourglass,
  CalendarOff,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  return (
    <main className="w-full px-6 py-8 lg:px-10 lg:py-10 space-y-10 animate-fade-in relative bg-[#F8FBFF]">
      {/* Background Blobs (Themed) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-emerald-400/10 blur-[80px] animate-float"></div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-1 leading-none">Detailed Analysis</h2>
          <p className="text-slate-400 text-lg font-medium tracking-tight">In-depth insights into your productivity patterns.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-white/80 backdrop-blur-xl p-1.5 rounded-2xl border border-white shadow-xl shadow-slate-200/20">
            <button className="size-10 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all">
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <div className="flex items-center gap-2 px-6 py-2 cursor-pointer hover:bg-slate-50 rounded-xl transition-all">
              <Calendar size={18} className="text-primary" />
              <span className="text-slate-700 font-black text-xs uppercase tracking-widest">Oct 1 - Oct 31</span>
            </div>
            <button className="size-10 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all">
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-emerald-500 hover:brightness-110 text-white rounded-[1.25rem] text-xs font-black shadow-2xl shadow-primary/20 active:scale-95 group tracking-[0.15em] uppercase">
            <Share size={18} strokeWidth={2.5} className="group-hover:-translate-y-0.5 transition-transform" />
            Export Data
          </button>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="glass-card w-full rounded-[2.5rem] relative border-l-[12px] border-l-primary shadow-[0_30px_70px_-15px_rgba(0,0,0,0.06)] overflow-hidden bg-white/70">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
          <div className="absolute -left-10 bottom-0 w-64 h-64 bg-emerald-400 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="relative z-10 p-10 lg:p-12 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-inner">
                <Cpu size={28} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-[0.25em]">Executive Summary</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3 flex flex-col justify-center border-r-2 border-slate-50/80 pr-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Overall Efficiency</p>
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-black bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent leading-none tracking-tighter">89</span>
                <span className="text-2xl font-black text-slate-300">/100</span>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <div className="size-6 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 shadow-sm">
                  <TrendingUp size={14} strokeWidth={3} />
                </div>
                <span className="text-base font-black text-emerald-500">+12% <span className="text-slate-300 font-bold ml-1 tracking-tight">vs last period</span></span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center space-y-8 lg:px-10">
              <HighlightItem 
                icon={CheckCircle2} 
                title="Completion Rate Peaked" 
                desc="Task completion reached 92% this week, driven by the Engineering team."
                color="text-primary"
                bg="bg-blue-50"
              />
              <HighlightItem 
                icon={Clock} 
                title="Efficiency Improvement" 
                desc="Average task turnaround time reduced by 4.5 hours compared to last month."
                color="text-accent-purple"
                bg="bg-purple-50"
              />
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[2rem] bg-rose-50/50 border-2 border-rose-100/30 p-8 relative group overflow-hidden shadow-xl shadow-rose-200/10">
                <div className="absolute -right-10 -top-10 size-40 bg-rose-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform" />
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.25em] flex items-center gap-2">
                    <AlertCircle size={16} strokeWidth={3} /> Urgent Actions
                  </h4>
                  <span className="bg-white/80 px-3 py-1 rounded-xl text-[10px] font-black text-rose-600 border border-rose-100 shadow-sm">2 CRITICAL</span>
                </div>
                <div className="space-y-3 relative z-10">
                  <ActionItem title="Review Overdue Approvals" sub="3 tasks blocked > 48hrs" />
                  <ActionItem title="Resource Allocation" sub="Design team at 110% capacity" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Stat Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        <MiniMetric icon="assignment" val="164" label="Total" color="blue" />
        <MiniMetric icon="task_alt" val="98" label="Completed" color="emerald" trend="+12%" />
        <MiniMetric icon="pending_actions" val="42" label="Working" color="purple" />
        <MiniMetric icon="hourglass_top" val="18" label="Pending" color="orange" />
        <MiniMetric icon="event_busy" val="6" label="Overdue" color="rose" alert />
      </div>

      {/* Productivity Trends and Breakdown Row (Matches Top Section of Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productivity Trend Card */}
        <div className="glass-card p-10 rounded-[3rem] lg:col-span-2 space-y-10 bg-white/70">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Productivity Trend</h3>
              <p className="text-sm text-slate-400 font-bold tracking-tight">Daily performance fluctuation</p>
            </div>
            <div className="flex items-center gap-8 pt-1">
               <LegendItem color="bg-primary" label="Score" />
               <LegendItem color="bg-slate-200" label="Avg" />
            </div>
          </div>
          <div className="h-64 w-full relative group px-2">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1085f9" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1085f9" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,300 L0,180 C150,180 250,220 350,140 S550,120 700,80 S850,180 1000,160 L1000,300 Z" fill="url(#trendGradient)" className="transition-all duration-700" />
              <path d="M0,180 C150,180 250,220 350,140 S550,120 700,80 S850,180 1000,160" fill="none" stroke="#1085f9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-xl shadow-primary/20" />
              {/* Dynamic markers from screenshot */}
              <circle cx="350" cy="140" r="10" fill="white" stroke="#1085f9" strokeWidth="4" className="cursor-pointer shadow-lg hover:r-12 transition-all" />
              <circle cx="700" cy="80" r="12" fill="white" stroke="#10b981" strokeWidth="5" className="animate-pulse cursor-pointer shadow-lg" />
            </svg>
            <div className="flex justify-between mt-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] px-2">
               <span>Oct 1</span>
               <span>Oct 15</span>
               <span>Oct 31</span>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="glass-card p-10 rounded-[3rem] flex flex-col items-center bg-white/70">
          <div className="w-full space-y-2 mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Breakdown</h3>
            <p className="text-sm text-slate-400 font-bold tracking-tight">Task distribution</p>
          </div>
          <div className="relative size-56 mb-12 group">
            <svg className="w-full h-full -rotate-90 transform transition-transform duration-700 group-hover:scale-105" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1085f9" strokeDasharray="100 251.2" strokeWidth="12" className="transition-all duration-500 hover:stroke-[15] opacity-90" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeDasharray="80 251.2" strokeDashoffset="-105" strokeWidth="12" className="transition-all opacity-90" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeDasharray="40 251.2" strokeDashoffset="-190" strokeWidth="12" className="transition-all opacity-90" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeDasharray="25 251.2" strokeDashoffset="-235" strokeWidth="12" className="transition-all opacity-90" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">142</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Tasks</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-5 w-full">
             <DonutItem label="DEV" val="40%" color="bg-blue-500" />
             <DonutItem label="DESIGN" val="32%" color="bg-emerald-500" />
             <DonutItem label="ADMIN" val="18%" color="bg-purple-500" />
             <DonutItem label="MEET" val="10%" color="bg-orange-400" />
          </div>
        </div>
      </div>

      {/* Actual vs Estimated (Matches Bottom Section of Screenshot) */}
      <div className="glass-card w-full p-10 lg:p-12 rounded-[3.5rem] space-y-10 bg-white/70 shadow-2xl animate-fade-in border-white">
        <div className="flex justify-between items-center px-4">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Time: Actual vs. Estimated</h3>
            <p className="text-lg text-slate-400 font-bold tracking-tight">Daily trend comparison (Last 10 days)</p>
          </div>
          <div className="flex gap-10 pr-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/20"></div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Estimated</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-1.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/20"></div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Actual</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-72 w-full group px-6">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
            <defs>
              <linearGradient id="actualGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.1"></stop>
                <stop offset="100%" stopColor="#10b981" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient id="estGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1085f9" stopOpacity="0.1"></stop>
                <stop offset="100%" stopColor="#1085f9" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            {[160, 110, 60].map(y => (
              <line key={y} stroke="#f1f5f9" strokeDasharray="10,10" strokeWidth="2" x1="0" x2="1000" y1={y} y2={y}></line>
            ))}
            {/* Estimated Path */}
            <path d="M0,200 L0,120 C150,120 250,80 350,110 S550,140 700,90 S850,80 1000,100 L1000,200 Z" fill="url(#estGrad)" className="opacity-50"></path>
            <path d="M0,120 C150,120 250,80 350,110 S550,140 700,90 S850,80 1000,100" fill="none" stroke="#60a5fa" strokeWidth="7" strokeLinecap="round" className="drop-shadow-lg"></path>
            {/* Actual Path */}
            <path d="M0,200 L0,150 C150,150 250,130 350,160 S550,80 700,100 S850,110 1000,60 L1000,200 Z" fill="url(#actualGrad)" className="opacity-60"></path>
            <path d="M0,150 C150,150 250,130 350,160 S550,80 700,100 S850,110 1000,60" fill="none" stroke="#4ade80" strokeWidth="7" strokeLinecap="round" className="drop-shadow-lg"></path>
            {/* Dots matches the intersection style in image */}
            <circle cx="350" cy="110" r="8" fill="white" stroke="#60a5fa" strokeWidth="4" className="cursor-pointer shadow-xl" />
            <circle cx="700" cy="100" r="8" fill="white" stroke="#4ade80" strokeWidth="4" className="cursor-pointer shadow-xl" />
            <circle cx="950" cy="70" r="10" fill="white" stroke="#4ade80" strokeWidth="5" className="animate-pulse shadow-xl" />
          </svg>
          <div className="flex justify-between mt-12 text-[11px] font-black text-slate-300 uppercase tracking-[0.5em] px-4">
            {['Oct 20', 'Oct 22', 'Oct 24', 'Oct 26', 'Oct 28', 'Oct 30'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>
      
      <div className="text-center opacity-40 pt-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2024 Productivity Pro • Intelligence Dashboard</p>
      </div>
    </main>
  );
};

const HighlightItem = ({ icon: Icon, title, desc, color, bg }: any) => (
  <div className="flex gap-6 items-start group">
    <div className={`mt-1 size-14 rounded-2xl ${bg} flex items-center justify-center ${color} shrink-0 group-hover:scale-110 transition-transform shadow-xl shadow-slate-200/20`}>
      <Icon size={28} strokeWidth={2.5} />
    </div>
    <div className="space-y-1.5">
      <p className="text-xl font-black text-slate-800 tracking-tight leading-none">{title}</p>
      <p className="text-base text-slate-400 font-bold leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ActionItem = ({ title, sub }: { title: string; sub: string }) => (
  <button className="w-full flex items-center justify-between p-5 bg-white/80 hover:bg-white rounded-[1.5rem] border-2 border-rose-100/40 shadow-lg shadow-rose-500/5 transition-all text-left group/item active:scale-[0.98]">
    <div className="flex flex-col gap-1">
      <span className="text-sm font-black text-slate-800 tracking-tight">{title}</span>
      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{sub}</span>
    </div>
    <ChevronRightIcon size={18} className="text-slate-300 group-hover/item:text-rose-500 transition-colors" />
  </button>
);

const MiniMetric = ({ icon, val, label, color, trend, alert }: any) => {
  const iconMap: any = {
    assignment: ClipboardList,
    task_alt: CheckCircle2,
    pending_actions: Clock,
    hourglass_top: Hourglass,
    event_busy: CalendarOff
  };
  const Icon = iconMap[icon] || Activity;

  return (
    <div className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group bg-white shadow-xl shadow-slate-100/50">
      <div className={`absolute -right-4 -top-4 w-28 h-28 bg-${color}-400/10 rounded-full blur-2xl group-hover:scale-150 transition-all`} />
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className={`p-3 bg-${color}-50 text-${color}-600 rounded-2xl shadow-xl shadow-slate-100/50 group-hover:scale-110 transition-all`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {trend && <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl text-[10px] font-black border-2 border-emerald-100/50">{trend}</span>}
        {alert && <div className="size-6 bg-rose-50 border-2 border-rose-100 flex items-center justify-center rounded-full text-rose-500 text-xs font-black animate-bounce">!</div>}
      </div>
      <div className="relative z-10 space-y-1">
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{val}</h3>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">{label}</p>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-3">
    <div className={`size-3 rounded-full ${color} shadow-lg`} />
    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</span>
  </div>
);

const DonutItem = ({ label, val, color }: { label: string; val: string; color: string }) => (
  <div className="flex items-center justify-between group cursor-default">
    <div className="flex items-center gap-3">
      <div className={`size-3 rounded-full ${color} group-hover:scale-125 transition-transform`} />
      <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">{label}</span>
    </div>
    <span className="text-[12px] font-black text-slate-900 tracking-tight">{val}</span>
  </div>
);

export default AnalyticsPage;
