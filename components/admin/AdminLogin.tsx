import React, { useState } from 'react';
import { ArrowLeft, Loader2, Moon, Sun } from 'lucide-react';

type Lang = 'EN' | 'TR';

interface AdminLoginProps {
  onLoginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  editLang: Lang;
  setEditLang: (lang: Lang) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onBack: () => void;
  logoText: string;
  firstName: string;
  isLoading?: boolean;
}

const GoogleMark = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginWithGoogle, editLang, setEditLang, isDark, onToggleTheme, onBack, logoText, firstName, isLoading,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const tr = editLang === 'TR';

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setError(null);
    const result = await onLoginWithGoogle();
    if (!result.success) setError(result.error || (tr ? 'Giriş yapılamadı.' : 'Sign-in failed.'));
    setIsSigningIn(false);
  };

  const pill = 'rounded-full border border-black/[0.08] bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/5';

  return (
    <div className="relative min-h-full flex flex-col">
      {/* Dot grid, a quiet echo of the site's interactive background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Top bar */}
      <header className="relative flex items-center justify-between gap-4 px-6 md:px-10 py-6">
        <div className="flex items-center">
          <span className="font-display font-bold text-xl tracking-tighter text-gray-900 dark:text-white">{logoText}</span>
          <span className="w-2 h-2 rounded-full bg-primary ml-1" />
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center p-1 ${pill}`}>
            {(['EN', 'TR'] as const).map(code => (
              <button
                key={code}
                onClick={() => setEditLang(code)}
                className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-colors ${
                  editLang === code ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <button onClick={onToggleTheme} className={`p-2.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors ${pill}`} aria-label={tr ? 'Temayı değiştir' : 'Toggle theme'}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      {/* Sign-in */}
      <main className="relative flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-lg text-center flex flex-col items-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 mb-8 shadow-sm animate-fade-in-up ${pill}`} style={{ animationDelay: '0.05s' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-medium tracking-wide text-gray-600 dark:text-gray-300">
              {tr ? 'Yönetim paneli' : 'Admin panel'}
            </span>
          </div>

          <h1 className="font-display font-bold tracking-tight leading-[1.05] text-5xl md:text-6xl text-gray-900 dark:text-white animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
            {tr ? 'Tekrar hoş geldin,' : 'Welcome back,'}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{firstName}.</span>
          </h1>

          <p className="mt-6 max-w-sm text-base md:text-lg text-gray-600 dark:text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {tr ? 'Siteni düzenlemek için yetkili Google hesabınla devam et.' : 'Continue with your authorized Google account to edit your site.'}
          </p>

          <div className="mt-10 w-full max-w-sm flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '0.28s' }}>
            <button
              onClick={handleGoogleLogin}
              disabled={isSigningIn || isLoading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm bg-black text-white dark:bg-white dark:text-black shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 transition-all"
            >
              {isSigningIn ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleMark />}
              {isSigningIn ? (tr ? 'Giriş yapılıyor…' : 'Signing in…') : (tr ? 'Google ile devam et' : 'Continue with Google')}
            </button>
            <button
              onClick={onBack}
              className={`w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-gray-900 hover:bg-white dark:text-white dark:hover:bg-white/10 transition-colors ${pill}`}
            >
              <ArrowLeft size={16} /> {tr ? 'Siteye dön' : 'Back to site'}
            </button>
          </div>

          <div className="mt-6 min-h-[2.5rem]" aria-live="polite">
            {error && (
              <p className="px-4 py-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 text-sm text-red-500" role="alert">{error}</p>
            )}
          </div>
        </div>
      </main>

      <footer className="relative px-6 md:px-10 pb-6 text-center text-xs text-gray-500">
        {tr ? 'Yalnızca site sahibinin hesabı giriş yapabilir.' : "Only the site owner's account can sign in."}
      </footer>
    </div>
  );
};
