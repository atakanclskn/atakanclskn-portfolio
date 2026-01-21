
import React from 'react';
import { ArrowUpRight, Mail, Github, Linkedin, Twitter, Instagram, Send } from 'lucide-react';
import { Social, Profile } from '../types';
import { BorderBeam } from './BorderBeam';
import { MagicCard } from './MagicCard';
import { useLanguage } from '../lib/i18n';

interface ConnectProps {
  socials: Social[];
  profile: Profile;
}

export const Connect: React.FC<ConnectProps> = ({ socials, profile }) => {
  const { t } = useLanguage();
  
  const getSocialStyle = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return { icon: <Linkedin className="w-5 h-5" />, color: '#0A66C2' };
      case 'twitter': return { icon: <Twitter className="w-5 h-5" />, color: '#1D9BF0' };
      case 'github': return { icon: <Github className="w-5 h-5" />, color: '#808080' };
      case 'instagram': return { icon: <Instagram className="w-5 h-5" />, color: '#E4405F' };
      default: return { icon: <ArrowUpRight className="w-5 h-5" />, color: '#06b6d4' };
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
                {t.contact.title}
               </h2>
               <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                 {t.contact.desc}
               </p>

               <form className="space-y-6 relative">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t.contact.form.name}</label>
                    <input type="text" className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t.contact.form.email}</label>
                    <input type="email" className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t.contact.form.message}</label>
                    <textarea rows={4} className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors" placeholder="Tell me about your project..."></textarea>
                  </div>
                  <button className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2">
                    {t.contact.form.send} <Send className="w-4 h-4" />
                  </button>
               </form>
            </div>

            {/* Socials Grid */}
            <div className="flex flex-col justify-between">
                <div>
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t.contact.findMe}</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {socials.map((social) => {
                        const style = getSocialStyle(social.platform);
                        return (
                          <a 
                            key={social._id} 
                            href={social.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="block"
                          >
                             <MagicCard 
                                gradientColor={style.color + '33'}
                                className="relative group bg-white dark:bg-surface border border-gray-200 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/30 transition-all hover:-translate-y-1 shadow-sm overflow-hidden"
                             >
                                <BorderBeam size={100} duration={6} colorFrom={style.color} colorTo="transparent" />
                                
                                <div className="relative z-10 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-full text-gray-900 dark:text-white group-hover:scale-110 transition-transform">
                                        {style.icon}
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-white">{social.platform}</p>
                                    <p className="text-xs text-gray-500">{social.username || 'Follow'}</p>
                                </div>
                             </MagicCard>
                          </a>
                        );
                      })}
                      
                      <a href="mailto:contact@atakan.dev" className="block">
                          <MagicCard 
                            gradientColor="rgba(6, 182, 212, 0.2)" 
                            className="relative group bg-white dark:bg-surface border border-gray-200 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/30 transition-all hover:-translate-y-1 shadow-sm overflow-hidden"
                          >
                              <BorderBeam size={100} duration={6} colorFrom="#06b6d4" colorTo="transparent" />
                              <div className="relative z-10 p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-full text-gray-900 dark:text-white group-hover:scale-110 transition-transform">
                                    <Mail className="w-5 h-5" />
                                  </div>
                                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                </div>
                                <p className="font-bold text-gray-900 dark:text-white">Email</p>
                                <p className="text-xs text-gray-500">contact@atakan.dev</p>
                              </div>
                          </MagicCard>
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
