import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

// Simple mobile detection hook
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isIPhone = /iPhone|iPod/.test(userAgent);
      const isAndroid = /Android/.test(userAgent);
      const isMobileDevice = isIPhone || isAndroid || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return { isMobile };
};

interface PhotoViewerProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  initialIndex?: number;
  onClose?: () => void;
  showGallery?: boolean;
  title?: string;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({
  images,
  initialIndex = 0,
  onClose,
  showGallery = true,
  title
}) => {
  const { isMobile } = useMobileDetection()
  const { t, tString } = useLanguage()
  
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // State for hydration consistency
  const [isClient, setIsClient] = useState(false)

  // Photo gallery state
  const [currentImageIndex, setCurrentImageIndex] = useState(() => {
    if (!images || images.length === 0) return 0
    return Math.min(initialIndex, images.length - 1)
  })

  const [imageZoom, setImageZoom] = useState({
    scale: 1,
    isZoomed: false,
    position: { x: 0, y: 0 }
  })
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)

  // Memoized zoom state to prevent unnecessary re-renders
  const defaultZoomState = {
    scale: 1,
    isZoomed: false,
    position: { x: 0, y: 0 }
  }

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true)
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Enhanced mobile scroll to top
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scroll(0, 0);
      }, 100);
    }
  }, [])

  // Force scroll to top with multiple approaches
  useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Use requestAnimationFrame to ensure scroll happens after layout
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      
      // Double requestAnimationFrame for extra safety
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
    })
    
    // Additional delayed scroll
    setTimeout(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 100)
  }, [])

  // Update currentImageIndex when images change
  useEffect(() => {
    if (!images || images.length === 0) {
      setCurrentImageIndex(0)
    } else if (currentImageIndex >= images.length) {
      setCurrentImageIndex(images.length - 1)
    }
  }, [images, currentImageIndex])

  // Reset zoom when image changes
  useEffect(() => {
    setImageZoom(defaultZoomState)
  }, [currentImageIndex])

  const currentImage = images && images.length > 0 ? images[currentImageIndex] : null
  
  const handleGalleryImageClick = useCallback((index: number) => {
    setCurrentImageIndex(index)
    setImageZoom(defaultZoomState)
  }, [])

  // Apply zoom to image with useCallback for better performance
  useEffect(() => {
    if (imageRef.current) {
      const { scale, position } = imageZoom
      imageRef.current.style.transform = `scale(${scale}) translate(${position.x}px, ${position.y}px)`
    }
  }, [imageZoom])

  // Memoized handlers for better performance
  const handleImageClick = useCallback((e: React.MouseEvent) => {
    if (isDragging || hasDragged) return
    
    setImageZoom(prev => {
      if (prev.isZoomed) {
        return defaultZoomState
      } else {
        return {
          scale: 2,
          isZoomed: true,
          position: prev.position
        }
      }
    })
  }, [isDragging, hasDragged])

  const handleImageDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setImageZoom(defaultZoomState)
  }, [])

  const handleImageWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newScale = Math.max(0.5, Math.min(5, imageZoom.scale + delta))
    
    setImageZoom(prev => ({
      ...prev,
      scale: newScale,
      isZoomed: newScale > 1
    }))
  }, [imageZoom.scale])

  // Optimized wheel event listener
  useEffect(() => {
    const imageContainer = imageContainerRef.current
    if (imageContainer && !isMobile) {
      imageContainer.addEventListener('wheel', handleImageWheel, { passive: false })
      return () => imageContainer.removeEventListener('wheel', handleImageWheel)
    }
  }, [handleImageWheel, isMobile])

  const handleImageMouseDown = useCallback((e: React.MouseEvent) => {
    if (imageZoom.isZoomed) {
      e.preventDefault()
      setIsDragging(true)
      setHasDragged(false)
      
      const startX = e.clientX
      const startY = e.clientY
      const startPositionX = imageZoom.position.x
      const startPositionY = imageZoom.position.y
      
      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        
        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY
        const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        
        if (moveDistance > 5) {
          setHasDragged(true)
        }
        
        setImageZoom(prev => ({
          ...prev,
          position: {
            x: startPositionX + deltaX,
            y: startPositionY + deltaY
          }
        }))
      }
      
      const handleMouseUp = () => {
        setTimeout(() => {
          setIsDragging(false)
          setHasDragged(false)
        }, 10)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }, [imageZoom.isZoomed, imageZoom.position])

  const handleImageTouchStart = useCallback((e: React.TouchEvent) => {
    if (imageZoom.isZoomed && e.touches.length === 1) {
      setIsDragging(true)
      setHasDragged(false)
      
      const touch = e.touches[0]
      const startX = touch.clientX
      const startY = touch.clientY
      const startPositionX = imageZoom.position.x
      const startPositionY = imageZoom.position.y
      
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          e.preventDefault()
          const touch = e.touches[0]
          
          const deltaX = touch.clientX - startX
          const deltaY = touch.clientY - startY
          const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
          
          if (moveDistance > 5) {
            setHasDragged(true)
          }
          
          setImageZoom(prev => ({
            ...prev,
            position: {
              x: startPositionX + deltaX,
              y: startPositionY + deltaY
            }
          }))
        }
      }
      
      const handleTouchEnd = () => {
        setTimeout(() => {
          setIsDragging(false)
          setHasDragged(false)
        }, 10)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    } else if (e.touches.length === 2) {
      // Handle pinch zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const initialDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
      
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 2) {
          e.preventDefault()
          const touch1 = e.touches[0]
          const touch2 = e.touches[1]
          const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
          const scaleFactor = currentDistance / initialDistance
          const newScale = Math.max(0.5, Math.min(5, imageZoom.scale * scaleFactor))
          
          setImageZoom(prev => ({
            ...prev,
            scale: newScale,
            isZoomed: newScale > 1
          }))
        }
      }
      
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }
  }, [imageZoom.isZoomed, imageZoom.position, imageZoom.scale])

  // Navigation functions
  const handlePrevious = useCallback(() => {
    if (!images || images.length === 0) return
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
  }, [images])

  const handleNext = useCallback(() => {
    if (!images || images.length === 0) return
    setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
  }, [images])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape' && onClose) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handlePrevious, handleNext, onClose])

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="photo-viewer-container">
        <div className="photo-viewer-sidebar">
          <div className="photo-viewer-header">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    )
  }

  // Early return for no data
  if (!images || images.length === 0) {
    return (
      <div className="photo-viewer-container">
        <div className="photo-viewer-error">
          <h2>No photos available</h2>
          {onClose && (
            <button onClick={onClose} className="photo-viewer-close-btn">
              Close
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="photo-viewer-container">
      {/* Sidebar with photo information and gallery */}
      <div className="photo-viewer-sidebar">
        {/* Photo Gallery Section */}
        {showGallery && images.length > 1 && (
          <div className="photo-viewer-gallery">
            <h3 className="gallery-title">{title || t('home.components.photoGallery.title')}</h3>
            <div className="photo-viewer-thumbnails">
              <div className="photo-viewer-thumbnails-grid">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className={`photo-viewer-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleGalleryImageClick(index)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="photo-viewer-thumbnail-image"
                    />
                    {image.caption && (
                      <div className="photo-viewer-thumbnail-caption">{image.caption}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Photo Details Section */}
        <div className="photo-viewer-details">
          <div className="photo-viewer-details-container">
            <div className="photo-viewer-header">
              <h3 className="photo-viewer-title">
                {currentImage?.caption || `Photo ${currentImageIndex + 1} of ${images.length}`}
              </h3>
              {onClose && (
                <button onClick={onClose} className="photo-viewer-close-btn">
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            
            <div className="photo-viewer-info">
              <div className="photo-viewer-info-row">
                <span className="photo-viewer-label">Image:</span>
                <span className="photo-viewer-value">{currentImageIndex + 1} of {images.length}</span>
              </div>
              {currentImage?.alt && (
                <div className="photo-viewer-info-row">
                  <span className="photo-viewer-label">Description:</span>
                  <span className="photo-viewer-value">{currentImage.alt}</span>
                </div>
              )}
            </div>
            
            {/* Navigation and Action buttons */}
            <div className="photo-viewer-actions">
              {images.length > 1 && (
                <>
                  <button onClick={handlePrevious} className="photo-viewer-nav-btn prev-btn" title={tString('home.components.photoGallery.previousPhoto')}>
                    <i className="fas fa-chevron-left"></i>
                    <span>{t('home.components.photoGallery.previousPhoto')}</span>
                  </button>
                  <button onClick={handleNext} className="photo-viewer-nav-btn next-btn" title={tString('home.components.photoGallery.nextPhoto')}>
                    <span>{t('home.components.photoGallery.nextPhoto')}</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main photo display */}
      <div className="photo-viewer-content">
        {currentImage && (
          <>
            <div 
              ref={imageContainerRef}
              className={`photo-viewer-image-container ${imageZoom.isZoomed ? 'zoomed' : ''}`}
              onClick={handleImageClick}
              onDoubleClick={handleImageDoubleClick}
              onMouseDown={handleImageMouseDown}
              onTouchStart={handleImageTouchStart}
            >
              <img 
                ref={imageRef}
                src={currentImage?.src} 
                alt={currentImage?.alt} 
                className="photo-viewer-image"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  maxWidth: '90%',
                  maxHeight: '90%',
                  cursor: imageZoom.isZoomed ? 'grab' : 'zoom-in'
                }}
              />
            
              {/* Zoom indicator */}
              <div className="photo-viewer-zoom-indicator">
                <span className="zoom-text">
                  {imageZoom.isZoomed 
                    ? `Drag to pan • ${Math.round(imageZoom.scale * 100)}%`
                    : t('home.components.photoGallery.clickToZoom')
                  }
                </span>
              </div>
              
              {/* Tap to zoom message */}
              <div className="photo-viewer-tap-to-zoom-message">
                <span>tap to zoom</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PhotoViewer
