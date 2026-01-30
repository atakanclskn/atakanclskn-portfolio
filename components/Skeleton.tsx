
import React from 'react';

// Base Skeleton Component
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-white/10 rounded ${className}`}
    />
  );
};

// Hero Section Skeleton
export const HeroSkeleton: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent transition-colors duration-300">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center w-full">
        
        {/* Status Badge Skeleton */}
        <div className="mb-6 md:mb-8">
          <Skeleton className="h-10 w-48 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <div className="mb-6 md:mb-8 w-full flex flex-col items-center gap-4">
          <Skeleton className="h-16 md:h-24 w-3/4 max-w-2xl rounded-lg" />
          <Skeleton className="h-10 md:h-14 w-2/3 max-w-xl rounded-lg" />
        </div>

        {/* Bio Skeleton */}
        <div className="w-full max-w-2xl space-y-3 mb-10 md:mb-12">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-5/6 mx-auto rounded" />
        </div>

        {/* CTA Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6">
          <Skeleton className="h-14 w-full sm:w-44 rounded-full" />
          <Skeleton className="h-14 w-full sm:w-44 rounded-full" />
        </div>
      </div>
    </section>
  );
};

// About Section Skeleton
export const AboutSkeleton: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-12 lg:gap-16 items-start">
          
          {/* Left Side - Animated Beams Skeleton */}
          <div className="lg:col-span-3 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Skeleton className="w-full h-full rounded-3xl" />
            </div>
          </div>

          {/* Right Side - Text Content Skeleton */}
          <div className="space-y-8 lg:col-span-4">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4 rounded-lg" />
              <Skeleton className="h-8 w-1/2 rounded-lg" />
            </div>
            
            <div className="space-y-4">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-5/6 rounded" />
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-4/5 rounded" />
            </div>

            {/* Hobbies Skeleton */}
            <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-200 dark:border-white/10">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 min-h-[160px]">
              <Skeleton className="h-12 w-20 rounded-lg mb-3" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tech Stack Skeleton
export const TechStackSkeleton: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto rounded-lg mb-4" />
          <Skeleton className="h-6 w-96 max-w-full mx-auto rounded" />
        </div>

        {/* Tech Grid Skeleton */}
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 w-28">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects/Selected Work Skeleton
export const ProjectsSkeleton: React.FC = () => {
  return (
    <section className="py-32 relative bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-14 w-72 rounded-lg mb-4" />
          <Skeleton className="h-6 w-96 max-w-full rounded" />
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4">
          {/* Featured Large Card */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden bg-white dark:bg-surface border border-gray-200 dark:border-white/10">
            <Skeleton className="w-full h-full" />
          </div>
          
          {/* Small Cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className={`rounded-3xl overflow-hidden bg-white dark:bg-surface border border-gray-200 dark:border-white/10 ${i === 3 ? 'md:col-span-2' : ''}`}>
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Skeleton
export const ExperienceSkeleton: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-14 w-64 mx-auto rounded-lg mb-4" />
          <Skeleton className="h-6 w-80 max-w-full mx-auto rounded" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex justify-center gap-3 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full" />
          ))}
        </div>

        {/* Timeline Skeleton */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-200 dark:bg-white/10 hidden md:block" />
          
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 hidden md:block" />
                <div className="flex-1 w-full">
                  <div className="p-6 bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 rounded mb-2" />
                        <Skeleton className="h-4 w-24 rounded" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-3/4 rounded mb-3" />
                    <Skeleton className="h-4 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-5/6 rounded mb-4" />
                    <div className="flex gap-2">
                      {[1, 2, 3].map((j) => (
                        <Skeleton key={j} className="h-6 w-16 rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Connect/Contact Skeleton
export const ConnectSkeleton: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Form Skeleton */}
          <div>
            <Skeleton className="h-14 w-64 rounded-lg mb-4" />
            <Skeleton className="h-6 w-full max-w-md rounded mb-8" />
            
            <div className="space-y-6">
              <div>
                <Skeleton className="h-4 w-20 rounded mb-2" />
                <Skeleton className="h-14 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 rounded mb-2" />
                <Skeleton className="h-14 w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 rounded mb-2" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
              <Skeleton className="h-14 w-40 rounded-lg" />
            </div>
          </div>

          {/* Socials Skeleton */}
          <div>
            <Skeleton className="h-6 w-32 rounded mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 bg-white dark:bg-surface rounded-2xl border border-gray-200 dark:border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-4 w-4 rounded" />
                  </div>
                  <Skeleton className="h-5 w-24 rounded mb-1" />
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Navbar Skeleton
export const NavbarSkeleton: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200/50 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Skeleton */}
          <Skeleton className="h-8 w-10 rounded" />
          
          {/* Nav Links Skeleton */}
          <div className="hidden md:flex items-center gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-16 rounded" />
            ))}
          </div>
          
          {/* Right Side Skeleton */}
          <div className="hidden md:flex items-center gap-4">
            <Skeleton className="h-8 w-12 rounded" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Full Page Loading Skeleton
export const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen relative transition-colors duration-300 bg-gray-50 dark:bg-[#050505]">
      <NavbarSkeleton />
      <main className="relative z-10">
        <HeroSkeleton />
        <AboutSkeleton />
        <TechStackSkeleton />
        <ProjectsSkeleton />
        <ExperienceSkeleton />
        <ConnectSkeleton />
      </main>
    </div>
  );
};
