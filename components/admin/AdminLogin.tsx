import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { adminTranslations, getTranslation } from '../../lib/adminTranslations';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => boolean;
  theme: 'light' | 'dark';
  editLang: 'EN' | 'TR';
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, theme, editLang }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const t = adminTranslations.login;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Şimdilik boş girilebilsin
    const success = onLogin(email, password);
    if (success) {
      setEmail('');
      setPassword('');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl border ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-200'
      }`}>
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            theme === 'dark' ? 'bg-primary/20' : 'bg-primary/10'
          }`}>
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {getTranslation(t.title, editLang)}
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {editLang === 'TR' ? 'Kimlik bilgilerinizle giriş yapın' : 'Sign in with your credentials'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {getTranslation(t.email, editLang)}
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-colors ${
                  error ? 'border-red-500' : ''
                } ${
                  theme === 'dark'
                    ? `bg-gray-800 ${error ? '' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-primary`
                    : `bg-gray-50 ${error ? '' : 'border-gray-300'} text-gray-900 placeholder:text-gray-400 focus:border-primary`
                } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {getTranslation(t.password, editLang)}
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={editLang === 'TR' ? 'Şifrenizi girin' : 'Enter your password'}
                className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-colors ${
                  error ? 'border-red-500' : ''
                } ${
                  theme === 'dark'
                    ? `bg-gray-800 ${error ? '' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-primary`
                    : `bg-gray-50 ${error ? '' : 'border-gray-300'} text-gray-900 placeholder:text-gray-400 focus:border-primary`
                } focus:outline-none focus:ring-2 focus:ring-primary/20`}
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs mt-2 animate-fade-in">
                {editLang === 'TR' ? 'Geçersiz kimlik bilgileri. Tekrar deneyin.' : 'Invalid credentials. Please try again.'}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-[1.02]"
          >
            {getTranslation(t.submit, editLang)}
          </button>
        </form>

        <div className={`mt-6 text-center text-xs ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          {editLang === 'TR' ? 'Firebase Authentication ile korunmaktadır' : 'Protected by Firebase Authentication'}
        </div>
      </div>
    </div>
  );
};
