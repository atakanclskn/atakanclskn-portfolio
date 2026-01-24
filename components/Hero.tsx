
import React, { forwardRef, useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { Profile } from '../types';
import { useLanguage } from '../lib/i18n';
import { AnimatedBeam } from './AnimatedBeam';

interface HeroProps {
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const { t } = useLanguage();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const middleLeftRef = useRef<HTMLDivElement>(null);
  const middleRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
    ({ className, children }, ref) => {
      return (
        <div
          ref={ref}
          className={`z-10 flex size-12 md:size-16 items-center justify-center rounded-full border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-2 md:p-3 shadow-lg backdrop-blur-md ${className || ''}`}
        >
          {children}
        </div>
      );
    }
  );
  
  Circle.displayName = 'Circle';

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent transition-colors duration-300">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Animated Beam */}
          <div 
            ref={containerRef}
            className="relative flex h-[400px] md:h-[500px] w-full items-center justify-center overflow-hidden"
          >
            <div className="flex size-full max-h-[350px] md:max-h-[450px] max-w-lg flex-col items-stretch justify-between gap-10">
              <div className="flex flex-row items-center justify-between">
                <Circle ref={topLeftRef}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8">
                    <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" fill="currentColor"/>
                  </svg>
                </Circle>
                <Circle ref={topRightRef}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8 text-blue-600">
                    <path d="M23.5 0h-23C0.224 0 0 0.224 0 0.5v23C0 23.776 0.224 24 0.5 24h23c0.276 0 0.5-0.224 0.5-0.5v-23C24 0.224 23.776 0 23.5 0zM12 9.545c2.489 0 4.773 1.029 6.409 2.704l-2.545 2.545c-1.091-1.091-2.591-1.795-3.864-1.795-1.273 0-2.773 0.704-3.864 1.795L5.591 12.249C7.227 10.574 9.511 9.545 12 9.545zm0-5.454c4.636 0 8.818 1.964 11.818 5.114l-2.545 2.545c-2.409-2.409-5.727-3.909-9.273-3.909s-6.864 1.5-9.273 3.909L0.182 9.205C3.182 6.055 7.364 4.091 12 4.091zm0 11.318c-1.091 0-2 0.909-2 2s0.909 2 2 2 2-0.909 2-2-0.909-2-2-2z" fill="currentColor"/>
                  </svg>
                </Circle>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Circle ref={middleLeftRef}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8 text-cyan-500">
                    <path d="M0 12C0 5.373 5.373 0 12 0c4.873 0 9.067 2.904 10.947 7.077l-15.87 15.87C2.904 21.067 0 16.873 0 12zm23.955 5.804c-.051.564-.132 1.117-.24 1.66L7.596.344A12.034 12.034 0 0 1 12 0c6.627 0 12 5.373 12 12 0 2.065-.526 4.005-1.445 5.704z" fill="currentColor"/>
                  </svg>
                </Circle>
                <Circle ref={centerRef} className="size-20 md:size-24 border-4">
                  <img 
                    src={profile.avatarUrl || 'https://github.com/atakanclskn.png'} 
                    alt={profile.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </Circle>
                <Circle ref={middleRightRef}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8 text-green-600">
                    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
                  </svg>
                </Circle>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Circle ref={bottomLeftRef}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8 text-yellow-500">
                    <path d="M23.498 6.186a2.977 2.977 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A2.977 2.977 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.977 2.977 0 0 0 2.121 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a2.977 2.977 0 0 0 2.121-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
                  </svg>
                </Circle>
                <Circle ref={bottomRightRef}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-8 md:h-8 text-purple-600">
                    <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" fill="currentColor"/>
                  </svg>
                </Circle>
              </div>
            </div>

            <AnimatedBeam containerRef={containerRef} fromRef={topLeftRef} toRef={centerRef} curvature={-75} endYOffset={-10} />
            <AnimatedBeam containerRef={containerRef} fromRef={middleLeftRef} toRef={centerRef} />
            <AnimatedBeam containerRef={containerRef} fromRef={bottomLeftRef} toRef={centerRef} curvature={75} endYOffset={10} />
            <AnimatedBeam containerRef={containerRef} fromRef={topRightRef} toRef={centerRef} curvature={-75} endYOffset={-10} reverse />
            <AnimatedBeam containerRef={containerRef} fromRef={middleRightRef} toRef={centerRef} reverse />
            <AnimatedBeam containerRef={containerRef} fromRef={bottomRightRef} toRef={centerRef} curvature={75} endYOffset={10} reverse />
          </div>

          {/* Right Side - Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium tracking-wide text-gray-600 dark:text-gray-300">
                  {t.hero.status}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                {t.hero.greeting} {profile?.name ? profile.name.split(' ')[0] : 'Atakan'}.
              </h1>
              <h2 className="text-xl md:text-3xl font-display font-medium text-gray-500 dark:text-gray-400 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                {t.hero.role}
              </h2>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl leading-relaxed font-sans mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              {t.hero.bio}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <a 
                href="#projects" 
                onClick={scrollToProjects}
                className="w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
              >
                {t.hero.checkWork} <ArrowRight className="w-4 h-4" />
              </a>
              
              <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                {t.hero.resume} <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
