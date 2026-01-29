
import React, { useState, useEffect } from 'react';
import { Settings, X, Save, Trash2, Plus, User, Briefcase, Code, Share2, Palette, Layers, LogOut, Home, FileText, BarChart3, Heart, Navigation } from 'lucide-react';
import { useAdmin } from '../lib/adminContext';
import { MagicCard } from './MagicCard';
import { TechItem, HobbyItem } from '../types';

export const AdminPanel: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [editLang, setEditLang] = useState<'EN' | 'TR'>('EN');
  const { isLoggedIn, login, logout, primaryColor, setPrimaryColor, profile, updateProfile, techStack, setTechStack, projects, setProjects, experiences, setExperiences, socials, setSocials, heroContent, setHeroContent, aboutContent, setAboutContent, statsContent, setStatsContent, hobbies, setHobbies, navbarSettings, setNavbarSettings, siteSettings, setSiteSettings } = useAdmin();

  // Scroll Detection to show button only at bottom
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      
      // Show if within 100px of bottom
      if (windowHeight + scrollY >= documentHeight - 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setPassword('');
    } else {
      alert('Hatalı şifre!');
    }
  };

  // Convert Hex to RGB for Tailwind Var
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '6 182 212';
  };

  const rgbToHex = (rgb: string) => {
      const [r, g, b] = rgb.split(' ').map(Number);
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  if (!visible && !isOpen) return null;

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-[9999] p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-lg transition-all duration-500 hover:rotate-90 hover:bg-primary hover:text-black ${isOpen ? 'opacity-0 scale-0' : 'opacity-50 hover:opacity-100 scale-100'}`}
      >
        <Settings size={24} />
      </button>

      {/* Main Modal Overlay */}
      <div className={`fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Modal Content */}
        <div className={`w-full max-w-4xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100' : 'scale-95'}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Settings className="text-primary w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white font-display">Admin Panel</h2>
                        <p className="text-xs text-gray-500">Site Configuration & Content Management</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {/* Language Switch for Editing */}
                    {isLoggedIn && (
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                            <button
                                onClick={() => setEditLang('EN')}
                                className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                                    editLang === 'EN' 
                                    ? 'bg-primary text-black' 
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setEditLang('TR')}
                                className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                                    editLang === 'TR' 
                                    ? 'bg-primary text-black' 
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                TR
                            </button>
                        </div>
                    )}
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden flex">
                
                {/* Not Logged In State */}
                {!isLoggedIn ? (
                    <div className="w-full h-full flex items-center justify-center p-6">
                        <MagicCard className="w-full max-w-md p-8 bg-black border border-white/10 rounded-2xl flex flex-col gap-6">
                             <div className="text-center">
                                 <h3 className="text-2xl font-bold text-white mb-2">Login Required</h3>
                                 <p className="text-gray-400 text-sm">Please enter your admin password to continue.</p>
                             </div>
                             <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                 <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                 />
                                 <button type="submit" className="w-full py-3 bg-primary text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
                                     Login
                                 </button>
                             </form>
                        </MagicCard>
                    </div>
                ) : (
                    // Logged In State
                    <>
                        {/* Sidebar Navigation */}
                        <div className="w-64 border-r border-white/10 bg-black/40 p-4 flex flex-col gap-2 overflow-y-auto">
                            {[
                                { id: 'general', label: 'General & Colors', icon: Palette },
                                { id: 'hero', label: 'Hero Section', icon: Home },
                                { id: 'about', label: 'About & Stats', icon: FileText },
                                { id: 'hobbies', label: 'Hobbies', icon: Heart },
                                { id: 'tech', label: 'Tech Stack', icon: Layers },
                                { id: 'projects', label: 'Projects', icon: Code },
                                { id: 'experience', label: 'Experience', icon: Briefcase },
                                { id: 'socials', label: 'Contact & Socials', icon: Share2 },
                                { id: 'navbar', label: 'Navbar Settings', icon: Navigation },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                        activeTab === tab.id 
                                        ? 'bg-primary text-black shadow-lg shadow-primary/20' 
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                            <div className="mt-auto pt-4 border-t border-white/10">
                                <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 w-full">
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 overflow-y-auto p-8 bg-[#0a0a0a]">
                            
                            {/* GENERAL TAB */}
                            {activeTab === 'general' && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">Theme Settings</h3>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Primary Color</label>
                                            <div className="flex items-center gap-4">
                                                <input 
                                                    type="color" 
                                                    value={rgbToHex(primaryColor)}
                                                    onChange={(e) => setPrimaryColor(hexToRgb(e.target.value))}
                                                    className="w-16 h-12 bg-transparent cursor-pointer rounded overflow-hidden"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-white text-sm">Select the main accent color for the entire website.</p>
                                                    <p className="text-gray-500 text-xs mt-1">Current RGB: {primaryColor}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Default Theme</label>
                                            <select 
                                                value={siteSettings.defaultTheme}
                                                onChange={(e) => setSiteSettings({...siteSettings, defaultTheme: e.target.value as 'light' | 'dark' | 'system'})}
                                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                            >
                                                <option value="system">System</option>
                                                <option value="light">Light</option>
                                                <option value="dark">Dark</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">Site Metadata</h3>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Meta Title</label>
                                            <input 
                                                type="text" 
                                                value={siteSettings.metaTitle} 
                                                onChange={(e) => setSiteSettings({...siteSettings, metaTitle: e.target.value})}
                                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Meta Description</label>
                                            <textarea 
                                                rows={3}
                                                value={siteSettings.metaDescription} 
                                                onChange={(e) => setSiteSettings({...siteSettings, metaDescription: e.target.value})}
                                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* HERO TAB */}
                            {activeTab === 'hero' && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">Hero Section Content</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Greeting Text</label>
                                                <input 
                                                    type="text" 
                                                    value={heroContent.greeting} 
                                                    onChange={(e) => setHeroContent({...heroContent, greeting: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                    placeholder="Hey, I'm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Name</label>
                                                <input 
                                                    type="text" 
                                                    value={heroContent.name} 
                                                    onChange={(e) => setHeroContent({...heroContent, name: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Role/Title</label>
                                                <input 
                                                    type="text" 
                                                    value={heroContent.role} 
                                                    onChange={(e) => setHeroContent({...heroContent, role: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                    placeholder="Software Engineer & Designer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Bio</label>
                                                <textarea 
                                                    rows={3}
                                                    value={heroContent.bio} 
                                                    onChange={(e) => setHeroContent({...heroContent, bio: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Status</label>
                                                <input 
                                                    type="text" 
                                                    value={heroContent.status} 
                                                    onChange={(e) => setHeroContent({...heroContent, status: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                    placeholder="Available for new projects"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">CTA Button Text</label>
                                                    <input 
                                                        type="text" 
                                                        value={heroContent.ctaText} 
                                                        onChange={(e) => setHeroContent({...heroContent, ctaText: e.target.value})}
                                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Resume Link</label>
                                                    <input 
                                                        type="text" 
                                                        value={heroContent.resumeLink} 
                                                        onChange={(e) => setHeroContent({...heroContent, resumeLink: e.target.value})}
                                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                        placeholder="/resume.pdf"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Background Image URL (optional)</label>
                                                <input 
                                                    type="text" 
                                                    value={heroContent.backgroundImage || ''} 
                                                    onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value || undefined})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ABOUT TAB */}
                            {activeTab === 'about' && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">About Section Text</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Section Title</label>
                                                <input 
                                                    type="text" 
                                                    value={aboutContent.whoAmI} 
                                                    onChange={(e) => setAboutContent({...aboutContent, whoAmI: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Subtitle</label>
                                                <input 
                                                    type="text" 
                                                    value={aboutContent.subtitle} 
                                                    onChange={(e) => setAboutContent({...aboutContent, subtitle: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Paragraph 1 (Beyond Terminal)</label>
                                                <textarea 
                                                    rows={3}
                                                    value={aboutContent.paragraphs.beyondTerminal} 
                                                    onChange={(e) => setAboutContent({...aboutContent, paragraphs: {...aboutContent.paragraphs, beyondTerminal: e.target.value}})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Paragraph 2 (Exploring)</label>
                                                <textarea 
                                                    rows={3}
                                                    value={aboutContent.paragraphs.exploring} 
                                                    onChange={(e) => setAboutContent({...aboutContent, paragraphs: {...aboutContent.paragraphs, exploring: e.target.value}})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Quote</label>
                                                <textarea 
                                                    rows={2}
                                                    value={aboutContent.paragraphs.quote} 
                                                    onChange={(e) => setAboutContent({...aboutContent, paragraphs: {...aboutContent.paragraphs, quote: e.target.value}})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none italic"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Paragraph 3 (Beyond Code)</label>
                                                <textarea 
                                                    rows={3}
                                                    value={aboutContent.paragraphs.beyondCode} 
                                                    onChange={(e) => setAboutContent({...aboutContent, paragraphs: {...aboutContent.paragraphs, beyondCode: e.target.value}})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">Stats Section</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Years Count</label>
                                                <input 
                                                    type="number" 
                                                    value={statsContent.yearsCount} 
                                                    onChange={(e) => setStatsContent({...statsContent, yearsCount: parseInt(e.target.value)})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Years Label</label>
                                                <input 
                                                    type="text" 
                                                    value={statsContent.yearsLabel} 
                                                    onChange={(e) => setStatsContent({...statsContent, yearsLabel: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Clients Count</label>
                                                <input 
                                                    type="number" 
                                                    value={statsContent.clientsCount} 
                                                    onChange={(e) => setStatsContent({...statsContent, clientsCount: parseInt(e.target.value)})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Clients Label</label>
                                                <input 
                                                    type="text" 
                                                    value={statsContent.clientsLabel} 
                                                    onChange={(e) => setStatsContent({...statsContent, clientsLabel: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Quality Label</label>
                                                <input 
                                                    type="text" 
                                                    value={statsContent.qualityLabel} 
                                                    onChange={(e) => setStatsContent({...statsContent, qualityLabel: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Quality Description</label>
                                                <input 
                                                    type="text" 
                                                    value={statsContent.qualityDescription} 
                                                    onChange={(e) => setStatsContent({...statsContent, qualityDescription: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Performance Label</label>
                                                <input 
                                                    type="text" 
                                                    value={statsContent.performanceLabel} 
                                                    onChange={(e) => setStatsContent({...statsContent, performanceLabel: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Performance Description</label>
                                                <input 
                                                    type="text" 
                                                    value={statsContent.performanceDescription} 
                                                    onChange={(e) => setStatsContent({...statsContent, performanceDescription: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Design Label</label>
                                                <input 
                                                    type="text" 
                                                    value={statsContent.designLabel} 
                                                    onChange={(e) => setStatsContent({...statsContent, designLabel: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Design Description</label>
                                                <input 
                                                    type="text" 
                                                    value={statsContent.designDescription} 
                                                    onChange={(e) => setStatsContent({...statsContent, designDescription: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* HOBBIES TAB */}
                            {activeTab === 'hobbies' && (
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white">Manage Hobbies</h3>
                                        <button 
                                            onClick={() => setHobbies([...hobbies, { _id: Date.now().toString(), icon: 'Heart', label: 'New Hobby' }])}
                                            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold flex items-center gap-2"
                                        >
                                            <Plus size={16} /> Add Hobby
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {hobbies.map((hobby, idx) => (
                                            <div key={hobby._id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <input 
                                                        value={hobby.label}
                                                        onChange={(e) => {
                                                            const newHobbies = [...hobbies];
                                                            newHobbies[idx].label = e.target.value;
                                                            setHobbies(newHobbies);
                                                        }}
                                                        className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-sm text-white"
                                                        placeholder="Hobby Name"
                                                    />
                                                    <select 
                                                        value={hobby.icon}
                                                        onChange={(e) => {
                                                            const newHobbies = [...hobbies];
                                                            newHobbies[idx].icon = e.target.value;
                                                            setHobbies(newHobbies);
                                                        }}
                                                        className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-gray-300"
                                                    >
                                                        <option value="Gamepad2">Gamepad (Gaming)</option>
                                                        <option value="Tennis">Tennis</option>
                                                        <option value="BookOpen">Book (Reading)</option>
                                                        <option value="Coffee">Coffee</option>
                                                        <option value="Bike">Bike (Motorcycling)</option>
                                                        <option value="Rocket">Rocket (Space)</option>
                                                        <option value="Music">Music</option>
                                                        <option value="Code2">Code (Open Source)</option>
                                                        <option value="Camera">Camera</option>
                                                        <option value="Palette">Art/Design</option>
                                                        <option value="Dumbbell">Fitness</option>
                                                        <option value="Plane">Travel</option>
                                                        <option value="Heart">Heart</option>
                                                    </select>
                                                </div>
                                                <button 
                                                    onClick={() => setHobbies(hobbies.filter((_, i) => i !== idx))}
                                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* NAVBAR TAB */}
                            {activeTab === 'navbar' && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4">Navbar Settings</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Logo Text</label>
                                                <input 
                                                    type="text" 
                                                    value={navbarSettings.logoText} 
                                                    onChange={(e) => setNavbarSettings({...navbarSettings, logoText: e.target.value})}
                                                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="checkbox" 
                                                    id="showLogo"
                                                    checked={navbarSettings.showLogo} 
                                                    onChange={(e) => setNavbarSettings({...navbarSettings, showLogo: e.target.checked})}
                                                    className="w-5 h-5"
                                                />
                                                <label htmlFor="showLogo" className="text-sm text-white">Show Logo</label>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">CTA Button Text</label>
                                                    <input 
                                                        type="text" 
                                                        value={navbarSettings.ctaText} 
                                                        onChange={(e) => setNavbarSettings({...navbarSettings, ctaText: e.target.value})}
                                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">CTA Link</label>
                                                    <input 
                                                        type="text" 
                                                        value={navbarSettings.ctaLink} 
                                                        onChange={(e) => setNavbarSettings({...navbarSettings, ctaLink: e.target.value})}
                                                        className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                                                        placeholder="#connect"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TECH STACK TAB */}
                            {activeTab === 'tech' && (
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white">Manage Marquee Logos</h3>
                                        <button 
                                            onClick={() => setTechStack([...techStack, { _id: Date.now().toString(), title: 'New Tech', tech: 'Tool', iconName: 'Box', color: 'text-white' }])}
                                            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold flex items-center gap-2"
                                        >
                                            <Plus size={16} /> Add Logo
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {techStack.map((item, idx) => (
                                            <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <input 
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const newStack = [...techStack];
                                                            newStack[idx].title = e.target.value;
                                                            setTechStack(newStack);
                                                        }}
                                                        className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-sm text-white"
                                                        placeholder="Name"
                                                    />
                                                    <select 
                                                        value={item.iconName}
                                                        onChange={(e) => {
                                                            const newStack = [...techStack];
                                                            newStack[idx].iconName = e.target.value;
                                                            setTechStack(newStack);
                                                        }}
                                                        className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-gray-300"
                                                    >
                                                        <option value="ReactLogo">React</option>
                                                        <option value="NextLogo">Next.js</option>
                                                        <option value="TSLogo">TypeScript</option>
                                                        <option value="TailwindLogo">Tailwind</option>
                                                        <option value="FramerLogo">Framer</option>
                                                        <option value="ShadcnLogo">Shadcn</option>
                                                    </select>
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        const newStack = techStack.filter((_, i) => i !== idx);
                                                        setTechStack(newStack);
                                                    }}
                                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* PROJECTS TAB */}
                            {activeTab === 'projects' && (
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white">Projects</h3>
                                        <button 
                                            onClick={() => setProjects([{
                                                _id: Date.now().toString(),
                                                title: 'New Project',
                                                description: 'Description...',
                                                category: 'Web',
                                                size: 'small',
                                                mainImage: '',
                                                link: '#'
                                            }, ...projects])}
                                            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold flex items-center gap-2"
                                        >
                                            <Plus size={16} /> Add Project
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {projects.map((proj, idx) => (
                                            <div key={proj._id} className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-4 flex-1 mr-8">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <input 
                                                                value={proj.title}
                                                                onChange={(e) => {
                                                                    const newProjs = [...projects];
                                                                    newProjs[idx].title = e.target.value;
                                                                    setProjects(newProjs);
                                                                }}
                                                                className="bg-black/50 border border-white/10 rounded px-3 py-2 text-white font-bold"
                                                                placeholder="Project Title"
                                                            />
                                                            <input 
                                                                value={proj.category}
                                                                onChange={(e) => {
                                                                    const newProjs = [...projects];
                                                                    newProjs[idx].category = e.target.value;
                                                                    setProjects(newProjs);
                                                                }}
                                                                className="bg-black/50 border border-white/10 rounded px-3 py-2 text-gray-300 text-sm"
                                                                placeholder="Category"
                                                            />
                                                        </div>
                                                        <textarea 
                                                            value={proj.description}
                                                            onChange={(e) => {
                                                                const newProjs = [...projects];
                                                                newProjs[idx].description = e.target.value;
                                                                setProjects(newProjs);
                                                            }}
                                                            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-gray-300"
                                                            rows={2}
                                                            placeholder="Description"
                                                        />
                                                        <input 
                                                            value={typeof proj.mainImage === 'string' ? proj.mainImage : ''}
                                                            onChange={(e) => {
                                                                const newProjs = [...projects];
                                                                newProjs[idx].mainImage = e.target.value;
                                                                setProjects(newProjs);
                                                            }}
                                                            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-gray-500 font-mono"
                                                            placeholder="Image URL"
                                                        />
                                                    </div>
                                                    <button 
                                                        onClick={() => {
                                                            const newProjs = projects.filter((_, i) => i !== idx);
                                                            setProjects(newProjs);
                                                        }}
                                                        className="p-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* EXPERIENCE TAB */}
                            {activeTab === 'experience' && (
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white">Timeline Items</h3>
                                        <button 
                                            onClick={() => setExperiences([{
                                                _id: Date.now().toString(),
                                                role: 'New Role',
                                                company: 'Company',
                                                startDate: new Date().toISOString().split('T')[0],
                                                isCurrent: true,
                                                description: 'Description...',
                                                skills: [],
                                                type: 'work'
                                            }, ...experiences])}
                                            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold flex items-center gap-2"
                                        >
                                            <Plus size={16} /> Add Item
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {experiences.map((exp, idx) => (
                                            <div key={exp._id} className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4 relative group">
                                                <button 
                                                    onClick={() => {
                                                        const newExp = experiences.filter((_, i) => i !== idx);
                                                        setExperiences(newExp);
                                                    }}
                                                    className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                                <div className="space-y-4">
                                                    {/* Role and Company */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Role / Position</label>
                                                            <input 
                                                                value={exp.role}
                                                                onChange={(e) => {
                                                                    const newExp = [...experiences];
                                                                    newExp[idx].role = e.target.value;
                                                                    setExperiences(newExp);
                                                                }}
                                                                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
                                                                placeholder="Software Engineer"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Company / Institution</label>
                                                            <input 
                                                                value={exp.company}
                                                                onChange={(e) => {
                                                                    const newExp = [...experiences];
                                                                    newExp[idx].company = e.target.value;
                                                                    setExperiences(newExp);
                                                                }}
                                                                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
                                                                placeholder="Tech Company"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Type and Dates */}
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Type</label>
                                                            <select 
                                                                value={exp.type || 'work'}
                                                                onChange={(e) => {
                                                                    const newExp = [...experiences];
                                                                    newExp[idx].type = e.target.value as any;
                                                                    setExperiences(newExp);
                                                                }}
                                                                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-gray-300"
                                                            >
                                                                <option value="work">Work</option>
                                                                <option value="education">Education</option>
                                                                <option value="certification">Certification</option>
                                                                <option value="project">Project</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Start Date</label>
                                                            <input 
                                                                type="date"
                                                                value={exp.startDate}
                                                                onChange={(e) => {
                                                                    const newExp = [...experiences];
                                                                    newExp[idx].startDate = e.target.value;
                                                                    setExperiences(newExp);
                                                                }}
                                                                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-gray-300"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">End Date</label>
                                                            <input 
                                                                type="date"
                                                                value={exp.endDate || ''}
                                                                onChange={(e) => {
                                                                    const newExp = [...experiences];
                                                                    newExp[idx].endDate = e.target.value || undefined;
                                                                    setExperiences(newExp);
                                                                }}
                                                                disabled={exp.isCurrent}
                                                                className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Current Job Checkbox */}
                                                    <div className="flex items-center gap-3">
                                                        <input 
                                                            type="checkbox"
                                                            id={`current-${exp._id}`}
                                                            checked={exp.isCurrent}
                                                            onChange={(e) => {
                                                                const newExp = [...experiences];
                                                                newExp[idx].isCurrent = e.target.checked;
                                                                if (e.target.checked) {
                                                                    newExp[idx].endDate = undefined;
                                                                }
                                                                setExperiences(newExp);
                                                            }}
                                                            className="w-4 h-4 accent-primary"
                                                        />
                                                        <label htmlFor={`current-${exp._id}`} className="text-sm text-gray-300 cursor-pointer">
                                                            Currently working here / Present
                                                        </label>
                                                    </div>

                                                    {/* Description */}
                                                    <div>
                                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Description</label>
                                                        <textarea 
                                                            value={exp.description}
                                                            onChange={(e) => {
                                                                const newExp = [...experiences];
                                                                newExp[idx].description = e.target.value;
                                                                setExperiences(newExp);
                                                            }}
                                                            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-gray-300"
                                                            rows={3}
                                                            placeholder="Brief description of your role and responsibilities..."
                                                        />
                                                    </div>

                                                    {/* Skills/Tags */}
                                                    <div>
                                                        <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Skills / Technologies (comma separated)</label>
                                                        <input 
                                                            value={(exp.skills || []).join(', ')}
                                                            onChange={(e) => {
                                                                const newExp = [...experiences];
                                                                newExp[idx].skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                                                                setExperiences(newExp);
                                                            }}
                                                            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-gray-300"
                                                            placeholder="React, TypeScript, Node.js, PostgreSQL"
                                                        />
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {(exp.skills || []).map((skill, skillIdx) => (
                                                                <span 
                                                                    key={skillIdx}
                                                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                             {/* SOCIALS TAB */}
                             {activeTab === 'socials' && (
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white">Social Media Links</h3>
                                        <button 
                                            onClick={() => setSocials([...socials, { _id: Date.now().toString(), platform: 'New Platform', url: '#', username: '', iconName: 'Link' }])}
                                            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold flex items-center gap-2"
                                        >
                                            <Plus size={16} /> Add Social
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {socials.map((social, idx) => (
                                            <div key={social._id} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 relative group">
                                                 <button 
                                                    onClick={() => {
                                                        const newSoc = socials.filter((_, i) => i !== idx);
                                                        setSocials(newSoc);
                                                    }}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                
                                                <input 
                                                    value={social.platform}
                                                    onChange={(e) => {
                                                        const newSoc = [...socials];
                                                        newSoc[idx].platform = e.target.value;
                                                        setSocials(newSoc);
                                                    }}
                                                    className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-white font-bold"
                                                    placeholder="Platform (GitHub, LinkedIn...)"
                                                />
                                                <select 
                                                    value={social.iconName}
                                                    onChange={(e) => {
                                                        const newSoc = [...socials];
                                                        newSoc[idx].iconName = e.target.value;
                                                        setSocials(newSoc);
                                                    }}
                                                    className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-sm text-gray-300"
                                                >
                                                    <option value="Github">GitHub</option>
                                                    <option value="Linkedin">LinkedIn</option>
                                                    <option value="Twitter">Twitter/X</option>
                                                    <option value="Facebook">Facebook</option>
                                                    <option value="Instagram">Instagram</option>
                                                    <option value="Youtube">YouTube</option>
                                                    <option value="Mail">Email</option>
                                                    <option value="Globe">Website</option>
                                                    <option value="Link">Link</option>
                                                    <option value="MessageCircle">Discord</option>
                                                    <option value="Send">Telegram</option>
                                                    <option value="Code">Stack Overflow</option>
                                                    <option value="Coffee">Buy Me Coffee</option>
                                                    <option value="DollarSign">Patreon</option>
                                                </select>
                                                <input 
                                                    value={social.username}
                                                    onChange={(e) => {
                                                        const newSoc = [...socials];
                                                        newSoc[idx].username = e.target.value;
                                                        setSocials(newSoc);
                                                    }}
                                                    className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-sm text-gray-400"
                                                    placeholder="Username"
                                                />
                                                <input 
                                                    value={social.url}
                                                    onChange={(e) => {
                                                        const newSoc = [...socials];
                                                        newSoc[idx].url = e.target.value;
                                                        setSocials(newSoc);
                                                    }}
                                                    className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-blue-400 font-mono"
                                                    placeholder="URL"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </>
                )}
            </div>
        </div>
      </div>
    </>
  );
};
