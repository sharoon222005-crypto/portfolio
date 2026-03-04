import { memo } from 'react'
import { motion } from 'framer-motion'
import { SKILLS } from '../constants/content'
import { HiOutlineCode, HiOutlineDatabase, HiOutlineServer, HiOutlineSparkles } from 'react-icons/hi'
import { hover3d, staggerContainer, fadeInUp } from '../utils/motion'

const iconForCategory = (category) => {
  switch (category) {
    case 'Frontend':
      return <HiOutlineCode className="h-5 w-5" />
    case 'Backend':
      return <HiOutlineServer className="h-5 w-5" />
    case 'Database':
      return <HiOutlineDatabase className="h-5 w-5" />
    default:
      return <HiOutlineSparkles className="h-5 w-5" />
  }
}

const Skills = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
            Tech Stack &amp; Skills
          </h2>
          <p className="mt-1 text-sm text-slate-400 md:text-[15px]">
            A blend of modern frontend craft and solid Java backend engineering.
          </p>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.06)}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILLS.map((skill) => (
          <motion.div
            key={skill.name}
            variants={fadeInUp(0)}
            {...hover3d({ rotate: { x: -4, y: 6 }, scale: 1.02 })}
            className="glass-card neon-border neon-hover relative overflow-hidden border border-white/10 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900/80 text-indigo-300 shadow-inner shadow-indigo-500/30">
                  {iconForCategory(skill.category)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">{skill.name}</h3>
                  <p className="text-xs text-slate-400">{skill.category}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-300">{skill.level}%</span>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300 shadow-[0_0_18px_rgba(129,140,248,0.6)]"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default memo(Skills)

