import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  size: 'large' | 'small';
  link?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  active?: boolean;
}

export interface TechItem {
  icon: React.ReactNode;
  title: string;
  tech: string;
  color: string;
}