import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
  theme: 'light' | 'dark';
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, theme }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (success) {
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
            Admin Access
          </h2>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Enter password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                error ? 'border-red-500' : ''
              } ${
                theme === 'dark'
                  ? `bg-gray-800 ${error ? '' : 'border-gray-700'} text-white placeholder:text-gray-500 focus:border-primary`
                  : `bg-gray-50 ${error ? '' : 'border-gray-300'} text-gray-900 placeholder:text-gray-400 focus:border-primary`
              } focus:outline-none focus:ring-2 focus:ring-primary/20`}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs mt-2 animate-fade-in">
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
