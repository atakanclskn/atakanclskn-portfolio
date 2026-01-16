
import React from 'react';
import { Rocket, GraduationCap, ChevronRight, Github } from 'lucide-react';

export const Spotlight: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative blurred background */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative group">
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="flex-1 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">Graduation Thesis Spotlight</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Autonomous AI Agents <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">for Logistics.</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Dokuz Eylül Üniversitesi'ndeki bitirme projem kapsamında, Microsoft SQL Server verilerini gerçek zamanlı işleyen ve otonom rotalama yapan bir AI ajanı geliştiriyorum. Lojistik süreçlerini %40 daha verimli hale getirmeyi hedefliyoruz.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1">Stack</span>
                <span className="text-sm font-bold text-white">Python / SQL / LLM</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-1">Status</span>
                <span className="text-sm font-bold text-emerald-400">Development (80%)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold font-display text-sm hover:scale-105 transition-transform">
                VIEW TECHNICAL SPECS <ChevronRight className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold font-display text-sm hover:bg-white/10 transition-all">
                <Github className="w-4 h-4" /> REPOSITORY
              </button>
            </div>
          </div>

          <div className="flex-1 relative w-full aspect-square md:aspect-video lg:aspect-auto h-full lg:h-[400px]">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative h-full w-full rounded-3xl border border-white/10 overflow-hidden bg-black/40 backdrop-blur-md">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                alt="Thesis Visual"
                className="w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Overlay elements to make it look technical */}
              <div className="absolute top-6 left-6 font-mono text-[8px] text-primary space-y-1">
                <div className="flex gap-2"><span>[RUNNING]</span> <span>LOAD_MODEL: 1.0</span></div>
                <div className="flex gap-2"><span>[READY]</span> <span>DATA_STREAM: ACTIVE</span></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-6 rounded-full bg-background/50 backdrop-blur-xl border border-white/10 scale-0 group-hover:scale-100 transition-transform duration-500">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
