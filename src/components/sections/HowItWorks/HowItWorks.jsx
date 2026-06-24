import { motion } from 'framer-motion'
import { PenLine, Cpu, Rocket } from 'lucide-react'
import Container from '../../layout/Container/Container'
import SectionHeading from '../../ui/SectionHeading/SectionHeading'
import useScrollReveal from '../../../hooks/useScrollReveal'
import { howItWorks } from '../../../data/content'
import styles from './HowItWorks.module.css'

const ICONS = { PenLine, Cpu, Rocket }

export default function HowItWorks() {
  const { fadeUpVariants, staggerContainerVariants } = useScrollReveal()

  return (
    <section id="como-funciona" className={styles.section} aria-label="Como funciona o Claude Code">
      <Container>
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionHeading
              badge={howItWorks.badge}
              title={howItWorks.heading}
              highlight={howItWorks.highlight}
              centered
            />
          </motion.div>

          <div className={styles.steps}>
            {howItWorks.steps.map((step, index) => {
              const Icon = ICONS[step.icon]
              return (
                <motion.div
                  key={step.number}
                  className={styles.step}
                  variants={fadeUpVariants}
                  custom={index}
                >
                  <div className={styles.stepNumber} aria-hidden="true">
                    {step.number}
                  </div>
                  {index < howItWorks.steps.length - 1 && (
                    <div className={styles.connector} aria-hidden="true" />
                  )}
                  <div className={styles.stepIcon} aria-hidden="true">
                    <Icon size={28} />
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
