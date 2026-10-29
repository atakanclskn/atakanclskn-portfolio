import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import * as LucideIcons from 'lucide-react';
import { useConfirm } from '../ui';
import { 
  Plus, Trash2, ChevronDown, ChevronUp, GripVertical, 
  Link, Globe, Search, Check, ExternalLink, AtSign
} from 'lucide-react';

interface SocialsTabProps {
  editLang: 'EN' | 'TR';
}

// Categorized social icons for better UX
const SOCIAL_ICON_CATEGORIES = {
  popular: {
    label: { EN: 'Popular', TR: 'Popüler' },
    icons: ['Github', 'Linkedin', 'Twitter', 'Instagram', 'Facebook', 'Youtube']
  },
  messaging: {
    label: { EN: 'Messaging', TR: 'Mesajlaşma' },
    icons: ['Discord', 'Slack', 'MessageCircle', 'Send', 'Mail']
  },
  streaming: {
    label: { EN: 'Streaming', TR: 'Yayın' },
    icons: ['Twitch', 'Youtube', 'Video', 'Music']
  },
  contact: {
    label: { EN: 'Contact', TR: 'İletişim' },
    icons: ['Phone', 'Smartphone', 'Mail', 'MapPin']
  },
  other: {
    label: { EN: 'Other', TR: 'Diğer' },
    icons: ['Globe', 'Link', 'ExternalLink', 'Share2', 'Rss', 'Bookmark']
  }
};

const ALL_SOCIAL_ICONS = [
  'Github', 'Linkedin', 'Twitter', 'Instagram', 'Facebook', 'Youtube',
  'Twitch', 'Discord', 'Slack', 'Mail', 'Globe', 'Link',
  'MessageCircle', 'Send', 'Phone', 'Smartphone', 'Video', 'Music',
  'MapPin', 'ExternalLink', 'Share2', 'Rss', 'Bookmark', 'AtSign'
];

