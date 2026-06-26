import { useState, useEffect, useMemo } from 'react'
import { PRICING_CONFIG, calculatePrice, FEATURES, TESTIMONIALS } from './data'

export default function App() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [currency, setCurrency] = useState('USD')
  const [billingPeriod, setBillingPeriod] = useState('monthly')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Memoize pricing calculations
  const pricingData = useMemo(() => {
    return PRICING_CONFIG.tiers.map(tier => ({
      ...tier,
      price: calculatePrice(tier.id, currency, billingPeriod),
    }))
  }, [currency, billingPeriod])

  const currencySymbol = PRICING_CONFIG.currencies[currency as keyof typeof PRICING_CONFIG.currencies].symbol

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Button handlers
  const handleSignIn = () => {
    alert('Sign in coming soon')
  }

  const handleGetStarted = () => {
    alert('Thanks for your interest!')
  }

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          <nav>
            <div className="logo">NexaFlow</div>
            <div className="nav-links hide-mobile">
              <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }}>Features</a>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing') }}>Pricing</a>
              <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials') }}>Testimonials</a>
            </div>
            <div className="nav-buttons">
              <button className="btn-secondary" onClick={handleSignIn}>Sign In</button>
              <button className="btn-primary" onClick={() => scrollToSection('pricing')}>Get Started</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-fade-in">
          <h1>Enterprise Data Automation at Scale</h1>
          <p>Automate workflows. Sync teams. Generate insights. Reduce manual work by 80%.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollToSection('pricing')}>Start Free Trial</button>
            <button className="btn-secondary" onClick={() => scrollToSection('features')}>Watch Demo</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Companies Trust Us</div>
            </div>
            <div className="stat">
              <div className="stat-number">10M+</div>
              <div className="stat-label">Workflows Automated</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="container">
          <h2>Powerful Features</h2>
          
          {/* Desktop: Bento Grid */}
          {!isMobile && (
            <div className="bento-grid hide-mobile">
              {FEATURES.map((feature, idx) => (
                <div
                  key={feature.id}
                  className={`bento-item ${activeFeature === idx ? 'active' : ''}`}
                  onClick={() => setActiveFeature(idx)}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mobile: Accordion */}
          {isMobile && (
            <div className="hide-desktop">
              {FEATURES.map((feature, idx) => (
                <div
                  key={feature.id}
                  className={`accordion-item ${activeFeature === idx ? 'active' : ''}`}
                >
                  <div
                    className="accordion-header"
                    onClick={() => setActiveFeature(idx)}
                  >
                    <div>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
                      <h3>{feature.title}</h3>
                    </div>
                    <span style={{ fontSize: '1.5rem', color: 'var(--color-forsythia)' }}>
                      {activeFeature === idx ? '−' : '+'}
                    </span>
                  </div>
                  {activeFeature === idx && (
                    <div className="accordion-content">
                      <p>{feature.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <div className="container">
          <h2>Simple, Transparent Pricing</h2>
          
          {/* Controls */}
          <div className="pricing-controls">
            <div className="control-group">
              {['USD', 'INR', 'EUR'].map(curr => (
                <button
                  key={curr}
                  className={`${currency === curr ? 'active' : ''}`}
                  onClick={() => setCurrency(curr)}
                >
                  {curr}
                </button>
              ))}
            </div>

            <div className="control-group">
              {['monthly', 'annual'].map(period => (
                <button
                  key={period}
                  className={`${billingPeriod === period ? 'active' : ''}`}
                  onClick={() => setBillingPeriod(period)}
                >
                  {period === 'monthly' ? 'Monthly' : 'Annual (20% off)'}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-cards">
            {pricingData.map(tier => (
              <div key={tier.id} className={`pricing-card ${tier.popular ? 'popular' : ''}`}>
                <h3>{tier.name}</h3>
                <p className="description">{tier.description}</p>
                <div className="price">
                  {currencySymbol}
                  {tier.price.toFixed(2)}
                </div>
                <p className="price-period">
                  /{billingPeriod === 'monthly' ? 'month' : 'year'}
                </p>
                <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
                <ul>
                  {tier.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <div className="container">
          <h2>Trusted by Industry Leaders</h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="testimonial">
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div>
                  <p className="testimonial-author">{testimonial.name}</p>
                  <p className="testimonial-role">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2026 NexaFlow AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
