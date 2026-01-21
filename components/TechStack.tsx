
import React from 'react';
import { TechItem } from '../types';

// Custom SVG Logos
const NextLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 180 180" fill="currentColor" {...props}>
    <path d="M149.508 157.527L69.143 53H54V125H66.6667V69.7533L139.143 162.72C142.833 161.213 146.293 159.453 149.508 157.527Z" />
    <path d="M115 54H127V125H115V54Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0ZM149.508 157.527C135.508 169.608 115.86 177.375 90 177.375C42.8467 177.375 4.5 138.214 4.5 90C4.5 42.8467 42.8467 4.5 90 4.5C138.214 4.5 177.375 42.8467 177.375 90C177.375 111.93 169.608 131.578 157.527 145.578L149.508 157.527Z" fillOpacity="0.1"/>
  </svg>
);

const ReactLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const TSLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" fill="currentColor" {...props}>
     <rect x="20" y="20" width="88" height="88" rx="10" stroke="currentColor" strokeWidth="8" fill="none" />
     <path d="M59.5,60h-8v28h-8V60h-8V54h24V60z M84.5,68c-1.5-1-3.5-1.5-5.5-1.5c-2.5,0-3.5,1-3.5,2.5c0,1.5,1,2,4,3 c4.5,1.5,8.5,3.5,8.5,9c0,5-4,8.5-11,8.5c-3.5,0-7-1-9.5-3l3-5.5c2,1.5,4.5,2.5,6.5,2.5c2,0,3-1,3-2.5c0-1.5-1.5-2-4.5-3 c-4.5-1.5-8-4-8-9c0-5,4-8,10-8c3,0,6,1,8.5,2L84.5,68z" stroke="none" />
  </svg>
);

const TailwindLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288-1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
);

const FramerLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 14 21" fill="currentColor" {...props}>
    <path d="M0 0h14v7H7L0 0zm0 7h7l7 7H7v7l-7-7V7z"/>
  </svg>
);

const ShadcnLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="208" y1="128" x2="128" y2="208"></line>
    <line x1="192" y1="40" x2="40" y2="192"></line>
  </svg>
);

const DefaultLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="4" />
    </svg>
);

const LogoMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'NextLogo': NextLogo,
    'ReactLogo': ReactLogo,
    'TSLogo': TSLogo,
    'TailwindLogo': TailwindLogo,
    'FramerLogo': FramerLogo,
    'ShadcnLogo': ShadcnLogo,
};

interface TechStackProps {
  techStack: TechItem[];
}

export const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  return (
    <section id="expertise" className="py-12 relative overflow-hidden bg-white dark:bg-[#050505] border-y border-gray-100 dark:border-white/5">
      <div className="max-w-[100vw] mx-auto relative">
        
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10"></div>

        <div className="flex w-full overflow-hidden group">
            <div className="flex animate-infinite-scroll group-hover:[animation-play-state:paused] gap-16 py-4 px-8 items-center">
                {/* Render items multiple times for loop */}
                {[...techStack, ...techStack, ...techStack].map((item, index) => {
                    const LogoComponent = LogoMap[item.iconName] || DefaultLogo;
                    return (
                        <div 
                            key={`${item.title}-${index}`} 
                            className="flex items-center justify-center flex-shrink-0 group/item cursor-default"
                        >
                            <div className={`transition-all duration-300 filter grayscale opacity-40 group-hover/item:grayscale-0 group-hover/item:opacity-100 transform group-hover/item:scale-110 ${item.color}`}>
                                <LogoComponent className="h-10 w-auto" />
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
