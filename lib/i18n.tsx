
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'EN' | 'TR';

interface Translation {
  nav: {
    about: string;
    expertise: string;
    projects: string;
    experience: string;
    contact: string;
    letsTalk: string;
  };
  hero: {
    status: string;
    greeting: string;
    role: string;
    bio: string;
    checkWork: string;
    resume: string;
  };
  about: {
    title: string;
    highlight: string;
    p1: string;
    p2: string;
    years: string;
    shipped: string;
    coffee: string;
    whoAmI: string;
    subtitle: string;
    beyondTerminal: string;
    exploring: string;
    quote: string;
    beyondCode: string;
    yearsCoding: string;
    happyClients: string;
    codeQuality: string;
    performance: string;
    firstDesign: string;
    hobbies: {
      gaming: string;
      tennis: string;
      techBlogs: string;
      coffee: string;
      motorcycling: string;
      spaceTech: string;
      lofi: string;
      openSource: string;
    };
  };
  work: {
    title: string;
    desc: string;
  };
  experience: {
    title: string;
    desc: string;
    filters: {
      work: string;
      education: string;
      certification: string;
      project: string;
    };
    present: string;
    viewProject: string;
    viewCredential: string;
  };
  contact: {
    title: string;
    desc: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
    };
    findMe: string;
  };
}

