import React from 'react';
import { ExperienceItem } from '../types';

const experiences: ExperienceItem[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'TechFlow Inc.',
    period: '2022 - PRESENT',
    description: 'Spearheading the frontend architecture migration to Next.js and establishing a unified design system.',
    active: true
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'Creative Agency',
    period: '2020 - 2022',
    description: 'Developed bespoke e-commerce solutions and interactive campaign sites for global brands.',
    active: false
  },
  {
    id: '3',
    role: 'Freelance Developer',
    company: 'Self-Employed',
    period: '2018 - 2020',
    description: 'Kickstarted my career building high-conversion websites for local businesses and content creators.',
    active: false
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="journey" className="py-32 relative border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-20 text-center tracking-tight">The Journey</h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 h-full w-px bg-gradient-to-b from-white/10 via-primary/50 to-white/10 -translate-x-1/2"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                
                {/* Left Side (Text for Odd, Date for Even on Desktop) */}
                <div className={`md:w-5/12 pl-12 md:pl-0 md:pr-12 ${index % 2 === 0 ? 'md:text-right order-2 md:order-1' : 'order-3 md:order-3'}`}>
                  {index % 2 === 0 ? (
                    <>
                      <h3 className="text-2xl font-bold text-white font-display">{exp.role}</h3>
                      <p className="text-primary font-mono text-sm mb-3">{exp.company}</p>
                      <p className="text-gray-400 text-base leading-relaxed">{exp.description}</p>
                    </>
                  ) : (
                    <span className="hidden md:block text-sm font-mono font-bold text-gray-500 group-hover:text-primary transition-colors">{exp.period}</span>
                  )}
                </div>

                {/* Center Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-surface border-4 border-background shadow-[0_0_0_2px_#333] group-hover:shadow-[0_0_0_2px_#06b6d4] group-hover:bg-primary transition-all z-10 -translate-x-1/2 flex items-center justify-center order-1 md:order-2">
                  <div className={`w-2 h-2 bg-white rounded-full transition-opacity ${exp.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                </div>

                {/* Right Side (Date for Odd, Text for Even on Desktop) */}
                <div className={`md:w-5/12 pl-12 md:pl-12 ${index % 2 === 0 ? 'order-3 md:order-3' : 'order-2 md:order-1 md:text-right md:pr-12 md:pl-0'}`}>
                   {index % 2 === 0 ? (
                    <span className="block text-sm font-mono font-bold text-gray-500 group-hover:text-primary transition-colors mt-2 md:mt-0">{exp.period}</span>
                   ) : (
                    <>
                      <h3 className="text-2xl font-bold text-white font-display">{exp.role}</h3>
                      <p className="text-primary font-mono text-sm mb-3">{exp.company}</p>
                      <p className="text-gray-400 text-base leading-relaxed">{exp.description}</p>
                      <span className="block md:hidden text-sm font-mono font-bold text-gray-500 group-hover:text-primary transition-colors mt-2">{exp.period}</span>
                    </>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};