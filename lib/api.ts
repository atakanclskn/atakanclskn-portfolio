// Base URL of the Vercel Functions in api/ (e.g. https://atakanclskn-portfolio.vercel.app).
// Unset means those features are switched off and the site behaves as before.
export const apiUrl = (path: string): string | null => {
  const base = import.meta.env.VITE_API_BASE?.replace(/\/+$/, '');
  return base ? `${base}/api/${path}` : null;
};
