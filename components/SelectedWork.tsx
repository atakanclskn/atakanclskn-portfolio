import React from 'react';
import { ArrowUpRight, Terminal, Bitcoin, Layers, ArrowRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Nexus Analytics',
    category: 'SaaS Platform',
    description: 'AI-powered dashboard for real-time data visualization processing 1M+ events/sec.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    size: 'large'
  },
  {
    id: '2',
    title: 'StreamSync',
    category: 'Mobile Companion',
    description: 'Mobile Companion App',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    size: 'small'
  },
  {
    id: '3',
    title: 'CLI Toolbelt',
    category: 'Open Source',
    description: 'Developer Utility',
    imageUrl: '',
    size: 'small' // Special case for icon render
  },
  {
    id: '4',
    title: 'DevDocs AI',
    category: 'Documentation',
    description: 'Helper Bot',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    size: 'small'
  },
  {
    id: '5',
    title: 'CryptoWatch',
    category: 'Fintech',
    description: 'Trading Dashboard',
    imageUrl: '',
    size: 'small' // Special case for icon render
  },
  {
    id: '6',
    title: 'Portfolio V1',
    category: 'Legacy',
    description: 'Design System',
    imageUrl: '',
    size: 'small' // Special case text render
  }
];

export const SelectedWork: React.FC = () => {
  return (
    <section id="work" className="py-32 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Selected Work</h2>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Deployments Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
          
          {/* Main Large Item */}
          <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-primary/30 transition-all duration-500 bg-surface/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80" />
            <img 
              src={projects[0].imageUrl} 
              alt={projects[0].title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 right-6 z-20">
              <div className="bg-black/50 p-3 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-primary group-hover:text-black transition-all">
                <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <span className="inline-block px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20 backdrop-blur-md">
                {projects[0].category}
              </span>
              <h3 className="text-4xl font-display font-bold text-white mb-2">{projects[0].title}</h3>
              <p className="text-gray-400 max-w-lg">{projects[0].description}</p>
            </div>
          </div>

          {/* Standard Item with Image */}
          <div className="rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-primary/30 transition-all duration-500 bg-surface/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img 
              src={projects[1].imageUrl} 
              alt={projects[1].title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-xl font-display font-bold text-white mb-1">{projects[1].title}</h3>
              <p className="text-gray-500 text-xs font-mono">{projects[1].category}</p>
            </div>
          </div>

          {/* Icon/Abstract Item (CLI Toolbelt) */}
          <div className="rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-primary/30 transition-all duration-500 bg-surface/80 backdrop-blur-sm flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent"></div>
             <Terminal className="w-20 h-20 text-white/10 group-hover:text-primary/40 transition-colors" />
             <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
              <h3 className="text-xl font-display font-bold text-white mb-1">{projects[2].title}</h3>
              <p className="text-gray-500 text-xs font-mono">{projects[2].category}</p>
            </div>
          </div>

          {/* Code Image Item (DevDocs) */}
           <div className="rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-primary/30 transition-all duration-500 bg-surface/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img 
              src={projects[3].imageUrl} 
              alt={projects[3].title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-xl font-display font-bold text-white mb-1">{projects[3].title}</h3>
              <p className="text-gray-500 text-xs font-mono">{projects[3].category}</p>
            </div>
          </div>

          {/* Icon Item (Crypto) */}
           <div className="rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-primary/30 transition-all duration-500 bg-surface/80 backdrop-blur-sm flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
             <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform bg-white/5">
                <Bitcoin className="w-8 h-8 text-white" />
             </div>
             <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
              <h3 className="text-xl font-display font-bold text-white mb-1">{projects[4].title}</h3>
              <p className="text-gray-500 text-xs font-mono">{projects[4].category}</p>
            </div>
          </div>

           {/* Numbered Item (Legacy) */}
           <div className="rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-primary/30 transition-all duration-500 bg-surface/80 backdrop-blur-sm flex flex-col justify-between p-6">
             <div className="flex justify-between items-start">
               <span className="text-4xl font-display font-bold text-white/10 group-hover:text-primary/20 transition-colors">06</span>
               <Layers className="text-gray-600 group-hover:text-white" />
             </div>
             <div>
              <h3 className="text-xl font-display font-bold text-white mb-1">{projects[5].title}</h3>
              <p className="text-gray-500 text-xs font-mono">{projects[5].category}</p>
            </div>
          </div>

        </div>

        <div className="mt-12 text-center">
          <button className="text-sm font-bold font-mono text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-2 group">
            ACCESS_ARCHIVE <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};