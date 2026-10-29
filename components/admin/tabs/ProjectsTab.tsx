import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, GripVertical, 
  FolderKanban, Image, Link, Github, Tag, FileText, Layers
} from 'lucide-react';
import { MonthPicker, Select, Toggle, useConfirm } from '../ui';
import { TagInput } from '../TagInput';
import { ImageField } from '../ImageField';
import { getProjectLayout } from '../../../lib/projectLayout';
import { ProjectLayout } from '../../../types';

interface ProjectsTabProps {
  editLang: 'EN' | 'TR';
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ editLang }) => {
  const confirm = useConfirm();
  const confirmRemove = (title: string) => confirm({
    title,
    message: editLang === 'TR' ? 'Kaydettiğinizde sitede de kaldırılır.' : 'It will also disappear from the site once you save.',
    confirmLabel: editLang === 'TR' ? 'Sil' : 'Delete',
  });
  const { projects, setProjects } = useAdmin();
  const t = adminTranslations.projects;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 bg-white/70 border-black/[0.08] text-gray-900 placeholder-gray-400 hover:border-black/15 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:hover:border-white/25`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 text-gray-600 dark:text-gray-400`;

  const cardClass = `p-6 rounded-2xl border bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`;

  const addProject = () => {
    const newProject = {
      _id: `p${Date.now()}`,
      title: { EN: 'New Project', TR: 'Yeni Proje' },
      category: 'Web',
      description: { EN: 'Description', TR: 'Açıklama' },
      mainImage: '',
      layout: 'standard' as const,
      link: '',
      githubUrl: '',
      startDate: new Date().toISOString().slice(0, 7),
      endDate: '',
      isCurrent: false,
      skills: [],
      showInTimeline: true,
    };
    setProjects([...projects, newProject]);
    setExpandedItems(new Set([...expandedItems, newProject._id]));
  };

  const removeProject = async (id: string) => {
    if (await confirmRemove(editLang === 'TR' ? 'Bu proje silinsin mi?' : 'Remove this project?')) {
      setProjects(projects.filter(p => p._id !== id));
    }
  };

  const updateProject = (id: string, field: string, value: any) => {
    setProjects(projects.map(p => 
      p._id === id ? { ...p, [field]: value } : p
    ));
  };

  // The first edit pins every project's current slot, so nothing else moves on the live grid
  const setLayout = (index: number, layout: ProjectLayout) => {
    setProjects(projects.map((p, i) => ({ ...p, layout: i === index ? layout : getProjectLayout(projects, i) })));
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

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newProjects = [...projects];
      const [dragged] = newProjects.splice(draggedIndex, 1);
      newProjects.splice(dragOverIndex, 0, dragged);
      setProjects(newProjects);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className={cardClass}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-display font-bold text-gray-900 dark:text-white`}>
              {getText(t.title)}
            </h2>
            <p className={`text-sm mt-1 text-gray-600 dark:text-gray-400`}>
              {projects.length} {editLang === 'TR' ? 'proje eklendi' : 'projects added'}
            </p>
          </div>
          
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            {getText(t.addProject)}
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center bg-white/60 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.02] dark:border-white/10`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-black/[0.06] dark:bg-white/[0.06]`}>
              <FolderKanban size={32} className={'text-gray-400 dark:text-gray-500'} />
            </div>
            <p className={`text-lg font-medium text-gray-600 dark:text-gray-400`}>
              {editLang === 'TR' ? 'Henüz proje eklenmedi' : 'No projects added yet'}
            </p>
            <p className={`text-sm mt-1 text-gray-500`}>
              {editLang === 'TR' ? 'Proje eklemek için yukarıdaki butona tıklayın' : 'Click the button above to add a project'}
            </p>
          </div>
        ) : (
          projects.map((project, index) => {
            const isExpanded = expandedItems.has(project._id);
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index && draggedIndex !== index;
            return (
              <div 
                key={project._id} 
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isDragging 
                    ? 'opacity-50 scale-[0.98]' 
                    : isDragOver 
                      ? 'border-primary ring-2 ring-primary/20 dark:ring-primary/30'
                      : 'bg-white/70 border-black/[0.08] hover:border-black/15 backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10 dark:hover:border-white/20'
                } bg-white/70 backdrop-blur-xl dark:bg-white/[0.04]`}
              >
                {/* Card Header */}
                <div 
                  className={`p-4 flex items-center gap-4 cursor-pointer select-none hover:bg-black/[0.03] dark:hover:bg-white/[0.06]`}
                  onClick={() => toggleExpand(project._id)}
                >
                  <GripVertical size={18} className={`cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400`} />
                  
                  {/* Project Image Preview */}
                  <div className={`w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.06]`}>
                    {project.mainImage ? (
                      <img src={project.mainImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Image size={24} className={'text-gray-400 dark:text-gray-500'} />
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold truncate text-gray-900 dark:text-white`}>
                      {getValue(project.title)}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded bg-black/[0.06] text-gray-600 dark:bg-white/10 dark:text-gray-300`}>
                        {project.category}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        getProjectLayout(projects, index) === 'standard'
                          ? 'bg-black/[0.04] text-gray-500 dark:bg-white/10 dark:text-gray-400'
                          : 'bg-primary/10 text-primary dark:bg-primary/20'
                      }`}>
                        {getText(t.layouts[getProjectLayout(projects, index)])}
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
                      className={`p-2 rounded-xl transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10`}
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className={`p-2 rounded-xl text-gray-600 dark:text-gray-400`}>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`p-6 border-t space-y-4 border-black/[0.05] bg-black/[0.02] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
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
                      <ImageField
                        value={project.mainImage}
                        onChange={(url) => updateProject(project._id, 'mainImage', url)}
                        lang={editLang}
                        folder="projects"
                      />
                    </div>

                    {/* Dates & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelClass}>
                          <Tag size={14} />
                          {editLang === 'TR' ? 'Başlangıç Tarihi' : 'Start Date'}
                        </label>
                        <MonthPicker
                          value={project.startDate}
                          onChange={(value) => updateProject(project._id, 'startDate', value)}
                          lang={editLang}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          <Tag size={14} />
                          {editLang === 'TR' ? 'Bitiş Tarihi' : 'End Date'}
                        </label>
                        <MonthPicker
                          value={project.endDate}
                          onChange={(value) => updateProject(project._id, 'endDate', value)}
                          lang={editLang}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Toggle className="mt-6"
                          checked={project.isCurrent || false}
                          onChange={(checked) => updateProject(project._id, 'isCurrent', checked)}
                          label={editLang === 'TR' ? 'Devam Ediyor' : 'Ongoing'}
                        />
                        <Toggle
                          checked={project.showInTimeline !== false}
                          onChange={(checked) => updateProject(project._id, 'showInTimeline', checked)}
                          label={editLang === 'TR' ? 'Timeline\'da Göster' : 'Show in Timeline'}
                        />
                      </div>
                    </div>

                    {/* Skills / Technologies */}
                    <div>
                      <label className={labelClass}>
                        <Tag size={14} />
                        {editLang === 'TR' ? 'Teknolojiler' : 'Technologies'}
                      </label>
                      <TagInput
                        tags={project.skills || []}
                        onChange={(skills) => updateProject(project._id, 'skills', skills)}
                        placeholder="React, TypeScript, Firebase"
                        inputClass={inputClass}
                      />
                    </div>

                    {/* Layout, Link, GitHub */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelClass}>
                          <Layers size={14} />
                          {getText(t.size)}
                        </label>
                        <Select
                          value={getProjectLayout(projects, index)}
                          onChange={(layout) => setLayout(index, layout)}
                          options={(['featured', 'wide', 'standard'] as ProjectLayout[]).map(layout => ({
                            value: layout,
                            label: getText(t.layouts[layout]),
                          }))}
                        />
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
