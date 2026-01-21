
import React, { forwardRef, useRef, useState, useEffect } from "react";
import { AnimatedBeam } from "./AnimatedBeam";
import { BorderBeam } from "./BorderBeam";
import { Profile } from "../types";
import { urlFor } from '../lib/sanity.client';
import { useLanguage } from '../lib/i18n';

interface AboutMeProps {
  profile: Profile;
}

// Custom SVG Logos
const ReactLogo = ({ className }: { className?: string }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const TSLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
     <rect x="20" y="20" width="88" height="88" rx="10" stroke="currentColor" strokeWidth="8" fill="none" />
     <path d="M59.5,60h-8v28h-8V60h-8V54h24V60z M84.5,68c-1.5-1-3.5-1.5-5.5-1.5c-2.5,0-3.5,1-3.5,2.5c0,1.5,1,2,4,3 c4.5,1.5,8.5,3.5,8.5,9c0,5-4,8.5-11,8.5c-3.5,0-7-1-9.5-3l3-5.5c2,1.5,4.5,2.5,6.5,2.5c2,0,3-1,3-2.5c0-1.5-1.5-2-4.5-3 c-4.5-1.5-8-4-8-9c0-5,4-8,10-8c3,0,6,1,8.5,2L84.5,68z" fill="currentColor" stroke="none" />
  </svg>
);

const FigmaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 38 57" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fillOpacity="0.8"/>
    <path d="M0 47.5a9.5 9.5 0 0 0 9.5 9.5h0A9.5 9.5 0 0 0 19 47.5V28.5H9.5A9.5 9.5 0 0 0 0 38v9.5z" fillOpacity="0.8"/>
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fillOpacity="0.8"/>
    <path d="M0 9.5a9.5 9.5 0 0 0 9.5 9.5H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fillOpacity="0.8"/>
    <path d="M0 28.5a9.5 9.5 0 0 0 9.5 9.5H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fillOpacity="0.8"/>
  </svg>
);

const NodeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M64,16 L108,40 L108,88 L64,112 L20,88 L20,40 L64,16 Z" stroke="currentColor" strokeWidth="8" fill="none" />
    <path d="M64,30 L64,98 M28,50 L100,50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const PostgresLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,18c-2.05,0-3.89-1.12-4.9-2.82 c1.63-0.5,3.46-0.78,5.4-0.78c1.38,0,2.71,0.14,3.97,0.4C15.82,16.89,14.02,18,12,18z M17.65,13.7c-1.63-0.41-3.41-0.65-5.25-0.65 c-2.28,0-4.43,0.36-6.31,1.01C5.64,13.43,5.4,12.73,5.4,12c0-3.64,2.96-6.6,6.6-6.6s6.6,2.96,6.6,6.6 C18.6,12.6,18.23,13.18,17.65,13.7z"/>
  </svg>
);

const PythonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
     <path d="M64 12c-15 0-14 6.5-14 6.5v6.5h28v4h-38c-15 0-21 9-21 21s6 22 18 22h3v-13c0-10 8-12 12-12h18c10 0 12-8 12-12v-11c0-13-10-12-18-12z m8 9a3 3 0 1 1-3 3 3 3 0 0 1 3-3z" />
     <path d="M64 116c15 0 14-6.5 14-6.5v-6.5h-28v-4h38c15 0 21-9 21-21s-6-22-18-22h-3v13c0 10-8 12-12 12h-18c-10 0-12 8-12 12v11c0 13 10 12 18 12z m-8-9a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" opacity="0.8"/>
  </svg>
);

