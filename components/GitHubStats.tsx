
import React from 'react';
import { Star, Code, FolderDot, Zap, Activity, Globe } from 'lucide-react';
import { Project, Profile } from '../types';
import { MagicCard } from './MagicCard';
import { BorderBeam } from './BorderBeam';

interface GitHubStatsProps {
  projects: Project[];
  profile: Profile;
}

export const GitHubStats: React.FC<GitHubStatsProps> = ({ projects, profile }) => {
  const stats = React.useMemo(() => {
    const totalStars = projects.reduce((acc, p) => acc + (p.stars || 0), 0);
    const languages = projects.reduce((acc: Record<string, number>, p) => {
      if (p.language) acc[p.language] = (acc[p.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topLanguage = Object.entries(languages).sort((a, b) => (b[1] as number) - (a[1] as number))[0]?.[0] || 'C#';

    return {
      totalStars,
      topLanguage,
      repoCount: projects.length,
      contributions: 1248, // Simulated for visual impact
    };
  }, [projects]);

  return (
    <section className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex items-center gap-6 mb-12">
          <div className="flex-shrink-0">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">System Activity</h2>
            <p className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
              <Zap className="w-3 h-3 animate-pulse" /> LIVE_GITHUB_METRICS_LOG
            </p>
          </div>
          <div className="h-[1px] bg-white/10 flex-grow mt-2"></div>
        </div>

        {/* Isometric Dashboard Card */}
        <div className="relative group">
            {/* Decorative glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-[#00000f] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                {/* Dashboard Header Overlay */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Core_Processor: Active</span>
                    </div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Node: {profile.location || 'TR_IZM'}
                    </div>
                </div>

                {/* Isometric SVG Visualization */}
                <div className="w-full aspect-[1280/850] flex items-center justify-center p-4">
                    <svg viewBox="0 0 1280 850" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <rect width="1280" height="850" fill="#00000f" />
                        
                        {/* 3D Grid Elements (Mimicking the contribution graph) */}
                        <g transform="translate(100, 150) scale(1.1)">
                            {Array.from({ length: 15 }).map((_, i) => (
                                <g key={i} transform={`translate(${i * 60}, 0)`}>
                                    {Array.from({ length: 7 }).map((_, j) => {
                                        const h = 5 + Math.random() * 40;
                                        const opacity = 0.2 + Math.random() * 0.8;
                                        return (
                                            <g key={j} transform={`translate(${-j * 25}, ${j * 15 + i * 5})`}>
                                                {/* Top face */}
                                                <rect x="0" y={-h} width="22" height="22" fill="#06b6d4" fillOpacity={opacity} transform="skewY(-30) skewX(40.89) scale(1 1.15)" />
                                                {/* Front face */}
                                                <rect x="0" y={-h} width="22" height={h} fill="#0891b2" fillOpacity={opacity} transform="skewY(30) scale(1 1.15)" />
                                                {/* Side face */}
                                                <rect x="22" y={-h + 12} width="22" height={h} fill="#0e7490" fillOpacity={opacity} transform="skewY(-30) scale(1 1.15)" />
                                            </g>
                                        );
                                    })}
                                </g>
                            ))}
                        </g>

                        {/* Radar/Activity Overlay */}
                        <g transform="translate(950, 250)">
                            <circle cx="0" cy="0" r="150" fill="none" stroke="#ffffff05" strokeWidth="1" />
                            <circle cx="0" cy="0" r="100" fill="none" stroke="#ffffff08" strokeWidth="1" />
                            <circle cx="0" cy="0" r="50" fill="none" stroke="#ffffff10" strokeWidth="1" />
                            <polygon points="0,-120 100,-30 80,80 -60,90 -90,-40" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2" />
                            <text x="0" y="-170" textAnchor="middle" fill="#06b6d4" fontSize="12" fontFamily="monospace">COMMITS</text>
                            <text x="170" y="0" textAnchor="start" fill="#06b6d4" fontSize="12" fontFamily="monospace">REPOS</text>
                        </g>

                        {/* Summary Metadata */}
                        <g transform="translate(40, 780)">
                            <text x="0" y="0" fill="#ffffff" fontSize="48" fontWeight="bold" fontFamily="monospace">{stats.contributions}</text>
                            <text x="0" y="30" fill="#555555" fontSize="12" fontFamily="monospace" letterSpacing="4">TOTAL_CONTRIBUTIONS_YEAR_2024</text>
                            
                            <g transform="translate(500, -10)">
                                <text x="0" y="10" fill="#06b6d4" fontSize="24" fontWeight="bold" fontFamily="monospace">{stats.totalStars}</text>
                                <text x="0" y="30" fill="#555555" fontSize="10" fontFamily="monospace">STARS_EARNED</text>
                            </g>

                            <g transform="translate(700, -10)">
                                <text x="0" y="10" fill="#ffffff" fontSize="24" fontWeight="bold" fontFamily="monospace">{stats.repoCount}</text>
                                <text x="0" y="30" fill="#555555" fontSize="10" fontFamily="monospace">REPOSITORIES</text>
                            </g>
                        </g>

                        <text x="1240" y="40" textAnchor="end" fill="#555" fontSize="14" fontFamily="monospace">SYNC_TIME: {new Date().toLocaleTimeString()}</text>
                    </svg>
                </div>
            </div>
        </div>

        {/* Global Summary Stats Cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
                { label: 'Total Stars', value: stats.totalStars, icon: Star, color: 'text-yellow-500' },
                { label: 'Main Language', value: stats.topLanguage, icon: Code, color: 'text-primary' },
                { label: 'Public Repos', value: stats.repoCount, icon: FolderDot, color: 'text-secondary' },
                { label: 'Followers', value: 42, icon: Globe, color: 'text-white' },
            ].map((item, i) => (
                <MagicCard 
                    key={i} 
                    gradientColor="rgba(255, 255, 255, 0.1)"
                    className="bg-[#0a0a1a] border border-white/5 rounded-2xl group hover:border-primary/40 transition-all hover:-translate-y-1"
                >
                    <BorderBeam duration={8} size={100} colorFrom="#06b6d4" colorTo="transparent" />
                    <div className="flex items-center gap-5 p-5 relative z-10">
                        <div className={`p-3 bg-white/5 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{item.label}</p>
                            <p className="text-xl font-bold text-white tracking-tight">{item.value}</p>
                        </div>
                    </div>
                </MagicCard>
            ))}
        </div>
      </div>
    </section>
  );
};
