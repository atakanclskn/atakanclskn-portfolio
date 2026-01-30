import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import * as LucideIcons from 'lucide-react';

interface SocialsTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

const SOCIAL_ICONS = [
  'Github', 'Linkedin', 'Twitter', 'Instagram', 'Facebook', 'Youtube',
  'Twitch', 'Discord', 'Slack', 'Mail', 'Globe', 'Link',
  'MessageCircle', 'Send', 'Phone', 'Smartphone'
];

export const SocialsTab: React.FC<SocialsTabProps> = ({ editLang, theme }) => {
  const { socials, setSocials } = useAdmin();

  const addSocial = () => {
    const newSocial = {
      _id: `s${Date.now()}`,
      platform: 'New Platform',
      url: '',
      username: '',
      iconName: 'Link'
    };
    setSocials([...socials, newSocial]);
  };

  const removeSocial = (id: string) => {
    setSocials(socials.filter(s => s._id !== id));
  };

  const updateSocial = (id: string, field: string, value: any) => {
    setSocials(socials.map(s => 
      s._id === id ? { ...s, [field]: value } : s
    ));
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
          }`}>Social Links</h3>
          <button
            onClick={addSocial}
            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
          >
            + Add Social
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socials.map((social) => {
            const IconComponent = (LucideIcons as any)[social.iconName] || LucideIcons.Link;
            
            return (
              <div key={social._id} className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <IconComponent size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Platform Name"
                      value={social.platform}
                      onChange={(e) => updateSocial(social._id, 'platform', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm font-bold ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={social.url}
                      onChange={(e) => updateSocial(social._id, 'url', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Username (optional)"
                      value={social.username || ''}
                      onChange={(e) => updateSocial(social._id, 'username', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <select
                      value={social.iconName}
                      onChange={(e) => updateSocial(social._id, 'iconName', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {SOCIAL_ICONS.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => removeSocial(social._id)}
                    className="text-red-500 hover:text-red-400 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
