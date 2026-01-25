
import React from 'react';
import { TechItem } from '../types';

// Tech Logos from CDN
interface LogoProps {
  className?: string;
  color?: string;
}

const NextLogo = ({ className, color = '000000' }: LogoProps) => (
  <img 
    src={`https://cdn.simpleicons.org/nextdotjs/${color}`}
    alt="Next.js"
    className={className}
  />
);

const ReactLogo = ({ className, color = '61DAFB' }: LogoProps) => (
  <img 
    src={`https://cdn.simpleicons.org/react/${color}`}
    alt="React"
    className={className}
  />
);

const TypeScriptLogo = ({ className, color = '3178C6' }: LogoProps) => (
  <img 
    src={`https://cdn.simpleicons.org/typescript/${color}`}
    alt="TypeScript"
    className={className}
  />
);

const TailwindLogo = ({ className, color = '06B6D4' }: LogoProps) => (
  <img 
    src={`https://cdn.simpleicons.org/tailwindcss/${color}`}
    alt="Tailwind CSS"
    className={className}
  />
);

const FramerLogo = ({ className, color = '0055FF' }: LogoProps) => (
  <img 
    src={`https://cdn.simpleicons.org/framer/${color}`}
    alt="Framer"
    className={className}
  />
);

const ViteLogo = ({ className, color = '646CFF' }: LogoProps) => (
  <img 
    src={`https://cdn.simpleicons.org/vite/${color}`}
    alt="Vite"
    className={className}
  />
);

const SanityCMSLogo = ({ className, color = 'F03E2F' }: LogoProps) => (
  <img 
    src={`https://cdn.simpleicons.org/sanity/${color}`}
    alt="Sanity CMS"
    className={className}
  />
);

const PythonLogo = ({ className, color = '3776AB' }: LogoProps) => (
  <img 
    src={`https://cdn.simpleicons.org/python/${color}`}
    alt="Python"
    className={className}
  />
);

const NodeJSLogo = ({ className, color = '5FA04E' }: LogoProps) => (
  <img 
    src={`https://cdn.simpleicons.org/nodedotjs/${color}`}
    alt="Node.js"
    className={className}
  />
);

const LogoMap: Record<string, React.FC<LogoProps>> = {
    'NextLogo': NextLogo,
    'ReactLogo': ReactLogo,
    'TypeScriptLogo': TypeScriptLogo,
    'TailwindLogo': TailwindLogo,
    'FramerLogo': FramerLogo,
    'ViteLogo': ViteLogo,
    'SanityCMSLogo': SanityCMSLogo,
    'PythonLogo': PythonLogo,
    'NodeJSLogo': NodeJSLogo,
};

interface TechStackProps {
  techStack: TechItem[];
}

export const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  return (
    <section id="tech-stack" className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-[#050505] dark:via-[#0a0a0a] dark:to-[#050505]">
      {/* Gradient Masks - Full section height */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 xl:w-80 bg-gradient-to-r from-white via-white via-50% to-transparent dark:from-[#050505] dark:via-[#050505] dark:via-50% dark:to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 xl:w-80 bg-gradient-to-l from-white via-white via-50% to-transparent dark:from-[#050505] dark:via-[#050505] dark:via-50% dark:to-transparent z-10 pointer-events-none"></div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technology Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tools and technologies I use to build modern applications
          </p>
        </div>
      </div>

      {/* Tech Stack Carousel - Full Width */}
      <div className="relative w-full">
        {/* Scrolling Container */}
        <div className="overflow-hidden w-full flex items-center">
          <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] items-center">
            {/* Duplicate items for seamless loop */}
            {[...techStack, ...techStack, ...techStack].map((item, index) => {
              const LogoComponent = LogoMap[item.iconName] || null;
              return (
                <div 
                  key={`${item._id}-${index}`} 
                  className="flex-shrink-0 px-8 py-6 group cursor-default"
                >
                  <div className="flex flex-col items-center gap-4 transition-all duration-300">
                    {/* Logo Container */}
                    <div className={`
                      relative w-16 h-16 flex items-center justify-center
                      rounded-2xl bg-white dark:bg-white/5 
                      border border-gray-200/50 dark:border-white/10
                      shadow-sm hover:shadow-lg
                      transition-all duration-300 ease-out
                      group-hover:scale-110 group-hover:-translate-y-1
                      group-hover:border-gray-300 dark:group-hover:border-white/20
                    `}>
                      {LogoComponent ? (
                        <LogoComponent className="w-9 h-9 transition-all duration-300 opacity-70 group-hover:opacity-100" />
                      ) : (
                        <span className="text-2xl font-bold opacity-70 group-hover:opacity-100">{item.title[0]}</span>
                      )}
                    </div>
                    
                    {/* Tech Name */}
                    <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                        {item.title}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                        {item.tech}
                      </span>
                    </div>
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
