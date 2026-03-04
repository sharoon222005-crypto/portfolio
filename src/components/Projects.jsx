import { memo } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineExternalLink, HiOutlineCode } from 'react-icons/hi'
import { PROJECTS } from '../constants/content'
import { hover3d, staggerContainer, fadeInUp } from '../utils/motion'

const Projects = () => {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">Selected Projects</h2>
          <p className="mt-1 text-sm text-slate-400 md:text-[15px]">
            A snapshot of the kind of experiences I enjoy building.
          </p>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.08)}
        className="grid gap-5 md:grid-cols-2"
      >
        {PROJECTS.map((project) => (
          <motion.article
            key={project.title}
            variants={fadeInUp(0)}
            {...hover3d({ rotate: { x: -4, y: 8 }, scale: 1.03 })}
            className="group glass-card neon-border neon-hover flex flex-col justify-between overflow-hidden border border-white/10 p-5"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-50 md:text-lg">{project.title}</h3>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-glow-blue" />
                  Featured
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((stack) => (
                  <span
                    key={stack}
                    className="inline-flex items-center rounded-full border border-indigo-400/30 bg-slate-900/60 px-2.5 py-1 text-[11px] font-medium text-indigo-100"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <motion.a
                href={project.liveUrl}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-slate-50/95 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-md shadow-slate-900/40 transition hover:bg-white"
              >
                <HiOutlineExternalLink className="h-4 w-4" />
                Live
              </motion.a>
              <motion.a
                href={project.githubUrl}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-500/60 bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-slate-100 shadow-md shadow-slate-900/40 transition hover:border-indigo-400/70"
              >
                <HiOutlineCode className="h-4 w-4" />
                Code
              </motion.a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default memo(Projects)

