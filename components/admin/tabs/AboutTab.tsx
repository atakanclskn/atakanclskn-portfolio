import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import { AboutParagraph } from '../../../types';
import { AlignLeft, Quote, MoveUp, MoveDown } from 'lucide-react';

interface AboutTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const AboutTab: React.FC<AboutTabProps> = ({ editLang, theme }) => {
  const { aboutContent, setAboutContent, statsContent, setStatsContent } = useAdmin();

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
    setAboutContent({
      ...aboutContent,
      paragraphs: aboutContent.paragraphs.filter(p => p._id !== id)
    });
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
  };

  const removeStat = (id: string) => {
    setStatsContent({ stats: statsContent.stats.filter(s => s._id !== id) });
  };

  const updateStat = (id: string, field: string, value: any) => {
    setStatsContent({
      stats: statsContent.stats.map(s =>
        s._id === id ? { ...s, [field]: value } : s
      )
    });
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* About Section Header */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>About Section Header</h3>

        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Main Title ({editLang})</label>
          <input
            type="text"
            value={typeof aboutContent.whoAmI === 'string' ? aboutContent.whoAmI : aboutContent.whoAmI[editLang]}
            onChange={(e) => setAboutContent({...aboutContent, whoAmI: updateMultiLangText(aboutContent.whoAmI, e.target.value, editLang)})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Subtitle ({editLang})</label>
          <input
            type="text"
            value={typeof aboutContent.subtitle === 'string' ? aboutContent.subtitle : aboutContent.subtitle[editLang]}
            onChange={(e) => setAboutContent({...aboutContent, subtitle: updateMultiLangText(aboutContent.subtitle, e.target.value, editLang)})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Paragraphs Section */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Paragraphs</h3>
          <div className="flex gap-2">
            <button
              onClick={() => addParagraph('text')}
              className="px-3 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <AlignLeft size={16} />
              Text
            </button>
            <button
              onClick={() => addParagraph('quote')}
              className="px-3 py-2 bg-secondary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
            >
              <Quote size={16} />
              Quote
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {aboutContent.paragraphs.map((paragraph, index) => (
            <div key={paragraph._id} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-1 pt-1">
                  <button
                    onClick={() => moveParagraph(index, 'up')}
                    disabled={index === 0}
                    className={`p-1 rounded transition-colors ${
                      index === 0
                        ? 'opacity-30 cursor-not-allowed'
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <MoveUp size={16} />
                  </button>
                  <button
                    onClick={() => moveParagraph(index, 'down')}
                    disabled={index === aboutContent.paragraphs.length - 1}
                    className={`p-1 rounded transition-colors ${
                      index === aboutContent.paragraphs.length - 1
                        ? 'opacity-30 cursor-not-allowed'
                        : theme === 'dark'
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <MoveDown size={16} />
                  </button>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      paragraph.type === 'quote'
                        ? 'bg-secondary/20 text-secondary'
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {paragraph.type === 'quote' ? '💬 Quote' : '📝 Text'}
                    </span>
                    <span className={`text-xs ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      Editing: {editLang}
                    </span>
                  </div>
                  <textarea
                    rows={paragraph.type === 'quote' ? 2 : 3}
                    placeholder={paragraph.type === 'quote' ? 'Enter quote...' : 'Enter paragraph text...'}
                    value={typeof paragraph.content === 'string' ? paragraph.content : paragraph.content[editLang]}
                    onChange={(e) => updateParagraph(paragraph._id, 'content', updateMultiLangText(paragraph.content, e.target.value, editLang))}
                    className={`w-full border rounded-lg p-3 text-sm ${
                      paragraph.type === 'quote' ? 'italic' : ''
                    } ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    } focus:border-primary focus:outline-none`}
                  />
                </div>

                <button
                  onClick={() => removeParagraph(paragraph._id)}
                  className="text-red-500 hover:text-red-400 text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Stats</h3>
          <button
            onClick={addStat}
            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
          >
            + Add Stat
          </button>
        </div>

        <div className="space-y-4">
          {statsContent.stats.map((stat) => (
            <div key={stat._id} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={stat.type}
                      onChange={(e) => updateStat(stat._id, 'type', e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="number">Number</option>
                      <option value="text">Text</option>
                    </select>
                  </div>

                  {stat.type === 'number' ? (
                    <>
                      <input
                        type="number"
                        placeholder="Count"
                        value={stat.count || 0}
                        onChange={(e) => updateStat(stat._id, 'count', parseInt(e.target.value))}
                        className={`w-full border rounded-lg p-2 text-sm ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <input
                        type="text"
                        placeholder={`Label (${editLang})`}
                        value={typeof stat.label === 'string' ? stat.label : (stat.label?.[editLang] || '')}
                        onChange={(e) => updateStat(stat._id, 'label', updateMultiLangText(stat.label || {EN: '', TR: ''}, e.target.value, editLang))}
                        className={`w-full border rounded-lg p-2 text-sm ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder={`Title (${editLang})`}
                        value={typeof stat.title === 'string' ? stat.title : (stat.title?.[editLang] || '')}
                        onChange={(e) => updateStat(stat._id, 'title', updateMultiLangText(stat.title || {EN: '', TR: ''}, e.target.value, editLang))}
                        className={`w-full border rounded-lg p-2 text-sm ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                      <input
                        type="text"
                        placeholder={`Description (${editLang})`}
                        value={typeof stat.description === 'string' ? stat.description : (stat.description?.[editLang] || '')}
                        onChange={(e) => updateStat(stat._id, 'description', updateMultiLangText(stat.description || {EN: '', TR: ''}, e.target.value, editLang))}
                        className={`w-full border rounded-lg p-2 text-sm ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </>
                  )}
                </div>
                <button
                  onClick={() => removeStat(stat._id)}
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
