import React from 'react';
import { useAdmin } from '../../../lib/adminContext';
import { updateMultiLangText } from '../../../lib/multiLangHelper';
import * as LucideIcons from 'lucide-react';

interface HobbiesTabProps {
  editLang: 'EN' | 'TR';
  theme: 'light' | 'dark';
}

const AVAILABLE_ICONS = [
  // Activities
  'Gamepad2', 'Tennis', 'Bike', 'Mountain', 'Plane', 'Camera', 'Film', 'Music',
  // Tech & Work
  'Code2', 'Laptop', 'Rocket', 'Zap', 'Cpu', 'Database', 'Server', 'Terminal',
  // Learning & Reading
  'BookOpen', 'GraduationCap', 'Lightbulb', 'Brain', 'BookMarked', 'Library',
  // Food & Drinks
  'Coffee', 'Pizza', 'UtensilsCrossed', 'Wine', 'IceCream',
  // Entertainment
  'Tv', 'Headphones', 'Mic', 'Radio', 'Speaker', 'Music2',
  // Sports
  'Dumbbell', 'Trophy', 'Target', 'Footprints', 'Volleyball',
  // Creative
  'Palette', 'Brush', 'Pen', 'Scissors', 'Sparkles',
  // Social
  'Users', 'Heart', 'MessageCircle', 'Globe', 'MapPin',
  // Nature
  'Tree', 'Flower', 'Sun', 'Moon', 'Star', 'Cloud',
  // Other
  'Gift', 'Clock', 'Calendar', 'Home', 'Car', 'Package'
];

export const HobbiesTab: React.FC<HobbiesTabProps> = ({ editLang, theme }) => {
  const { hobbies, setHobbies } = useAdmin();

  const addHobby = () => {
    const newHobby = {
      _id: `h${Date.now()}`,
      icon: 'Heart',
      label: { EN: 'New Hobby', TR: 'Yeni Hobi' }
    };
    setHobbies([...hobbies, newHobby]);
  };

  const removeHobby = (id: string) => {
    setHobbies(hobbies.filter(h => h._id !== id));
  };

  const updateHobby = (id: string, field: string, value: any) => {
    setHobbies(hobbies.map(h => 
      h._id === id ? { ...h, [field]: value } : h
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
          }`}>Hobbies & Interests</h3>
          <button
            onClick={addHobby}
            className="px-4 py-2 bg-primary text-black rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
          >
            + Add Hobby
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hobbies.map((hobby) => {
            const IconComponent = (LucideIcons as any)[hobby.icon] || LucideIcons.Heart;
            
            return (
              <div key={hobby._id} className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <IconComponent size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <select
                      value={hobby.icon}
                      onChange={(e) => updateHobby(hobby._id, 'icon', e.target.value)}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      {AVAILABLE_ICONS.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder={`Label (${editLang})`}
                      value={typeof hobby.label === 'string' ? hobby.label : hobby.label[editLang]}
                      onChange={(e) => updateHobby(hobby._id, 'label', updateMultiLangText(hobby.label, e.target.value, editLang))}
                      className={`w-full border rounded-lg p-2 text-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <button
                    onClick={() => removeHobby(hobby._id)}
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
