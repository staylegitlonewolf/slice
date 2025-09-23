import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// iOS Fullscreen App-like Experience
const initFullscreenExperience = () => {
  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Set viewport height to actual screen height
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Set initial viewport height
    setViewportHeight();
    
    // Update on orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 100);
    });
    
    // Update on resize
    window.addEventListener('resize', setViewportHeight);
    
    // Prevent zoom on double tap (but allow scrolling)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        // Only prevent default for double taps, not scrolling
        if (event.target && (event.target as HTMLElement).tagName !== 'A') {
          event.preventDefault();
        }
      }
      lastTouchEnd = now;
    }, false);
    
    // Hide address bar on scroll (gentle approach)
    let ticking = false;
    const hideAddressBar = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Only hide if we're at the top
          if (window.scrollY === 0) {
            window.scrollTo(0, 1);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial hide (only once)
    setTimeout(() => {
      if (window.scrollY === 0) {
        window.scrollTo(0, 1);
      }
    }, 100);
  }
};

// Initialize fullscreen experience
initFullscreenExperience();

// Register service worker for offline support (only in production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
} else if ('serviceWorker' in navigator && import.meta.env.DEV) {
  // Unregister service worker in development
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
      console.log('SW unregistered for development');
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
