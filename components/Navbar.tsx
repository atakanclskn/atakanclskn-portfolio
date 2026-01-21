
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  
  // Use Ref for direct DOM manipulation (Performance optimization for instant 1:1 scroll feel)
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

      const sections = ['expertise', 'projects', 'experience', 'contact'];
      const scrollPosition = currentScrollY + 120;
      const isBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 50;
      
      if (isBottom) {
        setActiveSection('contact');
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
    // Initial call to set state correctly on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
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

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out border-b ${
        scrolled 
          ? 'bg-white/80 dark:bg-background/60 backdrop-blur-2xl border-gray-200 dark:border-white/10 py-4 shadow-sm' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex items-center">
             <span className="font-display font-bold text-xl tracking-tighter text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                atakanclskn
             </span>
             <span className="w-2 h-2 rounded-full bg-primary ml-1"></span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
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
          
          <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-2"></div>

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
            Let's Talk
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
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
            Let's Talk
          </button>
        </div>
      </div>
    </nav>
  );
};
