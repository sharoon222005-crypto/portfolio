import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { hover3d, slideInFrom } from '../utils/motion'

const initialState = { name: '', email: '', message: '' }

const Contact = () => {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState({ loading: false, success: '', error: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: '', error: '' })

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )

      setStatus({ loading: false, success: 'Message sent successfully! I will get back to you soon.', error: '' })
      setForm(initialState)
    } catch (err) {
      console.error(err)
      setStatus({
        loading: false,
        success: '',
        error: 'Something went wrong. Please try again or reach me directly via email.',
      })
    }
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">Let&apos;s Talk</h2>
          <p className="mt-1 text-sm text-slate-400 md:text-[15px]">
            Got a role, project, or idea in mind? I&apos;d love to hear about it.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)]">
        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={slideInFrom('left', 0.1, 28)}
          {...hover3d({ rotate: { x: -4, y: 6 }, scale: 1.02 })}
          className="glass-card neon-border neon-hover space-y-4 border border-white/10 p-5"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5 text-sm">
              <label htmlFor="name" className="block text-xs font-medium text-slate-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="h-9 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-xs text-slate-50 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/60"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-1.5 text-sm">
              <label htmlFor="email" className="block text-xs font-medium text-slate-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="h-9 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-xs text-slate-50 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/60"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-sm">
            <label htmlFor="message" className="block text-xs font-medium text-slate-200">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full resize-none rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-xs text-slate-50 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/60"
              placeholder="Tell me about your project, role, or idea..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={status.loading}
            whileHover={{ y: status.loading ? 0 : -1, scale: status.loading ? 1 : 1.01 }}
            whileTap={{ scale: status.loading ? 1 : 0.98 }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.loading ? 'Sending…' : 'Send Message'}
          </motion.button>

          {status.success && <p className="text-xs text-emerald-300">{status.success}</p>}
          {status.error && <p className="text-xs text-rose-300">{status.error}</p>}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 text-sm text-slate-600 dark:text-slate-300"
        >
          <div className="glass-card border border-white/10 p-4">
            <p className="text-[13px]">
              Based in{' '}
              <span className="font-semibold text-indigo-200">
                [Your City / Timezone]
              </span>{' '}
              – open to remote and hybrid roles.
            </p>
            <p className="mt-3 text-[13px]">
              Prefer email? Contact me at{' '}
              <span className="font-mono text-xs text-cyan-300">
                your.email@example.com
              </span>
              .
            </p>
          </div>

          <div className="glass-card border border-white/10 p-2 text-[11px] text-slate-500 dark:text-slate-400">
            <p>
              Optional: drop in an embedded map or office location here (Google Maps iframe) to add more context.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Contact)

