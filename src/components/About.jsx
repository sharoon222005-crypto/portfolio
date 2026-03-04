import { memo } from 'react'
import { motion } from 'framer-motion'
import placeholderPhoto from '../assets/profile-placeholder.png'
import { hover3d, slideInFrom } from '../utils/motion'

const About = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">About Me</h2>
          <p className="mt-1 text-sm text-slate-400 md:text-[15px]">
            A full‑stack dev who cares about craft, UX, and clean architecture.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={slideInFrom('left', 0.1, 32)}
          {...hover3d({ rotate: { x: -6, y: 8 }, scale: 1.04 })}
          className="glass-card neon-border neon-hover relative mx-auto aspect-square max-w-xs overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/25 via-transparent to-slate-900/90" />
          <img
            src={placeholderPhoto}
            alt="Portrait of Sharoon"
            className="relative z-10 h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-[15px]"
        >
          <p>
            I&apos;m Sharoon, a Java full‑stack developer with a strong eye for design. I love turning complex
            product ideas into smooth, intuitive experiences – from database schema and REST APIs all the way to
            polished UI interactions.
          </p>
          <p>
            <span className="font-semibold text-indigo-200">Currently learning:</span> advanced Spring Boot
            patterns, system design fundamentals, and motion‑driven UI to make products feel more alive and
            intentional.
          </p>
          <p>
            <span className="font-semibold text-indigo-200">My goal:</span> to craft products that feel fast,
            reliable, and beautiful – the kind of interfaces developers love to build with and users love to stay
            in.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(About)

