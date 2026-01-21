
import React from 'react';
import { Box, Database, Cpu, Palette, Code, Terminal, Server, Globe, Layout, Figma, Smartphone, Cloud } from 'lucide-react';
import { TechItem } from '../types';

const IconMap: Record<string, React.ReactNode> = {
  Box: <Box className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />,
  Terminal: <Terminal className="w-8 h-8" />,
  Server: <Server className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
  Layout: <Layout className="w-8 h-8" />,
  Figma: <Figma className="w-8 h-8" />,
  Smartphone: <Smartphone className="w-8 h-8" />,
  Cloud: <Cloud className="w-8 h-8" />,
};

interface TechStackProps {
  techStack: TechItem[];
}

export const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  // If no tech stack provided, ensure we have enough items for the marquee to look good
  const items = techStack.length > 0 ? techStack : [
    { _id: '1', title: 'React', tech: 'Frontend', iconName: 'Box', color: 'text-cyan-400' },
    { _id: '2', title: 'TypeScript', tech: 'Language', iconName: 'Code', color: 'text-blue-500' },
    { _id: '3', title: 'Node.js', tech: 'Backend', iconName: 'Server', color: 'text-green-500' },
    { _id: '4', title: 'Tailwind', tech: 'Styling', iconName: 'Palette', color: 'text-pink-400' },
    { _id: '5', title: 'PostgreSQL', tech: 'Database', iconName: 'Database', color: 'text-purple-400' },
    { _id: '6', title: 'AWS', tech: 'Cloud', iconName: 'Globe', color: 'text-yellow-500' },
    { _id: '7', title: 'Next.js', tech: 'Framework', iconName: 'Terminal', color: 'text-white' },
    { _id: '8', title: 'Figma', tech: 'Design', iconName: 'Figma', color: 'text-orange-500' }
  ];

  return (
    <section id="expertise" className="py-12 relative overflow-hidden bg-white dark:bg-[#050505] border-y border-gray-100 dark:border-white/5">
      <div className="max-w-[100vw] mx-auto relative">
        
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10"></div>

        <div className="flex w-full overflow-hidden group">
            <div className="flex animate-infinite-scroll group-hover:[animation-play-state:paused] gap-16 py-4">
                {/* Render items twice to create seamless loop */}
                {[...items, ...items, ...items].map((item, index) => (
                    <div 
                        key={`${item._id}-${index}`} 
                        className="flex items-center gap-3 flex-shrink-0 group/item cursor-default"
                    >
                        <div className={`transition-all duration-300 filter grayscale opacity-50 group-hover/item:grayscale-0 group-hover/item:opacity-100 ${item.color}`}>
                             {IconMap[item.iconName] || <Code className="w-8 h-8" />}
                        </div>
                        <span className="text-xl font-display font-bold text-gray-400 dark:text-gray-600 group-hover/item:text-black dark:group-hover/item:text-white transition-colors">
                            {item.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
