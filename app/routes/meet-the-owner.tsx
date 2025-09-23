import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const MeetTheOwner: React.FC = () => {
  const { t, tString } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const ownerPhotos = [
    { src: '/MeetTheOwner/1.jpg', alt: 'Owner professional portrait', featured: true },
    { src: '/MeetTheOwner/0.png', alt: 'Owner candid moment', featured: false },
    { src: '/MeetTheOwner/2.png', alt: 'Owner at event', featured: false },
    { src: '/MeetTheOwner/4.png', alt: 'Owner in venue', featured: false },
    { src: '/MeetTheOwner/5.png', alt: 'Owner hospitality moment', featured: false },
    { src: '/MeetTheOwner/6.png', alt: 'Owner event planning', featured: false },
    { src: '/MeetTheOwner/7.png', alt: 'Owner celebration', featured: false }
  ];

  const openImageModal = (src: string) => {
    setSelectedImage(src);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="meet-owner-page">
      {/* Owner Introduction */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="owner-intro-side-by-side mb-16">
              <div className="owner-photo-section">
                <img 
                  src="/MeetTheOwner/1.jpg" 
                  alt={tString('pages.meetOwner.owner.altText')} 
                  className="owner-photo-large"
                  onClick={() => openImageModal('/MeetTheOwner/1.jpg')}
                />
              </div>
              <div className="owner-info-section">
                <h2 className="owner-name">
                  {t('pages.meetOwner.owner.name')}
                </h2>
                <p className="owner-role">
                  {t('pages.meetOwner.owner.role')}
                </p>
              </div>
            </div>

            {/* Owner Story */}
            <div className="owner-story">
              <div className="story-content">
                <p className="text-lg mb-6">
                  {t('pages.meetOwner.story.intro')}
                </p>

                {/* First 2 photos under "Principal Owner & General Manager" */}
                <div className="story-photos-row mb-8">
                  <div className="story-photo-item">
                    <img 
                      src="/MeetTheOwner/2.png" 
                      alt="Owner at event"
                      className="story-photo"
                      onClick={() => openImageModal('/MeetTheOwner/2.png')}
                    />
                  </div>
                </div>

                {/* Side-by-side section: Patty Leon background text + Photo 5 */}
                <div className="story-section-side-by-side mb-12">
                  <div className="story-text-content">
                    <p className="text-lg mb-6">
                      {t('pages.meetOwner.story.background')}
                    </p>
                  </div>
                  <div className="story-photo-content">
                    <img 
                      src="/MeetTheOwner/0.png" 
                      alt="Owner hospitality moment"
                      className="story-photo-side"
                      onClick={() => openImageModal('/MeetTheOwner/0.png')}
                    />
                  </div>
                </div>

                <p className="text-lg mb-6">
                  {t('pages.meetOwner.story.team')}
                </p>

                {/* Side-by-side section: Team text + Photo 6 */}
                <div className="story-section-side-by-side mb-12">
                  <div className="story-text-content">
                    <p className="text-lg mb-6">
                      Her dedication to her clients has earned her a superb reputation and a long list of satisfied and repeat clients.
                    </p>
                  </div>
                  <div className="story-photo-content">
                    <img 
                      src="/MeetTheOwner/6.png" 
                      alt="Owner event planning"
                      className="story-photo-side"
                      onClick={() => openImageModal('/MeetTheOwner/6.png')}
                    />
                  </div>
                </div>

                {/* Side-by-side section: Rebirth text + Photo 7 */}
                <div className="story-section-side-by-side mb-12">
                  <div className="story-text-content">
                    <p className="text-lg mb-6">
                      {t('pages.meetOwner.story.rebirth')}
                    </p>
                  </div>
                  <div className="story-photo-content">
                    <img 
                      src="/MeetTheOwner/7.png" 
                      alt="Owner celebration"
                      className="story-photo-side"
                      onClick={() => openImageModal('/MeetTheOwner/7.png')}
                    />
                  </div>
                </div>

                <p className="text-lg mb-8">
                  {t('pages.meetOwner.story.amenities')}
                </p>

                {/* Amenities Photo */}
                <div className="story-photo-single mb-8">
                  <img 
                    src="/MeetTheOwner/4.png" 
                    alt="Venue amenities and improvements"
                    className="story-photo-wide"
                    onClick={() => openImageModal('/MeetTheOwner/4.png')}
                  />
                </div>

                <div className="owner-cta text-center">
                  <p className="text-xl font-semibold mb-6 text-slice-primary">
                    {t('pages.meetOwner.story.cta')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact" className="btn btn-primary">
                      {t('pages.meetOwner.story.bookEvent')}
                    </Link>
                    <a href="tel:954-557-7086" className="btn btn-outline">
                      {t('pages.meetOwner.story.call')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={closeImageModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <img src={selectedImage} alt={tString('pages.meetOwner.owner.name')} className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetTheOwner;