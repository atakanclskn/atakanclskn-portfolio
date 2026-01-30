import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';

interface ExperienceTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

export const ExperienceTab: React.FC<ExperienceTabProps> = ({ editLang, theme }) => {
  const { experiences, setExperiences } = useAdmin();

  const addExperience = () => {
    const newExp = {
      _id: `e${Date.now()}`,
      role: { EN: 'New Role', TR: 'Yeni Pozisyon' },
      company: 'Company Name',
      startDate: '2024-01',
      endDate: '',
      isCurrent: true,
      description: { EN: 'Description', TR: 'Açıklama' },
      skills: [],
      type: 'work' as const
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(e => e._id !== id));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setExperiences(experiences.map(e => 
      e._id === id ? { ...e, [field]: value } : e
    ));
  };

  const updateSkills = (id: string, skillsText: string) => {
    const skills = skillsText.split(',').map(s => s.trim()).filter(Boolean);
    updateExperience(id, 'skills', skills);
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
          }`}>Experience</h3>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
          >
            + Add Experience
          </button>
        </div>

        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp._id} className={`p-4 rounded-lg border ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder={`Role (${editLang})`}
                      value={typeof exp.role === 'string' ? exp.role : exp.role[editLang]}
                      onChange={(e) => updateExperience(exp._id, 'role', updateMultiLangText(exp.role, e.target.value, editLang))}
                      className={`w-full border rounded-lg p-2 text-sm font-bold ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp._id, 'company', e.target.value)}
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
                    value={typeof exp.description === 'string' ? exp.description : exp.description[editLang]}
                    onChange={(e) => updateExperience(exp._id, 'description', updateMultiLangText(exp.description, e.target.value, editLang))}
                    className={`w-full border rounded-lg p-2 text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="month"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp._id, 'startDate', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <input
                      type="month"
                      placeholder="End Date"
                      value={exp.endDate || ''}
                      onChange={(e) => updateExperience(exp._id, 'endDate', e.target.value)}
                      disabled={exp.isCurrent}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white disabled:opacity-50'
                          : 'bg-white border-gray-300 text-gray-900 disabled:opacity-50'
                      }`}
                    />
                    <select
                      value={exp.type || 'work'}
                      onChange={(e) => updateExperience(exp._id, 'type', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="work">Work</option>
                      <option value="education">Education</option>
                      <option value="certification">Certification</option>
                      <option value="project">Project</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) => updateExperience(exp._id, 'isCurrent', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>Currently working here</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Skills (comma separated)"
                    value={exp.skills?.join(', ') || ''}
                    onChange={(e) => updateSkills(exp._id, e.target.value)}
                    className={`w-full border rounded-lg p-2 text-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <button
                  onClick={() => removeExperience(exp._id)}
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
