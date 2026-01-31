
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Project, ExperienceItem, Social, Profile, TechItem,
  HeroContent, AboutContent, StatsContent, StatItem, HobbyItem, NavbarSettings, SiteSettings,
  ContactMessage, SectionContent, FooterSettings, NavLinkItem
} from '../types';
import { loadAllData, saveAllData } from './firestore.service';
import { signInWithGoogle, logOut, onAuthChange } from './firebase';
import { User } from 'firebase/auth';

// Default Data Constants (Moved from App.tsx)
const DEFAULT_EXPERIENCES: ExperienceItem[] = [
    {
        _id: 'li-oyku',
        role: 'AI Developer',
        company: 'Öykü Lojistik',
        startDate: '2025-07',
        endDate: '2025-11',
        isCurrent: false,
        description: 'AI Development Expert focusing on Microsoft SQL Server and SQL integrations.',
        skills: ['AI', 'SQL'],
        type: 'work'
    },
    {
        _id: 'li-outlier',
        role: 'Freelance AI Data Contributor',
        company: 'Outlier AI',
        startDate: '2024-09',
        endDate: '2025-10',
        isCurrent: false,
        description: 'NLP, data validation, and annotation tasks.',
        skills: ['NLP', 'Python'],
        type: 'work'
    }
];

const DEFAULT_PROJECTS: Project[] = [
    {
        _id: 'p1',
        title: 'Autonomous AI Agent',
        category: 'AI / Logistics',
        description: 'An autonomous agent utilizing LLMs to optimize logistics routing.',
        size: 'large',
        mainImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
        link: '#',
    },
    {
        _id: 'p2',
        title: 'Portfolio V2',
        category: 'Web',
        description: 'Modern portfolio built with React, Tailwind, and Sanity CMS.',
        size: 'small',
        mainImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop',
        link: '#',
    }
];

const DEFAULT_TECH_STACK: TechItem[] = [
    { _id: '1', title: 'Next.js', tech: 'Framework', iconName: 'NextLogo', color: 'text-black dark:text-white' },
    { _id: '2', title: 'React', tech: 'Library', iconName: 'ReactLogo', color: 'text-cyan-400' },
    { _id: '3', title: 'TypeScript', tech: 'Language', iconName: 'TypeScriptLogo', color: 'text-blue-600' },
    { _id: '4', title: 'Tailwind CSS', tech: 'Styling', iconName: 'TailwindLogo', color: 'text-cyan-500' },
    { _id: '5', title: 'Framer Motion', tech: 'Animation', iconName: 'FramerLogo', color: 'text-pink-500' },
    { _id: '6', title: 'Vite', tech: 'Build Tool', iconName: 'ViteLogo', color: 'text-purple-500' },
    { _id: '7', title: 'Sanity CMS', tech: 'Headless CMS', iconName: 'SanityCMSLogo', color: 'text-red-500' },
    { _id: '8', title: 'Python', tech: 'Language', iconName: 'PythonLogo', color: 'text-yellow-500' },
    { _id: '9', title: 'Node.js', tech: 'Runtime', iconName: 'NodeJSLogo', color: 'text-green-600' },
];

const DEFAULT_SOCIALS: Social[] = [
  { _id: '1', platform: 'GitHub', url: 'https://github.com/atakanclskn', username: 'atakanclskn', iconName: 'Github' },
  { _id: '2', platform: 'LinkedIn', url: 'https://linkedin.com/in/atakanclskn', username: 'Atakan Çalışkan', iconName: 'Linkedin' },
];

const DEFAULT_PROFILE: Profile = {
    _id: '1',
    name: 'Atakan Çalışkan',
    titles: ['Software Engineer'],
    bio: 'Software Engineer and Designer specializing in building exceptional digital experiences.',
    status: 'Available for new projects',
    heroImage: 'https://github.com/atakanclskn.png' as any,
    avatarUrl: 'https://github.com/atakanclskn.png'
};

const DEFAULT_HERO: HeroContent = {
  greeting: "Hey, I'm",
  name: 'Atakan Çalışkan',
  role: 'Software Engineer & Designer',
  bio: 'I build exceptional digital experiences with modern technologies.',
  status: 'Available for new projects',
  ctaText: 'View My Work',
  resumeLink: '/resume.pdf',
  backgroundImage: undefined
};

