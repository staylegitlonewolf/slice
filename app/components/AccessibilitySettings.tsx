import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AccessibilitySettings {
  disableVideos: boolean;
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  fullscreen: boolean;
  changeFontColor: boolean;
}

const AccessibilitySettings: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isIPhone, setIsIPhone] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    disableVideos: false,
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    fullscreen: false,
    changeFontColor: false,
  });

  // Detect iPhone devices
  useEffect(() => {
    const detectIPhone = () => {
      const userAgent = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window;
      const isWebKit = /WebKit/.test(userAgent);
      
      setIsIPhone(isIOS || (isSafari && isTouchDevice && isWebKit));
    };

    detectIPhone();
  }, []);

  // Always start with default settings, no localStorage
  useEffect(() => {
    // Don't load from localStorage - always start fresh
    const defaultSettings = {
      disableVideos: false,
      reduceMotion: false,
      highContrast: false,
      largeText: false,
      fullscreen: false,
      changeFontColor: false,
    };
    setSettings(defaultSettings);
    applySettings(defaultSettings);
  }, []);

  // Apply settings without saving to localStorage
  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    // Don't save to localStorage - just apply for current session
    applySettings(newSettings);
  };

  // Fullscreen toggle function
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Enter fullscreen
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen();
        } else if ((document.documentElement as any).mozRequestFullScreen) {
          await (document.documentElement as any).mozRequestFullScreen();
        } else if ((document.documentElement as any).msRequestFullscreen) {
          await (document.documentElement as any).msRequestFullscreen();
        }
        updateSetting('fullscreen', true);
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
        updateSetting('fullscreen', false);
      }
    } catch (error) {
      console.log('Fullscreen toggle failed:', error);
    }
  };

  // Apply accessibility settings to the page
  const applySettings = (newSettings: AccessibilitySettings) => {
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

    // High contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (newSettings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Change font color (high contrast black/white or white/black)
    if (newSettings.changeFontColor) {
      root.classList.add('font-color-contrast');
    } else {
      root.classList.remove('font-color-contrast');
    }
  };

  // Apply settings on mount
  useEffect(() => {
    applySettings(settings);
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setSettings(prev => ({ ...prev, fullscreen: isFullscreen }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Handle click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking the button itself or inside the panel
      if (panelRef.current && !panelRef.current.contains(target) && 
          buttonRef.current && !buttonRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accessibility-settings">
      {/* Accessibility Button */}
      <button
        ref={buttonRef}
        className="accessibility-btn"
        onClick={togglePanel}
        aria-label={isOpen ? String(t('home.components.accessibility.closeSettings')) : String(t('home.components.accessibility.openSettings'))}
        title={String(t('home.components.accessibility.settingsTitle'))}
      >
        <div className="accessibility-btn-content">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
            <path d="M8 16c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="accessibility-btn-text">SETTINGS</span>
        </div>
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className={`accessibility-panel ${isOpen ? 'open' : ''}`} ref={panelRef} style={{ position: 'relative' }}>
          <div className="accessibility-panel-header">
            <h3>{t('accessibility.title')}</h3>
          </div>

          <div className="accessibility-options">
            <div className="accessibility-option">
              <label className="accessibility-label">
                <input
                  type="checkbox"
                  checked={settings.largeText}
                  onChange={(e) => updateSetting('largeText', e.target.checked)}
                />
                <span className="checkmark"></span>
                <div className="option-content">
                  <span className="option-title">{t('accessibility.largeText')}</span>
                  <span className="option-description">{t('accessibility.largeTextDesc')}</span>
                </div>
              </label>
            </div>

            {!isIPhone && (
              <div className="accessibility-option fullscreen-option">
                <label className="accessibility-label">
                  <input
                    type="checkbox"
                    checked={settings.fullscreen}
                    onChange={toggleFullscreen}
                  />
                  <span className="checkmark"></span>
                  <div className="option-content">
                    <span className="option-title">{t('accessibility.fullscreen')}</span>
                    <span className="option-description">{t('accessibility.fullscreenDesc')}</span>
                  </div>
                </label>
              </div>
            )}

            <div className="accessibility-option">
              <label className="accessibility-label">
                <input
                  type="checkbox"
                  checked={settings.disableVideos}
                  onChange={(e) => updateSetting('disableVideos', e.target.checked)}
                />
                <span className="checkmark"></span>
                <div className="option-content">
                  <span className="option-title">{t('accessibility.disableVideos')}</span>
                  <span className="option-description">{t('accessibility.disableVideosDesc')}</span>
                </div>
              </label>
            </div>


            <div className="accessibility-option">
              <label className="accessibility-label">
                <input
                  type="checkbox"
                  checked={settings.reduceMotion}
                  onChange={(e) => updateSetting('reduceMotion', e.target.checked)}
                />
                <span className="checkmark"></span>
                <div className="option-content">
                  <span className="option-title">{t('accessibility.reduceMotion')}</span>
                  <span className="option-description">{t('accessibility.reduceMotionDesc')}</span>
                </div>
              </label>
            </div>

            <div className="accessibility-option">
              <label className="accessibility-label">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => updateSetting('highContrast', e.target.checked)}
                />
                <span className="checkmark"></span>
                <div className="option-content">
                  <span className="option-title">{t('accessibility.highContrast')}</span>
                  <span className="option-description">{t('accessibility.highContrastDesc')}</span>
                </div>
              </label>
            </div>

            <div className="accessibility-option">
              <label className="accessibility-label">
                <input
                  type="checkbox"
                  checked={settings.changeFontColor}
                  onChange={(e) => updateSetting('changeFontColor', e.target.checked)}
                />
                <span className="checkmark"></span>
                <div className="option-content">
                  <span className="option-title">{t('accessibility.changeFontColor')}</span>
                  <span className="option-description">{t('accessibility.changeFontColorDesc')}</span>
                </div>
              </label>
            </div>
          </div>

          <div className="accessibility-footer">
            <button
              className="reset-btn"
              onClick={() => {
                const defaultSettings: AccessibilitySettings = {
                  disableVideos: false,
                  reduceMotion: false,
                  highContrast: false,
                  largeText: false,
                  fullscreen: false,
                  changeFontColor: false,
                };
                setSettings(defaultSettings);
                // Don't save to localStorage - just apply for current session
                applySettings(defaultSettings);
              }}
            >
              {t('buttons.reset')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilitySettings;
