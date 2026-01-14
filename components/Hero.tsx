
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  // Enhanced list of titles including system status and professional variations
  const titles = [
    'WELCOME', 
    'SYSTEM_ONLINE', 
    'INIT_PORTFOLIO',
    'CONNECTION_ESTABLISHED',
    ...(profile?.titles || ['SOFTWARE_ENGINEER', 'AI_DEVELOPER', 'OPEN_SOURCE'])
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(titles[0]);
  const [isScrambling, setIsScrambling] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = async (target: string) => {
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = 10;
    
    const interval = setInterval(() => {
      setDisplayText(prev => 
        target.split('')
          .map((char, index) => {
            if (index < iteration) return target[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += target.length / maxIterations;
    }, 35); // Slightly faster scramble
  };

  useEffect(() => {
    const nextWord = () => {
      const nextIndex = (currentIndex + 1) % titles.length;
      setCurrentIndex(nextIndex);
      scramble(titles[nextIndex]);
    };

    // Cycle words every 3.5 seconds for better pacing with more words
    timeoutRef.current = setTimeout(nextWord, 3500); 
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, titles]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center w-full">
        
        <div className="mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <p className="font-mono text-primary mb-6 text-[10px] tracking-[0.5em] uppercase font-bold">TRANSMISSION_INITIATED</p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-gray-400">
               {profile?.name || 'ATAKAN ÇALIŞKAN'} // {profile?.status || 'ONLINE'}
            </span>
          </div>
        </div>

        {/* Dynamic Scrambling Title */}
        <div className="h-[120px] md:h-[180px] flex items-center justify-center mb-12">
          <h1 className={`text-4xl md:text-[8rem] font-display font-bold text-white tracking-tighter transition-all duration-300 ${isScrambling ? 'opacity-80 scale-95 blur-[1px]' : 'opacity-100 scale-100 blur-0'} leading-[0.8] select-none text-center whitespace-nowrap`}>
            {displayText}
          </h1>
        </div>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-display font-medium mb-16 px-4 tracking-tight">
          {profile?.bio || 'Architecting high-performance digital ecosystems through code and data intelligence.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-6">
          <a href="#projects" className="w-full sm:w-auto group relative px-10 py-5 bg-white text-black rounded-full font-bold font-display overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest text-[10px]">
              EXPLORE_PROJECTS <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
          
          <button className="w-full sm:w-auto group px-10 py-5 bg-transparent border-2 border-white/10 text-white rounded-full font-bold font-display hover:bg-white/5 transition-all hover:border-white/30">
            <span className="flex items-center justify-center gap-2 tracking-widest text-[10px]">
              GET_RESUME <Download className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
};