const DEFAULT_ABOUT: AboutContent = {
  whoAmI: { EN: 'Who Am I?', TR: 'Ben Kimim?' },
  subtitle: { EN: 'More Than Just Code', TR: 'Sadece Koddan Fazlası' },
  paragraphs: [
    {
      _id: 'p1',
      type: 'text',
      content: {
        EN: "Beyond the terminal, I'm someone who finds elegance in simplicity and power in thoughtful design. Every line of code I write serves a purpose—whether it's crafting seamless user experiences or architecting scalable systems.",
        TR: "Terminalin ötesinde, sadelikte zarafet ve düşünceli tasarımda güç bulan biriyim. Yazdığım her kod satırı bir amaca hizmet ediyor—ister kusursuz kullanıcı deneyimleri yaratmak, ister ölçeklenebilir sistemler tasarlamak olsun."
      }
    },
    {
      _id: 'p2',
      type: 'text',
      content: {
        EN: "When I'm not deep in a codebase, you'll find me exploring new frameworks, contributing to open source, or experimenting with the latest tech trends. I believe in continuous learning and sharing knowledge with the community.",
        TR: "Kod yazmadığım zamanlarda, yeni framework'ler keşfediyor, açık kaynak projelere katkıda bulunuyor veya en son teknoloji trendleriyle deney yapıyorum. Sürekli öğrenmeye ve bilgiyi toplulukla paylaşmaya inanıyorum."
      }
    },
    {
      _id: 'p3',
      type: 'quote',
      content: {
        EN: "The best code is the code that doesn't need to be written—but when it does, it should be beautiful.",
        TR: "En iyi kod, yazılmasına gerek olmayan koddur—ama yazılması gerektiğinde güzel olmalıdır."
      }
    },
    {
      _id: 'p4',
      type: 'text',
      content: {
        EN: "Beyond code, I'm driven by curiosity and creativity. Whether it's designing pixel-perfect interfaces, optimizing performance, or solving complex problems—I approach every challenge with passion and precision.",
        TR: "Kodun ötesinde, merak ve yaratıcılık beni yönlendiriyor. İster piksel mükemmel arayüzler tasarlamak, ister performans optimize etmek, ister karmaşık problemler çözmek olsun—her zorluğa tutku ve hassasiyetle yaklaşıyorum."
      }
    }
  ]
};

const DEFAULT_STATS: StatsContent = {
  stats: [
    { 
      _id: 's1', 
      type: 'number', 
      count: 5, 
      label: { EN: 'Years Coding', TR: 'Yıl Deneyim' }
    },
    { 
      _id: 's2', 
      type: 'number', 
      count: 10, 
      label: { EN: 'Happy Clients', TR: 'Mutlu Müşteri' }
    },
    { 
      _id: 's3', 
      type: 'text', 
      title: { EN: 'Clean', TR: 'Temiz' },
      description: { EN: 'Code Quality', TR: 'Kod Kalitesi' }
    },
    { 
      _id: 's4', 
      type: 'text', 
      title: { EN: 'Fast', TR: 'Hızlı' },
      description: { EN: 'Performance', TR: 'Performans' }
    },
    { 
      _id: 's5', 
      type: 'text', 
      title: { EN: 'User', TR: 'Kullanıcı' },
      description: { EN: 'First Design', TR: 'Odaklı Tasarım' }
    }
  ]
};

const DEFAULT_HOBBIES: HobbyItem[] = [
  { _id: 'h1', icon: 'Gamepad2', label: 'Gaming' },
  { _id: 'h2', icon: 'Tennis', label: 'Tennis' },
  { _id: 'h3', icon: 'BookOpen', label: 'Tech Blogs' },
  { _id: 'h4', icon: 'Coffee', label: 'Coffee Enthusiast' },
  { _id: 'h5', icon: 'Bike', label: 'Motorcycling' },
  { _id: 'h6', icon: 'Rocket', label: 'Space Tech' },
  { _id: 'h7', icon: 'Music', label: 'Lo-fi Beats' },
  { _id: 'h8', icon: 'Code2', label: 'Open Source' },
];

