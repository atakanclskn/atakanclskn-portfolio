
import React, { forwardRef, useRef, useState, useEffect } from "react";
import { AnimatedBeam } from "./AnimatedBeam";
import { Profile } from "../types";
import { useLanguage } from '../lib/i18n';
import { CSharpLogo, TSLogo, HTMLLogo, TailwindLogo, PythonLogo, ReactLogo } from './TechLogos';

interface AboutMeProps {
  profile: Profile;
}

// Reusable Circle Component for Icons
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-20 flex size-14 items-center justify-center rounded-full border border-gray-300/50 dark:border-white/20 shadow-xl backdrop-blur-sm bg-white/90 dark:bg-white/10 ${className}`}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export const AboutMe: React.FC<AboutMeProps> = ({ profile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Counter animation state with visibility tracking
  const [yearsCount, setYearsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Refs for the 7-node layout
  const div1Ref = useRef<HTMLDivElement>(null); // Top Left
  const div2Ref = useRef<HTMLDivElement>(null); // Mid Left
  const div3Ref = useRef<HTMLDivElement>(null); // Bot Left
  const div4Ref = useRef<HTMLDivElement>(null); // Center
  const div5Ref = useRef<HTMLDivElement>(null); // Top Right
  const div6Ref = useRef<HTMLDivElement>(null); // Mid Right
  const div7Ref = useRef<HTMLDivElement>(null); // Bot Right

  // State to manage dynamic beam directions and speeds (slower)
  const [beams, setBeams] = useState([
    { reverse: false, duration: 10 }, // 1 -> 4
    { reverse: false, duration: 11 }, // 2 -> 4
    { reverse: false, duration: 10.5 }, // 3 -> 4
    { reverse: true, duration: 10.2 },  // 5 -> 4
    { reverse: true, duration: 11.1 },  // 6 -> 4
    { reverse: true, duration: 10.8 },  // 7 -> 4
  ]);

  // Intersection Observer to trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [isVisible]);

  // Counter animation effect with easing
  useEffect(() => {
    if (!isVisible) return;

    const yearsTarget = 5;
    const clientsTarget = 10;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const easeOutQuad = (t: number) => t * (2 - t); // Ease out quadratic

    const animateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      setYearsCount(Math.floor(easedProgress * yearsTarget));
      setClientsCount(Math.floor(easedProgress * clientsTarget));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible]);

  // Effect to randomly toggle directions to create "living" data flow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBeams(prevBeams => prevBeams.map(beam => {
        // 40% chance to flip direction each tick
        const shouldFlip = Math.random() > 0.6;
        return {
          reverse: shouldFlip ? !beam.reverse : beam.reverse,
          // Randomize duration slightly for organic feel
          duration: 2.5 + Math.random() * 2
        };
      }));
    }, 2500); // Update frequency

    return () => clearInterval(interval);
  }, []);

  const imageUrl = profile.avatarUrl || 'https://github.com/atakanclskn.png';

  // Beam Colors mapped to Icons
  const beamColors = [
     "#06b6d4", // Cyan
     "#3b82f6", // Blue
     "#ec4899", // Pink
     "#22c55e", // Green
     "#a855f7", // Purple
     "#eab308", // Yellow
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-12 lg:gap-10 items-start">
          
          {/* LEFT SIDE: Visual Animation */}
          <div 
            className="relative flex h-[500px] lg:h-[600px] w-full items-center justify-center overflow-hidden p-8 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-[3rem] border border-gray-200 dark:border-white/5 shadow-xl lg:col-span-3"
            ref={containerRef}
          >
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* BEAMS - Placed BEFORE content to sit visually behind but handled via z-index just in case */}
            
            {/* Left Side Connections */}
            <AnimatedBeam 
                containerRef={containerRef} fromRef={div1Ref} toRef={div4Ref} curvature={-75} endYOffset={-10} 
                gradientStartColor={beamColors[0]} gradientStopColor={beamColors[0]}
                reverse={beams[0].reverse} duration={beams[0].duration} pathWidth={3} pathOpacity={0.3}
                className="z-10"
            />
            <AnimatedBeam 
                containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} curvature={0} 
                gradientStartColor={beamColors[1]} gradientStopColor={beamColors[1]} 
                reverse={beams[1].reverse} duration={beams[1].duration} pathWidth={3} pathOpacity={0.3}
                className="z-10"
            />
            <AnimatedBeam 
                containerRef={containerRef} fromRef={div3Ref} toRef={div4Ref} curvature={75} endYOffset={10} 
                gradientStartColor={beamColors[2]} gradientStopColor={beamColors[2]} 
                reverse={beams[2].reverse} duration={beams[2].duration} pathWidth={3} pathOpacity={0.3}
                className="z-10"
            />
            
            {/* Right Side Connections */}
            <AnimatedBeam 
                containerRef={containerRef} fromRef={div5Ref} toRef={div4Ref} curvature={-75} endYOffset={-10} 
                gradientStartColor={beamColors[3]} gradientStopColor={beamColors[3]} 
                reverse={beams[3].reverse} duration={beams[3].duration} pathWidth={3} pathOpacity={0.3}
                className="z-10"
            />
            <AnimatedBeam 
                containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} 
                gradientStartColor={beamColors[4]} gradientStopColor={beamColors[4]} 
                reverse={beams[4].reverse} duration={beams[4].duration} pathWidth={3} pathOpacity={0.3}
                className="z-10"
            />
            <AnimatedBeam 
                containerRef={containerRef} fromRef={div7Ref} toRef={div4Ref} curvature={75} endYOffset={10} 
                gradientStartColor={beamColors[5]} gradientStopColor={beamColors[5]} 
                reverse={beams[5].reverse} duration={beams[5].duration} pathWidth={3} pathOpacity={0.3}
                className="z-10"
            />

            {/* Content Container (Icons & Profile) - z-20 to sit above beams */}
            <div className="flex size-full flex-col items-stretch justify-between gap-12 max-w-lg relative z-20 pointer-events-none">
              
              {/* Row 1: Top Left & Top Right */}
              <div className="flex flex-row items-center justify-between pointer-events-auto">
                <Circle ref={div1Ref}>
                  <CSharpLogo className="w-8 h-8" />
                </Circle>
                <Circle ref={div5Ref}>
                  <HTMLLogo className="w-8 h-8" />
                </Circle>
              </div>

              {/* Row 2: Mid Left, Center, Mid Right */}
              <div className="flex flex-row items-center justify-between pointer-events-auto">
                <Circle ref={div2Ref}>
                  <TSLogo className="w-8 h-8" />
                </Circle>
                
                {/* CENTER IMAGE (div4) */}
                <div ref={div4Ref} className="relative z-30 size-32 md:size-36 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden">
                    <div className="w-full h-full rounded-full overflow-hidden relative p-2 z-30">
                         <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 animate-pulse rounded-full"></div>
                         {imageUrl ? (
                             <img src={imageUrl} alt="Profile" className="w-full h-full object-cover relative z-10 p-1 rounded-full bg-white dark:bg-black" />
                         ) : (
                             <div className="w-full h-full bg-gray-200 dark:bg-white/10 flex items-center justify-center relative z-10 rounded-full">
                                 <span className="text-xs font-bold">ME</span>
                             </div>
                         )}
                    </div>
                </div>

                <Circle ref={div6Ref}>
                  <TailwindLogo className="w-8 h-8" />
                </Circle>
              </div>

              {/* Row 3: Bot Left & Bot Right */}
              <div className="flex flex-row items-center justify-between pointer-events-auto">
                <Circle ref={div3Ref}>
                  <PythonLogo className="w-8 h-8" />
                </Circle>
                <Circle ref={div7Ref}>
                  <ReactLogo className="w-8 h-8" />
                </Circle>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Text Content */}
          <div className="space-y-8 text-center lg:text-left lg:col-span-4">
            <div>
               <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-6">
                 Who Am I? <br className="hidden md:block"/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">More Than Just Code</span>
               </h2>
               <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                 <p>
                   Beyond the terminal and IDE, I'm a curious mind who finds beauty in solving complex problems. 
                   I believe technology should serve humanity, not the other way around.
                 </p>
                 <p>
                   When I'm not pushing pixels or debugging code, you'll find me exploring new technologies, 
                   contributing to open-source projects, or diving deep into system architecture discussions.
                 </p>
                 <p className="text-base italic border-l-4 border-primary/50 pl-4">
                   "I'm passionate about creating elegant solutions that make a real difference in people's lives."
                 </p>
               </div>
            </div>

            {/* Hobbies & Interests */}
            <div className="space-y-3 border-t border-gray-200 dark:border-white/10 pt-8">
               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Beyond the Code</h3>
               <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-700 dark:text-gray-300">🎮 Gaming</span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-700 dark:text-gray-300">🎾 Tennis</span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-700 dark:text-gray-300">📚 Tech Blogs</span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-700 dark:text-gray-300">☕ Coffee Enthusiast</span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-700 dark:text-gray-300">🏍️ Motorcycling</span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-700 dark:text-gray-300">🚀 Space Tech</span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-700 dark:text-gray-300">🎵 Lo-fi Beats</span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-700 dark:text-gray-300">🌍 Open Source</span>
               </div>
            </div>
          </div>

        </div>

        {/* Stats & Core Values Section - Below both columns */}
        <div ref={statsRef} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-stretch">
          
          {/* Years of Experience */}
          <div 
            className="flex flex-col items-center justify-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 min-h-[160px] opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
              transitionDelay: '0ms'
            }}
          >
            <h4 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-mono">
              {yearsCount}+
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-2">Years Coding</p>
          </div>

          {/* Happy Clients */}
          <div 
            className="flex flex-col items-center justify-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 min-h-[160px] opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
              transitionDelay: '150ms'
            }}
          >
            <h4 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-mono">
              {clientsCount}+
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-2">Happy Clients</p>
          </div>

          {/* Clean Code */}
          <div 
            className="flex flex-col items-center justify-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 min-h-[160px] opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
              transitionDelay: '300ms'
            }}
          >
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-mono">Clean</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">Code Quality</p>
          </div>

          {/* Fast Performance */}
          <div 
            className="flex flex-col items-center justify-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 min-h-[160px] opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
              transitionDelay: '450ms'
            }}
          >
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-mono">Fast</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">Performance</p>
          </div>

          {/* User First Design */}
          <div 
            className="flex flex-col items-center justify-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/10 min-h-[160px] opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
              transitionDelay: '600ms'
            }}
          >
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-mono">User</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">First Design</p>
          </div>
        </div>
      </div>
    </section>
  );
};
