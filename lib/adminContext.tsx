
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, ExperienceItem, Social, Profile, TechItem } from '../types';

// Default Data Constants (Moved from App.tsx)
const DEFAULT_EXPERIENCES: ExperienceItem[] = [
    {
        _id: 'li-oyku',
        role: 'AI Developer',
        company: 'Öykü Lojistik',
        startDate: '2025-07',
        endDate: '2025-11',
        isCurrent: false,
        description: 'AI Development Expert focusing on Microsoft SQL Server and SQL integrations.',
        skills: ['AI', 'SQL'],
        type: 'work'
    },
    {
        _id: 'li-outlier',
        role: 'Freelance AI Data Contributor',
        company: 'Outlier AI',
        startDate: '2024-09',
        endDate: '2025-10',
        isCurrent: false,
        description: 'NLP, data validation, and annotation tasks.',
        skills: ['NLP', 'Python'],
        type: 'work'
    }
];

const DEFAULT_PROJECTS: Project[] = [
    {
        _id: 'p1',
        title: 'Autonomous AI Agent',
        category: 'AI / Logistics',
        description: 'An autonomous agent utilizing LLMs to optimize logistics routing.',
        size: 'large',
        mainImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        link: '#',
    },
    {
        _id: 'p2',
        title: 'Portfolio V2',
        category: 'Web',
        description: 'Modern portfolio built with React, Tailwind, and Sanity CMS.',
        size: 'small',
        mainImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
        link: '#',
    }
];

const DEFAULT_TECH_STACK: TechItem[] = [
    { _id: '1', title: 'Next.js', tech: 'Framework', iconName: 'NextLogo', color: 'text-black dark:text-white' },
    { _id: '2', title: 'React', tech: 'Library', iconName: 'ReactLogo', color: 'text-cyan-400' },
    { _id: '3', title: 'TypeScript', tech: 'Language', iconName: 'TSLogo', color: 'text-blue-500' },
    { _id: '4', title: 'Tailwind CSS', tech: 'Styling', iconName: 'TailwindLogo', color: 'text-cyan-500' },
    { _id: '5', title: 'Framer Motion', tech: 'Animation', iconName: 'FramerLogo', color: 'text-pink-500' },
    { _id: '6', title: 'Shadcn UI', tech: 'UI Lib', iconName: 'ShadcnLogo', color: 'text-white' },
];

const DEFAULT_SOCIALS: Social[] = [
  { _id: '1', platform: 'GitHub', url: 'https://github.com/atakanclskn', username: 'atakanclskn' },
  { _id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/atakanclskn', username: 'Atakan Çalışkan' },
];

const DEFAULT_PROFILE: Profile = {
    _id: '1',
    name: 'Atakan Çalışkan',
    titles: ['Software Engineer'],
    bio: 'Software Engineer and Designer specializing in building exceptional digital experiences.',
    status: 'Available for new projects',
    heroImage: 'https://github.com/atakanclskn.png' as any,
    avatarUrl: 'https://github.com/atakanclskn.png'
};

interface AdminContextType {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  
  // Data State
  primaryColor: string; // RGB string like "6 182 212"
  setPrimaryColor: (color: string) => void;
  
  profile: Profile;
  updateProfile: (p: Profile) => void;
  
  projects: Project[];
  setProjects: (p: Project[]) => void;
  
  experiences: ExperienceItem[];
  setExperiences: (e: ExperienceItem[]) => void;
  
  techStack: TechItem[];
  setTechStack: (t: TechItem[]) => void;
  
  socials: Social[];
  setSocials: (s: Social[]) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Initialize state from LocalStorage or defaults
  const [primaryColor, setPrimaryColorState] = useState<string>('6 182 212');
  const [profile, setProfileState] = useState<Profile>(DEFAULT_PROFILE);
  const [projects, setProjectsState] = useState<Project[]>(DEFAULT_PROJECTS);
  const [experiences, setExperiencesState] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCES);
  const [techStack, setTechStackState] = useState<TechItem[]>(DEFAULT_TECH_STACK);
  const [socials, setSocialsState] = useState<Social[]>(DEFAULT_SOCIALS);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem('site_primaryColor');
    if (savedColor) setPrimaryColorState(savedColor);

    const savedProfile = localStorage.getItem('site_profile');
    if (savedProfile) setProfileState(JSON.parse(savedProfile));

    const savedProjects = localStorage.getItem('site_projects');
    if (savedProjects) setProjectsState(JSON.parse(savedProjects));
    
    const savedExp = localStorage.getItem('site_experiences');
    if (savedExp) setExperiencesState(JSON.parse(savedExp));

    const savedTech = localStorage.getItem('site_techStack');
    if (savedTech) setTechStackState(JSON.parse(savedTech));

    const savedSocials = localStorage.getItem('site_socials');
    if (savedSocials) setSocialsState(JSON.parse(savedSocials));
  }, []);

  // Update CSS Variable whenever primaryColor changes
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', primaryColor);
    localStorage.setItem('site_primaryColor', primaryColor);
  }, [primaryColor]);

  // Wrappers to save to LocalStorage
  const updateProfile = (p: Profile) => {
    setProfileState(p);
    localStorage.setItem('site_profile', JSON.stringify(p));
  };

  const setProjects = (p: Project[]) => {
    setProjectsState(p);
    localStorage.setItem('site_projects', JSON.stringify(p));
  };

  const setExperiences = (e: ExperienceItem[]) => {
    setExperiencesState(e);
    localStorage.setItem('site_experiences', JSON.stringify(e));
  };

  const setTechStack = (t: TechItem[]) => {
    setTechStackState(t);
    localStorage.setItem('site_techStack', JSON.stringify(t));
  };

  const setSocials = (s: Social[]) => {
    setSocialsState(s);
    localStorage.setItem('site_socials', JSON.stringify(s));
  };

  const login = (password: string) => {
    if (password === 'admin123') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsLoggedIn(false);
  const setPrimaryColor = (color: string) => setPrimaryColorState(color);

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout,
      primaryColor, setPrimaryColor,
      profile, updateProfile,
      projects, setProjects,
      experiences, setExperiences,
      techStack, setTechStack,
      socials, setSocials
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
