
import React from 'react';
import { Zap, Star, User, Mail, Lock, ArrowRight } from 'lucide-react';

interface RegisterProps {
  onLogin: () => void;
  onRegister: () => void;
  onBack: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin, onRegister, onBack }) => {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row font-display bg-background-light dark:bg-background-dark text-slate-900 selection:bg-primary selection:text-white">
      {/* Left Side: Brand & Visuals */}
      <div className="relative hidden w-full lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 p-12 text-white">
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-900 blur-3xl"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3 cursor-pointer group" onClick={onBack}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 transition-transform group-hover:scale-110">
            <Zap size={22} className="text-white fill-white/20" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tight">ProdFlow</span>
        </div>

        <div className="relative z-10 my-auto flex flex-col gap-10">
          <div className="animate-float">
            <div className="aspect-[4/3] w-full max-w-lg rounded-[2.5rem] bg-white/10 shadow-2xl backdrop-blur-sm border border-white/20 bg-cover bg-center ring-8 ring-white/5" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsZHRqIBtdaBvmbgKCRuSqMNCTND9Yc3wIAY3wqyRuLr68uU-Kd5ABbqLSamG7c18eiZ3Kh-utjg3-K9Kd06i7iyJsm6abW9LRuHp7Z0xy6jHdJKEai4FIkN64maw-WkqtkSckdeNRtAuobnETnlgWekelzGXN5P_E5QKbRdxFK0IR6N1dppuUplPm2486CC2wvkuyun3vQ-4bYR_NeiYFPyu12tGOMsl3AP848QYjo1KVRtChJyNPmik4HF_wOVEjOerm6cLrPvE")' }}></div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight lg:text-6xl">
              Maximize output. <br/>
              <span className="text-teal-100">Minimize noise.</span>
            </h1>
            <p className="max-w-md text-xl font-medium text-blue-50/90 leading-relaxed">
              Join 10K+ teams shipping faster and collaborating better with our AI-driven workspace.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 w-12 rounded-2xl border-4 border-white/20 bg-gray-200 bg-cover bg-center shadow-xl ring-2 ring-white/10" style={{ backgroundImage: `url('https://picsum.photos/seed/${i + 10}/48/48')` }}></div>
            ))}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-white bg-white text-xs font-black text-blue-600 shadow-xl">
              +2k
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-base font-black text-white">
              4.9/5 <Star size={16} className="text-yellow-400 fill-yellow-400" />
            </div>
            <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">Trusted by Teams</span>
          </div>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="relative flex w-full flex-col items-center justify-center bg-slate-50 p-6 lg:w-7/12 lg:p-12 xl:w-1/2 overflow-y-auto scrollbar-hide">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl mix-blend-multiply animate-pulse"></div>
          <div className="absolute bottom-1/4 left-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 flex w-full max-w-[520px] flex-col">
          <div className="glass-card w-full rounded-[2.5rem] p-8 sm:p-12 shadow-2xl bg-white/80 backdrop-blur-xl border border-white">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Registration</span>
                <div className="flex gap-2 text-sm font-black text-primary uppercase tracking-widest">Step 1 of 1</div>
              </div>
              <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-full rounded-full bg-primary shadow-[0_0_10px_rgba(16,133,249,0.5)]"></div>
              </div>
            </div>

            <div className="mb-10 flex flex-col gap-3">
              <h2 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">
                Start your <span className="text-primary">productivity</span> journey
              </h2>
              <p className="text-slate-500 font-bold text-lg">Create your account in seconds to get started.</p>
            </div>

            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <User size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input className="block w-full rounded-2xl bg-slate-50/50 py-4 pl-12 pr-4 text-slate-900 font-bold border-2 border-slate-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="e.g. Jane Doe" type="text" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input className="block w-full rounded-2xl bg-slate-50/50 py-4 pl-12 pr-4 text-slate-900 font-bold border-2 border-slate-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="name@company.com" type="email" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input className="block w-full rounded-2xl bg-slate-50/50 py-4 pl-12 pr-4 text-slate-900 font-bold border-2 border-slate-100 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none" placeholder="••••••••" type="password" required />
                </div>
              </div>
              
              <button className="group relative mt-4 flex w-full justify-center rounded-2xl bg-gradient-to-r from-primary to-blue-600 px-6 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 hover:brightness-110 active:scale-95 transition-all" type="submit">
                <span className="flex items-center gap-3">
                  Create Account 
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" strokeWidth={3} />
                </span>
              </button>
            </form>

            <p className="mt-10 text-center text-sm font-bold text-slate-500">
              Already have an account? <span className="font-black text-primary hover:underline cursor-pointer ml-1" onClick={onLogin}>Log In</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
