import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import Navbar from './Navbar'
import './Hero.css'

const EASE = [0.16, 1, 0.3, 1]
const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

export default function Hero({ onPrimaryCta, onSecondaryCta, navLinks }) {
  const { t } = useLanguage()
  const videoRef = useRef(null)
  const [videoVisible, setVideoVisible] = useState(true)

  const handleVideoEnded = () => {
    setVideoVisible(false)
    setTimeout(() => {
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        video.play()
      }
      setVideoVisible(true)
    }, 260)
  }

  return (
    <section className="hero">
      <Navbar navLinks={navLinks} />

      <motion.div
        className="hero-video-wrap"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <video
          ref={videoRef}
          className="hero-video"
          src={VIDEO_URL}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          style={{ opacity: videoVisible ? 1 : 0, transition: 'opacity 0.26s ease' }}
        />
      </motion.div>

      <motion.div
        className="hero-footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        <div className="hero-footer-inner">
          <div className="hero-footer-left">
            <motion.div
              className="hero-subtitle"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
            >
              <span className="hero-subtitle-dot" />
              <span>{t.hero.subtitle}</span>
            </motion.div>

            <motion.h1
              className="hero-heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
            >
              {t.hero.headingLine1}
              <br />
              {t.hero.headingLine2}
            </motion.h1>

            <motion.div
              className="hero-buttons"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
            >
              <button type="button" className="hero-btn-primary" onClick={onPrimaryCta}>
                {t.hero.ctaPrimary}
              </button>
              <button type="button" className="hero-btn-secondary" onClick={onSecondaryCta}>
                {t.hero.ctaSecondary}
              </button>
            </motion.div>
          </div>

          <div className="hero-footer-right">
            {t.hero.tags.map((tag) => (
              <span key={tag} className="hero-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
