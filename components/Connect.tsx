
import React, { useState } from 'react';
import { ArrowUpRight, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Social, Profile } from '../types';
import { MagicCard } from './MagicCard';
import { Reveal } from './Reveal';
import { useLanguage } from '../lib/i18n';
import { useAdmin } from '../lib/adminContext';
import { getText } from '../lib/multiLangHelper';

interface ConnectProps {
  socials: Social[];
  profile: Profile;
}

export const Connect: React.FC<ConnectProps> = ({ socials, profile }) => {
  const { t, lang } = useLanguage();
  const { addMessage, sectionContent, footerSettings, heroContent } = useAdmin();
  
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
            <Reveal direction="left">
            <div>
               <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                {getText(sectionContent.contact.title, lang)}
               </h2>
               <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                 {getText(sectionContent.contact.description, lang)}
               </p>

               {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center" aria-live="polite">
                   <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                     <CheckCircle className="w-8 h-8 text-green-500" />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                     {getText(sectionContent.contact.successMessage, lang).split('!')[0]}!
                   </h3>
                   <p className="text-gray-600 dark:text-gray-400 mb-6">
                     {getText(sectionContent.contact.successMessage, lang).split('!')[1] || ''}
                   </p>
                   <button
                     onClick={() => {
                       setIsSubmitted(false);
                       setFormData({ name: '', email: '', message: '' });
                     }}
                     className="text-primary font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
                     aria-label="Send another message"
                   >
                     {t.contact.form.sendAnother}
                   </button>
                 </div>
               ) : (
              <form 
                 className="space-y-6 relative"
                 aria-label="Contact form"
                 onSubmit={(e) => {
                   e.preventDefault();
                   setError('');
                   
                   // Validation
                   if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
                     setError(t.contact.form.fillAll);
                     return;
                   }
                   
                   if (!formData.email.includes('@')) {
                     setError(t.contact.form.invalidEmail);
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
                   <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm" role="alert" aria-live="assertive">
                      {error}
                    </div>
                  )}
                  <div>
                   <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t.contact.form.name}</label>
                    <input 
                     id="contact-name"
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/60 transition-colors" 
                      placeholder="John Doe" 
                      autoComplete="name"
                      aria-invalid={!!error && !formData.name.trim()}
                    />
                  </div>
                  <div>
                   <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t.contact.form.email}</label>
                    <input 
                     id="contact-email"
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/60 transition-colors" 
                      placeholder="john@example.com" 
                      autoComplete="email"
                      aria-invalid={!!error && (!formData.email.trim() || !formData.email.includes('@'))}
                    />
                  </div>
                  <div>
                   <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{t.contact.form.message}</label>
                    <textarea 
                      id="contact-message"
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/60 transition-colors" 
                      placeholder="Tell me about your project..."
                      aria-invalid={!!error && !formData.message.trim()}
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:opacity-80 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    aria-label={isSubmitting ? t.contact.form.sending : t.contact.form.send}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t.contact.form.sending}
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
            </Reveal>

            {/* Socials Grid */}
            <Reveal direction="right" delay={200}>
            <div className="flex flex-col justify-between">
                <div>
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{getText(sectionContent.contact.findMeText, lang)}</h3>
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
                            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-2xl"
                            aria-label={`${social.platform} profile${social.username ? `: ${social.username}` : ''}`}
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
                      
                      <a href={`mailto:${sectionContent.contact.emailLabel}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-2xl" aria-label={`Send email to ${sectionContent.contact.emailLabel}`}>
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
                                <p className="text-xs text-gray-500">{sectionContent.contact.emailLabel}</p>
                              </div>
                          </MagicCard>
                      </a>
                   </div>
                </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="relative z-20 bg-white dark:bg-black border-t border-gray-200 dark:border-white/10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-tighter text-gray-900 dark:text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                {getText(heroContent.bio, lang)}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-white">
                {lang === 'TR' ? 'Hızlı Linkler' : 'Quick Links'}
              </h4>
              <nav className="flex flex-col gap-2">
                {[
                  { label: t.nav.about, href: '#about' },
                  { label: t.nav.projects, href: '#projects' },
                  { label: t.nav.experience, href: '#experience' },
                  { label: t.nav.contact, href: '#contact' },
                ].map(link => (
                  <a 
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(link.href.replace('#', ''));
                      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                    }}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
                    aria-label={`Go to ${link.label} section`}
                  >
                    {link.label}
                  </a>
                ))}
                {footerSettings.additionalLinks?.map(link => (
                  <a 
                    key={link._id}
                    href={link.url}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
                    aria-label={getText(link.label, lang)}
                  >
                    {getText(link.label, lang)}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900 dark:text-white">
                {lang === 'TR' ? 'Bağlantı' : 'Connect'}
              </h4>
              <div className="flex gap-3">
                {socials.map((social) => {
                  const IconComponent = (LucideIcons as any)[social.iconName] || LucideIcons.Link;
                  return (
                    <a
                      key={social._id}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.platform}
                      className="p-2.5 bg-gray-100 dark:bg-white/5 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
              <a 
                href={`mailto:${sectionContent.contact.emailLabel}`}
                className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
                aria-label={`Send email to ${sectionContent.contact.emailLabel}`}
              >
                {sectionContent.contact.emailLabel}
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              {getText(footerSettings.copyrightText, lang).replace('{year}', new Date().getFullYear().toString())}
            </p>
            
            <div className="flex items-center gap-6">
              {footerSettings.showDesignCredit && (
                <span className="text-gray-400 dark:text-gray-500 text-xs">{getText(footerSettings.designCreditText, lang)}</span>
              )}
              
              {/* Back to Top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                <LucideIcons.ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};