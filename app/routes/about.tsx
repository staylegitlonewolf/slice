import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t, tString } = useLanguage();
  const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);

  const openFloorPlanModal = () => setIsFloorPlanModalOpen(true);
  const closeFloorPlanModal = () => setIsFloorPlanModalOpen(false);


  return (
    <div className="about-page">
      <div className="content-section py-16">
        <div className="container mx-auto px-4">
          {/* Page Title Section */}
          <div className="page-title-section mb-16">
            <h1 className="page-title">
              {t('pages.about.title')}
            </h1>
            <p className="page-subtitle">
              {t('pages.about.subtitle')}
            </p>
          </div>

          {/* About Slice Concept with Video */}
          <div className="about-concept mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t('pages.about.ourStory')}</h2>
                <p className="text-lg mb-4">
                  The "Slice" concept was born from the need for a premier venue in Weston and Broward County. At Slice, we've created a modern, clean, and crisp atmosphere unparalleled anywhere in South Florida, with completely customizable options for your next private event or corporate function.
                </p>
              </div>
              <div className="about-video-container">
                <video 
                  className="about-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src="/7_AboutUs/aboutus.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Experience & Passion */}
          <div className="experience-section mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t('pages.about.experience.title')}
            </h2>
            
            {/* Passion & Community */}
            <div className="passion-community-section mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="passion-content">
                  <h3 className="text-2xl font-semibold mb-4 text-slice-primary">
                    Local Roots
                  </h3>
                  <p className="text-lg mb-4">
                    We are local South Floridians with ties to the community and diverse cultures here in this tropical slice of heaven.
                  </p>
                  <p className="text-lg">
                    Passion is Parties... We like to plan them, prepare amazing cuisine, and provide personal service.
                  </p>
                </div>
                <div className="community-content">
                  <h3 className="text-2xl font-semibold mb-4 text-slice-primary">
                    Motivation
                  </h3>
                  <p className="text-lg">
                    We are driven by the satisfaction of seeing clients enjoy their events at this place.
                  </p>
                </div>
              </div>
            </div>

            {/* Client Experience */}
            <div className="client-experience-section mb-12">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-6 text-slice-primary">
                  Prestigious Clients
                </h3>
                <p className="text-lg max-w-4xl mx-auto">
                  Over the years, we have hosted events for clients including The Florida Marlins, Miami Dolphins players, along with International Singing Stars from Miami, Venezuela, Columbia, and Jamaica.
                </p>
              </div>
            </div>

            {/* Service Promise */}
            <div className="service-promise-section mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 text-slice-primary">
                  Service Promise
                </h3>
                <p className="text-lg max-w-2xl mx-auto">
                  Every detail is attended to as we do the work so you can enjoy the party.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="experience-card">
                <div className="experience-icon">🎯</div>
                <h3 className="text-xl font-semibold mb-3">
                  {t('pages.about.experience.professionalExpertise.title')}
                </h3>
                <p>
                  {t('pages.about.experience.professionalExpertise.description')}
                </p>
              </div>
              <div className="experience-card">
                <div className="experience-icon">💼</div>
                <h3 className="text-xl font-semibold mb-3">
                  {t('pages.about.experience.investmentProtection.title')}
                </h3>
                <p>
                  {t('pages.about.experience.investmentProtection.description')}
                </p>
              </div>
              <div className="experience-card">
                <div className="experience-icon">🎉</div>
                <h3 className="text-xl font-semibold mb-3">
                  {t('pages.about.experience.provenTrackRecord.title')}
                </h3>
                <p>
                  {t('pages.about.experience.provenTrackRecord.description')}
                </p>
              </div>
            </div>
          </div>


          {/* Floor Plan */}
          <div className="floor-plan-section mb-16">
            <div className="floor-plan-container">
              <div className="floor-plan-image">
                <div className="floor-plan-container">
                  <div className="floor-plan-click-overlay">
                    <span className="floor-plan-overlay-icon">🔍</span>
                    <span className="floor-plan-overlay-text">
                      {t('pages.about.floorPlan.clickToEnlarge')}
                    </span>
                  </div>
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
                </div>
              </div>
              <div className="floor-plan-title-section">
                <h2 className="text-3xl font-bold">
                  {t('pages.about.floorPlan.title')}
                </h2>
              </div>
            </div>
            
            {/* Flexible Space Configuration - Below the floor plan */}
            <div className="flexible-space-section mt-8">
              <h3 className="text-xl font-semibold mb-4">
                {t('pages.about.floorPlan.flexibleSpace.title')}
              </h3>
              <ul className="flex flex-wrap gap-4">
                {(t('pages.about.floorPlan.flexibleSpace.features') as string[]).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section mb-16">
            <div className="contact-section-header">
              <h2 className="contact-section-title">
                {t('pages.about.contact.title')}
              </h2>
            </div>
            <div className="contact-content-grid">
              <div className="contact-details-card">
                <h3 className="contact-details-title">
                  {t('pages.about.contact.getInTouch')}
                </h3>
                <div className="contact-items-list">
                  <div className="contact-item-card">
                    <div className="contact-icon">📍</div>
                    <div className="contact-item-content">
                      <strong>{t('pages.about.contact.address')}</strong><br />
                      <span dangerouslySetInnerHTML={{ __html: t('pages.about.contact.fullAddress') }} />
                    </div>
                  </div>
                  <div className="contact-item-card">
                    <div className="contact-icon">📞</div>
                    <div className="contact-item-content">
                      <strong>{t('pages.about.contact.phone')}</strong><br />
                      <a href="tel:954-557-7086" className="contact-link">
                        {t('pages.about.contact.phoneNumber')}
                      </a>
                    </div>
                  </div>
                  <div className="contact-item-card">
                    <div className="contact-icon">📧</div>
                    <div className="contact-item-content">
                      <strong>{t('pages.about.contact.email')}</strong><br />
                      <a href="mailto:info@sliceweston.com" className="contact-link">
                        {t('pages.about.contact.emailAddress')}
                      </a>
                    </div>
                  </div>
                  <div className="contact-item-card">
                    <div className="contact-icon">🕒</div>
                    <div className="contact-item-content">
                      <strong>{t('pages.about.contact.hours')}</strong><br />
                      <span dangerouslySetInnerHTML={{ __html: t('pages.about.contact.businessHours') }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-form-card">
                <h3 className="contact-form-title">
                  {t('pages.about.contact.requestInfo')}
                </h3>
                <form className="contact-form">
                  <div className="form-group">
                    <label className="form-label">
                      {t('pages.about.contact.name')}
                    </label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder={tString('pages.about.contact.namePlaceholder')}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t('pages.about.contact.email')}
                    </label>
                    <input 
                      type="email" 
                      className="form-input"
                      placeholder={tString('pages.about.contact.emailPlaceholder')}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t('pages.about.contact.eventType')}
                    </label>
                    <select className="form-select">
                      <option>{t('pages.about.contact.selectEventType')}</option>
                      <option>{t('pages.about.contact.eventTypes.wedding')}</option>
                      <option>{t('pages.about.contact.eventTypes.mitzvah')}</option>
                      <option>{t('pages.about.contact.eventTypes.quinceanera')}</option>
                      <option>{t('pages.about.contact.eventTypes.birthday')}</option>
                      <option>{t('pages.about.contact.eventTypes.corporate')}</option>
                      <option>{t('pages.about.contact.eventTypes.other')}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      {t('pages.about.contact.message')}
                    </label>
                    <textarea 
                      rows={4}
                      className="form-textarea"
                      placeholder={tString('pages.about.contact.messagePlaceholder')}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="form-submit-btn"
                  >
                    {t('pages.about.contact.sendMessage')}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="about-cta-section">
            <div className="cta-content">
              <h3 className="cta-title">
                {t('pages.about.cta.title')}
              </h3>
              <p className="cta-subtitle">
                {t('pages.about.cta.subtitle')}
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="cta-btn-primary">
                  {t('pages.about.cta.scheduleTour')}
                </Link>
                <a href="tel:954-557-7086" className="cta-btn-secondary">
                  {t('pages.about.cta.callNow')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default About;
