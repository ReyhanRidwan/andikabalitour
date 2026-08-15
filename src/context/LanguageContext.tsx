import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, Translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isId: boolean;
  isEn: boolean;
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('andhikabalitour_language');
      if (savedLang === 'en' || savedLang === 'id' || savedLang === 'ar') {
        return savedLang;
      }
    } catch (e) {
      // LocalStorage access fallback
    }
    return 'id'; // default to Indonesian
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('andhikabalitour_language', lang);
    } catch (e) {
      // Ignore fallback
    }
  };

  const toggleLanguage = () => {
    if (language === 'id') setLanguage('en');
    else if (language === 'en') setLanguage('ar');
    else setLanguage('id');
  };

  useEffect(() => {
    // Update document lang and dir attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language] || translations.id,
    isId: language === 'id',
    isEn: language === 'en',
    isAr: language === 'ar',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
