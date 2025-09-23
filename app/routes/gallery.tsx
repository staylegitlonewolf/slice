import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('gallery.categories.all'), icon: '📸' },
    { id: 'weddings', label: t('gallery.categories.weddings'), icon: '💒' },
    { id: 'mitzvahs', label: t('gallery.categories.mitzvahs'), icon: '🕯️' },
    { id: 'quinces', label: t('gallery.categories.quinces'), icon: '👑' },
    { id: 'birthdays', label: t('gallery.categories.birthdays'), icon: '🎂' },
    { id: 'corporate', label: t('gallery.categories.corporate'), icon: '🏢' },
  ];

  const galleryItems = [
    { id: 1, category: 'weddings', title: t('gallery.galleryItems.wedding1'), image: '/images/gallery/wedding-1.jpg' },
    { id: 2, category: 'mitzvahs', title: t('gallery.galleryItems.mitzvah1'), image: '/images/gallery/mitzvah-1.jpg' },
    { id: 3, category: 'quinces', title: t('gallery.galleryItems.quince1'), image: '/images/gallery/quince-1.jpg' },
    { id: 4, category: 'birthdays', title: t('gallery.galleryItems.birthday1'), image: '/images/gallery/birthday-1.jpg' },
    { id: 5, category: 'corporate', title: t('gallery.galleryItems.corporate1'), image: '/images/gallery/corporate-1.jpg' },
    { id: 6, category: 'weddings', title: t('gallery.galleryItems.wedding2'), image: '/images/gallery/wedding-2.jpg' },
    { id: 7, category: 'mitzvahs', title: t('gallery.galleryItems.mitzvah2'), image: '/images/gallery/mitzvah-2.jpg' },
    { id: 8, category: 'quinces', title: t('gallery.galleryItems.quince2'), image: '/images/gallery/quince-2.jpg' },
    { id: 9, category: 'birthdays', title: t('gallery.galleryItems.birthday2'), image: '/images/gallery/birthday-2.jpg' },
    { id: 10, category: 'corporate', title: t('gallery.galleryItems.corporate2'), image: '/images/gallery/corporate-2.jpg' },
    { id: 11, category: 'weddings', title: t('gallery.galleryItems.wedding3'), image: '/images/gallery/wedding-3.jpg' },
    { id: 12, category: 'mitzvahs', title: t('gallery.galleryItems.mitzvah3'), image: '/images/gallery/mitzvah-3.jpg' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t('gallery.hero.title')}</h1>
          <p className="hero-subtitle">
            {t('gallery.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="section">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-btn ${
                    selectedCategory === category.id ? 'active' : ''
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="gallery-item">
                <div className="gallery-image">
                  <div className="image-placeholder bg-gradient-to-br from-slice-primary to-slice-secondary">
                    <span className="text-white text-center">{item.title}</span>
                  </div>
                  <div className="gallery-overlay">
                    <div className="gallery-overlay-content">
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <button className="view-btn">{t('gallery.buttons.viewFullSize')}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-2">{t('gallery.noResults.title')}</h3>
              <p className="text-gray-600">{t('gallery.noResults.subtitle')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="section bg-slice-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('gallery.videos.title')}</h2>
            <p className="section-subtitle">
              {t('gallery.videos.subtitle')}
            </p>
          </div>
          
          <div className="video-grid">
            <div className="video-item">
              <div className="video-placeholder bg-gradient-to-br from-slice-accent to-slice-gold">
                <div className="play-button">▶️</div>
                <span className="text-white text-center">{t('gallery.videos.weddingHighlights')}</span>
              </div>
            </div>
            
            <div className="video-item">
              <div className="video-placeholder bg-gradient-to-br from-slice-pink to-slice-primary">
                <div className="play-button">▶️</div>
                <span className="text-white text-center">{t('gallery.videos.barMitzvahCelebration')}</span>
              </div>
            </div>
            
            <div className="video-item">
              <div className="video-placeholder bg-gradient-to-br from-slice-secondary to-slice-accent">
                <div className="play-button">▶️</div>
                <span className="text-white text-center">{t('gallery.videos.quinceaneraParty')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-slice-primary to-slice-secondary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('gallery.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('gallery.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn bg-white text-slice-primary hover:bg-gray-100">
              {t('gallery.cta.planEvent')}
            </a>
            <a href="tel:954-557-7086" className="btn btn-outline border-white text-white hover:bg-white hover:text-slice-primary">
              {t('gallery.cta.call')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