export const SocialsTab: React.FC<SocialsTabProps> = ({ editLang }) => {
  const confirm = useConfirm();
  const confirmRemove = (title: string) => confirm({
    title,
    message: editLang === 'TR' ? 'Kaydettiğinizde sitede de kaldırılır.' : 'It will also disappear from the site once you save.',
    confirmLabel: editLang === 'TR' ? 'Sil' : 'Delete',
  });
  const { socials, setSocials } = useAdmin();
  const t = adminTranslations.socials;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [iconSearch, setIconSearch] = useState('');
  const [selectingIconFor, setSelectingIconFor] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => { e.preventDefault(); setDragOverIndex(index); };
  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newSocials = [...socials];
      const [dragged] = newSocials.splice(draggedIndex, 1);
      newSocials.splice(dragOverIndex, 0, dragged);
      setSocials(newSocials);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 bg-white/70 border-black/[0.08] text-gray-900 placeholder-gray-400 hover:border-black/15 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:hover:border-white/25`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 text-gray-600 dark:text-gray-400`;

  const cardClass = `p-6 rounded-2xl border bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`;

  const addSocial = () => {
    const newSocial = {
      _id: `s${Date.now()}`,
      platform: editLang === 'TR' ? 'Yeni Platform' : 'New Platform',
      url: '',
      username: '',
      iconName: 'Link'
    };
    setSocials([...socials, newSocial]);
    setExpandedItems(new Set([...expandedItems, newSocial._id]));
  };

  const removeSocial = async (id: string) => {
    if (await confirmRemove(getText(t.removeConfirm))) {
      setSocials(socials.filter(s => s._id !== id));
    }
  };

  const updateSocial = (id: string, field: string, value: any) => {
    setSocials(socials.map(s => 
      s._id === id ? { ...s, [field]: value } : s
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

  // Filter icons based on category and search
  const getFilteredIcons = () => {
    let icons: string[] = [];
    
    if (activeCategory === 'all') {
      icons = ALL_SOCIAL_ICONS;
    } else {
      icons = SOCIAL_ICON_CATEGORIES[activeCategory as keyof typeof SOCIAL_ICON_CATEGORIES]?.icons || [];
    }

    if (iconSearch) {
      icons = icons.filter(icon => icon.toLowerCase().includes(iconSearch.toLowerCase()));
    }

    return [...new Set(icons)]; // Remove duplicates
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
              {socials.length} {getText(t.linksCount)}
            </p>
          </div>
          
          <button
            onClick={addSocial}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            {getText(t.addSocial)}
          </button>
        </div>
      </div>

      {/* Socials List */}
      <div className="space-y-3">
        {socials.length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center bg-white/60 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.02] dark:border-white/10`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-black/[0.06] dark:bg-white/[0.06]`}>
              <Globe size={32} className={'text-gray-400 dark:text-gray-500'} />
            </div>
            <p className={`text-lg font-medium text-gray-600 dark:text-gray-400`}>
              {getText(t.noLinksAdded)}
            </p>
            <p className={`text-sm mt-1 text-gray-500`}>
              {getText(t.clickToStart)}
            </p>
          </div>
        ) : (
          socials.map((social, index) => {
            const isExpanded = expandedItems.has(social._id);
            const IconComponent = (LucideIcons as any)[social.iconName] || LucideIcons.Link;
            const isSelectingIcon = selectingIconFor === social._id;
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index && draggedIndex !== index;
            
            return (
              <div 
                key={social._id}
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
                  onClick={() => toggleExpand(social._id)}
                >
                  <GripVertical size={18} className={`cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400`} />
                  
                  {/* Social Icon */}
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <IconComponent size={22} className="text-primary" />
                  </div>

                  {/* Platform & URL */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold truncate text-gray-900 dark:text-white`}>
                      {social.platform}
                    </h3>
                    <p className={`text-sm truncate text-gray-500`}>
                      {social.url || getText(t.urlPlaceholder)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {social.url && (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`p-2 rounded-xl transition-colors hover:bg-black/[0.04] text-gray-500 dark:hover:bg-white/10 dark:text-gray-400`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSocial(social._id);
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
                  <div className={`p-6 border-t space-y-5 border-black/[0.05] bg-black/[0.02] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
                    {/* Platform Name & Username */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          <Globe size={14} />
                          {getText(t.platformName)}
                        </label>
                        <input
                          type="text"
                          value={social.platform}
                          onChange={(e) => updateSocial(social._id, 'platform', e.target.value)}
                          className={inputClass}
                          placeholder="GitHub, LinkedIn, etc."
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          <AtSign size={14} />
                          {getText(t.username)}
                        </label>
                        <input
                          type="text"
                          value={social.username || ''}
                          onChange={(e) => updateSocial(social._id, 'username', e.target.value)}
                          className={inputClass}
                          placeholder="@username"
                        />
                      </div>
                    </div>

                    {/* URL */}
                    <div>
                      <label className={labelClass}>
                        <Link size={14} />
                        {getText(t.url)}
                      </label>
                      <input
                        type="text"
                        value={social.url}
                        onChange={(e) => updateSocial(social._id, 'url', e.target.value)}
                        className={inputClass}
                        placeholder="https://github.com/username"
                      />
                    </div>

                    {/* Icon Selection */}
                    <div>
                      <label className={labelClass}>
                        <LucideIcons.Palette size={14} />
                        {getText(t.icon)}
                      </label>
                      
                      {/* Current Icon & Select Button */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.06]`}>
                          <IconComponent size={24} className="text-primary" />
                        </div>
                        <span className={'text-gray-700 dark:text-gray-300'}>
                          {social.iconName}
                        </span>
                        <button
                          onClick={() => setSelectingIconFor(isSelectingIcon ? null : social._id)}
                          className={`px-3 py-1.5 text-xs rounded-xl font-medium ${
                            isSelectingIcon
                              ? 'bg-primary text-white'
                              : 'bg-black/[0.06] text-gray-700 hover:bg-gray-300 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15'
                          }`}
                        >
                          {isSelectingIcon ? getText(t.close || adminTranslations.actions.close) : getText(t.changeIcon)}
                        </button>
                      </div>

                      {/* Icon Selector Panel */}
                      {isSelectingIcon && (
                        <div className={`p-4 rounded-xl border bg-white/70 border-black/[0.08] dark:bg-white/[0.05] dark:border-white/10`}>
                          {/* Search */}
                          <div className="relative mb-4">
                            <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500`} />
                            <input
                              type="text"
                              value={iconSearch}
                              onChange={(e) => setIconSearch(e.target.value)}
                              placeholder={editLang === 'TR' ? 'İkon ara...' : 'Search icons...'}
                              className={`w-full pl-10 pr-4 py-2 text-sm rounded-xl border bg-white/60 border-black/[0.08] text-gray-900 placeholder-gray-400 backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/20 dark:text-white dark:placeholder-gray-500`}
                            />
                          </div>

                          {/* Category Tabs */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <button
                              onClick={() => setActiveCategory('all')}
                              className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-colors ${
                                activeCategory === 'all'
                                  ? 'bg-primary text-white'
                                  : 'bg-black/[0.04] text-gray-600 hover:bg-black/[0.06] dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15'
                              }`}
                            >
                              {editLang === 'TR' ? 'Tümü' : 'All'}
                            </button>
                            {Object.entries(SOCIAL_ICON_CATEGORIES).map(([key, cat]) => (
                              <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-colors ${
                                  activeCategory === key
                                    ? 'bg-primary text-white'
                                    : 'bg-black/[0.04] text-gray-600 hover:bg-black/[0.06] dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15'
                                }`}
                              >
                                {getText(cat.label)}
                              </button>
                            ))}
                          </div>

                          {/* Icons Grid */}
                          <div className="grid grid-cols-6 md:grid-cols-8 gap-2 max-h-[200px] overflow-y-auto">
                            {getFilteredIcons().map(iconName => {
                              const Icon = (LucideIcons as any)[iconName] || LucideIcons.Link;
                              const isSelected = social.iconName === iconName;
                              return (
                                <button
                                  key={iconName}
                                  onClick={() => {
                                    updateSocial(social._id, 'iconName', iconName);
                                    setSelectingIconFor(null);
                                    setIconSearch('');
                                  }}
                                  title={iconName}
                                  className={`relative p-3 rounded-xl flex items-center justify-center transition-all ${
                                    isSelected
                                      ? 'bg-primary text-white scale-110'
                                      : 'bg-black/[0.04] text-gray-600 hover:bg-black/[0.06] hover:scale-105 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15'
                                  }`}
                                >
                                  <Icon size={20} />
                                  {isSelected && (
                                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                                      <Check size={10} className="text-white" />
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
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
