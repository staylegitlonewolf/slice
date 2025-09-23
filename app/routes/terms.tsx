import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="terms-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Terms of Service</h1>
          <p className="hero-subtitle">
            Our terms and conditions for using SLICE Weston services
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose max-w-4xl mx-auto">
            <h2>Terms of Service for SLICE Weston</h2>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h3>Acceptance of Terms</h3>
            <p>By using our services, you agree to these terms and conditions.</p>
            
            <h3>Service Description</h3>
            <p>SLICE Weston provides event venue services, catering, and event coordination.</p>
            
            <h3>Contact Us</h3>
            <p>For questions about these terms, contact us at info@sliceweston.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
