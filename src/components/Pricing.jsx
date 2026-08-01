import { forwardRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './Pricing.css'

const Pricing = forwardRef(function Pricing({ onSubscribe }, ref) {
  const { t } = useLanguage()

  return (
    <section className="pricing" ref={ref} id="pricing">
      <div className="pricing-head">
        <h2 className="pricing-title">{t.pricing.title}</h2>
        <p className="pricing-subtitle">{t.pricing.subtitle}</p>
      </div>

      <div className="pricing-grid">
        {t.pricing.plans.map((plan, i) => (
          <div className={`pricing-card ${i === 1 ? 'is-popular' : ''}`} key={plan.name}>
            {i === 1 && <span className="pricing-badge">{t.pricing.popular}</span>}
            <h3 className="pricing-plan-name">{plan.name}</h3>
            <div className="pricing-price">
              {plan.price}
              <span className="pricing-period">{t.pricing.period}</span>
            </div>
            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button
              type="button"
              className={`pricing-cta ${i === 1 ? 'pricing-cta-dark' : ''}`}
              onClick={() => onSubscribe(plan)}
            >
              {t.pricing.subscribe}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
})

export default Pricing
