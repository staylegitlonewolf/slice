
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getTimeAgo, getDateFromTimeAgo } from '../utils/timeUtils';
import FullscreenModal from '../components/FullscreenModal';
import { useFullscreenModal } from '../hooks/useFullscreenModal';
import CategoriesLightbox from '../components/CategoriesLightbox';
import LanguageToggle from '../components/LanguageToggle';
import Footer from '../components/Footer';

const BASE = (import.meta as any).env?.BASE_URL || '/';
// Helper to prefix with base
const withBase = (p: string) => (p.startsWith('/') ? `${BASE}${p.slice(1)}` : `${BASE}${p}`);

const Home: React.FC = () => {
  const { t, tString } = useLanguage();
  
  // Fullscreen modal functionality
  const {
    showModal,
    isFullscreen,
    showFullscreenModal,
    hideFullscreenModal,
    enterFullscreen,
    exitFullscreen,
    isDesktop,
    isMobile
  } = useFullscreenModal();
  
  // State for animated numbers
  const [animatedStats, setAnimatedStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    fiveStarReviews: 0,
    wouldRecommend: 0
  });
  
  const [statsAnimated, setStatsAnimated] = useState(false);
  
  // State for rotating reviews
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [nextReviewIndex, setNextReviewIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // State for categories lightbox
  const [isCategoriesLightboxOpen, setIsCategoriesLightboxOpen] = useState(false);
  
  // State for rotating photos
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoTransitioning, setIsPhotoTransitioning] = useState(false);
  
  
  // Animation function for counting up numbers
  const animateNumber = (start: number, end: number, duration: number, callback: (value: number) => void) => {
    console.log(`Starting animation from ${start} to ${end}`);
    const startTime = performance.now();
    const difference = end - start;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = start + (difference * easeOutQuart);
      
      callback(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        console.log(`Animation completed: ${end}`);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  // Intersection Observer for triggering animation when stats section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            console.log('Stats section is intersecting, starting animation');
            setStatsAnimated(true);
            
            // Start animations with different durations for variety
            animateNumber(0, 4.6, 2000, (value) => {
              setAnimatedStats(prev => ({ ...prev, averageRating: value }));
            });
            
            animateNumber(0, 93, 2500, (value) => {
              setAnimatedStats(prev => ({ ...prev, totalReviews: Math.floor(value) }));
            });
            
            animateNumber(0, 85, 2200, (value) => {
              setAnimatedStats(prev => ({ ...prev, fiveStarReviews: Math.floor(value) }));
            });
            
            animateNumber(0, 100, 1800, (value) => {
              setAnimatedStats(prev => ({ ...prev, wouldRecommend: Math.floor(value) }));
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const statsSection = document.getElementById('google-reviews-stats');
    if (statsSection) {
      console.log('Observing stats section:', statsSection);
      observer.observe(statsSection);
    } else {
      console.log('Stats section not found');
    }
    
    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, [statsAnimated]);

  // Fallback: Trigger animation after component mounts if not already animated
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!statsAnimated) {
        console.log('Fallback: Triggering stats animation');
        setStatsAnimated(true);
        
        // Start animations with different durations for variety
        animateNumber(0, 4.6, 2000, (value) => {
          setAnimatedStats(prev => ({ ...prev, averageRating: value }));
        });
        
        animateNumber(0, 93, 2500, (value) => {
          setAnimatedStats(prev => ({ ...prev, totalReviews: Math.floor(value) }));
        });
        
        animateNumber(0, 85, 2200, (value) => {
          setAnimatedStats(prev => ({ ...prev, fiveStarReviews: Math.floor(value) }));
        });
        
        animateNumber(0, 100, 1800, (value) => {
          setAnimatedStats(prev => ({ ...prev, wouldRecommend: Math.floor(value) }));
        });
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(fallbackTimer);
  }, [statsAnimated]);
  
  // Catering gallery images - first 10 only
  const cateringImages = [
    withBase('/3_Catering/1.jpg'), withBase('/3_Catering/2.png'), withBase('/3_Catering/3.jpg'), withBase('/3_Catering/4.jpg'),
    withBase('/3_Catering/5.jpg'), withBase('/3_Catering/6.jpg'), withBase('/3_Catering/7.jpg'), withBase('/3_Catering/8.jpg'),
    withBase('/3_Catering/9.jpg'), withBase('/3_Catering/10.jpg')
  ];

  // Events gallery images
  const eventsImages = [
    withBase('/1_Home/slicePhoto1.png'),
    withBase('/1_Home/slicePhoto2.png'),
    withBase('/1_Home/sliceEntrance.png')
  ];

  // Photo showcase array - Venue Highlights
  const showcasePhotos = [
    withBase('/1_Home/VenueHighlights/homeBackground1.png'),
    withBase('/1_Home/VenueHighlights/homeBackground2.png'),
    withBase('/1_Home/VenueHighlights/homeBackground3.png'),
    withBase('/1_Home/VenueHighlights/homeBackground4.png'),
    withBase('/1_Home/VenueHighlights/homeBackground5.png')
  ];

  // Sample Google reviews for rotation
  const sampleReviews = [
    {
      id: 1,
      name: "Mayte Garcia",
      initials: "MG",
      rating: 5,
      date: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
      text: t('home.reviews.mayteGarcia.text'),
      photos: [
        withBase('/Google Review/MayteGarcia/1.png'),
        withBase('/Google Review/MayteGarcia/2.png'), 
        withBase('/Google Review/MayteGarcia/3.png'),
        withBase('/Google Review/MayteGarcia/4.png'),
        withBase('/Google Review/MayteGarcia/5.png')
      ]
    },
    {
      id: 2,
      name: "Kalhan Raina",
      initials: "KR",
      rating: 5,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      text: t('home.reviews.kalhanRaina.text')
    },
    {
      id: 3,
      name: "Alina Gonzalez",
      initials: "AG",
      rating: 5,
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
      text: t('home.reviews.alinaGonzalez.text')
    },
    {
      id: 4,
      name: "Sarah Johnson",
      initials: "SJ",
      rating: 5,
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      text: t('home.reviews.sarahJohnson.text')
    },
    {
      id: 5,
      name: "Michael Rodriguez",
      initials: "MR",
      rating: 5,
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 3 weeks ago
      text: t('home.reviews.michaelRodriguez.text')
    },
    {
      id: 6,
      name: "Jennifer Lee",
      initials: "JL",
      rating: 5,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      text: t('home.reviews.jenniferLee.text')
    }
  ];

  useEffect(() => {
    // Initialize catering gallery fade
    const initCateringGallery = () => {
      const container = document.getElementById('catering-gallery-container');
      if (!container) return;

      let currentIndex = 0;
      const totalItems = cateringImages.length;

      // Create gallery images with fade effect
      container.innerHTML = '';
      cateringImages.forEach((image, index) => {
        const img = document.createElement('img');
        img.alt = `Catering ${index + 1}`;
        img.className = 'gallery-fade-image';
        img.style.opacity = index === 0 ? '1' : '0';
        img.style.display = index === 0 ? 'block' : 'none';
        
        // Set up lazy loading
        img.dataset.src = image;
        img.loading = 'lazy';
        
        // Show image when loaded
        img.onload = () => {
          if (index === 0) {
            img.style.display = 'block';
            img.style.opacity = '1';
            img.classList.add('loaded');
          }
        };
        
        // Handle load errors
        img.onerror = () => {
          img.style.display = 'none';
        };
        
        container.appendChild(img);
      });

      // Fade transition function
      const fadeToNext = () => {
        const currentImg = container.children[currentIndex] as HTMLImageElement;
        const nextIndex = (currentIndex + 1) % totalItems;
        const nextImg = container.children[nextIndex] as HTMLImageElement;
        
        // Load next image if not already loaded
        if (nextImg.dataset.src) {
          nextImg.src = nextImg.dataset.src;
          nextImg.removeAttribute('data-src');
        }
        
        // Fade out current image
        currentImg.style.transition = 'opacity 1s ease-in-out';
        currentImg.style.opacity = '0';
        
        // After fade out, switch images
        setTimeout(() => {
          currentImg.style.display = 'none';
          nextImg.style.display = 'block';
          nextImg.style.transition = 'opacity 1s ease-in-out';
          nextImg.style.opacity = '1';
          currentIndex = nextIndex;
        }, 1000);
      };

      // Load first image immediately
      const firstImg = container.children[0] as HTMLImageElement;
      if (firstImg && firstImg.dataset.src) {
        firstImg.src = firstImg.dataset.src;
        firstImg.removeAttribute('data-src');
      }

      // Preload next few images
      const preloadImages = () => {
        for (let i = 1; i < Math.min(4, totalItems); i++) {
          const img = container.children[i] as HTMLImageElement;
          if (img && img.dataset.src) {
            const preloadImg = new Image();
            preloadImg.onload = () => {
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
            };
            preloadImg.src = img.dataset.src;
          }
        }
      };

      // Start preloading after a delay
      setTimeout(preloadImages, 1000);

      // Auto-play with fade effect - slower timing
      let autoPlay = setInterval(fadeToNext, 6000);
      
      // Pause on hover
      container.addEventListener('mouseenter', () => clearInterval(autoPlay));
      container.addEventListener('mouseleave', () => {
        autoPlay = setInterval(fadeToNext, 6000);
      });
    };

    // Initialize events gallery fade
    const initEventsGallery = () => {
      const container = document.getElementById('events-gallery-container');
      if (!container) return;

      let currentIndex = 0;
      const totalItems = eventsImages.length;

      // Create gallery images with fade effect
      container.innerHTML = '';
      eventsImages.forEach((image, index) => {
        const img = document.createElement('img');
        img.alt = `Event ${index + 1}`;
        img.className = 'gallery-fade-image';
        img.style.opacity = index === 0 ? '1' : '0';
        img.style.display = index === 0 ? 'block' : 'none';
        
        // Set up lazy loading
        img.dataset.src = image;
        img.loading = 'lazy';
        
        // Show image when loaded
        img.onload = () => {
          if (index === 0) {
            img.style.display = 'block';
            img.style.opacity = '1';
            img.classList.add('loaded');
          }
        };
        
        // Handle load errors
        img.onerror = () => {
          img.style.display = 'none';
        };
        
        container.appendChild(img);
      });

      // Fade transition function
      const fadeToNext = () => {
        const currentImg = container.children[currentIndex] as HTMLImageElement;
        const nextIndex = (currentIndex + 1) % totalItems;
        const nextImg = container.children[nextIndex] as HTMLImageElement;
        
        // Load next image if not already loaded
        if (nextImg.dataset.src) {
          nextImg.src = nextImg.dataset.src;
          nextImg.removeAttribute('data-src');
        }
        
        // Fade out current image
        currentImg.style.transition = 'opacity 1s ease-in-out';
        currentImg.style.opacity = '0';
        
        // After fade out, switch images
        setTimeout(() => {
          currentImg.style.display = 'none';
          nextImg.style.display = 'block';
          nextImg.style.transition = 'opacity 1s ease-in-out';
          nextImg.style.opacity = '1';
          currentIndex = nextIndex;
        }, 1000);
      };

      // Load first image immediately
      const firstImg = container.children[0] as HTMLImageElement;
      if (firstImg && firstImg.dataset.src) {
        firstImg.src = firstImg.dataset.src;
        firstImg.removeAttribute('data-src');
      }

      // Preload next few images
      const preloadImages = () => {
        for (let i = 1; i < Math.min(4, totalItems); i++) {
          const img = container.children[i] as HTMLImageElement;
          if (img && img.dataset.src) {
            const preloadImg = new Image();
            preloadImg.onload = () => {
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
            };
            preloadImg.src = img.dataset.src;
          }
        }
      };

      // Start preloading after a delay
      setTimeout(preloadImages, 1000);

      // Auto-play with fade effect - slower timing
      let autoPlay = setInterval(fadeToNext, 6000);
      
      // Pause on hover
      container.addEventListener('mouseenter', () => clearInterval(autoPlay));
      container.addEventListener('mouseleave', () => {
        autoPlay = setInterval(fadeToNext, 6000);
      });
    };

    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initCateringGallery, 100);
    setTimeout(initEventsGallery, 200);
  }, []);

  // Update current time every minute for real-time timestamps
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timeInterval);
  }, []);

  // Rotating reviews effect with slide animation
  useEffect(() => {
    const rotateReviews = () => {
      setIsTransitioning(true);
      
      // After transition starts, update the current review
      setTimeout(() => {
        setCurrentReviewIndex(nextReviewIndex);
        setNextReviewIndex((nextReviewIndex + 1) % sampleReviews.length);
        setIsTransitioning(false);
      }, 300); // Half of the transition duration
    };

    // Start rotation after 3 seconds, then every 4 seconds
    const interval = setInterval(rotateReviews, 4000);
    
    // Initial delay before starting rotation
    const initialTimeout = setTimeout(() => {
      rotateReviews();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [nextReviewIndex, sampleReviews.length]);

  // Rotating photos effect
  useEffect(() => {
    const rotatePhotos = () => {
      setIsPhotoTransitioning(true);
      
      // After transition starts, update the current photo
      setTimeout(() => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % showcasePhotos.length);
        setIsPhotoTransitioning(false);
      }, 300);
    };

    // Start rotation after 2 seconds, then every 3 seconds
    const interval = setInterval(rotatePhotos, 3000);
    
    // Initial delay before starting rotation
    const initialTimeout = setTimeout(() => {
      rotatePhotos();
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [showcasePhotos.length]);

  // Fullscreen modal handlers
  const handleFullscreenAccept = async () => {
    try {
      await enterFullscreen();
      // Mark as seen in session storage
      sessionStorage.setItem('fullscreen-modal-seen', 'true');
    } catch (error) {
      console.warn('Failed to enter fullscreen:', error);
    }
  };

  const handleFullscreenDecline = () => {
    // Mark as seen in session storage
    sessionStorage.setItem('fullscreen-modal-seen', 'true');
  };

  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section has-video">
        {/* Background Video */}
        <video 
          className="hero-video-background" 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="metadata"
        >
          <source src={withBase('/1_Home/hero-background.mp4')} type="video/mp4" />
        </video>
        
        {/* Video Overlay */}
        <div className="hero-video-overlay"></div>
        
        <div className="hero-content">
          {/* Hero Logo and Text - Side by Side */}
          <div className="hero-logo-text-container">
            <div className="hero-logo-section">
              <img 
                src={withBase('/logo.png')} 
                alt={tString('home.accessibility.logoAlt')} 
                className="hero-logo-img"
              />
            </div>
            <div className="hero-text-section">
              <h1 className="hero-title">{t('home.hero.title')}</h1>
              <p 
                className="hero-description"
                style={{ 
                  color: '#ffffff !important', 
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.8) !important' 
                }}
              >
                {t('home.hero.subtitle')}
              </p>
            </div>
          </div>
          
          {/* Scroll Down Indicator - Now under the logo and text */}
          <div className="scroll-indicator">
            <div className="scroll-text">{t('home.hero.scrollDown')}</div>
            <div className="scroll-arrow"></div>
          </div>
          
          {/* Action Buttons - At the bottom */}
          <div className="hero-action-buttons animate-fade-in-up animate-delay-1">
            <Link 
              to="/contact" 
              className="schedule-tour-btn"
            >
              <span className="btn-icon">📅</span>
              <span>{t('buttons.scheduleTour')}</span>
            </Link>
            <button 
              className="view-menu-btn"
              onClick={() => {
                const element = document.getElementById('types-of-celebrations');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="btn-icon">🎉</span>
              <span>{t('buttons.celebrations')}</span>
            </button>
          </div>
      </div>
      </section>

      {/* Statistics Cards Section */}
      <section className="section stats-showcase-section">
        <div className="container">
          <div className="venue-stats-section">
            <div className="venue-stats-grid">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">{t('home.stats.eventsHosted')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">220</div>
                <div className="stat-label">{t('home.stats.guestCapacity')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">{t('home.stats.clientSatisfaction')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">{t('home.stats.yearsExperience')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Celebrations Section */}
      <section id="types-of-celebrations" className="section">
        <div className="container">
          {/* Header with Video Layout - matching CTA section structure */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Video Column */}
            <div className="video-column">
              <div className="video-container">
                <video
                  className="cta-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={withBase('/1_Home/social-media-demo1.mp4')} type="video/mp4" />
                  {t('home.accessibility.videoNotSupported')}
                </video>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="content-column text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-slice-primary mb-6">
                {t('pages.celebrations.typesOfCelebrations')}
              </h2>
              <p className="text-xl text-slice-gray-700 mb-8">
                {t('pages.celebrations.specializeInCreating')}
              </p>
              
            </div>
          </div>
          
          
          {/* Celebrations Grid */}
          <div className="celebrations-cards-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="celebration-card" style={{backgroundImage: 'url(/TypesofCelebrations/weddings.png)'}}>
              <div className="celebration-card-overlay">
                <div className="celebration-card-content text-center">
                  <div className="text-4xl mb-4">💒</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('pages.celebrations.celebrationCards.weddings.title')}</h3>
                  <p className="text-white mb-4">
                    {t('pages.celebrations.celebrationCards.weddings.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="celebration-card" style={{backgroundImage: 'url(/TypesofCelebrations/bar_bat_mitzvahs.png)'}}>
              <div className="celebration-card-overlay">
                <div className="celebration-card-content text-center">
                  <div className="text-4xl mb-4">🕯️</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('pages.celebrations.celebrationCards.barBatMitzvahs.title')}</h3>
                  <p className="text-white mb-4">
                    {t('pages.celebrations.celebrationCards.barBatMitzvahs.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="celebration-card" style={{backgroundImage: 'url(/TypesofCelebrations/quince.jpg)'}}>
              <div className="celebration-card-overlay">
                <div className="celebration-card-content text-center">
                  <div className="text-4xl mb-4">👑</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('pages.celebrations.celebrationCards.quinceaneras.title')}</h3>
                  <p className="text-white mb-4">
                    {t('pages.celebrations.celebrationCards.quinceaneras.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="celebration-card" style={{backgroundImage: 'url(/TypesofCelebrations/birthday.png)'}}>
              <div className="celebration-card-overlay">
                <div className="celebration-card-content text-center">
                  <div className="text-4xl mb-4">🎂</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('pages.celebrations.celebrationCards.birthdays.title')}</h3>
                  <p className="text-white mb-4">
                    {t('pages.celebrations.celebrationCards.birthdays.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="celebration-card" style={{backgroundImage: 'url(/TypesofCelebrations/corporate.jpg)'}}>
              <div className="celebration-card-overlay">
                <div className="celebration-card-content text-center">
                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('pages.celebrations.celebrationCards.corporate.title')}</h3>
                  <p className="text-white mb-4">
                    {t('pages.celebrations.celebrationCards.corporate.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="celebration-card" style={{backgroundImage: 'url(/TypesofCelebrations/specialevents.png)'}}>
              <div className="celebration-card-overlay">
                <div className="celebration-card-content text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('pages.celebrations.celebrationCards.specialEvents.title')}</h3>
                  <p className="text-white mb-4">
                    {t('pages.celebrations.celebrationCards.specialEvents.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Google Reviews Stats */}
      <section id="google-reviews-stats" className="section stats-section">
        <div className="container">
          <div className="section-header text-center mb-8">
            <h2 className="section-title google-reviews-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="google-icon-title">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('testimonials.googleReviews.title')}
            </h2>
          </div>
          <div className="google-stats-grid">
            <div className="stat-card text-center">
              <div className="stat-stars mb-2">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`star ${index < 4 ? 'filled' : index === 4 ? 'half-filled' : 'empty'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="stat-label text-slice-gray-600">{t('home.stats.averageRating')}</div>
            </div>
            <div className="stat-card text-center">
              <div className="stat-number text-4xl font-bold text-slice-primary mb-2">
                {animatedStats.totalReviews}+
              </div>
              <div className="stat-label text-slice-gray-600">{t('home.stats.totalReviews')}</div>
            </div>
            <div className="stat-card text-center">
              <div className="stat-number text-4xl font-bold text-slice-primary mb-2">
                {animatedStats.fiveStarReviews}%
              </div>
              <div className="stat-label text-slice-gray-600">{t('home.stats.fiveStarReviews')}</div>
            </div>
            <div className="stat-card text-center">
              <div className="stat-number text-4xl font-bold text-slice-primary mb-2">
                {animatedStats.wouldRecommend}%
              </div>
              <div className="stat-label text-slice-gray-600">{t('home.stats.wouldRecommend')}</div>
            </div>
          </div>
          
          {/* Reviews and Photo Showcase Layout */}
          <div className="reviews-showcase-layout mt-12">
            {/* Reviews Section */}
            <div className="reviews-section">
              <div className="rotating-reviews-container">
                <div className="reviews-layout">
                  <div className={`rotating-review-card ${isTransitioning ? 'transitioning' : 'visible'}`}>
                    <div className="review-header">
                      <div className="review-avatar">
                        {sampleReviews[currentReviewIndex].initials}
                      </div>
                      <div className="review-user-info">
                        <div className="review-name">{sampleReviews[currentReviewIndex].name}</div>
                        <div className="review-time">{getTimeAgo(sampleReviews[currentReviewIndex].date)}</div>
                      </div>
                      <div className="review-stars">
                        {[...Array(sampleReviews[currentReviewIndex].rating)].map((_, i) => (
                          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="star-icon">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="review-content">
                      <div className="review-quote-open">"</div>
                      <div className="review-text">{sampleReviews[currentReviewIndex].text}</div>
                      <div className="review-quote-close">"</div>
                      {sampleReviews[currentReviewIndex].photos && (
                        <div className="review-photos">
                          <div className="review-photos-grid">
                            {sampleReviews[currentReviewIndex].photos.slice(0, 3).map((photo, index) => (
                              <img 
                                key={index}
                                src={photo} 
                                alt={`Photo ${index + 1} from ${sampleReviews[currentReviewIndex].name}'s review`}
                                className="review-photo"
                              />
                            ))}
                            {sampleReviews[currentReviewIndex].photos.length > 3 && (
                              <div className="review-photo-more">
                                +{sampleReviews[currentReviewIndex].photos.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="reviews-action mt-6">
                    <Link 
                      to="/testimonials" 
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {t('buttons.seeReviews')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Showcase Section */}
            <div className="photo-showcase-section">
              <div className="photo-showcase-header">
                <h3 className="photo-showcase-title">{t('home.photoShowcase.title')}</h3>
                <p className="photo-showcase-subtitle">{t('home.photoShowcase.subtitle')}</p>
              </div>
              <div className="photo-showcase-container">
                <div className={`showcase-photo ${isPhotoTransitioning ? 'transitioning' : 'visible'}`}>
                  <img 
                    src={showcasePhotos[currentPhotoIndex]} 
                    alt={tString('home.accessibility.venueInteriorAlt')}
                    className="showcase-image"
                  />
                </div>
                <div className="photo-indicators">
                  {showcasePhotos.map((_, index) => (
                    <div 
                      key={index}
                      className={`indicator ${index === currentPhotoIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>
                <div className="gallery-action">
                  <Link 
                    to="/gallery" 
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"/>
                    </svg>
                    {t('home.photoShowcase.seeGallery')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* TikTok Video Section */}
      <section className="section tiktok-video-section">
        <div className="container">
          <div className="tiktok-video-container">
            <div className="tiktok-video-wrapper">
              <video
                className="tiktok-video"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={withBase('/1_Home/venue-welcome.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="tiktok-video-content">
              <h3 className="tiktok-video-title">{t('home.tiktokVideo.title')}</h3>
              <p className="tiktok-video-description">
                {t('home.tiktokVideo.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Showcase */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="venue-showcase-image animate-slide-in-left animate-delay-1">
              <div className="venue-video-container">
                <video
                  className="venue-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={withBase('/floorPlan.jpg')}
                >
                  <source src={withBase('/1_Home/venue-highlight-2.mp4')} type="video/mp4" />
                </video>
                <div className="venue-video-overlay"></div>
              </div>
            </div>
            
            <div className="venue-showcase-content animate-slide-in-right animate-delay-2">
              <h2 className="section-title text-left">{t('home.venueShowcase.title')}</h2>
              <p className="text-lg mb-6">
                {t('home.venueShowcase.description')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center animate-fade-in-up animate-delay-3">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.venueShowcase.features.0')}
                </li>
                <li className="flex items-center animate-fade-in-up animate-delay-4">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.venueShowcase.features.1')}
                </li>
                <li className="flex items-center animate-fade-in-up animate-delay-5">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.venueShowcase.features.2')}
                </li>
                <li className="flex items-center animate-fade-in-up animate-delay-6">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.venueShowcase.features.3')}
                </li>
                <li className="flex items-center animate-fade-in-up animate-delay-7">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.venueShowcase.features.4')}
                </li>
              </ul>
              <div className="text-center">
                <Link to="/whats-included" className="btn btn-primary animate-scale-in animate-delay-8">
                  {t('buttons.seeWhatsIncluded')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Gallery Section */}
      <section className="section events-gallery-section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Events Video */}
            <div className="events-gallery animate-slide-in-left animate-delay-1">
              <div className="gallery-fade-container">
                <div className="events-video-container">
                  <video
                    className="events-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src={withBase('/1_Home/events-celebrations.mp4')} type="video/mp4" />
                    {t('home.accessibility.videoNotSupported')}
                  </video>
                </div>
              </div>
            </div>
            
            {/* Events Content */}
            <div className="events-content animate-slide-in-right animate-delay-2">
              <h3 className="text-2xl md:text-3xl font-bold text-slice-primary mb-6">
                {t('home.eventsGallery.title')}
              </h3>
              <p className="text-lg text-slice-gray-700 mb-6">
                {t('home.eventsGallery.subtitle')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.eventsGallery.features.1')}
                </li>
                <li className="flex items-center">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.eventsGallery.features.2')}
                </li>
                <li className="flex items-center">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.eventsGallery.features.3')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Catering Section */}
      <section className="section catering-section">
        <div className="container">
          <div className="section-header text-center mb-12">
            <h2 className="section-title">{t('home.catering.title')}</h2>
            <p className="section-subtitle">
              {t('home.catering.subtitle')}
            </p>
          </div>
          
          {/* Catering Video and Gallery */}
          <div className="catering-media-container mb-12">
            <div className="catering-media-grid">
              {/* Video */}
              <div className="catering-video-container">
                <div className="video-wrapper">
                  <video
                    className="catering-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={withBase('/Category/catering.png')}
                  >
                    <source src={withBase('/3_Catering/cateringVideo.mp4')} type="video/mp4" />
                    {t('home.accessibility.videoNotSupported')}
                  </video>
                  <div className="video-overlay"></div>
                </div>
              </div>
              
              {/* Catering Gallery */}
              <div className="catering-gallery-container">
                <div className="gallery-fade-container">
                  <div className="gallery-image-container" id="catering-gallery-container">
                    {/* Gallery images will be populated by JavaScript */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Centered Catering Content */}
          <div className="flex justify-center">
            <div className="catering-content text-center max-w-2xl animate-fade-in-up animate-delay-1">
              <h3 className="text-2xl font-bold mb-6">{t('home.catering.heading')}</h3>
              <p className="text-lg mb-6">
                {t('home.catering.description')}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center animate-fade-in-up animate-delay-2">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.catering.features.0')}
                </li>
                <li className="flex items-center justify-center animate-fade-in-up animate-delay-3">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.catering.features.1')}
                </li>
                <li className="flex items-center justify-center animate-fade-in-up animate-delay-4">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.catering.features.2')}
                </li>
                <li className="flex items-center justify-center animate-fade-in-up animate-delay-5">
                  <span className="text-slice-primary mr-3">✓</span>
                  {t('home.catering.features.3')}
                </li>
              </ul>
              <div className="text-center">
                <Link to="/catering" className="btn btn-primary animate-scale-in animate-delay-7">
                  {t('buttons.viewCateringMenu')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="section cta-section-with-video">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Video Column */}
            <div className="video-column animate-slide-in-left animate-delay-1">
              <div className="video-container">
                <video
                  className="cta-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={withBase('/1_Home/venue-highlight-3.mp4')} type="video/mp4" />
                </video>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="content-column text-center md:text-left animate-slide-in-right animate-delay-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slice-primary mb-6">
                {t('home.cta.title')}
          </h2>
              <p className="text-xl text-slice-gray-700 mb-8">
                {t('home.cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/contact" className="btn bg-white text-slice-primary hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce-in animate-delay-3">
                  {t('buttons.startPlanning')}
            </Link>
                <a href="tel:954-557-7086" className="btn btn-outline border-2 border-slice-primary text-slice-primary hover:bg-slice-primary hover:text-white transform hover:scale-105 transition-all duration-300 animate-bounce-in animate-delay-4">
                  {t('buttons.call')}
            </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section social-media-section">
        <div className="container">
          <div className="section-header text-center mb-12">
            <h2 className="section-title">{t('home.socialMedia.title')}</h2>
            <p className="section-subtitle">
              {t('home.socialMedia.subtitle')}
            </p>
          </div>
          
          <div className="social-media-embed-container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Instagram Embed */}
              <div className="instagram-embed-wrapper animate-slide-in-left animate-delay-1">
                <iframe 
                  src="https://www.instagram.com/SliceWeston/embed/" 
                  width="350" 
                  height="450" 
                  frameBorder="0" 
                  scrolling="no" 
                  style={{
                    border: 'none',
                    borderRadius: 'var(--slice-radius-lg)',
                    boxShadow: 'var(--slice-shadow-lg)',
                    transition: 'transform var(--slice-transition-normal), box-shadow var(--slice-transition-normal)'
                  }}
                  className="instagram-embed"
                  title={tString('home.accessibility.instagramProfileTitle')}
                ></iframe>
              </div>
              
              {/* Social Links - Now on the right */}
              <div className="social-links text-center animate-fade-in animate-delay-2">
                <h3 className="text-2xl font-bold mb-6">
                  {t('home.socialMedia.connectWithUs')}
                </h3>
                <p className="text-lg mb-8">
                  {t('home.socialMedia.description')}
                </p>
                <div className="flex flex-row justify-center gap-6">
                  <a 
                    href="https://www.instagram.com/sliceweston/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link instagram animate-bounce-in animate-delay-3"
                    aria-label={tString('home.accessibility.followInstagram')}
                  >
                    <img src={withBase('/SocialMedia/instagramLogo.png')} alt={tString('home.accessibility.instagramAlt')} className="social-logo" />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@sliceweston" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link tiktok animate-bounce-in animate-delay-4"
                    aria-label={tString('home.accessibility.followTiktok')}
                  >
                    <img src={withBase('/SocialMedia/tiktokLogo.png')} alt={tString('home.accessibility.tiktokAlt')} className="social-logo" />
                  </a>
                  <a 
                    href="https://www.facebook.com/sliceweston" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link facebook animate-bounce-in animate-delay-5"
                    aria-label={tString('home.accessibility.followFacebook')}
                  >
                    <img src={withBase('/SocialMedia/facebookLogo.png')} alt={tString('home.accessibility.facebookAlt')} className="social-logo" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TikTok QR Code Section */}
      <section className="section tiktok-qr-section">
        <div className="container">
          <div className="section-header text-center mb-12">
            <h2 className="section-title">{t('home.tiktokQr.title')}</h2>
            <p className="section-subtitle">
              {t('home.tiktokQr.subtitle')}
            </p>
          </div>
          
          <div className="tiktok-qr-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* TikTok QR Code Photo */}
              <div className="tiktok-qr-image-wrapper">
                <img
                  src={withBase('/1_Home/social-media-tiktok.png')}
                  alt="SLICE Weston TikTok QR Code - Scan to follow our TikTok account"
                  className="tiktok-qr-image"
                />
              </div>
              
              {/* TikTok Content */}
              <div className="tiktok-qr-content">
                <h3 className="text-2xl font-bold mb-4">{t('home.tiktokQr.quickFollow')}</h3>
                <p className="text-lg mb-6">
                  {t('home.tiktokQr.description')}
                </p>
                <div className="tiktok-qr-actions">
                  <a 
                    href="https://www.tiktok.com/@sliceweston" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {t('home.tiktokQr.followButton')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />

      {/* Fullscreen Modal */}
      <FullscreenModal
        isVisible={showModal}
        onClose={hideFullscreenModal}
        onAccept={handleFullscreenAccept}
        onDecline={handleFullscreenDecline}
      />

      {/* Categories Lightbox */}
      <CategoriesLightbox
        isOpen={isCategoriesLightboxOpen}
        onClose={() => setIsCategoriesLightboxOpen(false)}
      />
    </div>
  );
};

export default Home;
