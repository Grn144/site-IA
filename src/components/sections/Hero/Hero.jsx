import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import robotHeroSrc from '../../../assets/videos/robot-hero.mp4'
import Container from '../../layout/Container/Container'
import Button from '../../ui/Button/Button'
import Badge from '../../ui/Badge/Badge'
import useScrollReveal from '../../../hooks/useScrollReveal'
import { hero } from '../../../data/content'
import styles from './Hero.module.css'

export default function Hero() {
  const { fadeUpVariants, staggerContainerVariants } = useScrollReveal()

  return (
    <section id="hero" className={styles.hero} aria-label="Início">
      <video
        className={styles.video}
        src={robotHeroSrc}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <Container>
        <motion.div
          className={styles.content}
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpVariants}>
            <Badge>{hero.badge}</Badge>
          </motion.div>

          <motion.h1 className={styles.headline} variants={fadeUpVariants}>
            {hero.headline}
          </motion.h1>

          <motion.p className={styles.subheadline} variants={fadeUpVariants}>
            {hero.subheadline}
          </motion.p>

          <motion.div className={styles.ctas} variants={fadeUpVariants}>
            <Button href="#sobre" size="lg">
              {hero.ctaPrimary}
            </Button>
            <Button href="#sobre" variant="ghost" size="lg">
              {hero.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <a href="#sobre" className={styles.scrollIndicator} aria-label="Rolar para a próxima seção">
        <ChevronDown size={24} />
      </a>
    </section>
  )
}
