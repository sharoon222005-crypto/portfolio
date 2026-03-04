import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { staggerContainer } from './utils/motion'

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-hero-gradient bg-slate-100 text-slate-900 theme-transition dark:bg-slate-950 dark:text-slate-50">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="pointer-events-none fixed inset-0 -z-10"
        >
          <motion.div
            className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-purple-500/40 blur-3xl"
            animate={{ y: [-10, 20, -10] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-cyan-400/40 blur-3xl"
            animate={{ y: [10, -25, 10] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <Navbar />

        <Suspense fallback={null}>
          <motion.main
            className="mx-auto flex max-w-6xl flex-col gap-24 px-4 pb-20 pt-24 md:px-6 lg:px-0"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.12, 0.1)}
          >
            <section id="home">
              <Hero />
            </section>
            <section id="skills">
              <Skills />
            </section>
            <section id="projects">
              <Projects />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </motion.main>
        </Suspense>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
