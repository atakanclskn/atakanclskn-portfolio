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
  
  // Work-specific fields
  location?: string;
  workType?: 'remote' | 'hybrid' | 'onsite';
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  companyLogo?: string;
  companyUrl?: string;
  
  // Education-specific fields
  degree?: string;
  field?: string;
  gpa?: string;
  
  // Certification-specific fields
  issueDate?: string; // For certifications - single date
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  issuer?: string;
  
  // Project-specific fields
  projectDate?: string; // Single date for project
  projectUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  projectImage?: string;
  
  // Common optional fields
  order?: number;
  isVisible?: boolean;
  highlights?: MultiLangText[]; // Key achievements/bullet points
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

export interface AboutParagraph {
  _id: string;
  type: 'text' | 'quote';
  content: MultiLangText;
}

export interface AboutContent {
  whoAmI: MultiLangText;
  subtitle: MultiLangText;
  paragraphs: AboutParagraph[];
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
  navLinks: NavLinkItem[];
}

export interface NavLinkItem {
  _id: string;
  label: MultiLangText;
  href: string;
  isVisible: boolean;
}

export interface SiteSettings {
  favicon?: string;
  metaTitle: MultiLangText;
  metaDescription: MultiLangText;
  metaKeywords: MultiLangText;
  ogImage?: string;
  defaultTheme: 'light' | 'dark' | 'system';
  googleAnalyticsId?: string;
}

// Section Content Settings
export interface SectionContent {
  projects: {
    title: MultiLangText;
    description: MultiLangText;
  };
  contact: {
    title: MultiLangText;
    description: MultiLangText;
    emailLabel: string;
    successMessage: MultiLangText;
    findMeText: MultiLangText;
  };
  experience: {
    title: MultiLangText;
    description: MultiLangText;
  };
}

// Footer Settings
export interface FooterSettings {
  copyrightText: MultiLangText;
  showDesignCredit: boolean;
  designCreditText: MultiLangText;
  showSocialLinks: boolean;
  additionalLinks: FooterLink[];
}

export interface FooterLink {
  _id: string;
  label: MultiLangText;
  url: string;
  isExternal: boolean;
}

// Contact Form Messages
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string; // ISO date string
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
}