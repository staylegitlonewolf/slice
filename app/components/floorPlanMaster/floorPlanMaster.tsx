import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IMAGES } from '../../../src/utils/imageUtils'
// Simple mobile detection hook
const useIPhoneDetection = () => {
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

const HealthMaster = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isMobile } = useIPhoneDetection()
  
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Get health team member data from location state or URL parameters
  const memberData = location.state?.memberData
  const returnPath = location.state?.returnPath
  const memberId = location.state?.memberId

  // State for hydration consistency
  const [isClient, setIsClient] = useState(false)
  const [profileData, setProfileData] = useState(memberData)

  // Function to get member data by ID
  const getMemberDataById = (id: string) => {
    const healthMembers = [
      {
        id: 'health-1',
        name: 'David Brown',
        title: 'Health Coverage Expert',
        category: 'health',
        image: IMAGES.HEALTH_DAVID,
        phone: '(813) 647-1118',
        email: 'ElevatedHealthDavid@gmail.com',
        description: 'Licensed Health Coverage Expert with access to all options. Leading our mission to connect clients with the best solutions across all services.',
        services: ['Health Insurance', 'Solar Solutions', 'NIL Partnerships'],
        featured: true
      },

    ]
    return healthMembers.find(member => member.id === id)
  }

  // Function to get the master photo based on member name
  const getMasterPhoto = (memberName: string) => {
    switch (memberName.toLowerCase()) {
      case 'david brown':
        return IMAGES.HEALTH_MASTER_DAVID
      default:
        return profileData?.image || ''
    }
  }

  // Get the appropriate image for display
  const displayImage = profileData ? getMasterPhoto(profileData.name) : ''

  // Handle URL parameters and member data
  useEffect(() => {
    setIsClient(true)
    
    // If memberData is provided from location state, use it
    if (memberData) {
      setProfileData(memberData)
      return
    }
    
    // Check for profile parameter in URL
    const urlParams = new URLSearchParams(location.search)
    const profileId = urlParams.get('profile')
    
    if (profileId) {
      const memberFromUrl = getMemberDataById(profileId)
      if (memberFromUrl) {
        setProfileData(memberFromUrl)
        return
      }
    }
    
    // If no valid data is found, redirect back to home page
    navigate('/', { replace: true })
  }, [memberData, location.search, navigate, getMemberDataById])

  const [imageZoom, setImageZoom] = useState({
    scale: 0.7,
    isZoomed: false,
    position: { x: 0, y: 0 }
  })
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)

  // Memoized zoom state to prevent unnecessary re-renders
  const defaultZoomState = {
    scale: 0.7,
    isZoomed: false,
    position: { x: 0, y: 0 }
  }

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
    
    // Enhanced mobile scroll to top
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scroll(0, 0);
      }, 100);
    }
  }, [])

  // Scroll to top when profileData changes (when navigating to different team member)
  useEffect(() => {
    if (profileData) {
      window.scrollTo(0, 0)
      
      // Enhanced mobile scroll to top
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          window.scroll(0, 0);
        }, 100);
      }
    }
  }, [profileData])

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
      // Don't prevent default here to avoid the error
      setIsDragging(true)
      setHasDragged(false)
      
      const touch = e.touches[0]
      const startX = touch.clientX
      const startY = touch.clientY
      const startPositionX = imageZoom.position.x
      const startPositionY = imageZoom.position.y
      
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          // Only prevent default if we're actually dragging
          if (hasDragged) {
            e.preventDefault()
          }
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
  }, [imageZoom.isZoomed, imageZoom.position, imageZoom.scale, hasDragged])

  const handleReturn = useCallback(() => {
    if (returnPath && memberId) {
      navigate(returnPath, { 
        state: { 
          scrollToMember: memberId,
          memberData: profileData 
        } 
      })
    } else {
      navigate(-1)
    }
  }, [returnPath, memberId, profileData, navigate])

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="master-container">
        <div className="master-content">
          <div className="master-content-columns">
            <div className="master-image-section">
              <div className="master-image-container">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%',
                  color: 'var(--slice-text-secondary)',
                  fontSize: '1.1rem'
                }}>
                  Loading...
                </div>
              </div>
            </div>
            <div className="master-details-section">
              <div className="master-detail-card">
                <div className="master-detail-header">
                  <div className="master-detail-icon health">
                    <i className="fas fa-user"></i>
                  </div>
                  <h3 className="master-detail-title">Loading...</h3>
                </div>
                <div className="master-detail-content">
                  Loading team member information...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Early return for no data
  if (!memberData) {
    return (
      <div className="master-container">
        <div className="master-content">
          <div className="master-detail-card">
            <div className="master-detail-header">
              <div className="master-detail-icon health">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3 className="master-detail-title">No team member selected</h3>
            </div>
            <div className="master-detail-content">
              <button onClick={() => navigate(-1)} className="master-btn health">
                <i className="fas fa-arrow-left"></i>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="master-container">
      {/* Header spacing to prevent overlap with global header */}
      <div className="master-header-spacing"></div>

      {/* Main content area */}
      <div className="master-content">
        <div className="master-content-columns">
          {/* Image Section */}
          <div className="master-image-section">
            {/* Return Button - Moved to top of left column */}
            <button onClick={handleReturn} className="master-return-btn health">
              <i className="fas fa-arrow-left"></i>
              Back to Team
            </button>
            
            {memberData && displayImage ? (
              <>
                <div 
                  ref={imageContainerRef}
                  className={`master-image-container ${imageZoom.isZoomed ? 'zoomed' : ''}`}
                  onClick={handleImageClick}
                  onDoubleClick={handleImageDoubleClick}
                  onMouseDown={handleImageMouseDown}
                  onTouchStart={handleImageTouchStart}
                >
                  <img 
                    ref={imageRef}
                    src={displayImage} 
                    alt={memberData.name} 
                    className="master-image"
                  />
                  <div className="master-image-overlay"></div>
                </div>
                
                {/* Zoom Controls */}
                <div className="master-zoom-controls">
                  <div className="master-zoom-indicator">
                    <span className="master-zoom-text">
                      {imageZoom.isZoomed 
                        ? ` • Drag to pan • ${Math.round(imageZoom.scale * 100)}%`
                        : 'Click to zoom • Scroll to adjust '
                      }
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="master-image-container">
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%',
                  color: 'var(--slice-text-secondary)',
                  fontSize: '1.1rem'
                }}>
                  No image available
                </div>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="master-details-section">
            {/* Action Buttons - Moved to top */}
            <div className="master-detail-card">
              <div className="master-detail-header">
                <div className="master-detail-icon health">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h3 className="master-detail-title">Get In Touch</h3>
              </div>
              <div className="master-detail-content">
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={`tel:${memberData.phone}`} className="master-btn health">
                    <i className="fas fa-phone"></i>
                    Call Now
                  </a>
                  <a href={`mailto:${memberData.email}`} className="master-btn health">
                    <i className="fas fa-envelope"></i>
                    Send Email
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="master-detail-card">
              <div className="master-detail-header">
                <div className="master-detail-icon health">
                  <i className="fas fa-address-card"></i>
                </div>
                <h3 className="master-detail-title">Contact Information</h3>
              </div>
              

              <div className="master-detail-content">
                <div className="master-contact-info">
                  <div className="master-contact-item">
                    <div className="master-contact-icon">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="master-contact-text">
                      <div className="master-contact-label">Name</div>
                      {memberData.name}
                    </div>
                  </div>
                  <div className="master-contact-item">
                    <div className="master-contact-icon">
                      <i className="fas fa-briefcase"></i>
                    </div>
                    <div className="master-contact-text">
                      <div className="master-contact-label">Title</div>
                      {memberData.title}
                    </div>
                  </div>
                  <div className="master-contact-item">
                    <div className="master-contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="master-contact-text">
                      <div className="master-contact-label">Phone</div>
                      <a href={`tel:${memberData.phone}`} className="master-contact-link">
                        {memberData.phone}
                      </a>
                    </div>
                  </div>
                  <div className="master-contact-item">
                    <div className="master-contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="master-contact-text">
                      <div className="master-contact-label">Email</div>
                      <a href={`mailto:${memberData.email}`} className="master-contact-link">
                        {memberData.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services section */}
            {memberData.services && memberData.services.length > 0 && (
              <div className="master-detail-card">
                <div className="master-detail-header">
                  <div className="master-detail-icon health">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <h3 className="master-detail-title">Services & Expertise</h3>
                </div>
                <div className="master-detail-content">
                  <div className="master-services-list">
                    {memberData.services.map((service: string, index: number) => (
                      <div key={index} className="master-service-item">
                        <i className="fas fa-check"></i>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Description section */}
            {memberData.description && (
              <div className="master-detail-card">
                <div className="master-detail-header">
                  <div className="master-detail-icon health">
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <h3 className="master-detail-title">About {memberData.name}</h3>
                </div>
                <div className="master-detail-content">
                  {memberData.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
   )
 }

export default HealthMaster 