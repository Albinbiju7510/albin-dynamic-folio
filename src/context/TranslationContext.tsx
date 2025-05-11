
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ml' | 'ta';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => string;
  isLoading: boolean;
}

// Simple translation dictionaries for now
// In a production app, you might want to load these from a JSON file or API
const translations: Record<Language, Record<string, string>> = {
  en: {}, // English is default, no need to translate
  ml: {
    // Malayalam translations
    'Hi, I\'m': 'ഹായ്, ഞാൻ',
    'BTech Computer Science Engineering Student': 'ബി.ടെക് കമ്പ്യൂട്ടർ സയൻസ് എഞ്ചിനീയറിംഗ് വിദ്യാർത്ഥി',
    'Discover More': 'കൂടുതൽ കണ്ടെത്തുക',
    'Download Resume': 'റെസ്യൂമെ ഡൗൺലോഡ് ചെയ്യുക',
    'About': 'എന്നെക്കുറിച്ച്',
    'Skills': 'കഴിവുകൾ',
    'Projects': 'പ്രോജക്ടുകൾ',
    'Leadership': 'നേതൃത്വം',
    'Contact': 'ബന്ധപ്പെടുക',
    // Add more translations as needed
  },
  ta: {
    // Tamil translations
    'Hi, I\'m': 'வணக்கம், நான்',
    'BTech Computer Science Engineering Student': 'பி.டெக் கம்ப்யூட்டர் சயின்ஸ் பொறியியல் மாணவர்',
    'Discover More': 'மேலும் கண்டறியுங்கள்',
    'Download Resume': 'தொகுப்பை பதிவிறக்கம் செய்',
    'About': 'என்னைப் பற்றி',
    'Skills': 'திறன்கள்',
    'Projects': 'திட்டங்கள்',
    'Leadership': 'தலைமை',
    'Contact': 'தொடர்பு',
    // Add more translations as needed
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);

  const translate = (text: string): string => {
    if (language === 'en') return text;
    return translations[language][text] || text;
  };

  useEffect(() => {
    // When language changes, briefly show loading state
    if (language !== 'en') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
