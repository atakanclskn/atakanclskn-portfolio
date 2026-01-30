import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, GripVertical, 
  FolderKanban, Image, Link, Github, Tag, FileText, Layers
} from 'lucide-react';

interface ProjectsTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ editLang, theme }) => {
  const { projects, setProjects } = useAdmin();
  const t = adminTranslations.projects;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 hover:border-gray-600'
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300'
  }`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
  }`;

  const cardClass = `p-6 rounded-2xl border ${
    theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
  }`;

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
    setExpandedItems(new Set([...expandedItems, newProject._id]));
  };

  const removeProject = (id: string) => {
    if (window.confirm(editLang === 'TR' ? 'Bu projeyi silmek istiyor musunuz?' : 'Remove this project?')) {
      setProjects(projects.filter(p => p._id !== id));
    }
  };

  const updateProject = (id: string, field: string, value: any) => {
    setProjects(projects.map(p => 
      p._id === id ? { ...p, [field]: value } : p
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

  const getValue = (field: any) => {
    return typeof field === 'string' ? field : field[editLang];
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className={cardClass}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {getText(t.title)}
            </h2>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {projects.length} {editLang === 'TR' ? 'proje eklendi' : 'projects added'}
            </p>
          </div>
          
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            {getText(t.addProject)}
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center ${
            theme === 'dark' ? 'bg-gray-900/30 border-gray-800' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}>
              <FolderKanban size={32} className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} />
            </div>
            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {editLang === 'TR' ? 'Henüz proje eklenmedi' : 'No projects added yet'}
            </p>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {editLang === 'TR' ? 'Proje eklemek için yukarıdaki butona tıklayın' : 'Click the button above to add a project'}
            </p>
          </div>
        ) : (
          projects.map((project) => {
            const isExpanded = expandedItems.has(project._id);
            return (
              <div key={project._id} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}>
                {/* Card Header */}
                <div 
                  className={`p-4 flex items-center gap-4 cursor-pointer select-none ${
                    theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleExpand(project._id)}
                >
                  <GripVertical size={18} className={`cursor-grab ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                  
                  {/* Project Image Preview */}
                  <div className={`w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    {project.mainImage ? (
                      <img src={project.mainImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Image size={24} className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} />
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {getValue(project.title)}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {project.category}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        project.size === 'large' 
                          ? theme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                          : theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {project.size === 'large' ? (editLang === 'TR' ? 'Büyük' : 'Large') : (editLang === 'TR' ? 'Küçük' : 'Small')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProject(project._id);
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
                    {/* Title & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          <Tag size={14} />
                          {getText(t.projectTitle)} ({editLang})
                        </label>
                        <input
                          type="text"
                          value={getValue(project.title)}
                          onChange={(e) => updateProject(project._id, 'title', updateMultiLangText(project.title, e.target.value, editLang))}
                          className={inputClass}
                          placeholder={editLang === 'TR' ? 'Proje adı' : 'Project name'}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          <FolderKanban size={14} />
                          {getText(t.category)}
                        </label>
                        <input
                          type="text"
                          value={project.category}
                          onChange={(e) => updateProject(project._id, 'category', e.target.value)}
                          className={inputClass}
                          placeholder="Web, Mobile, etc."
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className={labelClass}>
                        <FileText size={14} />
                        {getText(t.description)} ({editLang})
                      </label>
                      <textarea
                        rows={3}
                        value={getValue(project.description)}
                        onChange={(e) => updateProject(project._id, 'description', updateMultiLangText(project.description, e.target.value, editLang))}
                        className={inputClass}
                        placeholder={editLang === 'TR' ? 'Proje açıklaması...' : 'Project description...'}
                      />
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className={labelClass}>
                        <Image size={14} />
                        {getText(t.image)}
                      </label>
                      <input
                        type="text"
                        value={project.mainImage}
                        onChange={(e) => updateProject(project._id, 'mainImage', e.target.value)}
                        className={inputClass}
                        placeholder="https://example.com/image.jpg"
                      />
                      {project.mainImage && (
                        <div className="mt-2 p-2 rounded-lg bg-gray-800/30">
                          <img 
                            src={project.mainImage} 
                            alt="Preview" 
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                          />
                        </div>
                      )}
                    </div>

                    {/* Size, Link, GitHub */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelClass}>
                          <Layers size={14} />
                          {getText(t.size)}
                        </label>
                        <select
                          value={project.size}
                          onChange={(e) => updateProject(project._id, 'size', e.target.value)}
                          className={inputClass}
                        >
                          <option value="small">{getText(t.sizeSmall)}</option>
                          <option value="large">{getText(t.sizeLarge)}</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>
                          <Link size={14} />
                          {getText(t.link)}
                        </label>
                        <input
                          type="text"
                          value={project.link || ''}
                          onChange={(e) => updateProject(project._id, 'link', e.target.value)}
                          className={inputClass}
                          placeholder="https://project.com"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          <Github size={14} />
                          {getText(t.githubUrl)}
                        </label>
                        <input
                          type="text"
                          value={project.githubUrl || ''}
                          onChange={(e) => updateProject(project._id, 'githubUrl', e.target.value)}
                          className={inputClass}
                          placeholder="https://github.com/..."
                        />
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
