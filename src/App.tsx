import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// ===== MODERN COMPONENTS =====
import FloatingNavigation from '../app/components/FloatingNavigation';
import ControlBar from '../app/components/ControlBar';
import ErrorBoundary from '../app/components/ErrorBoundary';
import FPSCounter from '../app/components/FPSCounter';
import { LanguageProvider } from '../app/contexts/LanguageContext';
import { FPSProvider, useFPS } from '../app/contexts/FPSContext';

// ===== ROUTES =====
import Home from '../app/routes/home';
import WhatsIncluded from '../app/routes/whats-included';
import Catering from '../app/routes/catering';
import Gallery from '../app/routes/gallery';
import Testimonials from '../app/routes/testimonials';
import About from '../app/routes/about';
import Contact from '../app/routes/contact';
import Privacy from '../app/routes/privacy';
import Terms from '../app/routes/terms';
import Disclaimer from '../app/routes/disclaimer';
import Accessibility from '../app/routes/accessibility';
import Discover from '../app/routes/discover';
import Services from '../app/routes/services';
import FAQ from '../app/routes/faq';
import MeetTheOwner from '../app/routes/meet-the-owner';
import CreateEvent from '../app/routes/create-event';
import AdminDashboard from '../app/routes/admin-dashboard';
import Debug from '../app/routes/debug';

// ===== STYLES =====
import '../app/app.css';

// ===== SCROLL TO TOP HOOK =====
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Enhanced scroll to top function with multiple approaches
    const scrollToTop = () => {
      // Method 1: Standard smooth scroll
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

      // Method 2: Direct scroll for immediate effect
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Method 3: Force scroll for mobile devices
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          window.scroll(0, 0);
        }, 50);
      }
    };

    // Immediate scroll for instant feedback
    scrollToTop();

    // Additional scroll after content renders
    const timer = setTimeout(scrollToTop, 150);
    
    // Final scroll for stubborn cases
    const finalTimer = setTimeout(scrollToTop, 300);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(finalTimer);
    };
  }, [pathname]);

  return null;
}

// ===== FPS COUNTER WRAPPER =====
function FPSWrapper() {
  const { isVisible, closeFPS } = useFPS();
  return <FPSCounter isVisible={isVisible} onClose={closeFPS} />;
}

// ===== GLOBAL CONTROL BAR WRAPPER =====
interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  disableVideos: boolean;
}

function GlobalControlBar() {
  const [showAccessibilitySettings, setShowAccessibilitySettings] = React.useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = React.useState<AccessibilitySettings>({
    largeText: false,
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    disableVideos: false
  });

  const applyAccessibilitySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    if (settings.screenReader) {
      root.classList.add('screen-reader');
    } else {
      root.classList.remove('screen-reader');
    }
    
    if (settings.disableVideos) {
      root.classList.add('disable-videos');
    } else {
      root.classList.remove('disable-videos');
    }
  };

  const updateAccessibilitySetting = (key: keyof typeof accessibilitySettings, value: boolean) => {
    const newSettings = { ...accessibilitySettings, [key]: value };
    setAccessibilitySettings(newSettings);
    applyAccessibilitySettings(newSettings);
  };

  return (
    <ControlBar
      onClose={() => {}} // No close function needed for global control bar
      showAccessibilitySettings={showAccessibilitySettings}
      onToggleAccessibilitySettings={() => setShowAccessibilitySettings(!showAccessibilitySettings)}
      accessibilitySettings={accessibilitySettings}
      onUpdateAccessibilitySetting={updateAccessibilitySetting}
      onApplyAccessibilitySettings={applyAccessibilitySettings}
    />
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <FPSProvider>
          <Router>
            <div className="App">
              <ScrollToTop />
              <FloatingNavigation />
              <GlobalControlBar />
              <FPSWrapper />
              
              {/* Skip to main content link for accessibility */}
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/categories" element={<Home />} />
                  <Route path="/whats-included" element={<WhatsIncluded />} />
                  <Route path="/catering" element={<Catering />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/accessibility" element={<Accessibility />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/meet-the-owner" element={<MeetTheOwner />} />
                  <Route path="/create-event" element={<CreateEvent />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/debug" element={<Debug />} />
                  {/* Catch-all route for 404 */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>
            </div>
          </Router>
        </FPSProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
