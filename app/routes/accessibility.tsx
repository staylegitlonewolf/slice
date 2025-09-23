import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Accessibility: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="accessibility-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Accessibility Statement</h1>
          <p className="page-subtitle">
            SLICE Weston is committed to ensuring digital accessibility for all users.
          </p>
        </div>

        <div className="accessibility-content">
          <section className="accessibility-section">
            <h2>Our Commitment</h2>
            <p>
              SLICE Weston is committed to providing a website that is accessible to the widest possible audience, 
              regardless of technology or ability. We are actively working to increase the accessibility and usability 
              of our website and in doing so adhere to many of the available standards and guidelines.
            </p>
          </section>

          <section className="accessibility-section">
            <h2>Web Content Accessibility Guidelines (WCAG)</h2>
            <p>
              This website endeavors to conform to level AA of the World Wide Web Consortium (W3C) 
              Web Content Accessibility Guidelines 2.1. These guidelines explain how to make web content 
              more accessible for people with disabilities, and user friendly for everyone.
            </p>
          </section>

          <section className="accessibility-section">
            <h2>Accessibility Features</h2>
            <ul className="accessibility-features">
              <li>Keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>High contrast mode options</li>
              <li>Text size adjustment capabilities</li>
              <li>Alternative text for images</li>
              <li>Semantic HTML structure</li>
              <li>Focus indicators for interactive elements</li>
              <li>Color contrast compliance</li>
            </ul>
          </section>

          <section className="accessibility-section">
            <h2>Accessibility Tools</h2>
            <p>
              Our website includes built-in accessibility tools that allow users to:
            </p>
            <ul className="accessibility-features">
              <li>Adjust text size for better readability</li>
              <li>Toggle between light and dark themes</li>
              <li>Enable high contrast mode</li>
              <li>Access keyboard shortcuts for navigation</li>
            </ul>
          </section>

          <section className="accessibility-section">
            <h2>Ongoing Efforts</h2>
            <p>
              We are continually working to improve the accessibility of our website. This includes:
            </p>
            <ul className="accessibility-features">
              <li>Regular accessibility audits</li>
              <li>User testing with assistive technologies</li>
              <li>Staff training on accessibility best practices</li>
              <li>Implementation of user feedback</li>
            </ul>
          </section>

          <section className="accessibility-section">
            <h2>Contact Us</h2>
            <p>
              If you encounter any accessibility barriers or have suggestions for improvement, 
              please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Phone:</strong> <a href="tel:954-557-7086">954-557-7086</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@sliceweston.com">info@sliceweston.com</a></p>
              <p><strong>Address:</strong> 2600 Glades Circle Suite 1100, Weston, Florida 33327</p>
            </div>
          </section>

          <section className="accessibility-section">
            <h2>Third-Party Content</h2>
            <p>
              Some content on our website may be provided by third parties. While we strive to ensure 
              all content meets accessibility standards, we cannot guarantee the accessibility of 
              third-party content.
            </p>
          </section>

          <section className="accessibility-section">
            <h2>Last Updated</h2>
            <p>This accessibility statement was last updated on {new Date().toLocaleDateString()}.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
