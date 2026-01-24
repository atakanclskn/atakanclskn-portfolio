
import React from 'react';
import { TechItem } from '../types';

// Real Technology Logos
const NextLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 180 180" {...props}>
    <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
      <circle cx="90" cy="90" r="88" fill="white"/>
    </mask>
    <g mask="url(#nextjs-mask)">
      <circle cx="90" cy="90" r="88" fill="currentColor"/>
      <path d="M149.508 157.52L69.142 54H54v71.97h12.114V69.384l73.885 95.461a88.981 88.981 0 0 0 9.509-7.325Z" fill="url(#nextjs-gradient)" stroke="url(#nextjs-gradient)"/>
      <path d="M115 54h12v72h-12z" fill="url(#nextjs-gradient)" stroke="url(#nextjs-gradient)"/>
    </g>
    <defs>
      <linearGradient id="nextjs-gradient" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
);

const ReactLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const TypeScriptLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props}>
    <rect width="128" height="128" rx="6" fill="currentColor"/>
    <path fill="white" d="M22.67 47h23.67v13.07h-8.27v39.26h-7.13V60.07h-8.27V47zm30.6 0h7.4v52.33h-7.4V47zm10.8 0h26.53v7.07h-19.13v15.6h17.73v7.07H71.47v15.53h19.4v7.06H64.07V47z"/>
  </svg>
);

const TailwindLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 154" {...props}>
    <defs>
      <linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="tailwind-gradient">
        <stop stopColor="currentColor" offset="0%"></stop>
        <stop stopColor="currentColor" stopOpacity="0.5" offset="100%"></stop>
      </linearGradient>
    </defs>
    <path d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8z" fill="url(#tailwind-gradient)"></path>
  </svg>
);

const FramerLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
  </svg>
);

const ViteLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 410 404" fill="none" {...props}>
    <defs>
      <linearGradient id="vite-gradient-1" x1="6" y1="33" x2="235" y2="344" gradientUnits="userSpaceOnUse">
        <stop stopColor="currentColor"/>
        <stop offset="1" stopColor="currentColor" stopOpacity="0.5"/>
      </linearGradient>
      <linearGradient id="vite-gradient-2" x1="194.651" y1="8.818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
        <stop stopColor="currentColor" stopOpacity="0.8"/>
        <stop offset="1" stopColor="currentColor" stopOpacity="0.3"/>
      </linearGradient>
    </defs>
    <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#vite-gradient-1)"/>
    <path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#vite-gradient-2)"/>
  </svg>
);

const SanityCMSLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 512 512" {...props}>
    <defs>
      <radialGradient id="sanity-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
      </radialGradient>
    </defs>
    <circle cx="256" cy="256" r="256" fill="url(#sanity-gradient)"/>
    <path fill="white" d="M161.527 136.723c-37.295 35.315-34.833 92.052-6.549 123.612 8.23-25.867 20.794-49.136 36.913-68.931-5.554-13.505-6.063-30.648-30.364-54.681zm38.328-16.369c-15.316 15.999-24.688 33.952-28.88 52.356 6.358-7.468 13.556-14.62 21.612-21.337 19.373-16.158 41.977-28.535 66.712-36.36-20.378 2.126-41.024 4.776-59.444 5.34zm-38.328 16.369c24.3 24.033 24.81 41.176 30.364 54.681 16.12-19.795 36.592-36.364 60.306-48.524-30.627 7.988-59.896 19.906-90.67-6.157zm137.192 91.312c8.622-4.056 16.83-8.797 24.557-14.159 8.23-25.867 3.674-55.628-13.916-79.132-17.591-23.504-44.234-36.21-71.619-37.123 25.039 8.017 50.41 22.374 60.978 49.315 10.568 26.94-8.622 59.887 0 81.1zm-15.943 19.766c-25.005 12.77-53.026 20.25-82.38 21.805 0 0 24.752-4.414 47.064-12.77 23.342-8.727 44.998-21.132 64.026-36.36-7.727 5.362-15.935 10.104-24.557 14.159-2.145 1.018-4.118 2.126-6.28 3.143.704 3.507 1.584 6.924 2.127 10.024zm-108.316-2.851c-3.457 2.58-6.724 5.434-9.8 8.288 26.285 27.4 66.517 38.97 104.043 28.14-31.785-2.67-62.93-14.073-94.243-36.428zm-95.156-14.256c17.362 29.535 47.825 50.843 81.99 59.393-6.928-11.043-12.652-23.138-17.071-35.963-19.459-10.205-37.943-22.325-54.7-37.113-3.292 4.414-6.584 8.922-10.219 13.683z"/>
  </svg>
);

const PythonLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props}>
    <defs>
      <linearGradient id="python-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.5"/>
      </linearGradient>
      <linearGradient id="python-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
      </linearGradient>
    </defs>
    <path fill="url(#python-gradient-1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/>
    <path fill="url(#python-gradient-2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/>
  </svg>
);

const NodeJSLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 289" {...props}>
    <path fill="currentColor" d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.156.796-.53 1.856-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.217c1.06-.53 1.59-1.326 1.59-2.385V83.08c0-1.06-.53-2.12-1.59-2.65l-105.74-60.953c-1.06-.53-2.385-.53-3.18 0L20.405 80.166c-1.06.53-1.59 1.59-1.59 2.65v122.17c0 1.06.53 2.12 1.59 2.65l28.887 16.695c15.636 7.95 25.44-1.326 25.44-10.6V93.944c0-1.59 1.326-3.18 3.18-3.18h13.516c1.59 0 3.18 1.326 3.18 3.18v119.818c0 20.936-11.396 33.126-31.272 33.126-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.885 0 213.465 0 205.515V83.346C0 75.396 4.24 67.976 11.13 64L116.87 2.783c6.625-3.71 15.635-3.71 22.26 0L244.87 64C251.76 67.975 256 75.395 256 83.346v122.17c0 7.95-4.24 15.37-11.13 19.345L139.13 286.08c-3.445 1.856-7.42 2.385-11.13 2.385m32.596-84.009c-46.377 0-55.917-21.2-55.917-39.22 0-1.59 1.326-3.18 3.18-3.18h13.78c1.59 0 2.916 1.06 2.916 2.65 2.12 14.045 8.215 20.936 36.306 20.936 22.26 0 31.802-5.035 31.802-16.96 0-6.891-2.65-11.926-37.367-15.372-28.886-2.915-46.907-9.275-46.907-32.33 0-21.467 18.02-34.186 48.232-34.186 33.921 0 50.617 11.66 52.737 37.101 0 .795-.265 1.59-.795 2.385-.53.53-1.326 1.06-2.12 1.06h-13.78c-1.326 0-2.65-1.06-2.916-2.385-3.18-14.575-11.395-19.345-33.126-19.345-24.38 0-27.296 8.48-27.296 14.84 0 7.686 3.445 10.07 36.306 14.31 32.597 4.24 47.967 10.336 47.967 33.127-.265 23.321-19.345 36.571-53.002 36.571"/>
  </svg>
);

const LogoMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'NextLogo': NextLogo,
    'ReactLogo': ReactLogo,
    'TypeScriptLogo': TypeScriptLogo,
    'TailwindLogo': TailwindLogo,
    'FramerLogo': FramerLogo,
    'ViteLogo': ViteLogo,
    'SanityCMSLogo': SanityCMSLogo,
    'PythonLogo': PythonLogo,
    'NodeJSLogo': NodeJSLogo,
};

interface TechStackProps {
  techStack: TechItem[];
}

export const TechStack: React.FC<TechStackProps> = ({ techStack }) => {
  return (
    <section id="tech-stack" className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-[#050505] dark:via-[#0a0a0a] dark:to-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technology Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tools and technologies I use to build modern applications
          </p>
        </div>

        {/* Tech Stack Carousel */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#050505] dark:via-[#050505]/80 dark:to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#050505] dark:via-[#050505]/80 dark:to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
              {/* Duplicate items for seamless loop */}
              {[...techStack, ...techStack, ...techStack].map((item, index) => {
                const LogoComponent = LogoMap[item.iconName] || null;
                return (
                  <div 
                    key={`${item._id}-${index}`} 
                    className="flex-shrink-0 px-8 py-6 group cursor-default"
                  >
                    <div className="flex flex-col items-center gap-4 transition-all duration-300">
                      {/* Logo Container */}
                      <div className={`
                        relative w-16 h-16 flex items-center justify-center
                        rounded-2xl bg-white dark:bg-white/5 
                        border border-gray-200/50 dark:border-white/10
                        shadow-sm hover:shadow-lg
                        transition-all duration-300 ease-out
                        group-hover:scale-110 group-hover:-translate-y-1
                        group-hover:border-gray-300 dark:group-hover:border-white/20
                        ${item.color}
                      `}>
                        {LogoComponent ? (
                          <LogoComponent className="w-9 h-9 transition-all duration-300 opacity-70 group-hover:opacity-100" />
                        ) : (
                          <span className="text-2xl font-bold opacity-70 group-hover:opacity-100">{item.title[0]}</span>
                        )}
                      </div>
                      
                      {/* Tech Name */}
                      <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                          {item.title}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                          {item.tech}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
