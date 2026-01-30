import React, { useState } from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { adminTranslations, getTranslation } from '../../../lib/adminTranslations';
import { AboutParagraph } from '../../../types';
import { 
  AlignLeft, Quote, MoveUp, MoveDown, Plus, Trash2, ChevronDown, ChevronUp,
  Type, FileText, BarChart3, GripVertical, Hash, Tag
} from 'lucide-react';

interface AboutTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const AboutTab: React.FC<AboutTabProps> = ({ editLang, theme }) => {
  const { aboutContent, setAboutContent, statsContent, setStatsContent } = useAdmin();
  const t = adminTranslations.about;
  const getText = (obj: { EN: string; TR: string }) => getTranslation(obj, editLang);

  const [expandedStats, setExpandedStats] = useState<Set<string>>(new Set());

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

  const removeParagraph = (id: string) => {
    if (window.confirm(editLang === 'TR' ? 'Bu paragrafı silmek istiyor musunuz?' : 'Remove this paragraph?')) {
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

  const moveParagraph = (index: number, direction: 'up' | 'down') => {
    const newParagraphs = [...aboutContent.paragraphs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newParagraphs.length) return;
    
    [newParagraphs[index], newParagraphs[targetIndex]] = [newParagraphs[targetIndex], newParagraphs[index]];
    setAboutContent({ ...aboutContent, paragraphs: newParagraphs });
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

  const removeStat = (id: string) => {
    if (window.confirm(editLang === 'TR' ? 'Bu istatistiği silmek istiyor musunuz?' : 'Remove this stat?')) {
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
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {getText(t.title)}
            </h2>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {editLang === 'TR' ? 'Hakkımda bölümünün içeriğini düzenleyin' : 'Edit your about section content'}
            </p>
          </div>
        </div>
      </div>

      {/* About Section Header */}
      <div className={cardClass}>
        <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
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
          <h3 className={`text-lg font-semibold flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <FileText size={18} className="text-primary" />
            {getText(t.paragraphs)}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => addParagraph('text')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <AlignLeft size={16} />
              {editLang === 'TR' ? 'Metin' : 'Text'}
            </button>
            <button
              onClick={() => addParagraph('quote')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                theme === 'dark'
                  ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              <Quote size={16} />
              {editLang === 'TR' ? 'Alıntı' : 'Quote'}
            </button>
          </div>
        </div>

        {aboutContent.paragraphs.length === 0 ? (
          <div className={`p-12 rounded-xl border-2 border-dashed text-center ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <FileText size={40} className={`mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
              {editLang === 'TR' ? 'Henüz paragraf eklenmedi' : 'No paragraphs added yet'}
            </p>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
              {editLang === 'TR' ? 'Metin veya Alıntı eklemek için yukarıdaki butonları kullanın' : 'Use the buttons above to add Text or Quote'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <div key={paragraph._id} className={`rounded-xl border overflow-hidden transition-all ${
                theme === 'dark' ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="p-4 flex items-start gap-3">
                  <div className="flex flex-col gap-1 pt-1">
                    <button
                      onClick={() => moveParagraph(index, 'up')}
                      disabled={index === 0}
                      className={`p-1.5 rounded-lg transition-all ${
                        index === 0
                          ? 'opacity-30 cursor-not-allowed'
                          : theme === 'dark'
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      <MoveUp size={16} />
                    </button>
                    <button
                      onClick={() => moveParagraph(index, 'down')}
                      disabled={index === aboutContent.paragraphs.length - 1}
                      className={`p-1.5 rounded-lg transition-all ${
                        index === aboutContent.paragraphs.length - 1
                          ? 'opacity-30 cursor-not-allowed'
                          : theme === 'dark'
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      <MoveDown size={16} />
                    </button>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        paragraph.type === 'quote'
                          ? theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                          : theme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                      }`}>
                        {paragraph.type === 'quote' 
                          ? (editLang === 'TR' ? '💬 Alıntı' : '💬 Quote')
                          : (editLang === 'TR' ? '📝 Metin' : '📝 Text')}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
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
                    className={`p-2 rounded-lg transition-colors text-red-500 ${
                      theme === 'dark' ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
                    }`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <BarChart3 size={18} className="text-primary" />
            {getText(t.stats)}
          </h3>
          <button
            onClick={addStat}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            {getText(t.addStat)}
          </button>
        </div>

        {statsContent.stats.length === 0 ? (
          <div className={`p-12 rounded-xl border-2 border-dashed text-center ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <BarChart3 size={40} className={`mx-auto mb-3 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
              {editLang === 'TR' ? 'Henüz istatistik eklenmedi' : 'No stats added yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {statsContent.stats.map((stat) => {
              const isExpanded = expandedStats.has(stat._id);
              return (
                <div key={stat._id} className={`rounded-xl border overflow-hidden transition-all ${
                  theme === 'dark' ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'
                }`}>
                  {/* Header */}
                  <div 
                    className={`p-4 flex items-center gap-4 cursor-pointer select-none ${
                      theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleStatExpand(stat._id)}
                  >
                    <GripVertical size={18} className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} />
                    
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      stat.type === 'number' 
                        ? 'bg-blue-500/20' 
                        : 'bg-purple-500/20'
                    }`}>
                      {stat.type === 'number' ? (
                        <Hash size={20} className="text-blue-500" />
                      ) : (
                        <Tag size={20} className="text-purple-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {stat.type === 'number' 
                          ? `${stat.count || 0}+ ${typeof stat.label === 'string' ? stat.label : (stat.label?.[editLang] || '')}`
                          : (typeof stat.title === 'string' ? stat.title : (stat.title?.[editLang] || 'New Stat'))}
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.type === 'number' ? (editLang === 'TR' ? 'Sayısal' : 'Number') : (editLang === 'TR' ? 'Metin' : 'Text')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeStat(stat._id);
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
                    <div className={`p-4 border-t space-y-4 ${
                      theme === 'dark' ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-white'
                    }`}>
                      <div>
                        <label className={labelClass}>
                          {editLang === 'TR' ? 'İstatistik Tipi' : 'Stat Type'}
                        </label>
                        <select
                          value={stat.type}
                          onChange={(e) => updateStat(stat._id, 'type', e.target.value)}
                          className={inputClass}
                        >
                          <option value="number">{editLang === 'TR' ? 'Sayısal' : 'Number'}</option>
                          <option value="text">{editLang === 'TR' ? 'Metin' : 'Text'}</option>
                        </select>
                      </div>

                      {stat.type === 'number' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>
                              <Hash size={14} />
                              {editLang === 'TR' ? 'Sayı' : 'Count'}
                            </label>
                            <input
                              type="number"
                              value={stat.count || 0}
                              onChange={(e) => updateStat(stat._id, 'count', parseInt(e.target.value))}
                              className={inputClass}
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
