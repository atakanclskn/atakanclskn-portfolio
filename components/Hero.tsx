
import React from 'react';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gray-50 dark:bg-transparent transition-colors duration-300">
      {/* Background ambient glows - Visible mainly in dark mode */}
      <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 dark:bg-primary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/20 dark:bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center w-full">
        
        <div className="mb-6 md:mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-gray-600 dark:text-gray-300">
               Available for new projects
            </span>
          </div>
        </div>

        {/* Friendly Title */}
        <div className="mb-6 md:mb-8">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-4 md:mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Hi, I'm {profile?.name ? profile.name.split(' ')[0] : 'Atakan'}.
            </h1>
            <h2 className="text-xl md:text-4xl font-display font-medium text-gray-500 dark:text-gray-400 animate-fade-in-up px-4" style={{animationDelay: '0.3s'}}>
                Building digital products, brands, and experiences.
            </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-xl max-w-2xl leading-relaxed font-sans mb-10 md:mb-12 animate-fade-in-up px-4" style={{animationDelay: '0.4s'}}>
          {profile?.bio || 'Software Engineer and Designer specializing in building exceptional digital experiences. Currently focused on accessible, human-centered products.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <a 
            href="#projects" 
            onClick={scrollToProjects}
            className="w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Check my work <ArrowRight className="w-4 h-4" />
          </a>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            Download Resume <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 dark:opacity-20 text-black dark:text-white">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};
