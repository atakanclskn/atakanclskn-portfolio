
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Globe } from 'lucide-react';
import { useLanguage, languages, Language } from '../lib/i18n';
import { useAdmin } from '../lib/adminContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  
  const { lang, setLang, t } = useLanguage();
  const { navbarSettings } = useAdmin();
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize theme based on HTML class
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update Scrolled State (React automatically prevents re-render if value is same)
      setScrolled(currentScrollY > 40);

      // Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      
      // Update Width Directly via Ref (Instantly, without waiting for React Render Cycle)
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }

      // Updated sections list: Removed 'expertise' and 'contact' from scroll spy to match nav links
      const sections = ['about', 'projects', 'experience'];
      const scrollPosition = currentScrollY + 120;
      const isBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 50;
      
      if (isBottom) {
        setActiveSection('contact'); // Keep tracking bottom, but no link will highlight
        return;
      }

      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    // Initial call to set state correctly on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
      setIsLangOpen(false);
    }
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  // Removed Expertise and Contact from nav links
  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.experience, href: '#experience' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
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
      setMobileMenuOpen(false);
    }
  };

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out border-b ${
        scrolled 
          ? 'bg-white/80 dark:bg-background/60 backdrop-blur-2xl border-gray-200 dark:border-white/10 py-4 shadow-sm' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between relative">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-2 group cursor-pointer z-20"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {navbarSettings.showLogo && (
            <div className="flex items-center">
               <span className="font-display font-bold text-xl tracking-tighter text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {navbarSettings.logoText}
               </span>
               <span className="w-2 h-2 rounded-full bg-primary ml-1"></span>
            </div>
          )}
        </div>

        {/* Centered Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[13px] font-medium transition-colors duration-300 relative ${
                  activeSection === link.href.replace('#', '') 
                    ? 'text-black dark:text-white font-bold' 
                    : 'text-gray-500 hover:text-black dark:hover:text-gray-300'
                }`}
              >
                {link.name}
              </a>
            ))}
        </div>

        {/* Right Side Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher - Minimal EN/TR */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-xs font-bold font-mono text-gray-900 dark:text-white">{lang.toUpperCase()}</span>
              <ChevronDown size={12} className={`text-gray-500 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Minimal Dropdown - Only EN/TR */}
            <div className={`absolute top-full right-0 mt-2 w-20 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl overflow-hidden transition-all duration-300 origin-top z-50 ${isLangOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
              <div className="p-1">
                <button
                  onClick={() => {
                    setLang('EN');
                    setIsLangOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded text-xs font-bold font-mono transition-colors ${
                    lang === 'EN' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => {
                    setLang('TR');
                    setIsLangOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded text-xs font-bold font-mono transition-colors ${
                    lang === 'TR' 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  TR
                </button>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            onClick={() => {
               const el = document.getElementById('contact');
               if(el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {navbarSettings.ctaText}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Language Switcher - Minimal */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 text-xs font-bold font-mono px-2 py-1 rounded bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white"
            >
              {lang.toUpperCase()}
              <ChevronDown size={10} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
          
            {/* Mobile Language Dropdown - Slide down animation */}
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-1 w-16 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in-up origin-top">
                <div className="p-1">
                  <button
                    onClick={() => {
                      setLang('EN');
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-2 py-2 rounded text-xs font-bold font-mono transition-colors ${
                      lang === 'EN' ? 'bg-primary/10 text-primary' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => {
                      setLang('TR');
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-2 py-2 rounded text-xs font-bold font-mono transition-colors ${
                      lang === 'TR' ? 'bg-primary/10 text-primary' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    TR
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
          >
             {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-gray-900 dark:text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div 
        ref={progressBarRef}
        className={`absolute bottom-0 left-0 h-[3px] bg-primary z-50 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: '0%' }}
      />

      {/* Mobile Menu */}
      <div className={`fixed inset-x-0 top-[100%] bg-white dark:bg-background border-b border-gray-200 dark:border-white/5 overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
        mobileMenuOpen ? 'max-h-[400px] opacity-100 shadow-xl' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-lg font-medium transition-colors ${
                activeSection === link.href.replace('#', '') ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              const el = document.getElementById('contact');
              if(el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="w-full mt-4 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20"
          >
            {t.nav.letsTalk}
          </button>
        </div>
      </div>
    </nav>
  );
};
