
import React from 'react';
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
import { AdminPanel } from './components/AdminPanel';

// Separate inner component to use the context
const AppContent: React.FC = () => {
  const { profile, techStack, projects, experiences, socials } = useAdmin();

  console.log('Profile data:', profile);
  
  if (!profile) {
    console.error('Profile is missing!');
    return <div style={{color: 'white', padding: '20px'}}>Profile yükleniyor...</div>;
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
