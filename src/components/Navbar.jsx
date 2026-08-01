import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import './Navbar.css'

const EASE = [0.16, 1, 0.3, 1]

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect
        x="4"
        y="11"
        width="14"
        height="6"
        rx="3"
        fill="#000"
        transform="rotate(-35 11 14)"
      />
      <rect
        x="10"
        y="11"
        width="14"
        height="6"
        rx="3"
        fill="#000"
        transform="rotate(-35 17 14)"
      />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="0" y="0" width="4.5" height="4.5" rx="1" fill="#fff" />
      <rect x="7.5" y="0" width="4.5" height="4.5" rx="1" fill="#fff" />
      <rect x="0" y="7.5" width="4.5" height="4.5" rx="1" fill="#fff" />
      <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="#fff" />
    </svg>
  )
}

export default function Navbar({ navLinks = [] }) {
  const { lang, toggle, t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = (onClick) => {
    setMenuOpen(false)
    onClick?.()
  }

  const handleToggleClick = () => setMenuOpen((o) => !o)

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="navbar-side navbar-left">
        <div className="navbar-logo">
          <LogoMark />
          <span className="navbar-brand">{t.brand}</span>
        </div>

        <div className="navbar-menu-container">
          <button
            type="button"
            className="navbar-menu-btn"
            onClick={handleToggleClick}
            aria-expanded={menuOpen}
          >
            <span className="navbar-menu-circle">
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ display: 'flex' }}
              >
                <Plus size={12} strokeWidth={3} color="#fff" />
              </motion.span>
            </span>
            <span className="navbar-menu-text">{t.nav.menu}</span>
          </button>

          <AnimatePresence>
            {menuOpen && [
              <motion.div
                key="backdrop"
                className="navbar-menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />,
              <motion.div
                key="panel"
                className="navbar-menu-panel"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    className="navbar-menu-link"
                    onClick={() => handleLinkClick(link.onClick)}
                  >
                    {link.label}
                  </button>
                ))}
              </motion.div>,
            ]}
          </AnimatePresence>
        </div>

        <div className="navbar-tags">
          <span>{t.nav.tag1}</span>
          <span className="navbar-tags-dot" />
          <span>{t.nav.tag2}</span>
        </div>
      </div>

      <div className="navbar-side navbar-right">
        <button
          type="button"
          className="navbar-lang-toggle"
          onClick={toggle}
          aria-label="Toggle language"
        >
          {lang === 'ru' ? 'EN' : 'RU'}
        </button>

        <div className="navbar-live-pill">
          <span className="navbar-live-circle">
            <GridIcon />
          </span>
          <span className="navbar-live-text">{t.nav.liveLabel}</span>
        </div>
      </div>
    </motion.nav>
  )
}
