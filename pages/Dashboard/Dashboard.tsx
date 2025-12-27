
import React from 'react';
import { 
  Plus, 
  Settings2, 
  Trophy, 
  Activity, 
  Clock, 
  Users, 
  Brush, 
  Calendar, 
  MoreHorizontal 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-10 lg:p-14 pb-24 w-full bg-[#f8fbff] min-h-full">
      {/* Greeting Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Good Morning, Alex 👋</h1>
        <p className="text-slate-400 font-medium text-xl">Focus on being productive instead of busy.</p>
      </div>

      {/* Productivity Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <StatCard 
          label="Total Tasks" 
          value="12" 
          badge="+2 new" 
          badgeColor="bg-emerald-50 text-emerald-600" 
          barColor="bg-primary" 
          icon={Settings2} 
          iconBg="bg-blue-50 text-blue-500"
          percent={70}
        />
        <StatCard 
          label="Completed" 
          value="8" 
          badge="+5 this week" 
          badgeColor="bg-emerald-50 text-emerald-600" 
          barColor="bg-accent-purple" 
          icon={Trophy} 
          iconBg="bg-purple-50 text-purple-500"
          percent={45}
        />
        <StatCard 
          label="Efficiency Score" 
          value="85%" 
          badge="+12%" 
          badgeColor="bg-emerald-50 text-emerald-600" 
          barColor="bg-accent-orange" 
          icon={Activity} 
          iconBg="bg-orange-50 text-orange-500"
          percent={85}
        />
      </div>

      {/* Categorized Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* Overdue Tasks Column */}
        <div className="flex flex-col gap-6">
          <TaskCategoryCard 
            title="Due Passed" 
            accentColor="bg-rose-500" 
            badge="1 Task" 
            badgeColor="bg-rose-50 text-rose-500"
          >
            <TaskItem 
              tag="HIGH PRIORITY" 
              tagColor="bg-rose-50 text-rose-500"
              title="Review Q3 Report"
              subtitle="Yesterday"
              icon={Clock}
              statusLine="bg-rose-500"
            />
          </TaskCategoryCard>

          <TaskCategoryCard title="Today" accentColor="bg-accent-orange" showPlus>
            <TaskItem 
              tag="MEETING" 
              tagColor="bg-blue-50 text-blue-500"
              title="Client Kickoff Meeting"
              subtitle="2:00 PM"
              icon={Users}
            />
            <TaskItem 
              tag="DESIGN" 
              tagColor="bg-purple-50 text-purple-500"
              title="Update Figma Designs"
              icon={Brush}
            />
          </TaskCategoryCard>
        </div>

        {/* Current Week Tasks Column */}
        <div className="flex flex-col gap-6">
          <TaskCategoryCard 
            title="This Week" 
            accentColor="bg-sky-400" 
            badge="3 Tasks" 
            badgeColor="bg-sky-50 text-sky-600"
          >
            <TaskItem 
              tag="MARKETING" 
              tagColor="bg-emerald-50 text-emerald-600"
              title="Draft Email Campaign"
              subtitle="Thu, Oct 26"
              icon={Calendar}
              progress={30}
            />
            <TaskItem 
              tag="DEVELOPMENT" 
              tagColor="bg-orange-50 text-orange-500"
              title="Fix Navigation Bug"
              subtitle="Fri, Oct 27"
              icon={Calendar}
            />
          </TaskCategoryCard>
        </div>

        {/* Future Tasks Column */}
        <div className="flex flex-col gap-6">
          <TaskCategoryCard title="Next Week" accentColor="bg-fuchsia-500" showPlus>
             <TaskItem 
              tag="STRATEGY" 
              tagColor="bg-slate-100 text-slate-600"
              title="Quarterly Planning"
              subtitle="All Team"
              icon={Users}
            />
          </TaskCategoryCard>

          <TaskCategoryCard title="This Month" accentColor="bg-emerald-400">
             <TaskItem 
              tag="ADMIN" 
              tagColor="bg-slate-100 text-slate-600"
              title="Renew Software Licenses"
              subtitle="Due in 20 days"
              icon={Calendar}
            />
          </TaskCategoryCard>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, badge, badgeColor, barColor, icon: Icon, iconBg, percent }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-6 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-50">
    <div className="flex items-start justify-between">
      <div className={`size-12 rounded-2xl ${iconBg} flex items-center justify-center`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${badgeColor}`}>{badge}</span>
    </div>
    <div className="flex flex-col">
      <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</span>
      <span className="text-4xl font-black text-slate-900">{value}</span>
    </div>
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${barColor} transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }} />
    </div>
  </div>
);

const TaskCategoryCard = ({ title, children, accentColor, badge, badgeColor, showPlus }: any) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col border border-slate-50">
    <div className={`h-2 w-full ${accentColor}`} />
    <div className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`size-2.5 rounded-full ${accentColor}`} />
          <h3 className="font-black text-slate-800 text-lg tracking-tight">{title}</h3>
          {badge && <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${badgeColor}`}>{badge}</span>}
        </div>
        {showPlus && (
          <button className="text-slate-300 hover:text-slate-600 transition-colors">
            <Plus size={20} />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-10">
        {children}
      </div>
    </div>
  </div>
);

const TaskItem = ({ tag, tagColor, title, subtitle, icon: Icon, statusLine, progress }: any) => (
  <div className="flex flex-col gap-4 group cursor-pointer">
    <div className="flex justify-between items-start">
      <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.15em] ${tagColor}`}>{tag}</span>
      <button className="text-slate-200 hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-all">
        <MoreHorizontal size={18} />
      </button>
    </div>
    <div className="flex flex-col gap-2">
      <h4 className="text-slate-800 font-bold text-base leading-tight group-hover:text-primary transition-colors tracking-tight">{title}</h4>
      {subtitle && (
        <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px]">
          <Icon size={14} />
          {subtitle}
        </div>
      )}
    </div>
    {statusLine && <div className={`h-1 w-24 ${statusLine} rounded-full`} />}
    {progress !== undefined && (
      <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
    )}
  </div>
);

export default Dashboard;
