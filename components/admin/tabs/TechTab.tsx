import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { 
  Plus, Trash2, Search, GripVertical, 
  ChevronDown, ChevronUp, Tag, Code2
} from 'lucide-react';

interface TechTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

// Comprehensive list of tech icons - using Devicon names
const TECH_CATEGORIES: Record<string, { name: string; icon: string; color: string }[]> = {
  'Frontend': [
    { name: 'React', icon: 'react', color: '61DAFB' },
    { name: 'Vue.js', icon: 'vuejs', color: '4FC08D' },
    { name: 'Angular', icon: 'angularjs', color: 'DD0031' },
    { name: 'Svelte', icon: 'svelte', color: 'FF3E00' },
    { name: 'Next.js', icon: 'nextjs', color: '000000' },
    { name: 'Nuxt.js', icon: 'nuxtjs', color: '00DC82' },
    { name: 'Astro', icon: 'astro', color: 'FF5D01' },
    { name: 'Gatsby', icon: 'gatsby', color: '663399' },
    { name: 'Solid.js', icon: 'solidjs', color: '2C4F7C' },
    { name: 'Ember.js', icon: 'ember', color: 'E04E39' },
  ],
  'Languages': [
    { name: 'JavaScript', icon: 'javascript', color: 'F7DF1E' },
    { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
    { name: 'Python', icon: 'python', color: '3776AB' },
    { name: 'Java', icon: 'java', color: 'ED8B00' },
    { name: 'C#', icon: 'csharp', color: '512BD4' },
    { name: 'C++', icon: 'cplusplus', color: '00599C' },
    { name: 'Go', icon: 'go', color: '00ADD8' },
    { name: 'Rust', icon: 'rust', color: '000000' },
    { name: 'PHP', icon: 'php', color: '777BB4' },
    { name: 'Ruby', icon: 'ruby', color: 'CC342D' },
    { name: 'Swift', icon: 'swift', color: 'F05138' },
    { name: 'Kotlin', icon: 'kotlin', color: '7F52FF' },
    { name: 'Dart', icon: 'dart', color: '0175C2' },
  ],
  'Styling': [
    { name: 'CSS3', icon: 'css3', color: '1572B6' },
    { name: 'Sass', icon: 'sass', color: 'CC6699' },
    { name: 'Tailwind CSS', icon: 'tailwindcss', color: '06B6D4' },
    { name: 'Bootstrap', icon: 'bootstrap', color: '7952B3' },
    { name: 'Less', icon: 'less', color: '1D365D' },
    { name: 'Material UI', icon: 'materialui', color: '007FFF' },
    { name: 'Bulma', icon: 'bulma', color: '00D1B2' },
    { name: 'Foundation', icon: 'foundation', color: '14679E' },
  ],
  'Backend': [
    { name: 'Node.js', icon: 'nodejs', color: '5FA04E' },
    { name: 'Express', icon: 'express', color: '000000' },
    { name: 'NestJS', icon: 'nestjs', color: 'E0234E' },
    { name: 'Fastify', icon: 'fastify', color: '000000' },
    { name: 'Django', icon: 'django', color: '092E20' },
    { name: 'Flask', icon: 'flask', color: '000000' },
    { name: 'FastAPI', icon: 'fastapi', color: '009688' },
    { name: 'Spring', icon: 'spring', color: '6DB33F' },
    { name: '.NET', icon: 'dot-net', color: '512BD4' },
    { name: 'Laravel', icon: 'laravel', color: 'FF2D20' },
    { name: 'Rails', icon: 'rails', color: 'D30001' },
  ],
  'Database': [
    { name: 'PostgreSQL', icon: 'postgresql', color: '4169E1' },
    { name: 'MySQL', icon: 'mysql', color: '4479A1' },
    { name: 'MongoDB', icon: 'mongodb', color: '47A248' },
    { name: 'Redis', icon: 'redis', color: 'DC382D' },
    { name: 'SQLite', icon: 'sqlite', color: '003B57' },
    { name: 'Supabase', icon: 'supabase', color: '3FCF8E' },
    { name: 'Firebase', icon: 'firebase', color: 'FFCA28' },
    { name: 'GraphQL', icon: 'graphql', color: 'E10098' },
    { name: 'Oracle', icon: 'oracle', color: 'F80000' },
  ],
  'DevOps & Tools': [
    { name: 'Git', icon: 'git', color: 'F05032' },
    { name: 'GitHub', icon: 'github', color: '181717' },
    { name: 'GitLab', icon: 'gitlab', color: 'FC6D26' },
    { name: 'Docker', icon: 'docker', color: '2496ED' },
    { name: 'Kubernetes', icon: 'kubernetes', color: '326CE5' },
    { name: 'AWS', icon: 'amazonwebservices', color: '232F3E' },
    { name: 'Google Cloud', icon: 'googlecloud', color: '4285F4' },
    { name: 'Azure', icon: 'azure', color: '0078D4' },
    { name: 'Vercel', icon: 'vercel', color: '000000' },
    { name: 'Heroku', icon: 'heroku', color: '430098' },
    { name: 'Jenkins', icon: 'jenkins', color: 'D24939' },
  ],
  'Mobile': [
    { name: 'React Native', icon: 'react', color: '61DAFB' },
    { name: 'Flutter', icon: 'flutter', color: '02569B' },
    { name: 'Android', icon: 'android', color: '3DDC84' },
    { name: 'Apple', icon: 'apple', color: '000000' },
    { name: 'Xamarin', icon: 'xamarin', color: '3498DB' },
  ],
  'Build Tools': [
    { name: 'Vite', icon: 'vitejs', color: '646CFF' },
    { name: 'Webpack', icon: 'webpack', color: '8DD6F9' },
    { name: 'Babel', icon: 'babel', color: 'F9DC3E' },
    { name: 'ESLint', icon: 'eslint', color: '4B32C3' },
    { name: 'npm', icon: 'npm', color: 'CB3837' },
    { name: 'Yarn', icon: 'yarn', color: '2C8EBB' },
    { name: 'Gulp', icon: 'gulp', color: 'CF4647' },
    { name: 'Grunt', icon: 'grunt', color: 'FAA918' },
  ],
  'Testing': [
    { name: 'Jest', icon: 'jest', color: 'C21325' },
    { name: 'Mocha', icon: 'mocha', color: '8D6748' },
    { name: 'Pytest', icon: 'pytest', color: '0A9EDC' },
    { name: 'Selenium', icon: 'selenium', color: '43B02A' },
    { name: 'RSpec', icon: 'rspec', color: '6DE1FA' },
  ],
  'CMS & Others': [
    { name: 'Sanity', icon: 'sanity', color: 'F03E2F' },
    { name: 'WordPress', icon: 'wordpress', color: '21759B' },
    { name: 'Figma', icon: 'figma', color: 'F24E1E' },
    { name: 'Sketch', icon: 'sketch', color: 'F7B500' },
    { name: 'Photoshop', icon: 'photoshop', color: '31A8FF' },
    { name: 'Illustrator', icon: 'illustrator', color: 'FF9A00' },
    { name: 'Slack', icon: 'slack', color: '4A154B' },
    { name: 'Trello', icon: 'trello', color: '0052CC' },
  ],
};

// Flatten all techs for search
const ALL_TECHS = Object.entries(TECH_CATEGORIES).flatMap(([category, items]) =>
  items.map(item => ({ ...item, category }))
);

// Map icon names to Devicon format
const resolveIconName = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    // Legacy names
    'NextLogo': 'nextjs',
    'ReactLogo': 'react',
    'TypeScriptLogo': 'typescript',
    'TailwindLogo': 'tailwindcss',
    'FramerLogo': 'framer',
    'ViteLogo': 'vitejs',
    'SanityCMSLogo': 'sanity',
    'PythonLogo': 'python',
    'NodeJSLogo': 'nodejs',
    'VueLogo': 'vuejs',
    'AngularLogo': 'angularjs',
    'SvelteLogo': 'svelte',
    'JavaScriptLogo': 'javascript',
    'GoLogo': 'go',
    'RustLogo': 'rust',
    'JavaLogo': 'java',
    'CSSLogo': 'css3',
    'SassLogo': 'sass',
    'StyledComponentsLogo': 'css3',
    'NodeLogo': 'nodejs',
    'ExpressLogo': 'express',
    'MongoDBLogo': 'mongodb',
    'PostgreSQLLogo': 'postgresql',
    'MySQLLogo': 'mysql',
    'RedisLogo': 'redis',
    'SupabaseLogo': 'supabase',
    'FirebaseLogo': 'firebase',
    'GitLogo': 'git',
    'DockerLogo': 'docker',
    'VercelLogo': 'vercel',
    'FigmaLogo': 'figma',
    'SanityLogo': 'sanity',
    'GraphQLLogo': 'graphql',
    // SimpleIcons format to Devicon
    'nextdotjs': 'nextjs',
    'nodedotjs': 'nodejs',
    'vuedotjs': 'vuejs',
    'tailwindcss': 'tailwindcss',
    'openjdk': 'java',
    'cplusplus': 'cplusplus',
    'csharp': 'csharp',
    'vite': 'vitejs',
    'amazonaws': 'amazonwebservices',
    'googlecloud': 'googlecloud',
    'microsoftazure': 'azure',
    'rubyonrails': 'rails',
  };
  return iconMap[iconName] || iconName;
};

