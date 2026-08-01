import { useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import Hero from './components/Hero'
import { Program, HowItWorks } from './components/Sections'
import Pricing from './components/Pricing'
import AuthModal from './components/AuthModal'

function Landing() {
  const { t } = useLanguage()
  const [activePlan, setActivePlan] = useState(null)
  const programRef = useRef(null)
  const howItWorksRef = useRef(null)
  const pricingRef = useRef(null)

  const scrollTo = (ref) => () => ref.current?.scrollIntoView({ behavior: 'smooth' })
  const scrollToProgram = scrollTo(programRef)
  const scrollToHowItWorks = scrollTo(howItWorksRef)
  const scrollToPricing = scrollTo(pricingRef)

  const navLinks = [
    { label: t.nav.menuLinks[0], onClick: scrollToProgram },
    { label: t.nav.menuLinks[1], onClick: scrollToHowItWorks },
    { label: t.nav.menuLinks[2], onClick: scrollToPricing },
  ]

  return (
    <>
      <Hero
        onPrimaryCta={scrollToProgram}
        onSecondaryCta={scrollToHowItWorks}
        navLinks={navLinks}
      />
      <Program ref={programRef} />
      <HowItWorks ref={howItWorksRef} />
      <Pricing ref={pricingRef} onSubscribe={setActivePlan} />

      <AnimatePresence>
        {activePlan && (
          <AuthModal plan={activePlan} onClose={() => setActivePlan(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Landing />
    </LanguageProvider>
  )
}

export default App
