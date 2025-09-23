import React, { useState, useEffect } from 'react'
import { initScrollAnimations } from '../../components/ScrollAnimations'

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Initialize animations for FAQ component
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Re-initialize scroll animations for new elements
      initScrollAnimations()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const faqData = [
    {
      id: 1,
      question: "We proudly serve residents in ?",
      answer: "AL, AR, CO, DE, FL, GA, IA, IL, IN, KS, KY, LA, MD, MI, MO, MS, MT, NC, NE, NV, OH, OK, SC, SD, TN, TX, UT, VA, WI, WV, WY"
    },
    {
      id: 2,
      question: "Can you help with both individual and family plans?",
      answer: "Absolutely. We offer a wide range of plans for individuals, couples, and families."
    },
    {
      id: 3,
      question: "How long does it take to get coverage?",
      answer: "Most clients are covered the same day they apply, often within a few hours."
    },
    {
      id: 4,
      question: "Do you charge for consultations?",
      answer: "No, all consultations are 100% free and come with no obligation."
    }
  ]

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Get answers to common questions about our services</p>
               {/* Blue Divider */}
               <div className="blue-divider"></div> 
        </div>
        
        <div className="faq-grid">
          {faqData.map((faq) => (
            <div key={faq.id} className={`faq-item ${openFAQ === faq.id ? 'active' : ''}`}>
              <div 
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h3>{faq.question}</h3>
                <i className={`fas fa-chevron-${openFAQ === faq.id ? 'up' : 'down'}`} style={{
                  transform: openFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0deg)'
                }}></i>
              </div>
              <div className={`faq-answer ${openFAQ === faq.id ? 'active' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
