import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Catering: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="catering-page">
      <div className="hero-section">
        <div className="container mx-auto px-4 py-16">
          <h1 className="hero-title text-center mb-8">
            {t('catering.hero.title')}
          </h1>
          <p className="hero-subtitle text-center max-w-3xl mx-auto">
            {t('catering.hero.subtitle')}
          </p>
        </div>
      </div>

      <div className="content-section py-16">
        <div className="container mx-auto px-4">
          {/* Menu Packages */}
          <div className="menu-packages mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">{t('catering.packages.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Basic Package */}
              <div className="package-card">
                <div className="package-header">
                  <h3 className="package-title">{t('catering.packages.basic.title')}</h3>
                  <p className="package-price">{t('catering.packages.basic.price')}</p>
                </div>
                <ul className="package-features">
                  {(t('catering.packages.basic.features') as string[]).map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Link to="/contact" className="package-cta">
                  {t('buttons.getQuote')}
                </Link>
              </div>

              {/* Premium Package */}
              <div className="package-card featured">
                <div className="package-header">
                  <h3 className="package-title">{t('catering.packages.premium.title')}</h3>
                  <p className="package-price">{t('catering.packages.premium.price')}</p>
                </div>
                <ul className="package-features">
                  {(t('catering.packages.premium.features') as string[]).map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Link to="/contact" className="package-cta">
                  {t('buttons.getQuote')}
                </Link>
              </div>

              {/* Luxury Package */}
              <div className="package-card">
                <div className="package-header">
                  <h3 className="package-title">{t('catering.packages.luxury.title')}</h3>
                  <p className="package-price">{t('catering.packages.luxury.price')}</p>
                </div>
                <ul className="package-features">
                  {(t('catering.packages.luxury.features') as string[]).map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Link to="/contact" className="package-cta">
                  {t('buttons.getQuote')}
                </Link>
              </div>
            </div>
          </div>

          {/* Dietary Options */}
          <div className="dietary-options mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">{t('catering.dietary.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="dietary-card">
                <div className="dietary-icon">🌱</div>
                <h4>{t('catering.dietary.vegetarian.title')}</h4>
                <p>{t('catering.dietary.vegetarian.description')}</p>
              </div>
              <div className="dietary-card">
                <div className="dietary-icon">🥜</div>
                <h4>{t('catering.dietary.allergenFree.title')}</h4>
                <p>{t('catering.dietary.allergenFree.description')}</p>
              </div>
              <div className="dietary-card">
                <div className="dietary-icon">🕊️</div>
                <h4>{t('catering.dietary.vegan.title')}</h4>
                <p>{t('catering.dietary.vegan.description')}</p>
              </div>
              <div className="dietary-card">
                <div className="dietary-icon">🕌</div>
                <h4>{t('catering.dietary.kosher.title')}</h4>
                <p>{t('catering.dietary.kosher.description')}</p>
              </div>
            </div>
          </div>

          {/* Cuisine Styles */}
          <div className="cuisine-styles mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">{t('catering.cuisine.title')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="cuisine-card">
                <h4 className="text-xl font-semibold mb-4">{t('catering.cuisine.american.title')}</h4>
                <p>{t('catering.cuisine.american.description')}</p>
              </div>
              <div className="cuisine-card">
                <h4 className="text-xl font-semibold mb-4">{t('catering.cuisine.international.title')}</h4>
                <p>{t('catering.cuisine.international.description')}</p>
              </div>
              <div className="cuisine-card">
                <h4 className="text-xl font-semibold mb-4">{t('catering.cuisine.seasonal.title')}</h4>
                <p>{t('catering.cuisine.seasonal.description')}</p>
              </div>
              <div className="cuisine-card">
                <h4 className="text-xl font-semibold mb-4">{t('catering.cuisine.custom.title')}</h4>
                <p>{t('catering.cuisine.custom.description')}</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section text-center">
            <h3 className="text-2xl font-bold mb-4">{t('catering.cta.title')}</h3>
            <p className="text-lg mb-8">{t('catering.cta.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                {t('buttons.startPlanningMenu')}
              </Link>
              <Link to="/whats-included" className="btn-secondary">
                {t('buttons.viewAllServices')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catering;
