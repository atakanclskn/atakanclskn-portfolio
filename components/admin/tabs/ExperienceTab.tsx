import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { ExperienceItem, MultiLangText } from '../../../types';
import { 
  Briefcase, GraduationCap, Award, FolderGit2, Plus, Trash2, 
  ChevronDown, ChevronUp, Eye, EyeOff, GripVertical, ExternalLink,
  Building2, MapPin, Calendar, Link as LinkIcon, Hash, Star, ArrowRight
} from 'lucide-react';
import { MonthPicker, Segmented, Select, Toggle, useConfirm } from '../ui';
import { TagInput } from '../TagInput';

interface ExperienceTabProps {
  editLang: 'EN' | 'TR';
  onTabChange?: (tab: string) => void;
}

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  certification: Award,
  project: FolderGit2,
};


export const ExperienceTab: React.FC<ExperienceTabProps> = ({ editLang, onTabChange }) => {
  const confirm = useConfirm();
  const confirmRemove = (title: string) => confirm({
    title,
    message: editLang === 'TR' ? 'Kaydettiğinizde sitede de kaldırılır.' : 'It will also disappear from the site once you save.',
    confirmLabel: editLang === 'TR' ? 'Sil' : 'Delete',
  });
  const { experiences, setExperiences, projects } = useAdmin();
  const t = adminTranslations.experience;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);
  
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [selectedType, setSelectedType] = useState<'all' | 'work' | 'education' | 'certification' | 'project'>('all');

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const addExperience = (type: 'work' | 'education' | 'certification' | 'project') => {
    const typeDefaults = {
      work: { roleEN: 'New Position', roleTR: 'Yeni Pozisyon', companyLabel: 'Company Name' },
      education: { roleEN: 'Degree', roleTR: 'Derece', companyLabel: 'University/School' },
      certification: { roleEN: 'Certification Name', roleTR: 'Sertifika Adı', companyLabel: 'Issuing Organization' },
      project: { roleEN: 'Project Name', roleTR: 'Proje Adı', companyLabel: 'Personal/Company' },
    };
    const defaults = typeDefaults[type];
    
    const baseExp: ExperienceItem = {
      _id: `exp_${Date.now()}`,
      role: { EN: defaults.roleEN, TR: defaults.roleTR },
      company: defaults.companyLabel,
      startDate: new Date().toISOString().slice(0, 7),
      endDate: '',
      isCurrent: type === 'work' || type === 'education',
      description: { EN: 'Description...', TR: 'Açıklama...' },
      skills: [],
      type,
      isVisible: true,
      order: experiences.length,
    };

    // Type-specific defaults
    if (type === 'work') {
      baseExp.location = '';
      baseExp.workType = 'onsite';
      baseExp.employmentType = 'full-time';
    } else if (type === 'education') {
      baseExp.degree = '';
      baseExp.field = '';
      baseExp.gpa = '';
    } else if (type === 'certification') {
      baseExp.issueDate = new Date().toISOString().slice(0, 7);
      baseExp.credentialId = '';
      baseExp.credentialUrl = '';
      baseExp.issuer = '';
    } else if (type === 'project') {
      baseExp.projectDate = new Date().toISOString().slice(0, 7);
      baseExp.projectUrl = '';
      baseExp.githubUrl = '';
      baseExp.technologies = [];
    }

    setExperiences([...experiences, baseExp]);
    setExpandedItems(new Set([...expandedItems, baseExp._id]));
  };

  const removeExperience = async (id: string) => {
    if (await confirmRemove(editLang === 'TR' ? 'Bu kayıt silinsin mi?' : 'Delete this entry?')) {
      setExperiences(experiences.filter(e => e._id !== id));
    }
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setExperiences(experiences.map(e => 
      e._id === id ? { ...e, [field]: value } : e
    ));
  };

  const updateMultiLangField = (id: string, field: string, value: string, currentValue: MultiLangText | string) => {
    const updated = updateMultiLangText(
      typeof currentValue === 'string' ? { EN: currentValue, TR: currentValue } : currentValue,
      value,
      editLang
    );
    updateExperience(id, field, updated);
  };

  const filteredExperiences = selectedType === 'all' 
    ? experiences 
    : experiences.filter(e => e.type === selectedType);

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    // Sort by end date descending (current items first)
    const getEndTime = (item: ExperienceItem) => {
      if (item.isCurrent) return Infinity;
      if (item.endDate) return new Date(item.endDate).getTime();
      return new Date(item.startDate).getTime();
    };
    return getEndTime(b) - getEndTime(a);
  });

  // Input class helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 bg-white/70 border-black/[0.08] text-gray-900 placeholder-gray-400 hover:border-black/15 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:hover:border-white/25`;

  const selectClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-primary/50 bg-white/70 border-black/[0.08] text-gray-900 hover:border-black/15 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:hover:border-white/25`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 text-gray-600 dark:text-gray-400`;

  const cardClass = `rounded-2xl border overflow-hidden transition-all duration-300 bg-white/70 border-black/[0.08] hover:border-black/15 backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10 dark:hover:border-white/20`;

  const renderTypeSpecificFields = (exp: ExperienceItem) => {
    switch (exp.type) {
      case 'work':
        return (
          <div className="space-y-4">
            {/* Location & Work Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>
                  <MapPin size={14} />
                  {getText(t.location)}
                </label>
                <input
                  type="text"
                  placeholder="San Francisco, CA"
                  value={exp.location || ''}
                  onChange={(e) => updateExperience(exp._id, 'location', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Building2 size={14} />
                  {getText(t.workType)}
                </label>
                <Segmented
                  value={exp.workType || 'onsite'}
                  onChange={(workType) => updateExperience(exp._id, 'workType', workType)}
                  options={[
                    { value: 'remote', label: getText(t.remote) },
                    { value: 'hybrid', label: getText(t.hybrid) },
                    { value: 'onsite', label: getText(t.onsite) },
                  ]}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Briefcase size={14} />
                  {getText(t.employmentType)}
                </label>
                <Select
                  value={exp.employmentType || 'full-time'}
                  onChange={(employmentType) => updateExperience(exp._id, 'employmentType', employmentType)}
                  options={[
                    { value: 'full-time', label: getText(t.fullTime) },
                    { value: 'part-time', label: getText(t.partTime) },
                    { value: 'contract', label: getText(t.contract) },
                    { value: 'freelance', label: getText(t.freelance) },
                    { value: 'internship', label: getText(t.internship) },
                  ]}
                />
              </div>
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  <LinkIcon size={14} />
                  {getText(t.companyLogo)}
                </label>
                <input
                  type="url"
                  placeholder="https://company.com/logo.png"
                  value={exp.companyLogo || ''}
                  onChange={(e) => updateExperience(exp._id, 'companyLogo', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <ExternalLink size={14} />
                  {getText(t.companyUrl)}
                </label>
                <input
                  type="url"
                  placeholder="https://company.com"
                  value={exp.companyUrl || ''}
                  onChange={(e) => updateExperience(exp._id, 'companyUrl', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>
                  <Calendar size={14} />
                  {getText(t.startDate)}
                </label>
                <MonthPicker
                  value={exp.startDate}
                  onChange={(value) => updateExperience(exp._id, 'startDate', value)}
                  lang={editLang}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Calendar size={14} />
                  {getText(t.endDate)}
                </label>
                <MonthPicker
                  value={exp.endDate}
                  onChange={(value) => updateExperience(exp._id, 'endDate', value)}
                  lang={editLang}
                  disabled={exp.isCurrent}
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center w-full min-h-[46px] px-3 rounded-xl border border-black/[0.08] bg-white/60 dark:border-white/10 dark:bg-white/[0.03]">
                  <Toggle
                    checked={exp.isCurrent}
                    onChange={(checked) => updateExperience(exp._id, 'isCurrent', checked)}
                    label={getText(t.present)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            {/* Degree & Field */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  <GraduationCap size={14} />
                  {getText(t.degree)}
                </label>
                <input
                  type="text"
                  placeholder="Bachelor's Degree"
                  value={exp.degree || ''}
                  onChange={(e) => updateExperience(exp._id, 'degree', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Star size={14} />
                  {getText(t.field)}
                </label>
                <input
                  type="text"
                  placeholder="Computer Science"
                  value={exp.field || ''}
                  onChange={(e) => updateExperience(exp._id, 'field', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* GPA & Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  <Hash size={14} />
                  {getText(t.gpa)}
                </label>
                <input
                  type="text"
                  placeholder="3.8 / 4.0"
                  value={exp.gpa || ''}
                  onChange={(e) => updateExperience(exp._id, 'gpa', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <ExternalLink size={14} />
                  {getText(t.companyUrl)}
                </label>
                <input
                  type="url"
                  placeholder="https://university.edu"
                  value={exp.companyUrl || ''}
                  onChange={(e) => updateExperience(exp._id, 'companyUrl', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>
                  <Calendar size={14} />
                  {getText(t.startDate)}
                </label>
                <MonthPicker
                  value={exp.startDate}
                  onChange={(value) => updateExperience(exp._id, 'startDate', value)}
                  lang={editLang}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Calendar size={14} />
                  {getText(t.endDate)}
                </label>
                <MonthPicker
                  value={exp.endDate}
                  onChange={(value) => updateExperience(exp._id, 'endDate', value)}
                  lang={editLang}
                  disabled={exp.isCurrent}
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center w-full min-h-[46px] px-3 rounded-xl border border-black/[0.08] bg-white/60 dark:border-white/10 dark:bg-white/[0.03]">
                  <Toggle
                    checked={exp.isCurrent}
                    onChange={(checked) => updateExperience(exp._id, 'isCurrent', checked)}
                    label={getText(t.present)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'certification':
        return (
          <div className="space-y-4">
            {/* Issuer */}
            <div>
              <label className={labelClass}>
                <Building2 size={14} />
                {getText(t.issuer)}
              </label>
              <input
                type="text"
                placeholder="Google, AWS, Microsoft..."
                value={exp.issuer || ''}
                onChange={(e) => updateExperience(exp._id, 'issuer', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  <Calendar size={14} />
                  {getText(t.issueDate)}
                </label>
                <MonthPicker
                  value={exp.issueDate}
                  onChange={(value) => updateExperience(exp._id, 'issueDate', value)}
                  lang={editLang}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Calendar size={14} />
                  {getText(t.expirationDate)}
                  <span className={`text-xs ml-2 text-gray-400 dark:text-gray-500`}>
                    ({getText(t.noExpiration)})
                  </span>
                </label>
                <MonthPicker
                  value={exp.expirationDate}
                  onChange={(value) => updateExperience(exp._id, 'expirationDate', value)}
                  lang={editLang}
                />
              </div>
            </div>

            {/* Credential ID & URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  <Hash size={14} />
                  {getText(t.credentialId)}
                </label>
                <input
                  type="text"
                  placeholder="ABC123XYZ"
                  value={exp.credentialId || ''}
                  onChange={(e) => updateExperience(exp._id, 'credentialId', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <ExternalLink size={14} />
                  {getText(t.credentialUrl)}
                </label>
                <input
                  type="url"
                  placeholder="https://credly.com/badges/..."
                  value={exp.credentialUrl || ''}
                  onChange={(e) => updateExperience(exp._id, 'credentialUrl', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        );

      case 'project':
        return (
          <div className="space-y-4">
            {/* Project Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  <Calendar size={14} />
                  {getText(t.projectDate)}
                </label>
                <MonthPicker
                  value={exp.projectDate}
                  onChange={(value) => updateExperience(exp._id, 'projectDate', value)}
                  lang={editLang}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <LinkIcon size={14} />
                  {getText(t.projectImage)}
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.png"
                  value={exp.projectImage || ''}
                  onChange={(e) => updateExperience(exp._id, 'projectImage', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  <ExternalLink size={14} />
                  {getText(t.projectUrl)}
                </label>
                <input
                  type="url"
                  placeholder="https://myproject.com"
                  value={exp.projectUrl || ''}
                  onChange={(e) => updateExperience(exp._id, 'projectUrl', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <FolderGit2 size={14} />
                  {getText(t.githubUrl)}
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/user/repo"
                  value={exp.githubUrl || ''}
                  onChange={(e) => updateExperience(exp._id, 'githubUrl', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className={labelClass}>
                <Star size={14} />
                {getText(t.technologies)}
              </label>
              <TagInput
                tags={exp.technologies || []}
                onChange={(techs) => updateExperience(exp._id, 'technologies', techs)}
                placeholder="React, Node.js, PostgreSQL..."
                inputClass={inputClass}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header with Type Filter */}
      <div className={`p-6 rounded-2xl border bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-display font-bold text-gray-900 dark:text-white`}>
              {getText(t.title)}
            </h2>
            <p className={`text-sm mt-1 text-gray-600 dark:text-gray-400`}>
              {experiences.length} items total
            </p>
          </div>
          
          {/* Type Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'work', 'education', 'certification', 'project'] as const).map((type) => {
              const Icon = type === 'all' ? null : typeIcons[type];
              const isActive = selectedType === type;
              const projectCount = projects.filter(p => p.showInTimeline !== false).length;
              const count = type === 'all' 
                ? experiences.length + projectCount
                : type === 'project'
                  ? experiences.filter(e => e.type === 'project').length + projectCount
                  : experiences.filter(e => e.type === type).length;
              
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-black/[0.04] text-gray-700 hover:bg-black/[0.06] dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/10'
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  <span>
                    {type === 'all' ? 'All' : getText(t[`type${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof t] as { EN: string; TR: string })}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded-md text-xs ${
                    isActive
                      ? 'bg-black/20'
                      : 'bg-black/[0.06] dark:bg-white/10'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add New Buttons */}
      <div className={`p-4 rounded-2xl border bg-white/60 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.02] dark:border-white/10`}>
        <p className={`text-sm font-medium mb-3 text-gray-600 dark:text-gray-400`}>
          {getText(t.addExperience)}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['work', 'education', 'certification'] as const).map((type) => {
            const Icon = typeIcons[type];
            
            return (
              <button
                key={type}
                onClick={() => addExperience(type)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-black/[0.08] bg-white/60 text-gray-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 font-semibold text-sm transition-colors`}
              >
                <Plus size={18} />
                <Icon size={18} />
                <span>{getText(t[`type${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof typeof t] as { EN: string; TR: string })}</span>
              </button>
            );
          })}
          {/* Project button redirects to Projects tab */}
          <button
            onClick={() => onTabChange?.('projects')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-black/[0.08] bg-white/60 text-gray-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 font-semibold text-sm transition-colors`}
          >
            <FolderGit2 size={18} />
            <span>{getText(t.typeProject as { EN: string; TR: string })}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Experience Items */}
      <div className="space-y-4">
        {sortedExperiences.length === 0 && !(selectedType === 'project' || selectedType === 'all') ? (
          <div className={`p-12 rounded-2xl border text-center bg-white/60 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.02] dark:border-white/10`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-black/[0.06] dark:bg-white/[0.06]`}>
              <Briefcase size={32} className={'text-gray-400 dark:text-gray-500'} />
            </div>
            <p className={`text-lg font-medium text-gray-600 dark:text-gray-400`}>
              {editLang === 'TR' ? 'Henüz deneyim eklenmedi' : 'No experiences yet'}
            </p>
            <p className={`text-sm mt-1 text-gray-500`}>
              {editLang === 'TR' ? 'Yukarıdaki butonlardan ekleyin' : 'Add your first experience using the buttons above'}
            </p>
          </div>
        ) : sortedExperiences.length === 0 && selectedType === 'all' && projects.filter(p => p.showInTimeline !== false).length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center bg-white/60 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.02] dark:border-white/10`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-black/[0.06] dark:bg-white/[0.06]`}>
              <Briefcase size={32} className={'text-gray-400 dark:text-gray-500'} />
            </div>
            <p className={`text-lg font-medium text-gray-600 dark:text-gray-400`}>
              {editLang === 'TR' ? 'Henüz deneyim eklenmedi' : 'No experiences yet'}
            </p>
            <p className={`text-sm mt-1 text-gray-500`}>
              {editLang === 'TR' ? 'Yukarıdaki butonlardan ekleyin' : 'Add your first experience using the buttons above'}
            </p>
          </div>
        ) : (
          sortedExperiences.map((exp) => {
            const Icon = typeIcons[exp.type || 'work'];
            const isExpanded = expandedItems.has(exp._id);
            const roleText = typeof exp.role === 'string' ? exp.role : exp.role[editLang];

            return (
              <div key={exp._id} className={cardClass}>
                {/* Card Header */}
                <div 
                  className={`p-4 flex items-center gap-4 cursor-pointer select-none hover:bg-black/[0.03] dark:hover:bg-white/[0.06]`}
                  onClick={() => toggleExpand(exp._id)}
                >
                  {/* Drag Handle & Icon */}
                  <div className="flex items-center gap-2">
                    <GripVertical size={18} className={`cursor-grab text-gray-400 dark:text-gray-500`} />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-black/[0.04] text-gray-600 dark:bg-white/[0.06] dark:text-gray-300`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Title & Meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold truncate text-gray-900 dark:text-white`}>
                        {roleText || 'Untitled'}
                      </h3>
                      {!exp.isVisible && (
                        <EyeOff size={14} className="text-gray-500" />
                      )}
                    </div>
                    <p className={`text-sm truncate text-gray-600 dark:text-gray-400`}>
                      {exp.company || (exp.type === 'certification' ? exp.issuer : 'No company')}
                      {exp.type === 'work' && exp.location && ` • ${exp.location}`}
                      {exp.type === 'certification' && exp.issueDate && ` • ${exp.issueDate}`}
                      {exp.type === 'project' && exp.projectDate && ` • ${exp.projectDate}`}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateExperience(exp._id, 'isVisible', !exp.isVisible);
                      }}
                      className={`p-2 rounded-xl transition-colors hover:bg-black/[0.06] dark:hover:bg-white/10`}
                    >
                      {exp.isVisible !== false ? (
                        <Eye size={18} className="text-green-500" />
                      ) : (
                        <EyeOff size={18} className="text-gray-500" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExperience(exp._id);
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
                  <div className={`p-6 border-t space-y-6 border-black/[0.05] bg-black/[0.02] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
                    {/* Basic Info Section */}
                    <div className="space-y-4">
                      <h4 className={`text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500`}>
                        {getText(t.basicInfo)}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>
                            <Briefcase size={14} />
                            {getText(t.role)} ({editLang})
                          </label>
                          <input
                            type="text"
                            placeholder={editLang === 'EN' ? 'Senior Developer' : 'Kıdemli Geliştirici'}
                            value={roleText}
                            onChange={(e) => updateMultiLangField(exp._id, 'role', e.target.value, exp.role)}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>
                            <Building2 size={14} />
                            {exp.type === 'education' ? getText(t.school) : getText(t.company)}
                          </label>
                          <input
                            type="text"
                            placeholder={exp.type === 'education' ? 'Stanford University' : 'Company Inc.'}
                            value={exp.company}
                            onChange={(e) => updateExperience(exp._id, 'company', e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className={labelClass}>
                          {getText(t.description)} ({editLang})
                        </label>
                        <textarea
                          rows={3}
                          placeholder={editLang === 'EN' ? 'Describe your role and achievements...' : 'Rolünüzü ve başarılarınızı açıklayın...'}
                          value={typeof exp.description === 'string' ? exp.description : exp.description[editLang]}
                          onChange={(e) => updateMultiLangField(exp._id, 'description', e.target.value, exp.description)}
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                    </div>

                    {/* Type-specific Fields */}
                    <div className="space-y-4">
                      <h4 className={`text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500`}>
                        {getText(t.details)}
                      </h4>
                      {renderTypeSpecificFields(exp)}
                    </div>

                    {/* Skills Section (for work and education) */}
                    {(exp.type === 'work' || exp.type === 'education') && (
                      <div className="space-y-4">
                        <h4 className={`text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500`}>
                          {getText(t.skills)}
                        </h4>
                        <TagInput
                          tags={exp.skills || []}
                          onChange={(skills) => updateExperience(exp._id, 'skills', skills)}
                          placeholder="JavaScript, React, Node.js..."
                          inputClass={inputClass}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Projects from Projects Tab (passive, read-only) */}
        {(selectedType === 'all' || selectedType === 'project') && projects.filter(p => p.showInTimeline !== false).length > 0 && (
          <>
            <div className={`flex items-center gap-3 mt-6 mb-3 text-gray-400 dark:text-gray-500`}>
              <FolderGit2 size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {editLang === 'TR' ? 'Projeler (Projeler Sekmesinden)' : 'Projects (from Projects Tab)'}
              </span>
              <div className={`flex-1 h-px bg-black/[0.06] dark:bg-white/[0.06]`} />
              <button
                onClick={() => onTabChange?.('projects')}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                {editLang === 'TR' ? 'Düzenle' : 'Edit'}
                <ArrowRight size={14} />
              </button>
            </div>
            {projects.filter(p => p.showInTimeline !== false).map((project) => {
              const titleText = typeof project.title === 'string' ? project.title : project.title[editLang];
              return (
                <div
                  key={`proj-${project._id}`}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 opacity-70 cursor-pointer bg-white/50 border-black/[0.08] hover:border-emerald-300 hover:opacity-100 backdrop-blur-xl dark:bg-white/[0.02] dark:border-white/10 dark:hover:border-emerald-800`}
                  onClick={() => onTabChange?.('projects')}
                >
                  <div className={`p-4 flex items-center gap-4`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-black/[0.04] text-gray-600 dark:bg-white/[0.06] dark:text-gray-300`}>
                      <FolderGit2 size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold truncate text-gray-900 dark:text-white`}>
                        {titleText}
                      </h3>
                      <p className={`text-sm truncate text-gray-600 dark:text-gray-400`}>
                        {project.category}{project.startDate ? ` • ${project.startDate}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.skills && project.skills.length > 0 && (
                        <div className="hidden md:flex gap-1">
                          {project.skills.slice(0, 3).map((skill, i) => (
                            <span key={i} className={`text-[10px] px-2 py-0.5 rounded bg-black/[0.04] text-gray-500 dark:bg-white/[0.06] dark:text-gray-400`}>{skill}</span>
                          ))}
                        </div>
                      )}
                      <div className={`flex items-center gap-1 text-xs font-medium text-primary`}>
                        <span>{editLang === 'TR' ? 'Düzenle' : 'Edit'}</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
