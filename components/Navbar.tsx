import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scrolled state slightly later for a smoother feel
      setScrolled(window.scrollY > 40);

      // Order matches the visual layout in App.tsx
      const sections = ['expertise', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 120;
      
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out border-b ${
        scrolled 
          ? 'bg-background/60 backdrop-blur-2xl border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
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
             <span className="text-primary font-mono font-bold text-xl mr-1 animate-pulse">{'>'}</span>
             <span className="text-primary font-mono font-bold text-xl mr-2">_</span>
             <span className="font-display font-bold text-xl tracking-tighter text-white group-hover:text-primary transition-colors">
                atakanclskn
             </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-1 ${
                  activeSection === link.href.replace('#', '') 
                    ? 'text-white' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {link.name}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary animate-in fade-in slide-in-from-left-2 duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
                )}
              </a>
            ))}
          </div>
          
          <button 
            onClick={() => {
               const el = document.getElementById('contact');
               if(el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
            }}
            className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 ${
              scrolled 
                ? 'bg-primary text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                : 'bg-white/5 text-white border border-white/10 hover:border-primary/50'
            }`}
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 transition-transform active:scale-90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-x-0 top-[100%] bg-background/95 backdrop-blur-3xl border-b border-white/5 overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
        mobileMenuOpen ? 'max-h-[400px] opacity-100 shadow-2xl' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-2xl font-display font-bold transition-colors ${
                activeSection === link.href.replace('#', '') ? 'text-primary' : 'text-gray-400 hover:text-white'
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
            className="w-full mt-4 py-4 bg-primary text-black font-bold rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            Let's Talk
          </button>
        </div>
      </div>
    </nav>
  );
};