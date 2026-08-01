import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import './AuthModal.css'

const EASE = [0.16, 1, 0.3, 1]

export default function AuthModal({ plan, onClose }) {
  const { t } = useLanguage()
  const [step, setStep] = useState('register')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleRegister = (e) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePayment = (e) => {
    e.preventDefault()
    setStep('success')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label={t.modal.close}>
          <X size={16} />
        </button>

        <AnimatePresence mode="wait">
          {step === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="modal-title">{t.modal.registerTitle}</h3>
              <p className="modal-subtitle">{t.modal.registerSubtitle}</p>
              {plan && (
                <div className="modal-plan-chip">
                  {t.modal.plan}: {plan.name} · {plan.price}
                  {t.pricing.period}
                </div>
              )}
              <form onSubmit={handleRegister} className="modal-form">
                <input
                  type="text"
                  placeholder={t.modal.name}
                  value={form.name}
                  onChange={update('name')}
                  required
                />
                <input
                  type="email"
                  placeholder={t.modal.email}
                  value={form.email}
                  onChange={update('email')}
                  required
                />
                <input
                  type="password"
                  placeholder={t.modal.password}
                  value={form.password}
                  onChange={update('password')}
                  required
                  minLength={6}
                />
                <button type="submit" className="modal-submit">
                  {t.modal.continue}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="modal-title">{t.modal.paymentTitle}</h3>
              <p className="modal-subtitle">{t.modal.paymentSubtitle}</p>
              {plan && (
                <div className="modal-plan-chip">
                  {t.modal.plan}: {plan.name} · {plan.price}
                  {t.pricing.period}
                </div>
              )}
              <form onSubmit={handlePayment} className="modal-form">
                <input type="text" placeholder={t.modal.cardNumber} required maxLength={19} />
                <div className="modal-form-row">
                  <input type="text" placeholder={t.modal.expiry} required maxLength={5} />
                  <input type="text" placeholder={t.modal.cvc} required maxLength={4} />
                </div>
                <button type="submit" className="modal-submit">
                  {t.modal.confirm}
                </button>
                <button
                  type="button"
                  className="modal-back"
                  onClick={() => setStep('register')}
                >
                  {t.modal.back}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="modal-success"
            >
              <h3 className="modal-title">{t.modal.successTitle}</h3>
              <p className="modal-subtitle">{t.modal.successText}</p>
              <button type="button" className="modal-submit" onClick={onClose}>
                {t.modal.close}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
