
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="disclaimer-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Disclaimer</h1>
          <p className="hero-subtitle">
            Important information about our services and website
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose max-w-4xl mx-auto">
            <h2>Disclaimer for SLICE Weston</h2>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h3>General Information</h3>
            <p>The information on this website is provided for general informational purposes only.</p>
            
            <h3>Service Availability</h3>
            <p>All services are subject to availability and may vary based on event requirements.</p>
            
            <h3>Contact Us</h3>
            <p>For specific information about our services, please contact us directly.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Disclaimer;
