
import React, { useState, useMemo } from 'react';
import { ExperienceItem, Project } from '../types';
import { GraduationCap, Briefcase, Award, FolderGit2, Calendar, ArrowUpRight } from 'lucide-react';
import { BorderBeam } from './BorderBeam';
import { MagicCard } from './MagicCard';

interface ExperienceProps {
  experiences: ExperienceItem[];
  projects: Project[];
}

type FilterType = 'work' | 'education' | 'certification' | 'project';

const getTypeStyles = (type?: string) => {
    switch (type) {
      case 'education': 
        return { 
            icon: <GraduationCap className="w-5 h-5" />, 
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-100 dark:bg-purple-900/20',
            border: 'border-purple-200 dark:border-purple-700',
            hover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
            beamColor: '#a855f7' // Purple-500
        };
      case 'certification': 
        return { 
            icon: <Award className="w-5 h-5" />, 
            color: 'text-yellow-600 dark:text-yellow-400',
            bg: 'bg-yellow-100 dark:bg-yellow-900/20',
            border: 'border-yellow-200 dark:border-yellow-700',
            hover: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-400',
            beamColor: '#eab308' // Yellow-500
        };
      case 'project':
        return {
            icon: <FolderGit2 className="w-5 h-5" />,
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-100 dark:bg-emerald-900/20',
            border: 'border-emerald-200 dark:border-emerald-700',
            hover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
            beamColor: '#10b981' // Emerald-500
        };
      case 'work': 
      default: 
        return { 
            icon: <Briefcase className="w-5 h-5" />, 
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-100 dark:bg-blue-900/20',
            border: 'border-blue-200 dark:border-blue-700',
            hover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
            beamColor: '#3b82f6' // Blue-500
        };
    }
  };

const TimelineCard: React.FC<{ item: any, side?: 'left' | 'right', isMobile?: boolean, index?: number }> = ({ item, side = 'left', isMobile = false, index = 0 }) => {
     const type = item.type || 'work';
     const style = getTypeStyles(type);
     const startYear = new Date(item.startDate).getFullYear();
     const endYear = item.isCurrent ? 'Present' : (item.endDate ? new Date(item.endDate).getFullYear() : startYear);
     const period = `${startYear}${startYear !== endYear ? ` — ${endYear}` : ''}`;

     // Position logic
     const dotClass = isMobile 
        ? "left-4 -translate-x-1/2" 
        : side === 'left' 
            ? "-right-12 translate-x-1/2" 
            : "-left-12 -translate-x-1/2";
            
     const connectorClass = isMobile
        ? "hidden"
        : side === 'left'
            ? "right-[-48px] w-[49px]" 
            : "left-[-48px] w-[49px]";

     const alignClass = isMobile 
        ? "text-left pl-0" 
        : side === 'left' 
            ? "text-right items-end" 
            : "text-left items-start";

     const skillJustify = (!isMobile && side === 'left') ? "justify-end" : "justify-start";
     const linkAlign = (!isMobile && side === 'left') ? "ml-auto" : "mr-auto";

     return (
        <div 
            className="relative group w-full animate-fade-in-up opacity-0 fill-mode-forwards"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
        >
            {/* Connector Line (Desktop) */}
            {!isMobile && (
                 <div className={`absolute top-14 h-px bg-gray-200 dark:bg-white/10 ${connectorClass}`}></div>
            )}

            {/* Glow Effect (Breathing) */}
            <div 
                className={`absolute top-8 w-12 h-12 rounded-full z-10 opacity-0 group-hover:opacity-60 transition-all duration-500 blur-[8px] group-hover:scale-125 group-hover:animate-pulse ${dotClass}`}
                style={{ backgroundColor: style.beamColor }}
            ></div>

            {/* Dot */}
            <div className={`absolute top-8 w-12 h-12 rounded-full z-20 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 ${dotClass} bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10`}>
                <div className={`${style.color}`}>
                    {style.icon}
                </div>
            </div>

            {/* Card Content with Magic Effect */}
            <div className={`${isMobile ? 'pl-12 md:pl-0' : ''} ${!isMobile && side === 'left' ? 'flex justify-end' : ''}`}>
               <MagicCard 
                  gradientColor={style.beamColor + '33'}
                  className={`
                    w-full relative rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 
                    transition-all duration-300 hover:-translate-y-1
                    flex flex-col
                    ${!isMobile && side === 'left' ? 'items-end' : ''}
                `}
               >
                  <BorderBeam duration={8} size={150} colorFrom={style.beamColor} colorTo="transparent" />

                  {/* Inner Content Div with Padding */}
                  <div className={`p-6 md:p-8 w-full flex flex-col gap-4 ${!isMobile && side === 'left' ? 'items-end' : ''}`}>
                      <div className={`flex flex-col gap-1 w-full relative z-10 ${alignClass}`}>
                          <div className={`flex items-center gap-2 mb-1 ${!isMobile && side === 'left' ? 'flex-row-reverse' : ''}`}>
                              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.color}`}>
                                  {type}
                              </span>
                              {(isMobile || side === 'right') && (
                                  <span className="flex items-center gap-1 text-xs text-gray-400">
                                      <Calendar className="w-3 h-3" /> {period}
                                  </span>
                              )}
                              {!isMobile && side === 'left' && (
                                  <span className="flex items-center gap-1 text-xs text-gray-400">
                                      {period} <Calendar className="w-3 h-3" />
                                  </span>
                              )}
                          </div>

                          <h3 className={`text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white leading-tight transition-colors ${style.hover}`}>
                              {item.role || item.title}
                          </h3>

                          <div className={`flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium ${!isMobile && side === 'left' ? 'flex-row-reverse' : ''}`}>
                              <span>{item.company}</span>
                          </div>
                      </div>

                      <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed relative z-10 ${!isMobile && side === 'left' ? 'text-right' : 'text-left'}`}>
                          {item.description}
                      </p>

                      {item.skills && (
                          <div className={`flex flex-wrap gap-2 relative z-10 ${skillJustify}`}>
                              {item.skills.map((skill: string) => (
                              <span 
                                  key={skill} 
                                  className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 px-2.5 py-1 rounded-lg"
                              >
                                  {skill}
                              </span>
                              ))}
                          </div>
                      )}

                      {item.link && (
                          <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className={`inline-flex items-center gap-1 text-xs font-bold ${style.color} hover:opacity-80 transition-opacity relative z-10 ${linkAlign}`}
                          >
                              View Project <ArrowUpRight className="w-3 h-3" />
                          </a>
                      )}
                  </div>
               </MagicCard>
            </div>
        </div>
     );
  };

