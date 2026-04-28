import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.4 } },
}

export default function PageWrapper({ children }) {
  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}
