import React from 'react';
import { Loader2 } from 'lucide-react';
import { useAdmin } from '../lib/adminContext';
import { useLanguage } from '../lib/i18n';

// Shown on the public site while the admin previews edits they haven't saved yet
export const UnsavedChangesBar: React.FC = () => {
  const { isLoggedIn, isDirty, isSaving, saveToFirebase } = useAdmin();
  const { lang } = useLanguage();
  const tr = lang === 'TR';

  if (!isLoggedIn || !isDirty) return null;

  const openAdmin = () => {
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new Event('adminRouteChange'));
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-max animate-fade-in-up">
      <div className="flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border border-black/[0.08] bg-white/80 backdrop-blur-2xl shadow-2xl dark:border-white/10 dark:bg-[#0d0d0d]/80">
        <span className="w-2 h-2 shrink-0 rounded-full bg-amber-500" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
          {tr ? 'Kaydedilmemiş değişiklikler' : 'Unsaved changes'}
        </span>
        <button
          onClick={openAdmin}
          className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-black/[0.04] dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors"
        >
          {tr ? 'Panele dön' : 'Back to admin'}
        </button>
        <button
          onClick={() => saveToFirebase()}
          disabled={isSaving}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-black text-white dark:bg-white dark:text-black disabled:opacity-50 transition-opacity"
        >
          {isSaving && <Loader2 size={14} className="animate-spin" />}
          {tr ? 'Kaydet' : 'Save'}
        </button>
      </div>
    </div>
  );
};
