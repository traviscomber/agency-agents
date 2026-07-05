'use client'

import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion'

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
  const [displayValue, setDisplayValue] = useState(from)

  useMotionValueEvent(rounded, 'change', (latest) => {
    setDisplayValue(latest)
  })

  useEffect(() => {
    const animation = animate(count, to, {
      duration,
      delay,
      ease: 'easeOut',
    })
    return animation.stop
  }, [count, delay, duration, to])

  return (
    <motion.span>
      {displayValue}
      {suffix}
    </motion.span>
  )
}
