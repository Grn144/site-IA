import { motion } from 'framer-motion'
import { Layers, Code2, MessageSquare, Rocket } from 'lucide-react'
import Container from '../../layout/Container/Container'
import Card from '../../ui/Card/Card'
import SectionHeading from '../../ui/SectionHeading/SectionHeading'
import useScrollReveal from '../../../hooks/useScrollReveal'
import { about } from '../../../data/content'
import styles from './About.module.css'

const ICONS = { Layers, Code2, MessageSquare, Rocket }

export default function About() {
  const { fadeUpVariants, staggerContainerVariants, cardVariants } = useScrollReveal()

  return (
    <section id="sobre" className={styles.about} aria-label="Sobre a IA e o Claude Code">
      <Container>
        <div className={styles.grid}>
          <motion.div
            className={styles.textCol}
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUpVariants}>
              <SectionHeading
                badge={about.badge}
                title={about.heading}
                highlight={about.highlight}
                subtitle={about.body}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.cardsGrid}
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {about.pillars.map((pillar) => {
              const Icon = ICONS[pillar.icon]
              return (
                <motion.div key={pillar.title} variants={cardVariants}>
                  <Card>
                    <div className={styles.pillarIcon} aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                    <p className={styles.pillarDesc}>{pillar.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
