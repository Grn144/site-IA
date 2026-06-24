import { useState, useEffect } from 'react'
import Container from '../Container/Container'
import Button from '../../ui/Button/Button'
import useActiveSection from '../../../hooks/useActiveSection'
import { nav } from '../../../data/content'
import { SECTIONS } from '../../../utils/constants'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(SECTIONS)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Container>
        <nav className={styles.nav} aria-label="Navegação principal">
          <a href="#hero" className={styles.logo} aria-label="Voltar ao início">
            <span className={styles.logoGradient}>{nav.logo}</span>
          </a>
          <ul className={styles.links} role="list">
            {nav.links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`${styles.link} ${activeSection === href.slice(1) ? styles.active : ''}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#sobre" size="sm">
            {nav.cta}
          </Button>
        </nav>
      </Container>
    </header>
  )
}
