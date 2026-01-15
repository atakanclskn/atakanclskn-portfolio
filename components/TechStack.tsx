
import React from 'react';
import { Box, Database, Cpu, Palette, Code, Terminal, Server, Globe } from 'lucide-react';
import { TechItem } from '../types';

const IconMap: Record<string, React.ReactNode> = {
  Box: <Box className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
};

interface TechStackProps {
  techStack: TechItem[];
}

export const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  return (
    <section id="expertise" className="py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header directly matching the screenshot style */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-shrink-0">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Core Expertise</h2>
            <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">/// TECHNICAL_MANIFEST</p>
          </div>
          <div className="h-[1px] bg-white/10 flex-grow mt-2"></div>
        </div>

        {/* Compact Grid with enhanced card design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack?.map((item, index) => (
            <div 
              key={item._id} 
              className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 transition-all duration-500 hover:border-white/20 hover:bg-[#0f0f0f] hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Subtle background glow on hover */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-500 ${item.color.replace('text-', 'bg-')}`} />

              <div className="flex flex-col gap-6 relative z-10">
                {/* Icon Container with specific styling */}
                <div className={`w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center ${item.color} shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-all duration-500 group-hover:scale-110 group-hover:border-current group-hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                  {IconMap[item.iconName] || <Box className="w-6 h-6" />}
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-primary transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 font-mono uppercase tracking-widest">
                    {item.tech}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
