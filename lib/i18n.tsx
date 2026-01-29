
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'EN' | 'TR' | 'ES' | 'FR' | 'DE' | 'IT' | 'PT' | 'RU' | 'ZH' | 'JA';

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
    experience: { title: 'Timeline', desc: 'My professional journey, educational background, and key project milestones.', filters: { work: 'Work', education: 'Education', certification: 'Certifications', project: 'Projects' }, present: 'Present', viewProject: 'View Project' },
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
    experience: { title: 'Zaman Çizelgesi', desc: 'Profesyonel yolculuğum, eğitim geçmişim ve önemli proje kilometre taşlarım.', filters: { work: 'İş', education: 'Eğitim', certification: 'Sertifikalar', project: 'Projeler' }, present: 'Günümüz', viewProject: 'Projeyi Gör' },
    contact: { title: "Birlikte çalışalım.", desc: 'Aklınızda bir proje mi var ya da sadece merhaba mı demek istiyorsunuz? Formu doldurun veya bana e-posta gönderin.', form: { name: 'İsim', email: 'E-posta', message: 'Mesaj', send: 'Mesaj Gönder' }, findMe: 'Beni şurada bul' }
  },
  ES: {
    nav: { about: 'Sobre mí', expertise: 'Habilidades', projects: 'Proyectos', experience: 'Experiencia', contact: 'Contacto', letsTalk: "Hablemos" },
    hero: { status: 'Disponible para proyectos', greeting: "Hola, soy", role: 'Creando productos digitales, marcas y experiencias.', bio: 'Ingeniero de software y diseñador especializado en crear experiencias digitales excepcionales.', checkWork: 'Ver mi trabajo', resume: 'Descargar CV' },
    about: { title: 'Ingeniando el futuro,', highlight: 'una línea de código a la vez.', p1: "Soy un apasionado Ingeniero de Software con sede en Izmir, TR, dedicado a construir productos digitales escalables.", p2: "Ya sea arquitectando sistemas backend complejos o creando interfaces de usuario fluidas, siempre busco la excelencia.", years: 'Años Codificando', shipped: 'Proyectos', coffee: 'Café Consumido' },
    work: { title: 'Mira mis últimos trabajos', desc: "Una selección de proyectos en los que he trabajado, desde aplicaciones web hasta herramientas open source." },
    experience: { title: 'Cronología', desc: 'Mi trayectoria profesional, formación académica e hitos clave.', filters: { work: 'Trabajo', education: 'Educación', certification: 'Certificaciones', project: 'Proyectos' }, present: 'Presente', viewProject: 'Ver Proyecto' },
    contact: { title: "Trabajemos juntos.", desc: '¿Tienes un proyecto en mente? Rellena el formulario o envíame un correo.', form: { name: 'Nombre', email: 'Correo', message: 'Mensaje', send: 'Enviar Mensaje' }, findMe: 'Encuéntrame en' }
  },
  FR: {
    nav: { about: 'À propos', expertise: 'Compétences', projects: 'Projets', experience: 'Expérience', contact: 'Contact', letsTalk: "Discutons" },
    hero: { status: 'Disponible pour projets', greeting: "Salut, je suis", role: 'Création de produits numériques, marques et expériences.', bio: 'Ingénieur logiciel spécialisé dans la création d\'expériences numériques exceptionnelles.', checkWork: 'Voir mon travail', resume: 'Télécharger CV' },
    about: { title: 'Ingénierie du futur,', highlight: 'une ligne de code à la fois.', p1: "Ingénieur logiciel passionné basé à Izmir, dédié à la création de produits numériques évolutifs.", p2: "Que ce soit pour l'architecture backend ou les interfaces utilisateur fluides, je vise toujours l'excellence.", years: 'Années de Code', shipped: 'Projets Livrés', coffee: 'Café' },
    work: { title: 'Mes derniers travaux', desc: "Une sélection de projets, des applications web aux outils open source." },
    experience: { title: 'Chronologie', desc: 'Mon parcours professionnel, ma formation et mes projets clés.', filters: { work: 'Travail', education: 'Éducation', certification: 'Certifications', project: 'Projets' }, present: 'Présent', viewProject: 'Voir le projet' },
    contact: { title: "Travaillons ensemble.", desc: 'Un projet en tête ? Remplissez le formulaire ou envoyez-moi un email.', form: { name: 'Nom', email: 'Email', message: 'Message', send: 'Envoyer' }, findMe: 'Retrouvez-moi sur' }
  },
  DE: {
    nav: { about: 'Über mich', expertise: 'Expertise', projects: 'Projekte', experience: 'Erfahrung', contact: 'Kontakt', letsTalk: "Lass uns reden" },
    hero: { status: 'Verfügbar für Projekte', greeting: "Hallo, ich bin", role: 'Entwicklung digitaler Produkte, Marken und Erlebnisse.', bio: 'Softwareingenieur und Designer, spezialisiert auf außergewöhnliche digitale Erlebnisse.', checkWork: 'Meine Arbeit', resume: 'Lebenslauf' },
    about: { title: 'Die Zukunft gestalten,', highlight: 'eine Zeile Code nach der anderen.', p1: "Leidenschaftlicher Softwareingenieur aus Izmir, TR, fokussiert auf skalierbare digitale Produkte.", p2: "Ob komplexe Backend-Systeme oder flüssige Benutzeroberflächen, ich strebe immer nach Exzellenz.", years: 'Jahre Coding', shipped: 'Projekte', coffee: 'Kaffee' },
    work: { title: 'Meine neuesten Arbeiten', desc: "Eine Auswahl an Projekten, von Web-Apps bis zu Open-Source-Tools." },
    experience: { title: 'Zeitlinie', desc: 'Mein beruflicher Werdegang, Ausbildung und wichtige Meilensteine.', filters: { work: 'Arbeit', education: 'Bildung', certification: 'Zertifikate', project: 'Projekte' }, present: 'Gegenwart', viewProject: 'Projekt ansehen' },
    contact: { title: "Lass uns zusammenarbeiten.", desc: 'Hast du ein Projekt im Sinn? Fülle das Formular aus oder sende mir eine E-Mail.', form: { name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Nachricht senden' }, findMe: 'Finde mich auf' }
  },
  IT: {
    nav: { about: 'Chi sono', expertise: 'Competenze', projects: 'Progetti', experience: 'Esperienza', contact: 'Contatto', letsTalk: "Parliamo" },
    hero: { status: 'Disponibile per progetti', greeting: "Ciao, sono", role: 'Costruisco prodotti digitali, marchi ed esperienze.', bio: 'Ingegnere del software e designer specializzato in esperienze digitali eccezionali.', checkWork: 'I miei lavori', resume: 'Scarica CV' },
    about: { title: 'Ingegnerizzare il futuro,', highlight: 'una riga di codice alla volta.', p1: "Ingegnere del software appassionato con base a Izmir, dedicato a prodotti digitali scalabili.", p2: "Dall'architettura backend alle interfacce utente fluide, punto sempre all'eccellenza.", years: 'Anni di Codice', shipped: 'Progetti', coffee: 'Caffè' },
    work: { title: 'I miei ultimi lavori', desc: "Una selezione di progetti, dalle web app agli strumenti open source." },
    experience: { title: 'Cronologia', desc: 'Il mio percorso professionale, formazione e pietre miliari.', filters: { work: 'Lavoro', education: 'Istruzione', certification: 'Certificazioni', project: 'Progetti' }, present: 'Presente', viewProject: 'Vedi Progetto' },
    contact: { title: "Lavoriamo insieme.", desc: 'Hai un progetto in mente? Compila il modulo o mandami un\'email.', form: { name: 'Nome', email: 'Email', message: 'Messaggio', send: 'Invia Messaggio' }, findMe: 'Trovami su' }
  },
  PT: {
    nav: { about: 'Sobre', expertise: 'Expertise', projects: 'Projetos', experience: 'Experiência', contact: 'Contato', letsTalk: "Vamos conversar" },
    hero: { status: 'Disponível para projetos', greeting: "Olá, sou", role: 'Criando produtos digitais, marcas e experiências.', bio: 'Engenheiro de Software e Designer focado em experiências digitais excepcionais.', checkWork: 'Ver trabalhos', resume: 'Baixar CV' },
    about: { title: 'Projetando o futuro,', highlight: 'uma linha de código por vez.', p1: "Engenheiro de Software apaixonado em Izmir, dedicado a produtos digitais escaláveis.", p2: "Seja arquitetando backends complexos ou interfaces fluidas, sempre busco a excelência.", years: 'Anos Codando', shipped: 'Projetos', coffee: 'Café' },
    work: { title: 'Meus trabalhos recentes', desc: "Uma seleção de projetos, de web apps a ferramentas open source." },
    experience: { title: 'Linha do tempo', desc: 'Minha jornada profissional, educação e marcos importantes.', filters: { work: 'Trabalho', education: 'Educação', certification: 'Certificações', project: 'Projetos' }, present: 'Presente', viewProject: 'Ver Projeto' },
    contact: { title: "Vamos trabalhar juntos.", desc: 'Tem um projeto? Preencha o formulário ou envie um e-mail.', form: { name: 'Nome', email: 'E-mail', message: 'Mensagem', send: 'Enviar Mensagem' }, findMe: 'Encontre-me em' }
  },
  RU: {
    nav: { about: 'Обо мне', expertise: 'Навыки', projects: 'Проекты', experience: 'Опыт', contact: 'Контакты', letsTalk: "Обсудим" },
    hero: { status: 'Доступен для проектов', greeting: "Привет, я", role: 'Создаю цифровые продукты, бренды и опыт.', bio: 'Инженер-программист и дизайнер, специализирующийся на исключительных цифровых продуктах.', checkWork: 'Мои работы', resume: 'Скачать резюме' },
    about: { title: 'Создавая будущее,', highlight: 'строчка за строчкой.', p1: "Я увлеченный инженер-программист из Измира, создающий масштабируемые продукты.", p2: "Будь то сложная архитектура бэкенда или плавные интерфейсы, я всегда стремлюсь к совершенству.", years: 'Лет кодинга', shipped: 'Проектов', coffee: 'Кофе' },
    work: { title: 'Мои последние работы', desc: "Подборка проектов: от веб-приложений до open source инструментов." },
    experience: { title: 'Хронология', desc: 'Мой профессиональный путь, образование и ключевые проекты.', filters: { work: 'Работа', education: 'Образование', certification: 'Сертификаты', project: 'Проекты' }, present: 'Сейчас', viewProject: 'Смотреть' },
    contact: { title: "Давайте работать вместе.", desc: 'Есть проект? Заполните форму или отправьте мне email.', form: { name: 'Имя', email: 'Email', message: 'Сообщение', send: 'Отправить' }, findMe: 'Я в соцсетях' }
  },
  ZH: {
    nav: { about: '关于', expertise: '专长', projects: '项目', experience: '经验', contact: '联系', letsTalk: "让我们谈谈" },
    hero: { status: '接受新项目', greeting: "你好，我是", role: '构建数字产品、品牌和体验。', bio: '专注于构建卓越数字体验的软件工程师和设计师。', checkWork: '查看作品', resume: '下载简历' },
    about: { title: '工程化未来，', highlight: '一次一行代码。', p1: "我是位于伊兹密尔的热情软件工程师，致力于构建可扩展的以用户为中心的数字产品。", p2: "无论是构建复杂的后端系统还是流畅的用户界面，我都追求卓越。", years: '编程年限', shipped: '已发布项目', coffee: '咖啡消耗' },
    work: { title: '查看我的最新作品', desc: "我参与的项目精选，从Web应用到开源工具。" },
    experience: { title: '时间轴', desc: '我的职业旅程、教育背景和关键项目里程碑。', filters: { work: '工作', education: '教育', certification: '认证', project: '项目' }, present: '至今', viewProject: '查看项目' },
    contact: { title: "让我们一起工作。", desc: '有项目想法？填写表格或给我发邮件。', form: { name: '姓名', email: '邮箱', message: '信息', send: '发送信息' }, findMe: '在这里找到我' }
  },
  JA: {
    nav: { about: '私について', expertise: 'スキル', projects: 'プロジェクト', experience: '経歴', contact: '連絡先', letsTalk: "話しましょう" },
    hero: { status: '新規プロジェクト募集中', greeting: "こんにちは、", role: 'デジタル製品、ブランド、体験を構築します。', bio: '卓越したデジタル体験の構築を専門とするソフトウェアエンジニア兼デザイナー。', checkWork: '作品を見る', resume: '履歴書をDL' },
    about: { title: '未来を設計する、', highlight: '一行のコードから。', p1: "イズミルを拠点とする情熱的なソフトウェアエンジニアで、スケーラブルな製品構築に専念しています。", p2: "複雑なバックエンド構築でも、スムーズなUI作成でも、常に卓越性を追求します。", years: 'コーディング歴', shipped: 'プロジェクト数', coffee: 'コーヒー消費' },
    work: { title: '最新の作品をチェック', desc: "Webアプリからオープンソースツールまで、私が取り組んだプロジェクトのセレクション。" },
    experience: { title: 'タイムライン', desc: '私の専門的な旅路、学歴、そして重要なプロジェクトのマイルストーン。', filters: { work: '仕事', education: '教育', certification: '資格', project: 'プロジェクト' }, present: '現在', viewProject: 'プロジェクトを見る' },
    contact: { title: "一緒に働きましょう。", desc: 'プロジェクトのアイデアがありますか？フォームに記入するか、メールを送ってください。', form: { name: '名前', email: 'メール', message: 'メッセージ', send: '送信' }, findMe: 'SNS' }
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
  { code: 'ES', label: 'Español', flag: '🇪🇸' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'IT', label: 'Italiano', flag: '🇮🇹' },
  { code: 'PT', label: 'Português', flag: '🇵🇹' },
  { code: 'RU', label: 'Русский', flag: '🇷🇺' },
  { code: 'ZH', label: '中文', flag: '🇨🇳' },
  { code: 'JA', label: '日本語', flag: '🇯🇵' },
];