// Reusable Circle Component for Icons
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; color?: string }
>(({ className, children, color = "bg-white dark:bg-black" }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-20 flex size-12 items-center justify-center rounded-full border border-gray-200 dark:border-white/10 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] ${color} ${className}`}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export const AboutMe: React.FC<AboutMeProps> = ({ profile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // Refs for the 7-node layout
  const div1Ref = useRef<HTMLDivElement>(null); // Top Left
  const div2Ref = useRef<HTMLDivElement>(null); // Mid Left
  const div3Ref = useRef<HTMLDivElement>(null); // Bot Left
  const div4Ref = useRef<HTMLDivElement>(null); // Center
  const div5Ref = useRef<HTMLDivElement>(null); // Top Right
  const div6Ref = useRef<HTMLDivElement>(null); // Mid Right
  const div7Ref = useRef<HTMLDivElement>(null); // Bot Right

  // State to manage dynamic beam directions and speeds
  // Initial state: Mixed directions
  const [beams, setBeams] = useState([
    { reverse: false, duration: 3 }, // 1 -> 4
    { reverse: false, duration: 4 }, // 2 -> 4
    { reverse: false, duration: 3.5 }, // 3 -> 4
    { reverse: true, duration: 3.2 },  // 5 -> 4
    { reverse: true, duration: 4.1 },  // 6 -> 4
    { reverse: true, duration: 3.8 },  // 7 -> 4
  ]);

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

  let imageUrl = '';
  if (profile.heroImage) {
      if (typeof profile.heroImage === 'string') {
          imageUrl = profile.heroImage;
      } else {
          imageUrl = urlFor(profile.heroImage).url();
      }
  }

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Visual Animation */}
          <div 
            className="relative flex h-[400px] w-full items-center justify-center overflow-hidden p-10 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-[3rem] border border-gray-200 dark:border-white/5 shadow-xl"
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
            <div className="flex size-full flex-col items-stretch justify-between gap-10 max-w-lg relative z-20 pointer-events-none">
              
              {/* Row 1: Top Left & Top Right */}
              <div className="flex flex-row items-center justify-between pointer-events-auto">
                {/* React - Cyan */}
                <Circle ref={div1Ref} className="text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 dark:border-cyan-500/30">
                  <ReactLogo className="w-6 h-6" />
                </Circle>
                {/* Node.js - Green */}
                <Circle ref={div5Ref} className="text-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-500/30">
                  <NodeLogo className="w-6 h-6" />
                </Circle>
              </div>

              {/* Row 2: Mid Left, Center, Mid Right */}
              <div className="flex flex-row items-center justify-between pointer-events-auto">
                {/* TypeScript - Blue */}
                <Circle ref={div2Ref} className="text-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500/30">
                  <TSLogo className="w-6 h-6" />
                </Circle>
                
                {/* CENTER IMAGE (div4) */}
                <div ref={div4Ref} className="relative z-30 size-24 md:size-28 rounded-full bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden">
                    {/* BorderBeam on the profile circle - z-40 to be visible */}
                    <div className="absolute inset-0 z-40">
                         <BorderBeam size={80} duration={4} delay={0} colorFrom="#06b6d4" colorTo="transparent" borderWidth={2} />
                    </div>
                    
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

                {/* PostgreSQL - Purple */}
                <Circle ref={div6Ref} className="text-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-500/30">
                  <PostgresLogo className="w-6 h-6" />
                </Circle>
              </div>

              {/* Row 3: Bot Left & Bot Right */}
              <div className="flex flex-row items-center justify-between pointer-events-auto">
                {/* Figma - Pink */}
                <Circle ref={div3Ref} className="text-pink-500 bg-pink-50 dark:bg-pink-900/20 dark:border-pink-500/30">
                  <FigmaLogo className="w-5 h-5" />
                </Circle>
                {/* Python - Yellow */}
                <Circle ref={div7Ref} className="text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500/30">
                  <PythonLogo className="w-6 h-6" />
                </Circle>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div>
               <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-6">
                 {t.about.title} <br className="hidden md:block"/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t.about.highlight}</span>
               </h2>
               <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                 <p>
                    {t.about.p1}
                 </p>
                 <p>
                    {t.about.p2}
                 </p>
               </div>
            </div>

            {/* Stats / Fun Facts */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-white/10 pt-8">
               <div className="text-center lg:text-left">
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-mono">5+</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.about.years}</p>
               </div>
               <div className="text-center lg:text-left">
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-mono">20+</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.about.shipped}</p>
               </div>
               <div className="text-center lg:text-left">
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white font-mono">100%</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{t.about.coffee}</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
