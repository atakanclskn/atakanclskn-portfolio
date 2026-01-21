
import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { Profile } from '../types';
import { useLanguage } from '../lib/i18n';

interface HeroProps {
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const { t } = useLanguage();

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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent transition-colors duration-300">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center w-full">
        
        <div className="mb-6 md:mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium tracking-wide text-gray-600 dark:text-gray-300">
               {t.hero.status}
            </span>
          </div>
        </div>

        {/* Friendly Title */}
        <div className="mb-6 md:mb-8">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-4 md:mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                {t.hero.greeting} {profile?.name ? profile.name.split(' ')[0] : 'Atakan'}.
            </h1>
            <h2 className="text-xl md:text-4xl font-display font-medium text-gray-500 dark:text-gray-400 animate-fade-in-up px-4" style={{animationDelay: '0.3s'}}>
                {t.hero.role}
            </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-xl max-w-2xl leading-relaxed font-sans mb-10 md:mb-12 animate-fade-in-up px-4" style={{animationDelay: '0.4s'}}>
          {t.hero.bio}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <a 
            href="#projects" 
            onClick={scrollToProjects}
            className="w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
          >
            {t.hero.checkWork} <ArrowRight className="w-4 h-4" />
          </a>
          
          <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            {t.hero.resume} <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
