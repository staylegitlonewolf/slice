import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

interface AccessibilitySettings {
  disableVideos: boolean;
  reduceMotion: boolean;
  largeText: boolean;
  fullscreen: boolean;
}

interface ControlBarProps {
  onClose?: () => void;
  showAccessibilitySettings?: boolean;
  onToggleAccessibilitySettings?: () => void;
  accessibilitySettings?: AccessibilitySettings;
  onUpdateAccessibilitySetting?: (key: keyof AccessibilitySettings, value: boolean) => void;
  onApplyAccessibilitySettings?: (settings: AccessibilitySettings) => void;
}

const ControlBar: React.FC<ControlBarProps> = ({ 
  onClose,
  showAccessibilitySettings = false,
  onToggleAccessibilitySettings,
  accessibilitySettings,
  onUpdateAccessibilitySetting,
  onApplyAccessibilitySettings
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isIPhone, setIsIPhone] = useState(false);

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

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      onUpdateAccessibilitySetting?.('fullscreen', isFullscreen);
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
  }, [onUpdateAccessibilitySetting]);

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
        onUpdateAccessibilitySetting?.('fullscreen', true);
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
        onUpdateAccessibilitySetting?.('fullscreen', false);
      }
    } catch (error) {
      console.log('Fullscreen toggle failed:', error);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
    if (onClose) onClose();
    
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <>
      {/* Floating Control Bar */}
      <div className="floating-control-bar">
        {/* Left Group: Home + Settings */}
        <div className="floating-control-bar-group-left">
          <button 
            className="lightbox-home-btn"
            onClick={handleHomeClick}
            aria-label="Go to home page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22V12H15V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{t('nav.home') || 'HOME'}</span>
          </button>
          
          <button 
            className="lightbox-settings-btn"
            onClick={onToggleAccessibilitySettings}
            aria-label="Toggle accessibility settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="8" r="1" fill="currentColor"/>
              <path d="M8 16c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{t('nav.settings') || 'SETTINGS'}</span>
          </button>
        </div>
        
        {/* Right Group: Language + Theme */}
        <div className="floating-control-bar-group-right">
          <div className="lightbox-language-btn">
            <LanguageToggle />
          </div>
          
          <div className="lightbox-theme-btn">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Accessibility Settings Lightbox */}
      {showAccessibilitySettings && (
        <div className="accessibility-lightbox-overlay" onClick={onToggleAccessibilitySettings}>
          <div className="accessibility-lightbox" onClick={(e) => e.stopPropagation()}>
            <div className="accessibility-lightbox-header">
              <div className="accessibility-lightbox-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="8" r="1" fill="currentColor"/>
                  <path d="M8 16c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2>{t('accessibility.title') || 'Accessibility Settings'}</h2>
            </div>
            
            <div className="accessibility-lightbox-content">
              <div className="accessibility-options-buttons">
                <button 
                  className={`accessibility-option-btn ${accessibilitySettings?.largeText ? 'active' : ''}`}
                  onClick={() => onUpdateAccessibilitySetting?.('largeText', !accessibilitySettings?.largeText)}
                >
                  <span className="option-icon">🔍</span>
                  <span className="option-text">{t('accessibility.largeText') || 'Large Text'}</span>
                </button>
                
                <button 
                  className={`accessibility-option-btn ${accessibilitySettings?.reduceMotion ? 'active' : ''}`}
                  onClick={() => onUpdateAccessibilitySetting?.('reduceMotion', !accessibilitySettings?.reduceMotion)}
                >
                  <span className="option-icon">🎬</span>
                  <span className="option-text">{t('accessibility.reduceMotion') || 'Reduce Motion'}</span>
                </button>
                
                <button 
                  className={`accessibility-option-btn ${accessibilitySettings?.disableVideos ? 'active' : ''}`}
                  onClick={() => onUpdateAccessibilitySetting?.('disableVideos', !accessibilitySettings?.disableVideos)}
                >
                  <span className="option-icon">📹</span>
                  <span className="option-text">{t('accessibility.disableVideos') || 'Disable Videos'}</span>
                </button>
                
                {!isIPhone && (
                  <button 
                    className={`accessibility-option-btn ${accessibilitySettings?.fullscreen ? 'active' : ''}`}
                    onClick={toggleFullscreen}
                  >
                    <span className="option-icon">⛶</span>
                    <span className="option-text">{t('accessibility.fullscreen') || 'Fullscreen'}</span>
                  </button>
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}

    </>
  );
};

export default ControlBar;
