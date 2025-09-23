import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface CategoriesLightboxProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoriesLightbox: React.FC<CategoriesLightboxProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const lightboxRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 'whats-included',
      title: t('nav.whatsIncluded') || 'What\'s Included',
      path: '/whats-included',
      icon: '✨'
    },
    {
      id: 'catering',
      title: t('nav.catering') || 'Catering',
      path: '/catering',
      icon: '🍽️'
    },
    {
      id: 'gallery',
      title: t('nav.gallery') || 'Gallery',
      path: '/gallery',
      icon: '📸'
    },
    {
      id: 'testimonials',
      title: t('nav.testimonials') || 'Testimonials',
      path: '/testimonials',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      )
    },
    {
      id: 'about',
      title: t('nav.about') || 'About',
      path: '/about',
      icon: '🏢'
    },
    {
      id: 'meet-the-owner',
      title: t('nav.meetTheOwner') || 'Meet The Owner',
      path: '/meet-the-owner',
      icon: '👩‍💼'
    },
    {
      id: 'faq',
      title: t('nav.faq') || 'FAQ',
      path: '/faq',
      icon: '❓'
    },
    {
      id: 'contact',
      title: t('home.components.lightbox.readyToBook') || 'Ready To Book',
      path: '/contact',
      icon: '📅'
    },
  ];

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === lightboxRef.current) {
      onClose();
    }
  };

  // Handle category navigation
  const handleCategoryClick = (path: string) => {
    console.log('Navigating to:', path);
    onClose(); // Close lightbox first
    navigate(path); // Use React Router navigate
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="categories-lightbox-overlay"
      ref={lightboxRef}
      onClick={handleBackdropClick}
    >
      <div className="categories-lightbox">
        <div className="categories-lightbox-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className="category-btn"
              onClick={() => handleCategoryClick(category.path)}
            >
              <span className="category-btn-icon">{category.icon}</span>
              <span className="category-btn-text">{category.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesLightbox;