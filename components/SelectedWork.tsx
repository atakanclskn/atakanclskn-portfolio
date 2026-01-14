import React from 'react';
import { ArrowUpRight, Terminal, ArrowRight, Star } from 'lucide-react';
import { Project } from '../types';
import { urlFor } from '../lib/sanity.client';

interface SelectedWorkProps {
  projects: Project[];
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-32 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Selected Work</h2>
            <p className="text-primary/60 font-mono text-xs mt-2 tracking-wider">SYNCED FROM GITHUB REPOSITORIES</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-green-400 uppercase tracking-wider">Live Fetch Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
          
          {projects?.map((project) => {
            const isLarge = project.size === 'large';
            
            let imageUrl = '';
            if (typeof project.mainImage === 'string') {
                imageUrl = project.mainImage;
            } else if (project.mainImage) {
                imageUrl = urlFor(project.mainImage).url();
            }

            return (
              <div 
                key={project._id}
                className={`rounded-2xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-primary/30 transition-all duration-500 bg-surface/80 backdrop-blur-sm ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
                onClick={() => project.link && window.open(project.link, '_blank')}
              >
                {imageUrl ? (
                   <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                    <img 
                      src={imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-100"
                    />
                   </>
                ) : (
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent flex items-center justify-center">
                      <Terminal className="w-20 h-20 text-white/10 group-hover:text-primary/40 transition-colors" />
                   </div>
                )}

                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-black/50 p-3 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-primary group-hover:text-black transition-all">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black" />
                  </div>
                </div>

                {project.isLiveData && (
                    <div className="absolute top-6 left-6 z-20 flex gap-2">
                         {project.language && (
                            <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono font-bold text-gray-300 flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-primary/80"></div>
                                {project.language}
                            </span>
                         )}
                         {(project.stars || 0) > 0 && (
                            <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono font-bold text-yellow-500 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                {project.stars}
                            </span>
                         )}
                    </div>
                )}

                <div className={`absolute bottom-0 left-0 p-${isLarge ? '8' : '6'} z-20 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500`}>
                   {isLarge && (
                     <span className="inline-block px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20 backdrop-blur-md">
                      {project.category}
                    </span>
                   )}
                  <h3 className={`${isLarge ? 'text-4xl' : 'text-xl'} font-display font-bold text-white mb-2 leading-tight`}>{project.title}</h3>
                  <p className={`${isLarge ? 'text-gray-400 max-w-lg' : 'text-gray-500 text-xs font-mono'} line-clamp-2`}>
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a href="https://github.com/atakanclskn?tab=repositories" target="_blank" rel="noreferrer" className="text-sm font-bold font-mono text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-2 group">
            VIEW_FULL_ARCHIVE_ON_GITHUB <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};