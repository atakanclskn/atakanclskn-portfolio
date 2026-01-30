
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { TechStack } from './components/TechStack';
import { SelectedWork } from './components/SelectedWork';
import { Experience } from './components/Experience';
import { Connect } from './components/Connect';
import { InteractiveBackground } from './components/InteractiveBackground';
import { LanguageProvider } from './lib/i18n';
import { AdminProvider, useAdmin } from './lib/adminContext';
import { AdminPanel } from './components/AdminPanelNew';
import { PageSkeleton } from './components/Skeleton';

// Separate inner component to use the context
const AppContent: React.FC = () => {
  const { profile, techStack, projects, experiences, socials } = useAdmin();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial data loading (or can be replaced with actual async fetch)
  useEffect(() => {
    // Small delay to show skeleton effect, remove in production with real async
    const timer = setTimeout(() => {
      if (profile) {
        setIsLoading(false);
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, [profile]);

  // Show skeleton while loading
  if (isLoading || !profile) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      <InteractiveBackground />
      <Navbar />
      <AdminPanel />
      <main className="relative z-10">
        <Hero profile={profile} />
        <AboutMe profile={profile} />
        <TechStack techStack={techStack} />
        <SelectedWork projects={projects} />
        <Experience experiences={experiences} projects={projects} />
        <Connect socials={socials} profile={profile} />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AdminProvider>
        <LanguageProvider>
           <AppContent />
        </LanguageProvider>
    </AdminProvider>
  );
};

export default App;
