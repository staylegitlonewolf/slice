import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="privacy-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Privacy Policy</h1>
          <p className="hero-subtitle">
            How we protect and handle your information
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose max-w-4xl mx-auto">
            <h2>Privacy Policy for SLICE Weston</h2>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h3>Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you contact us, book an event, or sign up for our newsletter.</p>
            
            <h3>How We Use Your Information</h3>
            <p>We use the information we collect to provide our services, communicate with you, and improve our offerings.</p>
            
            <h3>Contact Us</h3>
            <p>If you have questions about this Privacy Policy, please contact us at info@sliceweston.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