const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { _id: 'nav1', label: { EN: 'About', TR: 'Hakkımda' }, href: '#about', isVisible: true },
  { _id: 'nav2', label: { EN: 'Projects', TR: 'Projeler' }, href: '#projects', isVisible: true },
  { _id: 'nav3', label: { EN: 'Experience', TR: 'Deneyim' }, href: '#experience', isVisible: true },
];

const DEFAULT_NAVBAR: NavbarSettings = {
  logoText: 'AC',
  showLogo: true,
  ctaText: { EN: 'Get in Touch', TR: 'İletişime Geç' },
  ctaLink: '#contact',
  navLinks: DEFAULT_NAV_LINKS
};

const DEFAULT_SETTINGS: SiteSettings = {
  favicon: undefined,
  metaTitle: { EN: 'Atakan Çalışkan - Software Engineer & Designer', TR: 'Atakan Çalışkan - Yazılım Mühendisi & Tasarımcı' },
  metaDescription: { EN: 'Portfolio of Atakan Çalışkan - Software Engineer and Designer specializing in building exceptional digital experiences.', TR: 'Atakan Çalışkan - Olağanüstü dijital deneyimler oluşturmada uzmanlaşmış Yazılım Mühendisi ve Tasarımcı portföyü.' },
  metaKeywords: { EN: 'software engineer, developer, designer, portfolio, react, typescript', TR: 'yazılım mühendisi, geliştirici, tasarımcı, portfolyo, react, typescript' },
  ogImage: undefined,
  defaultTheme: 'system',
  googleAnalyticsId: undefined
};

const DEFAULT_SECTION_CONTENT: SectionContent = {
  projects: {
    title: { EN: 'Checkout my latest work', TR: 'Son çalışmalarıma göz atın' },
    description: { EN: "A selection of projects I've worked on, ranging from web applications to open source tools.", TR: "Web uygulamalarından açık kaynak araçlara kadar üzerinde çalıştığım projelerden bir seçki." }
  },
  contact: {
    title: { EN: "Let's work together.", TR: "Birlikte çalışalım." },
    description: { EN: 'Have a project in mind or just want to say hi? Fill out the form below or send me an email.', TR: 'Aklınızda bir proje mi var ya da sadece merhaba mı demek istiyorsunuz? Formu doldurun veya bana e-posta gönderin.' },
    emailLabel: 'contact@atakan.dev',
    successMessage: { EN: 'Your message has been sent! I will get back to you soon.', TR: 'Mesajınız gönderildi! En kısa sürede size geri dönüş yapacağım.' },
    findMeText: { EN: 'Find me on', TR: 'Beni şurada bul' }
  },
  experience: {
    title: { EN: 'Timeline', TR: 'Zaman Çizelgesi' },
    description: { EN: 'My professional journey, educational background, and key project milestones.', TR: 'Profesyonel yolculuğum, eğitim geçmişim ve önemli proje kilometre taşlarım.' }
  }
};

const DEFAULT_FOOTER: FooterSettings = {
  copyrightText: { EN: '© {year} Atakan Çalışkan. All rights reserved.', TR: '© {year} Atakan Çalışkan. Tüm hakları saklıdır.' },
  showDesignCredit: true,
  designCreditText: { EN: 'Designed & Built with ❤️', TR: '❤️ ile Tasarlandı & Geliştirildi' },
  showSocialLinks: false,
  additionalLinks: []
};

interface AdminContextType {
  isLoggedIn: boolean;
  currentUser: User | null;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthLoading: boolean;
  
  // Data State
  primaryColor: string; // RGB string like "6 182 212"
  setPrimaryColor: (color: string) => void;
  
  profile: Profile;
  updateProfile: (p: Profile) => void;
  
  projects: Project[];
  setProjects: (p: Project[]) => void;
  
  experiences: ExperienceItem[];
  setExperiences: (e: ExperienceItem[]) => void;
  
  techStack: TechItem[];
  setTechStack: (t: TechItem[]) => void;
  
  socials: Social[];
  setSocials: (s: Social[]) => void;

  // New Content Management
  heroContent: HeroContent;
  setHeroContent: (h: HeroContent) => void;

  aboutContent: AboutContent;
  setAboutContent: (a: AboutContent) => void;

