'use client'

import { motion, useMotionValue, useTransform, useEffect } from 'framer-motion'

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
  delay?: number
}

export function AnimatedCounter({ from, to, duration = 2, suffix = '', delay = 0 }: AnimatedCounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))

  useEffect(() => {
    const animation = count.animate(to, {
      duration,
      delay,
      ease: 'easeOut',
    })
    return animation.stop
  }, [])

  return (
    <motion.span>
      {rounded}
      {suffix}
    </motion.span>
  )
}
