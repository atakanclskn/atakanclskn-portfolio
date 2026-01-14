import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { SelectedWork } from './components/SelectedWork';
import { Experience } from './components/Experience';
import { Connect } from './components/Connect';
import { InteractiveBackground } from './components/InteractiveBackground';
import { client } from './lib/sanity.client';
import { fetchGitHubProfile, fetchGitHubRepos } from './lib/github.service';
import { groq } from 'next-sanity';
import { ExperienceItem, Profile, Project, Social, TechItem } from './types';

// Hardcoded Static Experiences (Formerly mock/fetched)
const STATIC_EXPERIENCES: ExperienceItem[] = [
    {
        _id: 'li-oyku',
        role: 'AI Developer',
        company: 'Öykü Lojistik',
        startDate: '2025-07',
        endDate: '2025-11',
        isCurrent: false,
        description: 'AI Development Expert focusing on Microsoft SQL Server and SQL integrations. Led data engineering efforts and model optimizations.',
        skills: ['AI Development', 'SQL', 'MS SQL Server'],
        type: 'work'
    },
    {
        _id: 'li-outlier',
        role: 'Freelance AI Data Contributor',
        company: 'Outlier AI',
        startDate: '2024-09',
        endDate: '2025-10',
        isCurrent: false,
        description: 'NLP, data validation, and annotation tasks. Specialized in backend development and algorithm design for high-scale data science pipelines.',
        skills: ['NLP', 'Python', 'Data Annotation'],
        type: 'work'
    },
    {
        _id: 'li-freelancer',
        role: 'Freelance Web Developer',
        company: 'Freelancer.com',
        startDate: '2017-01',
        endDate: '2025-09',
        isCurrent: false,
        description: 'Full-stack web solutions (HTML/CSS/JS/Python/SQL) for international clients. Focused on clean architecture and responsive design.',
        skills: ['HTML', 'CSS', 'Python', 'SQL'],
        type: 'work'
    },
    {
        _id: 'li-scale',
        role: 'AI Data Contributor',
        company: 'Scale AI',
        startDate: '2024-10',
        endDate: '2025-08',
        isCurrent: false,
        description: 'Advanced AI training tasks: text classification, image evaluation, and intent labeling for LLMs and vision models.',
        skills: ['Computer Vision', 'NLP', 'Data Labeling'],
        type: 'work'
    },
    {
        _id: 'li-edu-deu',
        role: 'B.S. Computer Science',
        company: 'Dokuz Eylul University',
        startDate: '2022-09',
        endDate: '2026-09',
        isCurrent: true,
        description: 'Focusing on backend systems and machine learning. Leading various coding workshops and developer communities.',
        skills: ['Backend', 'Machine Learning', 'Algorithms'],
        type: 'education'
    },
    {
        _id: 'li-cert-coderspace',
        role: 'AI & Prompt Engineering',
        company: 'Coderspace',
        startDate: '2025-12',
        isCurrent: false,
        description: 'Intensive certification series covering modern AI architectures and prompt optimization strategies.',
        skills: ['AI', 'Prompt Engineering'],
        type: 'certification'
    },
    {
        _id: 'li-edu-hs',
        role: 'Industrial Automation',
        company: 'Automotive Exporters\' Association HS',
        startDate: '2017-09',
        endDate: '2021-07',
        isCurrent: false,
        description: 'Foundational education in PLC programming, logical sensor-based systems, and industrial electronics.',
        skills: ['PLC', 'Automation', 'Electronics'],
        type: 'education'
    }
];

const fallbackTechStack: TechItem[] = [
  { _id: '1', title: 'React', tech: 'Frontend', iconName: 'Box', color: 'text-cyan-400' },
  { _id: '2', title: 'TypeScript', tech: 'Language', iconName: 'Code', color: 'text-blue-500' },
  { _id: '3', title: 'Node.js', tech: 'Backend', iconName: 'Server', color: 'text-green-500' },
  { _id: '4', title: 'Tailwind', tech: 'Styling', iconName: 'Palette', color: 'text-pink-400' },
  { _id: '5', title: 'PostgreSQL', tech: 'Database', iconName: 'Database', color: 'text-purple-400' },
  { _id: '6', title: 'AWS', tech: 'Cloud', iconName: 'Globe', color: 'text-yellow-500' },
  { _id: '7', title: 'Next.js', tech: 'Framework', iconName: 'Terminal', color: 'text-white' },
  { _id: '8', title: 'Rust', tech: 'System', iconName: 'Cpu', color: 'text-orange-500' }
];

const fallbackSocials: Social[] = [
  { _id: '1', platform: 'Twitter', url: '#', username: '@atakan' },
  { _id: '2', platform: 'GitHub', url: 'https://github.com/atakanclskn', username: 'atakanclskn' },
  { _id: '3', platform: 'LinkedIn', url: 'https://linkedin.com/in/atakanclskn', username: 'Atakan Çalışkan' }
];

const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState('ESTABLISHING CONNECTION...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch from Sanity/GitHub for Dynamic components
        setLoadingMsg('INITIALIZING SYSTEM...');
        const techStackQuery = groq`*[_type == "techStack"]`;
        const socialQuery = groq`*[_type == "social"]`;
        
        const ghProfilePromise = fetchGitHubProfile();
        const ghReposPromise = fetchGitHubRepos();
        
        const [
            techStackData, 
            socialData, 
            ghProfile, 
            ghRepos, 
        ] = await Promise.all([
          client.fetch(techStackQuery).catch(() => null),
          client.fetch(socialQuery).catch(() => null),
          ghProfilePromise,
          ghReposPromise,
        ]);

        // 2. Set Profile
        const mergedProfile: Profile = {
            _id: '1',
            name: ghProfile?.name || 'Atakan Çalışkan',
            titles: ['Software Engineer', 'AI Developer', 'Open Source Contributor'],
            bio: ghProfile?.bio || 'Architecting high-performance digital ecosystems through code and data intelligence.',
            status: 'System Online',
            heroImage: undefined,
            location: ghProfile?.location
        };

        setProfile(mergedProfile);
        
        // 3. Set Projects (GitHub is still useful for live star counts)
        if (ghRepos && ghRepos.length > 0) {
            setProjects(ghRepos);
        }

        // 4. Set Static Experience (LinkedIn Sync Removed)
        setExperiences(STATIC_EXPERIENCES);

        // 5. Set Tech Stack & Socials
        setTechStack(techStackData && techStackData.length > 0 ? techStackData : fallbackTechStack);
        setSocials(socialData && socialData.length > 0 ? socialData : fallbackSocials);

      } catch (err) {
        console.warn("Error during hydration:", err);
      } finally {
        setTimeout(() => setLoading(false), 500); // Small delay for smoothness
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono text-[10px] text-primary tracking-[0.4em] uppercase opacity-70">Atakan Portfolio v2.5</p>
            <p className="font-mono text-xs text-white tracking-widest animate-pulse uppercase">{loadingMsg}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-primary selection:text-black relative">
      <InteractiveBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero profile={profile!} />
        <TechStack techStack={techStack} />
        <SelectedWork projects={projects} />
        <Experience experiences={experiences} />
        <Connect socials={socials} profile={profile!} />
      </main>
    </div>
  );
};

export default App;