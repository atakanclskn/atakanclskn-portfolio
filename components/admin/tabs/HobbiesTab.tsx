import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { t, adminTranslations } from '../../../lib/adminTranslations';
import * as LucideIcons from 'lucide-react';
import { useConfirm } from '../ui';
import { 
  Plus, Trash2, Search, GripVertical, 
  ChevronDown, ChevronUp, Tag
} from 'lucide-react';

interface HobbiesTabProps {
  editLang: 'EN' | 'TR';
}

// Categorized hobby icons
const HOBBY_CATEGORIES: Record<string, { name: string; icon: string; color: string }[]> = {
  'Gaming & Entertainment': [
    { name: 'Gaming', icon: 'Gamepad2', color: '8B5CF6' },
    { name: 'Video Games', icon: 'Joystick', color: '6366F1' },
    { name: 'Movies', icon: 'Film', color: 'EF4444' },
    { name: 'TV Shows', icon: 'Tv', color: '3B82F6' },
    { name: 'Streaming', icon: 'Play', color: 'EC4899' },
    { name: 'Board Games', icon: 'Dice5', color: 'F59E0B' },
    { name: 'Puzzles', icon: 'Puzzle', color: '10B981' },
  ],
  'Music & Audio': [
    { name: 'Music', icon: 'Music', color: 'EC4899' },
    { name: 'Listening', icon: 'Headphones', color: '8B5CF6' },
    { name: 'Singing', icon: 'Mic', color: 'F43F5E' },
    { name: 'Guitar', icon: 'Guitar', color: 'D97706' },
    { name: 'Piano', icon: 'Piano', color: '1F2937' },
    { name: 'Podcasts', icon: 'Podcast', color: '7C3AED' },
    { name: 'Radio', icon: 'Radio', color: '06B6D4' },
  ],
  'Sports & Fitness': [
    { name: 'Fitness', icon: 'Dumbbell', color: 'EF4444' },
    { name: 'Running', icon: 'Footprints', color: '10B981' },
    { name: 'Cycling', icon: 'Bike', color: '3B82F6' },
    { name: 'Swimming', icon: 'Waves', color: '06B6D4' },
    { name: 'Tennis', icon: 'Tennis', color: '84CC16' },
    { name: 'Basketball', icon: 'CircleDot', color: 'F97316' },
    { name: 'Football', icon: 'Trophy', color: '10B981' },
    { name: 'Yoga', icon: 'Sparkles', color: '8B5CF6' },
    { name: 'Hiking', icon: 'Mountain', color: '059669' },
    { name: 'Climbing', icon: 'MountainSnow', color: '64748B' },
  ],
  'Creative': [
    { name: 'Photography', icon: 'Camera', color: '1F2937' },
    { name: 'Art', icon: 'Palette', color: 'EC4899' },
    { name: 'Drawing', icon: 'Pen', color: '6366F1' },
    { name: 'Painting', icon: 'Brush', color: 'F59E0B' },
    { name: 'Design', icon: 'PenTool', color: '8B5CF6' },
    { name: 'Crafts', icon: 'Scissors', color: 'F43F5E' },
    { name: 'Writing', icon: 'Feather', color: '64748B' },
    { name: 'Blogging', icon: 'FileText', color: '3B82F6' },
  ],
  'Technology': [
    { name: 'Coding', icon: 'Code2', color: '10B981' },
    { name: 'Programming', icon: 'Terminal', color: '1F2937' },
    { name: 'Tech', icon: 'Cpu', color: '6366F1' },
    { name: 'Robotics', icon: 'Bot', color: '8B5CF6' },
    { name: '3D Printing', icon: 'Box', color: 'F59E0B' },
    { name: 'Electronics', icon: 'Zap', color: 'EAB308' },
    { name: 'AI & ML', icon: 'Brain', color: 'EC4899' },
  ],
  'Learning': [
    { name: 'Reading', icon: 'BookOpen', color: 'D97706' },
    { name: 'Learning', icon: 'GraduationCap', color: '3B82F6' },
    { name: 'Languages', icon: 'Languages', color: '10B981' },
    { name: 'Research', icon: 'Search', color: '6366F1' },
    { name: 'Science', icon: 'FlaskConical', color: '8B5CF6' },
    { name: 'History', icon: 'Landmark', color: 'B45309' },
    { name: 'Philosophy', icon: 'Lightbulb', color: 'F59E0B' },
  ],
  'Food & Drinks': [
    { name: 'Cooking', icon: 'ChefHat', color: 'EF4444' },
    { name: 'Baking', icon: 'Cake', color: 'EC4899' },
    { name: 'Coffee', icon: 'Coffee', color: '92400E' },
    { name: 'Wine', icon: 'Wine', color: '7C2D12' },
    { name: 'Food', icon: 'UtensilsCrossed', color: 'F59E0B' },
    { name: 'BBQ', icon: 'Flame', color: 'F97316' },
  ],
  'Travel & Nature': [
    { name: 'Travel', icon: 'Plane', color: '3B82F6' },
    { name: 'Camping', icon: 'Tent', color: '059669' },
    { name: 'Nature', icon: 'TreePine', color: '16A34A' },
    { name: 'Gardening', icon: 'Flower2', color: 'EC4899' },
    { name: 'Beach', icon: 'Umbrella', color: 'F97316' },
    { name: 'Exploring', icon: 'Compass', color: '6366F1' },
    { name: 'Stargazing', icon: 'Star', color: 'EAB308' },
  ],
  'Social': [
    { name: 'Friends', icon: 'Users', color: '3B82F6' },
    { name: 'Family', icon: 'Heart', color: 'EF4444' },
    { name: 'Socializing', icon: 'MessageCircle', color: '10B981' },
    { name: 'Volunteering', icon: 'HandHeart', color: 'EC4899' },
    { name: 'Networking', icon: 'Network', color: '6366F1' },
    { name: 'Parties', icon: 'PartyPopper', color: 'F59E0B' },
  ],
  'Relaxation': [
    { name: 'Meditation', icon: 'Moon', color: '8B5CF6' },
    { name: 'Spa', icon: 'Sparkles', color: 'EC4899' },
    { name: 'Sleeping', icon: 'BedDouble', color: '6366F1' },
    { name: 'Relaxing', icon: 'Sofa', color: 'D97706' },
    { name: 'Nature Walks', icon: 'TreeDeciduous', color: '16A34A' },
  ],
  'Pets & Animals': [
    { name: 'Dogs', icon: 'Dog', color: 'D97706' },
    { name: 'Cats', icon: 'Cat', color: 'F97316' },
    { name: 'Pets', icon: 'PawPrint', color: '92400E' },
    { name: 'Birds', icon: 'Bird', color: '3B82F6' },
    { name: 'Fish', icon: 'Fish', color: '06B6D4' },
  ],
};

