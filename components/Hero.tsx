
import React, { useState } from 'react';
import { getWorkloadInsight } from '../services/geminiService';
import { BOARDS } from '../constants';
import { Plus, Brain, RotateCw } from 'lucide-react';

interface HeroProps {
  onCreateNew?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCreateNew }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    setLoading(true);
    try {
      const result = await getWorkloadInsight(BOARDS);
      setInsight(result);
    } catch (error) {
      console.error(error);
      setInsight("You're managing your projects expertly! Keep it up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full rounded-3xl overflow-hidden relative mb-10 group shadow-xl shadow-sky-500/10">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-cyan-500 to-emerald-500 opacity-100"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
        <div className="flex flex-col gap-6 max-w-xl text-center md:text-left">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/30 mb-2 shadow-sm">
              Premium Workspace
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-sm">
              Your Boards
            </h1>
            <p className="text-sky-50 text-lg font-medium leading-relaxed opacity-95">
              {insight || "You have 12 active projects and 4 pending tasks today. Keep up the momentum!"}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button 
              onClick={onCreateNew}
              className="flex items-center gap-2 bg-white text-sky-600 px-6 py-3 rounded-xl font-bold hover:bg-sky-50 hover:scale-105 transition-all shadow-lg shadow-sky-900/10 active:scale-95"
            >
              <Plus size={18} strokeWidth={2.5} />
              Create New Board
            </button>
            <button 
              onClick={fetchInsight}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/40 hover:bg-white/20 transition-all backdrop-blur-sm disabled:opacity-50"
            >
              {loading ? <RotateCw size={18} className="animate-spin" /> : <Brain size={18} />}
              {loading ? 'Analyzing...' : 'AI Insights'}
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-[320px] aspect-square md:w-[400px] md:h-[300px] flex items-center justify-center pointer-events-none">
          <div 
            className="w-full h-full bg-contain bg-center bg-no-repeat drop-shadow-2xl animate-float"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBiG5_lRWeg0-JhVGmz_eywnh0ULU_Z3scBQDm51NY-jUiD8rCpCQ9XqRXWql0UxVtBaHN6tqsRl5OsUJKcQYZF2sNQgGAARNjsw-9BFYQnptkjLs3T3-XODF_W__bNwNhSmIEiDnpGDMAuc5RsWURQ0tO5u5vvuq8arXZz_y3EH1XhJQLVhi_0zaZ49QUQDU5-veml9KSnNdmt5tSmzGmV6P3DqXG7F7i8a_wkJZnxOUu0LB8kiCqUP3qrJ8xjWpQI5Qcw__uGRug')" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
