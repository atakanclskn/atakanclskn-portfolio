import React from 'react';
import { Play, Twitch, Linkedin, Twitter, ArrowUpRight, Mail, Code } from 'lucide-react';
import { Social, Profile } from '../types';

interface ConnectProps {
  socials: Social[];
  profile: Profile;
}

export const Connect: React.FC<ConnectProps> = ({ socials, profile }) => {
  
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitch': return <Twitch className="w-6 h-6" />;
      case 'linkedin': return <Linkedin className="w-6 h-6" />;
      case 'twitter': return <Twitter className="w-6 h-6" />;
      default: return <ArrowUpRight className="w-6 h-6" />;
    }
  };

  const getColor = (platform: string) => {
      switch (platform.toLowerCase()) {
      case 'twitch': return 'text-[#9146FF] group-hover:bg-[#9146FF]';
      case 'linkedin': return 'text-[#0077b5] group-hover:bg-[#0077b5]';
      case 'twitter': return 'text-white group-hover:bg-white';
      default: return 'text-gray-400 group-hover:bg-white';
    }
  };

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if(id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="contact" className="py-32 relative overflow-hidden bg-surface/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </div>
                <h2 className="text-2xl font-display font-bold text-white tracking-wide">LATEST TRANSMISSION</h2>
              </div>
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 bg-black relative group mb-8 shadow-2xl shadow-secondary/5 transition-all duration-500 hover:border-secondary/30">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity scale-100 group-hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 cursor-pointer">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block bg-black/50 w-fit px-2 py-1 rounded backdrop-blur-md">New Video</span>
                  <h3 className="text-2xl font-bold text-white truncate drop-shadow-lg">How I Built a SaaS in 7 Days (No Sleep)</h3>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <h3 className="text-2xl font-display font-bold text-white mb-4">Contact</h3>
              
              {socials?.map(social => (
                 <a key={social._id} href={social.url} target="_blank" className="group flex items-center justify-between p-5 rounded-xl bg-background border border-white/5 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center transition-all group-hover:text-black ${getColor(social.platform)}`}>
                      {getIcon(social.platform)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white transition-colors">{social.platform}</h4>
                      <p className="text-xs text-gray-500 font-mono">{social.username || 'Connect'}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-white/5 bg-black/80 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          
          <div 
            className="flex flex-col items-center md:items-start gap-4 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center">
               <span className="text-primary font-mono font-bold text-xl mr-1 animate-pulse">{'>'}</span>
               <span className="text-primary font-mono font-bold text-xl mr-2">_</span>
               <span className="font-display font-bold text-2xl tracking-tighter text-white group-hover:text-primary transition-colors">
                  atakanclskn
               </span>
            </div>
            <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">© {new Date().getFullYear()} • ARCHITECTING_THE_FUTURE</p>
          </div>
          
          <div className="flex gap-10">
            {[
              { label: 'Expertise', id: 'expertise' },
              { label: 'Projects', id: 'projects' },
              { label: 'Experience', id: 'experience' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
               <a 
                 key={item.id} 
                 href={`#${item.id}`} 
                 onClick={(e) => handleFooterLinkClick(e, item.id)}
                 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all hover:scale-105"
               >
                 {item.label}
               </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a href="mailto:contact@atakan.dev" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all transform hover:-translate-y-1">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/atakanclskn" target="_blank" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all transform hover:-translate-y-1">
              <Code className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};