import { SiteSettings } from '../types';
import { getText } from './multiLangHelper';

const setMeta = (selector: string, content: string) => {
  document.querySelector(selector)?.setAttribute('content', content);
};

// Applies the admin-managed SEO settings to the live document
export const applySeo = (settings: SiteSettings, lang: 'EN' | 'TR') => {
  const title = getText(settings.metaTitle, lang);
  if (title) {
    document.title = title;
    setMeta('meta[name="title"]', title);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[name="twitter:title"]', title);
  }

  const description = getText(settings.metaDescription, lang);
  if (description) {
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:description"]', description);
  }

  const keywords = getText(settings.metaKeywords, lang);
  if (keywords) setMeta('meta[name="keywords"]', keywords);

  if (settings.ogImage) {
    setMeta('meta[property="og:image"]', settings.ogImage);
    setMeta('meta[name="twitter:image"]', settings.ogImage);
  }

  setMeta('meta[property="og:locale"]', lang === 'TR' ? 'tr_TR' : 'en_US');
};
