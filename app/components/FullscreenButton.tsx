import React, { useState, useEffect } from 'react';

const FullscreenButton: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  // Detect Android device or desktop
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroidDevice = /android/.test(userAgent);
    const isIPhone = /iphone|ipad|ipod/.test(userAgent);
    const isDesktop = !isAndroidDevice && !isIPhone;
    
    // Show on Android devices and desktop browsers (but not iPhone/iPad)
    setIsAndroid(isAndroidDevice || isDesktop);
  }, []);

  // Check fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
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
      }
    } catch (error) {
      console.log('Fullscreen toggle failed:', error);
    }
  };

  // Only show on Android devices and desktop browsers (not iPhone/iPad)
  if (!isAndroid) {
    return null;
  }

  return (
    <button
      className="floating-fullscreen-btn"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      <span className="fullscreen-icon">
        {isFullscreen ? (
          // Exit fullscreen icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 3V5M8 3H5M8 3L3 8M16 3V5M16 3H19M16 3L21 8M8 21V19M8 21H5M8 21L3 16M16 21V19M16 21H19M16 21L21 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Enter fullscreen icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V8M21 8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16M16 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V16M3 16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

export default FullscreenButton;
