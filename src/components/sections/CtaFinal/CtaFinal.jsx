import { motion } from 'framer-motion'
import Container from '../../layout/Container/Container'
import Badge from '../../ui/Badge/Badge'
import Button from '../../ui/Button/Button'
import useScrollReveal from '../../../hooks/useScrollReveal'
import { ctaFinal } from '../../../data/content'
import styles from './CtaFinal.module.css'

export default function CtaFinal() {
  const { fadeUpVariants, staggerContainerVariants } = useScrollReveal()

  const [before, after] = ctaFinal.heading.split(ctaFinal.highlight)

  return (
    <section className={styles.section} aria-label="Chamada para ação final">
      <div className={styles.glow} aria-hidden="true" />
      <Container>
        <motion.div
          className={styles.content}
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUpVariants}>
            <Badge>{ctaFinal.badge}</Badge>
          </motion.div>

          <motion.h2 className={styles.heading} variants={fadeUpVariants}>
            {before}
            <span className={styles.highlight}>{ctaFinal.highlight}</span>
            {after}
          </motion.h2>

          <motion.p className={styles.subtitle} variants={fadeUpVariants}>
            {ctaFinal.subtitle}
          </motion.p>

          <motion.div className={styles.actions} variants={fadeUpVariants}>
            <Button href={ctaFinal.ctaHref} variant="primary" size="lg">
              {ctaFinal.cta}
            </Button>
            <Button href={ctaFinal.secondaryHref} variant="ghost" size="lg">
              {ctaFinal.secondary}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