const translations: Record<Language, Translation> = {
  EN: {
    nav: { about: 'About', expertise: 'Expertise', projects: 'Projects', experience: 'Experience', contact: 'Contact', letsTalk: "Let's Talk" },
    hero: { status: 'Available for new projects', greeting: "Hi, I'm", role: 'Building digital products, brands, and experiences.', bio: 'Software Engineer and Designer specializing in building exceptional digital experiences.', checkWork: 'Check my work', resume: 'Download Resume' },
    about: { 
      title: 'Engineering the future,', 
      highlight: 'one line of code at a time.', 
      p1: "I'm a passionate Software Engineer based in Izmir, TR, dedicated to building scalable and user-centric digital products.", 
      p2: "Whether I'm architecting complex backend systems with Node.js and Python, or crafting buttery-smooth user interfaces with React and Tailwind, I always strive for excellence.", 
      years: 'Years Coding', 
      shipped: 'Projects Shipped', 
      coffee: 'Coffee Fueled',
      whoAmI: 'Who Am I?',
      subtitle: 'More Than Just Code',
      beyondTerminal: "Beyond the terminal and IDE, I'm a curious mind who finds beauty in solving complex problems. I believe technology should serve humanity, not the other way around.",
      exploring: "When I'm not pushing pixels or debugging code, you'll find me exploring new technologies, contributing to open-source projects, or diving deep into system architecture discussions.",
      quote: "I'm passionate about creating elegant solutions that make a real difference in people's lives.",
      beyondCode: 'Beyond the Code',
      yearsCoding: 'Years Coding',
      happyClients: 'Happy Clients',
      codeQuality: 'Code Quality',
      performance: 'Performance',
      firstDesign: 'First Design',
      hobbies: {
        gaming: 'Gaming',
        tennis: 'Tennis',
        techBlogs: 'Tech Blogs',
        coffee: 'Coffee Enthusiast',
        motorcycling: 'Motorcycling',
        spaceTech: 'Space Tech',
        lofi: 'Lo-fi Beats',
        openSource: 'Open Source'
      }
    },
    work: { title: 'Checkout my latest work', desc: "A selection of projects I've worked on, ranging from web applications to open source tools." },
    experience: { title: 'Timeline', desc: 'My professional journey, educational background, and key project milestones.', filters: { work: 'Work', education: 'Education', certification: 'Certifications', project: 'Projects' }, present: 'Present', viewProject: 'View Project', viewCredential: 'View Credential' },
    contact: { title: "Let's work together.", desc: 'Have a project in mind or just want to say hi? Fill out the form below or send me an email.', form: { name: 'Name', email: 'Email', message: 'Message', send: 'Send Message' }, findMe: 'Find me on' }
  },
  TR: {
    nav: { about: 'Hakkımda', expertise: 'Yetenekler', projects: 'Projeler', experience: 'Deneyim', contact: 'İletişim', letsTalk: "Konuşalım" },
    hero: { status: 'Yeni projeler için uygun', greeting: "Selam, Ben", role: 'Dijital ürünler, markalar ve deneyimler inşa ediyorum.', bio: 'Sıra dışı dijital deneyimler oluşturma konusunda uzmanlaşmış Yazılım Mühendisi ve Tasarımcı.', checkWork: 'Projelerimi Gör', resume: 'CV İndir' },
    about: { 
      title: 'Geleceği tasarlıyorum,', 
      highlight: 'her satır kodla birlikte.', 
      p1: "İzmir merkezli, ölçeklenebilir ve kullanıcı odaklı dijital ürünler geliştirmeye adamış tutkulu bir Yazılım Mühendisiyim.", 
      p2: "Node.js ve Python ile karmaşık arka uç sistemleri mimarisi oluştururken veya React ve Tailwind ile akıcı kullanıcı arayüzleri hazırlarken her zaman mükemmelliği hedeflerim.", 
      years: 'Yıl Kodlama', 
      shipped: 'Proje Bitti', 
      coffee: 'Kahve Tüketimi',
      whoAmI: 'Ben Kimim?',
      subtitle: 'Koddan Daha Fazlası',
      beyondTerminal: "Terminal ve IDE'nin ötesinde, karmaşık problemleri çözmekte güzellik bulan meraklı bir zihinim. Teknolojinin insanlığa hizmet etmesi gerektiğine inanıyorum, tam tersine değil.",
      exploring: "Piksel itmediğim veya kod hatalarını ayıklamadığım zamanlarda, beni yeni teknolojiler keşfederken, açık kaynak projelere katkıda bulunurken veya sistem mimarisi tartışmalarına derinlemesine dalış yaparken bulabilirsiniz.",
      quote: "İnsanların hayatlarında gerçek bir fark yaratan zarif çözümler yaratma konusunda tutkulu biriyim.",
      beyondCode: 'Kodun Ötesinde',
      yearsCoding: 'Yıl Kodlama',
      happyClients: 'Mutlu Müşteri',
      codeQuality: 'Kod Kalitesi',
      performance: 'Performans',
      firstDesign: 'Önce Tasarım',
      hobbies: {
        gaming: 'Oyun',
        tennis: 'Tenis',
        techBlogs: 'Teknoloji Blogları',
        coffee: 'Kahve Tutkunu',
        motorcycling: 'Motosiklet',
        spaceTech: 'Uzay Teknolojisi',
        lofi: 'Lo-fi Müzik',
        openSource: 'Açık Kaynak'
      }
    },
    work: { title: 'Son çalışmalarıma göz atın', desc: "Web uygulamalarından açık kaynak araçlara kadar üzerinde çalıştığım projelerden bir seçki." },
    experience: { title: 'Zaman Çizelgesi', desc: 'Profesyonel yolculuğum, eğitim geçmişim ve önemli proje kilometre taşlarım.', filters: { work: 'İş', education: 'Eğitim', certification: 'Sertifikalar', project: 'Projeler' }, present: 'Günümüz', viewProject: 'Projeyi Gör', viewCredential: 'Sertifikayı Gör' },
    contact: { title: "Birlikte çalışalım.", desc: 'Aklınızda bir proje mi var ya da sadece merhaba mı demek istiyorsunuz? Formu doldurun veya bana e-posta gönderin.', form: { name: 'İsim', email: 'E-posta', message: 'Mesaj', send: 'Mesaj Gönder' }, findMe: 'Beni şurada bul' }
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('EN');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'EN', label: 'English', flag: '🇺🇸' },
  { code: 'TR', label: 'Türkçe', flag: '🇹🇷' },
];