export const Experience: React.FC<ExperienceProps> = ({ experiences, projects }) => {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['work', 'education', 'project']);
  const [animationKey, setAnimationKey] = useState(0);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
    setAnimationKey(prev => prev + 1);
  };

  const groupedItems = useMemo(() => {
    const projectItems = projects.map(p => ({
        _id: p._id,
        role: p.title,
        company: 'Project',
        startDate: '2024-01-01',
        isCurrent: false,
        description: p.description,
        skills: [p.category],
        type: 'project' as const,
        link: p.link
    }));

    const combined = [...experiences, ...projectItems];
    
    combined.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
    });

    const filtered = combined.filter(item => {
        const type = (item as any).type || 'work';
        return activeFilters.includes(type);
    });

    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(item => {
        const year = new Date(item.startDate).getFullYear().toString();
        if (!groups[year]) groups[year] = [];
        groups[year].push(item);
    });

    return groups;
  }, [experiences, projects, activeFilters]);

  const sortedYears = useMemo(() => {
      return Object.keys(groupedItems).sort((a, b) => parseInt(b) - parseInt(a));
  }, [groupedItems]);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'Work', value: 'work' },
    { label: 'Education', value: 'education' },
    { label: 'Certifications', value: 'certification' },
    { label: 'Projects', value: 'project' },
  ];

  let globalIndex = 0;

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-white dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24 gap-6">
            <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                  Timeline
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-sm md:text-base">
                  My professional journey, educational background, and key project milestones.
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {filters.map((f) => {
                const isActive = activeFilters.includes(f.value);
                const styles = getTypeStyles(f.value);
                return (
                  <button
                    key={f.value}
                    onClick={() => toggleFilter(f.value)}
                    className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 border flex items-center justify-center ${
                      isActive 
                        ? `${styles.bg} ${styles.color} ${styles.border}`
                        : 'bg-transparent text-gray-500 border-gray-200 dark:border-white/10 hover:border-gray-400'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
        </div>

        <div className="relative" key={animationKey}>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 dark:via-white/10 to-transparent -translate-x-1/2 hidden md:block z-0" />
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10 md:hidden z-0" />

            {sortedYears.map((year) => {
                const yearItems = groupedItems[year];
                const currentGlobalIndex = globalIndex;
                globalIndex += yearItems.length;

                const leftItems = yearItems.filter((_, i) => i % 2 === 0);
                const rightItems = yearItems.filter((_, i) => i % 2 !== 0);

                return (
                    <div key={year} className="mb-8 md:mb-0 relative">
                        <div className="flex justify-start md:justify-center items-center mb-8 md:mb-12 relative z-20">
                             <div className="absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20 md:hidden"></div>
                             <div className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#050505] shadow-sm relative z-30 ml-8 md:ml-0">
                                <span className="text-base md:text-lg font-display font-bold text-gray-900 dark:text-white tracking-tight">{year}</span>
                             </div>
                        </div>

                        <div className="hidden md:flex flex-row w-full">
                            <div className="w-1/2 pr-12 pb-16 space-y-16 flex flex-col items-end text-right">
                                {leftItems.map((item) => {
                                    const originalIndex = yearItems.indexOf(item);
                                    return (
                                        <TimelineCard 
                                            key={item._id} 
                                            item={item} 
                                            side="left" 
                                            index={currentGlobalIndex + originalIndex}
                                        />
                                    );
                                })}
                            </div>

                            <div className="w-1/2 pl-12 pb-16 pt-32 space-y-16 flex flex-col items-start text-left">
                                {rightItems.map((item) => {
                                    const originalIndex = yearItems.indexOf(item);
                                    return (
                                        <TimelineCard 
                                            key={item._id} 
                                            item={item} 
                                            side="right" 
                                            index={currentGlobalIndex + originalIndex}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        <div className="md:hidden flex flex-col gap-8 pb-12">
                             {yearItems.map((item, index) => (
                                <TimelineCard 
                                    key={`mobile-${item._id}`} 
                                    item={item} 
                                    index={index} 
                                    isMobile={true} 
                                />
                             ))}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  );
};
