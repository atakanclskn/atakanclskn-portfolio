import React from 'react';

// Multi-language support
export interface MultiLangText {
  EN: string;
  TR: string;
}

export interface Profile {
  _id: string;
  name: string;
  titles: string[];
  bio: string;
  status: string;
  avatarUrl?: string;
  location?: string;
}

export interface Project {
  _id: string;
  title: MultiLangText;
  category: string;
  description: MultiLangText;
  mainImage: string;
  size: 'large' | 'small';
  link?: string;
  githubUrl?: string;
  stars?: number;
  language?: string;
  isLiveData?: boolean;
}

export interface ExperienceItem {
  _id: string;
  role: MultiLangText;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: MultiLangText;
  skills?: string[];
  type?: 'work' | 'education' | 'certification' | 'project';
}

export interface TechItem {
  _id: string;
  title: string;
  tech: string;
  iconName: string;
  color: string;
}

export interface Social {
  _id: string;
  platform: string;
  url: string;
  username?: string;
  iconName: string;
}

// Admin-controlled content structures with multi-language support
export interface HeroContent {
  greeting: MultiLangText;
  name: string;
  role: MultiLangText;
  bio: MultiLangText;
  status: MultiLangText;
  ctaText: MultiLangText;
  resumeLink: string;
}

export interface AboutContent {
  whoAmI: MultiLangText;
  subtitle: MultiLangText;
  paragraphs: {
    beyondTerminal: MultiLangText;
    exploring: MultiLangText;
    quote: MultiLangText;
    beyondCode: MultiLangText;
  };
}

export interface StatItem {
  _id: string;
  type: 'number' | 'text'; // number: shows count+label, text: shows title+description
  count?: number; // for type 'number'
  label?: MultiLangText; // for type 'number'
  title?: MultiLangText; // for type 'text'
  description?: MultiLangText; // for type 'text'
}

export interface StatsContent {
  stats: StatItem[];
}

export interface HobbyItem {
  _id: string;
  icon: string; // Lucide icon name
  label: MultiLangText;
}

export interface NavbarSettings {
  logoText: string;
  showLogo: boolean;
  ctaText: MultiLangText;
  ctaLink: string;
}

export interface SiteSettings {
  favicon?: string;
  metaTitle: MultiLangText;
  metaDescription: MultiLangText;
  defaultTheme: 'light' | 'dark' | 'system';
}