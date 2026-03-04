import { useMotionValue, useSpring, useTransform } from 'framer-motion'

// Basic reusable variants
export const fadeInUp = (delay = 0, distance = 20) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] },
  },
})

export const slideInFrom = (direction = 'left', delay = 0, distance = 40) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const sign = direction === 'left' || direction === 'up' ? -1 : 1
  return {
    hidden: { opacity: 0, [axis]: sign * distance },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] },
    },
  }
}

export const staggerContainer = (stagger = 0.08, delayChildren = 0.05) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

// 3D hover helper – spread into motion components
export const hover3d = (options = {}) => {
  const {
    rotate = { x: -6, y: 6 },
    scale = 1.02,
    transition = { type: 'spring', stiffness: 220, damping: 20 },
  } = options

  return {
    whileHover: {
      rotateX: rotate.x,
      rotateY: rotate.y,
      scale,
    },
    whileTap: { scale: scale * 0.97 },
    transition,
    style: { transformPerspective: 900 },
  }
}

// Simple hook to drive parallax from pointer movement inside a container
export const useParallaxTilt = (strength = 20) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [strength, -strength])
  const rotateY = useTransform(x, [-0.5, 0.5], [-strength, strength])
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 18 })
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 18 })

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
    const pctX = offsetX / rect.width - 0.5
    const pctY = offsetY / rect.height - 0.5
    x.set(pctX)
    y.set(pctY)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return {
    rotation: { rotateX: springRotateX, rotateY: springRotateY },
    events: { onMouseMove: onMove, onMouseLeave: onLeave },
  }
}

