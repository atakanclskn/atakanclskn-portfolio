
import React from 'react';
import { ArrowUpRight, Mail, Github, Linkedin, Twitter, Instagram, Send } from 'lucide-react';
import { Social, Profile } from '../types';

interface ConnectProps {
  socials: Social[];
  profile: Profile;
}

export const Connect: React.FC<ConnectProps> = ({ socials, profile }) => {
  
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      default: return <ArrowUpRight className="w-5 h-5" />;
    }
  };

  return (
    <>
      <section id="contact" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
               <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Let's work together.
               </h2>
               <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                 Have a project in mind or just want to say hi? Fill out the form below or send me an email.
               </p>

               <form className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Name</label>
                    <input type="text" className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                    <input type="email" className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Message</label>
                    <textarea rows={4} className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors" placeholder="Tell me about your project..."></textarea>
                  </div>
                  <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </button>
               </form>
            </div>

            {/* Socials Grid */}
            <div className="flex flex-col justify-between">
                <div>
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Find me on</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {socials.map((social) => (
                        <a 
                          key={social._id} 
                          href={social.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="group p-6 bg-white dark:bg-surface border border-gray-200 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/30 transition-all hover:-translate-y-1 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-4">
                             <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-full text-gray-900 dark:text-white group-hover:scale-110 transition-transform">
                               {getIcon(social.platform)}
                             </div>
                             <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                          </div>
                          <p className="font-bold text-gray-900 dark:text-white">{social.platform}</p>
                          <p className="text-xs text-gray-500">{social.username || 'Follow'}</p>
                        </a>
                      ))}
                      
                      <a href="mailto:contact@atakan.dev" className="group p-6 bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 transition-all hover:-translate-y-1">
                          <div className="flex items-center justify-between mb-4">
                             <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                               <Mail className="w-5 h-5" />
                             </div>
                             <ArrowUpRight className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                          </div>
                          <p className="font-bold text-primary">Email</p>
                          <p className="text-xs text-primary/70">contact@atakan.dev</p>
                      </a>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Atakan Çalışkan. All rights reserved.</p>
          <div className="flex gap-6">
             <span className="text-gray-400 text-sm">Designed & Built with ❤️</span>
          </div>
        </div>
      </footer>
    </>
  );
};