// Get icon URL using Devicon CDN (original colored logos)
const getIconUrl = (iconName: string): string => {
  const resolvedIcon = resolveIconName(iconName);
  // Devicon CDN with original colors
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${resolvedIcon}/${resolvedIcon}-original.svg`;
};

// Fallback to plain version if original doesn't exist
const getIconUrlWithFallback = (iconName: string): string => {
  const resolvedIcon = resolveIconName(iconName);
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${resolvedIcon}/${resolvedIcon}-original.svg`;
};

export const TechTab: React.FC<TechTabProps> = ({ editLang, theme }) => {
  const { techStack, setTechStack } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Filter techs based on search and category
  const filteredTechs = ALL_TECHS.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tech.category === selectedCategory;
    const notAlreadyAdded = !techStack.find(t => t.iconName === tech.icon);
    return matchesSearch && matchesCategory && notAlreadyAdded;
  });

  const addTech = (tech: typeof ALL_TECHS[0]) => {
    const newTech = {
      _id: `tech_${Date.now()}`,
      title: tech.name,
      tech: tech.category,
      iconName: tech.icon,
      color: `#${tech.color}`,
    };
    setTechStack([...techStack, newTech]);
  };

  const addCustomTech = () => {
    const newTech = {
      _id: `tech_${Date.now()}`,
      title: 'Custom Tech',
      tech: 'Custom',
      iconName: 'code',
      color: '#6366f1',
    };
    setTechStack([...techStack, newTech]);
    setExpandedItems(new Set([...expandedItems, newTech._id]));
  };

  const removeTech = (id: string) => {
    if (window.confirm('Remove this technology?')) {
      setTechStack(techStack.filter(t => t._id !== id));
    }
  };

  const updateTech = (id: string, field: string, value: string) => {
    setTechStack(techStack.map(t => 
      t._id === id ? { ...t, [field]: value } : t
    ));
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 hover:border-gray-600'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300'
  }`;

  const cardClass = `rounded-2xl border overflow-hidden transition-all duration-300 ${
    theme === 'dark' 
      ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700' 
      : 'bg-white border-gray-200 hover:border-gray-300'
  }`;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className={`p-6 rounded-2xl border ${
        theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Tech Stack
            </h2>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {techStack.length} technologies added
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddPanel(!showAddPanel)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                showAddPanel
                  ? 'bg-primary text-black'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Plus size={18} />
              Add Technology
            </button>
          </div>
        </div>
      </div>

      {/* Add Panel */}
      {showAddPanel && (
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-primary text-black'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {Object.keys(TECH_CATEGORIES).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-black'
                      : theme === 'dark'
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Tech Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-80 overflow-y-auto">
              {filteredTechs.map(tech => (
                <button
                  key={tech.icon}
                  onClick={() => addTech(tech)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.icon}/${tech.icon}-original.svg`}
                    alt={tech.name}
                    className="w-8 h-8"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tech.icon}/${tech.icon}-plain.svg`;
                    }}
                  />
                  <span className={`text-xs font-medium text-center ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {tech.name}
                  </span>
                </button>
              ))}
            </div>

            {filteredTechs.length === 0 && (
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                No technologies found. Try a different search or add a custom one.
              </div>
            )}

            {/* Custom Tech Button */}
            <button
              onClick={addCustomTech}
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed transition-all ${
                theme === 'dark'
                  ? 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                  : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600'
              }`}
            >
              <Code2 size={18} />
              Add Custom Technology
            </button>
          </div>
        </div>
      )}

      {/* Added Technologies */}
      <div className="space-y-3">
        {techStack.length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center ${
            theme === 'dark' ? 'bg-gray-900/30 border-gray-800' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}>
              <Code2 size={32} className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} />
            </div>
            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              No technologies added yet
            </p>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              Click "Add Technology" to get started
            </p>
          </div>
        ) : (
          techStack.map((tech) => {
            const isExpanded = expandedItems.has(tech._id);

            return (
              <div key={tech._id} className={cardClass}>
                {/* Card Header */}
                <div 
                  className={`p-4 flex items-center gap-4 cursor-pointer select-none ${
                    theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleExpand(tech._id)}
                >
                  {/* Drag Handle & Icon */}
                  <div className="flex items-center gap-3">
                    <GripVertical size={18} className={`cursor-grab ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800"
                    >
                      <img
                        src={getIconUrl(tech.iconName)}
                        alt={tech.title}
                        className="w-7 h-7"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const resolved = resolveIconName(tech.iconName);
                          if (!target.src.includes('-plain')) {
                            target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${resolved}/${resolved}-plain.svg`;
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {tech.title}
                    </h3>
                    <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tech.tech}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTech(tech._id);
                      }}
                      className={`p-2 rounded-lg transition-colors text-red-500 ${
                        theme === 'dark' ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`p-6 border-t space-y-4 ${
                    theme === 'dark' ? 'border-gray-800 bg-gray-900/30' : 'border-gray-100 bg-gray-50/50'
                  }`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Tag size={14} />
                          Technology Name
                        </label>
                        <input
                          type="text"
                          value={tech.title}
                          onChange={(e) => updateTech(tech._id, 'title', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={`text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Tag size={14} />
                          Category
                        </label>
                        <input
                          type="text"
                          value={tech.tech}
                          onChange={(e) => updateTech(tech._id, 'tech', e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Code2 size={14} />
                          Icon Name (Devicon)
                        </label>
                        <input
                          type="text"
                          value={tech.iconName}
                          onChange={(e) => updateTech(tech._id, 'iconName', e.target.value)}
                          placeholder="e.g., react, typescript, python"
                          className={inputClass}
                        />
                        <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          Find icons at <a href="https://devicon.dev" target="_blank" rel="noreferrer" className="text-primary hover:underline">devicon.dev</a>
                        </p>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <p className={`text-xs font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Preview
                      </p>
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-200 dark:bg-gray-700"
                        >
                          <img
                            src={getIconUrl(tech.iconName)}
                            alt={tech.title}
                            className="w-9 h-9"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const resolved = resolveIconName(tech.iconName);
                              if (!target.src.includes('-plain')) {
                                target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${resolved}/${resolved}-plain.svg`;
                              } else {
                                target.style.display = 'none';
                              }
                            }}
                          />
                        </div>
                        <div>
                          <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {tech.title}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {tech.tech}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
