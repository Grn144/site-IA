import styles from './SectionHeading.module.css'
import Badge from '../Badge/Badge'

export default function SectionHeading({ badge, title, highlight, subtitle, centered = false }) {
  const parts = highlight ? title.split(highlight) : null

  return (
    <div className={`${styles.heading} ${centered ? styles.centered : ''}`}>
      {badge && <Badge>{badge}</Badge>}
      <h2 className={styles.title}>
        {parts ? (
          <>
            {parts[0]}
            <span className={styles.highlight}>{highlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
