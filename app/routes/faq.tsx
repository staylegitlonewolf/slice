import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ: React.FC = () => {
  const { t, language } = useLanguage();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  // FAQ data - hardcoded to avoid translation issues
  const faqData = [
    {
      question: language === 'es' ? "¿Hay estacionamiento disponible?" : "Is parking available?",
      answer: language === 'es' 
        ? "Sí, hay más de 70 espacios de estacionamiento GRATUITOS disponibles tanto al frente como detrás del lugar Slice en la propiedad."
        : "Yes, There are more than 70 Free parking spots available both in front and behind the Slice venue on the property."
    },
    {
      question: language === 'es' ? "¿Qué se requiere para reservar la fecha de mi evento?" : "What is required to book my event date?",
      answer: language === 'es'
        ? "Requerimos un depósito de un tercio del total estimado. Este depósito se debe al firmar el acuerdo de función para asegurar tu fecha."
        : "We require a deposit of one-third down of the estimated bill. This deposit is due at the signing of the function agreement to secure your date."
    },
    {
      question: language === 'es' ? "¿Tienen seguridad?" : "Do you have security?",
      answer: language === 'es'
        ? "La Seguridad es obligatoria para todos los eventos, se requiere una tarifa adicional."
        : "Mandatory Security is required for all events additional fee is required."
    },
    {
      question: language === 'es' ? "¿Qué restricciones hay en las decoraciones?" : "What restrictions are there on decorations?",
      answer: language === 'es'
        ? "Las decoraciones están permitidas. Los artículos pueden fijarse a las paredes del local con permiso específico del personal y usando material especificado. Brillo, confeti, arroz, bengalas no están permitidos. Las velas deben estar confinadas dentro de un contenedor de vidrio y las llamas deben estar por debajo del borde."
        : "Decorations are permitted. Item may be affixed to the walls of the Premises with specific permission by staff and using specified material Glitter, confetti, rice, sparklers are not permitted. Candles must be confined within a glass container and flames must be below rim."
    },
    {
      question: language === 'es' ? "¿Su espacio es accesible para discapacitados?" : "Is your space accessible to the disabled?",
      answer: language === 'es'
        ? "Hay estacionamiento para discapacitados al frente del lugar y baños grandes accesibles."
        : "There are handicap parking up front of the venue and large accessible restrooms."
    },
    {
      question: language === 'es' ? "¿Cuánto tiempo tengo para configurar y desmontar la decoración?" : "How much time do I have to set up and breakdown décor?",
      answer: language === 'es'
        ? "El tiempo de configuración para tu evento será determinado por el Gerente de Eventos. El acceso es típicamente dos horas antes del evento. Una hora después del tiempo establecido del evento se asigna para el desmontaje de proveedores."
        : "Set up time for your event will be determined by the Event Manager. Access is typically two hours prior to the event. One hour after the stated event time is allocated for vendor breakdown."
    },
    {
      question: language === 'es' ? "¿Hay restricciones en proveedores externos?" : "Are there restrictions on outside vendors?",
      answer: language === 'es'
        ? "El bar es solo interno. Puedes usar cualquier otro proveedor para otros servicios incluyendo Catering siempre que el proveedor tenga seguro de responsabilidad civil."
        : "Bar are in house only. You may use any other vendor for other services including Catering as long as the vendor carries liability insurance."
    }
  ];

  return (
    <div className="faq-page">
      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="section-header text-center mb-12">
              <h2 className="section-title">
                {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
              </h2>
              <p className="section-subtitle">
                {language === 'es'
                  ? 'Obtén respuestas a las preguntas más comunes sobre nuestro lugar, políticas y servicios'
                  : 'Get answers to the most common questions about our venue, policies, and services'
                }
              </p>
            </div>

            <div className="faq-container">
              {faqData.map((item, index) => (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleItem(index)}
                    aria-expanded={openItems.includes(index)}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <span className={`faq-icon ${openItems.includes(index) ? 'open' : ''}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  
                  <div className={`faq-answer ${openItems.includes(index) ? 'open' : ''}`}>
                    <div className="faq-answer-content">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="faq-cta text-center mt-16">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'es' ? '¿Aún tienes preguntas?' : 'Still have questions?'}
              </h3>
              <p className="text-lg mb-8 text-slice-gray-600">
                {language === 'es'
                  ? 'Nuestro equipo está aquí para ayudarte a planificar el evento perfecto. Contáctanos para asistencia personalizada.'
                  : 'Our team is here to help you plan the perfect event. Contact us for personalized assistance.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn btn-primary">
                  {language === 'es' ? 'Contáctanos' : 'Contact Us'}
                </Link>
                <a href="tel:954-557-7086" className="btn btn-outline">
                  {language === 'es' ? 'Llamar (954) 557-7086' : 'Call (954) 557-7086'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="section bg-slice-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">
              {language === 'es' ? '¿Listo para Reservar Tu Evento?' : 'Ready to Book Your Event?'}
            </h2>
            <p className="section-subtitle mb-8">
              {language === 'es'
                ? '¡No esperes - nuestro calendario se llena rápidamente! Asegura tu fecha hoy y déjanos ayudarte a crear una celebración inolvidable.'
                : 'Don\'t wait - our calendar fills up quickly! Secure your date today and let us help you create an unforgettable celebration.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn btn-primary btn-lg">
                {language === 'es' ? 'Reservar Tu Evento' : 'Book Your Event'}
              </Link>
              <Link to="/whats-included" className="btn btn-outline btn-lg">
                {language === 'es' ? 'Ver Lo Incluido' : 'See What\'s Included'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;