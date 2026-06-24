import { useReducedMotion } from 'framer-motion'

export default function useScrollReveal() {
  const reduce = useReducedMotion()

  if (reduce) {
    const instant = { hidden: {}, visible: {} }
    return { fadeUpVariants: instant, staggerContainerVariants: instant, cardVariants: instant }
  }

  return {
    fadeUpVariants: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
    staggerContainerVariants: {
      hidden: {},
      visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    },
    cardVariants: {
      hidden: { opacity: 0, y: 32 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    },
  }
}
