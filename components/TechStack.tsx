import React from 'react';
import { Box, Database, Cpu, Palette, Code, Terminal, Server, Globe } from 'lucide-react';
import { TechItem } from '../types';

// Map string names from Sanity to actual components
const IconMap: Record<string, React.ReactNode> = {
  Box: <Box className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />,
  Terminal: <Terminal className="w-8 h-8" />,
  Server: <Server className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
};

interface TechStackProps {
  techStack: TechItem[];
}

export const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  return (
    <section id="stack" className="py-32 relative border-t border-white/5 bg-surface/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">Core Expertise</h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-wider">/// TECHNICAL_MANIFEST</p>
          </div>
          <div className="h-px bg-white/10 flex-1 ml-12 hidden md:block self-center"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack?.map((item) => (
            <div 
              key={item._id} 
              className="glass p-8 rounded-xl flex flex-col items-start gap-4 group cursor-default transition-all duration-300 hover:bg-white/5 hover:border-white/10"
            >
              <div className={`p-3 rounded-lg bg-white/5 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                {IconMap[item.iconName] || <Box className="w-8 h-8" />}
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 font-mono">
                  {item.tech}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};