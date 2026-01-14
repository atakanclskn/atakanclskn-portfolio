import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TechStack } from '../components/TechStack';
import { SelectedWork } from '../components/SelectedWork';
import { Experience } from '../components/Experience';
import { Connect } from '../components/Connect';
import { InteractiveBackground } from '../components/InteractiveBackground';
import { client } from '../lib/sanity.client';
import { groq } from 'next-sanity';

// GROQ Queries
const profileQuery = groq`*[_type == "profile"][0]`;
const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc)`;
const experienceQuery = groq`*[_type == "experience"] | order(startDate desc)`;
const techStackQuery = groq`*[_type == "techStack"]`;
const socialQuery = groq`*[_type == "social"]`;

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const profile = await client.fetch(profileQuery);
  const projects = await client.fetch(projectsQuery);
  const experiences = await client.fetch(experienceQuery);
  const techStack = await client.fetch(techStackQuery);
  const socials = await client.fetch(socialQuery);

  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-primary selection:text-black relative">
      <InteractiveBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero profile={profile} />
        <TechStack techStack={techStack} />
        <SelectedWork projects={projects} />
        {/* Pass projects prop which is required by ExperienceProps */}
        <Experience experiences={experiences} projects={projects} />
        <Connect socials={socials} profile={profile} />
      </main>
    </div>
  );
}
