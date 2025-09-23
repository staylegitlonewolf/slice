import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IMAGES } from '../../../src/utils/imageUtils'

const MainServices: React.FC = () => {
  const navigate = useNavigate()


  const handleGetQuote = () => {
    navigate('/contact')
  }




  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services-header">
         
          <h2>Plans & Pricing</h2>

          <p className="services-subtitle">
            Choose the perfect health insurance plan that fits your budget and coverage needs.             
          </p>
          <div className="blue-divider"></div>
        </div>

        <div className="services-grid">
          {/* Basic Coverage Plans */}
          <div className="service-card individual">
            <div className="service-icon">
              <i className="fas fa-user"></i>
            </div>
            <h3>Basic Coverage Plans</h3>
            <p>Ideal for individuals looking for essential health benefits on a budget with competitive pricing and excellent coverage.</p>
            <ul className="service-features">
              <li>Preventive Care Coverage</li>
              <li>Prescription Drug Coverage</li>
              <li>Emergency Services</li>
              <li>Mental Health Services</li>
              <li>Specialist Consultations</li>
              <li>24/7 Telehealth Access</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">Starting at $120/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Family Health Plans */}
          <div className="service-card family featured">
            <div className="service-badge">Most Popular</div>
            <div className="service-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Family Health Plans</h3>
            <p>Affordable protection for your entire household, including pediatric care that grows with your family's changing needs.</p>
            <ul className="service-features">
              <li>Family Deductible Options</li>
              <li>Pediatric Care Coverage</li>
              <li>Maternity & Newborn Care</li>
              <li>Dental & Vision Add-ons</li>
              <li>Wellness Programs</li>
              <li>Multi-member Discounts</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">As low as $300/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>

          {/* Self-Employed Packages */}
          <div className="service-card business">
            <div className="service-icon">
              <i className="fas fa-building"></i>
            </div>
            <h3>Self-Employed Packages</h3>
            <p>Flexible, comprehensive options tailored to freelancers and small business owners with affordable coverage.</p>
            <ul className="service-features">
              <li>Individual & Family Options</li>
              <li>Health Savings Account (HSA)</li>
              <li>Flexible Plan Options</li>
              <li>Business Expense Deductions</li>
              <li>Telehealth Services</li>
              <li>Prescription Coverage</li>
            </ul>
            <div className="service-pricing">
              <span className="service-price">From only $225/month</span>
              <button className="btn-accent" onClick={handleGetQuote}>Get Quote</button>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default MainServices
