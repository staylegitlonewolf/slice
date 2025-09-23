import React, { useState, useRef, useEffect } from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  fallbackImage?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = 'metadata',
  fallbackImage,
  onLoad,
  onError
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible]);

  const handleVideoLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleVideoError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={containerRef} className={`lazy-video-container ${className}`}>
      {isVisible && !hasError && (
        <video
          ref={videoRef}
          className="lazy-video"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {hasError && fallbackImage && (
        <img
          src={fallbackImage}
          alt="Video fallback"
          className="lazy-video-fallback"
        />
      )}
      
      {!isLoaded && !hasError && (
        <div className="lazy-video-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default LazyVideo;
