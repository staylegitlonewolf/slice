import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="container">
          {/* Brand Section with Photo */}
          <div className="footer-brand">
            <div className="footer-photo">
              <img 
                src="/Footer/footerPhoto.png" 
                alt="SLICE Weston - Premier Event Venue" 
                className="footer-brand-image"
              />
            </div>
            <div className="footer-brand-info">
              <h3 className="footer-brand-title">SLICE Weston</h3>
              <p className="footer-brand-tagline">
                {t('footer.description')}
              </p>
              <p className="footer-brand-description">
                {t('home.hero.subtitle')}
              </p>
            </div>
          </div>

          {/* Footer Image Section */}
          <div className="footer-image-section">
            <div className="footer-image-container">
              <img 
                src="/Footer/sliceFooter.png" 
                alt="SLICE Weston - Premier Event Venue" 
                className="footer-image"
              />
            </div>
          </div>

          {/* Footer Content Grid - Services and Contact Us */}
          <div className="footer-grid">
            {/* Services */}
            <div className="footer-section">
              <h4 className="footer-section-title">{t('footer.services')}</h4>
              <ul className="footer-links">
                <li>{t('footer.weddings')}</li>
                <li>{t('footer.corporateEvents')}</li>
                <li>{t('footer.birthdayCelebrations')}</li>
                <li>{t('home.eventTypes.quinceaneras.title')}</li>
                <li>{t('home.eventTypes.barMitzvahs.title')}</li>
                <li>{t('home.eventTypes.private.title')}</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-section-title">{t('footer.contactUs')}</h4>
              <div className="footer-contact">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <strong>{t('contact.address')}</strong><br />
                    <span dangerouslySetInnerHTML={{ __html: t('contact.fullAddress') }} />
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>{t('contact.phone')}</strong><br />
                    <a href="tel:954-557-7086" className="footer-phone">
                      {t('contact.phoneNumber')}
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <strong>{t('contact.email')}</strong><br />
                    <a href="mailto:info@sliceweston.com" className="footer-email">
                      {t('contact.emailAddress')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps - Static Image */}
            <div className="footer-section footer-maps-section">
              <h4 className="footer-section-title">{t('footer.findUs')}</h4>
              <div className="footer-map-container">
                <div className="footer-map-photo">
                  <img 
                    src="/Footer/sliceGoogleMaps.png" 
                    alt="SLICE Weston Location - Google Maps" 
                    className="footer-map-image"
                  />
                </div>
                <div className="footer-map-actions">
                  <a 
                    href="https://www.google.com/maps/dir//Slice+LLC,+Weston,+FL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-map-button"
                  >
                    <span className="map-icon">🗺️</span>
                    {t('buttons.getDirections')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links Section - Below Services and Contact Us */}
          <div className="footer-quick-links-section">
            <div className="footer-section">
              <h4 className="footer-section-title">{t('footer.quickLinks')}</h4>
              <ul className="footer-links">
                <li><Link to="/">{t('nav.home')}</Link></li>
                <li><Link to="/whats-included">{t('nav.whatsIncluded')}</Link></li>
                <li><Link to="/catering">{t('nav.catering')}</Link></li>
                <li><Link to="/celebrations">{t('nav.celebrations')}</Link></li>
                <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
                <li><Link to="/about">{t('nav.about')}</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              {/* Copyright */}
              <div className="footer-copyright">
                <p>{String(t('footer.copyright')).replace('2024', currentYear.toString())}</p>
              </div>
              
              {/* Legal Links */}
              <div className="footer-legal">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/disclaimer">Disclaimer</Link>
                <Link to="/accessibility">Accessibility Statement</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
