import React from 'react';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface Profile {
  _id: string;
  name: string;
  titles: string[];
  bio: string;
  status: string;
  heroImage?: SanityImage;
  avatarUrl?: string; // Added for GitHub avatar
  location?: string;
}

export interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  mainImage: SanityImage | string; // Allow string URL for GitHub OG images
  size: 'large' | 'small';
  link?: string;
  // GitHub specific
  githubUrl?: string;
  stars?: number;
  language?: string;
  isLiveData?: boolean;
}

export interface ExperienceItem {
  _id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  skills?: string[]; // Added for skills list
  type?: 'work' | 'education' | 'certification'; // Added for LinkedIn data types
}

export interface TechItem {
  _id: string;
  title: string;
  tech: string;
  iconName: string; // Stored as string in Sanity (e.g., "Box", "Database")
  color: string;
}

export interface Social {
  _id: string;
  platform: string;
  url: string;
  username?: string;
  iconName: string; // Lucide icon name like "Github", "Linkedin", "Twitter", etc.
}

// Admin-controlled content structures
export interface HeroContent {
  greeting: string;
  name: string;
  role: string;
  bio: string;
  status: string;
  ctaText: string;
  resumeLink: string;
  backgroundImage?: string;
}

export interface AboutContent {
  whoAmI: string;
  subtitle: string;
  paragraphs: {
    beyondTerminal: string;
    exploring: string;
    quote: string;
    beyondCode: string;
  };
}

export interface StatsContent {
  yearsCount: number;
  yearsLabel: string;
  clientsCount: number;
  clientsLabel: string;
  qualityLabel: string;
  qualityDescription: string;
  performanceLabel: string;
  performanceDescription: string;
  designLabel: string;
  designDescription: string;
}

export interface HobbyItem {
  _id: string;
  icon: string; // Lucide icon name
  label: string;
}

export interface NavbarSettings {
  logoText: string;
  showLogo: boolean;
  ctaText: string;
  ctaLink: string;
}

export interface SiteSettings {
  favicon?: string;
  metaTitle: string;
  metaDescription: string;
  defaultTheme: 'light' | 'dark' | 'system';
}