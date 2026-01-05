import React from 'react';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <p className="font-mono text-primary mb-3 text-sm tracking-wide">Hi, I'm Atakan Çalışkan.</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-primary/80">System Online</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tighter text-white mb-6">
          SOFTWARE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-blue-500">
            ENGINEER
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-12">
          Architecting high-performance digital ecosystems.<br className="hidden md:block" />
          Crafting cinematic technical narratives.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#work" className="group relative px-8 py-4 bg-primary text-black rounded-lg font-bold font-display overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <span className="relative z-10 flex items-center gap-2">
              View Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
          
          <button className="group px-8 py-4 bg-transparent border border-white/10 text-white rounded-lg font-bold font-display hover:bg-white/5 transition-all hover:border-white/20">
            <span className="flex items-center gap-2">
              Download CV <Download className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
};