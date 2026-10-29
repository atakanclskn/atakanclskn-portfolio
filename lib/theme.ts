import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark';
export type ThemePreference = ThemeMode | 'system';

// Visitor's own choice (set by the theme toggle) always wins over the site default
const CHOICE_KEY = 'site_theme';
// Cached copy of the admin's default so index.html can apply it before first paint
const DEFAULT_KEY = 'site_default_theme';

const read = (key: string): string | null => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const write = (key: string, value: string) => {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
};

const resolve = (pref: ThemePreference): ThemeMode =>
  pref === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : pref;

const applyTheme = (mode: ThemeMode) => {
  document.documentElement.classList.toggle('dark', mode === 'dark');
};

export const setTheme = (mode: ThemeMode) => {
  applyTheme(mode);
  write(CHOICE_KEY, mode);
};

export const applyDefaultTheme = (pref: ThemePreference) => {
  write(DEFAULT_KEY, pref);
  const choice = read(CHOICE_KEY);
  applyTheme(choice === 'light' || choice === 'dark' ? choice : resolve(pref));
};

// Tracks the `dark` class on <html>, so every component stays in sync with whoever toggles it
export const useIsDark = (): boolean => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => setIsDark(html.classList.contains('dark')));
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
};
