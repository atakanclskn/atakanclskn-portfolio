
import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { TechStack } from './components/TechStack';
import { SelectedWork } from './components/SelectedWork';
import { Experience } from './components/Experience';
import { Connect } from './components/Connect';
import { NotFound } from './components/NotFound';
import { UnsavedChangesBar } from './components/UnsavedChangesBar';
import { InteractiveBackground } from './components/InteractiveBackground';
import { LanguageProvider, useLanguage } from './lib/i18n';
import { applyDefaultTheme } from './lib/theme';
import { applySeo } from './lib/seo';
import { HideableSection } from './types';
import { AdminProvider, useAdmin } from './lib/adminContext';
import { PageSkeleton } from './components/Skeleton';
import { trackPageView } from './lib/analytics.service';

// Lazy load AdminPanel - only needed for admin users
const AdminPanel = lazy(() => import('./components/AdminPanelNew').then(m => ({ default: m.AdminPanel })));

// Separate inner component to use the context
const AppContent: React.FC = () => {
  const { profile, techStack, projects, experiences, socials, siteSettings, isDataReady } = useAdmin();
  const { lang } = useLanguage();

  // Admin-managed default theme and SEO tags, applied once the real data is in
  useEffect(() => {
    if (isDataReady) applyDefaultTheme(siteSettings.defaultTheme || 'dark');
  }, [isDataReady, siteSettings.defaultTheme]);

  useEffect(() => {
    if (isDataReady) applySeo(siteSettings, lang);
  }, [isDataReady, siteSettings, lang]);

  // Track page views in Firestore
  useEffect(() => {
    trackPageView(window.location.pathname).catch(err => console.error('Page view tracking failed:', err));
  }, []);

  const isAdminPath = (path: string) => path.startsWith('/admin');
  const isHomePath = (path: string) => path === '/' || path === '';
  const [isAdminRoute, setIsAdminRoute] = useState(isAdminPath(window.location.pathname));
  const [is404, setIs404] = useState(!isHomePath(window.location.pathname) && !isAdminPath(window.location.pathname));

  // Listen for URL changes (pushState from AdminPanel)
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      setIsAdminRoute(isAdminPath(path));
      setIs404(!isHomePath(path) && !isAdminPath(path));
    };
    window.addEventListener('popstate', checkRoute);
    // Custom event dispatched by AdminPanel on open/close
    window.addEventListener('adminRouteChange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('adminRouteChange', checkRoute);
    };
  }, []);

  const isVisible = (section: HideableSection) => !siteSettings.hiddenSections?.includes(section);

  // Show skeleton while loading (only on non-admin route)
  if (!isAdminRoute && !isDataReady) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      {/* Admin code is only downloaded when someone actually opens /admin */}
      {isAdminRoute && (
        <Suspense fallback={
          <div className="fixed inset-0 z-[9999] bg-gray-50 dark:bg-[#050505] flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 dark:border-white/20 dark:border-t-white rounded-full" />
          </div>
        }>
          <AdminPanel />
        </Suspense>
      )}
      {is404 && <NotFound />}
      {!isAdminRoute && !is404 && (
        <>
          <a href="#about" className="skip-to-content">Skip to content</a>
          <InteractiveBackground />
          <Navbar />
          <UnsavedChangesBar />
          <main className="relative z-10">
            <Hero profile={profile} />
            {isVisible('about') && <AboutMe profile={profile} />}
            {isVisible('tech-stack') && <TechStack techStack={techStack} />}
            {isVisible('projects') && <SelectedWork projects={projects} />}
            {isVisible('experience') && <Experience experiences={experiences} projects={projects} />}
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
