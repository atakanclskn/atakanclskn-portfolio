
import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';
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
import { trackPageView } from './lib/analytics.service';

// Lazy load AdminPanel - only needed for admin users
const AdminPanel = lazy(() => import('./components/AdminPanelNew').then(m => ({ default: m.AdminPanel })));

// Separate inner component to use the context
const AppContent: React.FC = () => {
  const { profile, techStack, projects, experiences, socials, siteSettings } = useAdmin();
  const [isLoading, setIsLoading] = useState(true);

  // Track page views in Firestore
  useEffect(() => {
    trackPageView(window.location.pathname).catch(err => console.error('Page view tracking failed:', err));
  }, []);

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

  const isAdminPath = (path: string) => path === '/admin' || path === '/admin/';
  const [isAdminRoute, setIsAdminRoute] = useState(isAdminPath(window.location.pathname));

  // Listen for URL changes (pushState from AdminPanel)
  useEffect(() => {
    const checkRoute = () => setIsAdminRoute(isAdminPath(window.location.pathname));
    window.addEventListener('popstate', checkRoute);
    // Custom event dispatched by AdminPanel on open/close
    window.addEventListener('adminRouteChange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('adminRouteChange', checkRoute);
    };
  }, []);

  // Show skeleton while loading (only on non-admin route)
  if (!isAdminRoute && (isLoading || !profile)) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      <Suspense fallback={
        isAdminRoute ? (
          <div className="fixed inset-0 z-[9999] bg-gray-950 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full" />
          </div>
        ) : null
      }>
        <AdminPanel />
      </Suspense>
      {!isAdminRoute && (
        <>
          <InteractiveBackground />
          <Navbar />
          <main className="relative z-10">
            <Hero profile={profile} />
            <AboutMe profile={profile} />
            <TechStack techStack={techStack} />
            <SelectedWork projects={projects} />
            <Experience experiences={experiences} projects={projects} />
            <Connect socials={socials} profile={profile} />
          </main>
        </>
      )}
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
