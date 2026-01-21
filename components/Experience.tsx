
import React, { useState, useMemo, useEffect } from 'react';
import { ExperienceItem, Project } from '../types';
import { GraduationCap, Briefcase, Award, FolderGit2, Calendar, ArrowUpRight } from 'lucide-react';
import { BorderBeam } from './BorderBeam';

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

     // Desktop specific classes
     const dotClass = isMobile 
        ? "left-0 -translate-x-1/2" 
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

            {/* Dot (Clean Version) */}
            <div className={`absolute top-8 w-12 h-12 rounded-full z-20 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 ${dotClass} bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10`}>
                <div className={`${style.color}`}>
                    {style.icon}
                </div>
            </div>

            {/* Card Content */}
            <div className={`
                relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 
                hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                flex flex-col gap-4 overflow-hidden
                ${isMobile ? 'ml-6' : ''}
                ${!isMobile && side === 'left' ? 'items-end' : ''}
            `}>
                <BorderBeam duration={8} size={150} colorFrom={style.beamColor} colorTo="transparent" />

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

                     <h3 className={`text-2xl font-display font-bold text-gray-900 dark:text-white leading-tight transition-colors ${style.hover}`}>
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
        </div>
     );
  };

export const Experience: React.FC<ExperienceProps> = ({ experiences, projects }) => {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['work', 'education', 'project']);
  // Add a key state to force re-render of animations when filters change
  const [animationKey, setAnimationKey] = useState(0);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
    setAnimationKey(prev => prev + 1);
  };

  // Merge Experiences and Projects into a single timeline list
  const allTimelineItems = useMemo(() => {
    const projectItems = projects.map(p => ({
        _id: p._id,
        role: p.title,
        company: 'Project',
        startDate: '2024-01-01', // Fallback
        isCurrent: false,
        description: p.description,
        skills: [p.category],
        type: 'project' as const,
        link: p.link
    }));

    const combined = [...experiences, ...projectItems];
    
    // Sort by date descending
    return combined.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateB - dateA;
    });
  }, [experiences, projects]);

  const filteredItems = useMemo(() => {
    return allTimelineItems.filter(item => {
        const type = (item as any).type || 'work';
        return activeFilters.includes(type);
    });
  }, [allTimelineItems, activeFilters]);

  // Split items for Desktop 2-Column Layout
  const leftItems = filteredItems.filter((_, i) => i % 2 === 0);
  const rightItems = filteredItems.filter((_, i) => i % 2 !== 0);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'Work', value: 'work' },
    { label: 'Education', value: 'education' },
    { label: 'Certifications', value: 'certification' },
    { label: 'Projects', value: 'project' },
  ];

  return (
    <section id="experience" className="py-32 relative bg-white dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-24 gap-6">
            <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                  Timeline
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                  My professional journey, educational background, and key project milestones.
                </p>
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((f) => {
                const isActive = activeFilters.includes(f.value);
                const styles = getTypeStyles(f.value);
                
                return (
                  <button
                    key={f.value}
                    onClick={() => toggleFilter(f.value)}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 border flex items-center justify-center ${
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

        {/* We use a key here to force re-mounting when filters change, triggering CSS animations */}
        <div className="relative" key={animationKey}>
            {/* Mobile View (Single Line) */}
            <div className="md:hidden relative border-l border-gray-200 dark:border-white/10 ml-4 space-y-12 pb-12">
                {filteredItems.map((item, index) => (
                    <TimelineCard key={item._id} item={item} isMobile={true} index={index} />
                ))}
            </div>

            {/* Desktop View (Dual Column Masonry) */}
            <div className="hidden md:grid grid-cols-2 gap-x-0 relative">
                 {/* Center Line with Gradient Fade */}
                 <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-white/20 to-transparent -translate-x-1/2"></div>
                 
                 {/* Left Column */}
                 <div className="pr-12 space-y-16 py-4">
                     {leftItems.map((item, index) => (
                         <TimelineCard key={item._id} item={item} side="left" index={index * 2} />
                     ))}
                 </div>

                 {/* Right Column (Offset start) */}
                 <div className="pl-12 space-y-16 py-4 mt-32">
                     {rightItems.map((item, index) => (
                         <TimelineCard key={item._id} item={item} side="right" index={(index * 2) + 1} />
                     ))}
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};
