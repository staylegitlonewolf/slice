import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, languages } = useLanguage();

  const handleToggleLanguage = () => {
    // Toggle between English and Spanish
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  };

  const currentLang = languages.find(lang => lang.code === language) || languages[0];
  const nextLang = languages.find(lang => lang.code !== language) || languages[1];

  return (
    <div className="language-toggle">
      <button
        className="language-btn"
        onClick={handleToggleLanguage}
        aria-label={`Switch to ${nextLang.name}`}
        title={`Switch to ${nextLang.name}`}
      >
        <div className="language-btn-content">
          <span className="language-flag">{currentLang.flag}</span>
          <span className="language-name">{currentLang.name}</span>
        </div>
      </button>
    </div>
  );
};

export default LanguageToggle;