  statsContent: StatsContent;
  setStatsContent: (s: StatsContent) => void;

  hobbies: HobbyItem[];
  setHobbies: (h: HobbyItem[]) => void;

  navbarSettings: NavbarSettings;
  setNavbarSettings: (n: NavbarSettings) => void;

  siteSettings: SiteSettings;
  setSiteSettings: (s: SiteSettings) => void;

  // Section Content
  sectionContent: SectionContent;
  setSectionContent: (s: SectionContent) => void;

  // Footer Settings
  footerSettings: FooterSettings;
  setFooterSettings: (f: FooterSettings) => void;

  // Messages System
  messages: ContactMessage[];
  addMessage: (name: string, email: string, message: string) => void;
  markAsRead: (id: string) => void;
  toggleStar: (id: string) => void;
  archiveMessage: (id: string) => void;
  deleteMessage: (id: string) => void;
  unreadCount: number;

  // Firebase Operations
  saveToFirebase: () => Promise<boolean>;
  loadFromFirebase: () => Promise<boolean>;
  isSaving: boolean;
  isLoading: boolean;
  lastSyncTime: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  // Initialize state from LocalStorage or defaults
  const [primaryColor, setPrimaryColorState] = useState<string>('6 182 212');
  const [profile, setProfileState] = useState<Profile>(DEFAULT_PROFILE);
  const [projects, setProjectsState] = useState<Project[]>(DEFAULT_PROJECTS);
  const [experiences, setExperiencesState] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCES);
  const [techStack, setTechStackState] = useState<TechItem[]>(DEFAULT_TECH_STACK);
  const [socials, setSocialsState] = useState<Social[]>(DEFAULT_SOCIALS);
  const [heroContent, setHeroContentState] = useState<HeroContent>(DEFAULT_HERO);
  const [aboutContent, setAboutContentState] = useState<AboutContent>(DEFAULT_ABOUT);
  const [statsContent, setStatsContentState] = useState<StatsContent>(DEFAULT_STATS);
  const [hobbies, setHobbiesState] = useState<HobbyItem[]>(DEFAULT_HOBBIES);
  const [navbarSettings, setNavbarSettingsState] = useState<NavbarSettings>(DEFAULT_NAVBAR);
  const [siteSettings, setSiteSettingsState] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [sectionContent, setSectionContentState] = useState<SectionContent>(DEFAULT_SECTION_CONTENT);
  const [footerSettings, setFooterSettingsState] = useState<FooterSettings>(DEFAULT_FOOTER);
  const [messages, setMessagesState] = useState<ContactMessage[]>([]);

  // Firebase state
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load from Firebase on mount (PUBLIC DATA)
  useEffect(() => {
    const loadFromFirebaseOnMount = async () => {
      try {
        console.log("🔥 Loading data from Firebase...");
        const data = await loadAllData();
        
        if (data) {
          if (data.profile) {
            const p = data.profile as any;
            setProfileState(p);
            if (p.heroContent) setHeroContentState(p.heroContent);
            if (p.aboutContent) setAboutContentState(p.aboutContent);
            if (p.statsContent) setStatsContentState(p.statsContent);
            if (p.hobbies) setHobbiesState(p.hobbies);
            if (p.navbarSettings) setNavbarSettingsState(p.navbarSettings);
            if (p.siteSettings) setSiteSettingsState(p.siteSettings);
            if (p.primaryColor) {
              setPrimaryColorState(p.primaryColor);
              document.documentElement.style.setProperty('--primary', p.primaryColor);
            }
          }
          if (data.projects && data.projects.length > 0) setProjectsState(data.projects);
          if (data.experiences && data.experiences.length > 0) setExperiencesState(data.experiences);
          if (data.techStack && data.techStack.length > 0) setTechStackState(data.techStack);
          if (data.socials && data.socials.length > 0) setSocialsState(data.socials);
          if (data.sectionContent) setSectionContentState(data.sectionContent);
          if (data.footerSettings) setFooterSettingsState(data.footerSettings);
          
          console.log("✅ Data loaded from Firebase!");
        }
      } catch (error) {
        console.error("❌ Error loading from Firebase, using defaults:", error);
      }
    };

    loadFromFirebaseOnMount();
  }, []);

  // Load from LocalStorage on mount (fallback/override for admin)
  useEffect(() => {
    const savedColor = localStorage.getItem('site_primaryColor');
    if (savedColor) setPrimaryColorState(savedColor);

    const savedProfile = localStorage.getItem('site_profile');
    if (savedProfile) setProfileState(JSON.parse(savedProfile));

    const savedProjects = localStorage.getItem('site_projects');
    if (savedProjects) setProjectsState(JSON.parse(savedProjects));
    
    const savedExp = localStorage.getItem('site_experiences');
    if (savedExp) setExperiencesState(JSON.parse(savedExp));

    const savedTech = localStorage.getItem('site_techStack');
    if (savedTech) setTechStackState(JSON.parse(savedTech));

    const savedSocials = localStorage.getItem('site_socials');
    if (savedSocials) setSocialsState(JSON.parse(savedSocials));

    const savedHero = localStorage.getItem('site_heroContent');
    if (savedHero) setHeroContentState(JSON.parse(savedHero));

    const savedAbout = localStorage.getItem('site_aboutContent');
    if (savedAbout) setAboutContentState(JSON.parse(savedAbout));

    const savedStats = localStorage.getItem('site_statsContent');
    if (savedStats) setStatsContentState(JSON.parse(savedStats));

    const savedHobbies = localStorage.getItem('site_hobbies');
    if (savedHobbies) setHobbiesState(JSON.parse(savedHobbies));

    const savedNavbar = localStorage.getItem('site_navbarSettings');
    if (savedNavbar) setNavbarSettingsState(JSON.parse(savedNavbar));

    const savedSettings = localStorage.getItem('site_siteSettings');
    if (savedSettings) setSiteSettingsState(JSON.parse(savedSettings));

    const savedSectionContent = localStorage.getItem('site_sectionContent');
    if (savedSectionContent) setSectionContentState(JSON.parse(savedSectionContent));

    const savedFooter = localStorage.getItem('site_footerSettings');
    if (savedFooter) setFooterSettingsState(JSON.parse(savedFooter));

    const savedMessages = localStorage.getItem('site_messages');
    if (savedMessages) setMessagesState(JSON.parse(savedMessages));
  }, []);

  // Update CSS Variable whenever primaryColor changes
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', primaryColor);
    localStorage.setItem('site_primaryColor', primaryColor);
  }, [primaryColor]);

  // Wrappers to save to LocalStorage
  const updateProfile = (p: Profile) => {
    setProfileState(p);
    localStorage.setItem('site_profile', JSON.stringify(p));
  };

  const setProjects = (p: Project[]) => {
    setProjectsState(p);
    localStorage.setItem('site_projects', JSON.stringify(p));
  };

  const setExperiences = (e: ExperienceItem[]) => {
    setExperiencesState(e);
    localStorage.setItem('site_experiences', JSON.stringify(e));
  };

  const setTechStack = (t: TechItem[]) => {
    setTechStackState(t);
    localStorage.setItem('site_techStack', JSON.stringify(t));
  };

  const setSocials = (s: Social[]) => {
    setSocialsState(s);
    localStorage.setItem('site_socials', JSON.stringify(s));
  };

  const setHeroContent = (h: HeroContent) => {
    setHeroContentState(h);
    localStorage.setItem('site_heroContent', JSON.stringify(h));
  };

  const setAboutContent = (a: AboutContent) => {
    setAboutContentState(a);
    localStorage.setItem('site_aboutContent', JSON.stringify(a));
  };

  const setStatsContent = (s: StatsContent) => {
    setStatsContentState(s);
    localStorage.setItem('site_statsContent', JSON.stringify(s));
  };

  const setHobbies = (h: HobbyItem[]) => {
    setHobbiesState(h);
    localStorage.setItem('site_hobbies', JSON.stringify(h));
  };

  const setNavbarSettings = (n: NavbarSettings) => {
    setNavbarSettingsState(n);
    localStorage.setItem('site_navbarSettings', JSON.stringify(n));
  };

  const setSiteSettings = (s: SiteSettings) => {
    setSiteSettingsState(s);
    localStorage.setItem('site_siteSettings', JSON.stringify(s));
  };

  const setSectionContent = (s: SectionContent) => {
    setSectionContentState(s);
    localStorage.setItem('site_sectionContent', JSON.stringify(s));
  };

  const setFooterSettings = (f: FooterSettings) => {
    setFooterSettingsState(f);
    localStorage.setItem('site_footerSettings', JSON.stringify(f));
  };

  // Messages Functions
  const setMessages = (m: ContactMessage[]) => {
    setMessagesState(m);
    localStorage.setItem('site_messages', JSON.stringify(m));
  };

  const addMessage = (name: string, email: string, message: string) => {
    const newMessage: ContactMessage = {
      _id: `msg_${Date.now()}`,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
      isRead: false,
      isStarred: false,
      isArchived: false,
      replies: []
    };
    setMessages([newMessage, ...messages]);
  };

  const markAsRead = (id: string) => {
    setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
  };

  const toggleStar = (id: string) => {
    setMessages(messages.map(m => m._id === id ? { ...m, isStarred: !m.isStarred } : m));
  };

  const archiveMessage = (id: string) => {
    setMessages(messages.map(m => m._id === id ? { ...m, isArchived: !m.isArchived } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m._id !== id));
  };

  const unreadCount = messages.filter(m => !m.isRead && !m.isArchived).length;

  // Firebase Operations
  const saveToFirebase = async (): Promise<boolean> => {
    setIsSaving(true);
    try {
      // Profile'ı Experience formatına dönüştür (Firestore için)
      const profileForFirebase = {
        ...profile,
        heroContent,
        aboutContent,
        statsContent,
        hobbies,
        navbarSettings,
        siteSettings,
        primaryColor,
      };

      const result = await saveAllData({
        profile: profileForFirebase as any,
        projects,
        experiences,
        techStack,
        socials,
        sectionContent,
        footerSettings,
      });

      if (result) {
        const now = new Date().toISOString();
        setLastSyncTime(now);
        localStorage.setItem('site_lastSyncTime', now);
      }
      return result;
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const loadFromFirebase = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const data = await loadAllData();
      if (data) {
        if (data.profile) {
          const p = data.profile as any;
          setProfileState(p);
          if (p.heroContent) setHeroContentState(p.heroContent);
          if (p.aboutContent) setAboutContentState(p.aboutContent);
          if (p.statsContent) setStatsContentState(p.statsContent);
          if (p.hobbies) setHobbiesState(p.hobbies);
          if (p.navbarSettings) setNavbarSettingsState(p.navbarSettings);
          if (p.siteSettings) setSiteSettingsState(p.siteSettings);
          if (p.primaryColor) setPrimaryColorState(p.primaryColor);
        }
        if (data.projects && data.projects.length > 0) setProjectsState(data.projects);
        if (data.experiences && data.experiences.length > 0) setExperiencesState(data.experiences);
        if (data.techStack && data.techStack.length > 0) setTechStackState(data.techStack);
        if (data.socials && data.socials.length > 0) setSocialsState(data.socials);
        if (data.sectionContent) setSectionContentState(data.sectionContent);
        if (data.footerSettings) setFooterSettingsState(data.footerSettings);

        const now = new Date().toISOString();
        setLastSyncTime(now);
        localStorage.setItem('site_lastSyncTime', now);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loading from Firebase:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    const result = await signInWithGoogle();
    return result;
  };

  const logout = async () => {
    await logOut();
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const setPrimaryColor = (color: string) => setPrimaryColorState(color);

  return (
    <AdminContext.Provider value={{
      isLoggedIn, currentUser, loginWithGoogle, logout, isAuthLoading,
      primaryColor, setPrimaryColor,
      profile, updateProfile,
      projects, setProjects,
      experiences, setExperiences,
      techStack, setTechStack,
      socials, setSocials,
      heroContent, setHeroContent,
      aboutContent, setAboutContent,
      statsContent, setStatsContent,
      hobbies, setHobbies,
      navbarSettings, setNavbarSettings,
      siteSettings, setSiteSettings,
      sectionContent, setSectionContent,
      footerSettings, setFooterSettings,
      messages, addMessage, markAsRead, toggleStar, archiveMessage, deleteMessage, unreadCount,
      // Firebase
      saveToFirebase, loadFromFirebase, isSaving, isLoading, lastSyncTime
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};