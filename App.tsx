
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { SelectedWork } from './components/SelectedWork';
import { Experience } from './components/Experience';
import { Connect } from './components/Connect';
import { InteractiveBackground } from './components/InteractiveBackground';
import { client } from './lib/sanity.client';
import { groq } from 'next-sanity';
import { ExperienceItem, Profile, Project, Social, TechItem } from './types';

// Hardcoded Data
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
    }
];

// Updated to standard icons for marquee
const fallbackTechStack: TechItem[] = [
  { _id: '1', title: 'React', tech: 'Frontend', iconName: 'Box', color: 'text-gray-400' },
  { _id: '2', title: 'TypeScript', tech: 'Language', iconName: 'Code', color: 'text-gray-400' },
  { _id: '3', title: 'Node.js', tech: 'Backend', iconName: 'Server', color: 'text-gray-400' },
  { _id: '4', title: 'Tailwind', tech: 'Styling', iconName: 'Palette', color: 'text-gray-400' },
  { _id: '5', title: 'PostgreSQL', tech: 'Database', iconName: 'Database', color: 'text-gray-400' },
  { _id: '6', title: 'Next.js', tech: 'Framework', iconName: 'Terminal', color: 'text-gray-400' },
  { _id: '7', title: 'Figma', tech: 'Design', iconName: 'Figma', color: 'text-gray-400' },
  { _id: '8', title: 'Cloud', tech: 'Infra', iconName: 'Cloud', color: 'text-gray-400' }
];

const fallbackSocials: Social[] = [
  { _id: '1', platform: 'Twitter', url: '#', username: '@atakan' },
  { _id: '2', platform: 'GitHub', url: 'https://github.com/atakanclskn', username: 'atakanclskn' },
  { _id: '3', platform: 'LinkedIn', url: 'https://linkedin.com/in/atakanclskn', username: 'Atakan Çalışkan' },
  { _id: '4', platform: 'Instagram', url: '#', username: '@atakan' }
];

// Fallback Projects
const STATIC_PROJECTS: Project[] = [
    {
        _id: 'p1',
        title: 'Autonomous AI Agent',
        category: 'AI / Logistics',
        description: 'An autonomous agent utilizing LLMs to optimize logistics routing in real-time using MSSQL data streams.',
        size: 'large',
        mainImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        link: '#',
    },
    {
        _id: 'p2',
        title: 'Portfolio V2',
        category: 'Web',
        description: 'Modern portfolio built with React, Tailwind, and Sanity CMS featuring dark mode.',
        size: 'small',
        mainImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
        link: '#',
    },
    {
        _id: 'p3',
        title: 'E-Commerce Dashboard',
        category: 'SaaS',
        description: 'Comprehensive analytics dashboard for tracking sales and inventory.',
        size: 'small',
        mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        link: '#',
    },
    {
        _id: 'p4',
        title: 'Vision API Integration',
        category: 'Machine Learning',
        description: 'Integration of Google Cloud Vision API for automated image tagging systems.',
        size: 'small',
        mainImage: 'https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=2134&auto=format&fit=crop',
        link: '#',
    }
];

const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(STATIC_EXPERIENCES);
  const [techStack, setTechStack] = useState<TechItem[]>(fallbackTechStack);
  const [socials, setSocials] = useState<Social[]>(fallbackSocials);

  useEffect(() => {
    // Basic initialization
    setProfile({
        _id: '1',
        name: 'Atakan Çalışkan',
        titles: ['Software Engineer'],
        bio: 'Software Engineer and Designer specializing in building exceptional digital experiences.',
        status: 'Available',
    });
  }, []);

  if (!profile) return null;

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      <InteractiveBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero profile={profile} />
        <TechStack techStack={techStack} />
        <SelectedWork projects={projects} />
        <Experience experiences={experiences} projects={projects} />
        <Connect socials={socials} profile={profile} />
      </main>
    </div>
  );
};

export default App;
