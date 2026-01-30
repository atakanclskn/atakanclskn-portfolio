import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';

interface ProjectsTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ editLang, theme }) => {
  const { projects, setProjects } = useAdmin();

  const addProject = () => {
    const newProject = {
      _id: `p${Date.now()}`,
      title: { EN: 'New Project', TR: 'Yeni Proje' },
      category: 'Web',
      description: { EN: 'Description', TR: 'Açıklama' },
      mainImage: '',
      size: 'small' as const,
      link: '',
      githubUrl: '',
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p._id !== id));
  };

  const updateProject = (id: string, field: string, value: any) => {
    setProjects(projects.map(p => 
      p._id === id ? { ...p, [field]: value } : p
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
          }`}>Projects</h3>
          <button
            onClick={addProject}
            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
          >
            + Add Project
          </button>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project._id} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={`Title (${editLang})`}
                      value={typeof project.title === 'string' ? project.title : project.title[editLang]}
                      onChange={(e) => updateProject(project._id, 'title', updateMultiLangText(project.title, e.target.value, editLang))}
                      className={`w-full border rounded-lg p-2 text-sm font-bold ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={project.category}
                      onChange={(e) => updateProject(project._id, 'category', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <textarea
                    placeholder={`Description (${editLang})`}
                    rows={2}
                    value={typeof project.description === 'string' ? project.description : project.description[editLang]}
                    onChange={(e) => updateProject(project._id, 'description', updateMultiLangText(project.description, e.target.value, editLang))}
                    className={`w-full border rounded-lg p-2 text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={project.mainImage}
                    onChange={(e) => updateProject(project._id, 'mainImage', e.target.value)}
                    className={`w-full border rounded-lg p-2 text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <select
                      value={project.size}
                      onChange={(e) => updateProject(project._id, 'size', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="small">Small</option>
                      <option value="large">Large</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Project Link"
                      value={project.link || ''}
                      onChange={(e) => updateProject(project._id, 'link', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="GitHub URL"
                      value={project.githubUrl || ''}
                      onChange={(e) => updateProject(project._id, 'githubUrl', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeProject(project._id)}
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
