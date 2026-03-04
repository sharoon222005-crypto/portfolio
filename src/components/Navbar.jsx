import { memo, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { useTheme } from '../hooks/useTheme'
import { NAV_ITEMS } from '../constants/content'
import { fadeInUp } from '../utils/motion'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const handleScroll = useCallback((e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: y, behavior: 'smooth' })
    setOpen(false)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-0">
        <a
          href="#home"
          onClick={(e) => handleScroll(e, '#home')}
          className="relative flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            Sharoon.Dev
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-glow-blue" />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-300 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="group relative overflow-hidden px-1 py-1 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              <span>{item.label}</span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-indigo-400 to-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggleButton theme={theme} onToggle={toggleTheme} />

          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-200 shadow-lg shadow-slate-900/40 backdrop-blur-md transition hover:border-indigo-400/60 hover:text-white md:hidden"
          >
            {open ? <HiOutlineX className="h-5 w-5" /> : <HiOutlineMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mx-auto mt-1 block max-w-6xl px-4 md:hidden"
        >
          <div className="glass-card neon-border overflow-hidden border border-white/5 bg-slate-50/90 text-slate-900 dark:bg-slate-950/90 dark:text-slate-200 px-4 py-4 text-sm">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="flex w-full items-center justify-between py-2 text-left"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

const ThemeToggleButton = ({ theme, onToggle }) => {
  return (
    <button
      aria-label="Toggle theme"
      onClick={onToggle}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-slate-100 text-slate-900 shadow-md shadow-slate-300/60 backdrop-blur-md transition hover:border-indigo-400/70 dark:bg-slate-900/70 dark:text-slate-100 dark:shadow-slate-900/60"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative h-5 w-5"
      >
        {theme === 'dark' ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 to-orange-500"
            layoutId="theme-icon"
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-amber-100/40"
              initial={{ scale: 0.3, opacity: 0.4 }}
              animate={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror' }}
            />
          </motion.span>
        ) : (
          <>
            <motion.span className="absolute inset-0 rounded-full bg-slate-100" layoutId="theme-icon" />
            <motion.span
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-slate-900"
              initial={{ x: 4, y: -4 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.4 }}
            />
          </>
        )}
      </motion.div>
    </button>
  )
}

export default memo(Navbar)

