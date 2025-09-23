import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Import translation files
import enTranslations from '../translations/en.json';
import esTranslations from '../translations/es.json';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
  tString: (key: string) => string;
  languages: Array<{ code: Language; name: string; flag: string }>;
}

const translations = {
  en: enTranslations,
  es: esTranslations,
};

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && ['en', 'es'].includes(savedLanguage) ? savedLanguage : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Save to localStorage for persistence
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  // Translation function
  const t = (key: string): string | string[] => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in any language
          }
        }
        break;
      }
    }
    
    return value || key;
  };

  // Helper function to ensure string output for React props
  const tString = (key: string): string => {
    const result = t(key);
    return Array.isArray(result) ? result.join(' ') : result;
  };

  // Set document language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    tString,
    languages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
