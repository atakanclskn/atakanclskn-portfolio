import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

const ROLES = [
  "SOFTWARE ENGINEER",
  "AI DEVELOPER",
  "MACHINE LEARNING",
  "COMPUTER SCIENCE"
];

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const currentRole = ROLES[roleIndex];
      
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(40);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(120);
      }

      if (!isDeleting && displayText === currentRole) {
        setTypingSpeed(2500); // Wait longer at full text
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        
        <div className="mb-12 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <p className="font-mono text-primary mb-4 text-sm tracking-[0.3em] uppercase">HI, I'M {profile?.name || 'ATAKAN ÇALIŞKAN'}</p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-primary/80">{profile?.status || 'System Online'}</span>
          </div>
        </div>

        {/* Main Title Area */}
        <div className="h-[180px] md:h-[220px] lg:h-[260px] flex items-center justify-center w-full mb-8">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold leading-tight tracking-tighter uppercase">
            <span className="text-white inline-block">
              {displayText}
            </span>
            <span className="inline-block w-[3px] md:w-[6px] h-[0.8em] bg-primary ml-2 animate-[blink_1s_step-end_infinite] align-middle mb-2"></span>
          </h1>
        </div>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-16 px-4">
          {profile?.bio || 'Architecting high-performance digital ecosystems through code and data intelligence.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-6">
          <a href="#work" className="w-full sm:w-auto group relative px-10 py-5 bg-primary text-black rounded-lg font-bold font-display overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            <span className="relative z-10 flex items-center justify-center gap-2">
              EXPLORE WORK <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
          
          <button className="w-full sm:w-auto group px-10 py-5 bg-transparent border border-white/10 text-white rounded-lg font-bold font-display hover:bg-white/5 transition-all hover:border-white/20">
            <span className="flex items-center justify-center gap-2">
              DOWNLOAD RESUME <Download className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>

      <style>{`
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};