import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Container from '../../layout/Container/Container'
import SectionHeading from '../../ui/SectionHeading/SectionHeading'
import useScrollReveal from '../../../hooks/useScrollReveal'
import { faq } from '../../../data/content'
import styles from './FAQ.module.css'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const { fadeUpVariants, staggerContainerVariants } = useScrollReveal()

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

  return (
    <section id="faq" className={styles.section} aria-label="Perguntas frequentes">
      <Container>
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionHeading
              badge={faq.badge}
              title={faq.heading}
              highlight={faq.highlight}
              centered
            />
          </motion.div>

          <motion.div className={styles.list} variants={staggerContainerVariants}>
            {faq.items.map((item, index) => (
              <motion.div key={index} className={styles.item} variants={fadeUpVariants}>
                <button
                  className={styles.question}
                  onClick={() => toggle(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${openIndex === index ? styles.chevronOpen : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      className={styles.answer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <p className={styles.answerText}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
