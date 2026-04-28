import { motion } from 'framer-motion'

export default function FloatingOrbs() {
  const orbs = [
    { size: 400, x: '10%', y: '20%', delay: 0, duration: 12 },
    { size: 300, x: '75%', y: '60%', delay: 2, duration: 15 },
    { size: 200, x: '50%', y: '10%', delay: 4, duration: 10 },
    { size: 250, x: '85%', y: '15%', delay: 1, duration: 13 },
    { size: 180, x: '5%', y: '75%', delay: 3, duration: 11 },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.02) 50%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