// Flatten all hobbies for search
const ALL_HOBBIES = Object.entries(HOBBY_CATEGORIES).flatMap(([category, items]) =>
  items.map(item => ({ ...item, category }))
);

// Category key mapping for translations
const CATEGORY_KEYS: Record<string, string> = {
  'Gaming & Entertainment': 'gaming',
  'Music & Audio': 'music',
  'Sports & Fitness': 'sports',
  'Creative': 'creative',
  'Technology': 'technology',
  'Learning': 'learning',
  'Food & Drinks': 'food',
  'Travel & Nature': 'travel',
  'Social': 'social',
  'Relaxation': 'relaxation',
  'Pets & Animals': 'pets',
};

export const HobbiesTab: React.FC<HobbiesTabProps> = ({ editLang }) => {
  const confirm = useConfirm();
  const confirmRemove = (title: string) => confirm({
    title,
    message: editLang === 'TR' ? 'Kaydettiğinizde sitede de kaldırılır.' : 'It will also disappear from the site once you save.',
    confirmLabel: editLang === 'TR' ? 'Sil' : 'Delete',
  });
  const { hobbies, setHobbies } = useAdmin();

  // Helper to get category translation
  const getCategoryName = (category: string) => {
    const key = CATEGORY_KEYS[category];
    if (key && adminTranslations.hobbies.categories && (adminTranslations.hobbies.categories as any)[key]) {
      return (adminTranslations.hobbies.categories as any)[key][editLang];
    }
    return category;
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => setDraggedIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => { e.preventDefault(); setDragOverIndex(index); };
  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const newHobbies = [...hobbies];
      const [dragged] = newHobbies.splice(draggedIndex, 1);
      newHobbies.splice(dragOverIndex, 0, dragged);
      setHobbies(newHobbies);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Filter hobbies based on search and category
  const filteredHobbies = ALL_HOBBIES.filter(hobby => {
    const matchesSearch = hobby.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || hobby.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addHobby = (hobby: typeof ALL_HOBBIES[0]) => {
    const newHobby = {
      _id: `hobby_${Date.now()}`,
      icon: hobby.icon,
      label: { EN: hobby.name, TR: hobby.name },
    };
    setHobbies([...hobbies, newHobby]);
  };

  const addCustomHobby = () => {
    const newHobby = {
      _id: `hobby_${Date.now()}`,
      icon: 'Heart',
      label: { EN: 'Custom Hobby', TR: 'Özel Hobi' },
    };
    setHobbies([...hobbies, newHobby]);
    setExpandedItems(new Set([...expandedItems, newHobby._id]));
  };

  const removeHobby = async (id: string) => {
    if (await confirmRemove(t('hobbies.removeConfirm', editLang))) {
      setHobbies(hobbies.filter(h => h._id !== id));
    }
  };

  const updateHobby = (id: string, field: string, value: any) => {
    setHobbies(hobbies.map(h => 
      h._id === id ? { ...h, [field]: value } : h
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
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 bg-white/70 border-black/[0.08] text-gray-900 placeholder-gray-400 hover:border-black/15 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:hover:border-white/25`;

  const cardClass = `rounded-2xl border overflow-hidden transition-all duration-300 bg-white/70 border-black/[0.08] hover:border-black/15 backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10 dark:hover:border-white/20`;

  // Get icon component
  const getIconComponent = (iconName: string) => {
    return (LucideIcons as any)[iconName] || LucideIcons.Heart;
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className={`p-6 rounded-2xl border bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-xl font-display font-bold text-gray-900 dark:text-white`}>
              {t('hobbies.title', editLang)}
            </h2>
            <p className={`text-sm mt-1 text-gray-600 dark:text-gray-400`}>
              {hobbies.length} {t('hobbies.hobbiesCount', editLang)}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddPanel(!showAddPanel)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                showAddPanel
                  ? 'bg-primary text-white'
                  : 'bg-black/[0.04] text-gray-700 hover:bg-black/[0.06] dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/10'
              }`}
            >
              <Plus size={18} />
              {t('hobbies.addHobby', editLang)}
            </button>
          </div>
        </div>
      </div>

      {/* Add Panel */}
      {showAddPanel && (
        <div className={`p-6 rounded-2xl border bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`}>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500`} />
              <input
                type="text"
                placeholder={t('hobbies.searchPlaceholder', editLang)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-primary text-white'
                    : 'bg-black/[0.04] text-gray-700 hover:bg-black/[0.06] dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/10'
                }`}
              >
                {t('hobbies.all', editLang)}
              </button>
              {Object.keys(HOBBY_CATEGORIES).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-black/[0.04] text-gray-700 hover:bg-black/[0.06] dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/10'
                  }`}
                >
                  {getCategoryName(category)}
                </button>
              ))}
            </div>

            {/* Hobby Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-80 overflow-y-auto">
              {filteredHobbies.map(hobby => {
                const IconComponent = getIconComponent(hobby.icon);
                return (
                  <button
                    key={`${hobby.category}-${hobby.icon}`}
                    onClick={() => addHobby(hobby)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all hover:scale-105 bg-white/60 border-black/[0.08] hover:border-black/15 dark:bg-white/[0.05] dark:border-white/10 dark:hover:border-white/25`}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `#${hobby.color}20` }}
                    >
                      <IconComponent size={22} style={{ color: `#${hobby.color}` }} />
                    </div>
                    <span className={`text-xs font-medium text-center text-gray-700 dark:text-gray-300`}>
                      {hobby.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredHobbies.length === 0 && (
              <div className={`text-center py-8 text-gray-400 dark:text-gray-500`}>
                {t('hobbies.noHobbiesFound', editLang)}
              </div>
            )}

            {/* Custom Hobby Button */}
            <button
              onClick={addCustomHobby}
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed transition-all border-black/10 text-gray-500 hover:border-gray-400 hover:text-gray-600 dark:border-white/10 dark:text-gray-400 dark:hover:border-white/25 dark:hover:text-gray-300`}
            >
              <Plus size={18} />
              {t('hobbies.addCustomHobby', editLang)}
            </button>
          </div>
        </div>
      )}

      {/* Added Hobbies */}
      <div className="space-y-3">
        {hobbies.length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center bg-white/60 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.02] dark:border-white/10`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-black/[0.06] dark:bg-white/[0.06]`}>
              <LucideIcons.Heart size={32} className={'text-gray-400 dark:text-gray-500'} />
            </div>
            <p className={`text-lg font-medium text-gray-600 dark:text-gray-400`}>
              {t('hobbies.noHobbiesAdded', editLang)}
            </p>
            <p className={`text-sm mt-1 text-gray-500`}>
              {t('hobbies.clickToStart', editLang)}
            </p>
          </div>
        ) : (
          hobbies.map((hobby, index) => {
            const isExpanded = expandedItems.has(hobby._id);
            const IconComponent = getIconComponent(hobby.icon);
            const hobbyInfo = ALL_HOBBIES.find(h => h.icon === hobby.icon);
            const iconColor = hobbyInfo?.color || '6366F1';
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index && draggedIndex !== index;

            return (
              <div 
                key={hobby._id}
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
                  onClick={() => toggleExpand(hobby._id)}
                >
                  {/* Drag Handle & Icon */}
                  <div className="flex items-center gap-3">
                    <GripVertical size={18} className={`cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400`} />
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `#${iconColor}20` }}
                    >
                      <IconComponent size={24} style={{ color: `#${iconColor}` }} />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold truncate text-gray-900 dark:text-white`}>
                      {typeof hobby.label === 'string' ? hobby.label : hobby.label[editLang]}
                    </h3>
                    <p className={`text-sm truncate text-gray-600 dark:text-gray-400`}>
                      {hobby.icon}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeHobby(hobby._id);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`text-xs font-medium mb-1.5 flex items-center gap-1.5 text-gray-600 dark:text-gray-400`}>
                          <Tag size={14} />
                          {t('hobbies.labelEN', editLang)}
                        </label>
                        <input
                          type="text"
                          value={typeof hobby.label === 'string' ? hobby.label : hobby.label.EN}
                          onChange={(e) => updateHobby(hobby._id, 'label', { 
                            ...hobby.label as { EN: string; TR: string }, 
                            EN: e.target.value 
                          })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={`text-xs font-medium mb-1.5 flex items-center gap-1.5 text-gray-600 dark:text-gray-400`}>
                          <Tag size={14} />
                          {t('hobbies.labelTR', editLang)}
                        </label>
                        <input
                          type="text"
                          value={typeof hobby.label === 'string' ? hobby.label : hobby.label.TR}
                          onChange={(e) => updateHobby(hobby._id, 'label', { 
                            ...hobby.label as { EN: string; TR: string }, 
                            TR: e.target.value 
                          })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Icon Selector */}
                    <div>
                      <label className={`text-xs font-medium mb-1.5 flex items-center gap-1.5 text-gray-600 dark:text-gray-400`}>
                        {t('hobbies.icon', editLang)}
                      </label>
                      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-40 overflow-y-auto p-2 rounded-xl border border-black/[0.08] bg-white/60 dark:border-white/10 dark:bg-white/[0.05]">
                        {ALL_HOBBIES.map(h => {
                          const HobbyIcon = getIconComponent(h.icon);
                          const isSelected = hobby.icon === h.icon;
                          return (
                            <button
                              key={`${h.category}-${h.icon}`}
                              onClick={() => updateHobby(hobby._id, 'icon', h.icon)}
                              className={`p-2 rounded-xl transition-all ${
                                isSelected
                                  ? 'bg-primary/20 ring-2 ring-primary'
                                  : 'hover:bg-black/[0.06] dark:hover:bg-white/10'
                              }`}
                              title={h.name}
                            >
                              <HobbyIcon size={20} style={{ color: `#${h.color}` }} />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preview */}
                    <div className={`p-4 rounded-xl bg-black/[0.04] dark:bg-white/[0.06]`}>
                      <p className={`text-xs font-medium mb-3 text-gray-600 dark:text-gray-400`}>
                        {t('hobbies.preview', editLang)}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-2 bg-gray-200 dark:bg-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <IconComponent size={16} style={{ color: `#${iconColor}` }} />
                          {typeof hobby.label === 'string' ? hobby.label : hobby.label[editLang]}
                        </span>
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
