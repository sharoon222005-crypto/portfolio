import { memo } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { fadeInUp, slideInFrom, useParallaxTilt } from '../utils/motion'

const FloatingCube = () => {
  return (
    <mesh rotation={[0.5, 0.8, 0.2]}>
      <boxGeometry args={[1.8, 1.1, 0.08]} />
      <meshStandardMaterial
        color="#6366F1"
        metalness={0.6}
        roughness={0.15}
        emissive="#4F46E5"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

const Particles = () => {
  const particles = Array.from({ length: 40 })
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {particles.map((_, idx) => (
        <motion.span
          key={idx}
          className="absolute h-1 w-1 rounded-full bg-cyan-300/70 shadow-glow-blue"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

const Hero = () => {
  const { rotation, events } = useParallaxTilt(14)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={slideInFrom('up', 0, 20)}
      className="grid items-center gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
      {...events}
    >
      <div className="space-y-6">
        <motion.p
          variants={fadeInUp(0.1, 12)}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-slate-900/70 px-3 py-1 text-xs font-medium text-indigo-200 shadow-lg shadow-indigo-500/30 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-glow-blue" />
          Available for full‑stack roles
        </motion.p>

        <motion.h1
          variants={fadeInUp(0.2, 16)}
          className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
        >
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            Sharoon
          </span>{' '}
          👋
        </motion.h1>

        <motion.p
          variants={fadeInUp(0.3, 14)}
          className="text-lg font-medium text-indigo-200"
        >
          Java Full Stack Developer + UI Engineer
        </motion.p>

        <motion.p
          variants={fadeInUp(0.35, 12)}
          className="max-w-xl text-sm leading-relaxed text-slate-300 md:text-base"
        >
          I build performant, end‑to‑end web experiences – from robust Java / Spring Boot backends to
          pixel‑perfect React frontends with delightful interactions.
        </motion.p>

        <motion.div
          variants={fadeInUp(0.45, 10)}
          className="flex flex-wrap gap-3"
        >
          <motion.a
            href="#contact"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-glow-purple"
          >
            <span className="relative z-10">Hire Me</span>
            <span className="relative z-10 text-lg leading-none">↗</span>
            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-500 mix-blend-screen" />
            </span>
          </motion.a>

          <motion.a
            href="/Sharoon-Resume.pdf"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-400/50 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-indigo-100 shadow-lg shadow-slate-900/40 backdrop-blur-lg transition hover:border-cyan-400/70 hover:text-cyan-100"
          >
            <span>Download Resume</span>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        style={{ transformPerspective: 1100, ...rotation }}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 80, damping: 18 }}
        className="relative h-[320px] rounded-3xl border border-white/10 bg-slate-950/70 shadow-2xl shadow-indigo-500/30 backdrop-blur-2xl md:h-[380px]"
      >
        <Particles />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-slate-900/60 to-cyan-400/10" />
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          className="relative z-10"
          style={{ borderRadius: '1.5rem' }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 5]} intensity={1.2} />
          <pointLight position={[-2, -3, -3]} intensity={0.4} color="#22D3EE" />
          <Float speed={1.6} rotationIntensity={0.9} floatIntensity={1.3}>
            <FloatingCube />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        <div className="pointer-events-none absolute inset-x-10 bottom-6 flex justify-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300/70">
          Coding in neon nights
        </div>
      </motion.div>
    </motion.div>
  )
}

const Float = ({ children, speed = 1, rotationIntensity = 1, floatIntensity = 1 }) => {
  return (
    <group>
      <motion.group
        animate={{
          y: [0, 0.18 * floatIntensity, 0],
          rotateX: [0, 0.1 * rotationIntensity, 0],
          rotateY: [0, -0.18 * rotationIntensity, 0],
        }}
        transition={{
          duration: 3.5 / speed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.group>
    </group>
  )
}

export default memo(Hero)

