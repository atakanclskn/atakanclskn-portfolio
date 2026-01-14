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
}