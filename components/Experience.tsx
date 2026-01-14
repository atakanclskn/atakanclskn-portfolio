import React from 'react';
import { ExperienceItem } from '../types';
import { GraduationCap, Briefcase, Award } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const getIcon = (type?: string) => {
    switch (type) {
      case 'education': return <GraduationCap className="w-4 h-4 text-white" />;
      case 'certification': return <Award className="w-4 h-4 text-white" />;
      case 'work': default: return <Briefcase className="w-4 h-4 text-white" />;
    }
  };

  const getTypeLabel = (type?: string) => {
    switch (type) {
      case 'education': return 'EDUCATION';
      case 'certification': return 'LICENSE & CERTIFICATION';
      default: return 'EXPERIENCE';
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'education': return 'text-secondary';
      case 'certification': return 'text-yellow-400';
      default: return 'text-primary';
    }
  };

  return (
    <section id="journey" className="py-32 relative border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">The Journey</h2>
            <div className="w-12 h-1 bg-primary rounded-full mb-6"></div>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">A Timeline of Growth & Innovation</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 h-full w-px bg-gradient-to-b from-white/10 via-primary/50 to-white/10 -translate-x-1/2"></div>

          <div className="space-y-16">
            {experiences?.map((exp, index) => {
              const startYear = new Date(exp.startDate).getFullYear();
              const endYear = exp.isCurrent ? 'PRESENT' : exp.endDate ? new Date(exp.endDate).getFullYear() : '';
              const period = exp.startDate === exp.endDate || !exp.endDate ? startYear : `${startYear} - ${endYear}`;

              return (
                <div key={exp._id} className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                  
                  {/* Left Side (Text for Odd, Date for Even on Desktop) */}
                  <div className={`md:w-5/12 pl-12 md:pl-0 md:pr-12 ${index % 2 === 0 ? 'md:text-right order-2 md:order-1' : 'order-3 md:order-3'}`}>
                    {index % 2 === 0 ? (
                      <>
                        <div className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${getTypeColor(exp.type)}`}>{getTypeLabel(exp.type)}</div>
                        <h3 className="text-2xl font-bold text-white font-display leading-tight">{exp.role}</h3>
                        <p className="text-gray-300 font-mono text-sm mb-3 mt-1">{exp.company}</p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>
                        {exp.skills && (
                            <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                {exp.skills.slice(0, 4).map(skill => (
                                    <span key={skill} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-500 border border-white/5">{skill}</span>
                                ))}
                            </div>
                        )}
                      </>
                    ) : (
                      <span className="hidden md:block text-sm font-mono font-bold text-gray-500 group-hover:text-primary transition-colors">{period}</span>
                    )}
                  </div>

                  {/* Center Node */}
                  <div className={`absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-surface border-4 border-background shadow-[0_0_0_2px_#333] group-hover:shadow-[0_0_0_4px_#06b6d4] group-hover:bg-primary transition-all z-10 -translate-x-1/2 flex items-center justify-center order-1 md:order-2 ${exp.isCurrent ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-black' : ''}`}>
                    <div className="group-hover:text-black transition-colors text-white/50">
                        {getIcon(exp.type)}
                    </div>
                  </div>

                  {/* Right Side (Date for Odd, Text for Even on Desktop) */}
                  <div className={`md:w-5/12 pl-12 md:pl-12 ${index % 2 === 0 ? 'order-3 md:order-3' : 'order-2 md:order-1 md:text-right md:pr-12 md:pl-0'}`}>
                     {index % 2 === 0 ? (
                      <span className="block text-sm font-mono font-bold text-gray-500 group-hover:text-primary transition-colors mt-2 md:mt-0">{period}</span>
                     ) : (
                      <>
                         <div className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${getTypeColor(exp.type)}`}>{getTypeLabel(exp.type)}</div>
                        <h3 className="text-2xl font-bold text-white font-display leading-tight">{exp.role}</h3>
                        <p className="text-gray-300 font-mono text-sm mb-3 mt-1">{exp.company}</p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>
                         {exp.skills && (
                            <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                {exp.skills.slice(0, 4).map(skill => (
                                    <span key={skill} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-500 border border-white/5">{skill}</span>
                                ))}
                            </div>
                        )}
                        <span className="block md:hidden text-sm font-mono font-bold text-gray-500 group-hover:text-primary transition-colors mt-2">{period}</span>
                      </>
                     )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};