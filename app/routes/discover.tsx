
import React from 'react';
import { Link } from 'react-router-dom';

const Discover: React.FC = () => {
  return (
    <div className="discover-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover SLICE Weston</h1>
          <p className="hero-subtitle">
            Experience the perfect blend of modern luxury and warm hospitality
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose SLICE Weston?</h2>
            <p className="section-subtitle">
              We've been creating unforgettable events since 2014
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">A Venue Like No Other</h3>
              <p className="text-lg mb-4">
                SLICE Weston combines the sophistication of a high-end club with the warmth of a 
                family-owned business. Our 220-guest capacity venue features state-of-the-art 
                lighting, professional sound systems, and flexible layouts for any event size.
              </p>
              <p className="text-lg mb-6">
                From intimate gatherings to grand celebrations, we make every moment special.
              </p>
              <Link to="/whats-included" className="btn btn-primary">
                See What's Included
              </Link>
            </div>
            
            <div className="image-placeholder bg-gradient-to-br from-slice-primary to-slice-secondary rounded-lg p-8 text-center text-white">
              <div className="text-6xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold">Modern Venue</h3>
              <p>State-of-the-art facility with all amenities included</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slice-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ready to Start Planning?</h2>
            <p className="section-subtitle">
              Let's create something amazing together
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn btn-primary">
                Get Started
              </Link>
              <a href="tel:954-557-7086" className="btn btn-outline">
                Call (954) 557-7086
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discover;
