import { useEffect, useState, useCallback } from 'react';

interface UseFullscreenModalReturn {
  showModal: boolean;
  isFullscreen: boolean;
  showFullscreenModal: () => void;
  hideFullscreenModal: () => void;
  enterFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
  isDesktop: boolean;
  isMobile: boolean;
}

export const useFullscreenModal = (): UseFullscreenModalReturn => {
  const [showModal, setShowModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Device detection
  const detectDevice = useCallback(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isDesktopDevice = !isMobileDevice && window.innerWidth > 768;
    
    setIsMobile(isMobileDevice);
    setIsDesktop(isDesktopDevice);
  }, []);

  // Check if already in fullscreen
  const checkFullscreenState = useCallback(() => {
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );
    setIsFullscreen(isCurrentlyFullscreen);
    return isCurrentlyFullscreen;
  }, []);

  // Enter fullscreen
  const enterFullscreen = useCallback(async () => {
    try {
      const element = document.documentElement;
      
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
      
      setIsFullscreen(true);
    } catch (error) {
      console.warn('Failed to enter fullscreen:', error);
    }
  }, []);

  // Exit fullscreen
  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
      
      setIsFullscreen(false);
    } catch (error) {
      console.warn('Failed to exit fullscreen:', error);
    }
  }, []);

  // Show modal
  const showFullscreenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  // Hide modal
  const hideFullscreenModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Check accessibility preferences
  const checkAccessibilitySettings = useCallback(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for high contrast preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    // Check for forced colors (Windows High Contrast Mode)
    const prefersForcedColors = window.matchMedia('(forced-colors: active)').matches;
    
    // Check for color scheme preference (dark mode can indicate accessibility needs)
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check for reduced data preference (can indicate accessibility needs)
    const prefersReducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
    
    // Check if user has screen reader or other assistive technology
    const hasScreenReader = navigator.userAgent.includes('NVDA') || 
                           navigator.userAgent.includes('JAWS') || 
                           navigator.userAgent.includes('VoiceOver') ||
                           window.speechSynthesis?.speaking;
    
    // Check for keyboard navigation preference (Tab key usage)
    const prefersKeyboardNavigation = document.body.classList.contains('keyboard-navigation') ||
                                     sessionStorage.getItem('keyboard-navigation') === 'true';
    
    // Check if user has accessibility settings enabled
    const hasAccessibilityEnabled = prefersReducedMotion || 
                                   prefersHighContrast || 
                                   prefersForcedColors || 
                                   hasScreenReader ||
                                   prefersKeyboardNavigation;
    
    return {
      prefersReducedMotion,
      prefersHighContrast,
      prefersForcedColors,
      prefersDarkScheme,
      prefersReducedData,
      hasScreenReader,
      prefersKeyboardNavigation,
      hasAccessibilityEnabled
    };
  }, []);


  // Initialize device detection and fullscreen state
  useEffect(() => {
    detectDevice();
    checkFullscreenState();

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      checkFullscreenState();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Listen for window resize to update device detection
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize);

    // Listen for accessibility preference changes
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const forcedColorsQuery = window.matchMedia('(forced-colors: active)');
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const reducedDataQuery = window.matchMedia('(prefers-reduced-data: reduce)');

    const handleAccessibilityChange = () => {
      // Re-evaluate if modal should be shown when accessibility preferences change
      const accessibilitySettings = checkAccessibilitySettings();
      if (accessibilitySettings.hasAccessibilityEnabled && showModal) {
        console.log('Accessibility settings enabled, hiding fullscreen modal');
        hideFullscreenModal();
      }
    };

    // Listen for keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        sessionStorage.setItem('keyboard-navigation', 'true');
        document.body.classList.add('keyboard-navigation');
        handleAccessibilityChange();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    reducedMotionQuery.addEventListener('change', handleAccessibilityChange);
    highContrastQuery.addEventListener('change', handleAccessibilityChange);
    forcedColorsQuery.addEventListener('change', handleAccessibilityChange);
    colorSchemeQuery.addEventListener('change', handleAccessibilityChange);
    reducedDataQuery.addEventListener('change', handleAccessibilityChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
      reducedMotionQuery.removeEventListener('change', handleAccessibilityChange);
      highContrastQuery.removeEventListener('change', handleAccessibilityChange);
      forcedColorsQuery.removeEventListener('change', handleAccessibilityChange);
      colorSchemeQuery.removeEventListener('change', handleAccessibilityChange);
      reducedDataQuery.removeEventListener('change', handleAccessibilityChange);
    };
  }, [detectDevice, checkFullscreenState, checkAccessibilitySettings, showModal, hideFullscreenModal]);

  // Auto-show modal after 10 seconds if conditions are met
  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem('fullscreen-modal-seen');
    if (hasSeenModal === 'true') {
      return;
    }

    // Check if already in fullscreen
    if (checkFullscreenState()) {
      return;
    }

    // Check accessibility settings - don't show if accessibility is enabled
    const accessibilitySettings = checkAccessibilitySettings();
    if (accessibilitySettings.hasAccessibilityEnabled) {
      return;
    }

    // Check if device supports fullscreen
    const supportsFullscreen = !!(
      document.documentElement.requestFullscreen ||
      (document.documentElement as any).webkitRequestFullscreen ||
      (document.documentElement as any).mozRequestFullScreen ||
      (document.documentElement as any).msRequestFullscreen
    );
    
    if (!supportsFullscreen) {
      return;
    }

    const timer = setTimeout(() => {
      showFullscreenModal();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [checkFullscreenState, checkAccessibilitySettings, showFullscreenModal]);

  return {
    showModal,
    isFullscreen,
    showFullscreenModal,
    hideFullscreenModal,
    enterFullscreen,
    exitFullscreen,
    isDesktop,
    isMobile
  };
};
