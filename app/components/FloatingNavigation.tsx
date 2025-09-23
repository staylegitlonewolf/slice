import React, { useState, createContext, useContext } from 'react';
import CategoriesLightbox from './CategoriesLightbox';
import { useLanguage } from '../contexts/LanguageContext';

// Create context for lightbox state
interface LightboxContextType {
  isCategoriesLightboxOpen: boolean;
  setIsCategoriesLightboxOpen: (open: boolean) => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const useLightbox = () => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
};

const FloatingNavigation: React.FC = () => {
  const [isCategoriesLightboxOpen, setIsCategoriesLightboxOpen] = useState(false);
  const [showAccessibilitySettings, setShowAccessibilitySettings] = useState(false);
  const { t } = useLanguage();
  
  // Accessibility settings state
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    disableVideos: false,
    reduceMotion: false,
    largeText: false,
    fullscreen: false,
  });

  // Apply accessibility settings to the page
  const applyAccessibilitySettings = (newSettings: typeof accessibilitySettings) => {
    const root = document.documentElement;
    
    // Disable videos
    if (newSettings.disableVideos) {
      root.classList.add('disable-videos');
    } else {
      root.classList.remove('disable-videos');
    }

    // Reduce motion
    if (newSettings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Large text
    if (newSettings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Fullscreen
    if (newSettings.fullscreen) {
      root.classList.add('fullscreen-mode');
    } else {
      root.classList.remove('fullscreen-mode');
    }
  };

  // Update accessibility setting
  const updateAccessibilitySetting = (key: keyof typeof accessibilitySettings, value: boolean) => {
    const newSettings = { ...accessibilitySettings, [key]: value };
    setAccessibilitySettings(newSettings);
    applyAccessibilitySettings(newSettings);
  };

  return (
    <>
      {/* Single Floating Menu Button */}
      <button
        className="floating-menu-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('=== FLOATING MENU BUTTON CLICKED ===');
          console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
          console.log('About to toggle lightbox from:', isCategoriesLightboxOpen, 'to:', !isCategoriesLightboxOpen);
          setIsCategoriesLightboxOpen(!isCategoriesLightboxOpen);
          console.log('=== END FLOATING MENU BUTTON CLICK ===');
        }}
        aria-label={isCategoriesLightboxOpen ? String(t('home.components.floatingMenu.closeMenu')) : String(t('home.components.floatingMenu.openCategories'))}
      >
        <div className="floating-menu-content">
          <span className="floating-menu-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </button>


      {/* Categories Lightbox */}
      <CategoriesLightbox 
        isOpen={isCategoriesLightboxOpen}
        onClose={() => setIsCategoriesLightboxOpen(false)}
      />
    </>
  );
};

export default FloatingNavigation;
