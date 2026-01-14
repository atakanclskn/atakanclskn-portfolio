
import React, { useState, useMemo } from 'react';
import { ExperienceItem, Project } from '../types';
import { GraduationCap, Briefcase, Award, FolderGit2, Sparkles, Binary } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceItem[];
  projects: Project[];
}

type FilterType = 'work' | 'education' | 'certification' | 'project';

export const Experience: React.FC<ExperienceProps> = ({ experiences, projects }) => {
  // Default to showing Work and Projects for a good first impression
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['work', 'project']);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  // Map projects to a timeline-compatible format
  const mappedProjects: ExperienceItem[] = useMemo(() => {
    return projects.map(p => ({
      _id: p._id,
      role: p.title,
      company: p.category || 'GitHub Project',
      startDate: new Date().toISOString(), // Use for sorting
      isCurrent: false,
      description: p.description,
      skills: p.language ? [p.language] : [],
      type: 'project' as any
    }));
  }, [projects]);

  // Combine and sort all items
  const allTimelineItems = useMemo(() => {
    const combined = [...experiences, ...mappedProjects];
    return combined.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [experiences, mappedProjects]);

  // Filter based on active selection
  const filteredItems = useMemo(() => {
    return allTimelineItems.filter(item => {
        const type = (item as any).type || 'work';
        return activeFilters.includes(type);
    });
  }, [allTimelineItems, activeFilters]);

  const getIcon = (type?: string) => {
    switch (type) {
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'certification': return <Award className="w-5 h-5" />;
      case 'project': return <FolderGit2 className="w-5 h-5" />;
      case 'work': default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type?: string) => {
    switch (type) {
      case 'education': return 'EDUCATION';
      case 'certification': return 'LICENSE & CERT';
      case 'project': return 'PROJECT';
      default: return 'EXPERIENCE';
    }
  };

  const getTypeColorClasses = (type: FilterType, isActive: boolean) => {
    const colors = {
      work: {
        active: 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]',
        inactive: 'border-primary/30 text-gray-500 hover:border-primary/60',
        text: 'text-primary'
      },
      education: {
        active: 'bg-secondary/20 border-secondary text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]',
        inactive: 'border-secondary/30 text-gray-500 hover:border-secondary/60',
        text: 'text-secondary'
      },
      certification: {
        active: 'bg-yellow-400/20 border-yellow-400 text-white shadow-[0_0_15px_rgba(250,204,21,0.3)]',
        inactive: 'border-yellow-400/30 text-gray-500 hover:border-yellow-400/60',
        text: 'text-yellow-400'
      },
      project: {
        active: 'bg-emerald-400/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(52,211,153,0.3)]',
        inactive: 'border-emerald-400/30 text-gray-500 hover:border-emerald-400/60',
        text: 'text-emerald-400'
      }
    };
    return isActive ? colors[type].active : colors[type].inactive;
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: 'WORK', value: 'work' },
    { label: 'EDUCATION', value: 'education' },
    { label: 'CERTS', value: 'certification' },
    { label: 'PROJECTS', value: 'project' },
  ];

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-6">
              The Journey
            </h2>
            <div className="w-16 h-1.5 bg-primary rounded-full mb-10"></div>
            
            {/* Interactive Multi-Select Filter Bar */}
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              {filters.map((f) => {
                const isActive = activeFilters.includes(f.value);
                return (
                  <button
                    key={f.value}
                    onClick={() => toggleFilter(f.value)}
                    className={`px-8 py-3 rounded-full text-[11px] font-mono font-bold tracking-[0.2em] transition-all duration-500 border-2 ${
                      getTypeColorClasses(f.value, isActive)
                    } ${isActive ? 'scale-110' : 'scale-100 hover:scale-105'}`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] flex items-center gap-3">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              Toggle categories to filter results
            </p>
        </div>

        <div className="relative min-h-[500px]">
          {/* Central Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 -translate-x-1/2 hidden md:block"></div>
          <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/10 md:hidden"></div>

          <div className="space-y-16 md:space-y-0">
            {filteredItems.length > 0 ? (
              filteredItems.map((exp, index) => {
                const isEven = index % 2 === 0;
                const type = (exp as any).type || 'work';
                const startYear = new Date(exp.startDate).getFullYear();
                const endYear = exp.isCurrent ? 'PRESENT' : exp.endDate ? new Date(exp.endDate).getFullYear() : '';
                
                const isProject = type === 'project';
                const period = isProject ? 'MILESTONE' : (exp.startDate === exp.endDate || !exp.endDate ? startYear : `${startYear} — ${endYear}`);

                // Visual theme based on type
                const themeColor = type === 'education' ? 'text-secondary' : type === 'certification' ? 'text-yellow-400' : type === 'project' ? 'text-emerald-400' : 'text-primary';
                const nodeBorder = type === 'education' ? 'group-hover:border-secondary' : type === 'certification' ? 'group-hover:border-yellow-400' : type === 'project' ? 'group-hover:border-emerald-400' : 'group-hover:border-primary';

                return (
                  <div 
                    key={exp._id} 
                    className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-20 md:mb-32 group transition-all duration-1000 animate-in fade-in slide-in-from-bottom-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                      <div className="relative">
                        <div className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-3 ${themeColor}`}>
                          {getTypeLabel(type)}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight mb-2 group-hover:text-white transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-gray-400 font-medium text-xl mb-5">{exp.company}</p>
                        <p className={`text-gray-500 text-sm leading-relaxed mb-8 max-w-xl ${isEven ? 'ml-auto mr-0' : 'mr-auto ml-0'}`}>
                          {exp.description}
                        </p>
                        
                        {exp.skills && (
                          <div className={`flex flex-wrap gap-2.5 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            {exp.skills.map(skill => (
                              <span 
                                key={skill} 
                                className={`px-4 py-1.5 rounded-lg bg-white/5 text-[10px] font-mono font-bold text-gray-500 border border-white/5 transition-all duration-300 group-hover:border-current group-hover:text-gray-300`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Icon Node */}
                    <div className={`absolute left-6 md:left-1/2 top-0 md:top-auto w-14 h-14 rounded-2xl bg-surface border-2 border-white/5 shadow-2xl transition-all duration-700 z-10 -translate-x-1/2 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 ${nodeBorder}`}>
                      <div className={`transition-colors duration-500 ${themeColor} opacity-40 group-hover:opacity-100`}>
                          {getIcon(type)}
                      </div>
                      {exp.isCurrent && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-background animate-pulse"></span>
                      )}
                    </div>

                    <div className={`w-full md:w-[45%] pl-16 md:pl-0 mt-4 md:mt-0 ${isEven ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'}`}>
                      <span className={`text-lg md:text-2xl font-mono font-bold tracking-tighter transition-all duration-700 opacity-20 group-hover:opacity-100 ${themeColor}`}>
                        {period}
                      </span>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center animate-in zoom-in duration-700">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 animate-pulse">
                   <Binary className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-500 mb-2 uppercase tracking-widest">System Standby</h3>
                <p className="text-gray-600 font-mono text-sm">Select one or more data modules to initialize the timeline.</p>
                <button 
                  onClick={() => setActiveFilters(['work', 'education', 'certification', 'project'])} 
                  className="mt-8 text-primary/50 text-xs hover:text-primary transition-all uppercase tracking-[0.3em] font-bold border-b border-primary/20 hover:border-primary pb-1"
                >
                  Load All Modules
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none opacity-20"></div>
    </section>
  );
};
