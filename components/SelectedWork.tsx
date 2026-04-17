
import React from 'react';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { Project } from '../types';
import { MagicCard } from './MagicCard';
import { Reveal } from './Reveal';
import { useLanguage } from '../lib/i18n';
import { getText } from '../lib/multiLangHelper';
import { useAdmin } from '../lib/adminContext';

interface SelectedWorkProps {
  projects: Project[];
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ projects }) => {
  const { lang } = useLanguage();
  const { sectionContent } = useAdmin();

  return (
    <section id="projects" className="py-32 relative bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              {getText(sectionContent.projects.title, lang)}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl text-lg">
               {getText(sectionContent.projects.description, lang)}
            </p>
          </div>
        </Reveal>

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
                <a
                  href={project.link || '#'}
                  target={project.link ? '_blank' : undefined}
                  rel={project.link ? 'noreferrer' : undefined}
                  onClick={(e) => {
                    if (!project.link) e.preventDefault();
                  }}
                  className="w-full h-full relative z-20 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-3xl"
                  aria-label={`${getText(project.title, lang)} project details`}
                >
                    {imageUrl ? (
                    <>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                        <img 
                        src={imageUrl} 
                        alt={getText(project.title, lang)} 
                        loading="lazy"
                        decoding="async"
                        sizes={isFeatured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
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
                    <div className="absolute bottom-0 left-0 w-full z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-500 ease-out">
                      <div className="p-6 flex flex-col justify-end">
                        {project.category && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block transition-transform duration-500 ease-out translate-y-0 group-hover:-translate-y-1">
                            {project.category}
                          </span>
                        )}
                        <h3 className={`font-display font-bold text-white leading-tight transition-transform duration-500 ease-out translate-y-0 group-hover:-translate-y-1 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                          {getText(project.title, lang)}
                        </h3>
                        <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] group-hover:grid-rows-[1fr]">
                          <div className="overflow-hidden">
                            <p className="text-gray-200 text-sm line-clamp-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                              {getText(project.description, lang)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                </a>
              </MagicCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
