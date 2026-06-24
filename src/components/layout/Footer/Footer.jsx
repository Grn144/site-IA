import Container from '../Container/Container'
import { footer } from '../../../data/content'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <span className={styles.logo}>{footer.logo}</span>
          <ul className={styles.links} role="list">
            {footer.links.map(({ label, href }) => {
              const isExternal = href.startsWith('http')
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={styles.link}
                    {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
          <p className={styles.copy}>{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
