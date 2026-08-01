import { forwardRef, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import './Sections.css'

const EASE = [0.16, 1, 0.3, 1]

export const Program = forwardRef(function Program(_, ref) {
  const { t } = useLanguage()
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  })

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40])

  return (
    <section className="section" ref={ref} id="program">
      <motion.p
        className="section-kicker"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {t.program.kicker}
      </motion.p>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
      >
        {t.program.title}
      </motion.h2>
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
      >
        {t.program.subtitle}
      </motion.p>

      <div ref={trackRef} className="program-track">
        <motion.div
          className="program-grid"
          style={{ rotateX: rotate, scale, y, transformPerspective: 1000 }}
        >
          {t.program.modules.map((mod, i) => (
            <motion.div
              className="program-card glass-card"
              key={mod.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <span className="program-card-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{mod.name}</h3>
              <p>{mod.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})

export const HowItWorks = forwardRef(function HowItWorks(_, ref) {
  const { t } = useLanguage()

  return (
    <section className="section section-alt" ref={ref} id="how-it-works">
      <motion.p
        className="section-kicker"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {t.howItWorks.kicker}
      </motion.p>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
      >
        {t.howItWorks.title}
      </motion.h2>

      <div className="steps-grid">
        {t.howItWorks.steps.map((step, i) => (
          <motion.div
            className="step-card"
            key={step.title}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
          >
            <div className="step-icon glass-card">
              <Sparkles size={18} strokeWidth={1.75} />
              <span className="step-number">{i + 1}</span>
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
})
