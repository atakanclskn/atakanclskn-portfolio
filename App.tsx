import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { SelectedWork } from './components/SelectedWork';
import { Experience } from './components/Experience';
import { Connect } from './components/Connect';
import { InteractiveBackground } from './components/InteractiveBackground';

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-primary selection:text-black relative">
      <InteractiveBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TechStack />
        <SelectedWork />
        <Experience />
        <Connect />
      </main>
    </div>
  );
};

export default App;