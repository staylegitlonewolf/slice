import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="services-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Our Services</h1>
          <p className="hero-subtitle">
            Comprehensive event solutions for every celebration
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Offer</h2>
            <p className="section-subtitle">
              From venue rental to full-service event coordination, we have everything you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card">
              <div className="card">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">🏛️</div>
                  <h3 className="text-xl font-bold mb-3">Venue Rental</h3>
                  <p className="text-gray-600 mb-4">
                    Our modern venue accommodates up to 220 guests with flexible layouts, 
                    professional lighting, and state-of-the-art audio/visual systems.
                  </p>
                  <Link to="/whats-included" className="btn btn-primary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div className="service-card">
              <div className="card">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">🍽️</div>
                  <h3 className="text-xl font-bold mb-3">Catering Services</h3>
                  <p className="text-gray-600 mb-4">
                    Custom menu planning and execution with professional chefs and staff. 
                    From appetizers to desserts, we create memorable dining experiences.
                  </p>
                  <Link to="/catering" className="btn btn-primary">
                    View Menus
                  </Link>
                </div>
              </div>
            </div>

            <div className="service-card">
              <div className="card">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">🍸</div>
                  <h3 className="text-xl font-bold mb-3">Bar Services</h3>
                  <p className="text-gray-600 mb-4">
                    Professional bar setup and beverage service with experienced bartenders. 
                    We handle everything from setup to cleanup.
                  </p>
                  <Link to="/contact" className="btn btn-primary">
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slice-gray-50">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Event Types We Specialize In</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="event-type-item text-center">
              <div className="text-3xl mb-3">💒</div>
              <h4 className="font-semibold mb-2">Weddings</h4>
              <p className="text-sm text-gray-600">Ceremonies and receptions</p>
            </div>
            
            <div className="event-type-item text-center">
              <div className="text-3xl mb-3">🕯️</div>
              <h4 className="font-semibold mb-2">Bar/Bat Mitzvahs</h4>
              <p className="text-sm text-gray-600">Traditional celebrations</p>
            </div>
            
            <div className="event-type-item text-center">
              <div className="text-3xl mb-3">👑</div>
              <h4 className="font-semibold mb-2">Quinceaneras</h4>
              <p className="text-sm text-gray-600">15th birthday celebrations</p>
            </div>
            
            <div className="event-type-item text-center">
              <div className="text-3xl mb-3">🎂</div>
              <h4 className="font-semibold mb-2">Birthdays</h4>
              <p className="text-sm text-gray-600">All ages and themes</p>
            </div>
            
            <div className="event-type-item text-center">
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="font-semibold mb-2">Corporate</h4>
              <p className="text-sm text-gray-600">Meetings and events</p>
            </div>
            
            <div className="event-type-item text-center">
              <div className="text-3xl mb-3">🎉</div>
              <h4 className="font-semibold mb-2">Parties</h4>
              <p className="text-sm text-gray-600">Any special occasion</p>
            </div>
            
            <div className="event-type-item text-center">
              <div className="text-3xl mb-3">🎓</div>
              <h4 className="font-semibold mb-2">Graduations</h4>
              <p className="text-sm text-gray-600">Academic celebrations</p>
            </div>
            
            <div className="event-type-item text-center">
              <div className="text-3xl mb-3">💍</div>
              <h4 className="font-semibold mb-2">Engagements</h4>
              <p className="text-sm text-gray-600">Proposal parties</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Services?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="feature-item">
              <div className="feature-icon text-4xl mb-4">✨</div>
              <h3 className="feature-title">All-Inclusive Packages</h3>
              <p className="feature-description">
                Everything you need is included in your rental - no hidden fees or surprises. 
                From furniture to lighting, we've got you covered.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon text-4xl mb-4">👑</div>
              <h3 className="feature-title">Personal Attention</h3>
              <p className="feature-description">
                Patty and her team provide personalized service from planning to execution. 
                We're with you every step of the way.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon text-4xl mb-4">🎯</div>
              <h3 className="feature-title">Proven Experience</h3>
              <p className="feature-description">
                With over 500 events hosted since 2014, we have the experience and expertise 
                to make your event perfect.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon text-4xl mb-4">🌟</div>
              <h3 className="feature-title">Modern Facility</h3>
              <p className="feature-description">
                State-of-the-art venue with club-style atmosphere, LED lighting, and 
                professional audio/visual systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-r from-slice-primary to-slice-secondary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss your event needs and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn bg-white text-slice-primary hover:bg-gray-100">
              Contact Us
            </Link>
            <a href="tel:954-557-7086" className="btn btn-outline border-white text-white hover:bg-white hover:text-slice-primary">
              Call (954) 557-7086
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
