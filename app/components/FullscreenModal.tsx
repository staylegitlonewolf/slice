import React, { useEffect, useState } from 'react';

interface FullscreenModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isVisible,
  onClose,
  onAccept,
  onDecline
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleAccept = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onAccept();
      onClose();
    }, 300);
  };

  const handleDecline = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onDecline();
      onClose();
    }, 300);
  };


  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleDecline();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fullscreen-modal-backdrop ${isAnimating ? 'show' : 'hide'}`}
      onClick={handleBackdropClick}
    >
      <div className={`fullscreen-modal ${isAnimating ? 'show' : 'hide'}`}>
        <div className="fullscreen-modal-content">
          {/* Modal content */}
          <div className="fullscreen-modal-body">
            
            <h2 className="fullscreen-modal-title">
              Hi! Would you like to experience in FullScreen?
            </h2>
            

            <div className="fullscreen-modal-buttons">
              <button 
                className="fullscreen-modal-btn fullscreen-modal-btn-yes"
                onClick={handleAccept}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Yes, FullScreen
              </button>
              
              <button 
                className="fullscreen-modal-btn fullscreen-modal-btn-no"
                onClick={handleDecline}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                No, Thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenModal;
