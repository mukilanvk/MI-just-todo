
import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Palette, 
  Lock, 
  Verified, 
  Share2, 
  Edit3, 
  MapPin, 
  Clock, 
  Mail, 
  CheckCircle2, 
  Flame, 
  LayoutDashboard, 
  Award,
  Globe,
  BadgeCheck,
  ChevronDown
} from 'lucide-react';

interface SettingsProps {
  onSave: () => void;
}

const SettingsPage: React.FC<SettingsProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState('General');
  
  const tabs = [
    { label: 'General', icon: Settings },
    { label: 'Notifications', icon: Bell },
    { label: 'Appearance', icon: Palette },
    { label: 'Privacy', icon: Lock },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full max-w-5xl mx-auto animate-fade-in">
      {/* Profile Card Container */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Banner Section */}
        <div className="h-48 w-full bg-gradient-to-r from-teal-200 via-primary/30 to-purple-200 relative">
          <button className="absolute top-6 right-6 p-2.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-slate-700 transition-all">
            <Edit3 size={18} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-8 md:px-12 pb-12 relative">
          
          {/* Avatar and Actions Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-8 gap-6">
            <div className="relative">
              <div className="size-32 md:size-40 rounded-full border-4 border-white bg-slate-100 shadow-xl overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/jane/200/200" 
                  alt="Jane Doe" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-3 right-3 size-5 bg-emerald-500 border-4 border-white rounded-full shadow-sm" title="Online" />
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
                <Share2 size={18} />
                Share Profile
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-all">
                <Edit3 size={18} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Bio and Stats Row */}
          <div className="flex flex-col lg:flex-row gap-12 mb-12">
            <div className="flex-1 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Jane Doe</h1>
                  <BadgeCheck className="text-primary fill-primary/10" size={24} />
                </div>
                <p className="text-slate-400 font-bold text-lg">Senior Product Designer @ Acme Corp</p>
              </div>

              <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-slate-300" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-slate-300" />
                  PST (UTC-8) • 10:42 AM
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-slate-300" />
                  jane.doe@example.com
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">About Me</span>
                <p className="text-slate-600 font-medium leading-relaxed max-w-2xl">
                  Passionate about building digital experiences that matter. I love to combine minimalist design with powerful functionality. Currently leading the design system team at Acme Corp and exploring 3D web interactions on the weekends.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <StatItem icon={CheckCircle2} value="1,240" label="Tasks Done" color="text-primary" bg="bg-blue-50" />
              <StatItem icon={Flame} value="14" label="Day Streak" color="text-orange-500" bg="bg-orange-50" />
              <StatItem icon={LayoutDashboard} value="8" label="Boards" color="text-purple-500" bg="bg-purple-50" />
              <StatItem icon={Award} value="12" label="Awards" color="text-yellow-600" bg="bg-yellow-50" />
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-slate-100 flex gap-10 mb-10 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex items-center gap-2.5 pb-5 transition-all text-sm font-black whitespace-nowrap ${
                    isActive 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FormInput label="Display Name" value="Jane Doe" icon="person" />
            <FormInput label="Role / Title" value="Senior Product Designer" icon="badge" />
            
            <div className="space-y-2.5">
              <label className="text-sm font-black text-slate-700">Location</label>
              <div className="relative">
                <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-sm text-slate-700 focus:bg-white focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                  <option>San Francisco, CA</option>
                  <option>New York, NY</option>
                  <option>London, UK</option>
                  <option>Remote</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-black text-slate-700">Timezone</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Globe size={18} />
                </div>
                <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-3.5 font-bold text-sm text-slate-700 focus:bg-white focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                  <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                  <option>(GMT+00:00) London, UK</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2.5">
              <label className="text-sm font-black text-slate-700">Bio</label>
              <textarea 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] p-6 text-slate-700 font-bold focus:bg-white focus:border-primary outline-none transition-all resize-none h-32"
                defaultValue="Passionate about building digital experiences that matter. I love to combine minimalist design with powerful functionality. Currently leading the design system team at Acme Corp and exploring 3D web interactions on the weekends."
              />
              <p className="text-right text-[10px] font-black text-slate-300 uppercase tracking-widest">240 / 500 characters</p>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="border-t border-slate-100 pt-10 mb-12">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3 mb-8 tracking-tight">
              <div className="size-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                <Mail size={18} />
              </div>
              Email Preferences
            </h3>
            <div className="space-y-6">
              <ToggleItem label="Weekly Digest" desc="Get a summary of your tasks every Monday." checked={true} />
              <ToggleItem label="Product Updates" desc="Receive news about new features and improvements." checked={false} />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100">
            <button className="text-sm font-black text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-widest">
              Delete Account
            </button>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl border-2 border-slate-100 text-slate-500 font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
                Cancel
              </button>
              <button 
                onClick={onSave}
                className="flex-1 sm:flex-none px-10 py-3.5 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="text-center py-10 opacity-40">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          © 2024 ProductivityApp Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

/* Helper Components */

const StatItem = ({ icon: Icon, value, label, color, bg }: any) => (
  <div className="w-32 bg-white/70 backdrop-blur-md border border-slate-100 p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-all">
    <div className={`size-8 rounded-full ${bg} ${color} flex items-center justify-center mb-2`}>
      <Icon size={16} strokeWidth={2.5} />
    </div>
    <span className="text-xl font-black text-slate-900">{value}</span>
    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{label}</span>
  </div>
);

const FormInput = ({ label, value, icon }: any) => (
  <div className="space-y-2.5">
    <label className="text-sm font-black text-slate-700">{label}</label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <input 
        type="text" 
        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-12 py-3.5 font-bold text-sm text-slate-700 focus:bg-white focus:border-primary outline-none transition-all"
        defaultValue={value}
      />
    </div>
  </div>
);

const ToggleItem = ({ label, desc, checked }: any) => {
  const [isOn, setIsOn] = useState(checked);
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-black text-slate-800">{label}</p>
        <p className="text-xs font-bold text-slate-400">{desc}</p>
      </div>
      <button 
        onClick={() => setIsOn(!isOn)}
        className={`w-12 h-6.5 rounded-full relative transition-colors duration-300 flex items-center px-1 ${
          isOn ? 'bg-primary' : 'bg-slate-200'
        }`}
      >
        <div className={`size-4.5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
          isOn ? 'translate-x-5.5' : 'translate-x-0'
        }`} />
      </button>
    </div>
  );
};

export default SettingsPage;
