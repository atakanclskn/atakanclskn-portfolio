import React, { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { adminTranslations, getTranslation } from '../../lib/adminTranslations';

interface AdminLoginProps {
  onLoginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  editLang: 'EN' | 'TR';
  isLoading?: boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginWithGoogle, editLang, isLoading }) => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const t = adminTranslations.login;

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setError(null);

    const result = await onLoginWithGoogle();

    if (!result.success) {
      setError(result.error || (editLang === 'TR' ? 'Giriş başarısız' : 'Login failed'));
      setTimeout(() => setError(null), 5000);
    }

    setIsSigningIn(false);
  };

  return (
    <div className="w-full max-w-md p-8 md:p-10 rounded-3xl border border-black/[0.08] bg-white/70 backdrop-blur-2xl shadow-2xl dark:border-white/10 dark:bg-white/[0.04] animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 bg-primary/10 border border-primary/30">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
          {getTranslation(t.title, editLang)}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {editLang === 'TR' ? 'Google hesabınızla giriş yapın' : 'Sign in with your Google account'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-center" role="alert">
          {error}
        </div>
      )}

      <button
        onClick={handleGoogleLogin}
        disabled={isSigningIn || isLoading}
        className="w-full px-6 py-4 flex items-center justify-center gap-3 rounded-full font-bold text-sm transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-black text-white dark:bg-white dark:text-black shadow-lg"
      >
        {isSigningIn ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        )}
        {isSigningIn
          ? (editLang === 'TR' ? 'Giriş yapılıyor...' : 'Signing in...')
          : (editLang === 'TR' ? 'Google ile Giriş Yap' : 'Sign in with Google')
        }
      </button>

      <p className="mt-6 text-center text-xs text-gray-500">
        {editLang === 'TR' ? 'Sadece yetkili kullanıcılar giriş yapabilir' : 'Only authorized users can sign in'}
      </p>
    </div>
  );
};
