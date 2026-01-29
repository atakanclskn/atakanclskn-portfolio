import { MultiLangText } from '../types';

// Helper to get text in current language
export function getText(text: string | MultiLangText, lang: 'EN' | 'TR'): string {
  if (typeof text === 'string') {
    return text;
  }
  return text[lang] || text.EN || '';
}

// Helper to create MultiLangText from single string (for backward compatibility)
export function createMultiLangText(text: string): MultiLangText {
  return { EN: text, TR: text };
}

// Helper to update MultiLangText
export function updateMultiLangText(
  current: string | MultiLangText,
  newValue: string,
  lang: 'EN' | 'TR'
): MultiLangText {
  const multiLang: MultiLangText = typeof current === 'string' 
    ? { EN: current, TR: current }
    : current;
  
  return {
    ...multiLang,
    [lang]: newValue
  };
}
