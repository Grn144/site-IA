import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  'aria-label': ariaLabel,
  className = '',
}) {
  const cls = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
