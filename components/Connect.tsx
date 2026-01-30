
import React, { useState } from 'react';
import { ArrowUpRight, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Social, Profile } from '../types';
import { MagicCard } from './MagicCard';
import { useLanguage } from '../lib/i18n';
import { useAdmin } from '../lib/adminContext';

interface ConnectProps {
  socials: Social[];
  profile: Profile;
}

export const Connect: React.FC<ConnectProps> = ({ socials, profile }) => {
  const { t } = useLanguage();
  const { addMessage } = useAdmin();
  
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const getSocialColor = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('linkedin')) return '#0A66C2';
    if (lowerPlatform.includes('twitter') || lowerPlatform.includes('x')) return '#1D9BF0';
    if (lowerPlatform.includes('github')) return '#808080';
    if (lowerPlatform.includes('instagram')) return '#E4405F';
    if (lowerPlatform.includes('facebook')) return '#1877F2';
    if (lowerPlatform.includes('youtube')) return '#FF0000';
    if (lowerPlatform.includes('discord')) return '#5865F2';
    if (lowerPlatform.includes('telegram')) return '#0088CC';
    return '#06b6d4'; // Default cyan
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

               {isSubmitted ? (
                 <div className="flex flex-col items-center justify-center py-12 text-center">
                   <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                     <CheckCircle className="w-8 h-8 text-green-500" />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                     Mesajınız Gönderildi!
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400 mb-6">
                     En kısa sürede size geri dönüş yapacağım.
                   </p>
                   <button
                     onClick={() => {
                       setIsSubmitted(false);
                       setFormData({ name: '', email: '', message: '' });
                     }}
                     className="text-primary font-bold hover:underline"
                   >
                     Yeni mesaj gönder
                   </button>
                 </div>
               ) : (
               <form 
                 className="space-y-6 relative"
                 onSubmit={(e) => {
                   e.preventDefault();
                   setError('');
                   
                   // Validation
                   if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
                     setError('Lütfen tüm alanları doldurun.');
                     return;
                   }
                   
                   if (!formData.email.includes('@')) {
                     setError('Geçerli bir e-posta adresi girin.');
                     return;
                   }
                   
                   setIsSubmitting(true);
                   
                   // Simulate network delay for better UX
                   setTimeout(() => {
                     addMessage(formData.name, formData.email, formData.message);
                     setIsSubmitting(false);
                     setIsSubmitted(true);
                   }, 800);
                 }}
               >
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t.contact.form.name}</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t.contact.form.email}</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t.contact.form.message}</label>
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors" 
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        {t.contact.form.send} <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
               </form>
               )}
            </div>

            {/* Socials Grid */}
            <div className="flex flex-col justify-between">
                <div>
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t.contact.findMe}</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {socials.map((social) => {
                        const color = getSocialColor(social.platform);
                        const IconComponent = (LucideIcons as any)[social.iconName] || LucideIcons.Link;
                        
                        return (
                          <a 
                            key={social._id} 
                            href={social.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="block"
                          >
                             <MagicCard 
                                gradientColor={color + '33'}
                                className="relative group bg-white dark:bg-surface border border-gray-200 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/30 transition-all hover:-translate-y-1 shadow-sm overflow-hidden"
                             >
                                <div className="relative z-10 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-full text-gray-900 dark:text-white group-hover:scale-110 transition-transform">
                                          <IconComponent className="w-5 h-5" />
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
