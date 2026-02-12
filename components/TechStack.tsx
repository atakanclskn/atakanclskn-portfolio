
import React, { useEffect, useRef, useState } from 'react';
import { TechItem } from '../types';

// Dynamic icon component that uses Devicon CDN (original colored logos)
interface DynamicIconProps {
  iconName: string;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, className }) => {
  // Map icon names to Devicon format
  const iconMap: Record<string, string> = {
    // Legacy names
    'NextLogo': 'nextjs',
    'ReactLogo': 'react',
    'TypeScriptLogo': 'typescript',
    'TailwindLogo': 'tailwindcss',
    'FramerLogo': 'framer',
    'ViteLogo': 'vitejs',
    'SanityCMSLogo': 'sanity',
    'PythonLogo': 'python',
    'NodeJSLogo': 'nodejs',
    'VueLogo': 'vuejs',
    'AngularLogo': 'angularjs',
    'SvelteLogo': 'svelte',
    'JavaScriptLogo': 'javascript',
    'GoLogo': 'go',
    'RustLogo': 'rust',
    'JavaLogo': 'java',
    'CSSLogo': 'css3',
    'SassLogo': 'sass',
    'StyledComponentsLogo': 'css3',
    'NodeLogo': 'nodejs',
    'ExpressLogo': 'express',
    'MongoDBLogo': 'mongodb',
    'PostgreSQLLogo': 'postgresql',
    'MySQLLogo': 'mysql',
    'RedisLogo': 'redis',
    'SupabaseLogo': 'supabase',
    'FirebaseLogo': 'firebase',
    'GitLogo': 'git',
    'DockerLogo': 'docker',
    'VercelLogo': 'vercel',
    'FigmaLogo': 'figma',
    'SanityLogo': 'sanity',
    'GraphQLLogo': 'graphql',
    // SimpleIcons format to Devicon
    'nextdotjs': 'nextjs',
    'nodedotjs': 'nodejs',
    'vuedotjs': 'vuejs',
    'tailwindcss': 'tailwindcss',
    'openjdk': 'java',
    'cplusplus': 'cplusplus',
    'csharp': 'csharp',
    'vite': 'vitejs',
    'amazonaws': 'amazonwebservices',
    'googlecloud': 'googlecloud',
    'microsoftazure': 'azure',
    'rubyonrails': 'rails',
  };

  // Use mapped name or the iconName directly
  const resolvedIcon = iconMap[iconName] || iconName;
  
  // Devicon CDN URL with original colors
  const iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${resolvedIcon}/${resolvedIcon}-original.svg`;
  
  return (
    <img 
      src={iconUrl}
      alt={iconName}
      className={className}
      onError={(e) => {
        // Try plain version as fallback
        const target = e.target as HTMLImageElement;
        if (!target.src.includes('-plain')) {
          target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${resolvedIcon}/${resolvedIcon}-plain.svg`;
        } else {
          target.style.display = 'none';
        }
      }}
    />
  );
};

interface TechStackProps {
  techStack: TechItem[];
}

export const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0); // Keep scroll position persistent
  const [isHovered, setIsHovered] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  
  // Create enough duplicates for seamless infinite scroll
  const items = techStack.length > 0 ? techStack : [];
  const duplicatedItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || items.length === 0) return;

    let animationId: number;
    const speed = 0.5; // pixels per frame
    const itemWidth = 160; // approximate width per item
    const resetPoint = items.length * itemWidth;

    const animate = () => {
      if (!isHovered) {
        scrollPositionRef.current += speed;
        
        // Reset position seamlessly when we've scrolled through one set
        if (scrollPositionRef.current >= resetPoint) {
          scrollPositionRef.current = 0;
        }
        
        scrollContainer.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [items.length, isHovered]);

  if (items.length === 0) {
    return null;
  }

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
      <div 
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Scrolling Container */}
        <div 
          ref={scrollRef}
          className="flex items-center will-change-transform"
          style={{ width: 'max-content' }}
        >
          {duplicatedItems.map((item, index) => (
            <div 
              key={`${item._id}-${index}`} 
              className="flex-shrink-0 px-8 py-6 group cursor-default"
              style={{ width: '160px' }}
            >
              <div className="flex flex-col items-center gap-4 transition-all duration-100">
                {/* Logo Container */}
                <div 
                  className={`
                    relative w-16 h-16 flex items-center justify-center
                    rounded-2xl
                    border border-gray-200/50 dark:border-white/10
                    shadow-md hover:shadow-xl
                    backdrop-blur-sm
                    transition-all duration-300 ease-out
                    group-hover:scale-110 group-hover:-translate-y-1
                    group-hover:border-gray-300 dark:group-hover:border-white/20
                    group-hover:shadow-primary/20 dark:group-hover:shadow-primary/10
                  `}
                  style={{
                    background: isDark 
                      ? 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)'
                      : 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 50%, transparent 100%)'
                  }}
                >
                  <DynamicIcon 
                    iconName={item.iconName} 
                    className="w-9 h-9 transition-all duration-300 relative z-10" 
                  />
                </div>
                
                {/* Tech Name - Always visible */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {item.title}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                    {item.tech}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
