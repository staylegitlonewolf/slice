import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t, tString } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-page">
      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="text-3xl font-bold mb-4">{t('pages.contact.getInTouch')}</h2>
              <p className="text-lg text-gray-600 mb-8">
                {t('pages.contact.subtitle')}
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('pages.contact.fullName')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slice-primary focus:border-transparent"
                      placeholder={tString('pages.contact.yourFullName')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('pages.contact.emailAddress')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slice-primary focus:border-transparent"
                      placeholder={tString('pages.contact.yourEmail')}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t('pages.contact.phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slice-primary focus:border-transparent"
                      placeholder={tString('pages.contact.yourPhone')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium mb-2">
                      {t('pages.contact.eventType')} *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slice-primary focus:border-transparent"
                    >
                      <option value="">{t('pages.contact.selectEventType')}</option>
                      <option value="wedding">Wedding & Reception</option>
                      <option value="mitzvah">Bar/Bat Mitzvah</option>
                      <option value="quinceanera">Quinceanera</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                      {t('pages.contact.eventDate')}
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slice-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium mb-2">
                      {t('pages.contact.guestCount')}
                    </label>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slice-primary focus:border-transparent"
                    >
                      <option value="">{t('pages.contact.selectGuestCount')}</option>
                      <option value="1-50">1-50 guests</option>
                      <option value="51-100">51-100 guests</option>
                      <option value="101-150">101-150 guests</option>
                      <option value="151-200">151-200 guests</option>
                      <option value="200+">200+ guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('pages.contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slice-primary focus:border-transparent"
                    placeholder={tString('pages.contact.tellUsMore')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn btn-primary py-4 text-lg font-semibold"
                >
                  {t('pages.contact.sendMessage')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">{t('pages.contact.contactInfo')}</h2>
              <h3 className="text-xl font-semibold mb-8 text-center lg:text-left text-slice-primary">Find Us</h3>
              
              {/* Venue Details */}
              <div className="venue-details mb-8 text-center lg:text-left">
                <div className="venue-card">
                  <div className="venue-icon">📍</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('pages.contact.address')}</h3>
                    <p className="text-gray-600">
                      2600 Glades Circle Suite 1100<br />
                      Weston, Florida 33327
                    </p>
                  </div>
                </div>

                <div className="venue-card">
                  <div className="venue-icon">📞</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('pages.contact.phone')}</h3>
                    <a href="tel:954-557-7086" className="text-slice-primary hover:text-slice-secondary transition-colors text-lg">
                      (954) 557-7086
                    </a>
                  </div>
                </div>

                <div className="venue-card">
                  <div className="venue-icon">📧</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('pages.contact.email')}</h3>
                    <a href="mailto:info@sliceweston.com" className="text-slice-primary hover:text-slice-secondary transition-colors text-lg">
                      info@sliceweston.com
                    </a>
                  </div>
                </div>

                <div className="venue-card">
                  <div className="venue-icon">🕒</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{t('pages.contact.hours')}</h3>
                    <p className="text-gray-600">
                      By appointment only<br />
                      Available for tours and consultations
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="quick-contact mb-8">
                <h3 className="text-xl font-semibold mb-4">Quick Contact Options</h3>
                <div className="space-y-3">
                  <a href="tel:954-557-7086" className="flex items-center gap-3 text-slice-primary hover:text-slice-secondary transition-colors">
                    <span className="text-2xl">📞</span>
                    <span>Call us directly</span>
                  </a>
                  <a href="mailto:info@sliceweston.com" className="flex items-center gap-3 text-slice-primary hover:text-slice-secondary transition-colors">
                    <span className="text-2xl">📧</span>
                    <span>Send us an email</span>
                  </a>
                  <a href="/whats-included" className="flex items-center gap-3 text-slice-primary hover:text-slice-secondary transition-colors">
                    <span className="text-2xl">📋</span>
                    <span>View what's included</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-slice-primary to-slice-secondary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to See SLICE Weston?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Schedule a personal tour to experience our venue and discuss your event needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:954-557-7086" className="btn bg-white text-slice-primary hover:bg-gray-100">
              Call to Schedule Tour
            </a>
            <a href="mailto:info@sliceweston.com" className="btn btn-outline border-white text-white hover:bg-white hover:text-slice-primary">
              Email for Tour
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
