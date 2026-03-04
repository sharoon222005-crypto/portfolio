import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SOCIAL_LINKS } from '../constants/content'
import { hover3d } from '../utils/motion'

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
}

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/80 py-6 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-[12px] text-slate-500 dark:text-slate-400 md:flex-row md:px-6 lg:px-0">
        <p className="text-center md:text-left">
          © {year} <span className="font-semibold text-slate-200">Sharoon</span>. Crafted with React, Java, and a
          bit of neon.
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ name, href, icon }) => {
            const Icon = iconMap[icon]
            if (!Icon) return null
            return (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                {...hover3d({ rotate: { x: -6, y: 6 }, scale: 1.04 })}
                className="neon-hover flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 text-slate-300 shadow-md shadow-slate-900/60 transition hover:border-indigo-400/70 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)

