import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { AboutParagraph } from '../../../types';
import { 
  AlignLeft, Quote, Plus, Trash2, ChevronDown, ChevronUp,
  Type, FileText, BarChart3, GripVertical, Hash, Tag
} from 'lucide-react';
import { NumberStepper, Segmented, useConfirm } from '../ui';

interface AboutTabProps {
  editLang: 'EN' | 'TR';
}

export const AboutTab: React.FC<AboutTabProps> = ({ editLang }) => {
  const confirm = useConfirm();
  const confirmRemove = (title: string) => confirm({
    title,
    message: editLang === 'TR' ? 'Kaydettiğinizde sitede de kaldırılır.' : 'It will also disappear from the site once you save.',
    confirmLabel: editLang === 'TR' ? 'Sil' : 'Delete',
  });
  const { aboutContent, setAboutContent, statsContent, setStatsContent } = useAdmin();
  const t = adminTranslations.about;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedStats, setExpandedStats] = useState<Set<string>>(new Set());

  // Drag state for paragraphs
  const [draggedParagraph, setDraggedParagraph] = useState<number | null>(null);
  const [dragOverParagraph, setDragOverParagraph] = useState<number | null>(null);

  // Drag state for stats
  const [draggedStat, setDraggedStat] = useState<number | null>(null);
  const [dragOverStat, setDragOverStat] = useState<number | null>(null);

  // Styling helpers
  const inputClass = `w-full border rounded-xl p-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-primary/50 bg-white/70 border-black/[0.08] text-gray-900 placeholder-gray-400 hover:border-black/15 dark:bg-white/[0.06] dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:hover:border-white/25`;

  const labelClass = `text-xs font-medium mb-1.5 flex items-center gap-1.5 text-gray-600 dark:text-gray-400`;

  const cardClass = `p-6 rounded-2xl border bg-white/70 border-black/[0.08] backdrop-blur-xl dark:bg-white/[0.04] dark:border-white/10`;

  const addParagraph = (type: 'text' | 'quote') => {
    const newParagraph: AboutParagraph = {
      _id: `p${Date.now()}`,
      type,
      content: { EN: '', TR: '' }
    };
    setAboutContent({
      ...aboutContent,
      paragraphs: [...aboutContent.paragraphs, newParagraph]
    });
  };

  const removeParagraph = async (id: string) => {
    if (await confirmRemove(editLang === 'TR' ? 'Bu paragraf silinsin mi?' : 'Remove this paragraph?')) {
      setAboutContent({
        ...aboutContent,
        paragraphs: aboutContent.paragraphs.filter(p => p._id !== id)
      });
    }
  };

  const updateParagraph = (id: string, field: string, value: any) => {
    setAboutContent({
      ...aboutContent,
      paragraphs: aboutContent.paragraphs.map(p =>
        p._id === id ? { ...p, [field]: value } : p
      )
    });
  };

  // Paragraph drag handlers
  const handleParagraphDragStart = (index: number) => setDraggedParagraph(index);
  const handleParagraphDragOver = (e: React.DragEvent, index: number) => { e.preventDefault(); setDragOverParagraph(index); };
  const handleParagraphDragEnd = () => {
    if (draggedParagraph !== null && dragOverParagraph !== null && draggedParagraph !== dragOverParagraph) {
      const newParagraphs = [...aboutContent.paragraphs];
      const [dragged] = newParagraphs.splice(draggedParagraph, 1);
      newParagraphs.splice(dragOverParagraph, 0, dragged);
      setAboutContent({ ...aboutContent, paragraphs: newParagraphs });
    }
    setDraggedParagraph(null);
    setDragOverParagraph(null);
  };

  // Stat drag handlers
  const handleStatDragStart = (index: number) => setDraggedStat(index);
  const handleStatDragOver = (e: React.DragEvent, index: number) => { e.preventDefault(); setDragOverStat(index); };
  const handleStatDragEnd = () => {
    if (draggedStat !== null && dragOverStat !== null && draggedStat !== dragOverStat) {
      const newStats = [...statsContent.stats];
      const [dragged] = newStats.splice(draggedStat, 1);
      newStats.splice(dragOverStat, 0, dragged);
      setStatsContent({ stats: newStats });
    }
    setDraggedStat(null);
    setDragOverStat(null);
  };

  const addStat = () => {
    const newStat = {
      _id: `s${Date.now()}`,
      type: 'number' as const,
      count: 0,
      label: { EN: 'New Stat', TR: 'Yeni İstatistik' }
    };
    setStatsContent({ stats: [...statsContent.stats, newStat] });
    setExpandedStats(new Set([...expandedStats, newStat._id]));
  };

  const removeStat = async (id: string) => {
    if (await confirmRemove(editLang === 'TR' ? 'Bu istatistik silinsin mi?' : 'Remove this stat?')) {
      setStatsContent({ stats: statsContent.stats.filter(s => s._id !== id) });
    }
  };

  const updateStat = (id: string, field: string, value: any) => {
    setStatsContent({
      stats: statsContent.stats.map(s =>
        s._id === id ? { ...s, [field]: value } : s
      )
    });
  };

  const toggleStatExpand = (id: string) => {
    const newExpanded = new Set(expandedStats);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedStats(newExpanded);
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
              {editLang === 'TR' ? 'Hakkımda bölümünün içeriğini düzenleyin' : 'Edit your about section content'}
            </p>
          </div>
        </div>
      </div>

      {/* About Section Header */}
      <div className={cardClass}>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white`}>
          <Type size={18} className="text-primary" />
          {editLang === 'TR' ? 'Bölüm Başlıkları' : 'Section Headers'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              <Type size={14} />
              {getText(t.whoAmI)} ({editLang})
            </label>
            <input
              type="text"
              value={typeof aboutContent.whoAmI === 'string' ? aboutContent.whoAmI : aboutContent.whoAmI[editLang]}
              onChange={(e) => setAboutContent({...aboutContent, whoAmI: updateMultiLangText(aboutContent.whoAmI, e.target.value, editLang)})}
              className={inputClass}
              placeholder={editLang === 'TR' ? "Kim Bu?" : "Who Am I?"}
            />
          </div>

          <div>
            <label className={labelClass}>
              <Tag size={14} />
              {getText(t.subtitle)} ({editLang})
            </label>
            <input
              type="text"
              value={typeof aboutContent.subtitle === 'string' ? aboutContent.subtitle : aboutContent.subtitle[editLang]}
              onChange={(e) => setAboutContent({...aboutContent, subtitle: updateMultiLangText(aboutContent.subtitle, e.target.value, editLang)})}
              className={inputClass}
              placeholder={editLang === 'TR' ? "Alt başlık" : "Subtitle"}
            />
          </div>
        </div>
      </div>

      {/* Paragraphs Section */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white`}>
            <FileText size={18} className="text-primary" />
            {getText(t.paragraphs)}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => addParagraph('text')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 bg-black/[0.04] text-gray-700 hover:bg-black/[0.06] dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/10`}
            >
              <AlignLeft size={16} />
              {editLang === 'TR' ? 'Metin' : 'Text'}
            </button>
            <button
              onClick={() => addParagraph('quote')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 bg-black/[0.04] text-gray-700 hover:bg-black/[0.06] dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/10`}
            >
              <Quote size={16} />
              {editLang === 'TR' ? 'Alıntı' : 'Quote'}
            </button>
          </div>
        </div>

        {aboutContent.paragraphs.length === 0 ? (
          <div className={`p-12 rounded-xl border-2 border-dashed text-center border-black/10 dark:border-white/10`}>
            <FileText size={40} className={`mx-auto mb-3 text-gray-400 dark:text-gray-500`} />
            <p className={'text-gray-500'}>
              {editLang === 'TR' ? 'Henüz paragraf eklenmedi' : 'No paragraphs added yet'}
            </p>
            <p className={`text-sm mt-1 text-gray-400 dark:text-gray-500`}>
              {editLang === 'TR' ? 'Metin veya Alıntı eklemek için yukarıdaki butonları kullanın' : 'Use the buttons above to add Text or Quote'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {aboutContent.paragraphs.map((paragraph, index) => {
              const isPDragging = draggedParagraph === index;
              const isPDragOver = dragOverParagraph === index && draggedParagraph !== index;
              return (
              <div 
                key={paragraph._id}
                draggable
                onDragStart={() => handleParagraphDragStart(index)}
                onDragOver={(e) => handleParagraphDragOver(e, index)}
                onDragEnd={handleParagraphDragEnd}
                className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                  isPDragging
                    ? 'opacity-50 scale-[0.98]'
                    : isPDragOver
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-black/[0.08] bg-white/60 dark:border-white/10 dark:bg-white/[0.03]'
                } bg-white/60 dark:bg-white/[0.03]`}
              >
                <div className="p-4 flex items-start gap-3">
                  <div className="pt-2">
                    <GripVertical size={18} className={`cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400`} />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-medium ${
                        paragraph.type === 'quote'
                          ? 'border border-black/[0.08] text-gray-600 dark:border-white/10 dark:text-gray-300'
                          : 'bg-black/[0.04] text-gray-600 dark:bg-white/[0.06] dark:text-gray-300'
                      }`}>
                        {paragraph.type === 'quote' 
                          ? (editLang === 'TR' ? 'Alıntı' : 'Quote')
                          : (editLang === 'TR' ? 'Metin' : 'Text')}
                      </span>
                      <span className={`text-xs text-gray-500`}>
                        {editLang === 'TR' ? 'Düzenleniyor:' : 'Editing:'} {editLang}
                      </span>
                    </div>
                    <textarea
                      rows={paragraph.type === 'quote' ? 2 : 3}
                      placeholder={paragraph.type === 'quote' 
                        ? (editLang === 'TR' ? 'Alıntıyı girin...' : 'Enter quote...')
                        : (editLang === 'TR' ? 'Paragraf metnini girin...' : 'Enter paragraph text...')}
                      value={typeof paragraph.content === 'string' ? paragraph.content : paragraph.content[editLang]}
                      onChange={(e) => updateParagraph(paragraph._id, 'content', updateMultiLangText(paragraph.content, e.target.value, editLang))}
                      className={`${inputClass} ${paragraph.type === 'quote' ? 'italic' : ''}`}
                    />
                  </div>

                  <button
                    onClick={() => removeParagraph(paragraph._id)}
                    className={`p-2 rounded-xl transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white`}>
            <BarChart3 size={18} className="text-primary" />
            {getText(t.stats)}
          </h3>
          <button
            onClick={addStat}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            {getText(t.addStat)}
          </button>
        </div>

        {statsContent.stats.length === 0 ? (
          <div className={`p-12 rounded-xl border-2 border-dashed text-center border-black/10 dark:border-white/10`}>
            <BarChart3 size={40} className={`mx-auto mb-3 text-gray-400 dark:text-gray-500`} />
            <p className={'text-gray-500'}>
              {editLang === 'TR' ? 'Henüz istatistik eklenmedi' : 'No stats added yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {statsContent.stats.map((stat, statIndex) => {
              const isExpanded = expandedStats.has(stat._id);
              const isSDragging = draggedStat === statIndex;
              const isSDragOver = dragOverStat === statIndex && draggedStat !== statIndex;
              return (
                <div 
                  key={stat._id}
                  draggable
                  onDragStart={() => handleStatDragStart(statIndex)}
                  onDragOver={(e) => handleStatDragOver(e, statIndex)}
                  onDragEnd={handleStatDragEnd}
                  className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                    isSDragging
                      ? 'opacity-50 scale-[0.98]'
                      : isSDragOver
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-black/[0.08] bg-white/60 dark:border-white/10 dark:bg-white/[0.03]'
                  } bg-white/60 dark:bg-white/[0.03]`}
                >
                  {/* Header */}
                  <div 
                    className={`p-4 flex items-center gap-4 cursor-pointer select-none hover:bg-black/[0.04] dark:hover:bg-white/[0.06]`}
                    onClick={() => toggleStatExpand(stat._id)}
                  >
                    <GripVertical size={18} className={`cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400`} />
                    
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/[0.04] text-gray-600 dark:bg-white/[0.06] dark:text-gray-300">
                      {stat.type === 'number' ? <Hash size={20} /> : <Tag size={20} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold truncate text-gray-900 dark:text-white`}>
                        {stat.type === 'number' 
                          ? `${stat.count || 0}+ ${typeof stat.label === 'string' ? stat.label : (stat.label?.[editLang] || '')}`
                          : (typeof stat.title === 'string' ? stat.title : (stat.title?.[editLang] || 'New Stat'))}
                      </h4>
                      <p className={`text-sm text-gray-600 dark:text-gray-400`}>
                        {stat.type === 'number' ? (editLang === 'TR' ? 'Sayısal' : 'Number') : (editLang === 'TR' ? 'Metin' : 'Text')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeStat(stat._id);
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
                    <div className={`p-4 border-t space-y-4 border-black/[0.08] bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.02]`}>
                      <div>
                        <label className={labelClass}>
                          {editLang === 'TR' ? 'İstatistik Tipi' : 'Stat Type'}
                        </label>
                        <Segmented
                          value={stat.type}
                          onChange={(type) => updateStat(stat._id, 'type', type)}
                          options={[
                            { value: 'number', label: editLang === 'TR' ? 'Sayısal' : 'Number' },
                            { value: 'text', label: editLang === 'TR' ? 'Metin' : 'Text' },
                          ]}
                        />
                      </div>

                      {stat.type === 'number' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>
                              <Hash size={14} />
                              {editLang === 'TR' ? 'Sayı' : 'Count'}
                            </label>
                            <NumberStepper
                              value={stat.count || 0}
                              onChange={(count) => updateStat(stat._id, 'count', count)}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              <Tag size={14} />
                              {getText(t.statLabel)} ({editLang})
                            </label>
                            <input
                              type="text"
                              value={typeof stat.label === 'string' ? stat.label : (stat.label?.[editLang] || '')}
                              onChange={(e) => updateStat(stat._id, 'label', updateMultiLangText(stat.label || {EN: '', TR: ''}, e.target.value, editLang))}
                              className={inputClass}
                              placeholder={editLang === 'TR' ? 'Yıl Deneyim' : 'Years Experience'}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className={labelClass}>
                              <Type size={14} />
                              {editLang === 'TR' ? 'Başlık' : 'Title'} ({editLang})
                            </label>
                            <input
                              type="text"
                              value={typeof stat.title === 'string' ? stat.title : (stat.title?.[editLang] || '')}
                              onChange={(e) => updateStat(stat._id, 'title', updateMultiLangText(stat.title || {EN: '', TR: ''}, e.target.value, editLang))}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>
                              <FileText size={14} />
                              {editLang === 'TR' ? 'Açıklama' : 'Description'} ({editLang})
                            </label>
                            <input
                              type="text"
                              value={typeof stat.description === 'string' ? stat.description : (stat.description?.[editLang] || '')}
                              onChange={(e) => updateStat(stat._id, 'description', updateMultiLangText(stat.description || {EN: '', TR: ''}, e.target.value, editLang))}
                              className={inputClass}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
