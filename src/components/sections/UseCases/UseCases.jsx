import { motion } from 'framer-motion'
import { Monitor, ShoppingCart, PenLine, BarChart3, Building2, Globe } from 'lucide-react'
import Container from '../../layout/Container/Container'
import Card from '../../ui/Card/Card'
import SectionHeading from '../../ui/SectionHeading/SectionHeading'
import useScrollReveal from '../../../hooks/useScrollReveal'
import { useCases } from '../../../data/content'
import styles from './UseCases.module.css'

const ICONS = { Monitor, ShoppingCart, PenLine, BarChart3, Building2, Globe }

export default function UseCases() {
  const { fadeUpVariants, staggerContainerVariants, cardVariants } = useScrollReveal()

  return (
    <section id="casos-de-uso" className={styles.section} aria-label="Casos de uso do Claude Code">
      <Container>
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionHeading
              badge={useCases.badge}
              title={useCases.heading}
              highlight={useCases.highlight}
              subtitle={useCases.subtitle}
              centered
            />
          </motion.div>

          <motion.div
            className={styles.grid}
            variants={staggerContainerVariants}
          >
            {useCases.cases.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <motion.div key={item.title} variants={cardVariants}>
                  <Card className={styles.card}>
                    <div className={styles.icon} aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
