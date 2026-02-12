
import React from 'react';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { Project } from '../types';
import { MagicCard } from './MagicCard';
import { useLanguage } from '../lib/i18n';
import { getText } from '../lib/multiLangHelper';
import { useAdmin } from '../lib/adminContext';

interface SelectedWorkProps {
  projects: Project[];
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ projects }) => {
  const { t, lang } = useLanguage();
  const { sectionContent } = useAdmin();

  return (
    <section id="projects" className="py-32 relative bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              {getText(sectionContent.projects.title, lang)}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
               {getText(sectionContent.projects.description, lang)}
            </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4">
          
          {projects?.map((project, index) => {
            const isFeatured = index === 0;
            const isWide = index === 3;
            
            // Handle both string URLs and Sanity image objects
            const imageUrl = typeof project.mainImage === 'string' 
              ? project.mainImage 
              : 'https://via.placeholder.com/800x600?text=Project+Image';

            return (
              <MagicCard
                key={project._id}
                gradientColor="rgba(255, 255, 255, 0.15)"
                className={`
                    group relative overflow-hidden rounded-3xl bg-white dark:bg-surface border border-gray-200 dark:border-white/10
                    ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}
                    ${isWide ? 'md:col-span-2' : ''}
                    hover:shadow-2xl transition-all duration-500 cursor-pointer
                `}
              >
                <div onClick={() => project.link && window.open(project.link, '_blank')} className="w-full h-full relative z-20">
                    {imageUrl ? (
                    <>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                        <img 
                        src={imageUrl} 
                        alt={getText(project.title, lang)} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </>
                    ) : (
                    <div className="absolute inset-0 bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                        <Terminal className="w-16 h-16 text-gray-300 dark:text-white/10" />
                    </div>
                    )}

                    <div className="absolute top-4 right-4 z-20 bg-white dark:bg-black/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <ArrowUpRight className="w-4 h-4 text-black dark:text-white" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-20">
                    {project.category && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">
                        {project.category}
                        </span>
                    )}
                    <h3 className={`font-display font-bold text-white mb-2 leading-tight ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                        {getText(project.title, lang)}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        {getText(project.description, lang)}
                    </p>
                    </div>
                </div>
              </MagicCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
