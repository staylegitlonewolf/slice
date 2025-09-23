import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const WhatsIncluded: React.FC = () => {
  const { t, tString } = useLanguage();
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);

  const openFloorPlanModal = () => setIsFloorPlanModalOpen(true);
  const closeFloorPlanModal = () => setIsFloorPlanModalOpen(false);

  // Create images array for PhotoViewer
  const venueImages = [
    { src: '/2_WhatsIncluded/0.png', alt: 'SLICE Weston Venue Showcase' },
    { src: '/2_WhatsIncluded/1.jpg', alt: 'SLICE Weston Venue Interior' },
    { src: '/2_WhatsIncluded/2.jpg', alt: 'SLICE Weston Event Space' },
    { src: '/2_WhatsIncluded/3.png', alt: 'SLICE Weston Dance Floor' },
    { src: '/2_WhatsIncluded/4.jpg', alt: 'SLICE Weston Bar Area' },
    { src: '/2_WhatsIncluded/4.png', alt: 'SLICE Weston Seating Area' },
    { src: '/2_WhatsIncluded/5.png', alt: 'SLICE Weston Event Setup' },
    { src: '/2_WhatsIncluded/6.png', alt: 'SLICE Weston Premium Features' },
    { src: '/2_WhatsIncluded/7.png', alt: 'SLICE Weston Entertainment Area' },
    { src: '/2_WhatsIncluded/8.png', alt: 'SLICE Weston Celebration Space' },
    { src: '/2_WhatsIncluded/9.png', alt: 'SLICE Weston Venue Features' },
    { src: '/2_WhatsIncluded/10.png', alt: 'SLICE Weston Event Space' },
    { src: '/2_WhatsIncluded/11.png', alt: 'SLICE Weston Premium Setup' },
    { src: '/2_WhatsIncluded/12.png', alt: 'SLICE Weston Modern Design' },
    { src: '/2_WhatsIncluded/13.png', alt: 'SLICE Weston Event Venue' },
    { src: '/2_WhatsIncluded/14.png', alt: 'SLICE Weston Celebration Area' },
    { src: '/2_WhatsIncluded/15.png', alt: 'SLICE Weston Venue Interior' },
    { src: '/2_WhatsIncluded/16.png', alt: 'SLICE Weston Event Space' },
    { src: '/2_WhatsIncluded/17.png', alt: 'SLICE Weston Premium Venue' },
    { src: '/2_WhatsIncluded/18.png', alt: 'SLICE Weston Modern Venue' }
  ];

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
    setShowLightbox(true);
    // Update thumbnail start index to show the selected photo in view
    const thumbnailsPerPage = 4;
    const newStartIndex = Math.floor(index / thumbnailsPerPage) * thumbnailsPerPage;
    setThumbnailStartIndex(newStartIndex);
  };

  const handleLightboxClose = () => {
    setShowLightbox(false);
    setIsAutoPlaying(false); // Stop auto-play when closing
  };

  const handleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleThumbnailNavigation = (direction: 'prev' | 'next') => {
    const thumbnailsPerPage = 4;
    const maxStartIndex = Math.max(0, venueImages.length - thumbnailsPerPage);
    
    if (direction === 'prev') {
      setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - thumbnailsPerPage));
    } else {
      setThumbnailStartIndex(Math.min(maxStartIndex, thumbnailStartIndex + thumbnailsPerPage));
    }
  };

  // Swipe handling functions
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedPhotoIndex < venueImages.length - 1) {
      // Swipe left - next photo
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
    if (isRightSwipe && selectedPhotoIndex > 0) {
      // Swipe right - previous photo
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  // Handle keyboard navigation (only Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showLightbox) return;

      if (e.key === 'Escape') {
        handleLightboxClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showLightbox]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || !showLightbox) return;

    const interval = setInterval(() => {
      setSelectedPhotoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % venueImages.length;
        // Update thumbnail start index to show the current photo in view
        const thumbnailsPerPage = 4;
        const newStartIndex = Math.floor(nextIndex / thumbnailsPerPage) * thumbnailsPerPage;
        setThumbnailStartIndex(newStartIndex);
        return nextIndex;
      });
    }, 3000); // Change photo every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, showLightbox, venueImages.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (showLightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showLightbox]);

  const coreFeatures = [
    { key: 'openSpace', icon: '🏛️' },
    { key: 'danceFloor', icon: '💃' },
    { key: 'lighting', icon: '✨' },
    { key: 'furniture', icon: '🪑' },
    { key: 'couches', icon: '🛋️' },
    { key: 'chairs', icon: '🪑' },
    { key: 'avSystems', icon: '🎵' },
    { key: 'buffetArea', icon: '🍽️' },
    { key: 'seatingAreas', icon: '🪑' },
    { key: 'barArea', icon: '🍸' },
    { key: 'djStage', icon: '🎤' },
    { key: 'themeLighting', icon: '🌈' },
    { key: 'tableOptions', icon: '🪑' },
    { key: 'entrance', icon: '🌟' }
  ];

  const services = [
    { key: 'modernVenue', icon: '🏛️' },
    { key: 'catering', icon: '🍽️' },
    { key: 'barServices', icon: '🍸' }
  ];

  return (
    <div className="whats-included-page">
      <div className="content-section py-16">
        <div className="container mx-auto px-4">
                    {/* Page Title */}
                    <div className="page-title text-center mb-16">
                      <h1 className="text-4xl md:text-6xl font-bold mb-8">
                        {t('pages.whatsIncluded.hero.title')}
                      </h1>
                    </div>

                    {/* Venue Showcase Photo - Clickable to Open Lightbox */}
                    <div className="venue-showcase-hero mb-16">
                      <div className="max-w-4xl mx-auto">
                        <div 
                          className="venue-showcase-container group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                          onClick={() => handlePhotoClick(0)}
                        >
                          <img
                            src="/2_WhatsIncluded/venueshowcase.png"
                            alt="SLICE Weston Venue Showcase - Click to view full gallery"
                            className="venue-showcase-image w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="view-gallery-button">
                                <span className="text-lg font-semibold">View Full Gallery</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Core Venue Features - Moved under photo gallery */}
          <div className="core-features mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              {t('pages.whatsIncluded.coreFeatures.title')}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature) => (
                <div key={feature.key} className="feature-card">
                  <div className="flex items-center mb-3">
                    <div className="feature-icon mr-3">{feature.icon}</div>
                    <h4 className="feature-title mb-0">
                    {t(`pages.whatsIncluded.coreFeatures.features.${feature.key}.title`)}
                  </h4>
                  </div>
                  <p>
                    {t(`pages.whatsIncluded.coreFeatures.features.${feature.key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

                    {/* Included Extras with Floor Plan */}
          <div className="included-extras mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              <span className="block md:inline">
                {tString('pages.whatsIncluded.includedExtras.title').includes(' in its venue rental') 
                  ? tString('pages.whatsIncluded.includedExtras.title').split(' in its venue rental')[0]
                  : tString('pages.whatsIncluded.includedExtras.title').split(' en su alquiler de lugar')[0]
                }
              </span>
              <span className="block md:inline md:ml-1">
                {tString('pages.whatsIncluded.includedExtras.title').includes(' in its venue rental') 
                  ? ' in its venue rental'
                  : ' en su alquiler de lugar'
                }
              </span>
            </h3>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Extras Content - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="extras-column">
                    <h4 className="text-xl font-semibold mb-4">
                      {t('pages.whatsIncluded.includedExtras.furnitureSeating.title')}
                    </h4>
                    <ul className="space-y-2">
                      {(t('pages.whatsIncluded.includedExtras.furnitureSeating.items') as string[]).map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="extras-column">
                    <h4 className="text-xl font-semibold mb-4">
                      {t('pages.whatsIncluded.includedExtras.suppliesEquipment.title')}
                    </h4>
                    <ul className="space-y-2">
                      {(t('pages.whatsIncluded.includedExtras.suppliesEquipment.items') as string[]).map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Floor Plan - Takes 1 column on large screens */}
              <div className="lg:col-span-1">
                <div className="floor-plan-section">
                  <h4 className="text-xl font-semibold mb-4 text-center">
                    {t('pages.about.floorPlan.title')}
                  </h4>
                  <div className="floor-plan-image">
                    <img 
                      src="/floorPlan.jpg" 
                      alt={tString('pages.about.floorPlan.altText')}
                      className="floor-plan-image-fill clickable-floor-plan"
                      onClick={openFloorPlanModal}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="floor-plan-placeholder hidden">
                      <div className="floor-plan-label">FloorPlan</div>
                      <span>{t('pages.about.floorPlan.altText')}</span>
                    </div>
                    <div className="floor-plan-overlay">
                      <div className="floor-plan-overlay-content">
                        <span className="floor-plan-overlay-icon">🔍</span>
                        <span className="floor-plan-overlay-text">
                          {t('pages.about.floorPlan.clickToEnlarge')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services - Moved Up */}
          <div className="services-section mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              {t('pages.whatsIncluded.services.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.key} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h4 className="service-title">
                    {t(`pages.whatsIncluded.services.${service.key}.title`)}
                  </h4>
                  <p>
                    {t(`pages.whatsIncluded.services.${service.key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>



          {/* CTA Section - Moved to Very Bottom */}
          <div className="cta-section text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">
              {t('pages.whatsIncluded.cta.title')}
            </h3>
            <p className="text-lg mb-8">
              {t('pages.whatsIncluded.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                {t('pages.whatsIncluded.cta.scheduleTour')}
              </Link>
              <Link to="/catering" className="btn-secondary">
                {t('pages.whatsIncluded.cta.viewCatering')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleLightboxClose}
        >
          <div className="relative max-w-7xl max-h-full w-full">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 transition-all"
              onClick={handleLightboxClose}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Mobile Portrait Layout */}
            <div className="flex flex-col items-center sm:hidden h-full">
              {/* Main Image Container - Fixed Height */}
              <div 
                className="w-full h-[60vh] flex items-center justify-center mb-4 relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img 
                  src={venueImages[selectedPhotoIndex].src}
                  alt={venueImages[selectedPhotoIndex].alt}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Auto Play Button */}
                <button
                  className={`auto-play-button ${isAutoPlaying ? 'auto-playing' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAutoPlay();
                  }}
                >
                  {isAutoPlaying ? 'Stop' : 'Auto'}
                </button>
                
                {/* Photo Counter */}
                <div className="photo-counter photo-counter-overlay">
                  {selectedPhotoIndex + 1} of {venueImages.length}
                </div>
              </div>

              {/* Thumbnail Strip - Fixed Height Container */}
              <div className="w-full h-20 flex items-center justify-center">
                <div className="flex space-x-2 max-w-full overflow-x-auto px-4">
                  {venueImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition-all flex-shrink-0 ${
                        index === selectedPhotoIndex ? 'border-white' : 'border-transparent opacity-60'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoIndex(index);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Landscape Layout */}
            <div className="hidden sm:flex lg:hidden items-center gap-4 h-full">
              {/* Left Side - Thumbnail Navigation */}
              <div className="w-32 flex flex-col items-center h-full">
                <div className="flex flex-col space-y-2 flex-1 overflow-y-auto pr-1 pt-2">
                  {venueImages.slice(thumbnailStartIndex, thumbnailStartIndex + 4).map((image, index) => {
                    const actualIndex = thumbnailStartIndex + index;
                    return (
                      <img
                        key={actualIndex}
                        src={image.src}
                        alt={image.alt}
                        className={`w-full h-12 object-cover rounded cursor-pointer border-2 transition-all flex-shrink-0 ${
                          actualIndex === selectedPhotoIndex ? 'border-white' : 'border-transparent opacity-60'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhotoIndex(actualIndex);
                        }}
                      />
                    );
                  })}
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex space-x-2 mt-3">
                  {thumbnailStartIndex > 0 && (
                    <button
                        className="nav-arrow-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleThumbnailNavigation('prev');
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  {thumbnailStartIndex + 4 < venueImages.length && (
                    <button
                        className="nav-arrow-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleThumbnailNavigation('next');
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Side - Main Image Container */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div 
                  className="w-full h-[80vh] flex items-center justify-center relative"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img 
                    src={venueImages[selectedPhotoIndex].src}
                    alt={venueImages[selectedPhotoIndex].alt}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {/* Auto Play Button */}
                  <button
                    className={`auto-play-button ${isAutoPlaying ? 'auto-playing' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAutoPlay();
                    }}
                  >
                    {isAutoPlaying ? 'Stop' : 'Auto'}
                  </button>
                  
                  {/* Photo Counter */}
                  <div className="photo-counter photo-counter-overlay">
                    {selectedPhotoIndex + 1} of {venueImages.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Landscape Layout */}
            <div className="hidden lg:flex items-center gap-6 h-full">
              {/* Left Side - Main Image Container - Fixed Height */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div 
                  className="w-full h-[75vh] flex items-center justify-center relative"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img 
                    src={venueImages[selectedPhotoIndex].src}
                    alt={venueImages[selectedPhotoIndex].alt}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />
                  {/* Auto Play Button */}
                  <button
                    className={`auto-play-button ${isAutoPlaying ? 'auto-playing' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAutoPlay();
                    }}
                  >
                    {isAutoPlaying ? 'Stop' : 'Auto'}
                  </button>
                  
                  {/* Photo Counter */}
                  <div className="photo-counter photo-counter-overlay">
                    {selectedPhotoIndex + 1} of {venueImages.length}
                  </div>
                </div>
              </div>

              {/* Right Side - Thumbnail Navigation - Fixed Height */}
              <div className="w-48 flex flex-col items-center h-[80vh]">
                <div className="flex flex-col space-y-2 flex-1 overflow-y-auto pr-2 pt-2">
                  {venueImages.map((image, index) => (
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className={`w-full h-20 object-cover rounded cursor-pointer border-2 transition-all flex-shrink-0 ${
                        index === selectedPhotoIndex ? 'border-white' : 'border-transparent opacity-60'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhotoIndex(index);
                      }}
                    />
                  ))}
                </div>
                
                {/* Desktop Navigation Buttons */}
                <div className="flex space-x-2 mt-4">
                  <button
                      className="nav-arrow-button nav-arrow-button-desktop"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhotoIndex(Math.max(0, selectedPhotoIndex - 1));
                    }}
                    disabled={selectedPhotoIndex === 0}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                      className="nav-arrow-button nav-arrow-button-desktop"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhotoIndex(Math.min(venueImages.length - 1, selectedPhotoIndex + 1));
                    }}
                    disabled={selectedPhotoIndex === venueImages.length - 1}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floor Plan Fullscreen Modal */}
      {isFloorPlanModalOpen && (
        <div className="floor-plan-modal-overlay" onClick={closeFloorPlanModal}>
          <div className="floor-plan-modal-content-enhanced" onClick={(e) => e.stopPropagation()}>
            <button 
              className="floor-plan-modal-close-overlay"
              onClick={closeFloorPlanModal}
              aria-label={tString('pages.about.floorPlan.modal.closeLabel')}
            >
              ✕
            </button>
            
            <div className="floor-plan-image-container">
              <img 
                src="/floorPlan.jpg" 
                alt={tString('pages.about.floorPlan.modal.altText')}
                className="floor-plan-modal-image-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsIncluded;
