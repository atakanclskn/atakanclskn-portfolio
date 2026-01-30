import React from 'react';
import { useAdmin } from '../../../lib/adminContext';

interface TechTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

const TECH_LOGOS = [
  'nextdotjs', 'react', 'typescript', 'javascript', 'tailwindcss', 'html5', 'css3',
  'python', 'java', 'csharp', 'cplusplus', 'go', 'rust', 'php',
  'nodejs', 'express', 'nestjs', 'fastapi', 'django', 'flask',
  'mongodb', 'postgresql', 'mysql', 'redis', 'firebase',
  'docker', 'kubernetes', 'git', 'github', 'gitlab', 'bitbucket',
  'vscode', 'visualstudio', 'intellijidea', 'androidstudio',
  'figma', 'adobephotoshop', 'adobeillustrator', 'sketch',
  'vercel', 'netlify', 'heroku', 'aws', 'googlecloud', 'azure',
  'graphql', 'prisma', 'supabase', 'sanity', 'contentful',
  'vitejs', 'webpack', 'babel', 'eslint', 'prettier',
  'jest', 'cypress', 'playwright', 'selenium'
];

export const TechTab: React.FC<TechTabProps> = ({ editLang, theme }) => {
  const { techStack, setTechStack } = useAdmin();

  const addTech = () => {
    const newTech = {
      _id: `t${Date.now()}`,
      title: 'New Tech',
      tech: 'Category',
      iconName: 'react',
      color: 'text-cyan-400'
    };
    setTechStack([...techStack, newTech]);
  };

  const removeTech = (id: string) => {
    setTechStack(techStack.filter(t => t._id !== id));
  };

  const updateTech = (id: string, field: string, value: any) => {
    setTechStack(techStack.map(t => 
      t._id === id ? { ...t, [field]: value } : t
    ));
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Tech Stack</h3>
          <button
            onClick={addTech}
            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
          >
            + Add Tech
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techStack.map((tech) => (
            <div key={tech._id} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={tech.title}
                    onChange={(e) => updateTech(tech._id, 'title', e.target.value)}
                    className={`w-full border rounded-lg p-2 text-sm font-bold ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={tech.tech}
                    onChange={(e) => updateTech(tech._id, 'tech', e.target.value)}
                    className={`w-full border rounded-lg p-2 text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <select
                    value={tech.iconName}
                    onChange={(e) => updateTech(tech._id, 'iconName', e.target.value)}
                    className={`w-full border rounded-lg p-2 text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    {TECH_LOGOS.map(logo => (
                      <option key={logo} value={logo}>{logo}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeTech(tech._id)}
                  className="text-red-500 hover:text-red-400 text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
