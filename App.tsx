
import React, { useState, useEffect, lazy, Suspense } from 'react';
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
import { PageSkeleton } from './components/Skeleton';

// Lazy load AdminPanel - only needed for admin users
const AdminPanel = lazy(() => import('./components/AdminPanelNew').then(m => ({ default: m.AdminPanel })));

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
      <Suspense fallback={null}>
        <AdminPanel />
      </Suspense>
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
