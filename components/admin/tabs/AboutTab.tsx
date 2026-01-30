import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';

interface AboutTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const AboutTab: React.FC<AboutTabProps> = ({ editLang, theme }) => {
  const { aboutContent, setAboutContent, statsContent, setStatsContent } = useAdmin();

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
      {/* About Content */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>About Section Content</h3>

        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Who Am I Title ({editLang})</label>
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

        <div>
          <label className={`block text-xs font-bold uppercase mb-2 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>Beyond Terminal Paragraph ({editLang})</label>
          <textarea 
            rows={3}
            value={typeof aboutContent.paragraphs.beyondTerminal === 'string' ? aboutContent.paragraphs.beyondTerminal : aboutContent.paragraphs.beyondTerminal[editLang]} 
            onChange={(e) => setAboutContent({...aboutContent, paragraphs: {...aboutContent.paragraphs, beyondTerminal: updateMultiLangText(aboutContent.paragraphs.beyondTerminal, e.target.value, editLang)}})}
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
          }`}>Exploring Paragraph ({editLang})</label>
          <textarea 
            rows={3}
            value={typeof aboutContent.paragraphs.exploring === 'string' ? aboutContent.paragraphs.exploring : aboutContent.paragraphs.exploring[editLang]} 
            onChange={(e) => setAboutContent({...aboutContent, paragraphs: {...aboutContent.paragraphs, exploring: updateMultiLangText(aboutContent.paragraphs.exploring, e.target.value, editLang)}})}
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
          }`}>Quote ({editLang})</label>
          <textarea 
            rows={2}
            value={typeof aboutContent.paragraphs.quote === 'string' ? aboutContent.paragraphs.quote : aboutContent.paragraphs.quote[editLang]} 
            onChange={(e) => setAboutContent({...aboutContent, paragraphs: {...aboutContent.paragraphs, quote: updateMultiLangText(aboutContent.paragraphs.quote, e.target.value, editLang)}})}
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
          }`}>Beyond Code Paragraph ({editLang})</label>
          <textarea 
            rows={3}
            value={typeof aboutContent.paragraphs.beyondCode === 'string' ? aboutContent.paragraphs.beyondCode : aboutContent.paragraphs.beyondCode[editLang]} 
            onChange={(e) => setAboutContent({...aboutContent, paragraphs: {...aboutContent.paragraphs, beyondCode: updateMultiLangText(aboutContent.paragraphs.beyondCode, e.target.value, editLang)}})}
            className={`w-full border rounded-lg p-3 focus:border-primary focus:outline-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-gray-50 border-gray-300 text-gray-900'
            }`}
          />
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
