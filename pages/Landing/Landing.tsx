
import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  PlayCircle, 
  Brush, 
  Rocket, 
  MoreHorizontal, 
  Check, 
  LayoutDashboard, 
  UserPlus, 
  Activity, 
  Bell, 
  Trophy, 
  TrendingUp, 
  Globe, 
  ThumbsUp, 
  Share2,
  Mail
} from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="relative min-h-screen bg-mesh overflow-x-hidden font-display">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-100/60 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-green-100/60 rounded-full blur-[100px] mix-blend-multiply animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-sky-100/60 rounded-full blur-[100px] mix-blend-multiply animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <CheckCircle2 size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">Just Do It</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-10">
              {['Features', 'Pricing', 'About', 'Resources'].map((item) => (
                <a key={item} className="text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest" href="#">{item}</a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button onClick={onLogin} className="text-sm font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-widest px-4 py-2">Log In</button>
              <button onClick={onRegister} className="bg-primary hover:bg-blue-600 text-white text-xs font-black px-8 py-3.5 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest">
                Start Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
            <div className="flex flex-col gap-8 text-center lg:text-left mb-20 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm w-fit mx-auto lg:mx-0">
                <span className="flex h-2 w-2 rounded-full bg-accent-green animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">v2.0 is now live</span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-slate-900">
                Turn Tasks Into <span className="gradient-text">Achievements</span>
              </h1>
              
              <p className="text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Experience the ultimate productivity tool that keeps you accountable. Visualize success and crush your goals with our immersive task management platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mt-4">
                <button onClick={onRegister} className="bg-primary hover:bg-blue-600 text-white text-base font-black h-16 px-12 rounded-[1.5rem] shadow-2xl shadow-primary/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group active:scale-95">
                  Start Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white hover:bg-slate-50 border-2 border-slate-100 text-slate-700 text-base font-black h-16 px-10 rounded-[1.5rem] shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95">
                  <PlayCircle size={24} className="text-primary" />
                  Watch Demo
                </button>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-2xl border-4 border-white bg-slate-200 bg-cover shadow-xl" style={{ backgroundImage: `url('https://picsum.photos/seed/${i+50}/40/40')` }}></div>
                  ))}
                </div>
                <p>Trusted by 10,000+ teams</p>
              </div>
            </div>

            {/* Visual Part */}
            <div className="relative h-[600px] w-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-radial from-blue-100/50 to-transparent blur-3xl opacity-50"></div>
              
              {/* Card Layer 1 (Back) */}
              <div className="absolute w-[320px] sm:w-[400px] bg-white p-8 rounded-[2rem] border border-slate-100 shadow-2xl transform rotate-12 -translate-y-24 translate-x-24 opacity-40 animate-float-delayed">
                <div className="h-4 w-24 bg-slate-100 rounded-full mb-6"></div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-2 w-2/3 bg-slate-50 rounded-full"></div>
                </div>
              </div>

              {/* Card Layer 2 (Middle) */}
              <div className="absolute w-[320px] sm:w-[400px] glass-card p-8 rounded-[2rem] shadow-2xl transform -rotate-6 -translate-x-12 -translate-y-12 z-0 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="size-14 rounded-2xl bg-accent-purple/10 flex items-center justify-center text-accent-purple">
                    <Brush size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-black text-lg">Design System</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">In Progress • 80%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full mb-6 overflow-hidden">
                  <div className="bg-accent-purple h-full rounded-full w-[80%] shadow-[0_0_15px_rgba(139,92,246,0.3)]"></div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-xl border-2 border-white bg-slate-200 bg-cover shadow-lg" style={{ backgroundImage: `url('https://picsum.photos/seed/p1/40/40')` }}></div>
                    <div className="w-8 h-8 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-black">+2</div>
                  </div>
                  <div className="px-4 py-1.5 bg-accent-purple/10 rounded-xl text-accent-purple text-[10px] font-black uppercase tracking-widest">High Priority</div>
                </div>
              </div>

              {/* Card Layer 3 (Front Focus) */}
              <div className="absolute w-[340px] sm:w-[420px] bg-slate-900 p-8 rounded-[2.5rem] shadow-[0_40px_100px_-15px_rgba(15,23,42,0.4)] z-10 border border-slate-800 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center gap-5">
                    <div className="size-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                      <Rocket size={28} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-white font-black text-xl tracking-tight leading-none">Launch Campaign</h3>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Due Today</p>
                    </div>
                  </div>
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <MoreHorizontal size={24} />
                  </button>
                </div>
                
                <div className="space-y-6 mb-10">
                  <TaskPreviewItem label="Review copy drafts" checked={false} />
                  <TaskPreviewItem label="Finalize assets" checked={true} />
                  <TaskPreviewItem label="Schedule social posts" checked={false} />
                </div>
                
                <button className="w-full py-4 bg-primary hover:bg-blue-600 rounded-[1.25rem] text-white text-sm font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20">
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                  Complete Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 border-y border-slate-100 bg-white/40 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Powering productivity for modern teams</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 cursor-default">
            {['GOOGLE', 'IBM', 'MICROSOFT', 'SPOTIFY', 'NETFLIX'].map(brand => (
              <span key={brand} className="text-2xl font-black text-slate-900 tracking-tighter">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-xs font-black text-primary tracking-[0.3em] uppercase mb-4">Core Features</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">Everything you need to <br/>get things done</h3>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">Powerful features wrapped in a stunning interface designed for modern teams who want to move fast.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={LayoutDashboard} title="Multi-Board Org" desc="Visualize your workflow with customizable 3D boards that adapt to your style and project needs." color="primary" />
            <FeatureCard icon={UserPlus} title="Team Sync" desc="Collaborate in real-time with live cursors, instant comments, and synchronized updates." color="accent-purple" />
            <FeatureCard icon={Activity} title="Smart Analytics" desc="Track your momentum with interactive charts that show you exactly where time goes." color="accent-green" />
            <FeatureCard icon={Bell} title="Smart Alerts" desc="Stay in the loop with intelligent notifications that know when to disturb you." color="accent-orange" />
          </div>
        </div>
      </section>

      {/* CTA / Gamification Section */}
      <section className="py-32 relative z-10 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                 <div className="p-12 lg:p-24 flex flex-col justify-center bg-slate-50">
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
                      Experience the satisfaction of <span className="text-emerald-500">Done</span>.
                    </h2>
                    <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">
                      Watch your productivity soar with our interactive completion tracking. Gamify your life and level up your skills.
                    </p>
                    <div className="space-y-6">
                       <AchievementItem icon={Trophy} title="Achievement Unlocked" desc="Complete 5 tasks in a row" color="text-emerald-500" bg="bg-emerald-50" />
                       <AchievementItem icon={TrendingUp} title="Daily Streak" desc="You're on a 12 day streak!" color="text-primary" bg="bg-blue-50" />
                    </div>
                 </div>
                 <div className="relative bg-white p-12 lg:p-24 flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-100">
                    <div className="relative z-10 w-full max-w-md space-y-6">
                       <CTAItem label="Draft monthly report" completed />
                       <CTAItem label="Client meeting prep" completed />
                       <CTAItem label="Deploy to production" active />
                    </div>
                    {/* Floating Pings */}
                    <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-20">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <CheckCircle2 size={24} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">Just Do It</span>
              </div>
              <p className="text-slate-400 font-medium text-lg max-w-xs leading-relaxed">The productivity platform designed to help you achieve more with less stress.</p>
              <div className="flex gap-4">
                 <input className="bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 flex-1 text-sm font-bold focus:bg-white focus:border-primary outline-none transition-all" placeholder="Enter your email" />
                 <button className="bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95">
                    <ArrowRight size={20} strokeWidth={2.5} />
                 </button>
              </div>
            </div>
            {['Product', 'Company', 'Legal'].map(cat => (
              <div key={cat}>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-8">{cat}</h4>
                <ul className="space-y-4">
                  {['Features', 'Pricing', 'About Us', 'Contact', 'Privacy'].slice(0, 4).map(link => (
                    <li key={link}><a className="text-slate-400 hover:text-primary transition-colors font-bold text-sm tracking-tight" href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">© 2024 Just Do It Inc. All rights reserved.</p>
            <div className="flex gap-8 text-slate-300">
               {[Globe, ThumbsUp, Share2].map((Icon, idx) => (
                 <a key={idx} href="#" className="hover:text-primary transition-all hover:scale-110">
                   <Icon size={24} />
                 </a>
               ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TaskPreviewItem = ({ label, checked }: { label: string, checked: boolean }) => (
  <div className="flex items-center gap-5 group cursor-pointer">
    <div className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-primary border-primary' : 'border-slate-700 group-hover:border-primary'}`}>
      {checked && <Check size={14} className="text-white" strokeWidth={4} />}
    </div>
    <span className={`text-base font-bold transition-colors ${checked ? 'text-slate-500 line-through' : 'text-slate-300 group-hover:text-white'}`}>{label}</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, color }: any) => {
  const colorMap: any = {
    'primary': 'bg-blue-100 text-blue-500',
    'accent-purple': 'bg-purple-100 text-purple-500',
    'accent-green': 'bg-emerald-100 text-emerald-500',
    'accent-orange': 'bg-orange-100 text-orange-500'
  };
  return (
    <div className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 hover:-translate-y-2 transition-all duration-500 hover:border-primary/20">
      <div className={`size-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner ${colorMap[color] || 'bg-slate-100'}`}>
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-none">{title}</h4>
      <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
};

const AchievementItem = ({ icon: Icon, title, desc, color, bg }: any) => (
  <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/10 hover:scale-105 transition-transform">
    <div className={`size-14 rounded-2xl ${bg} flex items-center justify-center ${color} shadow-inner`}>
      <Icon size={28} strokeWidth={2.5} />
    </div>
    <div>
      <h4 className="text-slate-900 font-black text-lg tracking-tight leading-none mb-2">{title}</h4>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{desc}</p>
    </div>
  </div>
);

const CTAItem = ({ label, completed, active }: any) => (
  <div className={`p-6 rounded-3xl border-2 transition-all duration-500 ${active ? 'bg-white border-primary shadow-2xl scale-105' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
    <div className="flex items-center gap-5">
      <div className={`size-8 rounded-xl border-2 flex items-center justify-center transition-all ${completed ? 'bg-emerald-500 border-emerald-500 text-white' : active ? 'border-primary' : 'border-slate-300'}`}>
        {completed && <Check size={16} strokeWidth={4} />}
      </div>
      <span className={`text-lg font-black tracking-tight ${completed ? 'text-slate-300 line-through' : 'text-slate-800'}`}>{label}</span>
    </div>
  </div>
);

export default Landing;
