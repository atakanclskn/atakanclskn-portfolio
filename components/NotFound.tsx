
import React from 'react';
import { Home, ArrowLeft, Terminal } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505] transition-colors duration-300 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative z-10 text-center px-6 max-w-xl">
        {/* Glitch-style 404 number */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] md:text-[14rem] font-display font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-100 dark:from-white/10 dark:to-white/5 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Terminal className="w-16 h-16 text-primary opacity-60" />
          </div>
        </div>
        
        {/* Message */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">
            Page not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            <br />
            <span className="font-mono text-sm text-primary opacity-70 mt-2 block">
              Error: ENOENT — no such file or directory
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new Event('popstate'));
            }}
            className="w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Home className="w-4 h-4" /> Go Home
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
